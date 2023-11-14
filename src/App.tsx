import React from "react";
import "./App.css";
import { BirthdaysApp } from "./components/birthdays-app/BirthdaysApp";
import { BirthdayContextProvider } from "./context-providers/BirthdayContextProvider";

function App() {
  return (
    <div className="app" data-testid="react-app">
      <BirthdayContextProvider>
        <BirthdaysApp />
      </BirthdayContextProvider>
    </div>
  );
}

export default App;
