import React from 'react';
import Layout from '../components/Layout';
import { 
    Wallet, 
    ArrowUpRight, 
    ArrowDownRight, 
    Download, 
    Plus, 
    MoreHorizontal, 
    Search, 
    Filter, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    TrendingUp, 
    FileText,
    Activity,
    Users as UsersIcon,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

const FinanceDashboard: React.FC = () => {
    return (
        <Layout title="Accountant Financial Dashboard" breadcrumbs={['Finance', 'Dashboard Overview']}>
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <FinanceStatCard 
                    label="Total Fees Collected" 
                    value="$2,485,300" 
                    trend="+12.5%" 
                    sub="this semester" 
                    icon={<Wallet className="text-blue-500" size={24}/>} 
                    progress={78}
                    progressLabel="78% of target revenue achieved"
                    positive
                />
                <FinanceStatCard 
                    label="Pending Payments" 
                    value="$412,850" 
                    sub="outstanding" 
                    icon={<Clock className="text-amber-500" size={24}/>} 
                    details={[
                        { label: 'TUITION', value: '$380k' },
                        { label: 'SERVICES', value: '$32.8k' }
                    ]}
                    badge="142 Students"
                />
                <FinanceStatCard 
                    label="Overdue Revenue" 
                    value="$89,200" 
                    sub="past deadline" 
                    icon={<AlertCircle className="text-rose-500" size={24}/>} 
                    urgent
                    urgentMsg="Follow-up required for 24 accounts overdue by 30+ days."
                    badge="Critical"
                />
            </div>

            {/* Main Action Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
                <div className="flex-1 w-full md:w-auto relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-navy-900 transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search by Student Name, ID, or Receipt #..."
                        className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[32px] text-sm font-bold shadow-sm shadow-slate-200/50 focus:ring-4 focus:ring-navy-100 transition-all outline-none"
                    />
                </div>
                
                <div className="flex items-center gap-4">
                    <FilterBtn label="All Departments" />
                    <FilterBtn label="This Month" />
                    <button className="p-4 bg-slate-100/50 rounded-2xl text-slate-400 hover:bg-white hover:text-navy-900 shadow-sm transition-all"><Filter size={20}/></button>
                    <div className="w-[1px] h-10 bg-slate-200 mx-2"></div>
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all">
                        <Download size={16}/> Excel
                    </button>
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-slate-200/50 hover:bg-slate-50 transition-all">
                        <FileText size={16}/> PDF
                    </button>
                    <button className="flex items-center gap-3 px-8 py-4 bg-navy-900 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-2xl shadow-navy-900/20 hover:bg-navy-800 transition-all group active:scale-95">
                        <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Generate Invoice
                    </button>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="premium-card p-12 space-y-12">
                 <div className="flex justify-between items-end">
                      <h3 className="text-2xl font-black text-navy-900 tracking-tight">Recent Transactions</h3>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Showing 10 of 1,240</p>
                 </div>
                 
                 <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-4">
                        <thead className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                            <tr>
                                <th className="text-left px-8">Transaction ID</th>
                                <th className="text-left px-4">Student</th>
                                <th className="text-left px-4">Category</th>
                                <th className="text-left px-4">Date</th>
                                <th className="text-right px-4">Amount</th>
                                <th className="text-center px-4">Status</th>
                                <th className="text-right px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <TransactionRow 
                                id="#TXN-90421" 
                                student="John Doe" 
                                studentId="2023-CS-001" 
                                cat="Tuition Fee" 
                                date="Oct 24, 2023" 
                                amount="$4,250.00" 
                                status="PAID" 
                                initials="JD" 
                                color="bg-indigo-50"
                            />
                            <TransactionRow 
                                id="#TXN-90422" 
                                student="Alice Smith" 
                                studentId="2023-BA-045" 
                                cat="Library Dues" 
                                date="Oct 23, 2023" 
                                amount="$45.00" 
                                status="PENDING" 
                                initials="AS" 
                                color="bg-blue-50"
                            />
                            <TransactionRow 
                                id="#TXN-90423" 
                                student="Michael Brown" 
                                studentId="2022-EN-112" 
                                cat="Late Enrollment" 
                                date="Oct 20, 2023" 
                                amount="$1,200.00" 
                                status="OVERDUE" 
                                initials="MB" 
                                color="bg-slate-50"
                            />
                            <TransactionRow 
                                id="#TXN-90424" 
                                student="Sarah Johnson" 
                                studentId="2023-CS-088" 
                                cat="Lab Usage Fee" 
                                date="Oct 19, 2023" 
                                amount="$250.00" 
                                status="PAID" 
                                initials="SJ" 
                                color="bg-indigo-50"
                            />
                            <TransactionRow 
                                id="#TXN-90425" 
                                student="Robert White" 
                                studentId="2022-LA-021" 
                                cat="Examination Fee" 
                                date="Oct 18, 2023" 
                                amount="$120.00" 
                                status="PENDING" 
                                initials="RW" 
                                color="bg-blue-50"
                            />
                        </tbody>
                    </table>
                 </div>

                 {/* Pagination */}
                 <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                      <button className="px-8 py-4 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-400 hover:bg-slate-50 hover:text-navy-900 transition-all">Previous</button>
                      <div className="flex items-center gap-4">
                           <PageNum num={1} active />
                           <PageNum num={2} />
                           <PageNum num={3} />
                           <PageNum num="..." />
                           <PageNum num={124} />
                      </div>
                      <button className="px-8 py-4 bg-white border border-slate-100 rounded-2xl font-black text-xs text-slate-400 hover:bg-slate-50 hover:text-navy-900 transition-all">Next</button>
                 </div>
            </div>

            {/* Bottom Insights */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 mt-12">
                 {/* Revenue by Department */}
                 <div className="xl:col-span-2 premium-card p-12 space-y-10">
                      <div className="flex justify-between items-center">
                           <h3 className="text-2xl font-black text-navy-900 tracking-tight">Revenue by Department</h3>
                           <button className="text-xs font-black text-blue-900 uppercase tracking-widest hover:underline">View Full Report</button>
                      </div>
                      <div className="space-y-8">
                           <DepRevenue label="Computer Science" value="$1.2M" progress={85} />
                           <DepRevenue label="Engineering" value="$0.9M" progress={65} />
                           <DepRevenue label="Business Admin" value="$0.3M" progress={30} />
                      </div>
                 </div>

                 {/* Action Items */}
                 <div className="premium-card p-12 space-y-12 h-full">
                      <h3 className="text-2xl font-black text-navy-900 tracking-tight">Action Items</h3>
                      <div className="space-y-12">
                           <ActionItem 
                                icon={<CheckCircle2 className="text-emerald-500" size={24}/>} 
                                title="Verify Audit Trail" 
                                desc="Quarterly audit for fiscal year 2023-24 is due tomorrow."
                                color="bg-emerald-50"
                           />
                           <ActionItem 
                                icon={<Activity className="text-indigo-500" size={24}/>} 
                                title="Automated Reminders" 
                                desc="Scheduled to send 142 overdue notices at 5:00 PM."
                                color="bg-indigo-50"
                           />
                      </div>
                 </div>
            </div>
        </Layout>
    );
};

const FinanceStatCard = ({ label, value, trend, sub, icon, progress, progressLabel, details, badge, urgent, urgentMsg, positive }: any) => (
    <div className={`premium-card p-12 flex flex-col gap-10 relative group ${urgent ? 'border-rose-100 shadow-rose-200/20' : ''}`}>
         {urgent && <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>}
         
         <div className="flex justify-between items-start">
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-navy-900 group-hover:text-white transition-all duration-500">
                   {icon}
              </div>
              {trend && <span className="text-[10px] font-black text-emerald-500 flex items-center gap-1"><ArrowUpRight size={14}/> {trend}</span>}
              {badge && <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${urgent ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>{badge}</span>}
         </div>

         <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{label}</h4>
              <div className={`text-4xl font-black tracking-tight ${urgent ? 'text-rose-600' : 'text-navy-900'}`}>{value} <span className="text-sm text-slate-400 font-bold">{sub}</span></div>
         </div>

         {progress && (
             <div className="space-y-4">
                  <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                       <div className="h-full bg-navy-900 rounded-full" style={{ width: `${progress}%` }}></div>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{progressLabel}</p>
             </div>
         )}

         {details && (
             <div className="flex gap-8 border-t border-slate-50 pt-8 mt-auto">
                  {details.map((d: any) => (
                      <div key={d.label}>
                           <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-1">{d.label}</h5>
                           <p className="text-sm font-black text-navy-900">{d.value}</p>
                      </div>
                  ))}
             </div>
         )}

         {urgentMsg && (
             <p className="text-[10px] font-medium text-slate-400 leading-relaxed italic border-t border-slate-50 pt-8 mt-auto">{urgentMsg}</p>
         )}
    </div>
);

const TransactionRow = ({ id, student, studentId, cat, date, amount, status, initials, color }: any) => (
    <tr className="group">
        <td className="px-8 py-6 bg-slate-50 border-y border-l border-slate-100 rounded-l-[32px] group-hover:bg-navy-900 transition-all">
             <span className="text-xs font-black text-navy-900 group-hover:text-white/30 transition-colors uppercase tracking-widest">{id}</span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all">
             <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-[10px] font-black text-navy-900 group-hover:bg-white group-hover:border-2 group-hover:border-white/20 transition-all`}>
                       {initials}
                  </div>
                  <div>
                       <p className="text-sm font-black text-navy-900 group-hover:text-white transition-colors">{student}</p>
                       <p className="text-[9px] font-black text-slate-300 group-hover:text-white/40 transition-colors uppercase tracking-widest">{studentId}</p>
                  </div>
             </div>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-xs font-bold text-slate-500 group-hover:text-white/60">
             {cat}
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-xs font-bold text-slate-500 group-hover:text-white/60">
             {date}
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-right group-hover:text-white transition-colors">
             <span className="text-sm font-black tracking-tight">{amount}</span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-center">
             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : status === 'PENDING' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'} group-hover:bg-white/10 group-hover:text-white`}>
                {status}
             </span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-r border-slate-100 rounded-r-[32px] group-hover:bg-navy-900 transition-all text-right">
             <button className="p-3 text-slate-300 hover:text-navy-900 group-hover:text-white transition-colors"><MoreHorizontal size={20}/></button>
        </td>
    </tr>
);

const FilterBtn = ({ label }: any) => (
    <button className="flex items-center gap-4 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm hover:bg-slate-50 transition-all">
         {label} <ChevronDown size={14} className="text-slate-300" />
    </button>
);

const PageNum = ({ num, active }: any) => (
    <button className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black transition-all ${active ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/20' : 'bg-white text-slate-400 hover:bg-slate-50 hover:text-navy-900'}`}>
        {num}
    </button>
);

const DepRevenue = ({ label, value, progress }: any) => (
    <div className="space-y-4">
        <div className="flex justify-between items-end">
             <h5 className="text-sm font-black text-navy-900 tracking-tight">{label}</h5>
             <span className="text-xs font-black text-slate-400">{value}</span>
        </div>
        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
             <div className="h-full bg-navy-900 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
    </div>
);

const ActionItem = ({ icon, title, desc, color }: any) => (
    <div className="flex items-start gap-8 group cursor-pointer">
         <div className={`w-16 h-16 ${color} rounded-[24px] flex items-center justify-center shrink-0 border border-transparent group-hover:border-navy-900/10 transition-all shadow-xl shadow-slate-100`}>
              {icon}
         </div>
         <div className="space-y-1">
              <h4 className="text-base font-black text-navy-900 tracking-tight group-hover:text-blue-900 transition-colors">{title}</h4>
              <p className="text-sm font-medium text-slate-400 leading-relaxed">{desc}</p>
         </div>
    </div>
);

const ChevronDown = ({ size, className }: any) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

export default FinanceDashboard;
