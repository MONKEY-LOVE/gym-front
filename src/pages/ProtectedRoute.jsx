import { useAuth } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom"
function ProtectedRoute() {
    const { user, loading, isAuthenticated } = useAuth()
    console.log(loading, isAuthenticated);

    if (loading) return <h1>Loading...</h1>
    if (!loading && !isAuthenticated) return <Navigate to="/login" replace />


    return <Outlet />;

}

export default ProtectedRoute