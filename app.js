const express = require('express');

// Routers
const { postsRouter } = require('./routes/posts.routes');
const { usersRouter } = require('./routes/users.routes');
const { commentsRouter } = require('./routes/comment.routes');

//Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

//Utils
const { AppError } = require('./util/appError');

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
// http://localhost:4000/api/v1/posts
app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/comments', commentsRouter);

//Middlewares
app.use( '*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not fount in this server`))
})
//Error handler
app.use(globalErrorHandler)

module.exports = {
  app
}

// Http status codes examples:
// 2** -> success
// 3** -> misc
// 4** -> Client errors
// 5** -> Server errors
