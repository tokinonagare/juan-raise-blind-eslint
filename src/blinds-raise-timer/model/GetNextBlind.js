import BlindsStructureItem from './BlindsStructureItem';

function GetNextBlind(timeBasedRules, gameTime, currentTime, timeInterval) {
    // Get how many seconds has passed.
    const levelTime = Math.abs(currentTime - gameTime);

    // Get the current level by dividing levelTime with timeInterval.
    const currentLevel = Math.floor(levelTime / (timeInterval));

    // Get the number of levels.
    const timeBasedRulesIndexSize = timeBasedRules.length;

    let nextBlind = null;

    if (currentLevel + 1 < timeBasedRulesIndexSize) {
        // If the level is not the last level, get the next level's data.
        nextBlind = new BlindsStructureItem(timeBasedRules[currentLevel + 1]);
    } else if (currentLevel + 1 === timeBasedRulesIndexSize) {
        // If the level is the last level, get the current level's data.
        nextBlind = new BlindsStructureItem(timeBasedRules[currentLevel]);
    }

    return nextBlind;
}

export default GetNextBlind;
