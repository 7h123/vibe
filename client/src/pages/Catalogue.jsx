import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { getProducts, getCategories } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TYPE_TABS = [
    { label: 'TOUT', value: '' },
    { label: 'DÉCORATION ARTISANALE', value: 'decoration' },
    { label: 'MARBRE & PIERRE', value: 'marbre' },
];

export default function Catalogue() {
    useScrollReveal();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
    const gridRef = useRef(null);
    const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

    const activeType = searchParams.get('type') || '';
    const activeCategory = searchParams.get('category') || '';

    // Fetch categories (optionally filtered by type)
    useEffect(() => {
        const params = {};
        if (activeType) params.type = activeType;
        getCategories(params)
            .then(res => {
                const data = res.data;
                const list = Array.isArray(data) ? data : (data.categories || data.data || []);
                setCategories(list);
            })
            .catch(err => console.error('Categories fetch error:', err));
    }, [activeType]);

    // Fetch products (filtered by category slug, or all for the selected type's categories)
    useEffect(() => {
        setLoading(true);
        const params = {};
        if (activeCategory) {
            params.category = activeCategory;
        }
        getProducts(params)
            .then(res => {
                const data = res.data;
                let list = Array.isArray(data) ? data : (data.products || data.data || []);

                // If a type is selected but no specific category, filter client-side by category IDs
                if (activeType && !activeCategory && categories.length > 0) {
                    const catIds = categories.map(c => c._id);
                    list = list.filter(p => p.category && catIds.includes(p.category._id));
                }

                setProducts(list);
            })
            .catch(err => console.error('Catalogue fetch error:', err))
            .finally(() => setLoading(false));
    }, [activeCategory, activeType, categories]);

    const handleTypeChange = (typeValue) => {
        const newParams = new URLSearchParams();
        if (typeValue) newParams.set('type', typeValue);
        // Clear category when changing type
        setSearchParams(newParams);
    };

    const handleCategoryFilter = (slug) => {
        const newParams = new URLSearchParams(searchParams);
        if (slug) {
            newParams.set('category', slug);
        } else {
            newParams.delete('category');
        }
        setSearchParams(newParams);
    };

    return (
        <div className="w-full min-h-screen bg-bg-primary pt-[64px]">
            {/* Header */}
            <div className="pt-10 px-5 max-w-7xl mx-auto relative overflow-hidden" ref={headerRef}>
                <span
                    className="absolute top-0 left-1/2 -translate-x-1/2 font-display font-bold pointer-events-none select-none z-0 whitespace-nowrap"
                    style={{ fontSize: 'clamp(80px, 12vw, 180px)', color: 'rgba(12,10,9,0.04)' }}
                >
                    CATALOGUE
                </span>
                <div className="relative z-10">
                    <motion.span
                        className="font-body text-[10px] text-gold uppercase tracking-wider block mb-2"
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >COLLECTION</motion.span>
                    <motion.h1
                        className="font-display text-[36px] font-[500] text-dark leading-none"
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >Notre Catalogue</motion.h1>
                    <motion.div
                        className="h-[1px] bg-gold my-4"
                        initial={{ width: 0 }}
                        animate={headerInView ? { width: 40 } : {}}
                        transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                    />
                    <span className="font-body text-[12px] text-text-sec">
                        {products.length} pièce{products.length !== 1 ? 's' : ''} disponible{products.length !== 1 ? 's' : ''}
                    </span>
                </div>
            </div>

            {/* Type Toggle Bar */}
            <div className="px-5 mt-6 max-w-7xl mx-auto">
                <div className="flex gap-0 border border-dark/15 w-fit">
                    {TYPE_TABS.map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => handleTypeChange(tab.value)}
                            className={`h-10 px-5 font-body text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer select-none active:scale-95 ${activeType === tab.value
                                    ? 'bg-dark text-bg-primary'
                                    : 'bg-transparent text-dark hover:border-gold hover:text-gold'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Category Filter Bar */}
            <div className="sticky top-[64px] z-40 bg-bg-primary/95 backdrop-blur-[8px] h-[52px] px-5 border-b border-gold/15 mt-4 flex items-center overflow-x-auto no-scrollbar">
                <div className="flex gap-2 max-w-7xl mx-auto w-full min-w-max pb-1">
                    <button
                        onClick={() => handleCategoryFilter('')}
                        className={`h-8 px-4 flex items-center justify-center font-body text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer select-none active:scale-95 ${!activeCategory
                                ? 'bg-dark text-bg-primary'
                                : 'bg-transparent text-dark border border-dark/20 hover:border-gold hover:text-gold'
                            }`}
                    >
                        Toutes
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat._id}
                            onClick={() => handleCategoryFilter(cat.slug)}
                            className={`h-8 px-4 flex items-center justify-center font-body text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer select-none active:scale-95 ${activeCategory === cat.slug
                                    ? 'bg-dark text-bg-primary'
                                    : 'bg-transparent text-dark border border-dark/20 hover:border-gold hover:text-gold'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="px-5 py-6 max-w-7xl mx-auto min-h-[50vh]" ref={gridRef}>
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory + activeType}
                            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6"
                            initial="hidden"
                            animate={gridInView ? 'visible' : 'hidden'}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
                        >
                            {products.length === 0 && (
                                <div className="col-span-full text-center py-20 text-text-sec font-body text-[14px]">
                                    Aucun produit dans cette catégorie.
                                </div>
                            )}
                            {products.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.95, y: 16 },
                                        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, delay: index * 0.05 } }
                                    }}
                                    layout
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}
