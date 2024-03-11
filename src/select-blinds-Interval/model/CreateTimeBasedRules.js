import RaiseblindItem from './RaiseBlindItem';

const CreateTimeBasedRules = (data) => {
    const timeBasedRules = [];
    const { gameTime, raiseBlindInterval, smallBlind } = data;

    const maxLevel = Math.floor(gameTime / raiseBlindInterval);
    for (let x = 0; x < maxLevel; x += 1) {
        const level = x + 1;

        const afterSeconds = (raiseBlindInterval * level) - raiseBlindInterval;

        const baseBlind = 2 ** x;
        const finalSmallBlind = baseBlind * smallBlind;
        const finalBigBlind = baseBlind * (smallBlind * 2);

        timeBasedRules.push(new RaiseblindItem({
            afterSeconds,
            ante: level,
            bigBlind: finalBigBlind,
            smallBlind: finalSmallBlind,
        }));
    }
    return timeBasedRules;
};

export default CreateTimeBasedRules;
