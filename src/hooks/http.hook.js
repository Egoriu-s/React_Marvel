import { useState, useCallback } from 'react';

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const clearError = () => setError(false)

    const request = useCallback(
        async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
            //debugger
            setLoading(true)
            //debugger
            try {
                const response = await fetch(url, { method, body, headers })
                if (response.status !== 200) {
                    throw new Error(`Could not fetch to ${url}, status: ${response.code}`);
                }
                const data = await response.json()
                setLoading(false)
                return data
            }
            catch (error) {
                setLoading(false)
                setError(error.message)
                throw error
            }
        }, [])
    //console.log(loading)
    return { request, loading, error, clearError }
}

export default useHttp