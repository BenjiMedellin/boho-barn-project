import React, { useState } from "react";
import "./Box.css";

function Box({ title, options = [], onOptionToggle }) {
  // 🧠 State
  const [isOpen, setIsOpen] = useState(false);
  const [localSelections, setLocalSelections] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [fullName, setFullName] = useState(""); // ✅ Full name input

  // ✅ Handle checkbox selection
  const handleToggle = (option) => {
    const exists = localSelections.find((o) => o.label === option.label);
    const updatedSelections = exists
      ? localSelections.filter((o) => o.label !== option.label)
      : [...localSelections, option];
    setLocalSelections(updatedSelections);
    onOptionToggle(option);
  };

  // ✅ File upload handler
  const handleFileChange = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  // ✅ Form submission handler
  const handleSubmit = () => {
    if (!uploadedFile || fullName.trim() === "") {
      alert("Please enter your full name and upload the signed contract before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("selections", JSON.stringify(localSelections));
    formData.append("fullName", fullName); // ✅ Send full name to backend

    fetch("http://localhost:5000/submit-package", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitStatus("success");
        console.log("Response:", data);
      })
      .catch((err) => {
        setSubmitStatus("error");
        console.error(err);
      });
  };

  // 💵 Total
  const boxTotal = localSelections.reduce((sum, item) => sum + item.price, 0);

  // 🧱 Render
  return (
    <div className="box-container">
      {/* 🔽 Dropdown Header */}
      <div className="box" onClick={() => setIsOpen(!isOpen)}>
        <p className="box-title">{title}</p>
      </div>

      {/* 📂 Dropdown Content */}
      {isOpen && (
        <div className="dropdown-content">
          {/* ✅ Checkboxes */}
          {options.map((option, index) => {
            if (option.type === "section") {
              return (
                <h4
                  key={index}
                  style={{
                    borderBottom: "1px solid #ccc",
                    paddingBottom: "5px",
                    marginTop: "15px",
                  }}
                >
                  {option.label}
                </h4>
              );
            }

            return (
              <label key={index} style={{ display: "block", marginBottom: "10px" }}>
                <input
                  type="checkbox"
                  onChange={() => handleToggle(option)}
                  checked={!!localSelections.find((o) => o.label === option.label)}
                />
                {" "}{option.label} – ${option.price}
              </label>
            );
          })}

          {/* 💰 Total */}
          <div style={{ marginTop: "20px", fontWeight: "bold", textAlign: "right" }}>
            Total: ${boxTotal.toLocaleString()}
          </div>

          {/* 📥 PDF Download */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <a
              href="final-bbb-contracts.pdf.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-link"
            >
              📄 Download Facility Rental Agreement
            </a>
          </div>

          {/* 🧑 Full Name Input */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <label htmlFor="fullName" style={{ display: "block", marginBottom: "8px" }}>
              Your Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="upload-input"
              placeholder="e.g. Sarah Johnson"
            />
          </div>

          {/* 📤 File Upload */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <label htmlFor="contractUpload" style={{ display: "block", marginBottom: "8px" }}>
              Upload Signed Contract:
            </label>
            <input
              type="file"
              id="contractUpload"
              accept=".pdf"
              onChange={handleFileChange}
              className="upload-input"
            />
          </div>

          {/* 🚀 Submit */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button onClick={handleSubmit} className="submit-button">
              Submit My Package
            </button>
          </div>

          {/* 💬 Feedback */}
          <div style={{ marginTop: "15px", textAlign: "center" }}>
            {submitStatus === "success" && (
              <p style={{ color: "green" }}>🎉 Package submitted successfully!</p>
            )}
            {submitStatus === "error" && (
              <p style={{ color: "red" }}>❌ There was an error submitting your package.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Box;
