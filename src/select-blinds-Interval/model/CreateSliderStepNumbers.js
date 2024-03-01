const CreateSliderStepNumbers = (props) => {
    const { timeStart } = props;
    const { timeStep } = props;
    const { timeNumberOfSteps } = props;
    const timeStepList = [];
    for (let x = 0; x < timeNumberOfSteps; x += 1) {
        timeStepList.push(timeStart + timeStep * x);
    }

    const data = {
        timeStepList,
    };

    return data;
};

export default CreateSliderStepNumbers;
