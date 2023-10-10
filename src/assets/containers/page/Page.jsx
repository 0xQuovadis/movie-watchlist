import React from "react";
import './page.css'



export default function Page(props) {

   console.log('page render')

    return(
        <>
            <div className="movielist-container">
                {!props.showWatchlist && <h2 className="api-undefined-text hidden">Unable to find what you're looking for. Please try another search.</h2>}
                {props.showWatchlist ?
                    props.watchlist.length > 0 ?
                        <>
                            <h2 className="in-my-watchlist">{props.watchlist.length} movie{props.watchlist.length > 1 && 's'} in my watchlist</h2>
                            {props.children}
                        </>
                        :
                        <div className="start-exploring">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <h2 className="">Your watchlist is looking a little empty...</h2>
                        </div> 
                    : props.searchList.length > 0 ?
                    props.children :
                        <div className="start-exploring">
                            <i className="fa-solid fa-film"></i>
                            <h2>Start exploring</h2>
                        </div>
                }
            </div>
        </>
    )
}


