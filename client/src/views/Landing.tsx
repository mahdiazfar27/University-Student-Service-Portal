import React from 'react';
import { Link } from 'react-router-dom';
import { 
    GraduationCap, 
    Users, 
    BookOpen, 
    Library, 
    Cloud, 
    ShieldCheck, 
    ArrowRight, 
    Mail, 
    Globe, 
    Facebook, 
    Twitter, 
    Github,
    ChevronRight,
    TrendingUp,
    AppWindow,
    Database,
    Monitor,
    PieChart
} from 'lucide-react';

const Landing: React.FC = () => {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-navy-100 selection:text-navy-900 overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-navy-900/10">
                            <ShieldCheck size={24} />
                        </div>
                        <span className="text-2xl font-black text-navy-900 tracking-tight">IUMS</span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-10">
                        <NavLink label="Academic" />
                        <NavLink label="Admissions" />
                        <NavLink label="Examinations" />
                        <NavLink label="Research" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="px-6 py-2.5 rounded-xl text-navy-900 font-bold hover:bg-slate-50 transition-colors">Support</button>
                        <Link to="/login" className="px-6 py-2.5 bg-navy-900 text-white rounded-xl font-bold shadow-xl shadow-navy-900/10 hover:bg-navy-800 transition-all hover:-translate-y-0.5 active:scale-95">Portal Login</Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 overflow-hidden bg-slate-50/50">
                {/* Immersive Background */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-navy-100/50 to-indigo-100/20 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100/30 to-blue-100/10 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-3/5 space-y-12">
                            <span className="px-6 py-2.5 bg-navy-900/5 text-navy-900 text-xs font-black uppercase tracking-widest rounded-full border border-navy-900/10 inline-block">Next-Gen Education Management</span>
                            <h1 className="text-7xl font-black text-navy-900 leading-[1.1] tracking-tight">
                                Empowering Excellence in <span className="text-gradient hover:animate-pulse transition-all">Higher Education.</span>
                            </h1>
                            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-2xl">
                                A unified ecosystem for students, faculty, and administration to streamline academic lifecycles, research, and institutional growth. 
                            </p>
                            
                            <div className="flex flex-wrap gap-6 pt-4">
                                <Link to="/login" className="px-10 py-5 bg-white text-navy-900 rounded-3xl font-black text-lg shadow-2xl shadow-navy-900/10 hover:shadow-navy-900/20 transition-all flex items-center gap-4 group">
                                     <GraduationCap className="w-6 h-6" /> Student Portal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button className="px-10 py-5 bg-navy-900 text-white rounded-3xl font-black text-lg shadow-2xl shadow-navy-900/20 hover:bg-navy-800 transition-all flex items-center gap-4">
                                     <Monitor className="w-6 h-6" /> Faculty Access
                                </button>
                            </div>
                        </div>
                        
                        {/* Immersive Visual Placeholder or Stats Grid */}
                        <div className="lg:w-2/5 grid grid-cols-2 gap-8 relative animate-in fade-in slide-in-from-right-16 duration-1000">
                             <StatCard icon={<TrendingUp size={24}/>} label="15,000+" sub="Happy Students" color="text-indigo-600" />
                             <StatCard icon={<Users size={24}/>} label="500+" sub="Faculty Members" color="text-emerald-600" translate />
                             <StatCard icon={<AppWindow size={24}/>} label="42" sub="Departments" color="text-navy-600" />
                             <StatCard icon={<BookOpen size={24}/>} label="120+" sub="Active Courses" color="text-blue-600" translate />
                             
                             {/* Gradient Orb */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-navy-900/5 rounded-full blur-2xl -z-10"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="py-32 bg-white flex flex-col items-center">
                 <div className="text-center space-y-4 mb-20 px-8">
                    <h2 className="text-4xl font-black text-navy-900 tracking-tight">Comprehensive Academic Management</h2>
                    <p className="text-slate-500 font-medium max-w-2xl">Our integrated system provides all the tools necessary for modern university operations in one unified dashboard.</p>
                 </div>

                 <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                     <FeatureItem 
                        icon={<Database className="w-8 h-8"/>} 
                        title="Course Management" 
                        desc="Seamlessly manage curriculum, syllabi, and course materials with automated scheduling."
                     />
                     <FeatureItem 
                        icon={<PieChart className="w-8 h-8"/>} 
                        title="Online Examinations" 
                        desc="Secure digital assessment tools with proctoring support, automatic grading, and result generation."
                     />
                     <FeatureItem 
                        icon={<Monitor className="w-8 h-8"/>} 
                        title="Financial Systems" 
                        desc="Integrated fee payment gateways, payroll management, and comprehensive financial reporting."
                     />
                 </div>
            </section>

            {/* CTA Section */}
            <section className="px-8 pb-32 pt-20">
                <div className="max-w-7xl mx-auto p-20 bg-navy-900 rounded-[64px] relative overflow-hidden text-center text-white flex flex-col items-center gap-12 group">
                     {/* BG effects */}
                     <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>
                     <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                     
                     <h2 className="text-5xl font-black tracking-tight leading-tight">Ready to experience the future <br/> of education?</h2>
                     <p className="text-navy-100 text-lg max-w-2xl">Join thousands of students and educators already using the IUMS platform to achieve academic excellence.</p>
                     
                     <div className="flex gap-6 pt-4 relative z-10">
                         <button className="px-10 py-5 bg-white text-navy-900 rounded-3xl font-black text-lg shadow-2xl shadow-black/20 hover:scale-105 active:scale-95 transition-all">Apply Now</button>
                         <button className="px-10 py-5 bg-navy-800 text-white rounded-3xl font-black text-lg border border-white/10 hover:bg-navy-700 transition-all">Request Demo</button>
                     </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-50 pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-16 pb-20 border-b border-slate-200">
                    <div className="space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-white">
                                <ShieldCheck size={24} />
                            </div>
                            <span className="text-2xl font-black text-navy-900 tracking-tight">IUMS</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium">Providing world-class digital infrastructure for higher education institutions globally. Committed to academic innovation.</p>
                        <div className="flex gap-4">
                             <SocialIcon icon={<Facebook size={18}/>} />
                             <SocialIcon icon={<Twitter size={18}/>} />
                             <SocialIcon icon={<Github size={18}/>} />
                        </div>
                    </div>
                    
                    <FooterCol title="University Portal" links={['Student Dashboard', 'Faculty Portal', 'Admission Status', 'LMS Login']} />
                    <FooterCol title="Quick Links" links={['Academic Calendar', 'Library Catalog', 'Research Papers', 'Alumni Association']} />
                    
                    <div className="space-y-8">
                         <h4 className="font-black text-navy-900 tracking-tight">Contact Us</h4>
                         <ul className="space-y-6">
                            <li className="flex gap-4 text-slate-500 text-sm font-medium leading-tight">
                                <Globe className="w-5 h-5 text-navy-900 shrink-0" /> University Campus, Education Square, City Center
                            </li>
                            <li className="flex gap-4 text-slate-500 text-sm font-medium">
                                <Mail className="w-5 h-5 text-navy-900 shrink-0" /> info@iums-university.edu
                            </li>
                         </ul>
                    </div>
                </div>
                
                <div className="max-w-7xl mx-auto px-8 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">© 2024 Integrated University Management System. All rights reserved.</p>
                    <div className="flex gap-8 text-xs font-black text-slate-400 uppercase tracking-widest">
                         <a href="#" className="hover:text-navy-900">Privacy Policy</a>
                         <a href="#" className="hover:text-navy-900">Terms of Service</a>
                         <a href="#" className="hover:text-navy-900">Cookie Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const NavLink = ({ label }: { label: string }) => (
    <a href="#" className="text-sm font-black text-slate-400 hover:text-navy-900 uppercase tracking-widest transition-colors">{label}</a>
);

const StatCard = ({ icon, label, sub, color, translate }: any) => (
    <div className={`bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 flex flex-col items-center gap-4 transition-all hover:-translate-y-2 duration-500 ${translate ? 'translate-y-12' : ''}`}>
        <div className={`w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center ${color}`}>
            {icon}
        </div>
        <div className="text-center">
             <div className="text-2xl font-black text-navy-900">{label}</div>
             <div className="text-[10px] uppercase font-black tracking-widest text-slate-400">{sub}</div>
        </div>
    </div>
);

const FeatureItem = ({ icon, title, desc }: any) => (
    <div className="p-12 bg-slate-50/50 border border-slate-100/50 rounded-[48px] space-y-8 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 transition-all duration-700 group flex flex-col items-center">
         <div className="w-20 h-20 bg-white text-navy-900 rounded-[28px] flex items-center justify-center shadow-xl shadow-navy-900/5 group-hover:scale-110 group-hover:bg-navy-900 group-hover:text-white transition-all duration-500">
            {icon}
         </div>
         <div className="space-y-4 text-center">
            <h3 className="text-2xl font-black text-navy-900">{title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
         </div>
    </div>
);

const FooterCol = ({ title, links }: any) => (
    <div className="space-y-8">
        <h4 className="font-black text-navy-900 tracking-tight">{title}</h4>
        <ul className="space-y-4">
            {links.map((link: string) => (
                <li key={link}>
                    <a href="#" className="text-slate-500 text-sm font-bold hover:text-navy-900 transition-colors">{link}</a>
                </li>
            ))}
        </ul>
    </div>
);

const SocialIcon = ({ icon }: any) => (
    <a href="#" className="w-10 h-10 bg-white shadow-sm border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-navy-900 hover:shadow-md transition-all">
        {icon}
    </a>
);

export default Landing;
