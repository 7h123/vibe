import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const menuLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/catalogue', label: 'Catalogue' },
    { to: '/a-propos', label: 'À Propos' },
    { to: '/sur-mesure', label: 'Sur Mesure' },
    { to: '/contact', label: 'Contact' },
];

export default function MobileMenu({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-obsidian z-[60] flex flex-col items-center justify-center"
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-5 text-gold text-3xl"
                    >
                        &times;
                    </button>

                    <nav className="flex flex-col items-center gap-10 w-full px-8">
                        {menuLinks.map((link, index) => (
                            <motion.div
                                key={link.to}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full"
                            >
                                <Link to={link.to} onClick={onClose} className="font-display text-[32px] font-[500] text-cream w-full text-center pb-6 border-b border-gold/40 block">
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
