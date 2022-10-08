import { useState, useCallback } from "react"
import CharacterListContainer from "../characterList/CharacterListContainer"
import CharacterInfoContainer from "../characterInfo/CharacterInfoContainer"
import RandomCharacterContainer from "../randomCharacter/RandomCharacterContainer"
import ErrorBoundary from "../secondaryComponents/errorBoundary/ErrorBoundary"
import vision from "../../resources/img/vision.png"

const MainPage = () => {

    const [id, setId] = useState(null)

    const setCharItemId = useCallback((outputId) => {
        id !== outputId && setId(outputId);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }, [])

    return (
        <>
            <ErrorBoundary>
                <RandomCharacterContainer />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharacterListContainer setCharItemId={setCharItemId} />
                    <CharacterInfoContainer id={id} />
                </ErrorBoundary>
            </div>
            <img className="bg-decoration" src={vision} alt="vision" />
        </>
    )

}

export default MainPage