import { useState, useEffect, memo } from 'react'
import useMarvelAPI from './../../services/Api'
import CharacterInfo from './CharacterInfo'
import './characterInfo.scss'
import StateMachine from '../../utils.js/StateMachine'


const CharacterInfoContainer = (props) => {

    const [charInfo, setCharInfo] = useState(null)
    const { getCharacter, clearError, process, setProcess } = useMarvelAPI()

    const load = (id) => {
        clearError()
        getCharacter(id)
            .then(charInfo => setCharInfo(charInfo))
            .then(() => setProcess('done'))
    }
    useEffect(() => {
        if (props.id !== null) load(props.id)
    }, [props.id])

    //debugger
    console.log('Render Info')
    return (
        <div className="char__info">
            {StateMachine(process, CharacterInfo, charInfo)}
            <p className="char__select">Please select a character to see information</p>

        </div>
    )

}

export default memo(CharacterInfoContainer);