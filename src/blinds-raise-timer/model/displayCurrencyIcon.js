export default function useCurrencyIcon(chipIcon, coinIcon, currency) {
    if (currency === 'chip') {
        return chipIcon;
    }
    return coinIcon;
}
