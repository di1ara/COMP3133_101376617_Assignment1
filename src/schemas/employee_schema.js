const { gql } = require('apollo-server-express');

module.exports = gql`
  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
  }

  type Query {
    getAllEmployees: [Employee!]!
    searchEmployeeById(id: ID!): Employee!
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee!]!
  }

  type Mutation {
    addNewEmployee(
      first_name: String!, 
      last_name: String!, 
      email: String!, 
      gender: String!, 
      designation: String!, 
      salary: Float!, 
      date_of_joining: String!, 
      department: String!, 
      employee_photo: String
    ): Employee!

    updateEmployeeById(
      id: ID!,
      first_name: String!, 
      last_name: String!, 
      email: String!, 
      gender: String!, 
      designation: String!, 
      salary: Float!, 
      date_of_joining: String!, 
      department: String!, 
      employee_photo: String
    ): Employee!

    deleteEmployeeById(id: ID!): Employee!
  }
`;
