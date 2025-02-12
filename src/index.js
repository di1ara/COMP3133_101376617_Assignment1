const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userSchema = require('./schemas/user.schema');
const employeeSchema = require('./schemas/employee.schema');
const userResolvers = require('./resolvers/user.resolver');
const employeeResolvers = require('./resolvers/employee.resolver');

dotenv.config();

const app = express();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs: [userSchema, employeeSchema],
  resolvers: [userResolvers, employeeResolvers],
});

server.applyMiddleware({ app });

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}${server.graphqlPath}`);
});
