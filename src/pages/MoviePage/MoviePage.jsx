import { useParams, Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  useFetchDataDetails,
  useFetchDataCreditsDetails,
  useFetchDataKeywordsDetails,
  useFetchServerReviews,
} from '../../reactQuery/hooks/index';
import {
  useGetMovieDataById,
  useAddLike,
  useAddTofavorites,
} from '../../graphql/hooks/index';
import DetailPagesHeader from '../../components/DetailPageHeader/DetailPagesHeader';
import DetailPageHeaderLoader from '../../components/DetailPageHeaderLoader/DetailPageHeaderLoader';
import CaruselDetailMediaPage from '../../components/CaruselDetailMediaPage/CaruselDetailMediaPage';
import CaruselLoader from '../../components/CaruselLoader/CaruselLoader';
import SocialSectionDetailPage from '../../components/SocialSectionDetailPage/SocialSectionDetailPage';
import SectionLoader from '../../components/SectionLoader/SectionLoader';
import MoviePageRightSectionLoader from '../../components/MoviePageRightSectionLoader/MoviePageRightSectionLoader';
import ColumnDisplayInformation from '../../components/ColumnDisplayInformation/ColumnDisplayInformation';
import { MOVIES } from '../../constants/searchTypes';
import './MoviePage.css';

export default function MoviePage() {
  const { movieId } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { mediaData, isLoading } = useFetchDataDetails(MOVIES, movieId);
  const {
    creditsData,
    isLoadingCredits,
  } = useFetchDataCreditsDetails(MOVIES, movieId);

  const {
    serverReviews,
    isLoadingServerReviews,
  } = useFetchServerReviews(movieId);

  const { keywordsData, isLoadingKeywords } = useFetchDataKeywordsDetails(MOVIES, movieId);

  const { serverMovieData, isLoadingMovieServerData } = useGetMovieDataById(movieId);

  const { addLike } = useAddLike();
  const { addToFavorites } = useAddTofavorites();

  useEffect(() => {
    if (serverMovieData) {
      setIsLiked(serverMovieData.liked);
      setIsFavorite(serverMovieData.favorite);
    }
  }, [serverMovieData]);

  const { keywords } = keywordsData;

  const {
    title,
    tagline,
    backdrop_path: imagePath,
    poster_path: poster,
    genres,
    overview,
    release_date: releaseDate,
    runtime,
    production_countries: productionCoutries,
    status,
    budget,
    mainMovieLanguage,
    revenue,
    vote_average: voteAverage,
  } = mediaData;

  const directorMadiaInfo = () => {
    const director = creditsData.crew.find((el) => el.job === 'Director');
    return director.name;
  };

  const castMediaInfo = () => {
    const mainCast = creditsData.cast.slice(0, 10);
    return mainCast;
  };

  const getServerReviewData = () => {
    const firstReview = serverReviews[0];
    const numberOfReviews = serverReviews?.length;
    const {
      author,
      createdAt,
      reviewDescription: content,
    } = firstReview;
    return {
      author,
      content,
      createdAt,
      numberOfReviews,
    };
  };

  const checkIfServerReviewsExists = () => {
    if (serverReviews.length) {
      return <SocialSectionDetailPage reviewDetails={getServerReviewData()} />;
    }
    return (
      <Box className="addFirstReviewContainer">
        <Link to="reviews" className="addFirstReviewLink style">Add review</Link>
      </Box>
    );
  };

  const handleAddToFavoritesClick = (value) => {
    setIsFavorite(value);
    addToFavorites({
      variables: {
        movieId,
        poster,
        title,
        favorite: value,
        releaseDate,
      },
    });
  };

  const handleAddLikeClick = (value) => {
    setIsLiked(value);
    addLike({
      variables: {
        movieId,
        poster,
        title,
        liked: value,
        releaseDate,
      },
    });
  };

  return (
    <Box>
      {!isLoading && !isLoadingCredits
        ? (
          <DetailPagesHeader
            title={title}
            tagline={tagline}
            imagePath={imagePath}
            poster={poster}
            genres={genres}
            overview={overview}
            releaseDate={releaseDate}
            voteAverage={voteAverage}
            runtime={runtime}
            productionCoutries={productionCoutries}
            mediaDirector={directorMadiaInfo()}
            handleOnAddToFavoritesClick={handleAddToFavoritesClick}
            handleOnAddLikeClick={handleAddLikeClick}
            isLiked={isLiked}
            isFavorite={isFavorite}
            isLoadingMovieServerData={isLoadingMovieServerData}
          />
        )
        : <DetailPageHeaderLoader />}
      <Box className="mainDetailPageContainer">
        <Box className="leftColumnDetails">
          <Box className="detailCaruselContainer">
            {!isLoadingCredits
              ? (
                <CaruselDetailMediaPage topCast={castMediaInfo()} />
              )
              : (
                <Box className="caruselDetailBody ">
                  <CaruselLoader />
                </Box>
              )}
          </Box>
          <Box className="detailSocialContainer">
            {!isLoadingServerReviews
              ? (
                checkIfServerReviewsExists()
              )
              : (
                <SectionLoader />
              )}
          </Box>
        </Box>
        <Box className="rightColumnDetails">
          {!isLoadingKeywords && keywords.length
            ? (
              <Box className="rigthInfoContainer">
                <ColumnDisplayInformation
                  status={status}
                  language={mainMovieLanguage}
                  budget={budget}
                  revenue={revenue}
                  keywords={keywords}
                  isLoadingKeywords={isLoadingKeywords}
                />
              </Box>
            )
            : (
              <MoviePageRightSectionLoader />
            )}
        </Box>
      </Box>
    </Box>
  );
}
