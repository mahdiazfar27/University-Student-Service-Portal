import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { 
    GraduationCap, 
    Calendar, 
    CheckCircle2, 
    Clock, 
    TrendingUp, 
    Bookmark, 
    Library, 
    ArrowRight,
    TrendingDown,
    FileText,
    MoreHorizontal,
    Bell,
    Settings,
    UserCircle2,
    CalendarCheck,
    ShieldCheck,
    Pencil
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <Layout title="Dashboard Overview" breadcrumbs={['Home', 'Student Dashboard']}>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                
                {/* Left Column - Profile & Quick Stats (8 cols) */}
                <div className="xl:col-span-8 space-y-10">
                    {/* Welcome Profile Card */}
                    <div className="premium-card p-12 relative flex flex-col md:flex-row items-center gap-10 group overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-navy-900/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-navy-900/10 transition-colors duration-700"></div>
                        
                        <div className="relative">
                            <img 
                                src={`https://ui-avatars.com/api/?name=${user?.name}&background=1e3a8a&color=fff&bold=true&size=128`} 
                                className="w-40 h-40 rounded-[48px] border-8 border-slate-50 shadow-2xl shadow-navy-900/10 object-cover" 
                                alt="Profile"
                            />
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center text-white">
                                <CheckCircle2 size={16} />
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <h2 className="text-5xl font-black text-navy-900 tracking-tight">Good morning, {user?.name?.split(' ')[0]}!</h2>
                            <p className="text-slate-500 font-medium italic leading-relaxed max-w-lg">
                                "Education is the most powerful weapon which you can use to change the world."
                            </p>
                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                <span className="px-4 py-2 bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-widest rounded-xl border border-blue-100">B.Sc. Computer Science</span>
                                <span className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-100">Semester 7</span>
                                <span className="px-4 py-2 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100">Regular Student</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                             <button className="flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-2xl font-black text-xs hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/10">
                                <FileText size={16}/> Print ID Card
                             </button>
                             <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-slate-500 rounded-2xl font-black text-xs hover:bg-slate-200 transition-all">
                                <Pencil size={16}/> Edit Profile
                             </button>
                        </div>
                    </div>

                    {/* Quick Insight Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                         <div className="premium-card p-10 flex flex-col items-center gap-4 text-center group">
                            <div className="w-16 h-16 rounded-full border-8 border-indigo-50 border-t-indigo-500 flex items-center justify-center relative group-hover:scale-110 transition-transform duration-500">
                                <span className="text-sm font-black text-navy-900">3.82</span>
                            </div>
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cumulative GPA</h4>
                                <p className="text-sm font-bold text-slate-500 mt-1">out of 4.0</p>
                            </div>
                         </div>

                         <div className="premium-card p-10 flex flex-col items-center gap-4 text-center group">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <CalendarCheck size={28} />
                            </div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black text-navy-900">92%</div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Overall Attendance</h4>
                                <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-4 mx-auto overflow-hidden">
                                     <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                         </div>

                         <div className="premium-card p-10 flex flex-col items-center gap-4 text-center group">
                             <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-3xl flex items-center justify-center group-hover:-rotate-12 transition-transform">
                                <GraduationCap size={28} />
                             </div>
                             <div className="space-y-1">
                                <div className="text-3xl font-black text-navy-900">84 <span className="text-xs text-slate-300 font-bold">/ 140</span></div>
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Credits Earned</h4>
                                <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-4 mx-auto overflow-hidden">
                                     <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                                </div>
                             </div>
                         </div>
                    </div>

                    {/* Current Semester Courses */}
                    <div className="space-y-8">
                        <div className="flex justify-between items-end">
                            <h3 className="text-2xl font-black text-navy-900">Current Semester Courses</h3>
                            <Link to="/student/courses" className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2 hover:underline">
                                View All Courses <ArrowRight size={14} />
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <CourseCard code="CSE-301" title="Database Management Systems" progress={75} icon={<Database size={20}/>} />
                            <CourseCard code="CSE-305" title="Algorithms & Complexity" progress={42} icon={<Bookmark size={20}/>} />
                            <CourseCard code="MATH-311" title="Linear Algebra II" progress={90} icon={<CheckCircle2 size={20}/>} />
                            <CourseCard code="HUM-202" title="Ethics & Professionalism" progress={60} icon={<ShieldCheck size={20}/>} />
                        </div>
                    </div>
                </div>

                {/* Right Column - Routine & Sidebar Info (4 cols) */}
                <div className="xl:col-span-4 space-y-10">
                    {/* Academic Standing Card */}
                    <div className="bg-navy-900 p-10 rounded-[48px] text-white relative overflow-hidden group shadow-2xl shadow-navy-900/20">
                         <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-12 translate-y-12 blur-3xl group-hover:bg-white/10 transition-colors"></div>
                         <div className="relative z-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-white/50">Academic Standing</h4>
                                    <p className="text-sm font-bold mt-1 text-white/80">Academic Year 2024</p>
                                </div>
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                                     <TrendingUp size={24} className="text-emerald-400" />
                                </div>
                            </div>
                            
                            <div>
                                <h1 className="text-5xl font-black leading-tight">Excellent</h1>
                                <p className="text-emerald-400 font-bold mt-2">Top 5% of Department</p>
                            </div>
                         </div>
                    </div>

                    {/* Today's Routine */}
                    <div className="premium-card p-10 space-y-10">
                        <div className="flex justify-between items-end">
                            <h3 className="text-2xl font-black text-navy-900 tracking-tight">Today's Routine</h3>
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Oct 24, 2024</p>
                        </div>
                        
                        <div className="space-y-8 relative before:absolute before:left-[1.85rem] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
                             <RoutineItem time="09:00 AM" label="Database Systems" room="Room 402" faculty="Prof. Sarah Jenkins" active />
                             <RoutineItem time="11:30 AM" label="Linear Algebra II" room="Lecture Hall B" faculty="Dr. Alan Turing" />
                             <RoutineItem time="01:00 PM" label="Lunch Break" room="University Cafeteria" isBreak />
                        </div>
                    </div>

                    {/* Upcoming Deadlines */}
                    <div className="premium-card p-10 space-y-10">
                        <h3 className="text-2xl font-black text-navy-900 tracking-tight">Upcoming Deadlines</h3>
                        <div className="space-y-8">
                             <DeadlineItem title="DBMS Assignment 3" date="Due in 2 hours" urgent />
                             <DeadlineItem title="Algorithm Quiz Prep" date="Due tomorrow" />
                        </div>
                        <button className="w-full py-4 bg-slate-50 text-navy-900 font-black text-xs uppercase tracking-widest rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors">View All Deadlines</button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const CourseCard = ({ code, title, progress, icon }: any) => (
    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
        <div className="flex justify-between items-start mb-8">
            <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest group-hover:text-blue-900 transition-colors">{code}</span>
                <h4 className="text-xl font-black text-navy-900 leading-tight group-hover:text-blue-900 transition-colors h-14 line-clamp-2">{title}</h4>
            </div>
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-900 transition-all">
                {icon}
            </div>
        </div>
        
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Syllabus Coverage</span>
                <span className="text-sm font-black text-navy-900">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-navy-900 rounded-full transition-all duration-1000 group-hover:origin-left" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-between">
            <button className="px-6 py-3 bg-slate-50 text-slate-500 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">Course Materials</button>
            <button className="p-3 bg-slate-50 text-slate-300 rounded-xl hover:text-navy-900 transition-colors">
                <MoreHorizontal size={16} />
            </button>
        </div>
    </div>
);

const RoutineItem = ({ time, label, room, faculty, active, isBreak }: any) => (
    <div className="flex gap-8 relative">
        <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-xs font-black leading-tight text-center ${active ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/20' : 'bg-white text-slate-400 border border-slate-100'}`}>
            {time.split(' ')[0]}<br/>{time.split(' ')[1]}
        </div>
        <div className="flex-1 pt-1">
            <h4 className={`font-black text-sm tracking-tight ${active ? 'text-navy-900' : 'text-slate-500'}`}>{label}</h4>
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-1">
                {isBreak ? 'University Cafeteria' : `${room} • ${faculty}`}
            </p>
        </div>
    </div>
);

const DeadlineItem = ({ title, date, urgent }: any) => (
    <div className="flex items-start gap-5">
        <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${urgent ? 'bg-rose-500 shadow-lg shadow-rose-200 animate-pulse' : 'bg-amber-500'}`}></div>
        <div className="space-y-1">
            <h4 className="font-black text-slate-900 text-sm tracking-tight">{title}</h4>
            <p className={`text-[10px] font-black uppercase tracking-widest ${urgent ? 'text-rose-500' : 'text-slate-300'}`}>{date}</p>
        </div>
    </div>
);

const Database = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
);

export default StudentDashboard;
