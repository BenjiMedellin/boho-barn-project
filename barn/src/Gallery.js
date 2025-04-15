import React from "react";
import "./Gallery.css";

// Replace these with your actual images from /assets/gallery/
import img1 from "./assets/Alpaca1.jpg";
import img2 from "./assets/Alpaca2.jpg";
import img3 from "./assets/Alpaca3.jpg";
import img4 from "./assets/Alpaca4.jpg";
import img5 from "./assets/Alpaca5.jpg";
import img6 from "./assets/Barn1.jpg";
import img7 from "./assets/Barn2.jpg";
import img8 from "./assets/Barn3.jpg";
import img9 from "./assets/Barn4.jpg";
import img10 from "./assets/Barn5.jpg";
import img11 from "./assets/Barn6.jpg";
import img12 from "./assets/Barn7.jpg";
import img13 from "./assets/Barn8.jpg";
import img14 from "./assets/Barn9.jpg";
import img15 from "./assets/BeerBurro1.jpg";
import img16 from "./assets/BeerBurro2.jpg";
import img17 from "./assets/BeerBurro3.jpg";
import img18 from "./assets/CarriageRide1.jpg";
import img19 from "./assets/CarriageRide2.JPG";
import img20 from "./assets/CarriageRide3.JPG";
import img21 from "./assets/CarriageRide4.JPG";
import img22 from "./assets/chandelier_light_1.jpg";
import img23 from "./assets/chandelier_light_2.jpg";
import img24 from "./assets/Reno_1.jpg";
import img25 from "./assets/Reno_2.jpg";
import img26 from "./assets/Reno_3.jpg";
import img27 from "./assets/Reno_4.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18, img19, img20, img21, img22, img23, img24, img25, img26, img27];

function Gallery() {
  return (
    <div className="gallery-grid">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Gallery ${i + 1}`}
          className="gallery-image"
        />
      ))}
    </div>
  );
}

export default Gallery;
