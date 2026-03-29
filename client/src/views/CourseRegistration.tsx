import React, { useState } from 'react';
import { Search, Info, CheckCircle2, ChevronRight, CreditCard, GraduationCap, X, ArrowLeft } from 'lucide-react';

const CourseRegistration: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    const courses = [
        { code: 'CS401', name: 'Advanced Algorithms', type: 'Core Subject', credits: 4.0, instructor: 'Dr. Sarah Vance', schedule: 'Mon/Wed 10:00 AM' },
        { code: 'DS202', name: 'Database Management Systems', type: 'Core Subject', credits: 3.0, instructor: 'Prof. Michael Chen', schedule: 'Tue/Thu 02:30 PM' },
        { code: 'UIX105', name: 'Introduction to UX Design', type: 'Elective', credits: 3.0, instructor: 'Jane Doe', schedule: 'Fri 09:00 AM' },
        { code: 'ST301', name: 'Applied Statistics', type: 'General Ed', credits: 3.0, instructor: 'Dr. Robert Smith', schedule: 'Mon/Wed 04:00 PM' },
        { code: 'CYB400', name: 'Network Security', type: 'Concentration', credits: 4.0, instructor: 'Dr. Elena Rodriguez', schedule: 'Wed/Fri 01:00 PM' },
    ];

    const toggleCourse = (code: string) => {
        if (selectedCourses.includes(code)) {
            setSelectedCourses(selectedCourses.filter(c => c !== code));
        } else {
            setSelectedCourses([...selectedCourses, code]);
        }
    };

    const totalCredits = courses.filter(c => selectedCourses.includes(c.code)).reduce((acc, curr) => acc + curr.credits, 0);

    return (
        <div className="bg-slate-50 min-h-screen p-12 font-sans">
            {/* Header with Step Progress */}
            <header className="flex flex-col items-center mb-16">
                <div className="flex items-center gap-32 mb-8 relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -z-10"></div>
                    <StepIndicator num={1} label="Select Courses" active={step >= 1} current={step === 1} />
                    <StepIndicator num={2} label="Review & Fees" active={step >= 2} current={step === 2} />
                    <StepIndicator num={3} label="Confirmation" active={step >= 3} current={step === 3} />
                </div>
            </header>

            <div className="flex gap-12">
                <main className="flex-1 space-y-12">
                    {step === 1 && (
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 mb-2">Course Selection</h2>
                                    <p className="text-slate-400 font-medium italic">Fall Semester 2024 • Available Courses</p>
                                </div>
                                <div className="relative group w-96">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input type="text" placeholder="Search courses..." className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all" />
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] font-black uppercase tracking-widest text-slate-300 border-b border-slate-50">
                                            <th className="py-6 w-12 text-center">
                                                <input type="checkbox" className="rounded-lg w-5 h-5 border-slate-200 text-blue-900 focus:ring-blue-100" />
                                            </th>
                                            <th className="py-6 px-4">Code</th>
                                            <th className="py-6 px-4">Course Name</th>
                                            <th className="py-6 px-4">Credits</th>
                                            <th className="py-6 px-4">Instructor</th>
                                            <th className="py-6 px-4">Schedule</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm font-medium">
                                        {courses.map(course => (
                                            <tr key={course.code} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group">
                                                <td className="py-8 w-12 text-center">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={selectedCourses.includes(course.code)}
                                                        onChange={() => toggleCourse(course.code)}
                                                        className="rounded-lg w-5 h-5 border-slate-200 text-blue-900 focus:ring-blue-100 transition-all" 
                                                    />
                                                </td>
                                                <td className="py-8 px-4 text-blue-900 font-black">{course.code}</td>
                                                <td className="py-8 px-4">
                                                    <h4 className="font-black text-slate-900">{course.name}</h4>
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{course.type}</p>
                                                </td>
                                                <td className="py-8 px-4 text-slate-600 font-black">{course.credits}.0</td>
                                                <td className="py-8 px-4 text-slate-600 font-bold">{course.instructor}</td>
                                                <td className="py-8 px-4 text-slate-400 font-bold uppercase text-[10px] tracking-widest leading-relaxed">
                                                    {course.schedule}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-12 flex justify-between items-center pt-10 border-t border-slate-100">
                                <button className="bg-slate-50 text-slate-600 px-10 py-5 rounded-[24px] font-black text-sm border border-slate-100 hover:bg-slate-100 transition-all flex items-center gap-3">
                                    <ArrowLeft className="w-4 h-4" /> Back
                                </button>
                                <button 
                                    onClick={() => setStep(2)}
                                    className="bg-blue-900 text-white px-12 py-5 rounded-[24px] font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all flex items-center gap-3"
                                >
                                    Continue to Review <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 animate-in fade-in slide-in-from-right-10 duration-500">
                            <h2 className="text-2xl font-black text-slate-900 mb-10">Fee Breakdown Preview</h2>
                            <div className="space-y-6">
                                <FeeItem label="Tuition Fee (10 Credits)" value="$3,500.00" />
                                <FeeItem label="Technology & Lab Fees" value="$450.00" />
                                <FeeItem label="Library & Facility Use" value="$300.00" />
                                <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                    <span className="text-lg font-black text-slate-900">Total Due</span>
                                    <span className="text-2xl font-black text-blue-900">$4,250.00</span>
                                </div>
                            </div>
                            <div className="mt-12 pt-10 border-t border-slate-100 flex justify-between">
                                <button onClick={() => setStep(1)} className="bg-slate-50 text-slate-600 px-10 py-5 rounded-[24px] font-black text-sm border border-slate-100 hover:bg-slate-100 transition-all">
                                    Back to Selection
                                </button>
                                <button onClick={() => setStep(3)} className="bg-blue-900 text-white px-12 py-5 rounded-[24px] font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all">
                                    Confirm Registration
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center p-20 animate-in fade-in zoom-in duration-500">
                            <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 scale-125">
                                <CheckCircle2 className="w-12 h-12" />
                            </div>
                            <h2 className="text-4xl font-black text-slate-900 mb-4">Registration Successful!</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-12">Your course load has been synchronized. Our registrar is reviewing your selection for final approval.</p>
                            <button onClick={() => setStep(1)} className="bg-slate-900 text-white px-12 py-5 rounded-3xl font-black text-sm hover:scale-105 transition-transform">
                                Back to Dashboard
                            </button>
                        </div>
                    )}
                </main>

                <aside className="w-96 space-y-10">
                    <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 mb-8 flex items-center gap-2">
                           <Info className="w-4 h-4" /> Registration Summary
                        </h3>
                        <div className="space-y-6">
                            <SummaryRow label="Credits Selected" value={`${totalCredits} / 18.0`} bar={(totalCredits/18)*100} color="bg-blue-900" />
                            <div className="pt-4 space-y-4">
                                <SummaryBadge label="Core Units" count={selectedCourses.filter(c => courses.find(cc => cc.code === c)?.type === 'Core Subject').length} />
                                <SummaryBadge label="Electives" count={selectedCourses.filter(c => courses.find(cc => cc.code === c)?.type === 'Elective').length} />
                                <SummaryBadge label="Gen Ed" count={selectedCourses.filter(c => courses.find(cc => cc.code === c)?.type === 'General Ed').length} />
                            </div>
                            <div className="pt-8 border-t border-slate-100 flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Estimated Fees</p>
                                    <p className="text-2xl font-black text-slate-900">${(totalCredits * 350 + 750).toLocaleString()}.00</p>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">*Calculated based on selection</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 p-8 rounded-[40px] border border-blue-100">
                        <h3 className="text-xs font-black uppercase tracking-widest text-blue-900 mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Registration Tips
                        </h3>
                        <p className="text-xs font-medium text-slate-600 leading-relaxed mb-6">
                            Make sure you have cleared all pending financial holds before final submission to avoid processing delays.
                        </p>
                        <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 cursor-pointer hover:rotate-12 transition-transform">
                             <GraduationCap className="w-6 h-6" />
                        </div>
                    </div>
                </aside>
            </div>
            
            <footer className="mt-20 pt-10 border-t border-slate-100 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                © 2024 Integrated University Management System • Academic Support: (555) 123-4567
            </footer>
        </div>
    );
};

const StepIndicator = ({ num, label, active, current }: any) => (
    <div className="flex flex-col items-center gap-3 relative transition-all">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-black transition-all ${
            current ? 'bg-blue-900 text-white ring-8 ring-blue-50' : 
            active ? 'bg-blue-900 text-white' : 'bg-white border-2 border-slate-200 text-slate-400'
        }`}>
            {active && !current ? <CheckCircle2 className="w-6 h-6" /> : num}
        </div>
        <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-slate-900' : 'text-slate-400'}`}>
            {label}
        </span>
    </div>
);

const SummaryRow = ({ label, value, bar, color }: any) => (
    <div className="space-y-3">
        <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
            <span className="text-lg font-black text-slate-900">{value}</span>
        </div>
        <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
            <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${bar}%` }}></div>
        </div>
    </div>
);

const SummaryBadge = ({ label, count }: { label: string, count: number }) => (
    <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-slate-600">{label}</span>
        <span className="text-xs font-black text-slate-900">{count}</span>
    </div>
);

const FeeItem = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center py-2">
        <span className="text-sm font-bold text-slate-600">{label}</span>
        <span className="text-sm font-mono font-black text-slate-900">{value}</span>
    </div>
);

export default CourseRegistration;
