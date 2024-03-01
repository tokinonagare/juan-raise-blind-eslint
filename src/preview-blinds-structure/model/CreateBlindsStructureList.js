const CreateBlindStructureList = (data) => {
    const list = [];
    const { smallBlind } = data;

    for (let x = 0; x < 10; x += 1) {
        const level = x + 1;
        let minute = data.raiseBlindInterval.minute * level + data.gameTime.minute;
        let second = data.raiseBlindInterval.second * level + data.gameTime.second;

        minute = minute.toString().length === 1 ? `0${minute}` : minute;
        second = second.toString().length === 1 ? `0${second}` : second;
        const time = `${minute.toString()}:${second.toString()}`;

        const baseBlind = 2 ** x;
        const blind1 = baseBlind * smallBlind.blind1;
        const blind2 = baseBlind * smallBlind.blind2;
        const blinds = `${blind1}/${blind2}`;

        const newItem = {
            Level: level,
            Time: time,
            Blinds: blinds,
        };

        list.push(newItem);
    }

    const { minute } = data.raiseBlindInterval;
    let { second } = data.raiseBlindInterval;

    second = second.toString().length === 1 ? `0${second}` : second;

    const endItem = {
        Level: '...',
        Time: `+${minute}:${second}`,
        Blinds: '*2',
    };

    list.push(endItem);

    return list;
};

export default CreateBlindStructureList;
