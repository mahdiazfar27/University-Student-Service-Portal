import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
    Search, 
    Filter, 
    Plus, 
    Download, 
    MoreHorizontal, 
    Edit2, 
    Trash2, 
    ChevronLeft, 
    ChevronRight,
    Users,
    ShieldCheck,
    Activity,
    UserCircle2,
    CheckCircle2,
    XCircle,
    AlertCircle
} from 'lucide-react';

const UserManagement: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <Layout title="User Management" breadcrumbs={['Settings', 'User Management']}>
            <div className="flex flex-col xl:flex-row gap-10">
                
                {/* Left Sidebar - Filters (3 cols) */}
                <div className="xl:w-80 space-y-8">
                    <div className="premium-card p-10 space-y-10">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Search Users</h4>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-navy-900 transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Name, Email or ID..."
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-navy-100 transition-all outline-none"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Department</h4>
                            <div className="space-y-4">
                                <FilterCheckbox label="All Departments" checked />
                                <FilterCheckbox label="Computer Science" />
                                <FilterCheckbox label="Registrar's Office" />
                                <FilterCheckbox label="Finance & Accounts" />
                                <FilterCheckbox label="Human Resources" />
                            </div>
                        </div>

                        <div className="space-y-6 pt-4 border-t border-slate-50">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">User Role</h4>
                            <div className="space-y-4">
                                <FilterRadio label="Super Admin" />
                                <FilterRadio label="Faculty Member" />
                                <FilterRadio label="Staff / Clerk" />
                            </div>
                        </div>

                        <button className="w-full py-4 bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest rounded-2xl border border-slate-100 hover:bg-slate-100 transition-all">
                             Reset All Filters
                        </button>
                    </div>
                </div>

                {/* Right Area - Table & Stats (9 cols) */}
                <div className="flex-1 space-y-10">
                    {/* Header Actions */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                             <h2 className="text-3xl font-black text-navy-900 tracking-tight">System Access Control</h2>
                             <p className="text-slate-400 font-medium text-sm">Manage institutional access, roles, and permissions.</p>
                        </div>
                        <div className="flex gap-4">
                             <button className="flex items-center gap-2 px-6 py-3 bg-white text-navy-900 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all">
                                <Download size={16}/> Export CSV
                             </button>
                             <button className="flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-navy-900/20 hover:bg-navy-800 transition-all group">
                                <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Add New User
                             </button>
                        </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                         <UserStatMini label="Total Users" value="1,284" trend="+12%" icon={<Users size={16}/>} />
                         <UserStatMini label="Admins" value="18" sub="Global" icon={<ShieldCheck size={16}/>} />
                         <UserStatMini label="Active Now" value="42" active icon={<Activity size={16}/>} />
                         <UserStatMini label="System Health" value="99.9%" healthy icon={<Pulse size={16}/>} />
                    </div>

                    {/* User Table Card */}
                    <div className="premium-card p-12 space-y-12">
                         <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-4">
                                <thead className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                    <tr>
                                        <th className="w-10 text-center px-4 pt-1"><input type="checkbox" className="w-4 h-4 rounded border-slate-200" /></th>
                                        <th className="text-left px-8">User Profile</th>
                                        <th className="text-left px-4">Employee ID</th>
                                        <th className="text-left px-4">Department</th>
                                        <th className="text-center px-4">Role</th>
                                        <th className="text-center px-4">Status</th>
                                        <th className="text-right px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <UserRow 
                                        name="Dr. Michael Chen" 
                                        email="m.chen@university.edu" 
                                        id="EMP-2024-001" 
                                        dept="Computer Science" 
                                        role="SUPER ADMIN" 
                                        status="Active" 
                                        img="https://ui-avatars.com/api/?name=Michael+Chen&background=1e3a8a&color=fff&bold=true"
                                    />
                                    <UserRow 
                                        name="Elena Rodriguez" 
                                        email="e.rodriguez@university.edu" 
                                        id="EMP-2024-042" 
                                        dept="Registrar's Office" 
                                        role="STAFF" 
                                        status="Active" 
                                        img="https://ui-avatars.com/api/?name=Elena+Rodriguez&background=indigo&color=fff&bold=true"
                                    />
                                    <UserRow 
                                        name="Prof. James Wilson" 
                                        email="j.wilson@university.edu" 
                                        id="EMP-2023-118" 
                                        dept="Finance & Accounts" 
                                        role="FACULTY" 
                                        status="Inactive" 
                                        img="https://ui-avatars.com/api/?name=James+Wilson&background=slate&color=fff&bold=true"
                                    />
                                    <UserRow 
                                        name="Aisha Khan" 
                                        email="a.khan@university.edu" 
                                        id="EMP-2024-089" 
                                        dept="Human Resources" 
                                        role="STAFF" 
                                        status="Suspended" 
                                        img="https://ui-avatars.com/api/?name=Aisha+Khan&background=rose&color=fff&bold=true"
                                    />
                                </tbody>
                            </table>
                         </div>

                         {/* Table Footer / Pagination */}
                         <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                             <p className="text-xs font-bold text-slate-400">Showing <span className="text-navy-900 font-black">1 to 10</span> of 124 users</p>
                             <div className="flex items-center gap-2">
                                 <PaginationBtn icon={<ChevronLeft size={16}/>} />
                                 <PaginationPage num={1} active />
                                 <PaginationPage num={2} />
                                 <PaginationPage num={3} />
                                 <PaginationPage num="..." />
                                 <PaginationPage num={13} />
                                 <PaginationBtn icon={<ChevronRight size={16}/>} />
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const FilterCheckbox = ({ label, checked }: any) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className={`w-5 h-5 border-2 rounded-lg flex items-center justify-center transition-all ${checked ? 'bg-navy-900 border-navy-900 shadow-lg shadow-navy-100' : 'border-slate-100 group-hover:border-navy-200'}`}>
            {checked && <CheckCircle2 size={12} className="text-white" />}
        </div>
        <span className={`text-xs font-bold ${checked ? 'text-navy-900' : 'text-slate-400 group-hover:text-slate-500'}`}>{label}</span>
    </label>
);

const FilterRadio = ({ label }: any) => (
    <label className="flex items-center gap-3 cursor-pointer group">
        <div className="w-5 h-5 border-2 border-slate-100 rounded-full flex items-center justify-center group-hover:border-navy-200 transition-all">
             <div className="w-2.5 h-2.5 bg-navy-900 rounded-full scale-0 transition-transform group-hover:scale-100 hidden group-active:block"></div>
        </div>
        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-500">{label}</span>
    </label>
);

const UserStatMini = ({ label, value, trend, active, healthy, sub, icon }: any) => (
    <div className="premium-card p-6 flex flex-col gap-4 group">
        <div className="flex justify-between items-start">
             <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</h4>
             <div className="w-8 h-8 bg-slate-50 text-slate-300 rounded-lg flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-all">
                {icon}
             </div>
        </div>
        <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-navy-900">{value}</span>
            {trend && <span className="text-[9px] font-black text-emerald-500">{trend} this month</span>}
            {active && (
                <div className="flex items-center -space-x-2">
                     <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-200"></div>
                     <div className="w-5 h-5 rounded-full border-2 border-white bg-slate-300"></div>
                     <div className="w-5 h-5 rounded-full border-2 border-white bg-navy-900 text-[8px] font-black text-white flex items-center justify-center">+39</div>
                </div>
            )}
            {healthy && <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Operational</span>}
            {sub && <span className="text-[9px] font-bold text-slate-400">{sub}</span>}
        </div>
    </div>
);

const UserRow = ({ name, email, id, dept, role, status, img }: any) => (
    <tr className="group">
        <td className="px-4 py-6 bg-slate-50 border-y border-l border-slate-100 rounded-l-[24px] text-center group-hover:bg-navy-900 transition-all">
             <input type="checkbox" className="w-4 h-4 rounded border-slate-200 cursor-pointer" />
        </td>
        <td className="px-8 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all">
             <div className="flex items-center gap-6">
                  <img src={img} className="w-12 h-12 rounded-[18px] shadow-lg shadow-slate-200 group-hover:border-2 group-hover:border-white/20 transition-all" alt="" />
                  <div className="space-y-0.5">
                       <p className="text-sm font-black text-navy-900 group-hover:text-white transition-colors">{name}</p>
                       <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/50 transition-colors">{email}</p>
                  </div>
             </div>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all">
             <span className="text-xs font-black text-slate-400 group-hover:text-white/40 transition-colors uppercase tracking-widest">{id}</span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-xs font-bold text-slate-500 group-hover:text-white/80">
             {dept}
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-center">
             <span className="px-4 py-1.5 bg-white border border-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-navy-900 shadow-sm group-hover:bg-white/10 group-hover:text-white">
                {role}
             </span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-center">
             <div className="flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500' : status === 'Inactive' ? 'bg-slate-300' : 'bg-rose-500'}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Active' ? 'text-emerald-700' : status === 'Inactive' ? 'text-slate-400' : 'text-rose-700'} group-hover:text-white`}>{status}</span>
             </div>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-r border-slate-100 rounded-r-[24px] group-hover:bg-navy-900 transition-all text-right">
             <div className="flex justify-end items-center gap-2">
                  <button className="p-2.5 text-slate-300 hover:text-navy-900 group-hover:text-white transition-colors"><Edit2 size={16}/></button>
                  <button className="p-2.5 text-slate-300 hover:text-rose-500 group-hover:text-rose-400 transition-colors"><Trash2 size={16}/></button>
                  <button className="p-2.5 text-slate-300 hover:text-navy-900 group-hover:text-white transition-colors"><MoreHorizontal size={16}/></button>
             </div>
        </td>
    </tr>
);

const PaginationBtn = ({ icon }: any) => (
    <button className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-300 hover:text-navy-900 hover:shadow-md transition-all">
        {icon}
    </button>
);

const PaginationPage = ({ num, active }: any) => (
    <button className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${active ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/20' : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-navy-900'}`}>
        {num}
    </button>
);

const Pulse = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);

export default UserManagement;
