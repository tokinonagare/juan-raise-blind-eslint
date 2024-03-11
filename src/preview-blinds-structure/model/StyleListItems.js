export const RowItemStyle = (index, styles) => {
    if (index === 0) return styles.tableLeft;
    if (index === 1) return styles.tableCentre;
    if (index === 2) return styles.tableRight;
    return styles.tableLeft;
};

export const HeaderStyle = (index, styles) => {
    if (index === 0) return styles.tableLeft;
    if (index === 1) return styles.tableCentre;
    if (index === 2) return styles.tableRight;
    return styles.tableLeft;
};
