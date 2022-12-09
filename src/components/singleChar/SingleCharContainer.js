import { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import StateMachine from '../../utils.js/StateMachine'
import useMarvelAPI from './../../services/Api'
import SingleChar from './SingleChar'
import './singleChar.scss'



const SingleCharContainer = () => {

    const [char, setChar] = useState(null)
    const { charId } = useParams()
    const { getCharacter, clearError, process, setProcess } = useMarvelAPI()

    const load = (charId) => {
        clearError()
        getCharacter(charId)
            .then(char => setChar(char))
            .then(() => setProcess('done'))
    }

    useEffect(() => load(charId), [charId])

    //debugger
    console.log('Render Single Char')
    return (
        <>
            {StateMachine(process, SingleChar, char)}
        </>
    )
}

export default memo(SingleCharContainer)