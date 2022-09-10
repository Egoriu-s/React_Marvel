import { Component } from 'react';
import ErrorMessage from '../errorMessage/Error';

class ErrorBoundary extends Component {

    state = {
        error: false
    };

    static getDerivedStateFromError(error) {
        //debugger
        return { error: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
        //this.setState({ error: true })
    }

    render() {
       
       // console.log(this.props.children)
        if (this.state.error) {
            return <ErrorMessage />;
        }
        //debugger
        return this.props.children;
    }
}

export default ErrorBoundary;