export const ItemRowStyle = (index, index2, currentLevel, styles) => {
    if (index2 + 1 === currentLevel) {
        if (index === 0) return styles.tableSelectedLeft;
        if (index === 1) return styles.tableSelectedCentre;
        if (index === 2) return styles.tableSelectedRight;
    }
    if (index === 0) return styles.tableLeft;
    if (index === 1) return styles.tableCentre;
    if (index === 2) return styles.tableRight;
    return styles.tableLeft;
};

export const RenderCurrentValue = (index, currentLevel, value) => {
    if (index + 1 === currentLevel && index === 0) return `${value} Current Level`;
    return value;
};

export const AlternatingBackgroundStyle = (index, styles) => {
    if (index % 2 === 0) return styles.tableCellEven;
    if (index % 2 !== 0) return styles.tableCellOdd;
    return styles.tableCellOdd;
};
