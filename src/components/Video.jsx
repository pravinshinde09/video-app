import React, { useState, useRef, useEffect } from 'react';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { AdsClick, ContentCut, CopyAll, Crop, IosShare, Save, ZoomIn, ZoomOut } from '@mui/icons-material';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import { FaPlus } from 'react-icons/fa';
import { BsGrid3X3 } from 'react-icons/bs';
import { MdViewList } from 'react-icons/md';


const Videos = () => {
  const [scale, setScale] = useState(100);
  const [opacity, setOpacity] = useState(100);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [frames, setFrames] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
    generateFrames();
  };

  const generateFrames = () => {
    const frameInterval = 1;
    const frameCount = Math.floor(videoRef.current.duration / frameInterval);
    const newFrames = [];

    for (let i = 0; i <= frameCount; i++) {
      newFrames.push({
        time: i * frameInterval,
        image: null,
      });
    }

    setFrames(newFrames);
    captureAllFrames(newFrames, frameInterval);
  };

  const captureFrame = (time) => {
    return new Promise((resolve) => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      video.currentTime = time;

      const onSeeked = () => {
        canvas.width = video.videoWidth / 5;
        canvas.height = video.videoHeight / 5;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        resolve(dataURL);
        video.removeEventListener('seeked', onSeeked);
      };

      video.addEventListener('seeked', onSeeked);
    });
  };

  const captureAllFrames = async (frames, frameInterval) => {
    const updatedFrames = [];
    for (let frame of frames) {
      const image = await captureFrame(frame.time);
      updatedFrames.push({ ...frame, image });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    setFrames(updatedFrames);
  };

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false)
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    videoRef.current.currentTime = newTime;
  };

  const handleFrameClick = (time) => {
    videoRef.current.currentTime = time;
  };

  const handleMouseMove = (event) => {
    if (!timelineRef.current) return;

    const rect = timelineRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * duration;

    // Update the video playback
    const video = videoRef.current;
    if (video) {
      video.currentTime = newTime;
    }

    // Update the vertical line position
    setCurrentTime(newTime);
  };

  const handleMouseDown = (event) => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateAreas: `
      "assets editor properties"
      "timeline timeline timeline"
    `,
    gridTemplateColumns: '1fr 2fr 1fr',
    gridTemplateRows: '1fr auto',
    height: '100vh',
  };

  const assetsStyle = {
    position:"relative",
    gridArea: 'assets',
    borderRight: '1px solid #ccc',
    padding: '10px',
    backgroundColor: "#E9EAEC",
  };

  const assetItemStyle = {
    backgroundColor: "black",
    width: "150px",
    height: "100px",
    border: '1px solid #ccc',
    borderRadius: '10px',
    cursor: 'pointer',
  };

  const editorStyle = {
    gridArea: 'editor',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    background: '#E9EAEC',
  };

  const toolbarStyle = {
    display: 'flex',
    gap: "10px",
    justifyContent: 'center',
    marginTop: "20px"
  };

  const iconBar = {
    width:"100%",
    position:"absolute",
    alignItems: 'center',
    bottom:'0px',
    right:"0px",
    backgroundColor:"white",
    alignItems:"end"
  };
  
  const iconSet =  {
    marginLeft:"60%",
    padding:"10px",
    display: 'flex',
    gap: '15px',
    backgroundColor:"white"
  };
  
  const icon = {
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'color 0.3s',
  };
  
  const iconHover = {
    color: '#0073e', /* Change this color to your desired hover color */
  }
  

  const previewStyle = {
    flexGrow: 1,
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  };

  const controlsStyle = {
    gap: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ccc',
  };

  const videoAreaStyle = {
    flexGrow: 1,
    position: 'relative',
    height: "auto"
  };

  const videoStyle = {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#000',
    transform: `scale(${scale / 100}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
    opacity: opacity / 100,
    objectFit: 'cover',
  };

  const propertiesStyle = {
    gridArea: 'properties',
    background: '#E9EAEC',
    padding: '10px',
    paddingLeft: "20px"
  };

  const propertyItemStyle = {
    marginBottom: '10px',
    marginTop: "20px",
  };

  const timelineStyle = {
    gridArea: 'timeline',
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  const trackStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    overflowX: 'scroll',
    position: 'relative',
  };

  const frameStyle = {
    width: '80px',
    height: '45px',
    marginRight: '5px',
    cursor: 'pointer',
  };

  const verticalLineStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '2px',
    backgroundColor: 'red',
    left: `${(currentTime / duration) * 100}%`,
    transform: 'translateX(-50%)',
  };
  const VideoButtonStyle = {
    borderRadius: '100%',
    padding: "2px 5px",
    justifyContent: 'center',
    border: 'none'
  };
  const ButtonStyle = {
    padding: "2px 5px",
    justifyContent: 'center',
    border: 'none',
    backgroundColor: "#ffffff",
    marginLeft: "20px"
  };
  const iconStyle = {
    marginTop: '2px'
  };
  const buttonBarStyle = {
    position: "absolute",
    display: "flex",
    gap: "20px",
    right: '10px'
  }





  return (
    <div style={containerStyle}>
      <div style={assetsStyle}>
        <p style={{ fontSize: '30px', marginTop: '-5px', fontWeight: '500' }}>Assets</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div>
            <div style={assetItemStyle} onClick={() => videoRef.current.src = "/video/video.mp4"} >
              {/* <img src='/images/nature.png' alt='' style={{width:'100%'}} /> */}
            </div>
            <p>vid-video.mpg</p>
          </div>
          <div>
            <div style={assetItemStyle} onClick={() => videoRef.current.src = "/video/walking.mp4"} >
              {/* <img src='/images/walking.png' alt=''  /> */}
            </div>
            <p>walking.mp4</p>
          </div>
        </div>
        <div style={iconBar}>
          <div style={iconSet}>
              <FaPlus style={{...icon, marginRight:"20px"}} /> 
            <BsGrid3X3 style={icon} />
            <MdViewList style={icon} />
          </div>
        </div>
      </div>

      <div style={editorStyle}>
        <div style={toolbarStyle}>
          <AdsClick />
          <Crop />
          <TouchAppOutlinedIcon />
          <button style={{ ...ButtonStyle, marginLeft: '2px' }}>{scale} %</button>
        </div>
        <div style={previewStyle}>
          <div style={videoAreaStyle}>
            <video
              ref={videoRef}
              style={videoStyle}
              onTimeUpdate={handleTimeUpdate}
              controls={true}
            >
              <source src="video/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <div style={propertiesStyle}>
        <div style={buttonBarStyle}>
          <button style={{ border: "none", backgroundColor: "gray", display: "flex", borderRadius: '5px'}}><p style={{ color: "white", margin: "5px", paddingTop: "2px"  }}>Dashboard</p></button>
          <button style={{ border: "none", backgroundColor: "#ffffff", display: "flex",borderRadius: '5px' }}><IosShare /> <p style={{ margin: "5px", paddingTop: "3px"}}>Export</p></button>
        </div>
        <div style={{ ...propertyItemStyle, marginTop: "25%" }}>
          <label>Scale</label>
          <input type="range" value={scale} onChange={(e) => setScale(e.target.value)} />
          <button style={{...ButtonStyle, marginLeft:"40px"}}>{scale} %</button>
        </div>
        <div style={propertyItemStyle}>
          <label >Opacity</label>
          <input type="range" value={opacity} onChange={(e) => setOpacity(e.target.value)} />
          <button style={ButtonStyle}>{opacity} %</button>
        </div>
        <div style={propertyItemStyle}>
          <label style={{paddingRight:"10px"}}>Rotation</label>
          <input style={{width:'30px'}} type="number" value={rotation.x} onChange={(e) => setRotation({ ...rotation, x: e.target.value })} />
          <input style={{width:'30px'}} type="number" value={rotation.y} onChange={(e) => setRotation({ ...rotation, y: e.target.value })} />
          <input style={{width:'30px'}} type="number" value={rotation.z} onChange={(e) => setRotation({ ...rotation, z: e.target.value })} />
        </div>
        <div style={propertyItemStyle}>
          <label style={{paddingRight:"10px"}}>Position</label>
          <input type="number" value={position.x} onChange={(e) => setPosition({ ...position, x: e.target.value })} />
          <input type="number" value={position.y} onChange={(e) => setPosition({ ...position, y: e.target.value })} />
          <input type="number" value={position.z} onChange={(e) => setPosition({ ...position, z: e.target.value })} />
        </div>
      </div>

      <div style={timelineStyle}>
        <div style={controlsStyle}>
          <button onClick={() => videoRef.current.currentTime -= 5} style={VideoButtonStyle}>
            <SkipPreviousIcon style={iconStyle} />
          </button>
          <button onClick={handlePlayPause} style={VideoButtonStyle}>{
            isPlaying ? <PauseIcon style={iconStyle} /> : <PlayArrowIcon style={iconStyle} />
          }</button>
          <button onClick={() => videoRef.current.currentTime += 5} style={VideoButtonStyle}><SkipNextIcon style={iconStyle} /></button>
          <input style={{color:'orange'}} type='range' value={(currentTime / duration) * 100} onChange={handleSeek} />
          <span>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`} / {`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}</span>
        </div>
        <div style={{ padding: '10px' }}>
          <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
            <UndoIcon />
            <RedoIcon />
            <ContentCut />
            <CopyAll />
            <Save />
            <div>
              <ZoomOut />
              <input type='range' style={{ margin: "0px" }} />
              <ZoomIn />
            </div>
          </div>
          <div
            ref={timelineRef}
            style={timelineStyle}
            onMouseDown={handleMouseDown}
          >
            <div style={trackStyle}>
              {frames.map((frame, index) => (
                <div key={index} onClick={() => handleFrameClick(frame.time)}>
                  {frame.image && <img src={frame.image} alt={`Frame at ${frame.time}s`} style={frameStyle} />}
                  <p>{`${Math.floor(frame.time / 20)}:${Math.floor(frame.time % 20)}`}</p>
                </div>
              ))}
              <div className="vertical-line" style={verticalLineStyle}></div>
            </div>
          </div>
        </div>

      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default Videos;
