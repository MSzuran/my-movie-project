import { PropTypes } from 'prop-types';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { PHOTO_URL } from '../../constants/photosBasicUrl';
import { MOVIES } from '../../constants/searchTypes';
import 'react-circular-progressbar/dist/styles.css';
import './CardBasic.css';

function CardBasic({
  id,
  posterPath,
  title,
  releaseDate,
  voteAverage,
  switchTitle,
  switchTrendingTitle,
}) {
  const navigate = useNavigate();

  const handleOnClickBasicCard = () => {
    if (switchTitle === 'Movies' || switchTrendingTitle) {
      navigate(`/${MOVIES}/${id}`);
    }
  };

  const checkPopularityValue = () => {
    const percentagePopularityValue = Math.round(voteAverage * 10);
    if (percentagePopularityValue >= 70) {
      return (
        <CircularProgressbar
          value={percentagePopularityValue}
          text={`${percentagePopularityValue}%`}
          styles={buildStyles({
            textColor: 'var(--darker-white)',
            pathColor: 'var(--light-green)',
            trailColor: 'var(--dark-grey)',
            textSize: '30px',
          })}
        />
      );
    }
    if (percentagePopularityValue < 70 && percentagePopularityValue >= 30) {
      return (
        <CircularProgressbar
          value={percentagePopularityValue}
          text={`${percentagePopularityValue}%`}
          styles={buildStyles({
            textColor: 'var(--darker-white)',
            pathColor: 'var(--light-yellow)',
            trailColor: 'var(--dark-grey)',
            textSize: '30px',
          })}
        />
      );
    }
    return (
      <CircularProgressbar
        value={percentagePopularityValue}
        text={`${percentagePopularityValue}%`}
        styles={buildStyles({
          textColor: 'var(--darker-white)',
          pathColor: 'var(--dark-pink)',
          trailColor: 'var(--dark-grey)',
          textSize: '30px',
        })}
      />
    );
  };

  return (
    <Box className="basicCardStyle" onClick={handleOnClickBasicCard}>
      <img
        className="cardImage"
        src={`${PHOTO_URL}${posterPath}`}
        alt={title}
      />
      <Box className="circularProgressContainer">
        {checkPopularityValue()}
      </Box>
      <Box className="cardDescription">
        <Typography variant="h8" className="cardTitle">{title}</Typography>
        <Typography className="cardReleaseDate">{releaseDate}</Typography>
      </Box>
    </Box>
  );
}

CardBasic.propTypes = {
  id: PropTypes.number,
  posterPath: PropTypes.string,
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  voteAverage: PropTypes.number,
  switchTitle: PropTypes.string,
  switchTrendingTitle: PropTypes.string,
};

CardBasic.defaultProps = {
  id: 0,
  posterPath: '',
  title: '',
  releaseDate: '',
  voteAverage: 0,
  switchTitle: '',
  switchTrendingTitle: '',
};

export default CardBasic;
