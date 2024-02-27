

const CreateSliderStepNumbers = (props) => {
    const timeStart = props.timeStart;
    const timeStep = props.timeStep;
    const timeNumberOfSteps = props.timeNumberOfSteps;
    const timeStepList = [];
    for (let x = 0; x < timeNumberOfSteps; x++)
    {
      timeStepList.push((timeStart) + (timeStep * x));
    }

    const data = { 
        timeStepList: timeStepList
    };

    return data;
}

export default CreateSliderStepNumbers;
