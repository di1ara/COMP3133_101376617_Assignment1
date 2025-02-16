# Employee Management System

## Project Overview
This project is a simple Employee Management System built using **Node.js**, **Express**, and **Apollo Server** for the backend with **GraphQL** as the API layer. It allows you to efficiently manage employee information and user authentication (signup/login).

## Features
- User signup (create an account)
- User login (authenticate using username and password)
- Add new employees
- Update employee information
- Delete employees
- Search employees by ID
- Search employees by designation or department
- Retrieve a list of all employees

## Tech Stack
- **Node.js**: JavaScript runtime environment
- **Express**: Backend web framework
- **Apollo Server**: GraphQL server implementation
- **MongoDB**: Database for storing employee information
- **Bcryptjs**: For password hashing and validation

## 🚀 Getting Started

### 1️⃣ Prerequisites
- Node.js
- MongoDB (Local or Cloud)

### 2️⃣ Installation
```bash
# Clone the repository
git clone https://github.com/di1ara/COMP3133_101376617_Assignment1

# Install dependencies
npm install
```

### 3️⃣ Environment Variables
Create a `.env` file in the root directory and add the following:
```bash
MONGO_URI=mongodb://localhost:27017/employee_management
PORT=4000
```

### 4️⃣ Run the Application
```bash
# Start the development server
npm run dev

# Or start in production mode
npm start
```

### 5️⃣ Access the GraphQL Playground
Open your browser and navigate to: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## GraphQL API Documentation

### Queries

#### 1. Get All Employees
```graphql
query {
  getAllEmployees {
    id
    first_name
    last_name
    email
    designation
    department
  }
}
```

#### 2. Search Employee by ID
```graphql
query {
  searchEmployeeById(id: "employee_id") {
    id
    first_name
    last_name
    email
    designation
    department
  }
}
```

#### 3. Search Employees by Designation or Department
```graphql
query {
  searchEmployeeByDesignationOrDepartment(designation: "Engineer") {
    id
    first_name
    last_name
    department
  }
}
```

### Mutations

#### 1. Add New Employee
```graphql
mutation {
  addNewEmployee(input: {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@example.com",
    gender: "Male",
    designation: "Software Engineer",
    salary: 75000,
    date_of_joining: "2023-08-15",
    department: "Engineering",
    employee_photo: "https://example.com/photo.jpg"
  }) {
    id
    first_name
    email
  }
}
```

#### 2. Update Employee by ID
```graphql
mutation {
  updateEmployeeById(id: "employee_id", input: {
    first_name: "Jane",
    last_name: "Smith",
    email: "jane.smith@example.com",
    designation: "Product Manager"
  }) {
    id
    first_name
    designation
  }
}
```

#### 3. Delete Employee by ID
```graphql
mutation {
  deleteEmployeeById(id: "employee_id") {
    id
    first_name
    email
  }
}
```

## Testing
Run tests (if available):
```bash
npm test
```

## Troubleshooting
- **Database Connection Issues**: Ensure MongoDB is running and `MONGO_URI` is correctly set.
- **Server Not Starting**: Run `npm install` to ensure dependencies are installed.

## Contributing
1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
