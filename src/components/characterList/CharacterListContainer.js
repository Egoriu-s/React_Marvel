import { useEffect, useState, memo } from 'react';
import { MarvelAPI } from '../../services/Api';
import CharacterList from './CharacterList';
import ErrorMessage from '../secondaryComponents/errorMessage/Error';
import Spinner from '../secondaryComponents/spinner/Spinner';

const marvelAPI = new MarvelAPI();

const CharacterListContainer = (props) => {

    const [charList, setCharList] = useState([]);
    const [startLoading, setStartLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newLoading, setNewLoading] = useState(true);
    const [end, setEnd] = useState(false);
    const [offsetCharacters, setOffsetCharacters] = useState(210);

    const downloadBegin = () => {
        setError(false);
        setNewLoading(true);
    }
    const downloadComplete = (charListNew) => {
        //debugger
        const end = (charListNew.total - offsetCharacters) > 9 ? false : true;
        setCharList(charList => [...charList, ...charListNew.allCharacter]);
        setStartLoading(false);
        setNewLoading(false);
        setEnd(end);
        setOffsetCharacters(offsetCharacters => offsetCharacters + 9);
    }
    const downloadError = () => {
        setStartLoading(false);
        setNewLoading(false);
        setError(true);
    }
    const charListLoading = (offset) => {
        downloadBegin()
        marvelAPI.getAllCharacters(offset)
            .then(downloadComplete)
            .catch(downloadError);
    }
    const loadMoreCharacter = (offset) => {
        charListLoading(offset);
    }

    useEffect(() => charListLoading(), [])

    const errorImg = error ? <ErrorMessage /> : null;
    const spinner = startLoading ? <Spinner /> : null;
    // const spinner2 = !startLoading && newLoading ? <Spinner /> : null;
    const content = !error && !startLoading ? <CharacterList charList={charList}
        setCharItemId={props.setCharItemId} /> : null;
    let styleBtn = {};
    if (end || startLoading) {
        styleBtn = { display: 'none' }
    } else if (newLoading) {
        styleBtn = { opacity: 0.5 }
    }

    //debugger
    console.log('Render List')
    return (
        <div className="char__list">
            {content}
            {errorImg}
            {spinner}
            {/* {spinner2} */}
            <button className="button button__main button__long" disabled={newLoading}
                style={styleBtn} onClick={() => { loadMoreCharacter(offsetCharacters) }}>
                <div className="inner">{newLoading ? 'Please, wait...' : 'load more'}</div>
            </button>
        </div>
    )
}

export default memo(CharacterListContainer);