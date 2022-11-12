import { memo } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group";
import './characterInfo.scss';

const CharacterInfo = ({ charInfo }) => {
    //debugger
    const { thumbnail, name, homepage, wiki, description, comics } = charInfo;
    const imgStyle = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? { objectFit: 'contain' }
        : { objectFit: 'cover' }

    //debugger
    console.log("Render Info JSX")
    return (
        <>

            <div className="char__basics">
                <img src={thumbnail} alt="charImg" style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>

            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                <TransitionGroup component={null}>
                    {
                        comics.length > 0
                            ? comics.map((comic, index) => {
                                if (index > 9) return;
                                return (
                                    <CSSTransition
                                        timeout={5000}
                                        key={index}
                                        classNames="alert">
                                        <li className="char__comics-item" key={index}>
                                            {comic.name}
                                        </li>
                                    </CSSTransition>
                                )
                            })
                            : 'No comics'
                    }
                </TransitionGroup>
            </ul>
        </>
    )

}

export default memo(CharacterInfo, (prevProps, newProps) => prevProps.charInfo.id === newProps.charInfo.id)