import { Controller,
         Get, Post, Put, Delete,
         Res, HttpStatus, NotFoundException,
         Body, Param, Query } from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto'
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}

    @Get('/')
    async getProducts(@Res() res){
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            message: 'Products List',
            products,
            total: products.length
        });
    }

    @Post('/')
    async createProduct(@Res() res, @Body() create_product_dto: CreateProductDTO) {
        //console.log(json_body);
        const product = await this.productService.createProduct(create_product_dto);
        return res.status(HttpStatus.CREATED).json({
            message: 'Product Created',
            product
        });
    }

    @Get('/:id')
    async getProduct(@Res() res, @Param('id') id: string){
        const product = await this.productService.getProduct(id);
        if (!product){
            throw new NotFoundException('Product does not exist')
        }
        return res.status(HttpStatus.OK).json({
            message: 'Product Detail',
            product
        });
    }

    @Delete('/')
    async deleteProduct(@Res() res, @Query('id') id: string){
        const product = await this.productService.deleteProduct(id);
        if (!product) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product deleted Succesfully',
            product
        })
    }

    @Put('/:id')
    async updateProduct(@Res() res, @Body() productDto: CreateProductDTO, @Param('id') id: string){
        const product = await this.productService.updateProduct(id, productDto);
        if (!product) throw new NotFoundException('Product does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated',
            product
        });
    }
}
