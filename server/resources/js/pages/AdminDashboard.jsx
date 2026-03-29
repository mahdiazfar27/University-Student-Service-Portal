import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { logout, user } = useAuth();

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-blue-950 text-white min-h-screen fixed left-0 top-0 flex flex-col p-8">
                <div className="text-2xl font-black mb-12 flex items-center gap-3">
                    <i className="fas fa-university text-blue-400"></i> IUMS Pro
                </div>
                <nav className="flex-1 space-y-2">
                    <SidebarLink icon="th-large" label="Dashboard" active />
                    <SidebarLink icon="user-graduate" label="Students" />
                    <SidebarLink icon="chalkboard-teacher" label="Faculty" />
                    <SidebarLink icon="wallet" label="Finance" />
                    <SidebarLink icon="book" label="Library" />
                    <SidebarLink icon="file-alt" label="Exams" />
                    <SidebarLink icon="chart-line" label="Reports" />
                    <SidebarLink icon="cog" label="System Settings" />
                </nav>
                <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10" alt="Admin" />
                    <div>
                        <p className="font-bold text-sm">Dr. Robert Chen</p>
                        <button onClick={logout} className="text-[10px] font-bold tracking-widest text-blue-400 uppercase hover:text-white transition-colors">Logout</button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-12">
                <header className="flex justify-between items-center mb-12">
                    <div className="relative group">
                        <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors"></i>
                        <input type="text" placeholder="Search student records, faculty..." className="w-[480px] pl-14 pr-8 py-4 bg-white rounded-2xl border-none shadow-sm focus:ring-4 focus:ring-blue-100 transition-all font-medium text-sm" />
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            <i className="fas fa-bell text-slate-400 text-xl cursor-pointer hover:text-slate-600"></i>
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-slate-50 rounded-full"></span>
                        </div>
                        <i className="fas fa-question-circle text-slate-400 text-xl cursor-pointer hover:text-slate-600"></i>
                        <button className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-800 active:scale-95 transition-all">
                            + New Entry
                        </button>
                    </div>
                </header>

                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 mb-2">University Overview</h1>
                    <p className="text-slate-500 font-medium">Welcome back, Admin. Here's what's happening today.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <StatCard label="Total Students" value="12,458" icon="user-graduate" trend="+12.5%" trendType="up" />
                    <StatCard label="Total Teachers" value="842" icon="chalkboard-teacher" trend="Stable" trendType="neutral" />
                    <StatCard label="Total Revenue" value="$4.2M" icon="wallet" trend="+5.2%" trendType="up" />
                    <StatCard label="Active Sessions" value="2,109" icon="signal" trend="-2.1%" trendType="down" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    <div className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                        <div className="flex justify-between items-center mb-10">
                            <h2 className="text-xl font-black">Student Enrollment Trends</h2>
                            <select className="bg-slate-50 border-none rounded-xl text-xs font-bold py-2.5 px-4 focus:ring-4 focus:ring-slate-100 uppercase tracking-widest cursor-pointer">
                                <option>Current Year</option>
                            </select>
                        </div>
                        <div className="h-64 flex items-end gap-6 mb-4">
                            <div className="flex-1 bg-slate-100 h-[40%] rounded-xl"></div>
                            <div className="flex-1 bg-slate-100 h-[60%] rounded-xl"></div>
                            <div className="flex-1 bg-slate-100 h-[50%] rounded-xl"></div>
                            <div className="flex-1 bg-blue-900 h-[90%] rounded-xl shadow-lg shadow-blue-100"></div>
                            <div className="flex-1 bg-slate-100 h-[75%] rounded-xl"></div>
                            <div className="flex-1 bg-slate-100 h-[65%] rounded-xl"></div>
                            <div className="flex-1 bg-slate-100 h-[55%] rounded-xl"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
                        </div>
                    </div>
                    <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                        <h2 className="text-xl font-black mb-10">Revenue Trends</h2>
                        <div className="h-48 border-l-2 border-b-2 border-slate-100 relative mb-8">
                            <svg className="w-full h-full" viewBox="0 0 100 50">
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="rgba(30, 58, 138, 0.2)" />
                                    <stop offset="100%" stopColor="rgba(30, 58, 138, 0)" />
                                </linearGradient>
                                <path fill="url(#chartGradient)" d="M0,50 Q20,30 40,35 T60,20 T80,15 T100,5 L100,50 Z" />
                                <path fill="none" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" d="M0,50 Q20,30 40,35 T60,20 T80,15 T100,5" strokeDasharray="200" strokeDashoffset="0" className="animate-draw-path" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-4">
                            <LegendItem color="bg-blue-900" label="Gross Income" />
                            <LegendItem color="bg-slate-200" label="Expenditure" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-xl font-black">System Audit Log</h2>
                        <button className="text-blue-600 font-black text-xs uppercase tracking-widest hover:text-blue-800 transition-colors">View All Logs</button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50">
                                <th className="pb-6">Action</th>
                                <th className="pb-6">Performed By</th>
                                <th className="pb-6">Target Entity</th>
                                <th className="pb-6">Status</th>
                                <th className="pb-6">Time</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-medium">
                            <tr className="border-b border-slate-50 last:border-0 group hover:bg-slate-50/50 transition-colors">
                                <td className="py-8">New Student Admission</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-[10px]">JD</div>
                                        <span>John Doe</span>
                                    </div>
                                </td>
                                <td className="font-mono text-xs text-slate-400 uppercase">st-2024-0412</td>
                                <td><span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">Completed</span></td>
                                <td className="text-slate-400">2 mins ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active }) => (
    <a href="#" className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm group ${active ? 'bg-blue-900 text-white shadow-xl shadow-black/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
        <i className={`fas fa-${icon} ${active ? 'text-blue-400' : 'group-hover:text-blue-400 transition-colors'}`}></i>
        {label}
    </a>
);

const StatCard = ({ label, value, icon, trend, trendType }) => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center group hover:shadow-xl hover:-translate-y-1 transition-all">
        <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{label}</h3>
            <p className="text-2xl font-black text-slate-900 mb-2">{value}</p>
            <p className={`text-[10px] font-bold ${trendType === 'up' ? 'text-green-500' : trendType === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                <i className={`fas fa-arrow-${trendType === 'up' ? 'up' : 'down'} mr-1`}></i> {trend}
            </p>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-blue-900 group-hover:bg-blue-900 group-hover:text-white transition-all transform group-hover:rotate-12">
            <i className={`fas fa-${icon} text-xl`}></i>
        </div>
    </div>
);

const LegendItem = ({ color, label }) => (
    <div className="flex items-center gap-3">
        <span className={`w-3 h-3 rounded-full ${color}`}></span>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
);

export default AdminDashboard;
