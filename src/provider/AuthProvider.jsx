import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext();
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser?.email) {
                setUser(currentUser);
                const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, { email: currentUser?.email }, { withCredentials: true });
                console.log(data);
            }
            else {
                setUser(currentUser);
            }
            
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const updateUserProfile = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData)
    }

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const logout = () => {
        return signOut(auth)
    };

    const authInfo = {
        user,
        setUser,
        register,
        showPassword,
        setShowPassword,
        logout,
        updateUserProfile,
        loading,
        googleLogin,
        login
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;