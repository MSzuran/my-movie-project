import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import SearchPage from '../pages/SearchPage/SearchPage';
import MoviePage from '../pages/MoviePage/MoviePage';
import ReviewsPage from '../pages/ReviewsPage/ReviewsPage';
import FavoritesPage from '../pages/FavoritesPage/FavoritesPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/movie/:movieId" element={<MoviePage />} />
      <Route path="/movie/:movieId/reviews" element={<ReviewsPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}
