const { gql } = require('apollo-server-express');

module.exports = gql`
  type Employee {
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
    searchEmployeeByEid(eid: ID!): Employee!
    searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee!]!
  }

  type Mutation {
    addNewEmployee(first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, department: String!, employee_photo: String): Employee!
    updateEmployeeByEid(eid: ID!, first_name: String!, last_name: String!, email: String!, gender: String!, designation: String!, salary: Float!, date_of_joining: String!, department: String!, employee_photo: String): Employee!
    deleteEmployeeByEid(eid: ID!): Employee!
  }
`;