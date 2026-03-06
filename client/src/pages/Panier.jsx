import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { submitOrder } from '../services/api';
import { getImageUrl } from '../utils/imageUrl';

export default function Panier() {
    const { cartItems, removeFromCart, updateQty, cartTotal, clearCart } = useContext(CartContext);
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
            <div className="w-full min-h-screen bg-bg-primary pt-[120px] pb-[60px] px-5 text-center">
                <motion.div
                    className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                >✓</motion.div>
                <h1 className="font-display text-[32px] text-dark mb-4">Commande Reçue</h1>
                <p className="font-body text-[14px] text-text-sec mb-8">Nous vous contacterons très prochainement pour finaliser la livraison.</p>
                <Link to="/catalogue" className="border-b border-gold font-body text-[11px] tracking-wider uppercase text-gold pb-1">Retour au catalogue</Link>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-bg-primary pt-[80px] pb-[60px] px-5">
            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-10 xl:gap-20">

                {/* Cart Items List */}
                <div className="w-full xl:w-7/12">
                    <h1 className="font-display text-[32px] text-dark mb-2">Votre Panier</h1>
                    <div className="w-12 h-[1px] bg-gold mb-8"></div>

                    {cartItems.length === 0 ? (
                        <div className="py-10 text-center xl:text-left">
                            <motion.div
                                className="text-gold text-5xl mb-4"
                                animate={{ y: [-8, 0, -8] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                🛒
                            </motion.div>
                            <p className="font-body text-[14px] text-text-sec mb-6">Votre panier est vide.</p>
                            <Link to="/catalogue" className="bg-dark text-bg-primary font-body text-[11px] font-medium tracking-wider uppercase h-11 px-8 inline-flex items-center hover:bg-gold hover:text-obsidian transition-all duration-250 cursor-pointer select-none active:scale-[0.97]">
                                Découvrir nos créations
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <AnimatePresence>
                            {cartItems.map(item => (
                                <motion.div
                                    key={item.product}
                                    className="flex gap-4 py-5 border-b border-dark/10"
                                    initial={{ opacity: 0, y: -16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20, height: 0, transition: { duration: 0.3 } }}
                                    layout
                                >
                                    <div className="w-[80px] h-[80px] bg-bg-secondary shrink-0">
                                        {item.image && <img src={getImageUrl(item.image) || item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" decoding="async" width={80} height={80} />}
                                    </div>

                                    <div className="flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-display text-[16px] text-dark">{item.name}</h3>
                                            <button onClick={() => removeFromCart(item.product)} className="font-body text-[12px] text-text-sec hover:text-dark">✕</button>
                                        </div>

                                        <span className="font-body text-[10px] text-gold tracking-wider uppercase mb-2">
                                            {item.material}
                                        </span>

                                        {item.dimensions && (
                                            <span className="font-body text-[12px] text-text-sec mb-1">
                                                Dim: {item.dimensions}
                                            </span>
                                        )}

                                        <div className="flex justify-between items-end mt-auto">
                                            <div className="flex items-center h-8 border border-dark/20 text-[12px] font-body">
                                                <button onClick={() => updateQty(item.product, item.qty - 1)} className="w-8 flex justify-center text-text-sec hover:text-gold hover:border-gold active:scale-90 transition-all duration-150 cursor-pointer">-</button>
                                                <span className="w-8 flex justify-center border-x border-dark/20 text-dark">{item.qty}</span>
                                                <button onClick={() => updateQty(item.product, item.qty + 1)} className="w-8 flex justify-center text-text-sec hover:text-gold hover:border-gold active:scale-90 transition-all duration-150 cursor-pointer">+</button>
                                            </div>
                                            <span className="font-body text-[16px] font-semibold text-gold">
                                                {(item.price * item.qty).toLocaleString()} MAD
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* Order Form */}
                {cartItems.length > 0 && (
                    <div className="w-full xl:w-5/12 mt-10 xl:mt-0 relative">
                        <div className="bg-bg-secondary p-6 border border-gold/15 sticky top-[100px]">
                            <h2 className="font-display text-[20px] text-dark mb-6">Informations de Livraison</h2>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-1">Nom complet</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="h-11 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] px-3 rounded-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-1">Téléphone</label>
                                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="h-11 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] px-3 rounded-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-1">Ville</label>
                                    <input type="text" name="city" value={formData.city} onChange={handleChange} required className="h-11 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] px-3 rounded-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-1">Adresse</label>
                                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="h-11 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] px-3 rounded-none" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-1">Message optionnel</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} className="h-[80px] bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] p-3 resize-none rounded-none"></textarea>
                                </div>

                                <div className="border-t border-dark/10 pt-4 mt-2 flex flex-col gap-1">
                                    <span className="font-body text-[13px] text-text-sec">Sous-total estimé</span>
                                    <span className="font-display text-[20px] text-gold">{cartTotal.toLocaleString()} MAD</span>
                                    <span className="font-body text-[11px] text-text-sec">*Hors frais de livraison à calculer.</span>
                                </div>

                                {status === 'error' && <p className="font-body text-[11px] text-red-600">Erreur lors de l'envoi. Veuillez réessayer.</p>}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full h-[52px] bg-gold text-dark font-body text-[11px] font-semibold tracking-wider uppercase disabled:opacity-70 mt-4 hover:bg-[#B8975E] transition-all duration-250 cursor-pointer select-none active:scale-[0.98]"
                                >
                                    {status === 'loading' ? 'EN COURS...' : 'ENVOYER LA DEMANDE DE DEVIS'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
