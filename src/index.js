import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Templates from './components/Templates';
import BrandKit from './components/BrandKit';
import PodcastShows from './components/PodcastShows';
import AllVideos from './components/AllVideos';
import Video from './components/Video';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/template',
    element: <Templates />,
  },
  {
    path: '/brandKit',
    element: <BrandKit />,
  },
  {
    path: '/podcastShows',
    element: <PodcastShows />,
  },
  {
    path: '/allVideos',
    element: <AllVideos />,
  },
  {
    path: '/video',
    element: <Video/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
