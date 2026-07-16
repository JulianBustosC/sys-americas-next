import React from "react";

const DashboardPage = () => {
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
};

export default DashboardPage;
