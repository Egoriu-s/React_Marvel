import { PureComponent } from 'react';
import { MarvelAPI } from '../../services/Api';
import PropTypes from 'prop-types';
import CharacterInfo from './CharacterInfo';
import ErrorMessage from '../secondaryComponents/errorMessage/Error';
import Skeleton from '../secondaryComponents/skeleton/Skeleton';
import Spinner from '../secondaryComponents/spinner/Spinner';
import './characterInfo.scss';

class CharacterInfoContainer extends PureComponent {

    
    state = {
        charInfo: null,
        loading: false,
        error: false
    }

    marvelAPI = new MarvelAPI();

    downloadBegin = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    downloadComplete = (charInfo) => {
        this.setState({
            charInfo,
            loading: false
        })
    }

    downloadError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    loading = (id) => {
        this.downloadBegin()
        this.marvelAPI.getCharacter(id)
            .then(this.downloadComplete)
            .catch(this.downloadError)
    }

    componentDidUpdate(prevProps) {
        //debugger
        if (prevProps.id !== this.props.id) {
            this.loading(this.props.id)
        }
    }

    render() {

        const { charInfo, loading, error } = this.state;
        //debugger
        console.log('Render Info')
        const skeleton = loading || error || charInfo ? null : <Skeleton />;
        const spinner = loading ? <Spinner /> : null;
        const errorImg = error ? <ErrorMessage /> : null;
        //const content = !error && !loading && charInfo ? <View charInfo={charInfo} /> : null;
        const content = !(loading || error || !charInfo) ? <CharacterInfo charInfo={charInfo} /> : null;
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

}

CharacterInfoContainer.propTypes = {
    id: PropTypes.number
}

CharacterInfoContainer.defaultProps = {
    id: null
}

export default CharacterInfoContainer;