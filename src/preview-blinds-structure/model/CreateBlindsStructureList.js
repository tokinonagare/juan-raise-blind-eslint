const CreateBlindStructureList = (data) => {
    const list = [];
    const { gameTime, raiseBlindInterval, smallBlind } = data;
    console.log(raiseBlindInterval);
    const maxLevel = Math.floor(gameTime / raiseBlindInterval);
    for (let x = 0; x < maxLevel; x += 1) {
        const level = x + 1;
        let minute = Math.floor(raiseBlindInterval / 60) * level;
        let second = Math.floor(raiseBlindInterval % 60) * level;

        minute = minute.toString().length === 1 ? `0${minute}` : minute;
        second = second.toString().length === 1 ? `0${second}` : second;
        const time = `${minute.toString()}:${second.toString()}`;

        const baseBlind = 2 ** x;
        const blind1 = baseBlind * smallBlind;
        const blind2 = baseBlind * (smallBlind * 2);
        const blinds = `${blind1}/${blind2}`;

        const newItem = {
            user_level: level,
            times: time,
            blind_label: blinds,
        };

        list.push(newItem);
    }

    const minute = Math.floor(raiseBlindInterval / 60);
    let second = Math.floor(raiseBlindInterval % 60);

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
