import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const user = await login(email, password);
            if (user.role_id === 1) navigate('/admin/dashboard');
            else if (user.role_id === 2) navigate('/student/dashboard');
            else if (user.role_id === 3) navigate('/faculty/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-12 relative overflow-hidden">
                {/* Branding */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-graduation-cap text-3xl text-blue-900"></i>
                    </div>
                    <h1 className="text-2xl font-extrabold text-blue-900 leading-tight">IUMS Portal</h1>
                    <p className="text-xs text-gray-400 mt-2 font-medium">Integrated University Management System</p>
                </div>

                <div className="mb-10">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Sign In</h2>
                    <p className="text-sm text-gray-500 font-medium">Enter your credentials to access your account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 font-medium animate-pulse">
                        <i className="fas fa-exclamation-circle mr-2"></i> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">User Role</label>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all appearance-none cursor-pointer"
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest">Email or Institutional ID</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                            <input 
                                type="text" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="e.g. j.doe@university.edu"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">Password</label>
                            <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</a>
                        </div>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"><i className="fas fa-lock"></i></span>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <input type="checkbox" id="remember" className="w-4 h-4 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="remember" className="text-sm font-medium text-gray-500">Keep me logged in</label>
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-5 rounded-2xl font-extrabold text-sm transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-3 active:scale-[0.98]"
                    >
                        {loading ? 'AUTHENTICATING...' : 'LOGIN TO PORTAL'} <i className="fas fa-arrow-right"></i>
                    </button>
                </form>

                <div className="mt-12 pt-10 border-t border-gray-50 text-center text-[10px] font-bold tracking-widest text-gray-400 space-y-4">
                    <p><i className="fas fa-headset mr-2"></i> IT HELP DESK: (555) 012-3456</p>
                    <div className="flex justify-center gap-10">
                        <p className="hover:text-gray-600 cursor-pointer">PRIVACY POLICY</p>
                        <p className="hover:text-gray-600 cursor-pointer">SYSTEM STATUS</p>
                    </div>
                </div>
            </div>
            <p className="mt-10 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                © 2024 Integrated University Management System. All rights reserved.
            </p>
        </div>
    );
};

export default Login;
