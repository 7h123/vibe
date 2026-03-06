import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { submitContact } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Phone, Mail, MapPin, Instagram } from 'lucide-react';

export default function Contact() {
    useScrollReveal();
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
    const cardsRef = useRef(null);
    const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' });
    const formRef = useRef(null);
    const formInView = useInView(formRef, { once: true, margin: '-80px' });

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
            <div className="pt-20 px-5 max-w-7xl mx-auto pb-16" ref={headerRef}>
                <motion.span
                    className="font-body text-[10px] text-gold uppercase tracking-wider block mb-2"
                    initial={{ opacity: 0, y: 12 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >CONTACT</motion.span>
                <motion.h1
                    className="font-display text-[36px] text-dark leading-none"
                    initial={{ opacity: 0, y: 24 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >Parlons de Votre Projet</motion.h1>
                <motion.div
                    className="h-[1px] bg-gold my-4"
                    initial={{ width: 0 }}
                    animate={headerInView ? { width: 40 } : {}}
                    transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-5 flex flex-col xl:flex-row gap-10 xl:gap-20">

                {/* Contact info cards */}
                <div className="w-full xl:w-5/12" ref={cardsRef}>
                    <div className="flex flex-col gap-4">

                        {[
                            { href: 'https://wa.me/212649668465', icon: Phone, title: 'WhatsApp / Téléphone', desc: '0649668465', cta: 'ENVOYER', isLink: true },
                            { href: 'https://instagram.com/novadesign.maa', icon: Instagram, title: 'Instagram', desc: '@novadesign.maa', cta: 'ENVOYER', isLink: true },
                            { href: null, icon: MapPin, title: 'Atelier', desc: 'Maroc\n(Sur rendez-vous uniquement)', cta: null, isLink: false },
                        ].map((card, i) => {
                            const Icon = card.icon;
                            const content = (
                                <motion.div
                                    key={card.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={cardsInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    {card.isLink ? (
                                        <a href={card.href} target="_blank" rel="noreferrer" className="group bg-bg-secondary p-6 border-l-[3px] border-gold hover:translate-x-1 transition-transform duration-200 block">
                                            <Icon size={24} className="text-gold mb-3" strokeWidth={1.5} />
                                            <h3 className="font-display text-[18px] text-dark mb-1">{card.title}</h3>
                                            <p className="font-body text-[12px] text-text-sec mb-4">{card.desc}</p>
                                            <span className="font-body text-[11px] text-gold tracking-wider uppercase group-hover:tracking-[0.3em] transition-all duration-300">{card.cta} &rarr;</span>
                                        </a>
                                    ) : (
                                        <div className="bg-bg-secondary p-6 border-l-[3px] border-gold">
                                            <Icon size={24} className="text-gold mb-3" strokeWidth={1.5} />
                                            <h3 className="font-display text-[18px] text-dark mb-1">{card.title}</h3>
                                            <p className="font-body text-[12px] text-text-sec mb-4">Maroc<br />(Sur rendez-vous uniquement)</p>
                                        </div>
                                    )}
                                </motion.div>
                            );
                            return content;
                        })}

                    </div>
                </div>

                {/* Contact Form */}
                <motion.div
                    className="w-full xl:w-7/12"
                    ref={formRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <div className="bg-bg-secondary p-6 xl:p-10 border border-gold/15 relative">
                        {status === 'success' ? (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-2xl">✓</div>
                                <h3 className="font-display text-[20px] text-dark mb-2">Message Envoyé</h3>
                                <p className="font-body text-[14px] text-text-sec">Nous vous répondrons dans les plus brefs délais.</p>
                                <button onClick={() => setStatus('idle')} className="mt-8 font-body text-[11px] uppercase tracking-wider text-gold border-b border-gold pb-1">Nouveau message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Nom complet</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Téléphone</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Email (Optionnel)</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Sujet</label>
                                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Message</label>
                                    <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Comment pouvons-nous vous aider ?" className="h-[120px] bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark p-3 resize-none rounded-none"></textarea>
                                </div>

                                {status === 'error' && <p className="font-body text-[11px] text-red-600 mb-2">Erreur lors de l'envoi. Veuillez réessayer.</p>}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full h-[52px] bg-dark text-bg-primary font-body text-[11px] font-semibold tracking-wider uppercase disabled:opacity-70 mt-2 hover:bg-gold hover:text-obsidian transition-all duration-250 cursor-pointer select-none active:scale-[0.97]"
                                >
                                    {status === 'loading' ? 'ENVOI...' : 'ENVOYER LE MESSAGE'}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* OpenStreetMap */}
            <div className="w-full mt-20 px-5 max-w-7xl mx-auto">
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
