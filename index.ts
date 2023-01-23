// @ts-nocheck
import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';
import connectMongo from './db/connectMongo';
import cors from 'cors';
import NotFound from './middleware/NotFound';

//routes import
import AuthRouter from './routes/auth';
import OrderRouter from './routes/orders';
import AccountRouter from './routes/account';
import errorHandlerMiddleware from './middleware/errorHandler';

const app = express();
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: '*' }));
app.get('/', (req, res) => {
  res.send(
    ` <h1>Buylocate Property API</h1> 
      <a href="/api-docs">API DOCUMENTATION</a> `
  );
});

// routes
app.use('/api/auth', AuthRouter);
app.use('/api/orders', OrderRouter);
app.use('/api/account', AccountRouter);

app.use(NotFound);
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 3130;

const start = async () => {
  await connectMongo(process.env.MONGODB_URI);
  app.listen(PORT, () => {
    console.log(`server is running on https://localhost:${PORT}/api`);
  });
};

start();
