import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { useTranslation } from '../../hooks/useTranslation'
import { useEffect, useContext } from 'react'
import { LayoutDashboard, Package, Grid3X3, ShoppingCart, FileText, LogOut } from 'lucide-react'
import { LanguageContext } from '../../context/LanguageContext'

const getNavItems = (t) => [
    { to: '/admin', label: t('admin.nav.dashboard'), icon: LayoutDashboard, exact: true },
    { to: '/admin/products', label: t('admin.nav.products'), icon: Package },
    { to: '/admin/categories', label: t('admin.nav.categories'), icon: Grid3X3 },
    { to: '/admin/orders', label: t('admin.nav.orders'), icon: ShoppingCart },
    { to: '/admin/devis', label: t('admin.nav.devis'), icon: FileText },
]

export default function AdminLayout() {
    const { logout, token } = useAdmin()
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { setLanguage, language } = useContext(LanguageContext)
    const navItems = getNavItems(t)

    console.log('AdminLayout token:', token)

    // Force French language for admin area
    useEffect(() => {
        const previousLanguage = language
        setLanguage('fr')
        
        return () => {
            // When leaving admin, restore previous language
            setLanguage(previousLanguage)
        }
    }, [])

    useEffect(() => {
        let meta = document.querySelector('meta[name="robots"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = "robots";
            document.head.appendChild(meta);
        }
        meta.content = "noindex";

        return () => {
            if (meta) meta.content = "index, follow";
        };
    }, []);

    const handleLogout = () => {
        logout()
        navigate('/admin/login')
    }

    if (!token) {
        return <div className="w-full h-screen bg-red-500 flex items-center justify-center text-white text-2xl">Not Authenticated</div>
    }

    return (
        <div className="flex min-h-screen">

            {/* Sidebar — fixed dark theme, no theme variables */}
            <aside className="w-60 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#1a1a0e' }}>

                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <span className="font-display font-bold text-[18px] text-cream tracking-[0.25em] block">{t('brand.nova')}</span>
                    <span className="font-body text-[8px] text-gold tracking-[0.4em] block -mt-0.5">{t('admin.designAdmin')}</span>
                </div>

                {/* Nav */}
                <nav className="flex-1 py-6">
                    {navItems.map(({ to, label, icon: Icon, exact }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={exact}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-6 py-3 font-body text-[10px] tracking-[0.15em] 
                 transition-colors duration-200
                 ${isActive
                                    ? 'text-gold border-l-2 border-gold bg-white/5'
                                    : 'text-cream/60 border-l-2 border-transparent hover:text-cream/90'
                                }`
                            }
                        >
                            <Icon size={15} />
                            {label}
                        </NavLink>
                    ))}
                </nav>

                {/* Footer Links */}
                <div className="border-t border-white/10 mt-auto flex flex-col">
                    <a
                        href="https://client-nu-peach-75.vercel.app"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 px-6 py-4 font-body text-[10px] 
                         tracking-[0.15em] text-cream/60 hover:text-gold 
                         transition-colors duration-200"
                    >
                        &larr; {t('admin.backToSite')}
                    </a>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-6 py-4 font-body text-[10px] 
                         tracking-[0.15em] text-cream/40 hover:text-red-400 
                         transition-colors duration-200 border-t border-white/5"
                    >
                        <LogOut size={15} />
                        {t('buttons.logout')}
                    </button>
                </div>
            </aside>

            {/* Main — fixed light cream, no theme variables */}
            <main className="flex-1 overflow-auto" style={{ backgroundColor: '#f5f0e8' }}>
                <Outlet />
            </main>
        </div>
    )
}
