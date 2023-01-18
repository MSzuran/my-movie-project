import TheatersTwoToneIcon from '@mui/icons-material/TheatersTwoTone';
import { Box } from '@mui/material';
import FooterTables from '../FooterTables/FooterTables';
import './Footer.css';

export default function Footer() {
  return (
    <Box className="mainFooterContainerStyle">
      <TheatersTwoToneIcon className="footerImageStyle" style={{ fontSize: '140px' }} />
      <FooterTables />
    </Box>
  );
}
