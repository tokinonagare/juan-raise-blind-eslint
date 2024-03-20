import BlindsStructureItem from './BlindsStructureItem';

const GetTimeInterval = (raiseBlinds) => {
    if (raiseBlinds == null || raiseBlinds.length <= 1) {
        return 180;
    }

    const timeBasedRules = raiseBlinds.map((raiseBlindsData) => new BlindsStructureItem({
        after_seconds: raiseBlindsData.afterSeconds,
        ante: raiseBlindsData.ante,
        small_blind: raiseBlindsData.smallBlind,
        big_blind: raiseBlindsData.bigBlind,
    }));

    const timeInterval = (timeBasedRules[1].afterSeconds - timeBasedRules[0].afterSeconds);
    return timeInterval;
};

export default GetTimeInterval;
