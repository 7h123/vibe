import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../context/AdminContext'
import { useTranslation } from '../../hooks/useTranslation'
import { LanguageContext } from '../../context/LanguageContext'
import { adminLogin } from '../../services/adminApi'

export default function AdminLogin() {
    const { t } = useTranslation()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAdmin()
    const navigate = useNavigate()
    const { setLanguage, language } = useContext(LanguageContext)

    // Force French language for admin login
    useEffect(() => {
        const previousLanguage = language
        setLanguage('fr')
        
        return () => {
            // When leaving admin login, restore previous language
            setLanguage(previousLanguage)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const { data } = await adminLogin({ email: username, password })
            login(data.token)
            navigate('/admin')
        } catch {
            setError(t('admin.login.error'))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-5">
            <div className="w-full max-w-[400px] bg-bg-secondary p-12">

                {/* Logo */}
                <div className="text-center mb-10">
                    <div className="inline-block text-left">
                        <span className="font-display font-bold text-[22px] text-dark tracking-[0.25em] block">
                            {t('brand.nova')}
                        </span>
                        <span className="font-body text-[9px] text-gold tracking-[0.4em] block -mt-0.5">
                            {t('brand.design')}
                        </span>
                        <div className="w-full h-px bg-gold opacity-50 mt-1" />
                    </div>
                </div>

                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-gold text-center mb-8">
                    {t('admin.login.tag')}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1.5">
                            {t('admin.login.username')}
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            className="w-full h-12 bg-transparent border-0 border-b border-dark/20 
                         font-body text-sm text-dark px-0 outline-none
                         focus:border-gold transition-colors duration-200"
                        />
                    </div>

                    <div className="mb-8">
                        <label className="font-body text-[10px] tracking-[0.15em] uppercase text-text-sec block mb-1.5">
                            {t('admin.login.password')}
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full h-12 bg-transparent border-0 border-b border-dark/20 
                         font-body text-sm text-dark px-0 outline-none
                         focus:border-gold transition-colors duration-200"
                        />
                    </div>

                    {error && (
                        <p className="font-body text-xs text-red-500 mb-4 text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-dark text-bg-primary font-body text-[11px] 
                       tracking-[0.2em] uppercase hover:bg-dark/80 
                       transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading ? t('buttons.login') + '...' : t('buttons.login')}
                    </button>
                </form>
            </div>
        </div>
    )
}
