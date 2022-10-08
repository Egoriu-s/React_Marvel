import { useState, useEffect, memo, useRef } from 'react';
import useMarvelAPI from './../../services/Api';
import Spinner from '../secondaryComponents/spinner/Spinner';
import ErrorMessage from '../secondaryComponents/errorMessage/Error';
import RandomCharacter from './RandomCharacter';
import './randomCharacter.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomCharacterContainer = (props) => {

    const [randomChar, setRandomChar] = useState(null)
    const { getCharacter, loading, error, clearError } = useMarvelAPI()

    const disable = useRef(true)

    const load = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then((randomCharNew) => setRandomChar(randomCharNew))
            .finally(disable.current = false)
    }

    useEffect(() => load(), [])

    const errorImg = error && <ErrorMessage />
    const spinner = loading && <Spinner />
    const content = !error && !loading && !!randomChar && <RandomCharacter randomChar={randomChar} />
        

    //debugger
    console.log('Render Random')
    return (
        <div className="randomchar">
            {errorImg}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={load} className="button button__main" disabled={disable.current || loading}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

export default memo(RandomCharacterContainer)