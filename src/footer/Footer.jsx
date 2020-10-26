import React from "react";
import "./Footer.css";
import resume from "../Assets/docs.pdf";
export default function Footer() {
  return (
    <div className="footer">
      <span className="support-text">
        <a href={resume} download>
          Läs på om systemet här!
        </a>
      </span>
    </div>
  );
}
