import 'dotenv/config';
import express from 'express';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import './utils/passport-strategies';
import passport from 'passport';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import schoolRoutes from './routes/school.routes';
import teacherRoutes from './routes/teacher.routes';
import studentRoutes from './routes/student.routes';

import { LMSDataSource } from "./utils/data-source";

// TODO: The following declarations are located here as couldn't make them work on a different location with tsconfig.json
declare global {
  namespace Express {
    interface User {
      displayName: string;
      email: string;
      picture: string;
      userEntity: any;
    }
  }
};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      CLIENT_DOMAIN: string;
      SESSION_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
    }
  }
};

LMSDataSource.initialize().then(async () => {

  const app = express();

  app.use(session(
    {
      name: 'session',
      secret: process.env.SESSION_SECRET,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  ));
  
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  app.use(cors(
    {
      origin: process.env.CLIENT_DOMAIN,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true
    }
  ));
  
  app.use('/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/schools', schoolRoutes);
  app.use('/api/teachers', teacherRoutes);
  app.use('/api/students', studentRoutes);
  
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
  });

}).catch(error => console.log(error));
