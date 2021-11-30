import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Response } from 'express';
import { InjectModel } from 'nestjs-typegoose';
import { LoginDto } from 'src/dto';
import { CheckEmailDto } from 'src/modules/account/dto/checkEmail.dto';
import { CheckUserDto } from 'src/modules/account/dto/checkUser.dto';
import { SignupDto } from 'src/modules/account/dto/signup.dto';
import { Account } from 'src/models';
import { EncryptionService } from 'src/services/encryption.service';
import { ErrorResponse, safeUser, sanitizeRegex } from 'src/utils/helpers';
import { IRequest, UserRole } from 'src/utils/interfaces';
import { AccountService } from 'src/services/account.service';
import { Code2faDto } from './dto/code2fa.dto';

@Controller('account')
export class AccountController {
    
  constructor(
    @InjectModel(Account) protected readonly accountModel: ReturnModelType<typeof Account>,
    private encryptionService: EncryptionService,
    private accountService: AccountService
  ) { }

  /**
   * Allows to check if the current user is logged and is valid
   * Returns 200 if valid
   * Returns 403 if invalid
   * @param req IRequest
   */
  @Get('auth')
  @HttpCode(HttpStatus.OK)
  checkAuth(
    @Req() req: IRequest
  ) {
    return;
  }

  /**
   * Performs login with given user and password
   * @param req IRequest
   * @param body LoginDto
   */
  @Post('login')
  async login(
    @Body() body: LoginDto
  ) {
    // Search for user;
    const username = sanitizeRegex(body.username);
    const user = await this.accountModel.findOne({
      $or: [
        {
          user: {
            $regex: new RegExp(username, 'i')
          }
        },
        {
          email: {
            $regex: new RegExp(username, 'i')
          }
        }
      ]
    }).exec();
    if (user) {
      // Check password
      if (this.encryptionService.verify_password(user.password, body.password)) {
        // Successful login
        if (user.secret && body.code2fa) {
          // User has 2FA enabled
          if (this.encryptionService.verify_2fa(user.secret, body.code2fa)) {
            return {
              success: true,
              token: this.encryptionService.jwt_encrypt({ userId: user._id }),
              user: safeUser(user)
            }
          } else {
            return ErrorResponse(HttpStatus.FORBIDDEN, 'Invalid or expired 2FA code');
          }
        } else {
          return {
            success: true,
            token: this.encryptionService.jwt_encrypt({ userId: user._id }),
            requires2FA: !!user.secret,
            ...(!user.secret) && { user: safeUser(user) }
          }
        }
      } else {
        return ErrorResponse(HttpStatus.FORBIDDEN, 'Invalid user or password');
      }
    } else {
      return ErrorResponse(HttpStatus.FORBIDDEN, 'Invalid user or password');
    }
  }

  /**
   * Returns 202 if the given user is available
   * Returns 409 if the given user is already taken
   */
  @Post('checkAvailableUser')
  @HttpCode(HttpStatus.ACCEPTED)
  async checkUser(
    @Body() body: CheckUserDto
  ) {
    // Search for user
    const byUser = await this.accountModel.findOne({ username: body.username }).exec();
    if (byUser) {
      // Oops, user already exists
      return ErrorResponse(HttpStatus.CONFLICT);
    } else {
      // User is available
      return { success: true };
    }
  }

  /**
   * Returns 202 if the given email is available
   * Returns 409 if the given email is already used
   */
   @Post('checkAvailableEmail')
   @HttpCode(HttpStatus.ACCEPTED)
   async checkEmail(
     @Body() body: CheckEmailDto
   ) {
     // Search for email
     const byEmail = await this.accountModel.findOne({ email: body.email }).exec();
     if (byEmail) {
       // Oops, email already exists
       return ErrorResponse(HttpStatus.CONFLICT);
     } else {
       return { success: true };
     }
   }

  @Post('signup')
  async signup(
    @Body() body: SignupDto
  ) {
    // Add this point User and Email are valid and available
    // Create user
    const user = await this.accountModel.create({
      ...body,
      password: await this.encryptionService.hash_password(body.password)
    });
    if (user) {
      return {
        success: true,
        user: safeUser(user),
        token: this.encryptionService.jwt_encrypt({ userId: user._id })
      }
    } else {
      return ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'An error occurred');
    }
  }

  @Get('2FA/generate')
  async enable2FA(
    @Req() req: IRequest
  ) {
    const user = await this.accountService.resolveAccount(req.userId);
    if (!user.secret) {
      // Generate secret
      const secret = this.encryptionService.generate_2fa_secret(user.username);
      // Generate QR image from secret
      const qrcode = await this.encryptionService.generate_qr_code(secret.otpauth_url);
      user.tempSecret = secret.base32;
      await user.save();
      return {
        secret: secret.base32,
        qrcode
      }
    } else {
      return ErrorResponse(HttpStatus.NOT_ACCEPTABLE, 'Please disable 2FA before proceding to generate a new secret')
    }
  }

  @Post('2FA/activate')
  async activate2FA(
    @Req() req: IRequest,
    @Body() body: Code2faDto
  ) {
    const user = await this.accountService.resolveAccount(req.userId);
    // Check code
    if (this.encryptionService.verify_2fa(user.tempSecret, body.code)) {
      // Assign code secret
      user.secret = user.tempSecret;
      user.tempSecret = undefined;
      await user.save();
      return { success: true };
    } else {
      return ErrorResponse(HttpStatus.NOT_ACCEPTABLE, 'Invalid or expired code');
    }
  }

  @Post('2FA/deactivate')
  async deactivate2FA(
    @Req() req: IRequest,
    @Body() body: Code2faDto
  ) {
    const user = await this.accountService.resolveAccount(req.userId);
    if (user.secret) {
      // Check code
      if (this.encryptionService.verify_2fa(user.secret, body.code)) {
        // Assign code secret
        user.secret = undefined;
        await user.save();
        return { success: true };
      } else {
        return ErrorResponse(HttpStatus.NOT_ACCEPTABLE, 'Invalid or expired code');
      }
    } else {
      return ErrorResponse(HttpStatus.PRECONDITION_FAILED, '2FA is already deactivated')
    }
  }

  @Delete(':id')
  async deleteAccount(
    @Req() req: IRequest,
    @Param('id') id: string
  ) {
    const user = await this.accountService.resolveAccount(req.userId);
    const userToDelete = await this.accountService.resolveAccount(id);
    if (user.role >= UserRole.SuperUser || user._id === userToDelete._id) {
      await userToDelete.delete();
      return { success: true };
    } else {
      return ErrorResponse(HttpStatus.FORBIDDEN);
    }
  }
    
}

