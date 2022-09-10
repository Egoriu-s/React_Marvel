import { Component } from 'react';
import * as ReactDOM from 'react-dom';
import ErrorBoundary from '../secondaryComponents/errorBoundary/ErrorBoundary';
import AppHeader from '../appHeader/AppHeader';
import RandomCharacterContainer from '../randomCharacter/RandomCharacterContainer';
import CharacterListContainer from '../characterList/CharacterListContainer';
import CharacterInfoContainer from '../characterInfo/CharacterInfoContainer';
import './app.scss';
import vision from '../../resources/img/vision.png';


const Portal = (props) => {
    //debugger
    const node = document.createElement('div');
    document.body.appendChild(node);
    return ReactDOM.createPortal(props.children, node);

}

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

        console.log('renderApp')
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