import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import moment from 'moment';
import { Box, Button, Input } from '@mui/material';
import {
  useFetchDataDetails,
  useFetchServerReviews,
  usePostNewReview,
} from '../../reactQuery/hooks/index';
import { MOVIES } from '../../constants/searchTypes';
import ServerReviewCard from '../../components/ServerReviewCard/ServerReviewCard';
import SectionLoader from '../../components/SectionLoader/SectionLoader';
import HeaderLoader from '../../components/HeaderLoader/HeaderLoader';
import { SMALL_POSTER_PHOTO_URL } from '../../constants/photosBasicUrl';
import './ReviewsPage.css';

export default function ReviewsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { mutate: addReview } = usePostNewReview();

  const { mediaData, isLoading } = useFetchDataDetails(MOVIES, movieId);
  const { title, poster_path: posterPath, release_date: releaseDate } = mediaData;
  const [newAuthor, setNewAuthor] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(true);

  const {
    serverReviews,
    isLoadingServerReviews,
  } = useFetchServerReviews(movieId);

  const getServerReviewData = (serverReview) => {
    const {
      _id: id,
      author,
      createdAt,
      reviewDescription: content,
    } = serverReview;
    return {
      id,
      author,
      content,
      createdAt,
    };
  };

  const serverReviewsCardGenerator = () => (
    serverReviews.map((serverReview) => {
      const reviewDetails = getServerReviewData(serverReview);
      return (
        <ServerReviewCard
          key={reviewDetails.id}
          reviewDetails={reviewDetails}
        />
      );
    })
  );

  const handleOnClickAddReviewButton = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleOnReviewAuthorInputChange = ({ target: { value } }) => {
    setNewAuthor(value);
  };

  const handleOnReviewDescriptionInputChange = ({ target: { value } }) => {
    setReviewDescription(value);
  };

  const onClickSubmitNewReviewButton = () => {
    if (newAuthor && reviewDescription) {
      addReview({
        author: newAuthor,
        reviewDescription,
        movieId,
      });
      setIsInputVisible(true);
      clearInputsFields();
    }
  };

  const onClickCancelNewReviewButton = () => {
    setNewAuthor('');
    setReviewDescription('');
    setIsInputVisible(true);
    clearInputsFields();
  };

  const clearInputsFields = () => {
    setNewAuthor('');
    setReviewDescription('');
  };

  return (
    <Box className="reviewsPageContainer">
      {!isLoading
        ? (
          <Box className="reviewsPageHeader">
            <img
              className="smallMediaPoster style"
              src={`${SMALL_POSTER_PHOTO_URL}${posterPath}`}
              alt={title}
            />
            <Box className="reviewPageHEaderContainer">
              <Box className="reviewPageHeaderTItle">
                {title}
                {` (${moment(releaseDate).format('YYYY')})`}
              </Box>
              <Button onClick={() => navigate(-1)} className="reviewHeaderButton style">⇦ Back to movie</Button>
            </Box>
          </Box>
        )
        : (<HeaderLoader />)}
      <Box className="reviewsColumns">
        <Box className="addReviewButtonContainer">
          <Button onClick={handleOnClickAddReviewButton} className="addReviewButton style">✎ Write review</Button>
        </Box>
        <Box className="reviewsColumn">
          <Box className={isInputVisible ? 'reviewFormContainer hidden' : 'reviewFormContainer'}>
            <Input
              placeholder="Author name"
              value={newAuthor}
              onChange={handleOnReviewAuthorInputChange}
              className="reviewAuthorInputField style"
            />
            <Input
              placeholder="Write your review here..."
              value={reviewDescription}
              onChange={handleOnReviewDescriptionInputChange}
              multiline
              className="reviewDescriptionInputField style"
            />
            <Box className="reviewFormButtonsContainer">
              <Button onClick={onClickSubmitNewReviewButton} className="reviewFormButtons style">Submit</Button>
              <Button onClick={onClickCancelNewReviewButton} className="reviewFormButtons style">Cancel</Button>
            </Box>
          </Box>
          <Box className="cardReviewsColumns">
            {!isLoadingServerReviews
              ? (serverReviewsCardGenerator())
              : (<SectionLoader />)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
