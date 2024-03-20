import BlindsStructureItem from './BlindsStructureItem';

const FormatBlind = (blindStructureData) => {
    if (blindStructureData == null) {
        return '';
    }
    const blindStructureItem = new BlindsStructureItem({
        after_seconds: blindStructureData.afterSeconds,
        ante: blindStructureData.ante,
        small_blind: blindStructureData.smallBlind,
        big_blind: blindStructureData.bigBlind,
    });

    const {
        ante,
        smallBlind,
        bigBlind,
    } = blindStructureItem;

    const label = ante
        ? `${ante} ${smallBlind}/${bigBlind}`
        : `${smallBlind}/${bigBlind}`;
    return label;
};

export default FormatBlind;
