import { useRef } from 'react';
import './characterList.scss';

const CharacterList = ({ charList, setCharItemId }) => {

    const refsCharItems = useRef([]);

    const setChar = (id, i) => {
        setCharItemId(id)
        refsCharItems.current.forEach((elem, index) => {
            if (index === i) elem.focus()
        })
    }

    const newArray = charList.map((elem, i) => {
        let imgStyle = elem.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: 'contain' }
            : { objectFit: 'cover' }
        return (
            <li className="char__item" key={elem.id}
                onClick={() => setChar(elem.id, i)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') setChar(elem.id, i)
                }}
                tabIndex='0' ref={elem => refsCharItems.current[i] = elem}>
                <img src={elem.thumbnail} alt="charImg" style={imgStyle} />
                <div className="char__name">{elem.name}</div>
            </li>
        )
    })

    return (
        <>
            <ul className="char__grid">
                {newArray}
            </ul>
        </>
    )

}

export default CharacterList;