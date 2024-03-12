/* eslint-disable camelcase */
import BlindsStructureItem from './BlindsStructureItem';

const CreateBlindStructureList = (data) => {
    const listData = Object.values(data);
    const list = [];
    if (listData == null || listData === '') {
        return list;
    }
    for (let x = 0; x < listData.length; x += 1) {
        const {
            afterSeconds, ante, bigBlind, smallBlind,
        } = listData[x];

        let minute = Math.floor(afterSeconds / 60);
        let second = Math.floor(afterSeconds % 60);

        minute = minute.toString().length === 1 ? `0${minute}` : minute;
        second = second.toString().length === 1 ? `0${second}` : second;

        const time = `${minute.toString()}:${second.toString()}`;

        list.push(new BlindsStructureItem({
            userLevel: `${ante}`,
            times: time,
            blindLabel: `${smallBlind}/${bigBlind}`,
        }));
    }

    return list;
};

export default CreateBlindStructureList;
