import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import Coinpage from "./Pages/Coinpage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div
          style={{
            backgroundColor: "rgb(20,22,26)",
            color: "white",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
