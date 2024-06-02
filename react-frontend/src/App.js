import React from "react";
import HeaderComponent from "./components/HeaderComponent";
import ListBugComponent from "./components/ListBugComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddBugComponent from "./components/AddBugComponent";
import UpdateBugComponent from "./components/UpdateBugComponent";
import ViewBugComponent from "./components/ViewBugComponent";
import HomeComponent from "./components/HomeComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/recordBug" element={<ListBugComponent />} />
            <Route path="/addBug" element={<AddBugComponent />} />
            <Route path="/updateBug/:id" element={<UpdateBugComponent />} />
            <Route path="/viewBug/:id" element={<ViewBugComponent />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
