import { Component } from 'react';
import ErrorMessage from '../errorMessage/Error';

class ErrorBoundary extends Component {

    state = {
        error: false
    }

    static getDerivedStateFromError() {
        return { error: true };
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if (this.state.error) return <ErrorMessage />
        return this.props.children;
    }
}

export default ErrorBoundary;