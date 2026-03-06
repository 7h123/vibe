import React, { useState, useEffect } from 'react';
import { adminGetProducts, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, adminGetCategories } from '../../services/adminApi';
import { useTranslation } from '../../hooks/useTranslation';
import { Pencil, Trash2, X, Plus } from 'lucide-react';

export default function AdminProducts() {
    const { t } = useTranslation()
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [priceOnRequest, setPriceOnRequest] = useState(false);
    const [category, setCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [isFeatured, setIsFeatured] = useState(false);
    const [inStock, setInStock] = useState(true);

    // specs
    const [dimensions, setDimensions] = useState('');
    const [weight, setWeight] = useState('');
    const [finish, setFinish] = useState('');
    const [leadTime, setLeadTime] = useState('');

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchData = async () => {
        try {
            const [prodsRes, catsRes] = await Promise.all([adminGetProducts(), adminGetCategories()]);
            setProducts(prodsRes.data);
            setCategories(catsRes.data);
        } catch (err) {
            setError(t('admin.productPage.networkError'));
        }
    };

    useEffect(() => { fetchData() }, []);

    const openModal = (prod = null) => {
        setError('');
        if (prod) {
            setEditingId(prod._id);
            setName(prod.name || '');
            setShortDescription(prod.shortDescription || '');
            setDescription(prod.description || '');
            setPrice(prod.price || '');
            setPriceOnRequest(prod.priceOnRequest || false);
            setCategory(prod.category?._id || '');
            setMaterial(prod.material || '');

            setDimensions(prod.specs?.dimensions || '');
            setWeight(prod.specs?.weight || '');
            setFinish(prod.specs?.finish || '');
            setLeadTime(prod.specs?.leadTime || '');

            setIsFeatured(prod.isFeatured || false);
            setInStock(prod.inStock ?? true);
            setImageFile(null);
            setImagePreview(prod.images?.[0] || '');
        } else {
            setEditingId(null);
            setName('');
            setShortDescription('');
            setDescription('');
            setPrice('');
            setPriceOnRequest(false);
            setCategory(categories[0]?._id || '');
            setMaterial('');

            setDimensions('');
            setWeight('');
            setFinish('');
            setLeadTime('');

            setIsFeatured(false);
            setInStock(true);
            setImageFile(null);
            setImagePreview('');
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
        formData.append('slug', name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''));
        formData.append('shortDescription', shortDescription);
        formData.append('description', description);
        if (!priceOnRequest) formData.append('price', price);
        formData.append('priceOnRequest', priceOnRequest);
        formData.append('currency', 'MAD');
        formData.append('category', category);
        formData.append('material', material);

        formData.append('specs[dimensions]', dimensions);
        formData.append('specs[weight]', weight);
        formData.append('specs[finish]', finish);
        formData.append('specs[leadTime]', leadTime);

        formData.append('isFeatured', isFeatured);
        formData.append('inStock', inStock);

        if (imageFile) formData.append('image', imageFile);

        try {
            if (editingId) {
                await adminUpdateProduct(editingId, formData);
            } else {
                await adminCreateProduct(formData);
            }
            setModalOpen(false);
            await fetchData();
        } catch (err) {
            setError(err.response?.data?.message || t('admin.productPage.saveError'));
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log('Deleting ID:', id);
            await adminDeleteProduct(id);
            setDeleteConfirm(null);
            setProducts(prev => prev.filter(p => p._id !== id));
        } catch (err) {
            setError(t('admin.productPage.deleteError'));
        }
    };

    return (
        <div className="p-8 pb-32">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-display text-[28px] text-dark">{t('admin.productPage.title')}</h1>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-dark text-bg-primary px-6 h-[40px] font-body text-[10px] tracking-wider uppercase hover:bg-dark/80 transition-colors">
                    <Plus size={14} /> {t('admin.productPage.addButton')}
                </button>
            </div>

            {error && <p className="font-body text-xs text-red-500 mb-4">{error}</p>}

            <div className="bg-bg-secondary w-full overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-dark/10">
                            {[t('admin.table.image'), t('admin.table.name'), t('admin.table.category'), t('admin.table.price'), t('admin.productPage.inStock'), t('admin.productPage.featured'), t('admin.table.actions')].map(h => (
                                <th key={h} className="font-body text-[9px] tracking-[0.15em] uppercase text-text-sec py-4 px-4 whitespace-nowrap">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(prod => (
                            <tr key={prod._id} className="border-b border-dark/5">
                                <td className="py-3 px-4">
                                    {prod.images?.[0] ? (
                                        <img src={prod.images[0]} alt="" className="w-12 h-12 object-cover bg-[#E8E3D8]" />
                                    ) : (
                                        <div className="w-12 h-12 bg-[#E8E3D8]" />
                                    )}
                                </td>
                                <td className="py-3 px-4 font-body text-[13px] text-dark">{prod.name}</td>
                                <td className="py-3 px-4 font-body text-[13px] text-text-sec">{prod.category?.name || '-'}</td>
                                <td className="py-3 px-4 font-body text-[13px] text-gold">
                                    {prod.priceOnRequest ? t('admin.productPage.onRequest') : `${prod.price?.toLocaleString()} MAD`}
                                </td>
                                <td className="py-3 px-4 font-body text-[13px]">
                                    <span className={`inline-block px-2 py-1 text-[9px] tracking-wider uppercase ${prod.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {prod.inStock ? t('form.yes') : t('form.no')}
                                    </span>
                                </td>
                                <td className="py-3 px-4 font-body text-[13px]">
                                    <span className={`inline-block px-2 py-1 text-[9px] tracking-wider uppercase ${prod.isFeatured ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                        {prod.isFeatured ? t('admin.productPage.featured') : t('admin.productPage.standard')}
                                    </span>
                                </td>
                                <td className="py-3 px-4">
                                    {deleteConfirm === prod._id ? (
                                        <div className="flex items-center gap-3">
                                            <span className="font-body text-[10px] text-red-500">{t('admin.productPage.confirmDelete')}</span>
                                            <button onClick={() => handleDelete(prod._id)} className="font-body text-[10px] text-dark hover:underline">{t('form.yes')}</button>
                                            <button onClick={() => setDeleteConfirm(null)} className="font-body text-[10px] text-dark hover:underline">{t('form.no')}</button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            <button onClick={() => openModal(prod)} className="text-gold hover:text-dark transition-colors"><Pencil size={16} /></button>
                                            <button onClick={() => setDeleteConfirm(prod._id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 size={16} /></button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {products.length === 0 && <p className="p-6 text-center font-body text-sm text-text-sec">{t('admin.productPage.noProducts')}</p>}
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-dark/60 z-50 flex items-center justify-center p-5">
                    <div className="bg-bg-secondary w-full max-w-[700px] p-10 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 text-dark hover:text-gold transition-colors"><X size={20} /></button>
                        <h2 className="font-display text-[22px] text-dark mb-8">{editingId ? t('admin.productPage.editTitle') : t('admin.productPage.addTitle')}</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.productName')}</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                </div>
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.slug')}</label>
                                    <input type="text" value={name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')} disabled className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-text-sec px-0 outline-none select-none opacity-50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.category')}</label>
                                    <select value={category} onChange={e => setCategory(e.target.value)} required className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold appearance-none">
                                        <option value="" disabled>{t('form.selectDefault')}</option>
                                        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('form.material')}</label>
                                    <input type="text" value={material} onChange={e => setMaterial(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5 items-end">
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('form.price')}</label>
                                    {!priceOnRequest ? (
                                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                    ) : (
                                        <div className="w-full h-10 flex items-center border-b border-dark/20 font-body text-sm text-text-sec opacity-50">{t('admin.productPage.onRequest')}</div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 h-10 pb-2">
                                    <input type="checkbox" id="priceOnRequest" checked={priceOnRequest} onChange={e => setPriceOnRequest(e.target.checked)} className="w-4 h-4 accent-gold" />
                                    <label htmlFor="priceOnRequest" className="font-body text-[12px] text-dark cursor-pointer">{t('form.priceOnRequest')}</label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.dimensions')}</label>
                                    <input type="text" value={dimensions} onChange={e => setDimensions(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                </div>
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.weight')}</label>
                                    <input type="text" value={weight} onChange={e => setWeight(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.finish')}</label>
                                    <input type="text" value={finish} onChange={e => setFinish(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                </div>
                                <div>
                                    <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.leadTime')}</label>
                                    <input type="text" value={leadTime} onChange={e => setLeadTime(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                                </div>
                            </div>

                            <div>
                                <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.shortDescription')}</label>
                                <input type="text" value={shortDescription} onChange={e => setShortDescription(e.target.value)} className="w-full h-10 bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold" />
                            </div>

                            <div>
                                <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1">{t('admin.form.longDescription')}</label>
                                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full h-[80px] bg-transparent border-b border-dark/20 font-body text-sm text-dark px-0 outline-none focus:border-gold resize-none py-2"></textarea>
                            </div>

                            <div>
                                <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-2">{t('admin.form.mainImage')}</label>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="font-body text-xs text-text-sec w-full" />
                                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 w-32 h-32 object-cover border border-dark/10 bg-[#E8E3D8]" />}
                            </div>

                            <div className="flex items-center gap-6 mt-2">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="inStock" checked={inStock} onChange={e => setInStock(e.target.checked)} className="w-4 h-4 accent-gold" />
                                    <label htmlFor="inStock" className="font-body text-[12px] text-dark cursor-pointer">{t('form.inStock')}</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" id="isFeatured" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} className="w-4 h-4 accent-gold" />
                                    <label htmlFor="isFeatured" className="font-body text-[12px] text-dark cursor-pointer">{t('form.featuredProduct')}</label>
                                </div>
                            </div>

                            <button type="submit" className="w-full h-[48px] bg-gold text-dark font-body text-[11px] tracking-wider uppercase hover:bg-gold/80 transition-colors mt-4">
                                {t('buttons.save')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
