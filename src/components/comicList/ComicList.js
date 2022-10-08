    import { useRef } from "react";
    import "./comicList.scss";

    const ComicList = ({ comicList }) => {
    const refsComicItems = useRef([]);

    const setChar = (id, i) => {
        //setCharItemId(id)
        // Установить фокус на элементе из массива по его ID
        refsComicItems.current.forEach((elem, index) => {
        index === i && elem.focus();
        });
    };

    const newArray = comicList.map((elem, i) => {
        const imgStyle =
        elem.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: "contain" }
            : { objectFit: "cover" };
        return (
        <li
            className="comics__item"
            key={elem.id}
            tabIndex="0"
            ref={(elem) => refsComicItems.current.push(elem)}
        >
            <a href="#">
            <img
                src={elem.thumbnail}
                alt="charImg"
                className="comics__item-img"
                style={imgStyle}
            />
            <div className="comics__item-name">{elem.title}</div>
            <div className="comics__item-price">{elem.price}$</div>
            </a>
        </li>
        );
    });
    return (
        <>
        <div className="comics__list">
            <ul className="comics__grid">{newArray}</ul>
        </div>
        </>
    );
    };

    export default ComicList;
