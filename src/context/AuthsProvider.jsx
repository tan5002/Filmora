import React, { createContext, useState, useContext, useEffect } from 'react';
// Tạo Context để quản lý thông tin người dùng
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Component cung cấp thông tin người dùng
export const AuthsProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(null); // Trạng thái người dùng

    const handleLogin = (userData) => {
        setIsLogin(userData); // Lưu thông tin người dùng sau khi đăng nhập thành công
        localStorage.setItem('user', JSON.stringify(userData)); // Lưu vào localStorage
    };
    
    const logout = () => {
       setIsLogin(null); // Đăng xuất
        localStorage.removeItem('user');
    };
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
         setIsLogin(JSON.parse(storedUser)); // Khôi phục thông tin user
        }
      }, []);
    return (
        <AuthContext.Provider value={{ isLogin, handleLogin , logout }}>
            {children}
        </AuthContext.Provider>
    );
};