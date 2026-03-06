import { useState } from 'react';
import { submitDevis } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';

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
        <div className="w-full bg-bg-primary pt-[64px]">
            {/* Hero (Pierre d'Exception) */}
            <section className="bg-obsidian min-h-[50vh] flex flex-col items-center justify-center p-6 xl:p-20 text-center">
                <span className="font-body text-[10px] text-gold tracking-widest uppercase mb-4" data-reveal>
                    {t('surMesure.tag')}
                </span>
                <h1 className="font-serif text-[40px] text-cream leading-tight mb-2" data-reveal>
                    {t('surMesure.hero.title1')}
                </h1>
                <h2 className="font-serif italic text-[40px] text-gold leading-tight mb-6" data-reveal>
                    {t('surMesure.hero.title2')}
                </h2>
                <p className="font-sans text-[14px] text-cream/60 max-w-xl mx-auto" data-reveal>
                    {t('surMesure.hero.desc')}
                </p>
            </section>

            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-start xl:py-20 py-[60px]">
                {/* Steps */}
                <div className="w-full xl:w-5/12 px-5 mb-12 xl:mb-0 xl:pr-16" data-reveal>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col border-b border-gold/20 pb-8">
                            <span className="font-display text-[64px] text-gold/30 leading-none mb-2">01</span>
                            <h3 className="font-display text-[20px] text-dark mb-2">{t('surMesure.steps.step1.title')}</h3>
                            <p className="font-body text-[13px] text-text-sec leading-relaxed">{t('surMesure.steps.step1.desc')}</p>
                        </div>
                        <div className="flex flex-col border-b border-gold/20 pb-8">
                            <span className="font-display text-[64px] text-gold/30 leading-none mb-2">02</span>
                            <h3 className="font-display text-[20px] text-dark mb-2">{t('surMesure.steps.step2.title')}</h3>
                            <p className="font-body text-[13px] text-text-sec leading-relaxed">{t('surMesure.steps.step2.desc')}</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display text-[64px] text-gold/30 leading-none mb-2">03</span>
                            <h3 className="font-display text-[20px] text-dark mb-2">{t('surMesure.steps.step3.title')}</h3>
                            <p className="font-body text-[13px] text-text-sec leading-relaxed">{t('surMesure.steps.step3.desc')}</p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="w-full xl:w-7/12 px-5" data-reveal>
                    <div className="bg-bg-secondary p-6 xl:p-10 border border-gold/20 shadow-sm">
                        <h2 className="font-display text-[24px] text-dark mb-2">{t('surMesure.form.title')}</h2>
                        <div className="w-8 h-[1px] bg-gold mb-8"></div>

                        {status === 'success' ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-2xl">✓</div>
                                <h3 className="font-display text-[20px] text-dark mb-2">{t('surMesure.form.success.title')}</h3>
                                <p className="font-body text-[14px] text-text-sec">{t('surMesure.form.success.message')}</p>
                                <button onClick={() => setStatus('idle')} className="mt-8 font-body text-[11px] uppercase tracking-wider text-gold border-b border-gold pb-1">
                                    {t('buttons.nouvelleFormule')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('surMesure.form.type')}</label>
                                        <select name="type" value={formData.type} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none">
                                            <option value="">{t('form.selectDefault')}</option>
                                            <option value="Table de repas">{t('surMesure.form.pieceTypes.table')}</option>
                                            <option value="Table basse">{t('surMesure.form.pieceTypes.tableBasse')}</option>
                                            <option value="Console">{t('surMesure.form.pieceTypes.console')}</option>
                                            <option value="Vasque">{t('surMesure.form.pieceTypes.vasque')}</option>
                                            <option value="Autre">{t('surMesure.form.pieceTypes.autre')}</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('surMesure.form.material')}</label>
                                        <select name="material" value={formData.material} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none">
                                            <option value="">{t('form.selectDefault')}</option>
                                            <option value="Marbre Blanc">{t('surMesure.form.materials.marbleWhite')}</option>
                                            <option value="Marbre Noir">{t('surMesure.form.materials.marbleBlack')}</option>
                                            <option value="Travertin Beige">{t('surMesure.form.materials.travertine')}</option>
                                            <option value="Granit">{t('surMesure.form.materials.granite')}</option>
                                            <option value="Non décidé">{t('surMesure.form.materials.notYetDecided')}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('surMesure.form.dimensions')}</label>
                                        <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder={t('surMesure.form.dimensionsPlaceholder')} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('surMesure.form.budget')}</label>
                                        <select name="budget" value={formData.budget} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none">
                                            <option value="">{t('form.selectDefault')}</option>
                                            <option value="- 5 000 MAD">{t('surMesure.form.budgets.under5k')}</option>
                                            <option value="5 000 - 10 000 MAD">{t('surMesure.form.budgets.fiveTo10k')}</option>
                                            <option value="10 000 - 20 000 MAD">{t('surMesure.form.budgets.tenTo20k')}</option>
                                            <option value="+ 20 000 MAD">{t('surMesure.form.budgets.over20k')}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('surMesure.form.description')}</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} required placeholder={t('surMesure.form.descriptionPlaceholder')} className="h-[120px] bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark p-3 resize-none rounded-none"></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.nomComplet')}</label>
                                        <input type="text" name="name" value={formData.customer.name} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.telephone')}</label>
                                        <input type="tel" name="phone" value={formData.customer.phone} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.emailOptional')}</label>
                                    <input type="email" name="email" value={formData.customer.email} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                </div>

                                {status === 'error' && <p className="font-body text-[11px] text-red-600 mb-2">{t('surMesure.form.error')}</p>}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-luxury btn-luxury-primary w-full h-[52px] font-body text-[11px] font-semibold tracking-wider uppercase disabled:opacity-70 mt-2"
                                >
                                    {status === 'loading' ? t('surMesure.form.submitting') : t('surMesure.form.submit')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
