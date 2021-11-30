import { Body, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import { Variable } from "src/utils/interfaces";
import { GenericItemDto } from "./dto/generic-item.dto";
import { Cache } from 'cache-manager';
import { parseDuration } from "src/utils/helpers";

export class GenericRestApi<T> {

    protected readonly itemModel: ReturnModelType<AnyParamConstructor<T>>;
    protected cache: Cache

    get modelName() {
        return this.itemModel.collection.collectionName;
    }

    async rebuildCache(items?: any[]) {
        if (!items) {
            items = await this.itemModel.find().lean().exec();
        }
        await this.cache.set(this.modelName, items, { ttl: parseDuration('1d') });
        return items;
    }

    @Get()
    async getAll() {
        const cache = await this.cache.get(this.modelName);
        if (cache) {
            return cache;
        } else {
            return this.rebuildCache();
        }
    }

    @Post()
    async createOne(
        @Body() body: GenericItemDto,
    ) {
        await this.rebuildCache();
        return await new this.itemModel(body).save();
    }

    @Patch(':id')
    async patchOne(
        @Param('id') id: string,
        @Body() body: GenericItemDto
    ) {
        /**
         * Here, body is a class, to avoid conflicts with TS
         * it has to be casted to unknown first, then as T
         * @todo Add check for user role
         */
        const payload: T = body as unknown as T;
        const result = await this.itemModel.findByIdAndUpdate(id, payload, { new: true }).exec();
        await this.rebuildCache();
        return result;
    }

    @Delete(':id')
    async deleteOne(
        @Param('id') id: string
    ) {
        const result = await this.itemModel.findByIdAndRemove(id).exec();
        if (result) {
            await this.rebuildCache();
            return { success: true };
        } else {
            throw new HttpException('Item not found', HttpStatus.NOT_FOUND);
        }
    }

}