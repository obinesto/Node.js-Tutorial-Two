// Import the data model. In a larger application, we might have multiple models.
import Student from "../models/student.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getStudentById = async (req, res) => {
  try {
    // A student can get their own details. An admin can get any student's details.
    if (req.user._id.toString() !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to view this profile" });
    }

    const student = await Student.findById(req.params.id).select("-password");

    student
      ? res.status(200).json(student)
      : res.status(404).json({ message: `Student with id ${req.params.id} not found.` });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    // A student can only update their own profile.
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Not authorized to update this profile" });
    }

    const student = await Student.findById(req.params.id);

    if (student) {
      student.name = req.body.name || student.name;
      student.email = req.body.email || student.email;
      student.age = req.body.age || student.age;
      if (req.body.password) {
        student.password = req.body.password;
      }

      const updatedStudent = await student.save();
      res.status(200).json({ _id: updatedStudent._id, name: updatedStudent.name, email: updatedStudent.email, age: updatedStudent.age });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      await student.deleteOne();
      res.status(200).json({ message: "Student removed" });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
