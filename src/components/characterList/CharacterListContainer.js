import { PureComponent } from 'react';
import { MarvelAPI } from '../../services/Api';
import PropTypes from 'prop-types';
import CharacterList from './CharacterList';
import ErrorMessage from '../secondaryComponents/errorMessage/Error';
import Spinner from '../secondaryComponents/spinner/Spinner';

class CharacterListContainer extends PureComponent {

    state = {
        charList: [],
        startLoading: true,
        error: false,
        offsetCharacters: 210,
        newLoading: true,
        end: false
    }

    marvelAPI = new MarvelAPI();

    downloadBegin = () => {
        this.setState({
            error: false,
            newLoading: true
        })
    }

    downloadComplete = (charListNew) => {
        //debugger
        const end = (charListNew.total - this.state.offsetCharacters) > 9 ? false : true;
        this.setState(({ charList, offsetCharacters }) => {
            return {
                charList: [...charList, ...charListNew.allCharacter],
                startLoading: false,
                newLoading: false,
                end,
                offsetCharacters: offsetCharacters + 9
            }
        })
    }

    downloadError = () => {
        this.setState({
            startLoading: false,
            newLoading: false,
            error: true
        })
    }

    charListLoading = (offset) => {
        this.downloadBegin()
        this.marvelAPI.getAllCharacters(offset)
            .then(this.downloadComplete)
            .catch(this.downloadError);
    }

    componentDidMount() {
        this.charListLoading();
    }


    loadMoreCharacter = (offset) => {
        this.charListLoading(offset);
    }

    render() {

        console.log('Render List')
        const { charList, startLoading, error, newLoading, end, offsetCharacters } = this.state;
        //debugger
        const errorImg = error ? <ErrorMessage /> : null;
        const spinner = startLoading ? <Spinner /> : null;
        // const spinner2 = !startLoading && newLoading ? <Spinner /> : null;
        const content = !error && !startLoading ? <CharacterList charList={charList}
            setCharItemId={this.props.setCharItemId} /> : null;

        let styleBtn = {};
        if (end || startLoading) {
            styleBtn = { display: 'none' }
        } else if (newLoading) {
            styleBtn = { opacity: 0.5 }
        }

        //debugger
        return (
            <div className="char__list">
                {content}
                {errorImg}
                {spinner}
                {/* {spinner2} */}
                <button className="button button__main button__long" disabled={newLoading}
                    style={styleBtn} onClick={() => { this.loadMoreCharacter(offsetCharacters) }}>
                    <div className="inner">{newLoading ? 'Please, wait...' : 'load more'}</div>
                </button>
            </div>
        )
    }

}

CharacterListContainer.propTypes = {
    setCharItemId: PropTypes.func
}

CharacterListContainer.defaultProps = {
    setCharItemId: () => { console.log('Ничего не передано') }
}

export default CharacterListContainer;