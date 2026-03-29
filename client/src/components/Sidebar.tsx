import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    LayoutDashboard, 
    BookOpen, 
    Calendar, 
    ClipboardList, 
    Users, 
    LogOut, 
    Library,
    HeartHandshake,
    Wallet,
    Bell,
    Settings,
    ShieldCheck
} from 'lucide-react';

interface SidebarProps {
    role: 'Admin' | 'Student' | 'Faculty' | 'Accountant';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const menuItems = {
        Admin: [
            { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin/dashboard' },
            { icon: <Users size={20} />, label: 'Students', path: '/admin/students' },
            { icon: <Users size={20} />, label: 'Faculty', path: '/admin/faculty' },
            { icon: <Wallet size={20} />, label: 'Finance', path: '/admin/finance' },
            { icon: <Library size={20} />, label: 'Library', path: '/admin/library' },
            { icon: <Settings size={20} />, label: 'System Settings', path: '/admin/settings' },
        ],
        Student: [
            { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
            { icon: <BookOpen size={20} />, label: 'My Courses', path: '/student/courses' },
            { icon: <Calendar size={20} />, label: 'Routine', path: '/student/routine' },
            { icon: <ClipboardList size={20} />, label: 'Results', path: '/student/results' },
            { icon: <Wallet size={20} />, label: 'Fees & Billing', path: '/student/billing' },
            { icon: <Library size={20} />, label: 'Library', path: '/student/library' },
        ],
        Faculty: [
             { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/faculty/dashboard' },
             { icon: <BookOpen size={20} />, label: 'My Courses', path: '/faculty/courses' },
             { icon: <Calendar size={20} />, label: 'Schedule', path: '/faculty/schedule' },
             { icon: <ClipboardList size={20} />, label: 'Examination', path: '/faculty/exams' },
             { icon: <Users size={20} />, label: 'Students', path: '/faculty/students' },
        ],
        Accountant: [
            { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/finance/dashboard' },
            { icon: <Wallet size={20} />, label: 'Student Billing', path: '/finance/billing' },
            { icon: <ClipboardList size={20} />, label: 'Payroll', path: '/finance/payroll' },
            { icon: <HeartHandshake size={20} />, label: 'Grants', path: '/finance/grants' },
        ]
    };

    const currentMenu = menuItems[role] || [];

    return (
        <aside className="w-72 bg-navy-900 h-screen fixed left-0 top-0 flex flex-col text-white/70 font-medium overflow-hidden z-50">
            {/* Logo Section */}
            <div className="p-8 pb-12 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-navy-900 shadow-lg shadow-white/10">
                    <ShieldCheck size={24} />
                </div>
                <span className="text-2xl font-black text-white tracking-tight">IUMS{role === 'Admin' ? ' Admin' : role === 'Accountant' ? ' Finance' : ''}</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-1">
                {currentMenu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group
                            ${isActive 
                                ? 'bg-white/10 text-white shadow-xl shadow-black/20' 
                                : 'hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                        <span className="text-sm font-bold tracking-wide">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User Profile Section */}
            <div className="p-6 mt-6 border-t border-white/5 bg-navy-950/50">
                <div className="flex items-center gap-4 mb-6">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user?.name}&background=1e3a8a&color=fff&bold=true`} 
                        alt="Profile" 
                        className="w-12 h-12 rounded-2xl border-2 border-white/10 shadow-lg"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-white truncate">{user?.name || 'Loading...'}</p>
                        <p className="text-[10px] uppercase font-black tracking-widest text-navy-400">{user?.role?.name || role}</p>
                    </div>
                </div>
                
                <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all font-bold text-xs"
                >
                    <LogOut size={16} /> Sign Out System
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
