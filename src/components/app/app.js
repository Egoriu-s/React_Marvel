import { Component } from 'react';
import ErrorBoundary from '../secondaryComponents/errorBoundary/ErrorBoundary';
import AppHeader from '../appHeader/AppHeader';
import RandomCharacterContainer from '../randomCharacter/RandomCharacterContainer';
import CharacterListContainer from '../characterList/CharacterListContainer';
import CharacterInfoContainer from '../characterInfo/CharacterInfoContainer';
import './app.scss';
import vision from '../../resources/img/vision.png';


class App extends Component {

    state = {
        id: null
    }

    setCharItemId = (id) => {
        this.setState({ id });
        this.upClick();
    }

    upClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    render() {
        //debugger

        console.log('Render App')
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomCharacterContainer />
                    </ErrorBoundary>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharacterListContainer setCharItemId={this.setCharItemId} />
                            <CharacterInfoContainer id={this.state.id} />
                        </ErrorBoundary>
                    </div>
                    <img className="bg-decoration" src={vision} alt="vision" />
                </main>
            </div>
        )

    }
}

export default App;