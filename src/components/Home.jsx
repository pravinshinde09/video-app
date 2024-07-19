import React, { useRef,useState } from "react";
import Sidebar from "./Slider";
import { Button } from "@mui/material";
import ReactPlayer from "react-player";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import VideocamIcon from '@mui/icons-material/Videocam';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import MicNoneIcon from '@mui/icons-material/MicNone';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';

const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const videoRef = useRef(null);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const styles = {
    container: {
      display: "flex",
      backgroundColor: "#f7f7f9",
    },
    mainContent: {
      marginLeft: isSidebarOpen ? "10px" : "0",
      transition: "margin-left 0.3s",
      padding: "20px",
      width: "100%",
    },
    toggleButton: {
      top: "5px",
      left: isSidebarOpen ? "260px" : "10px",
      zIndex: "1000",
      color: "black",
      border: "none",
      cursor: "pointer",
    },
    searchBar: {
      padding: "10px",
      fontSize: "16px",
      margin: "10px 0",
      width: "100%",
      boxSizing: "border-box",
      borderRadius: "10px",
    },
    TopButtonStyle: {
      border: "1px",
      paddingInline: "20px",
      padding: '10px',
      marginInline: '10px',
      marginTop: '30px',
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
      fontWeight: 'bold',
    },

    videoPlayerContainer: {
      width:'40%',
      padding: "10px",
      borderRadius: "10%",
      
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

          <div style={{ position: 'absolute', right: '0',top: '0' }}>
            <button startIcon={<BoltOutlinedIcon/>} style={styles.TopButtonStyle} >Upgrade</button>
            <button startIcon={<BoltOutlinedIcon/>} style={styles.TopButtonStyle} >Invite</button>
            <img src="avatar.jpg" alt="Avatar" style={styles.avatar} />
          </div>

        </div>
        <p style={{ fontSize: "24px", marginTop: '60px', marginLeft: '20px' }}>
          Let's Create some <span style={{ fontWeight: "bold" }}>Videos!</span>{" "}
        </p>
        <div style={{ display: "flex", padding: "20px", gap: "60px", flexDirection: 'row' }}>
          <div style={styles.buttonStyle}>
            <Button startIcon={<ContentCutIcon />} style={{color:'purple'}}>
              <p style={{ fontSize: '15px', fontWeight: '10px', color: 'black' }}>Create Project</p>
            </Button>
          </div>
          <div style={styles.buttonStyle}>
            <Button startIcon={<VideocamIcon />} style={{color:'red'}} >
              <p style={{ fontSize: '15px', fontWeight: '10px', color: 'black' }}>Record Video</p>
            </Button>
          </div>
          <div style={styles.buttonStyle}>
            <Button startIcon={<PodcastsIcon />} style={{color:'green'}} >
              <p style={{ fontSize: '15px', fontWeight: '10px', color: 'black' }}>Go Live</p>
            </Button>
          </div>
          <div style={styles.buttonStyle}>
            <Button startIcon={<MicNoneIcon />} style={{color:'yellow'}}>
              <p style={{ fontSize: '15px', fontWeight: '10px', color: 'black' }}>Record Podcast</p>
            </Button>
          </div>
        </div>
        <div style={{marginLeft: '10px',fontSize: '25px'}}>
          <p >My Recent Videos</p>
        </div>
        <div style={styles.videoPlayerContainer}>
          <ReactPlayer
            url="https://www.w3schools.com/html/mov_bbb.mp4"
            controls
            ref={videoRef}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
