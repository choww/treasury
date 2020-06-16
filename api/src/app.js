import express from 'express';
import session from 'express-session';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

import authRouter from './routes/authentication';
import indexRouter from './routes/index';
import usersRouter from './routes/users';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(session({ secret: 'super secret' }));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SESSIONS
passport.serializeuser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((id, done) => {
  
});

// API ROUTES
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/authorize', authRouter);

// MONGODB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// HTTP SERVER
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  const addr = server.address();
  console.log(`Listening on ${addr}:${port}`);
});
