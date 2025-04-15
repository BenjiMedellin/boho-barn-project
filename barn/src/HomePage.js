import React, { useState } from "react";
import "./HomePage.css";
import Box from "./Box";
import Gallery from "./Gallery";
import Barn1 from "./assets/Barn1.jpg";

function HomePage() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showGallery, setShowGallery] = useState(false);

  const handleOptionToggle = (option) => {
    const exists = selectedOptions.find((o) => o.label === option.label);
    const updated = exists
      ? selectedOptions.filter((o) => o.label !== option.label)
      : [...selectedOptions, option];
    setSelectedOptions(updated);
  };

  const packageOptions = [
    { type: "section", label: "Venue Packages" },
    { label: "Full Weekend (Fri–Sun)", price: 6500 },
    { label: "Saturday Only", price: 3000 },
    { label: "Friday or Sunday", price: 2500 },

    { type: "section", label: "Animal Add-Ons" },
    { label: "Horse Drawn Carriage", price: 500 },
    { label: "Beer Burrow", price: 250 },
    { label: "Alpaca", price: 250 }
  ];

  return (
    <div className="homepage">
      {/* Hero Section with Image and Welcome Message */}
<div className="hero-container">
  <img src={Barn1} alt="Barn" className="top-image" />
  <div className="hero-message">
    <h1 className="hero-title">Welcome to Boho Bodark Barn</h1>
  </div>
</div>


      {/* About Us Section */}
      <div className="about-section">
        <h2 className="section-title">About Us</h2>
        <p className="about-text">
          Bodark Barn was built in 2015 for our own wedding. Now, we want to share our beautiful barn with you!
        </p>
        <p className="about-text">
          We like to consider ourselves more of a backyard wedding and event center. We are rustic, industrial, boho, and repurposed. We pride ourselves in being a DIY place. This allows you to really make your event your own and save a little money as well!
        </p>
        <p className="about-text">
          We even offer a horse drawn carriage and animal additions to make your event unique!
        </p>
        <p className="about-text" style={{ fontWeight: "bold" }}>
          Let us host your next event!!
        </p>
      </div>

      {/* Package Builder + Gallery Boxes */}
      <div className="box-scroll-container">
        <Box
          title="Package Builder"
          options={packageOptions}
          onOptionToggle={handleOptionToggle}
        />

        <div className="box-container">
          <div className="box" onClick={() => setShowGallery(!showGallery)}>
            <p className="box-title">Gallery</p>
          </div>
        </div>
      </div>

      {/* Gallery Expanded Section */}
      {showGallery && (
        <div className="expanded-section">
          <Gallery />
        </div>
      )}

      {/* Footer */}
      <footer className="site-footer">
        <h2>Contact Us:</h2>
        <p>
          We kindly request that only serious inquiries about venue booking be made.
          Thank you for your understanding.<br />
          We would love to show you around our farm!<br />
          Contact us to schedule a tour:
        </p>
        <p><strong>Phone:</strong> (409) 392-5024</p>
        <p><strong>Email:</strong> Jag34ttu@gmail.com</p>
        <p>
          <strong>Facebook:</strong>{" "}
          <a href="https://www.facebook.com/p/Boho-Bodark-Barn-100090049869600/" target="_blank" rel="noreferrer">Click Here</a>
        </p>
        <p>
          <strong>Instagram:</strong>{" "}
          <a href="https://www.instagram.com/bohobodarkbarn/" target="_blank" rel="noreferrer">Click Here</a>
        </p>
        <p className="copyright">
          © 2025 Boho Bodark Barn. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default HomePage;
