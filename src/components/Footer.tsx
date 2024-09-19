import React from "react";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center p-4">
      <p className="text-center text-sm">
        &copy; 2021{" "}
        <a
          href="https://div-display.vercel.app"
          className="font-semibold text-blue-500"
        >
          Div Display
        </a>
      </p>
    </footer>
  );
}
