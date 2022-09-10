import { Component } from 'react';
import { MarvelAPI } from '../../services/Api';
import Spinner from '../secondaryComponents/spinner/Spinner';
import ErrorMessage from '../secondaryComponents/errorMessage/Error';
import RandomCharacter from './RandomCharacter';
import './randomCharacter.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomCharacterContainer extends Component {

    state = {
        randomChar: {},
        loading: true,
        error: false
    }

    marvelAPI = new MarvelAPI();

    downloadBegin = () => {
        this.setState({
            loading: true,
            error: false
        })
    }

    downloadComplete = (randomChar) => {
        this.setState({
            randomChar,
            loading: false
        })
    }

    downloadError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    loading = () => {
        this.downloadBegin();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelAPI.getCharacter(id)
            .then(this.downloadComplete)
            .catch(this.downloadError);
    }

    componentDidMount() {
        //console.log('mountRandom')
        this.loading();
    }

    tryItClick = () => {
        this.loading();
    }

    render() {

        //console.log('renderRandom')
        const {randomChar, loading, error } = this.state;
        //debugger
        const errorImg = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !error && !loading ? <RandomCharacter randomChar={randomChar} /> : null;

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
                    <button onClick={this.tryItClick} className="button button__main" disabled={loading ? true : false}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }

}

export default RandomCharacterContainer;