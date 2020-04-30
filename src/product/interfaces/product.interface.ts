import { Document } from 'mongoose';

export interface Product extends Document {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    createdAt: Date;
}