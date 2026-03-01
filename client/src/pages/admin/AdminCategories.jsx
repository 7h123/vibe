import React, { useState, useEffect } from 'react';
import { adminGetCategories, adminCreateCategory, adminUpdateCategory, adminDeleteCategory, adminGetProducts } from '../../services/adminApi';
import { Pencil, Trash2, X, Plus } from 'lucide-react';

export default function AdminCategories() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [order, setOrder] = useState('');
    const [active, setActive] = useState(true);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [categoryType, setCategoryType] = useState('marbre');

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const fetchData = async () => {
        try {
            const [catsRes, prodsRes] = await Promise.all([adminGetCategories(), adminGetProducts()]);
            setCategories(catsRes.data.sort((a, b) => a.order - b.order));
            setProducts(prodsRes.data);
        } catch (err) {
            setError('Erreur réseau');
        }
    };

    useEffect(() => { fetchData() }, []);

    const openModal = (cat = null) => {
        setError('');
        if (cat) {
            setEditingId(cat._id);
            setName(cat.name);
            setOrder(cat.order || '');
            setActive(cat.active);
            setImageFile(null);
            setImagePreview(cat.image || '');
            setCategoryType(cat.type || 'marbre');
        } else {
            setEditingId(null);
            setName('');
            setOrder('');
            setActive(true);
            setImageFile(null);
            setImagePreview('');
            setCategoryType('marbre');
        }
        setModalOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('slug', slug);
        formData.append('order', order);
        formData.append('active', active);
        formData.append('type', categoryType);
        if (imageFile) formData.append('image', imageFile);

        try {
            if (editingId) {
                await adminUpdateCategory(editingId, formData);
            } else {
                await adminCreateCategory(formData);
            }
            setModalOpen(false);
            fetchData();
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur de sauvegarde');
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminDeleteCategory(id);
            setDeleteConfirm(null);
            fetchData();
        } catch (err) {
            setError('Erreur suppression');
        }
    };

    const typeBadge = (type) => {
        if (type === 'decoration') {
            return <span className="inline-block px-2 py-1 text-[9px] tracking-wider uppercase bg-amber-100 text-amber-700">DÉCORATION</span>;
        }
        return <span className="inline-block px-2 py-1 text-[9px] tracking-wider uppercase bg-blue-100 text-blue-700">MARBRE</span>;
    };

    return (
        <div className="p-8 pb-32">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-[28px] text-dark">Catégories</h1>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-dark text-bg-primary px-6 h-[40px] font-body text-[10px] tracking-wider uppercase hover:bg-dark/80 transition-colors">
                    <Plus size={14} /> AJOUTER UNE CATÉGORIE
                </button>
            </div>

            {error && <p className="font-body text-xs text-red-500 mb-4">{error}</p>}

            <div className="bg-bg-secondary w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-dark/10">
                            {['IMAGE', 'NOM', 'SLUG', 'TYPE', 'NB PRODUITS', 'ORDRE', 'ACTIF', 'ACTIONS'].map(h => (
                                <th key={h} className="font-body text-[9px] tracking-[0.15em] uppercase text-text-sec py-4 px-4">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat._id} className="border-b border-dark/5">
                                <td className="py-3 px-4">
                                    {cat.image ? (
                                        <img src={cat.image} alt="" className="w-12 h-12 object-cover bg-[#E8E3D8]" />
                                    ) : (
                                        <div className="w-12 h-12 bg-[#E8E3D8]" />
                                    )}
                                </td>
                                <td className="py-3 px-4 font-body text-[13px] text-dark">{cat.name}</td>
                                <td className="py-3 px-4 font-body text-[13px] text-text-sec">{cat.slug}</td>
                                <td className="py-3 px-4">{typeBadge(cat.type)}</td>
                                <td className="py-3 px-4 font-body text-[13px] text-text-sec">{products.filter(p => p.category?._id === cat._id).length}</td>
                                <td className="py-3 px-4 font-body text-[13px] text-text-sec">{cat.order}</td>
                                <td className="py-3 px-4 font-body text-[13px]">
                                    <span className={`inline-block px-2 py-1 text-[9px] tracking-wider uppercase ${cat.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {cat.active ? 'Oui' : 'Non'}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    {deleteConfirm === cat._id ? (
                                        <div className="flex items-center gap-3">
                                            <span className="font-body text-[10px] text-red-500">Confirmer ?</span>
                                            <button onClick={() => handleDelete(cat._id)} className="font-body text-[10px] text-dark hover:underline">Oui</button>
                                            <button onClick={() => setDeleteConfirm(null)} className="font-body text-[10px] text-dark hover:underline">Non</button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => openModal(cat)} className="text-gold hover:text-dark transition-colors"><Pencil size={16} /></button>
                                            <button onClick={() => setDeleteConfirm(cat._id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {categories.length === 0 && <p className="p-6 text-center font-body text-sm text-text-sec">Aucune catégorie.</p>}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-dark/60 z-50 flex items-center justify-center p-5">
                    <div className="bg-bg-secondary w-full max-w-[560px] p-10 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-dark hover:text-gold transition-colors"><X size={20} /></button>
                        <h2 className="font-display text-[22px] text-dark mb-8">{editingId ? 'MODIFIER LA CATÉGORIE' : 'AJOUTER UNE CATÉGORIE'}</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div>
                                <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">Nom de la catégorie *</label>
                                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                <p className="font-body text-[10px] text-text-sec mt-1">Slug: {slug}</p>
                            </div>

                            <div>
                                <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">Type de catégorie *</label>
                                <select value={categoryType} onChange={e => setCategoryType(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold cursor-pointer">
                                    <option value="marbre">Marbre & Pierre</option>
                                    <option value="decoration">Décoration Artisanale</option>
                                </select>
                            </div>

                            <div>
                                <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">Ordre d'affichage</label>
                                <input type="number" value={order} onChange={e => setOrder(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                            </div>

                            <div>
                                <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-2">Image</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="font-body text-xs text-text-sec w-full" />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover border border-dark/10 bg-[#E8E3D8]" />}
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <input type="checkbox" id="active" checked={active} onChange={e => setActive(e.target.checked)} className="w-4 h-4 accent-gold" />
                                <label htmlFor="active" className="font-body text-[12px] text-dark cursor-pointer">Catégorie active</label>
                            </div>

                            <button type="submit" className="w-full h-[48px] bg-gold text-dark font-body text-[11px] tracking-wider uppercase hover:bg-gold/80 transition-colors mt-4">
                                ENREGISTRER
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
