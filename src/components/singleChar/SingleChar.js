import { Link } from 'react-router-dom'

const SingleChar = ({ char }) => {
    //debugger
    const { name, description, thumbnail } = char
    const imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? { objectFit: 'contain' }
        : { objectFit: 'cover' }

    //debugger
    console.log("Render Single char JSX")
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="comicImg" className="single-comic__img" style={imgStyle} />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to="/">
                <button className="button button__main">
                    <div className="inner">Back to all</div>
                </button>
            </Link>
        </div>
    )
}

export default SingleChar