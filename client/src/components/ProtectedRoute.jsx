import { Navigate } from 'react-router-dom'
import { useAdmin } from '../context/AdminContext'

export default function ProtectedRoute({ children }) {
    const { isAdmin } = useAdmin()
    return isAdmin ? children : <Navigate to="/admin/login" replace />
}
