"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { User } from "@/lib/constants";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<User | null>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const DEMO_USERS: (User & { password: string })[] = [
    { id: "admin-1", name: "Admin", email: "admin@grandlumiere.com", role: "admin", password: "admin123" },
    { id: "user-1", name: "Demo User", email: "user@demo.com", role: "user", password: "user123" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem("banquet_user");
        if (stored) {
            try {
                setUser(JSON.parse(stored));
            } catch {
                localStorage.removeItem("banquet_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<User | null> => {
        const found = DEMO_USERS.find((u) => u.email === email && u.password === password);
        if (found) {
            const userData: User = { id: found.id, name: found.name, email: found.email, role: found.role };
            setUser(userData);
            localStorage.setItem("banquet_user", JSON.stringify(userData));
            return userData;
        }
        // Check localStorage for registered users
        const registeredUsers = JSON.parse(localStorage.getItem("banquet_registered_users") || "[]");
        const registered = registeredUsers.find(
            (u: User & { password: string }) => u.email === email && u.password === password
        );
        if (registered) {
            const userData: User = { id: registered.id, name: registered.name, email: registered.email, role: registered.role };
            setUser(userData);
            localStorage.setItem("banquet_user", JSON.stringify(userData));
            return userData;
        }
        return null;
    }, []);

    const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
        const allUsers = [...DEMO_USERS, ...JSON.parse(localStorage.getItem("banquet_registered_users") || "[]")];
        if (allUsers.find((u) => u.email === email)) {
            return false;
        }
        const newUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            role: "user" as const,
            password,
        };
        const registeredUsers = JSON.parse(localStorage.getItem("banquet_registered_users") || "[]");
        registeredUsers.push(newUser);
        localStorage.setItem("banquet_registered_users", JSON.stringify(registeredUsers));
        const userData: User = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
        setUser(userData);
        localStorage.setItem("banquet_user", JSON.stringify(userData));
        return true;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem("banquet_user");
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, isAdmin: user?.role === "admin" }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}
