import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitDevis } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';
import MagneticButton from '../components/MagneticButton';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function SurMesure() {
    useScrollReveal();
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        type: '', material: '', dimensions: '', budget: '', description: '',
        customer: { name: '', phone: '', email: '' }
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await submitDevis(formData);
            setStatus('success');
            setFormData({ type: '', material: '', dimensions: '', budget: '', description: '', customer: { name: '', phone: '', email: '' } });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['name', 'phone', 'email'].includes(name)) {
            setFormData(prev => ({ ...prev, customer: { ...prev.customer, [name]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div className="w-full bg-[#111111] pt-[64px] min-h-screen">
            {/* Hero (Pierre d'Exception) */}
            <section className="bg-obsidian min-h-[40vh] flex flex-col items-center justify-center p-6 xl:p-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/stone-texture.webp')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="font-body text-[10px] text-[#C8A96E] tracking-[0.3em] uppercase mb-4 relative z-10 block"
                >
                    {t('surMesure.tag')}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="font-display text-[40px] xl:text-[56px] text-[#F5F2ED] leading-tight mb-2 relative z-10"
                >
                    {t('surMesure.hero.title1')}
                </motion.h1>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="font-serif italic text-[40px] xl:text-[56px] text-[#C8A96E] leading-tight mb-6 relative z-10"
                >
                    {t('surMesure.hero.title2')}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="font-sans text-[14px] text-[#F5F2ED]/60 max-w-xl mx-auto relative z-10"
                >
                    {t('surMesure.hero.desc')}
                </motion.p>
            </section>

            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-start xl:py-24 py-[60px] bg-[#FBF9F6]">
                {/* Steps */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="w-full xl:w-5/12 px-5 mb-16 xl:mb-0 xl:pr-16"
                >
                    <div className="flex flex-col gap-10">
                        <motion.div variants={itemVariants} className="flex flex-col border-b border-[#C8A96E]/20 pb-8 group">
                            <span className="font-display text-[72px] text-[#C8A96E]/20 leading-none mb-2 transition-colors duration-500 group-hover:text-[#C8A96E]/40">01</span>
                            <h3 className="font-display text-[22px] text-[#1a1a0e] mb-2">{t('surMesure.steps.step1.title')}</h3>
                            <p className="font-body text-[13px] text-[#555] leading-relaxed">{t('surMesure.steps.step1.desc')}</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col border-b border-[#C8A96E]/20 pb-8 group">
                            <span className="font-display text-[72px] text-[#C8A96E]/20 leading-none mb-2 transition-colors duration-500 group-hover:text-[#C8A96E]/40">02</span>
                            <h3 className="font-display text-[22px] text-[#1a1a0e] mb-2">{t('surMesure.steps.step2.title')}</h3>
                            <p className="font-body text-[13px] text-[#555] leading-relaxed">{t('surMesure.steps.step2.desc')}</p>
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex flex-col group">
                            <span className="font-display text-[72px] text-[#C8A96E]/20 leading-none mb-2 transition-colors duration-500 group-hover:text-[#C8A96E]/40">03</span>
                            <h3 className="font-display text-[22px] text-[#1a1a0e] mb-2">{t('surMesure.steps.step3.title')}</h3>
                            <p className="font-body text-[13px] text-[#555] leading-relaxed">{t('surMesure.steps.step3.desc')}</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Form Card */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full xl:w-7/12 px-5"
                >
                    <div className="bg-white p-6 xl:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-[#C8A96E]/10">
                        <h2 className="font-display text-[28px] text-[#1a1a0e] mb-2">{t('surMesure.form.title')}</h2>
                        <div className="w-12 h-[1px] bg-[#C8A96E] mb-10"></div>

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="text-center py-16"
                                >
                                    <div className="w-20 h-20 bg-[#C8A96E]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#C8A96E] text-3xl shadow-[0_0_30px_rgba(200,169,110,0.2)]">✓</div>
                                    <h3 className="font-display text-[24px] text-[#1a1a0e] mb-3">{t('surMesure.form.success.title')}</h3>
                                    <p className="font-body text-[14px] text-[#555]">{t('surMesure.form.success.message')}</p>
                                    <button onClick={() => setStatus('idle')} className="mt-10 font-body text-[11px] uppercase tracking-[0.2em] text-[#C8A96E] hover:text-[#1a1a0e] transition-colors border-b border-[#C8A96E] hover:border-[#1a1a0e] pb-1">
                                        {t('buttons.nouvelleFormule')}
                                    </button>
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
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('surMesure.form.type')}</label>
                                            <select name="type" value={formData.type} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]">
                                                <option value="">{t('form.selectDefault')}</option>
                                                <option value="Table de repas">{t('surMesure.form.pieceTypes.table')}</option>
                                                <option value="Table basse">{t('surMesure.form.pieceTypes.tableBasse')}</option>
                                                <option value="Console">{t('surMesure.form.pieceTypes.console')}</option>
                                                <option value="Vasque">{t('surMesure.form.pieceTypes.vasque')}</option>
                                                <option value="Autre">{t('surMesure.form.pieceTypes.autre')}</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('surMesure.form.material')}</label>
                                            <select name="material" value={formData.material} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]">
                                                <option value="">{t('form.selectDefault')}</option>
                                                <option value="Marbre Blanc">{t('surMesure.form.materials.marbleWhite')}</option>
                                                <option value="Marbre Noir">{t('surMesure.form.materials.marbleBlack')}</option>
                                                <option value="Travertin Beige">{t('surMesure.form.materials.travertine')}</option>
                                                <option value="Granit">{t('surMesure.form.materials.granite')}</option>
                                                <option value="Non décidé">{t('surMesure.form.materials.notYetDecided')}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('surMesure.form.dimensions')}</label>
                                            <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder={t('surMesure.form.dimensionsPlaceholder')} className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                        </div>
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('surMesure.form.budget')}</label>
                                            <select name="budget" value={formData.budget} onChange={handleChange} className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]">
                                                <option value="">{t('form.selectDefault')}</option>
                                                <option value="- 5 000 MAD">{t('surMesure.form.budgets.under5k')}</option>
                                                <option value="5 000 - 10 000 MAD">{t('surMesure.form.budgets.fiveTo10k')}</option>
                                                <option value="10 000 - 20 000 MAD">{t('surMesure.form.budgets.tenTo20k')}</option>
                                                <option value="+ 20 000 MAD">{t('surMesure.form.budgets.over20k')}</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex flex-col group">
                                        <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('surMesure.form.description')}</label>
                                        <textarea name="description" value={formData.description} onChange={handleChange} required placeholder={t('surMesure.form.descriptionPlaceholder')} className="h-[140px] bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] py-3 resize-none rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]"></textarea>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.nomComplet')}</label>
                                            <input type="text" name="name" value={formData.customer.name} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                        </div>
                                        <div className="flex flex-col group">
                                            <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.telephone')}</label>
                                            <input type="tel" name="phone" value={formData.customer.phone} onChange={handleChange} required className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                        </div>
                                    </div>

                                    <div className="flex flex-col mb-4 group">
                                        <label className="font-body text-[10px] tracking-wider text-[#555] uppercase mb-[8px] transition-colors group-focus-within:text-[#C8A96E]">{t('form.emailOptional')}</label>
                                        <input type="email" name="email" value={formData.customer.email} onChange={handleChange} className="h-12 bg-transparent border-b border-[#1a1a0e]/10 focus:border-[#C8A96E] outline-none font-body text-[14px] text-[#1a1a0e] rounded-none transition-colors focus:bg-[#C8A96E]/[0.02]" />
                                    </div>

                                    {status === 'error' && <p className="font-body text-[11px] text-red-600 mb-2">{t('surMesure.form.error')}</p>}

                                    <MagneticButton>
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="shimmer-btn w-full h-[56px] bg-[#C8A96E] hover:bg-[#b0925c] transition-colors text-white font-body text-[12px] font-semibold tracking-[0.2em] uppercase disabled:opacity-70 mt-2 relative overflow-hidden"
                                        >
                                            {status === 'loading' ? t('surMesure.form.submitting') : t('surMesure.form.submit')}
                                        </button>
                                    </MagneticButton>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
