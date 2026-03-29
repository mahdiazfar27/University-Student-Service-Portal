import React from 'react';
import { 
    Bell, 
    Search, 
    Settings, 
    MessageCircle,
    ChevronRight,
    Home
} from 'lucide-react';

interface HeaderProps {
    title: string;
    breadcrumbs?: string[];
}

const Header: React.FC<HeaderProps> = ({ title, breadcrumbs = [] }) => {
    return (
        <header className="flex items-center justify-between px-16 py-8 bg-white/50 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100/50">
            {/* Breadcrumbs & Title */}
            <div className="flex flex-col gap-2">
                <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <Home size={10} className="hover:text-navy-900 cursor-pointer transition-colors" />
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb}>
                            <ChevronRight size={10} />
                            <span className={index === breadcrumbs.length - 1 ? 'text-navy-900' : 'hover:text-navy-900 cursor-pointer transition-colors'}>
                                {crumb}
                            </span>
                        </React.Fragment>
                    ))}
                </nav>
                <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight">{title}</h1>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-8">
                {/* Search Bar */}
                <div className="relative group hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-navy-900 transition-colors w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search student records, faculty, or invoices..."
                        className="w-96 pl-12 pr-6 py-3.5 bg-slate-100/50 border border-slate-200/50 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-navy-100 transition-all outline-none"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <IconButton icon={<MessageCircle size={20} />} />
                    <IconButton icon={<Bell size={20} />} badge />
                    <IconButton icon={<Settings size={20} />} />
                </div>
            </div>
        </header>
    );
};

const IconButton = ({ icon, badge }: { icon: React.ReactNode, badge?: boolean }) => (
    <button className="relative w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm border border-slate-100 text-slate-400 hover:text-navy-900 hover:shadow-md hover:-translate-y-0.5 transition-all">
        {icon}
        {badge && <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>}
    </button>
);

export default Header;
