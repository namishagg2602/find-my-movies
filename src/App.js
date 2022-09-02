import React,  { useEffect, useState } from 'react';
import './App.css';
//import SearchIcon from './Search.svg';
import MovieCard from './MovieCard';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    // You can also log error messages to an error reporting service here
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }  
}

const API_URL='https://www.omdbapi.com/?apikey=3cd6f739';

function App() {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) =>
  {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    
    setMovies(data.Search);
  };


  // underlying function adds functionality to trigger search function when enter is pressed
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        searchMovies(searchTerm);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  

  // underlying hook shows the movie the first time site is loaded 
  useEffect(() => {
     searchMovies('Batman');
  },[])
  
  
  return (
    <div className='app'>
      <ErrorBoundary>
        <h1>Movie Land</h1>
      </ErrorBoundary>


     
      <div className='search'>
        <ErrorBoundary>
          <input placeholder='Search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
        </ErrorBoundary>

        <ErrorBoundary>
          <img src="data:image/png;base64,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" alt='Search' onClick={() => searchMovies(searchTerm)}></img>
        </ErrorBoundary>
      </div>
      

    {
      movies.length > 0 ? 
      (
        <div className='container'>
          <ErrorBoundary>
            {
              movies.map((movie) => (<MovieCard movie={movie}/>))
            }
        </ErrorBoundary>
      </div>
      ) :
      (
        <div className='empty'>
          <ErrorBoundary>
            <h2>No Movie Found</h2>
          </ErrorBoundary>
        </div>
      )
    } 
    </div>
  );
}

export default App;
