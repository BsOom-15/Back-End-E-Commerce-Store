// Packages Import:-
import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
const cors = require('cors');


// Utiles:-
import connectDB from './config/db.js'; 
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import path from 'path';
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config();
const port = process.env.PORT || 5000; 

connectDB();

const app = express();
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from Vercel Function!' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) =>{
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})



const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


app.use(cors({
    origin: 'https://e-commerce-bsoom-web.netlify.app'
}));


app.listen(port, () => {
    console.log(`Server Is Running on Port ${port}`);
});

