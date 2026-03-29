import React from 'react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
    const { logout, user } = useAuth();
    const student = user?.student || {};

    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-blue-900 text-white min-h-screen fixed left-0 top-0 flex flex-col p-8">
                <div className="text-2xl font-black mb-12 flex items-center gap-3 lowercase">
                    <i className="fas fa-graduation-cap text-blue-300"></i> iums portal
                </div>
                <nav className="flex-1 space-y-2">
                    <SidebarLink icon="th-large" label="Dashboard" active />
                    <SidebarLink icon="calendar-alt" label="Routine" />
                    <SidebarLink icon="poll-h" label="Results" />
                    <SidebarLink icon="file-invoice-dollar" label="Fees & Billing" />
                    <SidebarLink icon="tasks" label="Assignments" />
                    <SidebarLink icon="book-reader" label="Library" />
                </nav>
                <div className="pt-8 border-t border-white/10">
                    <button onClick={logout} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold text-sm">
                        <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                    <div className="mt-8 flex items-center gap-4 px-2">
                        <img src="https://images.unsplash.com/photo-1519085185750-74071727311c?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/10" alt="Student" />
                        <div>
                            <p className="font-bold text-sm text-white">{user?.name || 'Alex Henderson'}</p>
                            <p className="text-[10px] font-bold tracking-widest text-white/40 uppercase">ID: {student.student_id || '2024-09821'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-12">
                <header className="flex justify-between items-center mb-12">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                        <i className="fas fa-home"></i> Home <i className="fas fa-chevron-right text-[8px]"></i> Dashboard Overview
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="relative cursor-pointer group">
                            <i className="fas fa-bell text-slate-400 text-xl group-hover:text-slate-600 transition-colors"></i>
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-slate-50 rounded-full"></span>
                        </div>
                        <i className="fas fa-cog text-slate-400 text-xl cursor-pointer hover:text-slate-600 transition-colors"></i>
                    </div>
                </header>

                <div className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-100 flex items-center gap-12 mb-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full -translate-y-1/2 translate-x-1/2 -z-0"></div>
                    <img className="w-32 h-32 rounded-[32px] object-cover ring-8 ring-slate-50 relative z-10 group-hover:scale-105 transition-transform" src="https://images.unsplash.com/photo-1519085185750-74071727311c?auto=format&fit=crop&q=80&w=200" alt="Student" />
                    <div className="flex-1 relative z-10">
                        <h1 className="text-4xl font-black text-slate-900 mb-2">Good morning, {user?.name?.split(' ')[0] || 'Alex'}!</h1>
                        <p className="text-slate-400 font-medium italic mb-6">"Education is the most powerful weapon which you can use to change the world."</p>
                        <div className="flex gap-3">
                            <Badge label={student.department || 'B.Sc. Computer Science'} color="bg-blue-100 text-blue-700" />
                            <Badge label={`Semester ${student.semester || 5}`} color="bg-slate-100 text-slate-600" />
                            <Badge label="Regular Student" color="bg-slate-100 text-slate-600" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 relative z-10">
                        <button className="bg-blue-900 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all flex items-center gap-3">
                            <i className="fas fa-print"></i> Print ID Card
                        </button>
                        <button className="bg-slate-50 text-slate-600 px-8 py-4 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-3 border border-slate-100">
                            <i className="fas fa-edit"></i> Edit Profile
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <CircleStat label="Cumulative GPA" value={student.cgpa || "3.82"} sub="out of 4.0" color="#1e3a8a" />
                    <ProgressCard label="Overall Attendance" value={student.attendance_percentage || 92} sub="On Track" color="bg-green-500" />
                    <ProgressCard label="Total Credits Earned" value={Math.round((student.credits_earned / 140) * 100) || 60} rawValue={`${student.credits_earned || 84} / 140`} color="bg-blue-600" />
                    <ProgressCard label="Assignments Pending" value={80} rawValue="04" sub="Due Soon" color="bg-red-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-2xl font-black">Current Semester Courses</h2>
                                <button className="text-blue-600 font-black text-xs uppercase tracking-widest">View All</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <CourseCard code="CSE-301" name="Database Management Systems" progress={75} />
                                <CourseCard code="CSE-305" name="Algorithms & Complexity" progress={42} />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-10">
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-black mb-10">Today's Routine</h2>
                            <div className="space-y-8">
                                <RoutineItem time="09:00 AM" title="Database Systems" sub="Room 402 • Prof. Sarah Jenkins" />
                                <RoutineItem time="11:30 AM" title="Linear Algebra II" sub="Lecture Hall B • Dr. Alan Turing" />
                                <div className="pt-4 flex items-center gap-4 text-slate-300">
                                    <div className="h-px flex-1 bg-slate-100"></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest">01:00 PM LUNCH BREAK</span>
                                    <div className="h-px flex-1 bg-slate-100"></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-black mb-10">Upcoming Deadlines</h2>
                            <div className="space-y-6">
                                <DeadlineItem title="DBMS Assignment 3" time="Due in 2 hours" type="danger" />
                                <DeadlineItem title="Algorithm Quiz Prep" time="Due tomorrow" type="warning" />
                                <button className="w-full py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">View All Deadlines</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const SidebarLink = ({ icon, label, active }) => (
    <a href="#" className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-bold text-sm ${active ? 'bg-white text-blue-900 shadow-xl shadow-black/10' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
        <i className={`fas fa-${icon}`}></i>
        {label}
    </a>
);

const Badge = ({ label, color }) => (
    <span className={`${color} px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest`}>{label}</span>
);

const CircleStat = ({ label, value, sub, color }) => (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col items-center text-center group hover:shadow-xl transition-all">
        <div className="w-24 h-24 rounded-full border-[8px] border-slate-50 flex items-center justify-center mb-6 ring-8 ring-blue-50/30">
            <span className="text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform">{value}</span>
        </div>
        <h3 className="text-xs font-black uppercase tracking-widest mb-1">{label}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
    </div>
);

const ProgressCard = ({ label, value, sub, rawValue, color }) => (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
        <div className="flex justify-between items-end mb-6">
            <span className="text-3xl font-black text-slate-900">{rawValue || `${value}%`}</span>
            {sub && <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${color.replace('bg-', 'bg-').replace('500', '100').replace('600', '100')} ${color.replace('bg-', 'text-').replace('500', '700').replace('600', '700')}`}>{sub}</span>}
        </div>
        <h3 className="text-xs font-black uppercase tracking-widest mb-6">{label}</h3>
        <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden">
            <div className={`h-full ${color} rounded-full group-hover:origin-left transition-all duration-1000`} style={{ width: `${value}%` }}></div>
        </div>
    </div>
);

const CourseCard = ({ code, name, progress }) => (
    <div className="p-8 rounded-3xl border border-slate-50 bg-slate-50/30 group hover:bg-white hover:shadow-lg hover:border-transparent transition-all">
        <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">{code}</span>
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-900 transition-colors">
                <i className="fas fa-ellipsis-h text-xs"></i>
            </div>
        </div>
        <h4 className="text-sm font-black mb-10 leading-relaxed h-12">{name}</h4>
        <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>Syllabus Coverage</span>
                <span>{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                <div className={`h-full bg-blue-900 rounded-full`} style={{ width: `${progress}%` }}></div>
            </div>
            <button className="w-full pt-6 text-[10px] font-black text-blue-600 uppercase tracking-widest border-t border-slate-100 mt-4 opacity-0 group-hover:opacity-100 transition-all">
                Course Materials
            </button>
        </div>
    </div>
);

const RoutineItem = ({ time, title, sub }) => (
    <div className="flex gap-8 group cursor-pointer">
        <div className="w-20 pt-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">{time}</div>
        <div className="flex-1 pb-8 border-l-2 border-slate-50 pl-8 relative group-hover:border-blue-900 transition-colors">
            <div className="absolute top-1 -left-[5px] w-2 h-2 rounded-full bg-slate-100 group-hover:bg-blue-900 transition-colors"></div>
            <h4 className="text-sm font-black mb-1 group-hover:text-blue-900 transition-colors">{title}</h4>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
        </div>
    </div>
);

const DeadlineItem = ({ title, time, type }) => (
    <div className={`p-6 rounded-2xl border-l-[6px] transition-all hover:translate-x-1 cursor-pointer ${type === 'danger' ? 'border-red-500 bg-red-50/50' : 'border-amber-500 bg-amber-50/50'}`}>
        <h4 className="text-xs font-black mb-1">{title}</h4>
        <p className={`text-[10px] font-black uppercase tracking-widest ${type === 'danger' ? 'text-red-500' : 'text-amber-500'}`}>{time}</p>
    </div>
);

export default StudentDashboard;
