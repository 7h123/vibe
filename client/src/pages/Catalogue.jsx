import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getProducts, getCategories } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Catalogue() {
    useScrollReveal();
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const TYPE_TABS = [
        { label: t('catalogue.tabs.all'), value: '' },
        { label: t('catalogue.tabs.decoration'), value: 'decoration' },
        { label: t('catalogue.tabs.marble'), value: 'marbre' },
    ];

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
        <div className="w-full min-h-screen bg-[var(--bg-primary)] pt-[64px] relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute top-[10%] left-[-5%] text-[20vw] font-display font-bold text-[#F5F2ED] opacity-30 select-none pointer-events-none whitespace-nowrap z-0">
                COLLECTION
            </div>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pt-10 px-5 max-w-7xl mx-auto relative z-10"
            >
                <span className="font-body text-[10px] text-[#C8A96E] uppercase tracking-[0.3em] block mb-2">{t('catalogue.tag')}</span>
                <h1 className="font-display text-[36px] xl:text-[48px] font-medium text-[var(--text-primary)] leading-none mb-1">{t('catalogue.titre')}</h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                    className="h-[1px] bg-[#C8A96E] my-4"
                />
                <span className="font-body text-[12px] text-[var(--text-secondary)]">
                    {products.length} {products.length !== 1 ? t('catalogue.itemsCount').split('{')[1]?.match(/\w+/)?.[0] : 'pièce'} {t('catalogue.itemsCount').includes('disponible') ? t('catalogue.itemsCount').match(/disponible\w*/)?.[0] : 'disponible'}{products.length !== 1 ? 's' : ''}
                </span>
            </motion.div>

            {/* Type Toggle Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="px-5 mt-8 max-w-7xl mx-auto relative z-10"
            >
                <div className="flex gap-0 border border-[#1a1a0e]/15 w-fit relative bg-[#FBF9F6]">
                    {TYPE_TABS.map(tab => {
                        const isActive = activeType === tab.value;
                        return (
                            <button
                                key={tab.value}
                                onClick={() => handleTypeChange(tab.value)}
                                className={`relative h-10 px-6 font-body text-[10px] tracking-wider uppercase transition-colors z-10 ${isActive ? 'text-white' : 'text-[#1a1a0e] hover:bg-[#1a1a0e]/5'}`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#1a1a0e] z-[-1]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Category Filter Bar */}
            <div className="sticky top-[64px] z-40 bg-[rgba(240,235,225,0.85)] backdrop-blur-[12px] mt-6 border-b border-[#C8A96E]/20">
                <div className="flex gap-2 max-w-7xl mx-auto w-full min-w-max px-5 py-3 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => handleCategoryFilter('')}
                        className={`h-8 px-4 flex items-center justify-center font-body text-[10px] tracking-wider uppercase transition-all duration-300 ${!activeCategory
                            ? 'bg-[#C8A96E] text-white border-transparent'
                            : 'bg-transparent text-[#1a1a0e] border border-[#1a1a0e]/20 hover:border-[#1a1a0e]'
                            }`}
                    >
                        {t('catalogue.filters.all')}
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat._id}
                            onClick={() => handleCategoryFilter(cat.slug)}
                            className={`h-8 px-4 flex items-center justify-center font-body text-[10px] tracking-wider uppercase transition-all duration-300 ${activeCategory === cat.slug
                                ? 'bg-[#C8A96E] text-white border-transparent'
                                : 'bg-transparent text-[#1a1a0e] border border-[#1a1a0e]/20 hover:border-[#1a1a0e]'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="px-5 py-8 max-w-7xl mx-auto min-h-[50vh] relative z-10">
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
                        <AnimatePresence>
                            {products.length === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="col-span-full text-center py-20 text-[var(--text-secondary)] font-body text-[14px]"
                                >
                                    {t('catalogue.noProducts')}
                                </motion.div>
                            )}
                            {products.map(product => (
                                <motion.div
                                    key={product._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, type: "spring", stiffness: 200, damping: 25 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
