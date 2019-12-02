const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const graphqlHttp = require('express-graphql');
const schema = require('./server/graph-schema/schema');
const mongoose = require("mongoose");
const homeRoute = require('./server/routes/home');
const visitorRoute = require('./server/routes/visitors');

// Database connection
mongoose.connect(
    "mongodb://localhost/demo1",
    { useNewUrlParser: true, useUnifiedTopology: true }
);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/graphql', graphqlHttp({
    schema,
    graphiql: true
}))

// Routes
app.use('/', homeRoute);
app.use('/visitors', visitorRoute);

// Error Handeling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});


// Server Listening
app.listen(port, (err) => {
    err ? console.log(err) : console.log(`http://localhost:${port}`);
})