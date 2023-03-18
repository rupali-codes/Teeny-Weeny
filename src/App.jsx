import React from "react";
import Index from "./components/Index";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <section>
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
      <ToastContainer />
    </section>
  );
};

export default App;
