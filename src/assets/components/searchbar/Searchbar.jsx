import './searchbar.css'
import React from 'react'

/* OMDb API key:
    779deaec    
    https://www.omdbapi.com/
*/

export default function Searchbar(props) {

    function handleSearchChange(e) {
        props.setSearchbarText(e.target.value)
    }

    function handleKeyDown(e) {
        console.log('handleKeyDown trigger')
        if (e.key === 'Enter' && props.searchbarText) {
            getSearchList() }
    }

    function getSearchList() {
        if (!props.showWatchlist) {
            document.getElementsByClassName('api-undefined-text')[0].classList.add('hidden')
        }
        props.setShowWatchlist(prev => false)
        props.setSearchList([])
        fetch(`https://www.omdbapi.com/?apikey=779deaec&s=${props.searchbarText}`)
        .then(res => {
            if (!res.ok) {
                throw Error("Movie data not available") 
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            if (data.Response === 'False') {
                document.getElementsByClassName('api-undefined-text')[0].classList.remove('hidden')
            } else {

                data.Search.forEach(element => {
                    fetch(`https://www.omdbapi.com/?apikey=779deaec&i=${element.imdbID}`)
                        .then(res => {
                            if (!res.ok) {
                                throw Error("Movie data not available") 
                            }
                            return res.json()
                        })
                        .then(data => props.onSearch(data))
                        .catch(err => console.error(err))
                        props.setSearchbarText('')
                })
            }
        })
        .catch(err => console.error(err))
    }


    return(
        (!props.showWatchlist || props.watchlist.length === 0) &&
            <div className='searchbar'>
            <input 
                type="text"
                className='searchbar-input searchbar-border' 
                placeholder="&#xF002; Search"
                onChange={handleSearchChange} 
                value={props.searchbarText} 
                onKeyDown={handleKeyDown}
            />
            <button 
                className='searchbar-btn searchbar-border' 
                onClick={getSearchList}
            >Search</button>
        </div>
    )
}

// () => handleKeyDown(e)