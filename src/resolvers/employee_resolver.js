const Employee = require('../models/Employee');

module.exports = {
  Query: {
    getAllEmployees: async () => {
      const employees = await Employee.find();
      return employees.map(employee => ({
        id: employee._id.toString(), // Map _id to id
        ...employee._doc,
        date_of_joining: new Date(employee.date_of_joining).toISOString().split('T')[0],
      }));
    },

    searchEmployeeById: async (_, { id }) => {
      const employee = await Employee.findById(id);
      if (employee) {
        return {
          id: employee._id.toString(),
          ...employee._doc,
          date_of_joining: new Date(employee.date_of_joining).toISOString().split('T')[0],
        };
      }
      return null;
    },

    searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
      const employees = await Employee.find({
        $or: [{ designation }, { department }]
      });
      return employees.map(employee => ({
        id: employee._id.toString(),
        ...employee._doc,
        date_of_joining: new Date(employee.date_of_joining).toISOString().split('T')[0],
      }));
    },
  },

  Mutation: {
    addNewEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        designation,
        salary,
        date_of_joining,
        department,
        employee_photo,
      });
      await newEmployee.save();
      return {
        id: newEmployee._id.toString(),
        ...newEmployee._doc,
        date_of_joining: new Date(newEmployee.date_of_joining).toISOString().split('T')[0],
      };
    },

    updateEmployeeById: async (_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo },
        { new: true }
      );
      if (updatedEmployee) {
        return {
          id: updatedEmployee._id.toString(),
          ...updatedEmployee._doc,
          date_of_joining: new Date(updatedEmployee.date_of_joining).toISOString().split('T')[0],
        };
      }
      return null;
    },

    deleteEmployeeById: async (_, { id }) => {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
      if (deletedEmployee) {
        return {
          id: deletedEmployee._id.toString(),
          ...deletedEmployee._doc,
          date_of_joining: new Date(deletedEmployee.date_of_joining).toISOString().split('T')[0],
        };
      }
      return null;
    },
  },
};