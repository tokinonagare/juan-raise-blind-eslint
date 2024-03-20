import BlindsStructureItem from './BlindsStructureItem';

const CreateBlindStructureList = (timeBasedRules) => {
    const listData = Object.values(timeBasedRules);
    const list = [];
    if (listData == null || listData === '') {
        return list;
    }
    for (let x = 0; x < listData.length; x += 1) {
        const blindStructureItem = new BlindsStructureItem(listData[x]);
        const {
            afterSeconds,
            bigBlind,
            smallBlind,
        } = blindStructureItem;

        let minute = Math.floor(afterSeconds / 60);
        let second = Math.floor(afterSeconds % 60);

        minute = minute.toString().length === 1 ? `0${minute}` : minute;
        second = second.toString().length === 1 ? `0${second}` : second;

        const level = x + 1;

        list.push({
            userLevel: `${level}`,
            timeText: `${minute.toString()}:${second.toString()}`,
            blindLabel: `${smallBlind}/${bigBlind}`,
        });
    }

    return list;
};

export default CreateBlindStructureList;
