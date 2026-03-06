import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { getImageUrl } from '../utils/imageUrl';

export default function ProductCard({ product }) {
    const { t } = useTranslation();
    const imageSrc = product.images?.[0] ? getImageUrl(product.images[0]) : '/images/products/ig-1-travertine-dining-table.jpg';
    return (
        <Link
            to={`/catalogue/${product.slug}`}
            className="block group cursor-pointer card-luxury rounded-sm overflow-hidden"
        >
            {/* Image container — MUST have explicit aspect ratio */}
            <div
                className="overflow-hidden bg-bg-secondary w-full"
                style={{ aspectRatio: '3 / 4' }}
            >
                <img
                    src={imageSrc}
                    alt={product.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            </div>

            {/* Info */}
            <div className="pt-4 pb-3 px-3">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-display text-[18px] text-dark leading-tight">
                        {product.name}
                    </h3>
                    <span className="font-body text-[16px] text-gold font-semibold whitespace-nowrap">
                        {product.priceLabel || `${product.price?.toLocaleString()} MAD`}
                    </span>
                </div>
                <span className="inline-block font-body text-[9px] tracking-[0.15em] uppercase text-gold border border-gold/60 px-2 py-0.5 mb-2.5">
                    {product.material}
                </span>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-gold group-hover:tracking-[0.2em] transition-all duration-300">
                    {t('buttons.voirProduit')} →
                </p>
            </div>
        </Link>
    );
}
