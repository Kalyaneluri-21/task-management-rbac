const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminExists = await User.findOne({
      email: "admin@example.com",
    });

    if (adminExists) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "Admin",
      status: "Active",
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

seedAdmin();