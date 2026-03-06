import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContact } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 } }
};

export default function Contact() {
    useScrollReveal();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await submitContact(formData);
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="w-full bg-[#fbf9f6] pt-[64px] min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/stone-texture.webp')] opacity-[0.03] mix-blend-multiply pointer-events-none z-0"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pt-20 px-5 max-w-7xl mx-auto pb-16 relative z-10"
            >
                <span className="font-body text-[10px] text-[#C8A96E] uppercase tracking-[0.3em] block mb-2">{t('contact.tag')}</span>
                <h1 className="font-display text-[40px] xl:text-[56px] text-[#1a1a0e] leading-none mb-1">{t('contact.title')}</h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 40 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                    className="h-[1px] bg-[#C8A96E] my-4"
                />
            </motion.div>

            <div className="max-w-7xl mx-auto px-5 flex flex-col xl:flex-row gap-10 xl:gap-20 relative z-10">

                {/* Contact info cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full xl:w-5/12"
                >
                    <div className="flex flex-col gap-6">

                        <motion.a variants={itemVariants} href="https://wa.me/212649668465" target="_blank" rel="noreferrer" className="group bg-white p-8 border-l-[3px] border-transparent hover:border-[#C8A96E] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] transition-all duration-500">
                            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-12 h-12 bg-[#C8A96E]/5 rounded-full flex items-center justify-center mb-4">
                                <Phone size={20} className="text-[#C8A96E]" strokeWidth={1.5} />
                            </motion.div>
                            <h3 className="font-display text-[22px] text-[#1a1a0e] mb-1 group-hover:text-[#C8A96E] transition-colors">{t('contact.whatsapp.title')}</h3>
                            <p className="font-body text-[13px] text-[#555] mb-5">{t('contact.whatsapp.number')}</p>
                            <span className="font-body text-[11px] text-[#1a1a0e] tracking-[0.2em] uppercase group-hover:text-[#C8A96E] transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C8A96E] group-hover:after:w-full after:transition-all after:duration-300">
                                {t('buttons.envoyer')} &rarr;
                            </span>
                        </motion.a>

                        <motion.a variants={itemVariants} href="https://instagram.com/novadesign.maa" target="_blank" rel="noreferrer" className="group bg-white p-8 border-l-[3px] border-transparent hover:border-[#C8A96E] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] transition-all duration-500">
                            <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }} className="w-12 h-12 bg-[#C8A96E]/5 rounded-full flex items-center justify-center mb-4">
                                <Instagram size={20} className="text-[#C8A96E]" strokeWidth={1.5} />
                            </motion.div>
                            <h3 className="font-display text-[22px] text-[#1a1a0e] mb-1 group-hover:text-[#C8A96E] transition-colors">{t('contact.instagram.title')}</h3>
                            <p className="font-body text-[13px] text-[#555] mb-5">{t('contact.instagram.handle')}</p>
                            <span className="font-body text-[11px] text-[#1a1a0e] tracking-[0.2em] uppercase group-hover:text-[#C8A96E] transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C8A96E] group-hover:after:w-full after:transition-all after:duration-300">
                                {t('buttons.envoyer')} &rarr;
                            </span>
                        </motion.a>

                        <motion.div variants={itemVariants} className="bg-white p-8 border-l-[3px] border-[#1a1a0e]/10 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] group hover:border-[#1a1a0e]/30 transition-all duration-500">
                            <div className="w-12 h-12 bg-[#1a1a0e]/5 rounded-full flex items-center justify-center mb-4">
                                <MapPin size={20} className="text-[#1a1a0e]" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-display text-[22px] text-[#1a1a0e] mb-1">{t('contact.atelier.title')}</h3>
                            <p className="font-body text-[13px] text-[#555] mb-2">{t('contact.atelier.location')}</p>
                        </motion.div>

                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    variants={formVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full xl:w-7/12"
                >
                    <div className="bg-white p-8 xl:p-12 border border-[#C8A96E]/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="text-center py-24"
                                >
                                    <div className="w-20 h-20 bg-[#C8A96E]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C8A96E] text-3xl shadow-[0_0_30px_rgba(200,169,110,0.2)]">✓</div>
                                    <h3 className="font-display text-[24px] text-[#1a1a0e] mb-3">{t('contact.form.success.title')}</h3>
                                    <p className="font-body text-[14px] text-[#555]">{t('contact.form.success.message')}</p>
                                    <button onClick={() => setStatus('idle')} className="mt-10 font-body text-[11px] uppercase tracking-[0.2em] text-[#C8A96E] hover:text-[#1a1a0e] transition-colors border-b border-[#C8A96E] hover:border-[#1a1a0e] pb-1">{t('buttons.nouveauMessage')}</button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.nomComplet')}</label>
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                        </div>
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.telephone')}</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col group">
                                        <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.emailOptional')}</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                    </div>

                                    <div className="flex flex-col group">
                                        <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.sujet')}</label>
                                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                    </div>

                                    <div className="flex flex-col group">
                                        <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.message')}</label>
                                        <textarea name="message" value={formData.message} onChange={handleChange} required placeholder={t('form.messagePlaceholder')} className="h-[140px] bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] py-3 resize-none rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]"></textarea>
                                    </div>

                                    {status === 'error' && <p className="font-body text-[11px] text-red-600 mb-2">{t('contact.form.error')}</p>}

                                    <MagneticButton>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="shimmer-btn w-full h-[56px] bg-[#1a1a0e] text-[#f5f0e8] font-body text-[11px] font-semibold tracking-[0.2em] uppercase disabled:opacity-70 mt-2 relative overflow-hidden"
                                        >
                                            {status === 'loading' ? 'ENVOI...' : t('buttons.envoyerMessage')}
                                        </button>
                                    </MagneticButton>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* OpenStreetMap */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full mt-24 px-5 max-w-7xl mx-auto mb-2 relative z-10"
            >
                <div className="rounded-none overflow-hidden border border-[#1a1a0e]/10 shadow-sm leading-none flex">
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-7.6898,33.5731,-7.5498,33.6131&amp;layer=mapnik"
                        width="100%"
                        height="400"
                        style={{ border: 'none', filter: 'grayscale(100%) contrast(1.2)' }}
                        loading="lazy"
                        title="Nova Design"
                    ></iframe>
                </div>
            </motion.div>
        </div>
    );
}
