import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="font-sans antialiased bg-gray-50 text-slate-900">
            {/* Navbar */}
            <nav className="absolute top-0 w-full z-50 flex items-center justify-between px-12 py-8 text-white">
                <div className="text-2xl font-bold tracking-tight">IUMS</div>
                <div className="flex items-center gap-8">
                    <a href="#" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">Academic</a>
                    <a href="#" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">Admissions</a>
                    <a href="#" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">Examinations</a>
                    <a href="#" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">Research</a>
                    <Link to="/login" className="bg-white text-blue-900 px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors">
                        Portal Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-[80vh] flex items-center justify-center text-center px-6"
                style={{
                    background: 'linear-gradient(rgba(30, 58, 138, 0.8), rgba(30, 58, 138, 0.8)), url("https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2070")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <div className="max-w-4xl pt-16">
                    <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-[0.2em] uppercase bg-white/20 text-white rounded-full">
                        Next-Gen Education Management
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
                        Empowering Excellence in <br />
                        <span className="text-blue-300">Higher Education.</span>
                    </h1>
                    <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
                        A unified ecosystem for students, faculty, and administration to streamline academic lifecycles, research, and institutional growth.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link to="/login" className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-3">
                            <i className="fas fa-user-graduate"></i> Student Portal
                        </Link>
                        <Link to="/login" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center gap-3">
                            <i className="fas fa-chalkboard-teacher"></i> Faculty Access
                        </Link>
                    </div>
                </div>
            </header>

            {/* Stats Section */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard number="15,000+" label="Students" />
                <StatCard number="500+" label="Faculty Members" />
                <StatCard number="42" label="Departments" />
                <StatCard number="120+" label="Courses" />
            </div>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-20">
                    <h2 className="text-3xl font-bold mb-4">Comprehensive Academic Management</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">One integrated system provides all the tools necessary for modern university operations in one unified dashboard.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureItem 
                        icon="book-open" 
                        title="Course Management" 
                        desc="Seamlessly manage curriculum, syllabi, and course materials with automated scheduling."
                    />
                    <FeatureItem 
                        icon="laptop-code" 
                        title="Online Examinations" 
                        desc="Secure digital assessment tools with proctoring support, automatic grading, and result generation."
                    />
                    <FeatureItem 
                        icon="file-invoice-dollar" 
                        title="Financial Systems" 
                        desc="Integrated fee payment gateways, payroll management, and comprehensive financial reporting."
                    />
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-24 px-6 mt-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
                    <div>
                        <div className="text-2xl font-extrabold text-blue-900 mb-6 flex items-center gap-3">
                            <i className="fas fa-university"></i> IUMS
                        </div>
                        <p className="text-gray-500 max-w-xs leading-relaxed">
                            Providing world-class digital infrastructure for higher education institutions globally. Committed to academic innovation.
                        </p>
                        <div className="flex gap-4 mt-8">
                            <i className="fab fa-facebook text-blue-900/50 hover:text-blue-900 cursor-pointer transition-colors"></i>
                            <i className="fab fa-twitter text-blue-900/50 hover:text-blue-900 cursor-pointer transition-colors"></i>
                            <i className="fab fa-instagram text-blue-900/50 hover:text-blue-900 cursor-pointer transition-colors"></i>
                        </div>
                    </div>
                    <div className="flex gap-16 lg:gap-32">
                        <div>
                            <h4 className="font-bold mb-6 text-gray-900">University Portal</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li>Student Dashboard</li>
                                <li>Faculty Portal</li>
                                <li>Admission Status</li>
                                <li>LMS Login</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-gray-900">Quick Links</h4>
                            <ul className="space-y-4 text-sm text-gray-500">
                                <li>Academic Calendar</li>
                                <li>Library Catalog</li>
                                <li>Research Papers</li>
                                <li>Alumni Association</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                    <p>© 2024 Integrated University Management System. All rights reserved.</p>
                    <div className="flex gap-8">
                        <p>Privacy Policy</p>
                        <p>Terms of Service</p>
                        <p>Cookie Policy</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const StatCard = ({ number, label }) => (
    <div className="bg-white p-10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center border border-gray-50 hover:-translate-y-1 transition-transform">
        <h2 className="text-4xl font-extrabold text-blue-900 mb-2">{number}</h2>
        <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{label}</p>
    </div>
);

const FeatureItem = ({ icon, title, desc }) => (
    <div className="p-10 bg-white rounded-3xl border border-gray-100 hover:shadow-xl hover:border-transparent transition-all group">
        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <i className={`fas fa-${icon} text-2xl text-blue-900 group-hover:text-inherit`}></i>
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
);

export default Landing;
