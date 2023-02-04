import { PropTypes } from 'prop-types';
import { Box, Typography } from '@mui/material';
import { PHOTO_URL } from '../../constants/photosBasicUrl';
import './CardDetailPageCarusel.css';

function CardDetailPageCarusel({
  name,
  character,
  profilePath,
}) {
  return (
    <Box className="detailCardContainer">
      <img
        src={`${PHOTO_URL}${profilePath}`}
        alt={name}
        className="detailCardImage"
      />
      <Box className="detailCardDescription">
        <Typography className="detailCardName style">{name}</Typography>
        <Typography className="detailCardCharacter style">{character}</Typography>
      </Box>
    </Box>
  );
}

CardDetailPageCarusel.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  profilePath: PropTypes.string,
};

CardDetailPageCarusel.defaultProps = {
  name: '',
  character: '',
  profilePath: '',
};

export default CardDetailPageCarusel;
