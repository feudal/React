import React, {useEffect, useState} from 'react';

const useCounter = (step) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter + step);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return counter;
};

export default useCounter;
