import Header from './assets/containers/header/Header'
import Page from './assets/containers/page/Page'
import Searchbar from './assets/components/searchbar/Searchbar'
import React from 'react'
import Movielist from './assets/components/movielist/Movielist'

/* 
  Done:
    - Remove from Watchlist while in search mode
    - Content change on remove-btn:hover
    - Magnifying glass in Searchbar
    - Page refresh on "Find your film" click
    - Press enter to search
    - Imdb link when click on movie title
    - /!\ undefined response from API (catch error + render 'not found' message) (done using className and display: none) => confusing, find better solution
    - Do not trigger search btn when enter is clicked with empty input
    -  Reset searchbarText when getSearchList() --> no reset if response is undefined

  TO DO:
    - Loading screen while waiting for search results
    - watchlist btn to not instantly turn red when clicked?
    - "..." click from movie plot to expand

  Doable? (API limitations?):
    - Search for "includes" instead of exact word from title
    - Multiple pages of movies
*/

function App() {
  console.log('app render')

  const [searchList, setSearchList] = React.useState([])
  const [searchbarText, setSearchbarText] = React.useState('')
  const [showWatchlist, setShowWatchlist] = React.useState(false)

  const initialWatchlist = JSON.parse(localStorage.getItem('myWatchlist'))

  const [watchlist, setWatchlist] = React.useState([])

  React.useEffect(() => {console.log(searchList)}, [searchList])
  React.useEffect(() => {console.log(watchlist)}, [watchlist])

  React.useEffect(() => {
    localStorage.setItem('myWatchlist', JSON.stringify(watchlist))
  }, [watchlist])

  React.useEffect(() => {setWatchlist(initialWatchlist)}, [])

  function handleMovieData(data) {
    setSearchList(prevList =>
      [...prevList,
      data])
  }

  function addToWatchlist(newMovie) {
    setWatchlist(prev => [...prev, newMovie])
  }

  function removeFromWatchlist(newMovie) {
    setWatchlist(prev => prev.filter(prevMovie => prevMovie.imdbID !== newMovie.imdbID))
  }

  return (
    <>
      <Header
        setShowWatchlist={setShowWatchlist}
        showWatchlist={showWatchlist}
        setSearchList={setSearchList}
      >
        <Searchbar
          searchbarText={searchbarText}
          setSearchbarText={setSearchbarText}
          onSearch={handleMovieData}
          setSearchList={setSearchList}
          showWatchlist={showWatchlist}
          setShowWatchlist={setShowWatchlist}
          watchlist={watchlist}
        />
      </Header>
      <Page
        movieInSearchlist={searchList.length}
        showWatchlist={showWatchlist}
        searchList={searchList}
        watchlist={watchlist}
      >
        <Movielist 
        searchList={searchList}
        showWatchlist={showWatchlist}
        addToWatchlist={addToWatchlist}
        removeFromWatchlist={removeFromWatchlist}
        watchlist={watchlist}
        />
      </Page>
    </>
  )
}

export default App
