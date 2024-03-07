/* eslint-disable camelcase */

const CreateBlindStructureList = (data) => {
    const listData = Object.values(data);
    const list = [];
    if (listData == null || listData === '') {
        return list;
    }
    for (let x = 0; x < listData.length; x += 1) {
        const {
            after_seconds, ante, big_blind, small_blind,
        } = listData[x];

        let minute = Math.floor(after_seconds / 60);
        let second = Math.floor(after_seconds % 60);

        minute = minute.toString().length === 1 ? `0${minute}` : minute;
        second = second.toString().length === 1 ? `0${second}` : second;

        const time = `${minute.toString()}:${second.toString()}`;

        const newItem = {
            user_level: `${ante}`,
            times: time,
            blind_label: `${small_blind}/${big_blind}`,
        };

        list.push(newItem);
    }

    return list;
};

export default CreateBlindStructureList;
