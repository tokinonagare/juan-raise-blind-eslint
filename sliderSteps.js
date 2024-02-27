

const sliderSteps = (props) => {
    const timeStart = props.timeStart;
    const timeStep = props.timeStep;
    const timeNumberOfSteps = props.timeNumberOfSteps;
    const timeMax = timeStart + (timeStep * (timeNumberOfSteps - 1));
    const timeStepList = [];
    for (let x = 0; x < timeNumberOfSteps; x++)
    {
      timeStepList.push((timeStart) + (timeStep * x));
    }

    const data = { 
        duration: { minute: props.timeStart, second: 0 }, 
        interval: (props.switchState ? 2 : 1),
        maxTime: timeMax,
        timeStepList: timeStepList
    };

    return data;
}

export default sliderSteps;
