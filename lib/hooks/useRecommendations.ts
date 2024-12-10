'use client';

import { useState, useCallback } from 'react';
import { fetchMovies, fetchTVShows } from '@/lib/tmdb';

export interface RecommendationValues {
  industry: string;
  year: string;
  genre: string;
  contentRating: string;
}

export function useRecommendations() {
  const [movies, setMovies] = useState<any[]>([]);
  const [tvShows, setTvShows] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentValues, setCurrentValues] = useState<RecommendationValues | null>(null);

  const fetchRecommendations = useCallback(async (values: RecommendationValues) => {
    setIsLoading(true);
    setMovies([]);
    setTvShows([]);
    
    try {
      const [movieResults, tvResults] = await Promise.all([
        fetchMovies(values),
        fetchTVShows(values),
      ]);

      // Only update state if we have results
      if (movieResults?.length > 0 || tvResults?.length > 0) {
        setMovies(movieResults || []);
        setTvShows(tvResults || []);
        setCurrentValues(values);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setMovies([]);
      setTvShows([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (currentValues) {
      await fetchRecommendations(currentValues);
    }
  }, [currentValues, fetchRecommendations]);

  return {
    movies,
    tvShows,
    isLoading,
    fetchRecommendations,
    refresh,
    hasValues: !!currentValues,
  };
}