import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import app from './config/app';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

MongoHelper.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost/${port}`);
    });
  })
  .catch(console.error);
