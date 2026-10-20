
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";



export default function PruebaLayout({ children }) {
  return (
       <>
       
        <div style={{ display: 'flex' }}>
            
          
          <Sidebar/>
          <main style={{ flex: 1 }}>
            {children}  
          </main>
          
        </div>
       </>
       
     
  );
}
