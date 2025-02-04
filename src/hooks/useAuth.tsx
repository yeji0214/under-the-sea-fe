import { useEffect, useState } from "react"

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem('jwtToken'));

    useEffect(() => {
        const storedToken = sessionStorage.getItem('jwtToken');
        setToken(storedToken);
    }, []);

    const logout = () => {
        fetch('http://localhost:8080/auth/logout', {
            credentials: 'include', 
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }).then(() => {
            sessionStorage.removeItem('jwtToken');
            window.location.href = '/sign-in';
        });
    };

    return {token, logout};
}