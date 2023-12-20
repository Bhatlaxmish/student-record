const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const serverless=require('serverless-http')

const port = 3000;
const helmet = require('helmet');
const cors = require('cors');
const ServerlessHttp = require("serverless-http");
app.use(cors());

app.use(cors({
  origin: 'https://www.natours.com'
}))

app.options('*', cors());
app.use(helmet());


// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect(
  "mongodb+srv://root:dev@cluster0.k9weudp.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Define a schema for the student model
const studentSchema = new mongoose.Schema({
  name: String,
  course: String,
  grade: String,
});

// Create the Student model
const Student = mongoose.model("Student", studentSchema);

// Middleware to parse JSON in the request body
app.use(express.json());

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static("public"));

// API endpoint to delete a student

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
    app.post("/", async (req, res) => {
      const { name, course, grade } = req.body;

      if (name && course && grade) {
        const student = new Student({ name, course, grade });
        await student.save();
        res.json({ message: "Student added successfully" });
      } else {
        res.status(400).json({ error: "Invalid input" });
      }
    });
    
  
app.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// app.use('/functions/node',app);
// module.exports.handler=serverless(app);