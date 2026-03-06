import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/imageUrl';

export default function CategoryCard({ category }) {
    const defaultImages = {
        'tables': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85',
        'consoles': 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85',
        'vasques': 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=85',
        'accessoires': 'https://images.unsplash.com/photo-1594913371583-95c8e8bfef5b?w=800&q=85',
        'sur-mesure': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85',
        'salons': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=85',
        'decoration': 'https://images.unsplash.com/photo-1616048056617-93b94a339009?w=800&q=85'
    };

    const resolveImage = (internalPath) => {
        if (!internalPath) return null;
        if (internalPath.startsWith('http')) return internalPath;
        const base = (import.meta.env.VITE_API_URL || 'https://server-gamma-murex-45.vercel.app/api').replace(/\/api\/?$/, '') || 'https://server-gamma-murex-45.vercel.app';
        return base + (internalPath.startsWith('/') ? internalPath : '/' + internalPath);
    };

    const imageUrl = category.image ? resolveImage(category.image) : defaultImages[category.slug?.toLowerCase()] || defaultImages['sur-mesure'];

    return (
        <Link
            to={`/catalogue?category=${category.slug}`}
            className="relative block w-full aspect-square overflow-hidden group border border-transparent hover:border-gold/50 transition-colors duration-300"
            data-reveal
        >
            <div className="absolute inset-0 bg-bg-secondary">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt={category.name}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={800}
                        height={800}
                    />
                )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Gold corner brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <h3 className="font-display text-[16px] font-[500] text-bg-primary tracking-[0.1em]">{category.name}</h3>
                <span className="font-body text-[10px] tracking-[0.15em] uppercase text-cream opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    Découvrir →
                </span>
            </div>
        </Link>
    );
}
