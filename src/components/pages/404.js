import { Link } from 'react-router-dom'
import ErrorMessage from "../secondaryComponents/errorMessage/Error"

const NotFound404 = () => {
    return (
        <div>
            <ErrorMessage />
            <h1>404 Not Found</h1>
            <br />
            <Link to="/">
                <button className="button button__main">
                    <div className="inner">Go back</div>
                </button>
            </Link>
        </div>
    )
}

export default NotFound404