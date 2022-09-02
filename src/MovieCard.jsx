import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import React from 'react';

const MovieCard = ({movie}) => {     // we can get anything inside props directly using curly braces instead of props
   return(
    <div className='movie'>
        <div>
            <p>{movie.Year}</p>
        </div>

        <div>
            <img src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} />
        </div>

        <div>
            <span>{movie.Type}</span>
            <h3>{movie.Title}</h3>
        </div>

    </div>
   );
};


export default MovieCard;