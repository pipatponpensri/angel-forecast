import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState, } from 'react';
import { supabase } from '../lib/supabase';
const AuthContext = createContext({
    loading: true,
    session: null,
    user: null,
    profile: null,
    async signIn() {
        return {};
    },
    async signUp() {
        return {};
    },
    async signOut() { },
    async refreshProfile() { },
});
export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        const init = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        };
        init();
        const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
            setSession(sess);
            setUser(sess?.user ?? null);
        });
        return () => sub.subscription.unsubscribe();
    }, []);
    useEffect(() => {
        if (!user?.id) {
            setProfile(null);
            return;
        }
        (async () => {
            await fetchProfile();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);
    async function fetchProfile() {
        if (!user?.id)
            return;
        const { data, error } = await supabase
            .from('profiles')
            .select('id, username, role, created_at')
            .eq('id', user.id)
            .single();
        if (!error)
            setProfile(data);
    }
    async function signIn(email, password) {
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error)
            return { error: error.message };
        await fetchProfile();
        return {};
    }
    async function signUp(email, password) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error)
            return { error: error.message };
        const needsEmailConfirm = !data.user || !data.session; // ถ้าเปิดยืนยันอีเมล
        if (!needsEmailConfirm)
            await fetchProfile();
        return { needsEmailConfirm };
    }
    async function signOut() {
        await supabase.auth.signOut();
        setProfile(null);
    }
    const value = {
        loading,
        session,
        user,
        profile,
        signIn,
        signUp,
        signOut,
        refreshProfile: fetchProfile,
    };
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    return useContext(AuthContext);
}
