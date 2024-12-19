import { createContext, useState, useContext, useEffect } from "react";
import { loginRequest, verifyTokenRequest } from '../api/axios';
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    // clear errors after 5 seconds
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    const login = async (user) => {

        try {
            const res = await loginRequest(user);
            setUser(res.data);

            const userData = await verifyTokenRequest(res.data.token);
            setUser(userData.data);
            console.log(userData.data);
            setIsAuthenticated(true);

        } catch (error) {
            setErrors("Credenciales incorrectas");
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
    }



    useEffect(() => {
        const checkLogin = async () => {
            const cookies = Cookies.get();
            if (!cookies.token) {
                console.log("No token found");
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            try {
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data) return setIsAuthenticated(false);
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                user,
                isAuthenticated,
                errors,
                loading,
            }}>
            {children}
        </AuthContext.Provider>
    )
}