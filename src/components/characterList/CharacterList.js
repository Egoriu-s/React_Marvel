import React from 'react';
import './characterList.scss';

const CharacterList = ({ charList, setCharItemId }) => {
    //debugger

    const refsCharItem = [];
    const setRef = (ref) => {
        refsCharItem.push(ref);
    }

    const onFocus = (i) => {
        refsCharItem.forEach((elem, index) => {
            //debugger
            if (index === i) {
                elem.focus();
            }

        })
    }
    const newArray = charList.map((elem, i) => {

        let imgStyle = elem.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: 'contain' }
            : { objectFit: 'cover' }

        return (
            <li className="char__item" key={elem.id}
                onClick={() => {
                    setCharItemId(elem.id)
                    onFocus(i)
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        setCharItemId(elem.id)
                        onFocus(i)
                    }
                }}
                tabIndex='0' ref={setRef}>
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