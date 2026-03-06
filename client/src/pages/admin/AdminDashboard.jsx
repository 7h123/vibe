import { useEffect, useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { adminGetProducts, adminGetCategories, adminGetOrders, adminGetDevis } from '../../services/adminApi'
import { Package, Grid3X3, ShoppingCart, FileText } from 'lucide-react'

export default function AdminDashboard() {
    const { t } = useTranslation()
    const [stats, setStats] = useState({ products: 0, categories: 0, orders: 0, devis: 0 })
    const [orders, setOrders] = useState([])

    useEffect(() => {
        Promise.all([
            adminGetProducts(),
            adminGetCategories(),
            adminGetOrders(),
            adminGetDevis(),
        ]).then(([p, c, o, d]) => {
            setStats({
                products: p.data.length,
                categories: c.data.length,
                orders: o.data.length,
                devis: d.data.filter(x => x.status === 'new').length,
            })
            setOrders(o.data.slice(0, 5))
        })
    }, [])

    const cards = [
        { label: t('admin.products'), value: stats.products, icon: Package },
        { label: t('admin.categories'), value: stats.categories, icon: Grid3X3 },
        { label: t('admin.orders'), value: stats.orders, icon: ShoppingCart },
        { label: t('admin.pendingDevis'), value: stats.devis, icon: FileText },
    ]

    return (
        <div className="p-8">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold mb-1">{t('admin.tag')}</p>
            <h1 className="font-display text-[28px] text-dark mb-8">{t('admin.dashboard.title')}</h1>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {cards.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-bg-secondary p-6">
                        <Icon size={18} className="text-gold mb-3" />
                        <p className="font-display text-[32px] text-dark leading-none mb-1">{value}</p>
                        <p className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec">{label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders */}
            <div className="bg-bg-secondary p-6">
                <h2 className="font-display text-[18px] text-dark mb-4">{t('admin.recentOrders')}</h2>
                {orders.length === 0 ? (
                    <p className="font-body text-sm text-text-sec">{t('admin.noOrders')}</p>
                ) : (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-dark/10">
                                {[t('admin.table.name'), t('admin.table.phone'), t('admin.table.total'), t('admin.table.status'), t('admin.table.date')].map(h => (
                                    <th key={h} className="text-left font-body text-[9px] tracking-[0.15em] 
                                          uppercase text-text-sec pb-3 pr-4">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id} className="border-b border-dark/5">
                                    <td className="font-body text-sm text-dark py-3 pr-4">{order.customer?.name}</td>
                                    <td className="font-body text-sm text-text-sec py-3 pr-4">{order.customer?.phone}</td>
                                    <td className="font-body text-sm text-gold py-3 pr-4">{order.total?.toLocaleString()} MAD</td>
                                    <td className="py-3 pr-4">
                                        <span className="font-body text-[9px] tracking-wider uppercase px-2 py-1 bg-dark/5">
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="font-body text-xs text-text-sec py-3">
                                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
