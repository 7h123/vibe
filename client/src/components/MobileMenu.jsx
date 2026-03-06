import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { motion, AnimatePresence } from 'framer-motion';

const menuVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
        x: 0, opacity: 1,
        transition: {
            type: 'spring', stiffness: 280, damping: 28,
            staggerChildren: 0.07, delayChildren: 0.1
        }
    },
    exit: {
        x: '100%', opacity: 0,
        transition: { duration: 0.25, ease: 'easeIn' }
    }
};

const linkVariants = {
    hidden: { x: 30, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};

export default function MobileMenu({ isOpen, onClose }) {
    const { t } = useTranslation();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[55]"
                        onClick={onClose}
                    />

                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-y-0 right-0 w-full sm:w-80 bg-obsidian z-[60] flex flex-col items-center justify-center shadow-2xl"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-5 text-[#C8A96E] hover:text-white transition-colors text-3xl"
                        >
                            &times;
                        </button>

                        <nav className="flex flex-col items-center gap-10 w-full px-8">
                            <motion.div variants={linkVariants} className="w-full">
                                <Link to="/" onClick={onClose} className="block font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                                    {t('nav.accueil')}
                                </Link>
                            </motion.div>
                            <motion.div variants={linkVariants} className="w-full">
                                <Link to="/catalogue" onClick={onClose} className="block font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                                    {t('nav.catalogue')}
                                </Link>
                            </motion.div>
                            <motion.div variants={linkVariants} className="w-full">
                                <Link to="/a-propos" onClick={onClose} className="block font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                                    {t('nav.apropos')}
                                </Link>
                            </motion.div>
                            <motion.div variants={linkVariants} className="w-full">
                                <Link to="/sur-mesure" onClick={onClose} className="block font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                                    {t('nav.surMesure')}
                                </Link>
                            </motion.div>
                            <motion.div variants={linkVariants} className="w-full">
                                <Link to="/contact" onClick={onClose} className="block font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40">
                                    {t('nav.contact')}
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
