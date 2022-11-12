import { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './characterList.scss';


const CharacterList = ({ charList, setCharItemId }) => {

    const refsCharItems = useRef([]);

    const setChar = (id, i) => {
        setCharItemId(id)
        // Установить фокус на элементе из массива по его ID
        refsCharItems.current.forEach((elem, index) => {
            (index === i) && elem.focus()
        })
    }

    const newArray = charList.map((elem, i) => {
        let imgStyle = elem.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ? { objectFit: 'contain' }
            : { objectFit: 'cover' }
        return (
            <CSSTransition
                timeout={5000}
                key={elem.id}
                classNames="alert">
                <li className="char__item"
                    onClick={() => setChar(elem.id, i)}
                    onKeyDown={(event) => event.key === 'Enter' && setChar(elem.id, i)}
                    tabIndex='0' ref={elem => refsCharItems.current.push(elem)}>
                    <img src={elem.thumbnail} alt="charImg" style={imgStyle} />
                    <div className="char__name">{elem.name}</div>
                </li>
            </CSSTransition>
        )
    })

    //debugger
    console.log("Render Char List JSX")
    return (
        <>
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {newArray}
                </TransitionGroup>
            </ul>
        </>
    )

}

export default CharacterList;

