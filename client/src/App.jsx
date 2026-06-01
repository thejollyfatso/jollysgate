import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import FoodApp from "./views/FoodApp";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food/*" element={<FoodApp />} />
      </Routes>
    </BrowserRouter>
  );
}
