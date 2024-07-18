import React, { useState } from "react";
import Sidebar from "./Slider";

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const styles = {
    container: {
      display: "flex",
      backgroundColor: "#DADADA",
    },
    mainContent: {
      marginLeft: isSidebarOpen ? "10px" : "0",
      transition: "margin-left 0.3s",
      padding: "20px",
      width: "100%",
    },
    toggleButton: {
      top: "10px",
      left: isSidebarOpen ? "260px" : "10px",
      zIndex: "1000",
      color: "black",
      border: "none",
      cursor: "pointer",
    },
    searchBar: {
      padding: "10px",
      fontSize: "16px",
      margin: "20px 0",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "10px",
    },
    TopButtonStyle: {
        border: "1px",
        paddingInline: "20px",
        padding:'10px',
        marginInline:'10px',
        borderRadius: "10px",
        backgroundColor: 'white',
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.3s ease", 
    },
    buttonStyle: {
        border: "1px",
        paddingInline: "20px",
        borderRadius: "10px",
        backgroundColor: 'white',
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "box-shadow 0.3s ease", 
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        marginRight: '10px',
      },
  };

  return (
    <div style={styles.container}>
      <Sidebar isOpen={isSidebarOpen} />
      <div style={styles.mainContent}>
        <div style={{ display: "flex", gap: "20px" }}>
          <div style={styles.toggleButton} onClick={toggleSidebar}>
            <h2>{isSidebarOpen ? ">" : "<"}</h2>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value=""
              style={styles.searchBar}
            />
          </div>

          <div style={{position:'absolute', right:'0',top:'0'}}>
          <button style={styles.TopButtonStyle}>Upgrade</button>
          <button style={styles.TopButtonStyle}>Invite</button>
          <img src="avatar.jpg" alt="Avatar" style={styles.avatar} />
          </div>

        </div>
        <p style={{ fontSize: "24px" }}>
          Let's Create some <span style={{ fontWeight: "bold" }}>Videos!</span>{" "}
        </p>
        <div style={{ display: "flex", padding: "20px", gap: "40px" }}>
          <div style={styles.buttonStyle}>
            <p>Create Project</p>
          </div>
          <div style={styles.buttonStyle}>
            <p>Record Video</p>
          </div>
          <div style={styles.buttonStyle}>
            <p>Go Live</p>
          </div>
          <div style={styles.buttonStyle}>
            <p>Record Podcast</p>
          </div>
        </div>
        <div>
            <p>My Recent Videos</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
