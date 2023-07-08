import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
const SECRET_KEY = "mysecretcode";

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    // Generate JWT token
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

    // Send the token as response
    // console.log(username, password);
    res.json({ token, username, password });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
