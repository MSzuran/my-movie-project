import { useQuery } from 'react-query';
import { fetchData, fetchServerReviewsData } from '../queries/index';

export function useFetchDataDetails(dataType, id) {
  const query = `${dataType}/${id}`;
  const { data, isLoading } = useQuery('details', () => fetchData(query));
  return {
    mediaData: data || {},
    isLoading,
  };
}

export function useFetchDataCreditsDetails(dataType, id) {
  const query = `${dataType}/${id}/credits`;
  const { data, isLoading: isLoadingCredits } = useQuery('credits', () => fetchData(query));
  return {
    creditsData: data || {},
    isLoadingCredits,
  };
}

export function useFetchDataReviewsDetails(dataType, id) {
  const query = `${dataType}/${id}/reviews`;
  const { data, isLoading: isLoadingReviews } = useQuery('reviews', () => fetchData(query));
  return {
    reviewsData: data || {},
    isLoadingReviews,
  };
}

export function useFetchDataKeywordsDetails(dataType, id) {
  const query = `${dataType}/${id}/keywords`;
  const { data, isLoading: isLoadingKeywords } = useQuery('keywordsArray', () => fetchData(query));
  return {
    keywordsData: data || {},
    isLoadingKeywords,
  };
}

export function useFetchServerReviews() {
  const { data, isLoading: isLoadingServerReviews } = useQuery('serverReviews', () => fetchServerReviewsData());
  return {
    serverReviews: data || {},
    isLoadingServerReviews,
  };
}
