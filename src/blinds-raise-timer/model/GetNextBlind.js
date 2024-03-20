import BlindsStructureItem from './BlindsStructureItem';

function GetNextBlind(timeBasedRules, gameTime, currentTime, timeInterval) {
    // Get how many seconds has passed.
    const levelTime = Math.abs(currentTime - gameTime);

    // Get the current level by dividing levelTime with timeInterval.
    const currentLevel = Math.floor(levelTime / (timeInterval));

    // Get the number of levels.
    const timeBasedRulesIndexSize = timeBasedRules.length;

    let blindData = {
        nextBlind: null,
        currentBlind: null,
    };

    if (currentLevel + 1 < timeBasedRulesIndexSize) {
        // If the level is not the last level, get the next level's data.
        blindData = {
            nextBlind: new BlindsStructureItem(timeBasedRules[currentLevel + 1]),
            currentBlind: new BlindsStructureItem(timeBasedRules[currentLevel]),
        };
    } else if (currentLevel + 1 === timeBasedRulesIndexSize) {
        // If the level is the last level, get the current level's data.
        blindData = {
            nextBlind: new BlindsStructureItem({
                afterSeconds: null,
                ante: null,
                smallBlind: ' - ',
                bigBlind: ' - ',
            }),
            currentBlind: new BlindsStructureItem(timeBasedRules[currentLevel]),
        };
    } else if (currentLevel + 1 > timeBasedRulesIndexSize) {
        blindData = {
            nextBlind: new BlindsStructureItem({
                afterSeconds: null,
                ante: null,
                smallBlind: ' - ',
                bigBlind: ' - ',
            }),
            currentBlind: new BlindsStructureItem(timeBasedRules[timeBasedRulesIndexSize - 1]),
        };
    }

    return blindData;
}

export default GetNextBlind;
