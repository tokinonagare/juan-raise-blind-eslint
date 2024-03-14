import BlindsStructureItem from './BlindsStructureItem';

const FormatBlind = (blindStructureData) => {
    if (blindStructureData == null) {
        return '';
    }
    const blindStructureItem = new BlindsStructureItem(blindStructureData);
    const label = `${blindStructureItem.smallBlind}/${blindStructureItem.bigBlind}`;
    return label;
};

export default FormatBlind;
