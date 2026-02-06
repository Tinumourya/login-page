const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// fake database (email + password)
const users = [
  { email: "tinu9057@gmail.com", password: "1119" },
  { email: "rahul@gmail.com", password: "abc123" }
];

// test route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// login API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    res.json({
      status: "success",
      message: "Login successful"
    });
  } else {
    res.json({
      status: "error",
      message: "Invalid email or password"
    });
  }
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
