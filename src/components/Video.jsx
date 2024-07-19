import React, { useState, useRef, useEffect } from 'react';

const Videos = () => {
  const [scale, setScale] = useState(100);
  const [opacity, setOpacity] = useState(100);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [frames, setFrames] = useState([]);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
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

  const containerStyle = {
    display: 'grid',
    gridTemplateAreas: `
      "assets editor properties"
      "timeline timeline timeline"
    `,
    gridTemplateColumns: '1fr 3fr 1fr',
    gridTemplateRows: '1fr auto',
    height: '100vh',
  };

  const assetsStyle = {
    gridArea: 'assets',
    borderRight: '1px solid #ccc',
    padding: '10px',
  };

  const assetItemStyle = {
    background: '#f0f0f0',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    cursor: 'pointer',
  };

  const editorStyle = {
    gridArea: 'editor',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
  };

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
  };

  const previewStyle = {
    flexGrow: 1,
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  };

  const controlsStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ccc',
  };

  const videoAreaStyle = {
    flexGrow: 1,
    position: 'relative',
  };

  const videoStyle = {
    width: '100%',
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
    borderLeft: '1px solid #ccc',
    padding: '10px',
  };

  const propertyItemStyle = {
    marginBottom: '10px',
  };

  const timelineStyle = {
    gridArea: 'timeline',
    borderTop: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
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

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
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

  return (
    <div style={containerStyle}>
      <div style={assetsStyle}>
        <p>Assets</p>
        <div style={assetItemStyle} onClick={() => videoRef.current.src = "/video/video.mp4"}>vid-video.mpg</div>
        <div style={assetItemStyle} onClick={() => videoRef.current.src = "/video/walking.mp4"}>walking.mp4</div>
        <div style={assetItemStyle} onClick={() => videoRef.current.src = "/video/happy.mp4"}>happy.mp4</div>
      </div>
      <div style={editorStyle}>
        <div style={toolbarStyle}>
          <button>Export</button>
        </div>
        <div style={previewStyle}>
          <div style={controlsStyle}>
            <button onClick={() => videoRef.current.currentTime -= 5}>&lt;&lt;</button>
            <button onClick={handlePlayPause}>Play/Pause</button>
            <button onClick={() => videoRef.current.currentTime += 5}>&gt;&gt;</button>
            <input type="range" value={(currentTime / duration) * 100} onChange={handleSeek} />
            <span>{`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60)}`} / {`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}</span>
          </div>
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
        <div style={propertyItemStyle}>
          <label>Scale</label>
          <input type="range" value={scale} onChange={(e) => setScale(e.target.value)} />
        </div>
        <div style={propertyItemStyle}>
          <label>Opacity</label>
          <input type="range" value={opacity} onChange={(e) => setOpacity(e.target.value)} />
        </div>
        <div style={propertyItemStyle}>
          <label>Rotation</label>
          <input type="number" value={rotation.x} onChange={(e) => setRotation({ ...rotation, x: e.target.value })} />
          <input type="number" value={rotation.y} onChange={(e) => setRotation({ ...rotation, y: e.target.value })} />
          <input type="number" value={rotation.z} onChange={(e) => setRotation({ ...rotation, z: e.target.value })} />
        </div>
        <div style={propertyItemStyle}>
          <label>Position</label>
          <input type="number" value={position.x} onChange={(e) => setPosition({ ...position, x: e.target.value })} />
          <input type="number" value={position.y} onChange={(e) => setPosition({ ...position, y: e.target.value })} />
          <input type="number" value={position.z} onChange={(e) => setPosition({ ...position, z: e.target.value })} />
        </div>
      </div>
      <div style={timelineStyle}>
        <p>Timeline</p>
        <div style={trackStyle}>
          {frames.map((frame, index) => (
            <div key={index} onClick={() => handleFrameClick(frame.time)}>
              {frame.image && <img src={frame.image} alt={`Frame at ${frame.time}s`} style={frameStyle} />}
              <p>{`${Math.floor(frame.time / 60)}:${Math.floor(frame.time % 60)}`}</p>
            </div>
          ))}
          <div style={verticalLineStyle}></div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default Videos;
