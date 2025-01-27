import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieTrailer from "./MovieTrailer";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams(); // Get the movie ID from the URL
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [trailerId, setTrailerId] = useState(null);

  

  useEffect(() => {     
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/movie/${id}`, API_OPTIONS);
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
        
        const videoResponse = await fetch(`${API_BASE_URL}/movie/${id}/videos?`,API_OPTIONS);
        const videoData = await videoResponse.json();
        if (videoData && videoData.results && videoData.results.length > 0) {
          setTrailerId(videoData.results[0].key); // Set trailer ID if available
        }
        
        
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (isLoading) return <p>Loading...</p>;
  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  return (
    <div className="movie-card xl:px-18 sm:px-0 md:px-0 ">
      <div className="flex justify-between xl:pt-12 sm:pt-0 md:pt-0 sm:px-18 md:px-18 ">
        <div>
          <h2>{movie.title}</h2>
        </div>
        <div className="flex justify-center items-center border-8 rounded-4xl border-none bg-auto">
          <img  src="/star.svg" alt="" />
          <p className="text-white">{movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}/10({movie.vote_count})</p>
        </div>
        
      </div>
      <br />
      <div className="content sm:px-18 md:px-18"> 
        <p className="year text-gray-400">{movie.release_date ? movie.release_date.split("-")[0] : "N/A"}</p>
        <span>•</span>
        <p className='text-gray-400'>{movie.runtime} mins</p>
      </div>
      <br />
      <br />
      <div className="flex xl:flex-row  sm:flex-col md:flex-row justify-between gap-18 rounded-4xl m-20">
      <img width={300} height={400} className="w-auto"
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "/no-movie.png"}
        alt={movie.title}
      />
       {trailerId && <MovieTrailer trailerId={trailerId} />}

      </div>
      <div className="mx-20 bg-gray-800 text-white rounded-2xl shadow-lg p-6 space-y-4 max-w-screen">
      <div>
        <h1 className="text-2xl font-bold">{movie.title}</h1>
        <p className="text-sm text-gray-400">{movie.tagline}</p>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {movie.genres.map((genre) => (
            <span
              
              className="bg-blue-500 text-xs rounded-full px-3 py-1"
            >
              {genre.name}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-lg ">Overview</h2>
        <p className="max-w-3xl flex sm:flex-wrap">{movie.overview}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Release Date</p>
          <p>{movie.release_date}</p>
        </div>
        <div>
          <p className="text-gray-400">Countries</p>
          <p>{movie.origin_country}</p>
        </div>
        <div>
          <p className="text-gray-400">Language</p>
          <p>{movie.original_language}</p>
        </div>
        <div>
          <p className="text-gray-400">Budget</p>
          <p>${movie.budget.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400">Revenue</p>
          <p>${movie.revenue.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-gray-400">Status</p>
          <p>{movie.status}</p>
        </div>
      </div>
      <div>
        <h2 className="font-semibold text-lg">Production Companies</h2>
        <p>{movie.production_companies.map((com) =>(
          <p>{com.name}</p>
        ))}</p>
      </div>
    </div>
      
      
      
    </div>
  );
};

export default MovieDetails;
