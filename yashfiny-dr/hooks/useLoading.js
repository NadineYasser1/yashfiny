import { useState } from 'react';

const useLoading = () => {
    const [loading, setLoading] = useState(false);

    const setIsLoading = (isLoading) => setLoading(isLoading);

    return { loading, setIsLoading };
};

export default useLoading;