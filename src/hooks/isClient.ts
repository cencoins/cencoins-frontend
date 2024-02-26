import { useEffect, useState } from "react"

export const useIsClient = () => {
    const [client, setClient] = useState(false);

    useEffect(() => {
        setClient(typeof window !== 'undefined');
    }, [])

    return client
}