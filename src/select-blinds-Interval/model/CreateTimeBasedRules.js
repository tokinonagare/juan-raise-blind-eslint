const CreateTimeBasedRules = (data) => {
    const timeBasedRules = [];
    const { gameTime, raiseBlindInterval, smallBlind } = data;

    for (let x = 0; x < 10; x += 1) {
        const level = x + 1;

        const afterSeconds = (gameTime + raiseBlindInterval * level) - raiseBlindInterval;

        const baseBlind = 2 ** x;
        const finalSmallBlind = baseBlind * smallBlind;
        const finalBigBlind = baseBlind * (smallBlind * 2);

        const newItem = {
            after_seconds: afterSeconds,
            ante: level,
            big_blind: finalBigBlind,
            small_blind: finalSmallBlind,
        };

        timeBasedRules.push(newItem);
    }
    return timeBasedRules;
};

export default CreateTimeBasedRules;
