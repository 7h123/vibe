import { useState, useEffect } from 'react';
import React from 'react';
import { adminGetOrders, adminUpdateOrder } from '../../services/adminApi';
import { useTranslation } from '../../hooks/useTranslation';

export default function AdminOrders() {
    const { t } = useTranslation()
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('Toutes');
    const [expandedRow, setExpandedRow] = useState(null);
    const [error, setError] = useState('');

    const fetchOrders = async () => {
        try {
            const res = await adminGetOrders();
            setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            setError(t('admin.orderPage.loadError'));
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const statuses = ['Toutes', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

    const getStatusLabel = (status) => {
        const statusMap = {
            'Toutes': 'Toutes',
            'pending': t('admin.orderStatus.pending'),
            'confirmed': t('admin.orderStatus.confirmed'),
            'processing': t('admin.orderStatus.processing'),
            'shipped': t('admin.orderStatus.shipped'),
            'delivered': t('admin.orderStatus.delivered'),
            'cancelled': t('admin.orderStatus.cancelled'),
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-amber-100 text-amber-700';
            case 'confirmed': return 'bg-blue-100 text-blue-700';
            case 'processing': return 'bg-purple-100 text-purple-700';
            case 'shipped': return 'bg-indigo-100 text-indigo-700';
            case 'delivered': return 'bg-green-100 text-green-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await adminUpdateOrder(id, { status: newStatus });
            fetchOrders();
        } catch (err) {
            setError(t('admin.orderPage.updateError'));
        }
    };

    const filtered = filter === 'Toutes' ? orders : orders.filter(o => o.status === filter);

    return (
        <div className="p-8 pb-32 min-h-screen relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-[28px] text-dark">{t('admin.orderPage.title')}</h1>
            </div>

            {error && <p className="font-body text-[12px] text-red-500 mb-4">{error}</p>}

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
                {statuses.map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`font-body text-[10px] tracking-wider uppercase px-4 py-2 border ${filter === s ? 'bg-dark text-cream border-dark' : 'bg-transparent text-text-sec border-dark/20'}`}
                    >
                        {getStatusLabel(s)}
                    </button>
                ))}
            </div>

            <div className="bg-bg-secondary w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-dark/10">
                            {[t('admin.table.id'), t('admin.table.customer'), t('admin.table.phone'), t('admin.table.city'), t('admin.table.articles'), t('admin.table.total'), t('admin.table.status'), t('admin.table.date')].map(h => (
                                <th key={h} className="font-body text-[9px] tracking-[0.15em] uppercase text-text-sec py-4 px-4 whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(order => (
                            <React.Fragment key={order._id}>
                                <tr
                                    className="border-b border-dark/5 cursor-pointer hover:bg-black/5 transition-colors"
                                    onClick={() => setExpandedRow(expandedRow === order._id ? null : order._id)}
                                >
                                    <td className="py-4 px-4 font-body text-[11px] text-text-sec">{order._id.slice(-6).toUpperCase()}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-dark">{order.customer?.name}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-text-sec">{order.customer?.phone}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-dark">{order.customer?.city}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-text-sec">{order.items.length}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-gold">{order.total?.toLocaleString()} MAD</td>
                                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateStatus(order._id, e.target.value)}
                                            className={`font-body text-[9px] tracking-wider uppercase px-2 py-1 outline-none cursor-pointer appearance-none ${getStatusColor(order.status)}`}
                                        >
                                            {statuses.filter(s => s !== 'Toutes').map(s => (
                                                <option key={s} value={s}>{getStatusLabel(s)}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="py-4 px-4 font-body text-[12px] text-text-sec">
                                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                                    </td>
                                </tr>

                                {expandedRow === order._id && (
                                    <tr className="bg-black/5 border-b border-dark/10">
                                        <td colSpan="8" className="p-6">
                                            <div className="flex flex-col gap-6">
                                                <div>
                                                    <p className="font-body text-[10px] tracking-[0.1em] text-text-sec uppercase mb-3">{t('admin.orderPage.customerInfo')}</p>
                                                    <p className="font-body text-[13px] text-dark mb-1">{order.customer?.address}</p>
                                                    {order.customer?.message && (
                                                        <p className="font-body text-[12px] text-text-sec italic border-l-2 border-gold pl-3 mt-2">"{order.customer?.message}"</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-body text-[10px] tracking-[0.1em] text-text-sec uppercase mb-3">{t('admin.orderPage.itemsOrdered')}</p>
                                                    <div className="flex flex-col gap-3">
                                                        {order.items.map((item, idx) => (
                                                            <div key={idx} className="flex items-center gap-4">
                                                                <img src={item.image} alt="" className="w-12 h-12 object-cover bg-bg-primary" />
                                                                <div>
                                                                    <p className="font-body text-[13px] text-dark">{item.name}</p>
                                                                    <p className="font-body text-[11px] text-text-sec">{item.price?.toLocaleString()} MAD × {item.quantity}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                {filtered.length === 0 && (
                    <p className="p-8 text-center font-body text-sm text-text-sec">{t('admin.orderPage.noOrders')}</p>
                )}
            </div>
        </div>
    );
}
