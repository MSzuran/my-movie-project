import { PropTypes } from 'prop-types';
import { Box } from '@mui/material';
import CaruselTrendingHeader from '../CaruselTrendingHeader/CaruselTrendingHeader';
import CaruselTrendingBody from '../CaruselTrendingBody/CaruselTrendingBody';

function CaruselTrending({
  switchTrendingTitle,
  handleSwitchTitleTrendingChange,
  dataTrending,
}) {
  return (
    <Box className="caruselContainer">
      <CaruselTrendingHeader
        switchTrendingTitle={switchTrendingTitle}
        handleSwitchTitleTrendingChange={handleSwitchTitleTrendingChange}
      />
      <CaruselTrendingBody
        switchTrendingTitle={switchTrendingTitle}
        dataTrending={dataTrending}
      />
    </Box>
  );
}

CaruselTrending.propTypes = {
  switchTrendingTitle: PropTypes.string,
  handleSwitchTitleTrendingChange: PropTypes.func.isRequired,
  dataTrending: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string.isRequired,
      title: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
    }),
  ),
};

CaruselTrending.defaultProps = {
  switchTrendingTitle: '',
  dataTrending: [{
    title: '',
    release_date: '',
    vote_average: 0,
  }],
};

export default CaruselTrending;
