/**
 * Resolve product image path from API to full URL.
 * API returns paths like /images/products/xxx — they must be loaded from the server origin.
 */
export function getImageUrl(path) {
    if (!path || typeof path !== 'string') return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    const base = (import.meta.env.VITE_API_URL || 'https://server-gamma-murex-45.vercel.app/api')
        .replace(/\/api\/?$/, '') || 'https://server-gamma-murex-45.vercel.app';
    return base + (path.startsWith('/') ? path : '/' + path);
}
