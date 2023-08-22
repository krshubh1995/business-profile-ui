import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Profile from "./profile/Profile";
import { ApplicationTheme } from "./common/ApplicationTheme";

function App() {
  return (
    <div className="App">
      <ApplicationTheme>
      <Profile></Profile>
      </ApplicationTheme>
    </div>
  );
}

export default App;
