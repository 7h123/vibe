import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { useTranslation } from '../hooks/useTranslation';
import { getImageUrl } from '../utils/imageUrl';
import MagneticButton from '../components/MagneticButton';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
    exit: { opacity: 0, x: -50, scale: 0.9, transition: { duration: 0.3 } }
};

export default function Panier() {
    const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useContext(CartContext);
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '', address: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const orderData = { items: cartItems, customer: formData, total: cartTotal };
        try {
            await submitOrder(orderData);
            setStatus('success');
            clearCart();
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full min-h-screen bg-[var(--bg-primary)] pt-[120px] pb-[60px] px-5 text-center flex flex-col items-center justify-center relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('/stone-texture.webp')] opacity-5 mix-blend-multiply pointer-events-none z-0"></div>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 bg-[#C8A96E]/10 rounded-full flex items-center justify-center mb-8 text-[#C8A96E] text-4xl shadow-[0_0_40px_rgba(200,169,110,0.2)] relative z-10"
                >
                    ✓
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-display text-[40px] text-[#1a1a0e] mb-4 relative z-10"
                >
                    {t('panier.commandeRecue')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="font-body text-[15px] text-[#555] mb-10 max-w-md relative z-10"
                >
                    {t('panier.merciCommande')}
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="relative z-10">
                    <Link to="/catalogue" className="border-b border-[#C8A96E] hover:border-[#1a1a0e] font-body text-[11px] tracking-[0.2em] uppercase text-[#C8A96E] hover:text-[#1a1a0e] pb-1 transition-colors">
                        {t('panier.retourCatalogue')}
                    </Link>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[#FBF9F6] pt-[80px] pb-[60px] px-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/stone-texture.webp')] opacity-[0.03] mix-blend-multiply pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 xl:gap-20 relative z-10">

                {/* Cart Items List */}
                <div className="w-full xl:w-7/12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="font-display text-[40px] text-[#1a1a0e] mb-2">{t('panier.titre')}</h1>
                        <div className="w-12 h-[1px] bg-[#C8A96E] mb-10"></div>
                    </motion.div>

                    {cartItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-20 text-center xl:text-left flex flex-col items-center xl:items-start"
                        >
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                className="w-20 h-20 bg-white shadow-sm border border-[#1a1a0e]/5 rounded-full flex items-center justify-center mb-8"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1" className="opacity-50">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                            </motion.div>
                            <p className="font-body text-[16px] text-[#555] mb-8">{t('panier.panierVide')}</p>
                            <MagneticButton>
                                <Link to="/catalogue" className="bg-[#1a1a0e] text-[#f5f0e8] hover:bg-black font-body text-[11px] font-medium tracking-[0.2em] uppercase h-14 px-10 inline-flex items-center transition-colors">
                                    {t('panier.decouvrirCreations')}
                                    <span className="ml-3 font-serif italic text-[#C8A96E] normal-case text-sm">&rarr;</span>
                                </Link>
                            </MagneticButton>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-col"
                        >
                            <AnimatePresence mode="popLayout">
                                {cartItems.map(item => (
                                    <motion.div
                                        layout
                                        key={item.product}
                                        variants={itemVariants}
                                        className="flex gap-6 py-6 border-b border-[#1a1a0e]/10 group hover:bg-[#1a1a0e]/[0.01] transition-colors"
                                    >
                                        <div className="w-[100px] h-[100px] bg-[#F5F2ED] shrink-0 border border-[#1a1a0e]/5 relative overflow-hidden">
                                            {item.image && <img src={getImageUrl(item.image) || item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" width={100} height={100} />}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors" />
                                        </div>

                                        <div className="flex flex-col flex-1 py-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-display text-[20px] text-[#1a1a0e] group-hover:text-[#C8A96E] transition-colors">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item.product)} className="font-body text-[12px] text-[#555] hover:text-red-500 transition-colors p-2 -mr-2 bg-transparent hover:bg-red-50 rounded-full">✕</button>
                                            </div>

                                            <span className="font-body text-[10px] text-[#C8A96E] tracking-widest uppercase mb-3">
                                                {item.material}
                                            </span>

                                            {item.dimensions && (
                                                <span className="font-body text-[12px] text-[#555] mb-2 opacity-80">
                                                    {t('productDetail.dimensions')}: {item.dimensions}
                                                </span>
                                            )}

                                            <div className="flex justify-between items-end mt-auto">
                                                <div className="flex items-center h-9 border border-[#1a1a0e]/20 text-[13px] font-body bg-white">
                                                    <button onClick={() => updateQty(item.product, item.qty - 1)} className="w-9 h-full flex items-center justify-center text-[#555] hover:bg-[#1a1a0e]/5 transition-colors">-</button>
                                                    <span className="w-10 h-full flex items-center justify-center border-x border-[#1a1a0e]/20 text-[#1a1a0e]">{item.qty}</span>
                                                    <button onClick={() => updateQty(item.product, item.qty + 1)} className="w-9 h-full flex items-center justify-center text-[#555] hover:bg-[#1a1a0e]/5 transition-colors">+</button>
                                                </div>
                                                <span className="font-body text-[17px] font-medium text-[#1a1a0e]">
                                                    {(item.price * item.qty).toLocaleString()} MAD
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>

                {/* Order Form */}
                <AnimatePresence>
                    {cartItems.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="w-full xl:w-5/12 mt-10 xl:mt-0 relative"
                        >
                            <div className="bg-white p-8 xl:p-10 border border-[#C8A96E]/15 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] sticky top-[100px]">
                                <h2 className="font-display text-[24px] text-[#1a1a0e] mb-8 relative after:absolute after:bottom-[-10px] after:left-0 after:w-8 after:h-[1px] after:bg-[#C8A96E]">{t('panier.confirmation')}</h2>

                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-[0.1em] text-[#555] uppercase mb-1 transition-colors group-focus-within:text-[#C8A96E]">{t('panier.nomClient')}</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/15 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] px-1 rounded-none transition-colors" />
                                        </div>
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-[0.1em] text-[#555] uppercase mb-1 transition-colors group-focus-within:text-[#C8A96E]">{t('panier.telephone')}</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/15 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] px-1 rounded-none transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col group">
                                        <label className="font-body text-[10px] tracking-[0.1em] text-[#555] uppercase mb-1 transition-colors group-focus-within:text-[#C8A96E]">EMAIL <span className="text-gray-400 lowercase italic tracking-normal">(optionnel)</span></label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="h-12 bg-transparent border-b border-[#1a1a0e]/15 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] px-1 rounded-none transition-colors" />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-[0.1em] text-[#555] uppercase mb-1 transition-colors group-focus-within:text-[#C8A96E]">{t('panier.ville')}</label>
                                            <input type="text" name="city" value={formData.city} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/15 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] px-1 rounded-none transition-colors" />
                                        </div>
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-[0.1em] text-[#555] uppercase mb-1 transition-colors group-focus-within:text-[#C8A96E]">{t('panier.adresse')}</label>
                                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="h-12 bg-transparent border-b border-[#1a1a0e]/15 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] px-1 rounded-none transition-colors" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col group mt-2">
                                        <label className="font-body text-[10px] tracking-[0.1em] text-[#555] uppercase mb-2 transition-colors group-focus-within:text-[#C8A96E]">{t('panier.messageSpecial')}</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} className="h-[90px] bg-[#1a1a0e]/[0.02] border border-[#1a1a0e]/10 focus:border-[#C8A96E] focus:bg-white outline-none font-body text-[14px] text-[#1a1a0e] p-3 resize-none rounded-sm transition-colors"></textarea>
                                    </div>

                                    <div className="border-t border-[#1a1a0e]/10 pt-5 mt-4 flex flex-col gap-1">
                                        <span className="font-body text-[12px] text-[#555] tracking-widest uppercase">{t('panier.totalCommande')}</span>
                                        <div className="flex items-end gap-2">
                                            <span className="font-display text-[28px] text-[#C8A96E] leading-none">{cartTotal.toLocaleString()}</span>
                                            <span className="font-display text-[18px] text-[#C8A96E] leading-tight pb-[2px]">MAD</span>
                                        </div>
                                        <span className="font-body text-[11px] text-[#555]/60 italic mt-1">*{t('panier.hors_frais')}</span>
                                    </div>

                                    {status === 'error' && <p className="font-body text-[11px] text-red-600 bg-red-50 p-2 border border-red-100">{t('contact.erreurEnvoi')}</p>}

                                    <MagneticButton>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="shimmer-btn w-full h-[56px] bg-[#C8A96E] hover:bg-[#b0925c] transition-colors text-white font-body text-[11px] font-semibold tracking-[0.2em] uppercase disabled:opacity-70 mt-6 relative overflow-hidden"
                                        >
                                            {status === 'loading' ? t('buttons.charger') : t('panier.passerCommande')}
                                        </button>
                                    </MagneticButton>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
