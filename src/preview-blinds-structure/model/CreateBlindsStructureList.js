const CreateBlindStructureList = (data) => {
    console.log(data);
    const list = [];
    const { gameTime, raiseBlindInterval, smallBlind } = data;
    const raiseBlindIntervalSeconds = raiseBlindInterval * 60;

    for (let x = 0; x < 10; x += 1) {
        const level = x + 1;
        let minute = Math.floor(raiseBlindIntervalSeconds / 60) * level + Math.floor(gameTime / 60);
        let second = Math.floor(raiseBlindIntervalSeconds % 60) * level + Math.floor(gameTime % 60);

        minute = minute.toString().length === 1 ? `0${minute}` : minute;
        second = second.toString().length === 1 ? `0${second}` : second;
        const time = `${minute.toString()}:${second.toString()}`;

        const baseBlind = 2 ** x;
        const blind1 = baseBlind * smallBlind;
        const blind2 = baseBlind * (smallBlind * 2);
        const blinds = `${blind1}/${blind2}`;

        const newItem = {
            Level: level,
            Time: time,
            Blinds: blinds,
        };

        list.push(newItem);
    }

    const minute = Math.floor(raiseBlindIntervalSeconds / 60);
    let second = Math.floor(raiseBlindIntervalSeconds % 60);

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
