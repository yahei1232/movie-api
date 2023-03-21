import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import img from '../assesting/img.png'

function Single() {
    const [movie, setMovie] = useState(null);

    const params = useParams();
    const movieId = params.id;
    useEffect(() => {
        const apiKey = "34a8f417fc73f5fd7789dbda15fdf196";
        fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
            .then(response => response.json())
            .then(data => {
                setMovie(data);
            })
            .catch(error => console.error(error));
    }, [movieId]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    // console.log(movie);

    return (
        <>
            <div className="card mb-3" style={{ 'maxWidth': '100%' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            {movie.genres.map(cats => (
                                <button key={cats.id} type="button" className="btn" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="top" data-bs-content="Top popover">
                                    {cats.name}
                                </button>
                            ))}
                            <p className="card-text">{movie.overview}</p>
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>vote average</td>
                                        <td>{movie.vote_average}:</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="card-text"><small className="text-muted">{movie.release_date}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Single