
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";


export default function dashboardLayout({ children }) {
  return (
       <>
        <Header />
        <div style={{ display: 'flex' }}>
            <h1>Dashboard</h1>
          
          <Sidebar/>
          <main style={{ flex: 1 }}>
            {children}  
          </main>
          
        </div>
       </>
       
     
  );
}
