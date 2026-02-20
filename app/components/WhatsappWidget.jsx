"use client";

export default function WhatsAppWidget() {
  const phone = "919999999999"; // change this
  const message = encodeURIComponent(
    "Hi, I'm interested in your properties. Please share details."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="wa-float"
    >
      <span className="wa-label">Chat with us</span>

      <svg
        viewBox="0 0 32 32"
        className="wa-icon"
        fill="currentColor"
      >
        <path d="M16 3C9.38 3 4 8.38 4 15c0 2.38.69 4.6 1.88 6.48L4 29l7.71-1.86A11.93 11.93 0 0016 27c6.62 0 12-5.38 12-12S22.62 3 16 3zm6.53 17.46c-.27.77-1.34 1.44-2.16 1.6-.56.1-1.29.18-4.21-.9-3.74-1.37-6.15-4.74-6.34-5-.18-.26-1.5-2-.15-3.83.67-.9 1.34-1.13 1.82-1.13.47 0 .94.01 1.35.03.43.02.63.01.9.65.27.65.9 2.22.98 2.38.08.16.13.35.02.56-.11.21-.16.35-.32.53-.16.18-.34.4-.48.54-.16.16-.33.33-.14.66.19.32.85 1.4 1.83 2.27 1.26 1.13 2.32 1.48 2.65 1.64.34.16.54.13.74-.08.21-.21.85-.99 1.08-1.33.24-.34.47-.28.8-.16.32.11 2.05.97 2.4 1.14.35.18.58.27.66.42.08.14.08.82-.19 1.6z"/>
      </svg>
    </a>
  );
}
