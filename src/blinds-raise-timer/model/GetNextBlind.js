import BlindsStructureItem from './BlindsStructureItem';

function GetNextBlind(raiseBlindRules, gameTime, currentTime, timeInterval) {
    // Get how many seconds has passed.
    const levelTime = Math.abs(currentTime - gameTime);

    // Get the current level by dividing levelTime with timeInterval.
    const currentLevel = Math.floor(levelTime / (timeInterval));

    const timeBasedRules = raiseBlindRules.map((blindStructureData) => new BlindsStructureItem({
        after_seconds: blindStructureData.afterSeconds,
        ante: blindStructureData.ante,
        small_blind: blindStructureData.smallBlind,
        big_blind: blindStructureData.bigBlind,
    }));

    // Get the number of levels.
    const timeBasedRulesIndexSize = timeBasedRules.length;

    let blindData = {
        nextBlind: null,
        currentBlind: null,
    };

    if (currentLevel + 1 < timeBasedRulesIndexSize) {
        // If the level is not the last level, get the next level's data.
        blindData = {
            nextBlind: new BlindsStructureItem({
                after_seconds: timeBasedRules[currentLevel + 1].afterSeconds,
                ante: timeBasedRules[currentLevel + 1].ante,
                small_blind: timeBasedRules[currentLevel + 1].smallBlind,
                big_blind: timeBasedRules[currentLevel + 1].bigBlind,
            }),
            currentBlind: new BlindsStructureItem({
                after_seconds: timeBasedRules[currentLevel].afterSeconds,
                ante: timeBasedRules[currentLevel].ante,
                small_blind: timeBasedRules[currentLevel].smallBlind,
                big_blind: timeBasedRules[currentLevel].bigBlind,
            }),
        };
    } else if (currentLevel + 1 === timeBasedRulesIndexSize) {
        // If the level is the last level, get the current level's data.
        blindData = {
            nextBlind: new BlindsStructureItem({
                after_seconds: null,
                ante: null,
                small_blind: ' - ',
                big_blind: ' - ',
            }),
            currentBlind: new BlindsStructureItem({
                after_seconds: timeBasedRules[currentLevel].afterSeconds,
                ante: timeBasedRules[currentLevel].ante,
                small_blind: timeBasedRules[currentLevel].smallBlind,
                big_blind: timeBasedRules[currentLevel].bigBlind,
            }),
        };
    } else if (currentLevel + 1 > timeBasedRulesIndexSize) {
        blindData = {
            nextBlind: new BlindsStructureItem({
                after_seconds: null,
                ante: null,
                small_blind: ' - ',
                big_blind: ' - ',
            }),
            currentBlind: new BlindsStructureItem({
                after_seconds: timeBasedRules[timeBasedRulesIndexSize - 1].afterSeconds,
                ante: timeBasedRules[timeBasedRulesIndexSize - 1].ante,
                small_blind: timeBasedRules[timeBasedRulesIndexSize - 1].smallBlind,
                big_blind: timeBasedRules[timeBasedRulesIndexSize - 1].bigBlind,
            }),
        };
    }

    return blindData;
}

export default GetNextBlind;
