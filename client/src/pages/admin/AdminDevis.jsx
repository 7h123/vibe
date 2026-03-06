import React, { useState, useEffect } from 'react';
import { adminGetDevis, adminUpdateDevisStatus } from '../../services/adminApi';
import { useTranslation } from '../../hooks/useTranslation';
import { Eye, X } from 'lucide-react';

const STATUS_OPTIONS = [
    { value: 'new', label: 'NEW', color: 'bg-amber-100 text-amber-700 border-amber-300' },
    { value: 'contacted', label: 'CONTACTED', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    { value: 'quoted', label: 'QUOTED', color: 'bg-purple-100 text-purple-700 border-purple-300' },
    { value: 'accepted', label: 'ACCEPTED', color: 'bg-green-100 text-green-700 border-green-300' },
    { value: 'rejected', label: 'REJECTED', color: 'bg-red-100 text-red-700 border-red-300' },
];

export default function AdminDevis() {
    const { t } = useTranslation()
    const [devisList, setDevisList] = useState([]);
    const [filter, setFilter] = useState('Toutes');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [detailModal, setDetailModal] = useState(null);
    const [statusUpdating, setStatusUpdating] = useState(null);

    const fetchDevis = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await adminGetDevis();
            const data = Array.isArray(res.data) ? res.data : [];
            setDevisList(data.sort((a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0)));
        } catch (err) {
            setError(t('admin.devisPage.loadError'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchDevis(); }, []);

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        try { return new Date(dateStr).toLocaleDateString('fr-FR'); } catch { return 'N/A'; }
    };

    const formatPhone = (phone) => {
        if (!phone) return '';
        return phone.replace(/[^0-9]/g, '');
    };

    const getStatusColor = (status) => {
        const opt = STATUS_OPTIONS.find(o => o.value === status);
        return opt ? opt.color : 'bg-gray-100 text-gray-700 border-gray-300';
    };

    const handleStatusChange = async (devisId, newStatus) => {
        setStatusUpdating(devisId);
        try {
            const res = await adminUpdateDevisStatus(devisId, { status: newStatus });
            setDevisList(prev => prev.map(d => d._id === devisId ? { ...d, status: res.data.status } : d));
            if (detailModal?._id === devisId) {
                setDetailModal(prev => ({ ...prev, status: res.data.status }));
            }
        } catch (err) {
            setError(t('admin.devisPage.updateError'));
        } finally {
            setTimeout(() => setStatusUpdating(null), 600);
        }
    };

    const filtered = filter === 'Toutes'
        ? devisList
        : devisList.filter(d => (d.status ?? 'new') === filter);

    return (
        <div className="p-8 pb-32 min-h-screen relative">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-[28px] text-dark">{t('admin.devisPage.title')}</h1>
                <span className="font-body text-[12px] text-text-sec">{devisList.length} {t('admin.devisPage.totalCount')}</span>
            </div>

            {error && <p className="font-body text-[12px] text-red-500 mb-4">{error}</p>}

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['Toutes', ...STATUS_OPTIONS.map(s => s.value)].map(s => (
                    <button
                        key={s}
                        onClick={() => setFilter(s)}
                        className={`font-body text-[10px] tracking-wider uppercase px-4 py-2 border transition-colors ${filter === s
                            ? 'bg-dark text-cream border-dark'
                            : 'bg-transparent text-text-sec border-dark/20 hover:border-dark/40'
                            }`}
                    >
                        {s === 'Toutes' ? `${t('admin.devisPage.allFilter')} (${devisList.length})` : `${s} (${devisList.filter(d => (d.status ?? 'new') === s).length})`}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <div className="bg-bg-secondary w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-dark/10">
                                {[t('admin.table.customerName'), t('admin.table.phone'), t('admin.table.email'), t('admin.devisPage.type'), t('form.material'), t('admin.devisPage.budget'), t('admin.table.status'), t('admin.table.date'), t('admin.table.actions')].map(h => (
                                    <th key={h} className="font-body text-[9px] tracking-[0.15em] uppercase text-text-sec py-4 px-4 whitespace-nowrap">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(devis => (
                                <tr key={devis._id} className="border-b border-dark/5 hover:bg-black/[0.03] transition-colors">
                                    <td className="py-4 px-4 font-body text-[13px] text-dark font-medium">{devis.customer?.name ?? 'N/A'}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-text-sec">{devis.customer?.phone ?? 'N/A'}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-text-sec">{devis.customer?.email ?? 'N/A'}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-dark">{devis.type ?? 'N/A'}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-text-sec">{devis.material ?? 'N/A'}</td>
                                    <td className="py-4 px-4 font-body text-[13px] text-gold font-medium">{devis.budget ?? '-'}</td>
                                    <td className="py-4 px-4">
                                        <div className="relative">
                                            <select
                                                value={devis.status ?? 'new'}
                                                onChange={(e) => handleStatusChange(devis._id, e.target.value)}
                                                className={`appearance-none cursor-pointer font-body text-[9px] tracking-wider uppercase px-3 py-1.5 pr-6 border rounded-sm outline-none ${getStatusColor(devis.status ?? 'new')} ${statusUpdating === devis._id ? 'opacity-50' : ''}`}
                                                disabled={statusUpdating === devis._id}
                                            >
                                                {STATUS_OPTIONS.map(opt => (
                                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                                ))}
                                            </select>
                                            {statusUpdating === devis._id && (
                                                <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px]">✓</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 font-body text-[12px] text-text-sec whitespace-nowrap">{formatDate(devis.createdAt)}</td>
                                    <td className="py-4 px-4">
                                        <button
                                            onClick={() => setDetailModal(devis)}
                                            className="text-gold hover:text-dark transition-colors"
                                            title="Voir les détails"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <p className="p-8 text-center font-body text-sm text-text-sec">{t('admin.devisPage.noDevis')}</p>
                    )}
                </div>
            )}

            {/* Detail Modal */}
            {detailModal && (
                <div className="fixed inset-0 bg-dark/60 z-50 flex items-center justify-center p-5" onClick={() => setDetailModal(null)}>
                    <div className="bg-bg-secondary w-full max-w-[640px] p-10 relative max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setDetailModal(null)} className="absolute top-6 right-6 text-dark hover:text-gold transition-colors"><X size={20} /></button>
                        <h2 className="font-display text-[22px] text-dark mb-2">{t('admin.devisPage.detailsTitle')}</h2>
                        <p className="font-body text-[11px] text-text-sec mb-8">{t('admin.devisPage.submittedDate')} {formatDate(detailModal.createdAt)}</p>

                        <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.devisPage.customerName')}</p>
                                <p className="font-body text-[14px] text-dark font-medium">{detailModal.customer?.name ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.table.phone')}</p>
                                <p className="font-body text-[14px] text-dark">{detailModal.customer?.phone ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.table.email')}</p>
                                <p className="font-body text-[14px] text-dark">{detailModal.customer?.email ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.devisPage.type')}</p>
                                <p className="font-body text-[14px] text-dark">{detailModal.type ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('form.material')}</p>
                                <p className="font-body text-[14px] text-dark">{detailModal.material ?? 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.devisPage.dimensions')}</p>
                                <p className="font-body text-[14px] text-dark">{detailModal.dimensions ?? t('admin.devisPage.notSpecified')}</p>
                            </div>
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.devisPage.budget')}</p>
                                <p className="font-body text-[14px] text-gold font-medium">{detailModal.budget ?? t('admin.devisPage.notSpecified')}</p>
                            </div>
                            <div>
                                <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.table.status')}</p>
                                <select
                                    value={detailModal.status ?? 'new'}
                                    onChange={(e) => handleStatusChange(detailModal._id, e.target.value)}
                                    className={`appearance-none cursor-pointer font-body text-[10px] tracking-wider uppercase px-3 py-1.5 border rounded-sm outline-none mt-1 ${getStatusColor(detailModal.status ?? 'new')}`}
                                >
                                    {STATUS_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-6">
                            <p className="font-body text-[10px] tracking-[0.15em] text-text-sec uppercase mb-1">{t('admin.form.fullDescription')}</p>
                            <p className="font-body text-[14px] text-dark leading-[1.7]">{detailModal.description ?? t('admin.devis.noDescription')}</p>
                        </div>

                        <div className="flex gap-3 mt-8">
                            {detailModal.customer?.phone && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        const phone = detailModal.customer?.phone?.replace(/\s/g, '').replace(/^0/, '212') || '';
                                        const text = `${t('admin.devis.whatsappMessage')}`;
                                        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
                                    }}
                                    className="flex-1 inline-flex items-center justify-center h-[40px] bg-green-500 text-white font-body text-[10px] tracking-wider uppercase hover:bg-green-600 transition-colors"
                                >
                                    {t('admin.devis.contactViaWhatsapp')}
                                </button>
                            )}
                            {detailModal.customer?.email && (
                                <a
                                    href={`mailto:${detailModal.customer.email}?subject=${encodeURIComponent(t('admin.devis.emailSubject'))}&body=${encodeURIComponent(
                                        `${t('admin.devis.emailBody')}`
                                    )}`}
                                    className="flex-1 inline-flex items-center justify-center h-[40px] bg-dark text-cream font-body text-[10px] tracking-wider uppercase hover:bg-dark/80 transition-colors"
                                >
                                    {t('admin.devis.sendEmail')}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
