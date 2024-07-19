import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

const Slider1 = () => {
  const videoRef = useRef(null);
  const [frames, setFrames] = useState([]);

  useEffect(() => {
    const video = videoRef.current.getInternalPlayer();
    if (video) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const frameRate = 1; // 1 frame per second

      const captureFrame = () => {
        if (video.currentTime >= video.duration) {
          return;
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          const frame = canvas.toDataURL();
          setFrames((prevFrames) => [...prevFrames, frame]);
        } catch (error) {
          console.error('Error capturing frame:', error);
        }
        video.currentTime += frameRate;
      };

      const handleLoadedData = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        captureFrame();
      };

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('seeked', captureFrame);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('seeked', captureFrame);
      };
    }
  }, [videoRef.current]);

  return (
    <div style={styles.videoEditor}>
      <ReactPlayer
                url="https://cors-anywhere.herokuapp.com/https://www.w3schools.com/html/mov_bbb.mp4"
                controls
                ref={videoRef}
                config={{ file: { attributes: { crossOrigin: 'anonymous' } } }}
            />
      {/* <ReactPlayer
        url='./natureVideo.mp4'
        controls
        ref={videoRef}
        config={{ file: { attributes: { crossOrigin: 'anonymous' } } }}
      /> */}
      <div style={styles.framesTimeline}>
        {frames.map((frame, index) => (
          <div key={index} style={styles.frame}>
            <img src={frame} alt={`Frame ${index}`} style={styles.frameImage} />
            <span style={styles.frameText}>{index + 1}s</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  videoEditor: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  framesTimeline: {
    display: 'flex',
    overflowX: 'auto',
    marginTop: '20px',
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: '10px',
  },
  frameImage: {
    width: '100px',
    height: 'auto',
    border: '1px solid #ccc',
    marginBottom: '5px',
  },
  frameText: {
    fontSize: '12px',
  },
};

export default Slider1;
