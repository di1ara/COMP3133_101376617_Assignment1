const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSchema = require('./schemas/user_schema');
const employeeSchema = require('./schemas/employee_schema');
const userResolvers = require('./resolvers/user_resolver');
const employeeResolvers = require('./resolvers/employee_resolver');

dotenv.config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs: [userSchema, employeeSchema],
  resolvers: [userResolvers, employeeResolvers],
});

async function startServer() {
  // Await server.start() before applying middleware
  await server.start();

  // Apply middleware to the Express app
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`);
  });
}

startServer();
