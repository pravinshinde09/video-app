import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button } from "@mui/material";
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import SubtitlesRoundedIcon from '@mui/icons-material/SubtitlesRounded';
import TextFieldsRoundedIcon from '@mui/icons-material/TextFieldsRounded';
import FontDownloadRoundedIcon from '@mui/icons-material/FontDownloadRounded';

const Video = () => {
  const [activePanel, setActivePanel] = useState("selling");
  const videoRef = useRef(null);

  const handleButtonClick = (panel) => {
    setActivePanel(panel);
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSection}>
        <div style={styles.leftPanel}>
          <div style={{ display: "flex", padding: "20px", gap: "10px", flexDirection: 'column' }}>
            <Button startIcon={<SettingsRoundedIcon />} onClick={() => handleButtonClick("selling")} style={styles.button}>
              <p style={{marginTop: '8px', marginBottom: '-5px'}}>Selling</p>
            </Button>
            <Button startIcon={<AddBoxRoundedIcon />} onClick={() => handleButtonClick("media")} style={styles.button}>
            <p style={{marginTop: '8px', marginBottom: '-5px'}}>Media</p>
            </Button>
            <Button startIcon={<LibraryMusicRoundedIcon />} onClick={() => handleButtonClick("audio")} style={styles.button}>
            <p style={{marginTop: '8px', marginBottom: '-5px'}}>Audio</p>
            </Button>
            <Button startIcon={<SubtitlesRoundedIcon />} onClick={() => handleButtonClick("subtitle")} style={styles.button}>
            <p style={{marginTop: '8px', marginBottom: '-5px'}}>Subtitle</p>
            </Button>
            <Button startIcon={<TextFieldsRoundedIcon />} onClick={() => handleButtonClick("text")} style={styles.button}>
            <p style={{marginTop: '8px', marginBottom: '-5px'}}>Text</p>
            </Button>
            <Button startIcon={<FontDownloadRoundedIcon />} onClick={() => handleButtonClick("element")} style={styles.button}>
            <p style={{marginTop: '8px', marginBottom: '-5px'}}>Element</p>
            </Button>
          </div>
        </div>
        <div style={styles.slider}>
          {activePanel === "selling" && (
            <div style={styles.panel}>
              <h2 style={{ margin: "10px 0px" }}>Selling Content</h2>
              <p style={{ margin: "2px 0px" }}>Size</p>
              <select style={styles.dropdown}>
                <option value="" disabled>
                  Select Size
                </option>
                <option value="small">Original (16:9)</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
              <p style={{ margin: "4px 0px" }}>Background</p>
              <div style={styles.backgroundContainer}>
                <div style={styles.colorRow}>
                  <p>Color</p>
                  <p>#000000</p>
                </div>
                <div style={styles.separator} />
                <div style={styles.colorRow}>
                  <p>Color</p>
                  <p>#000000</p>
                </div>
              </div>
              <p>Audio</p>
              <div style={styles.audioContainer}>
                <div style={styles.audioContent}>
                  <p style={{ margin: "2px 0px" }}>Clean Audio</p>
                  <p style={styles.audioSubtext}>Remove background noise</p>
                </div>
              </div>
            </div>
          )}
          {activePanel === "media" && <div style={styles.panel}>Media Content</div>}
          {activePanel === "audio" && <div style={styles.panel}>Audio Content</div>}
          {activePanel === "subtitle" && <div style={styles.panel}>Subtitle Content</div>}
          {activePanel === "text" && <div style={styles.panel}>Text Content</div>}
          {activePanel === "element" && <div style={styles.panel}>Element Content</div>}
        </div>
      </div>
      <div style={styles.videoContainer}>
        <p>Project Name</p>
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

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
  },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
    height: "100%",
  },
  leftPanel: {
    width: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    border: "1px solid gray",
    backgroundColor: "#f8f8f8",
    overflowY: "hidden",
  },
  button: {
    width: "100%",
    alignItems: 'cnter',
    padding: "10px",
    flexDirection: 'column',
    margin: "5px 0",
    backgroundColor: "white",
    color: "black",
    height: "70%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  },
  slider: {
    flex: 1,
    height: "100vh",
    overflow: "auto",
  },
  panel: {
    width: "300px",
    height: "calc(100vh - 30px)",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    overflowY: "auto",
  },
  dropdown: {
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
  },
  backgroundContainer: {
    border: "1px solid gray",
    borderRadius: "10px",
    padding: "10px",
  },
  colorRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  separator: {
    border: "1px solid gray",
    width: "100%",
    margin: "10px 0",
  },
  audioContainer: {
    border: "1px solid gray",
    borderRadius: "10px",
    padding: "10px",
  },
  audioContent: {
    marginLeft: "10px",
  },
  audioSubtext: {
    fontSize: "12px",
    margin: "2px 0",
  },
  videoContainer: {
    width: "60%",
    padding: "30px",
    boxSizing: "border-box",
  },
  videoPlayerContainer: {
    width: "80%",
    padding: "10px",
  },
};

export default Video;


