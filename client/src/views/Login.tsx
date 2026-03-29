import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2, UserCircle2, ChevronDown, CheckCircle2 } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'Student' | 'Faculty' | 'Admin' | 'Accountant'>('Student');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await axios.post('/api/login', { email, password, role });
            login(res.data.token, res.data.user);
            
            // Navigate based on role
            if (res.data.user.role?.name === 'Admin') navigate('/admin/dashboard');
            else if (res.data.user.role?.name === 'Accountant') navigate('/finance/dashboard');
            else if (res.data.user.role?.name === 'Faculty') navigate('/faculty/dashboard');
            else navigate('/dashboard');

        } catch (err: any) {
            setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Immersive Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,#1e3a8a0a,transparent)] pointer-events-none"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-navy-900/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>

            {/* Header Branding */}
            <div className="mb-12 flex flex-col items-center gap-6 relative z-10 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="w-20 h-20 bg-navy-900 rounded-[28px] flex items-center justify-center text-white shadow-2xl shadow-navy-900/20 ring-8 ring-white">
                    <ShieldCheck size={40} />
                </div>
                <div className="text-center">
                    <h1 className="text-4xl font-black text-navy-900 tracking-tight">IUMS Portal</h1>
                    <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">Integrated University Management System</p>
                </div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-lg bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 p-16 relative z-10 border border-white/50 animate-in zoom-in-95 duration-500">
                <div className="mb-12">
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Sign In</h2>
                    <p className="text-slate-400 font-medium">Enter your credentials to access your academic account.</p>
                </div>

                {error && (
                    <div className="mb-10 p-5 bg-rose-50 border border-rose-100 rounded-3xl flex items-start gap-4 text-rose-600 animate-in shake duration-500">
                         <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0 animate-pulse"></div>
                         <p className="text-sm font-bold leading-relaxed uppercase tracking-tighter">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Role Selector */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">User Role</label>
                        <div className="relative group">
                            <UserCircle2 className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-navy-900 transition-colors" />
                            <select 
                                className="w-full pl-14 pr-12 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] text-sm font-bold text-slate-900 appearance-none outline-none focus:ring-4 focus:ring-navy-100 focus:bg-white transition-all cursor-pointer"
                                value={role}
                                onChange={(e: any) => setRole(e.target.value)}
                            >
                                <option value="Student">Student</option>
                                <option value="Faculty">Faculty</option>
                                <option value="Admin">Admin</option>
                                <option value="Accountant">Accountant / Finance</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Email or Institutional ID</label>
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-navy-900 transition-colors" />
                            <input 
                                type="email" 
                                required
                                className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-navy-100 focus:bg-white transition-all"
                                placeholder="e.g. j.doe@university.edu"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Password</label>
                            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-navy-900 hover:underline">Forgot Password?</a>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-navy-900 transition-colors" />
                            <input 
                                type="password" 
                                required
                                className="w-full pl-14 pr-6 py-5 bg-slate-50/50 border border-slate-100 rounded-[24px] text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-navy-100 focus:bg-white transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Remember Checkbox */}
                    <div className="flex items-center gap-3 px-1">
                        <div className="relative flex items-center">
                            <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-slate-200 rounded-lg checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer" />
                            <CheckCircle2 size={12} className="absolute left-1 top-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                        <span className="text-xs font-bold text-slate-500">Keep me logged in</span>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-emerald-500 text-white py-5 rounded-[24px] font-black text-base shadow-2xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 active:scale-95 group"
                    >
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>LOGIN TO PORTAL <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                    </button>
                </form>

                <div className="mt-16 flex flex-col items-center gap-6 border-t border-slate-100 pt-10">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-3">
                        <span className="w-5 h-[1px] bg-slate-100"></span>
                        IT Help Desk: (555) 012-3456 • Privacy Policy • System Status
                        <span className="w-5 h-[1px] bg-slate-100"></span>
                     </p>
                </div>
            </div>

            <p className="mt-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 text-center leading-loose animate-pulse">
                © 2024 University Education Systems. All rights reserved. <br/>
                Powered by Global Education Cloud v4.2.0
            </p>
        </div>
    );
};

export default Login;
