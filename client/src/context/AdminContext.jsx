import { createContext, useContext, useState } from 'react'

const AdminContext = createContext()

export function AdminProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('nova_admin_token'))

    const login = (t) => {
        localStorage.setItem('nova_admin_token', t)
        setToken(t)
    }

    const logout = () => {
        localStorage.removeItem('nova_admin_token')
        setToken(null)
    }

    return (
        <AdminContext.Provider value={{ token, login, logout, isAdmin: !!token }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext)
