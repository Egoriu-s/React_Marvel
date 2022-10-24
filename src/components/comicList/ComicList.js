import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
const ComicList = ({ comicList }) => {

    const newArray = comicList.map((elem, i) => {
        const imgStyle =
            elem.thumbnail ===
                "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
                ? { objectFit: "contain" }
                : { objectFit: "cover" };
        return (
            <CSSTransition
                timeout={1500}
                key={elem.id}
                classNames="alert">
                <li className="comics__item" key={elem.id}>
                    <Link to={`/comics/${elem.id}`} >
                        <img
                            src={elem.thumbnail}
                            alt="comicImg"
                            className="comics__item-img"
                            style={imgStyle}
                        />
                        <div className="comics__item-name">{elem.title}</div>
                        <div className="comics__item-price">{elem.price}</div>
                    </Link>
                </li >
            </CSSTransition>
        )
    })

    //debugger
    console.log("Render Comic List JSX")
    return (
        <>
            <div className="comics__list">
                <ul className="comics__grid">
                    <TransitionGroup component={null}>
                        {newArray}
                    </TransitionGroup>
                </ul>
            </div>
        </>
    )
}

export default ComicList
