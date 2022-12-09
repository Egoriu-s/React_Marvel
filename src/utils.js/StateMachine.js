
import ErrorMessage from '../components/secondaryComponents/errorMessage/Error'
import Skeleton from '../components/secondaryComponents/skeleton/Skeleton'
import Spinner from '../components/secondaryComponents/spinner/Spinner'


const StateMachine = (process, Component, data) => {

    //debugger
    //console.log("State Machine")
    switch (process) {
        case 'waiting': return <Skeleton />
        case 'fetching': return <Spinner />
        case 'error': return <ErrorMessage />
        case 'done': return <Component data={data} />
        default: throw new Error

    }
}

export default (StateMachine)