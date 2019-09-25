import React from "react";
import Routes from "./Routes";
import './custom.css';
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
momentDurationFormatSetup(moment);

function App() {
  return <Routes />;
}

export default App;
