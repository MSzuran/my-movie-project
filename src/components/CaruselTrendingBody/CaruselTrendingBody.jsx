import { PropTypes } from 'prop-types';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import CardBasic from '../CardBasic/CardBasic';
import CaruselLoader from '../CaruselLoader/CaruselLoader';

function CaruselTrendingBody({ switchTrendingTitle, dataTrending }) {
  const caruselLoading = useSelector((state) => state.popularData.isLoading);
  return (
    <Box className="caruselBody">
      {caruselLoading
        ? <CaruselLoader />
        : dataTrending.map(({
          id,
          poster_path: posterPath,
          title,
          release_date: releaseDate,
          vote_average: voteAverage,
        }) => (
          <CardBasic
            key={id}
            id={id}
            posterPath={posterPath}
            title={title}
            releaseDate={releaseDate}
            voteAverage={voteAverage}
            switchTrendingTitle={switchTrendingTitle}
          />
        ))}
    </Box>
  );
}

CaruselTrendingBody.propTypes = {
  switchTrendingTitle: PropTypes.string,
  dataTrending: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  ),
};

CaruselTrendingBody.defaultProps = {
  switchTrendingTitle: '',
  dataTrending: [{
    title: '',
    release_date: '',
    vote_average: 0,
  }],
};

export default CaruselTrendingBody;
