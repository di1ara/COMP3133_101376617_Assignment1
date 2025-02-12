const Employee = require('../models/Employee');

module.exports = {
  Query: {
    getAllEmployees: async () => {
      return await Employee.find();
    },
    searchEmployeeByEid: async (_, { eid }) => {
      return await Employee.findById(eid);
    },
    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      return await Employee.find({ $or: [{ designation }, { department }] });
    },
  },
  Mutation: {
    addNewEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
      const newEmployee = new Employee({ first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo });
      await newEmployee.save();
      return newEmployee;
    },
    updateEmployeeByEid: async (_, { eid, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
      return await Employee.findByIdAndUpdate(eid, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }, { new: true });
    },
    deleteEmployeeByEid: async (_, { eid }) => {
      return await Employee.findByIdAndDelete(eid);
    },
  },
};