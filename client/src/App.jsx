import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import FoodApp from "./views/FoodApp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food/*" element={<FoodApp />} />
      </Routes>
    </BrowserRouter>
  );
}
