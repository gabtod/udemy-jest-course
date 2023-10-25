import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [btnColour, setBtnColour] = useState("red");
  const newBtnColour = btnColour === "red" ? "blue" : "red";
  return (
    <div>
      <button style={{ "background-color": btnColour }} onClick={()=> setBtnColour(newBtnColour)}>
        Change to {newBtnColour}
      </button>
    </div>
  );
}

export default App;
