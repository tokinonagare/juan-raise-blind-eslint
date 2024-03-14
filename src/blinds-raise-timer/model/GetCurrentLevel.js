import BlindsStructureItem from './BlindsStructureItem';

function GetCurrentLevel(timeBasedRules, currentTime) {
    const gameTime = timeBasedRules[1].afterSeconds + timeBasedRules[timeBasedRules.length - 1].afterSeconds;
    const levelTime = Math.abs(currentTime - gameTime);

    const timeBasedRulesIndexSize = timeBasedRules.length;

    let level = 0;
    let levelData = null;
    if (timeBasedRules != null) {
        for (let levelIndex = 0; levelIndex < timeBasedRulesIndexSize; levelIndex += 1) {
            if (levelIndex + 1 < timeBasedRulesIndexSize) {
                if (levelTime >= timeBasedRules[levelIndex].afterSeconds
                    && levelTime < timeBasedRules[levelIndex + 1].afterSeconds) {
                    level = levelIndex;
                }
            } else if (levelIndex + 1 >= timeBasedRulesIndexSize) {
                if (levelTime >= timeBasedRules[levelIndex].afterSeconds) {
                    level = levelIndex;
                }
            }
        }
    }
    if (level + 1 < timeBasedRulesIndexSize) {
        levelData = new BlindsStructureItem(timeBasedRules[level + 1]);
    } else if (level + 1 >= timeBasedRulesIndexSize) {
        levelData = new BlindsStructureItem(timeBasedRules[level]);
    }
    return levelData;
}

export default GetCurrentLevel;
