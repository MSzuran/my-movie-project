import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import TheatersTwoToneIcon from '@mui/icons-material/TheatersTwoTone';
import './MainHeader.css';

export default function MainHeader() {
  return (
    <Box className="mainHeaderStyle">
      <Box className="leftSideMainHeaderStyles">
        <Link to="/">
          <TheatersTwoToneIcon className="mainHeaderImageStyle" style={{ fontSize: '64px' }} />
        </Link>
        <Link to="/favorites" className="headerLinkStyle">Favorites</Link>
        <p>Movies</p>
        <p>TV Shows</p>
        <p>Poeple</p>
        <p>More</p>
      </Box>
    </Box>
  );
}
