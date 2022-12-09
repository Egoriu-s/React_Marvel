import { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelAPI from './../../services/Api'
import StateMachine from '../../utils.js/StateMachine'
import SingleComic from './SingleComic'
import './singleComic.scss'

const SingleComicContainer = () => {

    const [comic, setComic] = useState(null)
    const { comicId } = useParams()
    const { getComic, clearError, process, setProcess } = useMarvelAPI()

    const load = (comicId) => {
        clearError()
        getComic(comicId)
            .then(comic => setComic(comic))
            .then(() => setProcess('done'))
    }
    useEffect(() => load(comicId), [comicId])

    //debugger
    console.log('Render Single Comic')
    return (
        <>
            {StateMachine(process, SingleComic, comic)}
        </>
    )
}

export default memo(SingleComicContainer)