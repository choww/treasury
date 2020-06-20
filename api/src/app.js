import express from 'express';
import expressSession from 'express-session';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';

import authRouter from './routes/authentication';
import signUpRouter from './routes/signup';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const session = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: false, 
  saveUnitialized: false,
};

if (app.get('env') === 'production') {
  session.cookie.secure = true;
}

app.use(expressSession(session));
app.use(passport.initialize());
app.use(passport.session());

// PASSPORT SESSIONS
passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((id, done) => {
  done(null, user);  
});

// ROUTES
app.use('/api/signup', signUpRouter);
app.use('/api/auth', authRouter);
app.use(routes);

app.use('/api', (req, res) => {
  res.json({ message: 'Welcome to the Treasury API!' });
});

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
