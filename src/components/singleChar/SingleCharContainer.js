import { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelAPI from './../../services/Api'
import Spinner from '../secondaryComponents/spinner/Spinner'
import ErrorMessage from '../secondaryComponents/errorMessage/Error'
import SingleChar from './SingleChar'
import './singleChar.scss'


const SingleCharContainer = () => {

    const [char, setChar] = useState(null)
    const { charId } = useParams()
    const { getCharacter, loading, error, clearError } = useMarvelAPI()

    const load = (charId) => {
        clearError()
        getCharacter(charId)
            .then(char => setChar(char))
    }

    useEffect(() => load(charId), [charId])

    const errorImg = error && <ErrorMessage />
    const spinner = loading && <Spinner />
    const content = !error && !loading && !!char && <SingleChar char={char} />

    //debugger
    console.log('Render Single Char')
    return (
        <>
            {errorImg}
            {spinner}
            {content}
        </>
    )
}

export default memo(SingleCharContainer)