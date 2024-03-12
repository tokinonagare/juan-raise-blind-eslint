export const RowItemStyle = (currentColumn, styles) => {
    if (currentColumn === 0) return styles.tableLeft;
    if (currentColumn === 1) return styles.tableCentre;
    if (currentColumn === 2) return styles.tableRight;
    return styles.tableLeft;
};

export const HeaderStyle = (currentColumn, styles) => {
    if (currentColumn === 0) return styles.tableLeft;
    if (currentColumn === 1) return styles.tableCentre;
    if (currentColumn === 2) return styles.tableRight;
    return styles.tableLeft;
};
