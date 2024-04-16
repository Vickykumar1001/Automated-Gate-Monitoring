import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageUploader from "./ImageUploader";
import NotRegistered from "./NotRegistered";
import Suspicious from "./Suspicious";
import Successful from "./Successful";
import Navbar from "./Navbar";
function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ImageUploader />} />
          <Route path="/notregistered" element={<NotRegistered />} />
          <Route path="/suspicious" element={<Suspicious />} />
          <Route path="/successful" element={<Successful />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
