const GetTimeInterval = (raiseBlinds) => {
    if (raiseBlinds == null || raiseBlinds.length <= 1) {
        return 3;
    }
    const timeInterval = (raiseBlinds[1].afterSeconds - raiseBlinds[0].afterSeconds) / 60;
    return timeInterval;
};

export default GetTimeInterval;
