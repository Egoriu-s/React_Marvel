import { memo } from 'react'
import imgAvengers from "../../resources/img/Avengers.png";
import imgAvengersLogo from "../../resources/img/Avengers_logo.png";
import './appBanner.scss'

const AppBanner = () => {

    //debugger
    console.log("Render AppBanner")
    return (
        <div className="app__banner">
            <img src={imgAvengers} alt="Avengers" />
            <div className="app__banner-text">
                New comics every week!
                <br />
                Stay tuned!
            </div>
            <img src={imgAvengersLogo} alt="Avengers logo" />
        </div>
    )
}

export default AppBanner