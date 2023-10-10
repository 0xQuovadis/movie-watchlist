import React from "react"
import './movielist.css'


export default function Movielist(props) {

    function openInNewTab(ID) {
        const url = `https://www.imdb.com/title/${ID}`
        window.open(url, '_blank')
    }
    
    const searchListElements = 
    
    /* if showWatchlist is true, render watchlist, otherwise render searchList */

    (props.showWatchlist ? props.watchlist : props.searchList).map(movie =>
        <div className="movie" key={movie.imdbID}>
            <img src={movie.Poster} className="movie-img" />
            <div className="movie__name">
                <h3 
                    className="movie__name-title cursor-pointer"
                    onClick={() => openInNewTab(movie.imdbID)}
                >{movie.Title}</h3>
                <p className="movie__name-rating content-width"><i className="fa-solid fa-star"></i> {movie.imdbRating}</p>
            </div>
            <div className="movie__specs">
                <p className="movie__specs-length content-width">{movie.Runtime}</p>
                <p className="movie__specs-genre overflow-ellipsis">{movie.Genre}</p>

                {
                props.watchlist && props.watchlist.some(movieInWatchlist => movieInWatchlist.imdbID === movie.imdbID) ?
                <p className="movie__specs-watchlist-btn in-watchlist-btn" onClick={() => props.removeFromWatchlist(movie)}>
                    <span className="default-in-watchlist"><i className="fa-solid fa-check"></i> Watchlist</span>
                    <span className="remove-in-watchlist"><i className="fa-solid fa-minus"></i> Remove</span>
                </p> 
                :
                <p className="movie__specs-watchlist-btn content-width" onClick={() => props.addToWatchlist(movie)}>
                    <i className="fa-solid fa-plus"></i> Watchlist
                </p>
                } 
            </div>
            <p className="movie-plot overflow-ellipsis-3">{movie.Plot}</p>
        </div>
        ) 
        

    return(
        <div className="movielist">
            {searchListElements}
        </div>
    )
}