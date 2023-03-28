import React from "react";
import "./styles/Global.css";
import { BrowserRouter as Router } from "react-router-dom";

import AnimatedRoutes from "./AnimatedRoutes";

const App: React.FC = () => {
  return (
    <Router>
      <>
        <AnimatedRoutes />
      </>
    </Router>
  );
};

export default App;
