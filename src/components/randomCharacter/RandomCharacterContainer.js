import { useState, useEffect, memo } from 'react'
import useMarvelAPI from './../../services/Api'
import RandomCharacter from './RandomCharacter'
import StateMachine from '../../utils.js/StateMachine'
import './randomCharacter.scss'
import mjolnir from '../../resources/img/mjolnir.png'



const RandomCharacterContainer = () => {

    const [randomChar, setRandomChar] = useState(null)
    const [disable, setDisable] = useState(true)
    const { getCharacter, clearError, process, setProcess } = useMarvelAPI()

    const load = (initial) => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        getCharacter(id)
            .then(randomCharNew => setRandomChar(randomCharNew))
            .then(() => setProcess('done'))
        initial && setDisable(false)
    }
    useEffect(() => load(true), [])

    const styleBtn = { opacity: process === 'fetching' && 0.5 }

    //debugger
    console.log('Render Random')
    return (
        <div className="randomchar">
            {StateMachine(process, RandomCharacter, randomChar)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={load}
                    className="button button__main"
                    disabled={disable || process === 'fetching'}
                    style={styleBtn}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

export default memo(RandomCharacterContainer)