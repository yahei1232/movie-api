import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Cards() {

    const [movies, setMovies] = useState([]);
    const [genreId, setGenreId] = useState(null);

    useEffect(() => {
        const API_KEY = '34a8f417fc73f5fd7789dbda15fdf196';
        const MAX_PAGES = 10; // Maximum number of pages to fetch
        let currentPage = 10;
        let allMovies = [];

        const fetchMovies = async () => {
            try {
                while (currentPage <= MAX_PAGES) {
                    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`);
                    const data = await response.json();
                    allMovies = [...allMovies, ...data.results];
                    currentPage++;
                }
                setMovies(allMovies);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMovies();
    }, []);

    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const apiKey = "34a8f417fc73f5fd7789dbda15fdf196";
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                // console.log(data.genres);
                setGenres(data.genres);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        const API_KEY = '34a8f417fc73f5fd7789dbda15fdf196';
        if (genreId) {
            fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${genreId}`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.results);
                })
                .catch(error => console.error(error));
        }
    }, [genreId]);


    return (
        <div>
            {genres.map(cat => (
                <button type="button" key={cat.id} onClick={() => setGenreId(cat.id)} className="btn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover">
                    {cat.name}
                </button>
            ))}
            <div className="row text-center container mx-auto">
                {movies.map(item => (
                    <div key={item.id} className="card" style={{ "width": "13rem" }}>
                        <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} className="card-img-top" alt="..." width="150px" height="200px" />
                        <div className="card-body">
                            <Link className='text-decoration-none text-dark' to={`/single/${item.id}`}>
                                <h5 className="card-title">{item.title}</h5>
                            </Link>
                        </div>
                    </div>
                ))}
                {/* {movies.map(item => (
                    <div key={item.id} className="card" style={{ "width": "13rem" }}>
                        <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} className="card-img-top" alt="..." width="150px" height="200px" />
                        <div className="card-body">
                            <Link className='text-decoration-none text-dark' to={`/single/${item.id}`}>
                                <h5 className="card-title">{item.title}</h5>
                            </Link>
                        </div>
                    </div>
                ))} */}
            </div>
        </div>
    )
}

export default Cards