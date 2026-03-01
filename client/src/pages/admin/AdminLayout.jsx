import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { useEffect } from 'react'
import { LayoutDashboard, Package, Grid3X3, ShoppingCart, FileText, LogOut } from 'lucide-react'

const navItems = [
    { to: '/admin', label: 'TABLEAU DE BORD', icon: LayoutDashboard, exact: true },
    { to: '/admin/products', label: 'PRODUITS', icon: Package },
    { to: '/admin/categories', label: 'CATÉGORIES', icon: Grid3X3 },
    { to: '/admin/orders', label: 'COMMANDES', icon: ShoppingCart },
    { to: '/admin/devis', label: 'DEVIS', icon: FileText },
]

export default function AdminLayout() {
    const { logout } = useAdmin()
    const navigate = useNavigate()

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

    return (
        <div className="flex min-h-screen">

            {/* Sidebar */}
            <aside className="w-60 bg-dark flex-shrink-0 flex flex-col">

                {/* Logo */}
                <div className="p-6 border-b border-white/10">
                    <span className="font-display font-bold text-[18px] text-cream tracking-[0.25em] block">NOVA</span>
                    <span className="font-body text-[8px] text-gold tracking-[0.4em] block -mt-0.5">DESIGN · ADMIN</span>
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
                        &larr; RETOUR AU SITE
                    </a>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-6 py-4 font-body text-[10px] 
                         tracking-[0.15em] text-cream/40 hover:text-red-400 
                         transition-colors duration-200 border-t border-white/5"
                    >
                        <LogOut size={15} />
                        DÉCONNEXION
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 bg-bg-primary overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}
