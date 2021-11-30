import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { HttpsRedirectMiddleware } from './middlewares/https.middleware';
import { RequiresAuthMiddleware } from './middlewares/requires-auth.middleware';
import { AccountModule } from './modules/account/account.module';
import { ApplicationsController } from './modules/applications/applications.controller';
import { ApplicationsModule } from './modules/applications/applications.module';
import { DepartmentsController } from './modules/departments/departments.controller';
import { DepartmentsModule } from './modules/departments/departments.module';
import { EnvironmentsController } from './modules/environments/environments.controller';
import { EnvironmentsModule } from './modules/environments/environments.module';
import { VariablesController } from './modules/variables/variables.controller';
import { VariablesModule } from './modules/variables/variables.module';
import { EncryptionService } from './services/encryption.service';
import { SharedModule } from './modules/shared.module';
import { BrowsersModule } from './modules/browsers/browsers.module';

const protectedRoutes = [
  ApplicationsController,
  DepartmentsController,
  EnvironmentsController,
  VariablesController,
  'account/2FA/*',
  'account/auth'
]

// Load .env file in root directory
require('dotenv').config();

@Module({
  imports: [
    TypegooseModule.forRoot("mongodb://localhost:27017/testingLabs", {
      authSource: 'admin',
      auth: {
        username: process.env.MONGO_ROOT_USER,
        password: process.env.MONGO_ROOT_PASSWORD
      }
    }),
    AccountModule,
    DepartmentsModule,
    ApplicationsModule,
    EnvironmentsModule,
    VariablesModule,
    BrowsersModule,
    SharedModule
  ],
  providers: [
    EncryptionService
  ]
})
export class AppModule implements NestModule {
  configure(app: MiddlewareConsumer) {
    app.apply(HttpsRedirectMiddleware).forRoutes('*');
    app.apply(AuthMiddleware).forRoutes('*');
    app.apply(RequiresAuthMiddleware).forRoutes(...protectedRoutes);
  }
}
