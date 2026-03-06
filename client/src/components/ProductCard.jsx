import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { getImageUrl } from '../utils/imageUrl';
import TiltCard from './TiltCard';
import ProgressiveImage from './ProgressiveImage';

export default function ProductCard({ product }) {
    const { t } = useTranslation();
    const imageSrc = product.images?.[0] ? getImageUrl(product.images[0]) : '/images/products/ig-1-travertine-dining-table.jpg';
    return (
        <TiltCard intensity={8}>
            <Link
                to={`/catalogue/${product.slug}`}
                className="block group cursor-pointer"
            >
                {/* Image container — MUST have explicit aspect ratio */}
                <div
                    className="overflow-hidden bg-[var(--bg-secondary)] w-full"
                    style={{ aspectRatio: '3 / 4' }}
                >
                    <ProgressiveImage
                        src={imageSrc}
                        alt={product.name}
                        className="w-full h-full transition-transform duration-[1200ms] group-hover:scale-105"
                    />
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
                    <p className="font-body text-[10px] tracking-[0.15em] uppercase text-[#C8A96E]">
                        {t('buttons.voirProduit')} →
                    </p>
                </div>
            </Link>
        </TiltCard>
    );
}
