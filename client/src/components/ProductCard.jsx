import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { getImageUrl } from '../utils/imageUrl';

export default function ProductCard({ product }) {
    const imageSrc = product.images?.[0] ? getImageUrl(product.images[0]) : '/images/products/ig-1-travertine-dining-table.jpg';
    return (
        <Link
            to={`/catalogue/${product.slug}`}
            className="block group cursor-pointer"
        >
            {/* Image container */}
            <div
                className="overflow-hidden bg-bg-secondary w-full relative"
                style={{ aspectRatio: '3 / 4' }}
            >
                <img
                    src={imageSrc}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-obsidian/90 backdrop-blur-sm flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <ShoppingBag size={14} className="text-cream" />
                    <span className="text-cream text-[10px] tracking-[0.2em] uppercase font-body">
                        Ajouter au Devis
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="pt-3 pb-1">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-display text-[18px] text-dark leading-tight">
                        {product.name}
                    </h3>
                    <span className="font-body text-[16px] text-gold font-semibold whitespace-nowrap">
                        {product.priceLabel || `${product.price?.toLocaleString()} MAD`}
                    </span>
                </div>
                <span className="inline-block font-body text-[9px] tracking-[0.15em] uppercase text-gold border border-gold px-2 py-0.5 mb-2">
                    {product.material}
                </span>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-gold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                    Voir le produit →
                </p>
            </div>
        </Link>
    );
}
