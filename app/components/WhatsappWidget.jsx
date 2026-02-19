"use client";
import { useState } from "react";

export default function WhatsAppWidget() {
  const [hovered, setHovered] = useState(false);

  const phone = "919999999999"; // ← change to your number
  const message = encodeURIComponent(
    "Hi, I'm interested in your properties. Please share details."
  );

  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="wa-wrapper"
      aria-label="WhatsApp Chat"
    >
      <div className={`wa-pill ${hovered ? "expanded" : ""}`}>
        
        {/* WhatsApp SVG */}
        <svg viewBox="0 0 32 32" className="wa-icon" fill="currentColor">
          <path d="M19.11 17.39c-.27-.14-1.58-.78-1.82-.87-.24-.09-.41-.14-.58.14-.17.27-.67.87-.82 1.05-.15.18-.31.2-.58.07-.27-.14-1.14-.42-2.18-1.34-.81-.72-1.36-1.6-1.52-1.87-.16-.27-.02-.41.12-.55.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.58-1.39-.8-1.9-.21-.5-.43-.43-.58-.44l-.5-.01c-.18 0-.47.07-.72.34s-.95.93-.95 2.26.97 2.63 1.1 2.81c.14.18 1.9 2.9 4.6 4.07.64.28 1.14.45 1.53.58.64.2 1.23.17 1.69.1.52-.08 1.58-.65 1.8-1.28.22-.63.22-1.17.15-1.28-.07-.11-.24-.18-.5-.32zM16 3C9.38 3 4 8.38 4 15c0 2.38.69 4.6 1.88 6.48L4 29l7.71-1.86A11.93 11.93 0 0016 27c6.62 0 12-5.38 12-12S22.62 3 16 3z"/>
        </svg>

        <span className="wa-text">Chat with us</span>
      </div>
    </a>
  );
}
