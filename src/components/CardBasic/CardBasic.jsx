import { PropTypes } from 'prop-types';
import { Box, Typography } from '@mui/material';
import './CardBasic.css';

function CardBasic({
  posterPath,
  title,
  releaseDate,
  voteAverage,
}) {
  return (
    <Box className="basicCardStyle">
      <img
        className="cardImage"
        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${posterPath}`}
        alt={title}
      />
      <Box className="cardDescription">
        <Typography variant="h8" className="cardTitle">{title}</Typography>
        <Typography variant="subtitle1" className="cardReleaseDate">{releaseDate}</Typography>
      </Box>
    </Box>
  );
}

CardBasic.propTypes = {
  posterPath: PropTypes.string,
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  voteAverage: PropTypes.number,
};

CardBasic.defaultProps = {
  posterPath: '',
  title: '',
  releaseDate: '',
  voteAverage: 0,
};

export default CardBasic;
