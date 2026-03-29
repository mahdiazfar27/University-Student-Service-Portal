import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { 
    Users, 
    BookCheck, 
    ShieldCheck, 
    Bell, 
    Settings, 
    Calendar, 
    LogOut,
    Plus,
    FileText,
    TrendingUp,
    Wallet,
    TrendingDown,
    Activity,
    Search,
    ChevronRight,
    ArrowUpRight,
    ArrowRight,
    ArrowDownRight,
    MoreHorizontal
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <Layout title="University Overview" breadcrumbs={['Settings', 'Admin Dashboard']}>
            {/* Top Bar Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                <AdminStatCard 
                    label="Total Students" 
                    value="12,458" 
                    trend="+12.5%" 
                    sub="vs last month" 
                    icon={<Users size={24}/>} 
                    positive 
                />
                <AdminStatCard 
                    label="Total Teachers" 
                    value="842" 
                    trend="Stable" 
                    sub="no recent change" 
                    icon={<UserGraduate size={24}/>} 
                />
                <AdminStatCard 
                    label="Total Revenue" 
                    value="$4.2M" 
                    trend="+5.2%" 
                    sub="vs target" 
                    icon={<Wallet size={24}/>} 
                    positive 
                />
                <AdminStatCard 
                    label="Active Sessions" 
                    value="2,109" 
                    trend="-2.1%" 
                    sub="off-peak hour" 
                    icon={<Activity size={24}/>} 
                    negative 
                />
            </div>

            {/* Middle Section - Trends & Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mb-16">
                {/* Enrollment Trends */}
                <div className="xl:col-span-2 premium-card p-12 space-y-12 h-full">
                    <div className="flex justify-between items-end">
                        <div className="space-y-2">
                             <h3 className="text-2xl font-black text-navy-900 tracking-tight">Student Enrollment Trends</h3>
                             <p className="text-slate-400 font-medium text-sm">Monthly institutional growth analysis.</p>
                        </div>
                        <select className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:ring-4 focus:ring-navy-100 transition-all cursor-pointer">
                             <option>Current Year</option>
                             <option>Last Year</option>
                        </select>
                    </div>
                    
                    {/* Simulated Bar Chart */}
                    <div className="flex items-end justify-between h-80 pt-10 gap-4 xl:gap-8 px-4 border-b border-slate-50 relative">
                         <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-black text-slate-200 tracking-widest uppercase py-4">
                             <span>100k</span>
                             <span>75k</span>
                             <span>50k</span>
                             <span>25k</span>
                             <span>0</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4">
                             <div className="w-full bg-slate-100 rounded-t-2xl h-1/3 hover:bg-navy-900 transition-all duration-500 cursor-pointer"></div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter text-center">Jan</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4">
                             <div className="w-full bg-slate-100 rounded-t-2xl h-1/2 hover:bg-navy-900 transition-all duration-500 cursor-pointer"></div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter text-center">Feb</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4">
                             <div className="w-full bg-slate-100 rounded-t-2xl h-2/5 hover:bg-navy-900 transition-all duration-500 cursor-pointer"></div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter text-center">Mar</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4 relative">
                             <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-navy-900 text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-xl shadow-navy-900/40">2.9k</div>
                             <div className="w-full bg-navy-900 rounded-t-2xl h-4/5 shadow-2xl shadow-navy-900/20"></div>
                             <span className="text-[10px] font-black text-navy-900 uppercase tracking-tighter text-center">Apr</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4">
                             <div className="w-full bg-slate-100 rounded-t-2xl h-1/2 hover:bg-navy-900 transition-all duration-500 cursor-pointer"></div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter text-center">May</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4">
                             <div className="w-full bg-slate-100 rounded-t-2xl h-3/5 hover:bg-navy-900 transition-all duration-500 cursor-pointer"></div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter text-center">Jun</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4">
                             <div className="w-full bg-slate-100 rounded-t-2xl h-1/2 hover:bg-navy-900 transition-all duration-500 cursor-pointer"></div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter text-center">Jul</span>
                         </div>
                         <div className="flex-1 flex flex-col-reverse gap-4">
                             <div className="w-full bg-slate-100 rounded-t-2xl h-3/5 hover:bg-navy-900 transition-all duration-500 cursor-pointer"></div>
                             <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter text-center">Aug</span>
                         </div>
                    </div>
                </div>

                {/* Revenue Status */}
                <div className="premium-card p-12 space-y-12">
                     <div className="flex justify-between items-start">
                         <h3 className="text-2xl font-black text-navy-900 tracking-tight">Revenue Trends</h3>
                         <button className="p-3 text-slate-300 hover:text-navy-900 transition-colors"><MoreHorizontal size={20}/></button>
                     </div>
                     
                     {/* Simulated Line Chart Area */}
                     <div className="h-64 flex items-center justify-center relative bg-slate-50/50 rounded-[32px] border border-slate-100 group">
                          <svg className="w-full h-full p-4" viewBox="0 0 400 200">
                                <path 
                                    d="M 50 150 Q 150 150 200 100 T 350 50" 
                                    fill="none" 
                                    stroke="url(#grad)" 
                                    strokeWidth="8" 
                                    strokeLinecap="round" 
                                    className="group-hover:stroke-[10px] transition-all duration-1000"
                                />
                                <defs>
                                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" style={{stopColor:'#1e3a8a', stopOpacity: 1}} />
                                        <stop offset="100%" style={{stopColor:'#6366f1', stopOpacity: 1}} />
                                    </linearGradient>
                                </defs>
                          </svg>
                          <div className="absolute right-8 top-12 w-10 h-10 bg-navy-900 text-white rounded-xl flex items-center justify-center shadow-xl shadow-navy-900/40 animate-bounce">
                               <TrendingUp size={20}/>
                          </div>
                     </div>
                     
                     <div className="flex justify-around pt-4">
                         <div className="flex items-center gap-3">
                             <div className="w-3 h-3 rounded-full bg-navy-900"></div>
                             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Gross Income</span>
                         </div>
                         <div className="flex items-center gap-3">
                             <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Expenditure</span>
                         </div>
                     </div>
                </div>
            </div>

            {/* Bottom Section - Logs & Milestones */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* System Audit Log */}
                <div className="xl:col-span-2 premium-card p-12 space-y-12 h-full">
                     <div className="flex justify-between items-end">
                         <h3 className="text-2xl font-black text-navy-900 tracking-tight">System Audit Log</h3>
                         <button className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 hover:underline">
                            View All <ArrowRight size={14} />
                         </button>
                     </div>
                     
                     <div className="overflow-x-auto">
                         <table className="w-full border-separate border-spacing-y-4">
                             <thead>
                                 <tr className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                     <th className="text-left px-4">Action</th>
                                     <th className="text-left px-4">Performed By</th>
                                     <th className="text-left px-4">Target Entity</th>
                                     <th className="text-center px-4">Status</th>
                                     <th className="text-right px-4">Timestamp</th>
                                 </tr>
                             </thead>
                             <tbody className="text-sm font-bold text-slate-900">
                                 <LogEntry 
                                    action="New Student Admission" 
                                    user="John Doe" 
                                    target="ST-2024-0412" 
                                    status="Completed" 
                                    time="2 mins ago" 
                                 />
                                 <LogEntry 
                                    action="Course Curriculum Update" 
                                    user="Dr. Sarah" 
                                    target="CSE-301-MOD" 
                                    status="Pending" 
                                    time="15 mins ago" 
                                    warning
                                 />
                                 <LogEntry 
                                    action="Budget Realignment" 
                                    user="Finance Head" 
                                    target="FY-2024-Q3" 
                                    status="Completed" 
                                    time="1h ago" 
                                 />
                             </tbody>
                         </table>
                     </div>
                </div>

                {/* Upcoming Milestones */}
                <div className="premium-card p-12 space-y-12 h-full">
                    <h3 className="text-2xl font-black text-navy-900 tracking-tight">Upcoming Milestones</h3>
                    <div className="space-y-10">
                         <MilestoneItem date="Oct 15" title="Mid-Semester Exams" sub="Start of Computer Science Dept." />
                         <MilestoneItem date="Oct 18" title="Annual Budget Review" sub="Board of Trustees Meeting" />
                         <MilestoneItem date="Oct 22" title="Convocation Prep" sub="Phase 1 Planning Committee" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const AdminStatCard = ({ label, value, trend, sub, icon, positive, negative }: any) => (
    <div className="premium-card p-10 group hover:bg-navy-900 hover:border-navy-900 hover:translate-y-[-4px] transition-all duration-500">
         <div className="flex justify-between items-start mb-8">
             <div className="space-y-1">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/50">{label}</h4>
                 <div className="text-3xl font-black text-navy-900 group-hover:text-white transition-colors">{value}</div>
             </div>
             <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-white/10 group-hover:text-white transition-all">
                 {icon}
             </div>
         </div>
         <div className="flex items-center gap-3">
             <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black transition-colors ${positive ? 'bg-emerald-50 text-emerald-600' : negative ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-500'} group-hover:bg-white/10 group-hover:text-white`}>
                 {positive ? <ArrowUpRight size={14}/> : negative ? <ArrowDownRight size={14} /> : null} {trend}
             </div>
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white/30 truncate">{sub}</span>
         </div>
    </div>
);

const LogEntry = ({ action, user, target, status, time, warning }: any) => (
    <tr className="group">
        <td className="px-4 py-6 bg-slate-50 border-y border-l border-slate-100 rounded-l-[24px] group-hover:bg-navy-900 transition-all">
             <span className="group-hover:text-white transition-colors uppercase tracking-tight font-black">{action}</span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all">
             <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-[10px] font-black">
                       {user.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <span className="group-hover:text-white/80 transition-colors">{user}</span>
             </div>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all">
             <span className="text-slate-400 group-hover:text-white/50 transition-colors uppercase tracking-widest text-[10px] font-black">{target}</span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 text-center group-hover:bg-navy-900 transition-all">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${warning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'} group-hover:bg-white/10 group-hover:text-white`}>
                {status}
             </span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-r border-slate-100 rounded-r-[24px] text-right group-hover:bg-navy-900 transition-all">
             <span className="text-slate-300 group-hover:text-white/50 transition-colors uppercase tracking-widest text-[10px] font-black">{time}</span>
        </td>
    </tr>
);

const MilestoneItem = ({ date, title, sub }: any) => (
    <div className="flex items-center gap-8 group">
        <div className="flex flex-col items-center justify-center w-20 h-20 bg-slate-50 rounded-[28px] border border-slate-100 group-hover:bg-navy-900 transition-all duration-500 overflow-hidden shadow-lg shadow-slate-100">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-white/30">{date.split(' ')[0]}</span>
             <span className="text-2xl font-black text-navy-900 group-hover:text-white transition-colors">{date.split(' ')[1]}</span>
        </div>
        <div className="space-y-1">
             <h4 className="font-black text-navy-900 text-base tracking-tight group-hover:text-blue-900 transition-colors">{title}</h4>
             <p className="text-slate-400 font-medium text-sm leading-relaxed">{sub}</p>
        </div>
    </div>
);

const UserGraduate = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);

export default AdminDashboard;
