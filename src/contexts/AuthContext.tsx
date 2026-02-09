"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/firebase/firebase.config";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
    User,
    UserCredential,
} from "firebase/auth";
import { AuthContextType } from "@/types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const provider = new GoogleAuthProvider();

    const registerUser = (email: string, password: string): Promise<UserCredential> => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (updateData: { displayName?: string; photoURL?: string }): Promise<void> => {
        if (!auth.currentUser) {
            return Promise.reject(new Error("No user logged in"));
        }
        return updateProfile(auth.currentUser, updateData);
    };

    const loginUser = (email: string, password: string): Promise<UserCredential> => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const googleLogin = (): Promise<UserCredential> => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const logoutUser = async (): Promise<void> => {
        return signOut(auth).finally(() => setLoading(false));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const userInfo: AuthContextType = {
        user,
        setUser,
        loading,
        setLoading,
        registerUser,
        updateUser,
        loginUser,
        googleLogin,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={userInfo}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
