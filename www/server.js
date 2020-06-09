import path from 'path';
import express from 'express';

const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT : 8080
const app = express();

if (!isProd) {

}
