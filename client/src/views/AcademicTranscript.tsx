import React from 'react';
import { Award, BookOpen, GraduationCap, Download, Share2, ChevronDown, CheckCircle } from 'lucide-react';

const AcademicTranscript: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen p-12 font-sans">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2">Academic Transcript & Results</h1>
                    <p className="text-slate-500 font-medium">Official performance records for Bachelor of Computer Science</p>
                </div>
                <div className="flex gap-4">
                    <button className="bg-white text-slate-600 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest border border-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-all">
                        <Share2 className="w-4 h-4" /> Share Result
                    </button>
                    <button className="bg-blue-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all">
                        <Download className="w-4 h-4" /> Download PDF Transcript
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <StatCard label="Current CGPA" value="3.85" sub="Cumulative Grade Point Average" highlight="Top 5%" color="bg-blue-50 text-blue-700" />
                <StatCard label="Credits Earned" value="96" sub="Total credits toward degree" progress={75} total={128} color="bg-indigo-50 text-indigo-700" />
                <StatCard label="Academic Standing" value="Dean's List" sub="Last Updated: Oct 24, 2023" icon={<CheckCircle className="w-5 h-5" />} color="bg-emerald-50 text-emerald-700" />
                <StatCard label="Major" value="Software Engineering" sub="Faculty of Science & Tech" icon={<Award className="w-5 h-5" />} color="bg-slate-50 text-slate-700" />
            </div>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                <div className="flex items-center gap-3 mb-10 text-blue-900">
                    <BookOpen className="w-6 h-6" />
                    <h2 className="text-2xl font-black">Semester Breakdown</h2>
                </div>

                <div className="space-y-6">
                    <SemesterSection 
                        title="Spring Semester 2024" 
                        status="CURRENT SEMESTER" 
                        gpa="3.92" 
                        credits="18.0" 
                        active 
                        courses={[
                            { code: 'CSE-4101', title: 'Artificial Intelligence', credits: '3.0', gp: '4.00', grade: 'A+', remarks: 'Excellent' },
                            { code: 'CSE-4102', title: 'Database Management Systems II', credits: '3.0', gp: '3.75', grade: 'A', remarks: 'Very Good' },
                            { code: 'CSE-4103', title: 'Network Security & Cryptography', credits: '4.0', gp: '4.00', grade: 'A+', remarks: 'Excellent' },
                            { code: 'MAT-4105', title: 'Linear Algebra & Transforms', credits: '3.0', gp: '4.00', grade: 'A+', remarks: 'Excellent' },
                        ]}
                    />

                    <SemesterSection title="Fall Semester 2023" status="PREVIOUS SEMESTER" gpa="3.78" credits="18.0" collapsed />
                    <SemesterSection title="Summer Semester 2023" status="PREVIOUS SEMESTER" gpa="3.82" credits="15.0" collapsed />
                </div>
            </div>

            <footer className="mt-12 flex flex-col md:flex-row gap-12 text-slate-400">
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 flex-1">
                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 mb-6 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" /> Grading System Key
                    </h3>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                        <GradeKey label="A+ (4.00)" range="80% - 100%" />
                        <GradeKey label="B+ (3.25)" range="65% - 69%" />
                        <GradeKey label="A (3.75)" range="75% - 79%" />
                        <GradeKey label="B (3.00)" range="60% - 64%" />
                        <GradeKey label="A- (3.50)" range="70% - 74%" />
                        <GradeKey label="C (2.50)" range="50% - 59%" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col justify-end">
                    <p className="text-xs font-medium leading-relaxed italic border-l-4 border-blue-100 pl-6 mb-8">
                        Note: This is a web-generated academic summary and does not serve as an official university transcript for external use. To request a certified paper transcript, please contact the Registrar's Office.
                    </p>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-300">
                         Data last synchronized: June 15, 2024 at 09:42 AM
                    </div>
                </div>
            </footer>
        </div>
    );
};

const StatCard = ({ label, value, sub, highlight, progress, total, icon, color }: any) => (
    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 flex flex-col gap-4 relative overflow-hidden group hover:shadow-xl transition-all">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</h3>
        <div className="flex items-end gap-3">
            <p className="text-3xl font-black text-slate-900">{value}</p>
            {highlight && <span className={`${color} px-2 py-0.5 rounded text-[10px] font-black`}>{highlight}</span>}
            {icon && <span className="text-blue-900 mb-1">{icon}</span>}
        </div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{sub}</p>
        {progress && (
            <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-blue-900 rounded-full" style={{ width: `${(progress/total)*100}%` }}></div>
            </div>
        )}
    </div>
);

const SemesterSection = ({ title, status, gpa, credits, active, courses, collapsed }: any) => (
    <div className={`rounded-3xl border ${active ? 'border-blue-100 bg-white' : 'border-slate-50 bg-slate-50/20'}`}>
        <div className="p-8 flex justify-between items-center cursor-pointer group">
            <div className="flex items-center gap-6">
                <ChevronDown className={`w-5 h-5 text-blue-900 transition-transform ${collapsed ? '-rotate-90' : ''}`} />
                <div>
                    <h3 className="font-black text-slate-900 text-lg flex items-center gap-3">
                        {title}
                        {active && <span className="text-[10px] bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-tighter">Current Semester</span>}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{status}</p>
                </div>
            </div>
            <div className="flex gap-12 text-center">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Semester GPA</p>
                    <p className="text-xl font-black text-blue-900">{gpa}</p>
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Credits</p>
                    <p className="text-xl font-black text-slate-900">{credits}</p>
                </div>
            </div>
        </div>
        {!collapsed && courses && (
            <div className="px-8 pb-8 pt-4 border-t border-slate-50">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-b border-slate-50">
                            <th className="py-4">Course Code</th>
                            <th className="py-4">Course Title</th>
                            <th className="py-4">Credit Hours</th>
                            <th className="py-4">Grade Point</th>
                            <th className="py-4">Grade</th>
                            <th className="py-4">Remarks</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                        {courses.map((c: any) => (
                            <tr key={c.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                <td className="py-6 text-blue-900 font-bold">{c.code}</td>
                                <td className="py-6 text-slate-900">{c.title}</td>
                                <td className="py-6 text-slate-600">{c.credits}</td>
                                <td className="py-6 text-slate-900 font-bold">{c.gp}</td>
                                <td className="py-6"><span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-black">{c.grade}</span></td>
                                <td className="py-6 text-slate-400 italic text-xs">{c.remarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-8 pt-8 border-t border-slate-50 flex justify-end gap-12">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Total Earned Points: <span className="text-slate-900 ml-2">70.56</span></p>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">Semester SGPA: <span className="text-blue-900 ml-2">{gpa}</span></p>
                </div>
            </div>
        )}
    </div>
);

const GradeKey = ({ label, range }: { label: string, range: string }) => (
    <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-slate-600">{label}</span>
        <span className="text-[10px] font-black text-slate-400 tracking-tighter">{range}</span>
    </div>
);

export default AcademicTranscript;
