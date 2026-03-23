import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { registerController } from './controlers/registerController.js';
import { loginController } from './controlers/loginController.js';
import auth from './middlewares/authMiddleware.js';
import { productController } from './controlers/productController.js';
import { createProductController } from './controlers/createProductController.js'
import { deleteProductController } from './controlers/deleteProductController.js';
import { moreInfoController } from './controlers/moreInfoController.js';
import { getCartController } from './controlers/getCartController.js';
import { addToCartController } from './controlers/addToCartController.js';
import { removeFromCartController } from './controlers/removeFromCartController.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.ORIGIN
}));

app.post('/register', registerController);
app.post('/login', loginController);
app.get('/mainPageCheck', auth, (req, res) => {
    res.json({ message: 'Login succesfull!', user: req.user })
})
app.get('/getProducts', productController);
app.post('/createProduct', createProductController);
app.post('/deleteProduct', deleteProductController);
app.get('/moreInfo/:id', moreInfoController);
app.get('/cart', auth, getCartController);
app.post('/cart', auth, addToCartController);
app.delete('/cart/:id', auth, removeFromCartController);

app.listen(process.env.PORT, () => console.log('Server started!'));
