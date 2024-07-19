import React from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DeveloperBoardRoundedIcon from '@mui/icons-material/DeveloperBoardRounded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPodcast} from '@fortawesome/free-solid-svg-icons'


const Sidebar = ({ isOpen }) => {
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
      width: '60px',
      height: '60px',
      backgroundColor: '#75ba75',
      borderRadius: '10%',
      marginTop: '-10px',
      marginRight: '10px',
      borderColor: 'none',
    },
    nameDropdown: {
      marginBottom: '15px',
      marginTop: '-10px',
    },
    name: {
      // marginBottom: '5px',
      fontSize: '18px',
      fontWeight: '500',

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
      borderRadius: '10px',
      width: '100%',
      marginTop: '-5px'
    },
    nav: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '0px',
      margin: '0px',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Trebuchet MS',
      
    },
    logo: {
      text: 'center',
      fontSize: '40px',
      // padding: '-10px',
      fontWeight: '800',
      marginTop: '-5px'
    },
    icon: {
      fontSize: '25px',
      marginLeft: '-10px',
      flex: '30%',
      display: 'grid',
      placeItems: 'center'
    },
    iconname: {
      textDecoration: 'none',
      fontSize: '18px',
      color: 'black',
      flex: '70%',
    },
    row: {
      width: '100%',
      height: '50px',
      margin: '5px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Trebuchet MS',
      maginTop: '20px',
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
      <h1 style={styles.logo}>EDITO.IO</h1>
    </div>
    <div style={styles.profile}>
      <button style={styles.avatar}>D</button>
      <div style={styles.nameDropdown}>
        <p style={styles.name}> Gajanan Bhosale</p>
      </div>


    </div>
    <Link to={'/video'}>
      <button style={styles.newVideoButton}>New Video</button>
    </Link>

    <nav style={styles.nav}>

      <div style={styles.row}>
        <HomeOutlinedIcon style={styles.icon} />
        <Link to={'/'} style={styles.iconname}>Home</Link>
      </div>
      <div style={styles.row}>
        <BackupTableOutlinedIcon style={styles.icon} />
        <Link to={'/template'} style={styles.iconname}>Template</Link>
      </div>
      <div style={styles.row}>
        <FolderOutlinedIcon style={styles.icon} />
        <Link to={'/allVideos'} style={styles.iconname}>All Videos</Link>
      </div>
      <div style={styles.row}>
        <FontAwesomeIcon icon={faPodcast} style={styles.icon} />
        <Link to={'/podcastShows'} style={styles.iconname}>Podcast & Shows</Link>
      </div>
      <div style={styles.row}>
        <DeveloperBoardRoundedIcon style={styles.icon} />
        <Link to={'/brandKit'} style={styles.iconname}>Brand Kit</Link>
      </div>
    </nav>
  </div>
);
};

export default Sidebar;