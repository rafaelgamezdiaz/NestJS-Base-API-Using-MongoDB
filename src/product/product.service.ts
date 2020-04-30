import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<Product>){ }

    async getProducts(): Promise<Product[]> {
        const products = await this.productModel.find();
        return products;
    }

    async getProduct(id: string): Promise<Product> {
        return await this.productModel.findById(id);
    }

    async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO);
        return await product.save();
    }

    async deleteProduct(id: string): Promise<Product> {
        return await this.productModel.findByIdAndDelete(id);
    }

    async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, createProductDTO, {new: true});
    }

}
