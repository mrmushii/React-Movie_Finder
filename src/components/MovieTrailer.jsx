import React from 'react';

const MovieTrailer = ({ trailerId }) => {

  console.log(trailerId);
  const iframeSrc = `https://www.youtube.com/embed/${trailerId}`;
  console.log(iframeSrc);

  
  return (
    <div className="relative aspect-w-16 w-full">
      <iframe
        src={`https://www.youtube.com/embed/${trailerId}`}
        className="absolute inset-0 w-full h-full border-0 rounded-lg"
        title="Movie Trailer"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MovieTrailer;
