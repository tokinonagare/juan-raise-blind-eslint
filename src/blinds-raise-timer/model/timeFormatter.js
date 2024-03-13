function formatTime(countdownSeconds) {
    let hours = Math.floor(countdownSeconds / 3600);
    let minutes = Math.floor(countdownSeconds / 60);
    let seconds = Math.floor(countdownSeconds % 60);

    const minutesInHours = hours * 60;
    minutes -= minutesInHours;

    hours = hours.toString().length === 1 ? `0${hours}` : hours;
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
    seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;

    const time = `${hours}:${minutes}:${seconds}`;

    return time;
}

export default formatTime;
