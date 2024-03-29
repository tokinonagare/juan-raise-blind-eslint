import BlindsStructureItem from './BlindsStructureItem';

const CreateBlindStructureList = (data) => {
    const list = [];
    const { gameTime, raiseBlindInterval, smallBlind } = data;

    // Three required parameters for creating a blind structure:
    // Starting blind, total amount of chips, and number of levels.

    // The starting small blind.
    const startBlind = smallBlind;

    // The estimated total amount of chips that will be used in the game.
    // Current default is 580,000 which is equivalent to an approximate
    // estimate of 40,000 final big blind amount (Actual final big blind
    // is not exactly equal to this amount).
    // From what I understand, the final big blind amount should be
    // approximately equal or close to 7% of the total chip amount.
    // May need to be changed for longer game intervals or smaller number
    // of levels or each raise may be too big.
    const totalChips = 580_000;

    // The number of levels = Total game time / Game interval
    const numberOfLevels = Math.floor(gameTime / raiseBlindInterval);

    // To which chip denomination should the small blind be
    // rounded off to upon reaching a specific milestone.
    const chipColorUpMilestones = {
        T1: 5,
        T5: 10,
        T10: 50,
        T25: 200,
        T100: 1000,
        T500: 3000,
    };

    // To which chip denomination should the ante be
    // rounded off to upon reaching a specific milestone.
    const anteChipColorUpMilestones = {
        T1: 5,
        T5: 10,
        T10: 25,
        T25: 100,
        T100: 1000,
        T500: 3000,
    };

    // By how much should each level raise the blinds.
    // To get the blind raise multiplier:
    //    Get the estimated big blind of the final level by:
    //      Get the 7% of the total chips.
    //      Get the starting big blind.
    //      Then divide the two values to get the estimated final level's
    //      big blind:
    //        (totalChips * 0.07 ) / (startBlind * 2)
    //    Divide ( 1 / number of levels - 1 ).
    //    Then raise the estimated final big blind to the power of the second value:
    //      ((totalChips * 0.07 ) / (startBlind * 2)) ^ ( 1 / number of levels - 1)
    const raiseMultiplier = ((totalChips * 0.07) / (startBlind * 2)) ** (1 / (numberOfLevels - 1));

    // Keeps the previous level's small blind.
    let lastSmallBlind = 0;

    // Keeps the current small blind
    let currentSmallBlind = startBlind;

    let ante = null;
    let anteChip = startBlind;

    // Loop through each level
    for (let currentLevel = 1; currentLevel <= numberOfLevels; currentLevel += 1) {
        let chip = startBlind;

        if (currentLevel === 1) {
            // Set the first level's small blind to the provided starting blind.
            currentSmallBlind = chip;
            lastSmallBlind = currentSmallBlind;
        } else if (currentLevel <= numberOfLevels) {
            if (currentSmallBlind >= 1
                && currentSmallBlind < chipColorUpMilestones.T1) {
                chip = 1;
            } else if (currentSmallBlind >= chipColorUpMilestones.T1
                && currentSmallBlind < chipColorUpMilestones.T5) {
                chip = 5;
            } else if (currentSmallBlind >= chipColorUpMilestones.T5
                && currentSmallBlind < chipColorUpMilestones.T10) {
                chip = 10;
            } else if (currentSmallBlind >= chipColorUpMilestones.T10
                && currentSmallBlind < chipColorUpMilestones.T25) {
                chip = 25;
            } else if (currentSmallBlind >= chipColorUpMilestones.T25
                && currentSmallBlind < chipColorUpMilestones.T100) {
                chip = 100;
            } else if (currentSmallBlind >= chipColorUpMilestones.T100
                && currentSmallBlind < chipColorUpMilestones.T500) {
                chip = 500;
            } else if (currentSmallBlind >= 3000) {
                chip = 1000;
            }

            if (chip < startBlind) {
                chip = startBlind;
            }

            if (ante >= 0 && currentSmallBlind < chipColorUpMilestones.T1) {
                anteChip = 1;
            } else if (ante >= anteChipColorUpMilestones.T1
            && currentSmallBlind < anteChipColorUpMilestones.T5) {
                anteChip = 5;
            } else if (ante >= anteChipColorUpMilestones.T5
            && currentSmallBlind < anteChipColorUpMilestones.T10) {
                anteChip = 10;
            } else if (ante >= anteChipColorUpMilestones.T10
            && currentSmallBlind < anteChipColorUpMilestones.T25) {
                anteChip = 25;
            } else if (ante >= anteChipColorUpMilestones.T25
            && currentSmallBlind < anteChipColorUpMilestones.T100) {
                anteChip = 100;
            } else if (ante >= anteChipColorUpMilestones.T100
            && currentSmallBlind < anteChipColorUpMilestones.T500) {
                anteChip = 500;
            } else if (ante >= 3000) {
                anteChip = 1000;
            }

            // To get the next small blind value:
            //   Multiply the last small blind with the raise multiplier to get
            //   the next small blind value. Divide the result to the amount of
            //   the current chip denomination, round off, and multiply to the
            //   chip denomination.
            currentSmallBlind = Math.round((currentSmallBlind * raiseMultiplier) / chip) * chip;
            if (lastSmallBlind >= currentSmallBlind) {
                // Contingency.
                //   In case the next value ends up as the same as the last
                //   value, raise the small blind to the next denomination.
                currentSmallBlind = Math.round(((currentSmallBlind * raiseMultiplier) / chip) + 1) * chip;
            }
            // Save the current small blind to the last small blind variable
            // for the next loop to use.
            lastSmallBlind = currentSmallBlind;

            // Ante is about 1/4 of the small blind rounded down by the smallest
            // available denomination.
            ante = Math.floor((currentSmallBlind / 4) / anteChip) * anteChip;
            ante = ante === 0 ? null : ante;
        }
        /*
        Blind structure logic references:
            https://andrewcabiness.wordpress.com/2013/02/13/structuring-a-poker-tournament/
            https://homepokertourney.org/blinds.htm
            https://www.reddit.com/r/poker/comments/u4pxrx/is_there_a_good_formula_to_calculate_a_tournament/?rdt=62807
            https://pokersoup.com/tool/blindStructureCalculator
        */

        let minute = Math.floor(raiseBlindInterval / 60) * currentLevel;
        let second = Math.floor(raiseBlindInterval % 60) * currentLevel;

        minute = minute.toString().length === 1 ? `0${minute}` : minute;
        second = second.toString().length === 1 ? `0${second}` : second;
        const time = `${minute.toString()}:${second.toString()}`;

        const bigBlind = currentSmallBlind * 2;
        const blinds = `${currentSmallBlind}/${bigBlind}`;

        list.push(new BlindsStructureItem({
            userLevel: currentLevel,
            times: time,
            blindLabel: blinds,
        }));
    }

    const minute = Math.floor(raiseBlindInterval / 60);
    let second = Math.floor(raiseBlindInterval % 60);

    second = second.toString().length === 1 ? `0${second}` : second;

    const blindMultiplierDisplay = Math.round(raiseMultiplier * 100) / 100;

    list.push(new BlindsStructureItem({
        userLevel: '...',
        times: `+${minute}:${second}`,
        blindLabel: `*${blindMultiplierDisplay}`,
    }));

    return list;
};

export default CreateBlindStructureList;
