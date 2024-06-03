import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import productRouter from './modules/product/product.router.js'
import categoryRouter from './modules/category/category.router.js'
import cartRouter from './modules/cart/cart.router.js'
import orderRouter from './modules/order/order.router.js'
import connectDB from '../DB/connection.js';
import { globalErrHandling } from './utils/errorHandling.js';
import OTPRouter from './modules/otp/otp.router.js'
import cors from 'cors'

const initApp = (app,express) => {

    // convert buffer data
    app.use(express.json({}));
    // app.use(cors())
    app.use(cors());
    


    //app Routing
    app.get('/', (req, res) => res.send('Hello World!'));
    
    app.use('/auth',authRouter)    /// done
    app.use('/otp',OTPRouter)     /// done
    app.use('/user',userRouter)   /// done
    app.use('/product',productRouter)  /// done
    app.use('/category',categoryRouter)  /// done
    app.use('/cart',cartRouter)   /// 
    app.use('/order',orderRouter)  




    app.all('*', (req, res) => res.status(404).json({error:'Page not found!'}));


    // globalErrHandling
    app.use(globalErrHandling)
    
    // DB connection
    connectDB()
};
export default initApp;