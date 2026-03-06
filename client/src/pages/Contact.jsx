import { useState } from 'react';
import { submitContact } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../hooks/useTranslation';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

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
        <div className="w-full bg-bg-primary pt-[64px] min-h-screen">
            <div className="pt-20 px-5 max-w-7xl mx-auto pb-16" data-reveal>
                <span className="font-body text-[10px] text-gold uppercase tracking-wider block mb-2">{t('contact.tag')}</span>
                <h1 className="font-display text-[36px] text-dark leading-none">{t('contact.title')}</h1>
                <div className="w-10 h-[1px] bg-gold my-4"></div>
            </div>

            <div className="max-w-7xl mx-auto px-5 flex flex-col xl:flex-row gap-10 xl:gap-20">

                {/* Contact info cards */}
                <div className="w-full xl:w-5/12" data-reveal>
                    <div className="flex flex-col gap-4">

                        <a href="https://wa.me/212649668465" target="_blank" rel="noreferrer" className="group bg-bg-secondary p-6 border-l-[3px] border-gold hover:bg-bg-primary transition-all duration-200 hover:shadow-md">
                            <Phone size={24} className="text-gold mb-3" strokeWidth={1.5} />
                            <h3 className="font-display text-[18px] text-dark mb-1">{t('contact.whatsapp.title')}</h3>
                            <p className="font-body text-[12px] text-text-sec mb-4">{t('contact.whatsapp.number')}</p>
                            <span className="font-body text-[11px] text-gold tracking-wider uppercase group-hover:underline underline-offset-4">{t('buttons.envoyer')} &rarr;</span>
                        </a>

                        <a href="https://instagram.com/novadesign.maa" target="_blank" rel="noreferrer" className="group bg-bg-secondary p-6 border-l-[3px] border-gold hover:bg-bg-primary transition-all duration-200 hover:shadow-md">
                            <Instagram size={24} className="text-gold mb-3" strokeWidth={1.5} />
                            <h3 className="font-display text-[18px] text-dark mb-1">{t('contact.instagram.title')}</h3>
                            <p className="font-body text-[12px] text-text-sec mb-4">{t('contact.instagram.handle')}</p>
                            <span className="font-body text-[11px] text-gold tracking-wider uppercase group-hover:underline underline-offset-4">{t('buttons.envoyer')} &rarr;</span>
                        </a>

                        <div className="bg-bg-secondary p-6 border-l-[3px] border-gold">
                            <MapPin size={24} className="text-gold mb-3" strokeWidth={1.5} />
                            <h3 className="font-display text-[18px] text-dark mb-1">{t('contact.atelier.title')}</h3>
                            <p className="font-body text-[12px] text-text-sec mb-4">{t('contact.atelier.location')}</p>
                        </div>

                    </div>
                </div>

                {/* Contact Form */}
                <div className="w-full xl:w-7/12" data-reveal>
                    <div className="bg-bg-secondary p-6 xl:p-10 border border-gold/20 relative shadow-sm">
                        {status === 'success' ? (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-2xl">✓</div>
                                <h3 className="font-display text-[20px] text-dark mb-2">{t('contact.form.success.title')}</h3>
                                <p className="font-body text-[14px] text-text-sec">{t('contact.form.success.message')}</p>
                                <button onClick={() => setStatus('idle')} className="mt-8 font-body text-[11px] uppercase tracking-wider text-gold border-b border-gold pb-1">{t('buttons.nouveauMessage')}</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.nomComplet')}</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.telephone')}</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.emailOptional')}</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.sujet')}</label>
                                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">{t('form.message')}</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required placeholder={t('form.messagePlaceholder')} className="h-[120px] bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark p-3 resize-none rounded-none"></textarea>
                                </div>

                                {status === 'error' && <p className="font-body text-[11px] text-red-600 mb-2">{t('contact.form.error')}</p>}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="btn-luxury btn-luxury-primary w-full h-[52px] font-body text-[11px] font-semibold tracking-wider uppercase disabled:opacity-70 mt-2"
                                >
                                    {status === 'loading' ? 'ENVOI...' : t('buttons.envoyerMessage')}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* OpenStreetMap */}
            <div className="w-full mt-20 px-5 max-w-7xl mx-auto" data-reveal>
                <div className="rounded-lg overflow-hidden border border-dark/10 shadow-sm leading-none flex">
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-7.6898,33.5731,-7.5498,33.6131&amp;layer=mapnik"
                        width="100%"
                        height="400"
                        style={{ border: 'none', borderRadius: '8px' }}
                        loading="lazy"
                        title="Nova Design"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
