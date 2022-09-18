import { useState, useEffect, memo } from 'react';
import { MarvelAPI } from '../../services/Api';
import Spinner from '../secondaryComponents/spinner/Spinner';
import ErrorMessage from '../secondaryComponents/errorMessage/Error';
import RandomCharacter from './RandomCharacter';
import './randomCharacter.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const marvelAPI = new MarvelAPI();

const RandomCharacterContainer = (props) => {

    const [randomChar, setRandomChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const downloadBegin = () => {
        setLoading(true);
        setError(false);
    }
    const downloadComplete = (randomChar) => {
        setRandomChar(randomChar);
        setLoading(false);
    }
    const downloadError = () => {
        setLoading(false);
        setError(true);
    }
    const load = () => {
        downloadBegin();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelAPI.getCharacter(id)
            .then(downloadComplete)
            .catch(downloadError);
    }
    const tryItClick = () => load()

    useEffect(() => load(), [])

    const errorImg = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !error && !loading ? <RandomCharacter randomChar={randomChar} /> : null;

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
                <button onClick={tryItClick} className="button button__main" disabled={loading ? true : false}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

export default memo(RandomCharacterContainer);