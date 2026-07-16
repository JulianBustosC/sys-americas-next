import React from "react";
import "./Main.css"
import Card from "./Card";
import "./Header.css"
import { IoPersonCircle, IoNotificationsCircle } from "react-icons/io5";
import Inicio from "./Inicio";
const Main = () => {
  return (
    <main className="main" style={{  padding: '20px' }}>
      <Inicio />
    </main>
  );
}

export default Main;