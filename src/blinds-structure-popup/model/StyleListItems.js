export const ItemRowStyle = (currentColumn, currentItem, currentLevel, styles) => {
    if (currentItem + 1 === currentLevel) {
        if (currentColumn === 0) return styles.tableSelectedLeft;
        if (currentColumn === 1) return styles.tableSelectedCentre;
        if (currentColumn === 2) return styles.tableSelectedRight;
    }
    if (currentColumn === 0) return styles.tableLeft;
    if (currentColumn === 1) return styles.tableCentre;
    if (currentColumn === 2) return styles.tableRight;
    return styles.tableLeft;
};

export const RenderCurrentValue = (renderItemIndex, currentLevel, value) => {
    if (renderItemIndex + 1 === currentLevel && renderItemIndex === 0) return `${value} Current Level`;
    return value;
};

export const AlternatingBackgroundStyle = (index, styles) => {
    if (index % 2 === 0) return styles.tableCellEven;
    if (index % 2 !== 0) return styles.tableCellOdd;
    return styles.tableCellOdd;
};
