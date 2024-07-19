// import React, { useState, useRef, useEffect } from 'react';
// import ReactPlayer from 'react-player';
// import styled from 'styled-components';
// import { Button, Slider, TextField } from '@material-ui/core';
// import { Stage, Layer, Text } from 'react-konva';
// // import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
// import createFFmpeg from '@ffmpeg/ffmpeg';
// import fetchFile from '@ffmpeg/ffmpeg';


// const VideoEditor = () => {
//   const [videoUrl, setVideoUrl] = useState('');
//   const [playbackRate, setPlaybackRate] = useState(1);
//   const [trimStart, setTrimStart] = useState(0);
//   const [trimEnd, setTrimEnd] = useState(null);
//   const [textOverlay, setTextOverlay] = useState('');
//   const [exporting, setExporting] = useState(false);
//   const playerRef = useRef(null);
//   const ffmpeg = createFFmpeg({ log: true });

//   useEffect(() => {
//     if (!ffmpeg.isLoaded()) {
//       ffmpeg.load();
//     }
//   }, []);

//   const handleVideoUpload = (event) => {
//     const file = event.target.files[0];
//     const url = URL.createObjectURL(file);
//     setVideoUrl(url);
//     setTrimEnd(null); // Reset trim end
//   };

//   const handlePlaybackRateChange = (event, newValue) => {
//     setPlaybackRate(newValue);
//   };

//   const handleTrimChange = (event, newValue) => {
//     const [start, end] = newValue;
//     setTrimStart(start);
//     setTrimEnd(end);
//   };

//   const handleExport = async () => {
//     if (!videoUrl || trimEnd === null) return;
//     setExporting(true);

//     const videoBlob = await fetch(videoUrl).then(r => r.blob());
//     const videoFile = new File([videoBlob], 'video.mp4', { type: 'video/mp4' });

//     ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoFile));

//     const command = `-i input.mp4 -ss ${trimStart} -to ${trimEnd} -c copy output.mp4`;
//     await ffmpeg.run(...command.split(' '));

//     const data = ffmpeg.FS('readFile', 'output.mp4');
//     const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'trimmed_video.mp4';
//     a.click();

//     setExporting(false);
//   };

//   return (
//     <Container>
//       <Header>
//         <input type="file" accept="video/*" onChange={handleVideoUpload} />
//         <Slider
//           value={playbackRate}
//           onChange={handlePlaybackRateChange}
//           aria-labelledby="playback-rate-slider"
//           step={0.1}
//           min={0.5}
//           max={2}
//           valueLabelDisplay="auto"
//         />
//         <TextField
//           label="Text Overlay"
//           variant="outlined"
//           value={textOverlay}
//           onChange={(e) => setTextOverlay(e.target.value)}
//         />
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleExport}
//           disabled={exporting}
//         >
//           {exporting ? 'Exporting...' : 'Export Video'}
//         </Button>
//       </Header>
//       <Editor>
//         <ReactPlayer
//           ref={playerRef}
//           url={videoUrl}
//           controls
//           playbackRate={playbackRate}
//           width="100%"
//           height="100%"
//         />
//         <Slider
//           value={[trimStart, trimEnd === null ? playerRef.current?.getDuration() : trimEnd]}
//           onChange={handleTrimChange}
//           aria-labelledby="trim-slider"
//           min={0}
//           max={playerRef.current?.getDuration()}
//           valueLabelDisplay="auto"
//         />
//         <Stage width={600} height={400}>
//           <Layer>
//             <Text text={textOverlay} fontSize={24} fill="white" draggable />
//           </Layer>
//         </Stage>
//       </Editor>
//     </Container>
//   );
// };

// export default VideoEditor;

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
//   width: 100%;
//   margin-bottom: 20px;
// `;

// const Editor = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 80%;
// `;
