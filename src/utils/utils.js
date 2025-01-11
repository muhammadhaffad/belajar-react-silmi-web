export const urlToBreadcrumbs = (url) => {
    const parts = new URL(url).pathname.split('/').filter(Boolean);
    return parts.map((part, index) => ({
        name: toCamelCase(part.replace(/-/g, ' '), ' '),
        url: `${new URL(url).origin}/${parts.slice(0, index + 1).join('/')}`
    }));
}
export const numberToRupiah = (number) => {
    return 'Rp' + number.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
export const toCamelCase = (string, separator = '') => {
    return string.toLowerCase().split(/[\s-_]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(separator);
} 