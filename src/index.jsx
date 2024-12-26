import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./routes/Login";
import "./index.css";
import Console from "./routes/Console";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="bg-main bg-cover bg-center text-gray-900 flex items-center justify-center h-screen font-sans">
      <div className="aspect-ratio-9-16 bg-white shadow-lg rounded-lg flex flex-col">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/console/:code" element={<Console />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  </React.StrictMode>,
);
