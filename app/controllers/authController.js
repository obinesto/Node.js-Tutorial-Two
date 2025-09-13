import Student from "../models/student.js";
import jwt from "jsonwebtoken";

// Helper function to generate a JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token expires in 30 days
  });
};


export const registerStudent = async (req, res, next) => {
  const { name, email, password, gender, age } = req.body;

  if (!name || !email || !password || !gender || !age) {
    res.status(400);
    throw new Error("Please enter all fields");
  }

  try {
    const studentExists = await Student.findOne({ email });
    if (studentExists) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const student = await Student.create({ name, email, password, gender, age });

    if (student) {
      res.status(201).json({
        _id: student._id,
        name: student.name,
        email: student.email,
        token: generateToken(student._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid student data");
    }
  } catch (error) {
    next(error);
  }
};

export const loginStudent = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });

    if (student && (await student.matchPassword(password))) {
      res.status(200).json({ _id: student._id, name: student.name, email: student.email, token: generateToken(student._id) });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    next(error);
  }
};
