import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"
import Dashboard from "./Pages/DashBoard/DashBoard"
import Upload from "./Pages/Upload/Upload"
import Home from "./Pages/Home/Home"


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/Dashboard" element={<Dashboard />}/>
            <Route  path="/upload" element={<Upload/>}/>     
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
