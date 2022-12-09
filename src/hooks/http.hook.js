import { useState, useCallback } from 'react'

const useHttp = () => {

    const [process, setProcess] = useState('waiting')
    const clearError = () => {
        setProcess('fetching')
    }
    
    const request = useCallback(
        async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {
            //debugger
            setProcess('fetching')
            //debugger
            try {
                const response = await fetch(url, { method, body, headers })
                if (response.status !== 200) {
                    throw new Error(`Could not fetch to ${url}, status: ${response.code}`);
                }
                return await response.json()
            }
            catch (error) {
                setProcess('error')
                throw error
            }
        }, [])

    return { request, clearError, process, setProcess }
}

export default useHttp