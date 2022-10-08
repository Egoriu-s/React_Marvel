import { useState, useEffect, memo } from 'react';
import useMarvelAPI from './../../services/Api';
import CharacterInfo from './CharacterInfo';
import ErrorMessage from '../secondaryComponents/errorMessage/Error';
import Skeleton from '../secondaryComponents/skeleton/Skeleton';
import Spinner from '../secondaryComponents/spinner/Spinner';
import './characterInfo.scss';

const CharacterInfoContainer = (props) => {

    const [charInfo, setCharInfo] = useState(null);
    const { getCharacter, error, clearError, loading } = useMarvelAPI()

    const load = (id) => {
        clearError()
        getCharacter(id)
            .then((charInfo) => {
                setCharInfo(charInfo)
            })
    }

    useEffect(() => {
        if (props.id !== null) load(props.id)
    }, [props.id])

    const skeleton = loading || error || charInfo ? null : <Skeleton />;
    const spinner = loading ? <Spinner /> : null;
    const errorImg = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !charInfo) ? <CharacterInfo charInfo={charInfo} /> : null;

    //debugger
    console.log('Render Info')
    return (
        <div className="char__info">
            {spinner}
            {errorImg}
            {skeleton}
            {content}
            <p className="char__select">Please select a character to see information</p>
        </div>
    )

}

export default memo(CharacterInfoContainer);