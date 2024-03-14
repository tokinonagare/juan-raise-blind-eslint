function GetCurrentLevel(timeBasedRules, gameTime, currentTime) {
    const levelTime = Math.abs(currentTime - gameTime);
    let level = 0;
    let levelData = null;
    if (timeBasedRules != null) {
        for (let levelIndex = 0; levelIndex < timeBasedRules.length; levelIndex += 1) {
            if (levelIndex + 1 < timeBasedRules.length) {
                if (levelTime >= timeBasedRules[levelIndex].afterSeconds
                    && levelTime < timeBasedRules[levelIndex + 1].afterSeconds) {
                    level = levelIndex;
                }
            } else if (levelIndex + 1 >= timeBasedRules.length) {
                if (levelTime >= timeBasedRules[levelIndex].afterSeconds) {
                    level = levelIndex;
                }
            }
        }
    }
    if (level + 1 < timeBasedRules.length) {
        levelData = {
            currentLevel: {
                blinds: `${timeBasedRules[level].smallBlind}/${timeBasedRules[level].bigBlind}`,
                level: level + 1,
            },
            nextLevel: `${timeBasedRules[level + 1].smallBlind}/${timeBasedRules[level + 1].bigBlind}`,
        };
    } else if (level + 1 >= timeBasedRules.length) {
        levelData = {
            currentLevel: {
                blinds: `${timeBasedRules[level].smallBlind}/${timeBasedRules[level].bigBlind}`,
                level: level + 1,
            },
            nextLevel: 'No next blinds',
        };
    }
    return levelData;
}

export default GetCurrentLevel;
