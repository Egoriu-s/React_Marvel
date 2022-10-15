import { useState, useEffect, memo } from 'react'
import { useParams } from 'react-router-dom'
import useMarvelAPI from './../../services/Api'
import Spinner from '../secondaryComponents/spinner/Spinner'
import ErrorMessage from '../secondaryComponents/errorMessage/Error'
import SingleComic from './SingleComic'
import './singleComic.scss'


const SingleComicContainer = () => {

    const [comic, setComic] = useState(null)
    const { comicId } = useParams()
    const { getComic, loading, error, clearError } = useMarvelAPI()

    const load = (comicId) => {
        clearError()
        getComic(comicId)
            .then(comic => setComic(comic))
    }

    useEffect(() => load(comicId), [comicId])

    const errorImg = error && <ErrorMessage />
    const spinner = loading && <Spinner />
    const content = !error && !loading && !!comic && <SingleComic comic={comic} />

    //debugger
    console.log('Render Single Comic')
    return (
        <>
            {errorImg}
            {spinner}
            {content}
        </>
    )
}

export default memo(SingleComicContainer)