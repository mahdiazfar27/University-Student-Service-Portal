import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    breadcrumbs?: string[];
}

const Layout: React.FC<LayoutProps> = ({ children, title, breadcrumbs }) => {
    const { user, loading } = useAuth();
    
    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
            <div className="flex flex-col items-center gap-6">
                <div className="w-16 h-16 border-4 border-navy-900 border-t-transparent rounded-full animate-spin shadow-2xl shadow-navy-900/10"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-navy-900/30 animate-pulse">Initializing Secure Session</p>
            </div>
        </div>
    );
    
    // Default to 'Student' if role is not set, or mapping if necessary
    const roleMap: Record<string, 'Admin' | 'Student' | 'Faculty' | 'Accountant'> = {
        'Admin': 'Admin',
        'Student': 'Student',
        'Faculty': 'Faculty',
        'Accountant': 'Accountant'
    };
    
    const role = roleMap[user?.role?.name || 'Student'] || 'Student';
    
    if (!user && !title.includes('Dashboard')) {
        // Allow rendering if user is not loaded yet but it's not a dashboard-only view
    }

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans selection:bg-navy-100 selection:text-navy-900">
            {/* Unified Sidebar */}
            <Sidebar role={role} />

            {/* Main Content Area */}
            <div className="flex-1 ml-72 flex flex-col min-w-0">
                {/* Unified Header */}
                <Header title={title} breadcrumbs={breadcrumbs} />

                {/* Content View */}
                <main className="p-16 flex-1 bg-gradient-to-br from-transparent to-slate-100/50">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {children}
                    </div>
                </main>

                {/* Institutional Footer */}
                <footer className="px-16 py-8 border-t border-slate-200 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        © 2024 Integrated University Management System (IUMS) • Version 4.2.1-stable
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
