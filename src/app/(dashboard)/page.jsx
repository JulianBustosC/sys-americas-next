import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
 let isAuth = localStorage.getItem("jwt") !== null; 
 

  if (!isAuth) {

    redirect("/login");
  } 
  

  
  return <h1>Bienvenido</h1>;
}