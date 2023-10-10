import React from "react"
import './header.css'
import Searchbar from '../../components/searchbar/Searchbar'

export default function Header(props) {

    return(
        <div className="header">
            <div className="header__text">
                <h1 className="header__text-find header-text" onClick={() => window.location.reload()}>
                    Find your film
                </h1>
                <h4 className="header__text-watchlist header-text" onClick={() => props.setShowWatchlist(prev => !prev)}>
                    {props.showWatchlist ? 'Search for movies' : 'My Watchlist'}
                </h4>
            </div>
            {props.children}
        </div>
    )
}