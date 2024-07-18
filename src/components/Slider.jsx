import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen}) => {
  const styles = {
    sidebar: {
      width: isOpen ? '250px' : '0',
      height: '100vh',
      backgroundColor: 'white',
      color: 'black',
      alignItems: 'center',
      padding: isOpen ? '20px' : '0',
      overflowX: 'hidden',
      transition: '0.3s',
    },
    header: {
      marginBottom: '20px',
    },
    headerText: {
      margin: '0',
      fontSize: '24px',
    },
    profile: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
    },
    avatar: {
      width: '50px',
      height: '50px',
      backgroundColor:'green',
      borderRadius: '10%',
      marginRight: '10px',
    },
    nameDropdown: {
      
    },
    name: {
      // marginBottom: '5px',
      fontSize: '12px',
    },
    dropdown: {
      backgroundColor: '#34495e',
      border: 'none',
      color: 'white',
    },
    newVideoButton: {
      marginBottom: '20px',
      padding: '10px 20px',
      backgroundColor: '#e74c3c',
      border: 'none',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    navItem: {
      padding: '10px 20px',
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    navItemHover: {
      backgroundColor: '#34495e',
    },
    iconHome: {
      marginRight: '10px',
    },
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <h1 style={styles.headerText}>Company Name</h1>
      </div>
      <div style={styles.profile}>
        <button style={styles.avatar}>D</button>
        <div style={styles.nameDropdown}>
          <p style={styles.name}>User Name</p>
          <p>Free plan</p>
        </div>
        <p>{`>`}</p>
        
      </div>
      <Link to={'/video'}>
      <button style={styles.newVideoButton}>New Video</button>
      </Link>
      
      <nav style={styles.nav}>
        <Link to={'/'}>Home</Link>
        <Link to={'/template'}>Template</Link>
        <Link to={'/allVideos'}>All Videos</Link>
        <Link to={'/podcastShows'}>Podcast & Shows</Link>
        <Link to={'/brandKit'}>Brand Kit</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
















// import React from 'react';
// import { Link } from 'react-router-dom';

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const styles = {
//     sidebar: {
//       width: isOpen ? '250px' : '0',
//       height: '100vh',
//       backgroundColor: 'gray',
//       color: 'black',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'left',
//       padding: isOpen ? '20px' : '0',
//     },
//     header: {
//       marginBottom: '20px',
//     },
//     headerText: {
//       margin: '0',
//       fontSize: '24px',
//     },
//     profile: {
//       display: 'flex',
//     },
//     avatar: {
//       width: '50px',
//       height: '50px',
//       borderRadius: '10%',
//       marginRight: '10px',
//       backgroundColor:'green',
//     },
//     nameDropdown: {
//     },
//     name: {
//       marginBottom: '5px',
//       fontSize: '18px',
//     },
//     dropdown: {
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: 'white',
//       padding: '5px',
//     },
//     newVideoButton: {
//       marginBottom: '20px',
//       padding: '10px 20px',
//       backgroundColor: '#e74c3c',
//       border: 'none',
//       color: 'white',
//       fontSize: '16px',
//       cursor: 'pointer',
//     },
//     nav: {
//       display: 'flex',
//       flexDirection: 'column',
//       width: '100%',
//     },
//     navItem: {
//       padding: '10px 20px',
//       color: 'white',
//       textDecoration: 'none',
//       display: 'flex',
//       alignItems: 'center',
//     },
//     navItemHover: {
//       backgroundColor: '#34495e',
//     },
//     iconHome: {
//       marginRight: '10px',
//     },
//   };

//   return (
//     <div style={styles.sidebar}>
//       <div style={styles.header}>
//         <h1 style={styles.headerText}>VEED.IO</h1>
//       </div>
//       <div style={styles.profile}>
//         <div style={styles.avatar}>
//             <h2> D </h2>
//             </div>
//         <div style={styles.nameDropdown}>
//           <h4 style={styles.name}>Pravin Shinde</h4>
//           <p>Free plan</p>
//         </div>
//         <div>
//         <select style={styles.dropdown}>
//             <option value="profile"></option>
//             <option value="settings">Settings</option>
//             <option value="logout">Logout</option>
//         </select>
//         </div>
//       </div>
//       <button style={styles.newVideoButton}>New Video</button>
//       <nav style={styles.nav}>
//         <a href="/home" style={styles.navItem}>
//           <i className="icon-home" style={styles.iconHome}></i> Home
//         </a>
//         <a href="#templates" style={styles.navItem}>Templet</a>
//         <a href="#all-videos" style={styles.navItem}>All Videos</a>
//         <a href="#podcast" style={styles.navItem}>Podcast & Show</a>
//         <a href="#brand-kit" style={styles.navItem}>Brand Kit</a>
//         <Link to={'/'}>Home</Link>
//         <Link to={'/templates'}>Templates</Link>
//         <button onClick={toggleSidebar}>Close Sidebar</button>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
