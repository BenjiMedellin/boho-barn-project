const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 📁 Setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// 📩 Email route
app.post("/submit-package", upload.single("file"), async (req, res) => {
  try {
    const selections = JSON.parse(req.body.selections);
    const fullName = req.body.fullName || "Unknown User";
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    // 📨 Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,         // Replace with your Gmail
        pass: process.env.EMAIL_PASS      // App password from Google
      },
    });

    const selectionList = selections.map(
      s => `• ${s.label} – $${s.price}`
    ).join("\n");

    const mailOptions = {
      from: '"Boho Bodark Barn" <yourgmail@gmail.com>',  // Sender
      to: process.env.EMAIL_TO,                        // ✅ Recipient (doctor)
      subject: `New Package Submission from ${fullName}`,
      text: `A new package has been submitted.\n\nName: ${fullName}\n\nSelected Options:\n${selectionList}`,
      attachments: [
        {
          filename: uploadedFile.originalname,
          path: uploadedFile.path,
        }
      ]
    };

    // 📬 Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully!" });

    // (Optional) Clean up the uploaded file
    fs.unlink(uploadedFile.path, () => {});
  } catch (error) {
    console.error("Error sending package:", error);
    res.status(500).json({ message: "Error submitting package." });
  }
});

// 🖥 Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
