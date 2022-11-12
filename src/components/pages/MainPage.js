import { useState, useCallback } from "react"
import CharacterListContainer from "../characterList/CharacterListContainer"
import CharacterInfoContainer from "../characterInfo/CharacterInfoContainer"
import CharacterSearch from './../characterSeach/CharacterSeach'
import RandomCharacterContainer from "../randomCharacter/RandomCharacterContainer"
import ErrorBoundary from "../secondaryComponents/errorBoundary/ErrorBoundary"


const MainPage = () => {

    const [id, setId] = useState(null)
    const setCharItemId = useCallback((outputId) => {
        id !== outputId && setId(outputId)
        // window.scrollTo({
        //     top: 0,
        //     behavior: "smooth",
        // })
    }, [])


    //debugger
    console.log('Main Page')
    return (
        <>
            <ErrorBoundary>
                <RandomCharacterContainer />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharacterListContainer setCharItemId={setCharItemId} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharacterInfoContainer id={id} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharacterSearch />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )

}

export default MainPage