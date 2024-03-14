import { useState, useEffect } from 'react';

const roomTimer = (gameTimeSeconds, roomState) => {
    const [timeSecondsLeft, setTimeSecondsLeft] = useState(gameTimeSeconds);

    useEffect(() => {
        const id = setTimeout(() => {
            if (roomState === 'running' && timeSecondsLeft > 0) {
                setTimeSecondsLeft((previous) => previous - 1);
            }
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    });

    return timeSecondsLeft;
};

export default roomTimer;
