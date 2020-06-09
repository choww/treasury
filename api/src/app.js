import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import expressSession from 'express-session';
import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import dotenv from 'dotenv';

import secureRoute from './middleware/secure-route';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import authRouter from './routes/authentication';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app.use(express.static(path.join(__dirname, '../../www')));

// SESSION CONFIG
const session = {
  secret: "WriterLoreSnapIron",
  cookie: {},
  resave: false, 
  saveUnitialized: false, 
};

if (app.get('env') === 'production') {
  // serve secure cookie, require HTTPS
  session.cookie.secure = true;
}

app.use(expressSession(session));

// PASSPORT CONFIG
const { env } = process;
const strategy = new Auth0Strategy(
  {
    domain: env.AUTH0_DOMAIN,
    clientID: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_CLIENT_SECRET,
    callbackURL: env.AUTH0_CALLBACK_URL,
  },
  // find the user that has certan credentials
  // auth0 does all the credential validation for you
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  },
);

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// serialize & deserialize user object into the session 
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use((req, res, next) => {
  // make authentication status available to FE
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// API ROUTES
app.use('/api', indexRouter);
app.use('/api/users', secureRoute, usersRouter);

// APP ROUTES
app.use('/', authRouter);

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

// export default app;
