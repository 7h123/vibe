import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { getProduct } from '../services/api';
import { CartContext } from '../context/CartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';
import LoadingSpinner from '../components/LoadingSpinner';
import { getImageUrl } from '../utils/imageUrl';

export default function ProductDetail() {
    useScrollReveal();
    const { t } = useTranslation();
    const { slug } = useParams();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeImage, setActiveImage] = useState(0);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (!slug) {
            setError(t('productDetail.errors.invalidUrl'));
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        getProduct(slug)
            .then(res => {
                const data = res.data?.product ?? res.data;
                setProduct(data || null);
                if (!data) setError(t('productDetail.notFound'));
            })
            .catch(() => setError(t('productDetail.errors.loadFailed')))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) return <div className="pt-[64px] min-h-screen bg-bg-secondary"><LoadingSpinner /></div>;

    if (error || !product) {
        return (
            <div className="pt-[64px] min-h-screen bg-bg-secondary flex flex-col items-center justify-center px-5">
                <p className="font-body text-[14px] text-text-sec mb-4">{error || t('productDetail.errors.notFound')}</p>
                <Link to="/catalogue" className="bg-dark text-bg-primary font-body text-[11px] font-medium tracking-wider uppercase h-11 px-8 inline-flex items-center">
                    {t('buttons.retourCatalogue')}
                </Link>
            </div>
        );
    }

    const handleAddCart = () => {
        addToCart(product, qty);
        // Optional: show a toast or slide-out cart
    };

    const rawImages = Array.isArray(product.images) && product.images.length ? product.images : [null];
    const images = rawImages.map(path => (path ? getImageUrl(path) : null));

    const inStock = product.inStock;
    const priceDisplay = product.priceLabel || `${Number(product.price ?? 0).toLocaleString()} ${product.currency || 'MAD'}`;

    return (
        <div className="w-full min-h-screen bg-bg-secondary pt-[64px] pb-20">
            {/* Breadcrumb */}
            <div className="py-4 px-5 max-w-7xl mx-auto border-b border-black/5">
                <span className="font-body text-[11px] text-text-sec">
                    <Link to="/" className="hover:text-dark transition-colors">{t('nav.accueil')}</Link> /{' '}
                    <Link to="/catalogue" className="hover:text-dark transition-colors">{t('nav.catalogue')}</Link> /{' '}
                    {product.name}
                </span>
            </div>

            <div className="flex flex-col xl:flex-row max-w-7xl mx-auto xl:px-5">

                {/* Gallery */}
                <div className="w-full xl:w-1/2 flex flex-col">
                    <div className="w-full aspect-square bg-bg-secondary" data-reveal>
                        {images[activeImage] ? (
                            <img src={images[activeImage]} alt={product.name} className="w-full h-full object-cover animate-fade-in" loading="lazy" decoding="async" width={1080} height={1080} />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-display text-4xl text-text-sec/30">{t('brand.nova')}</div>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar h-[72px] px-5 py-3 xl:px-0">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`flex-shrink-0 w-[56px] h-[56px] bg-bg-secondary ${activeImage === idx ? 'border-2 border-gold' : 'border border-transparent'}`}
                                >
                                    {img && <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" decoding="async" width={100} height={100} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="w-full xl:w-1/2 flex flex-col px-5 py-6 xl:p-12 xl:pt-8" data-reveal>
                    {product.material && (
                        <span className="inline-block font-body text-[9px] tracking-widest text-gold uppercase border border-gold px-3 py-1 w-fit mb-4">
                            {product.material}
                        </span>
                    )}
                    <h1 className="font-display text-[28px] text-dark leading-tight mb-3">{product.name}</h1>
                    <p className="font-display text-[24px] text-gold mb-2">
                        {priceDisplay}
                    </p>

                    <div className="font-body text-[11px] mb-4 flex items-center">
                        {inStock ? (
                            <><span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5" /> {t('productDetail.inStock')}</>
                        ) : (
                            <><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1.5" /> {t('productDetail.outOfStock')}</>
                        )}
                    </div>

                    <div className="w-full h-[1px] bg-gold/20 mb-6"></div>

                    <p className="font-body text-[14px] text-text-sec leading-[1.8] mb-8">
                        {product.description || 'Une création unique alliant design intemporel et matières nobles.'}
                    </p>

                    {/* Specs */}
                    {product.specs && Object.keys(product.specs).some(k => product.specs[k]) && (
                        <div className="flex flex-col mb-8">
                            {Object.entries(product.specs).map(([key, val]) => {
                                if (!val) return null;
                                const labels = { 
                                    dimensions: t('productDetail.specs.dimensions'), 
                                    weight: t('productDetail.specs.weight'), 
                                    finish: t('productDetail.specs.finish'), 
                                    origin: t('productDetail.specs.origin'), 
                                    leadTime: t('productDetail.specs.leadTime') 
                                };
                                return (
                                    <div key={key} className="flex justify-between items-center py-3 border-b border-dark/[0.08] font-body text-[13px]">
                                        <span className="text-text-sec">{labels[key] || key}</span>
                                        <span className="text-dark">{typeof val === 'string' ? val : String(val)}</span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Adds */}
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex items-center w-[120px] h-11 border border-dark/20 font-body text-[14px]">
                            <button
                                onClick={() => setQty(Math.max(1, qty - 1))}
                                className="w-10 h-full flex items-center justify-center text-text-sec hover:text-dark transition-colors"
                            >-</button>
                            <div className="flex-1 h-full flex items-center justify-center text-dark border-x border-dark/20">{qty}</div>
                            <button
                                onClick={() => setQty(qty + 1)}
                                className="w-10 h-full flex items-center justify-center text-text-sec hover:text-dark transition-colors"
                                disabled={!inStock}
                            >+</button>
                        </div>

                        <button
                            onClick={handleAddCart}
                            disabled={!inStock}
                            className="w-full h-[52px] bg-dark text-bg-primary font-body text-[11px] font-medium tracking-wider uppercase transition-colors hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {t('buttons.ajouterPanier')}
                        </button>

                        <a
                            href={`https://wa.me/212649668465?text=${encodeURIComponent(`Bonjour, je souhaite commander : ${product.name} (${product.slug})`)}`}
                            target="_blank" rel="noreferrer"
                            className="w-full h-[52px] border border-gold text-gold font-body text-[11px] font-medium tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-gold/5 transition-colors"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            {t('buttons.commanderWhatsapp')}
                        </a>
                    </div>

                    <p className="font-body text-[12px] text-text-sec mt-4 flex items-center justify-center xl:justify-start">
                        <Truck size={14} className="text-text-sec mr-2 shrink-0" /> {t('productDetail.delivery')}
                    </p>
                </div>
            </div>
        </div>
    );
}
