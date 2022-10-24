import "./spinner.scss"

const Spinner = (props) => {

    const styleSVG = {
        margin: '0 auto',
        background: 'none',
        display: 'block',
        shapeRendering: 'auto'
    }

    return (
        // <div className="loader">
        //     <div className="inner one"></div>
        //     <div className="inner two"></div>
        //     <div className="inner three"></div>
        // </div>
        <svg xmlns="http://www.w3.org/2000/svg"
            style={{ ...styleSVG, ...props }}
            width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
            <g transform="translate(50,50)">
                <g transform="scale(0.94)">
                    <circle cx="0" cy="0" r="50" fill="#5c5c5c"></circle>
                    <circle cx="0" cy="-25" r="21" fill="#9f0013">
                        <animateTransform attributeName="transform" type="rotate" dur="1.1363636363636365s"
                            repeatCount="indefinite" keyTimes="0;1" values="0 0 0;360 0 0"></animateTransform>
                    </circle>
                </g>
            </g>
        </svg>
    )

}

export default Spinner;