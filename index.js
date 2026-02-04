const express = require("express");
const app = express();
const port = 3000;

// middleware to read JSON data
app.use(express.json());

// sample data (like database)
const users = [
  { id: 1, name: "Aman", role: "Student" },
  { id: 2, name: "Rahul", role: "Developer" }
];

// Home route
app.get("/", (req, res) => {
  res.send("Express Server is running 🚀");
});

// GET all users
app.get("/users", (req, res) => {
  res.json({
    message: "Users fetched successfully",
    data: users
  });
});

// GET single user (dynamic param)
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "User not found ❌" });
  }

  res.json({
    message: "User fetched successfully",
    data: user
  });
});

// POST new user
app.post("/users", (req, res) => {
  const newUser = req.body;
  users.push(newUser);

  res.status(201).json({
    message: "User added successfully",
    data: newUser
  });
});

// Dynamic route with name
app.get("/hello/:name", (req, res) => {
  res.send(`Hello ${req.params.name}, welcome to Express 😄`);
});

// Query parameter example
app.get("/search", (req, res) => {
  const role = req.query.role;

  if (!role) {
    return res.send("Please provide a role in query ?role=Student");
  }

  const filteredUsers = users.filter(
    user => user.role.toLowerCase() === role.toLowerCase()
  );

  res.json({
    message: `Users with role ${role}`,
    data: filteredUsers
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
