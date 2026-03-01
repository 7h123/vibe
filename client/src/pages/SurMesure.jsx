import { useState } from 'react';
import { submitDevis } from '../services/api';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function SurMesure() {
    useScrollReveal();
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
                    SUR MESURE
                </span>
                <h1 className="font-serif text-[40px] text-cream leading-tight mb-2" data-reveal>
                    Votre Vision,
                </h1>
                <h2 className="font-serif italic text-[40px] text-gold leading-tight mb-6" data-reveal>
                    Notre Savoir-Faire
                </h2>
                <p className="font-sans text-[14px] text-cream/60 max-w-xl mx-auto" data-reveal>
                    Confiez-nous la réalisation de votre projet unique. De la sélection de la pierre à la finition,
                    nos artisans donnent vie à vos idées.
                </p>
            </section>

            <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-start xl:py-20 py-[60px]">
                {/* Steps */}
                <div className="w-full xl:w-5/12 px-5 mb-12 xl:mb-0 xl:pr-16" data-reveal>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col border-b border-gold/20 pb-8">
                            <span className="font-display text-[64px] text-gold/20 leading-none mb-2">01</span>
                            <h3 className="font-display text-[20px] text-dark mb-2">Partagez votre projet</h3>
                            <p className="font-body text-[13px] text-text-sec">Remplissez le formulaire avec vos dimensions, choix de matériaux et inspirations.</p>
                        </div>
                        <div className="flex flex-col border-b border-gold/20 pb-8">
                            <span className="font-display text-[64px] text-gold/20 leading-none mb-2">02</span>
                            <h3 className="font-display text-[20px] text-dark mb-2">Devis en 24h</h3>
                            <p className="font-body text-[13px] text-text-sec">Notre équipe étudie votre demande et vous propose un devis détaillé et des conseils techniques.</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display text-[64px] text-gold/20 leading-none mb-2">03</span>
                            <h3 className="font-display text-[20px] text-dark mb-2">Fabrication & Livraison</h3>
                            <p className="font-body text-[13px] text-text-sec">Validation des plans, façonnage dans notre atelier à Casablanca, et livraison sécurisée chez vous.</p>
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="w-full xl:w-7/12 px-5" data-reveal>
                    <div className="bg-bg-secondary p-6 xl:p-10 border border-gold/15">
                        <h2 className="font-display text-[24px] text-dark mb-2">Demander un Devis</h2>
                        <div className="w-8 h-[1px] bg-gold mb-8"></div>

                        {status === 'success' ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 text-gold text-2xl">✓</div>
                                <h3 className="font-display text-[20px] text-dark mb-2">Demande Envoyée</h3>
                                <p className="font-body text-[14px] text-text-sec">Nous vous contacterons dans les plus brefs délais.</p>
                                <button onClick={() => setStatus('idle')} className="mt-8 font-body text-[11px] uppercase tracking-wider text-gold border-b border-gold pb-1">
                                    Nouvelle demande
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Type de pièce</label>
                                        <select name="type" value={formData.type} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none">
                                            <option value="">Sélectionner...</option>
                                            <option value="Table de repas">Table de repas</option>
                                            <option value="Table basse">Table basse</option>
                                            <option value="Console">Console</option>
                                            <option value="Vasque">Vasque / Lavabo</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Matériau souhaité</label>
                                        <select name="material" value={formData.material} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none">
                                            <option value="">Sélectionner...</option>
                                            <option value="Marbre Blanc">Marbre Blanc (ex: Carrare)</option>
                                            <option value="Marbre Noir">Marbre Noir</option>
                                            <option value="Travertin Beige">Travertin Beige</option>
                                            <option value="Granit">Granit</option>
                                            <option value="Non décidé">Je ne sais pas encore</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Dimensions (approx.)</label>
                                        <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="ex: 200x100x75 cm" className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Budget (MAD)</label>
                                        <select name="budget" value={formData.budget} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none">
                                            <option value="">Sélectionner...</option>
                                            <option value="- 5 000 MAD">Moins de 5 000 MAD</option>
                                            <option value="5 000 - 10 000 MAD">5 000 - 10 000 MAD</option>
                                            <option value="10 000 - 20 000 MAD">10 000 - 20 000 MAD</option>
                                            <option value="+ 20 000 MAD">Plus de 20 000 MAD</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Description du projet</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} required placeholder="Décrivez votre projet, style de pieds, finitions souhaitées..." className="h-[120px] bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark p-3 resize-none rounded-none"></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Nom complet</label>
                                        <input type="text" name="name" value={formData.customer.name} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Téléphone</label>
                                        <input type="tel" name="phone" value={formData.customer.phone} onChange={handleChange} required className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                    </div>
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label className="font-body text-[10px] tracking-wider text-text-sec uppercase mb-[6px]">Email (Optionnel)</label>
                                    <input type="email" name="email" value={formData.customer.email} onChange={handleChange} className="h-12 bg-bg-primary border-b border-dark/20 focus:border-gold outline-none font-body text-[14px] text-dark px-3 rounded-none" />
                                </div>

                                {status === 'error' && <p className="font-body text-[11px] text-red-600 mb-2">Une erreur est survenue, veuillez réessayer.</p>}

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full h-[52px] bg-gold text-dark font-body text-[11px] font-semibold tracking-wider uppercase disabled:opacity-70 mt-2"
                                >
                                    {status === 'loading' ? 'ENVOI EN COURS...' : 'ENVOYER MA DEMANDE'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
