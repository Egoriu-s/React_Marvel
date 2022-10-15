import { Link } from 'react-router-dom'

const SingleComic = ({ comic }) => {
    //debugger
    const { title, description, language, pageCount, price, thumbnail } = comic
    const imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? { objectFit: 'contain' }
        : { objectFit: 'cover' }

    //debugger
    console.log("Render Single Comic JSX")
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="comicImg" className="single-comic__img" style={imgStyle} />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics">
                <button className="button button__main">
                    <div className="inner">Back to all</div>
                </button>
            </Link>
        </div>
    )
}

export default SingleComic