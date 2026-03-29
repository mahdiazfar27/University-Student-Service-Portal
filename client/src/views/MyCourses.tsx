import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
    Plus, 
    Folder, 
    ClipboardList,
    User,
    CalendarDays,
    HelpCircle
} from 'lucide-react';

interface Course {
    id: number;
    code: string;
    name: string;
    credits: string;
    department: {
        name: string;
        code: string;
    };
    enrollments?: { syllabus_coverage: number }[];
}

const COURSE_IMAGES: Record<string, string> = {
  'CS-402': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
  'DB-305': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
  'UX-210': 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
  'MTH-101': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=600',
  'CS-310': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
  'AI-405': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600',
  'SE-301': 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600',
};

const COURSE_INSTRUCTORS: Record<string, string> = {
  'CS-402': 'Dr. Sarah Jenkins',
  'DB-305': 'Prof. Michael Chen',
  'UX-210': 'Lydia Thorne, MFA',
  'MTH-101': 'Dr. Robert Vance',
  'CS-310': 'Dr. Leonard Hofstadter',
  'AI-405': 'Dr. Alice Turing',
  'SE-301': 'Prof. John Doe',
};

const MyCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('/api/student/courses/enrolled');
                setCourses(response.data);
            } catch (error) {
                console.error("Failed to fetch enrolled courses", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <Layout title="My Courses" breadcrumbs={['Portal', 'My Courses']}>
            <div className="space-y-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-navy-900 tracking-tight">My Enrolled Courses</h1>
                        <p className="text-slate-500 font-medium italic mt-2">Fall Semester 2024 • Academic Year 2024/25</p>
                    </div>
                    
                    <button className="flex items-center gap-2 px-6 py-3.5 bg-blue-900 border border-blue-800 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-800 hover:-translate-y-0.5 transition-all">
                        <Plus size={18} />
                        Register for New Courses
                    </button>
                </div>

                {/* Courses Grid */}
                {loading ? (
                    <div className="flex justify-center p-12">
                        <div className="w-12 h-12 border-4 border-navy-900 border-t-transparent rounded-full animate-spin shadow-2xl shadow-navy-900/10"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        
                        {courses.map((course) => {
                            // Extract syllabus coverage from the loaded relationship (might be structured depending on query builder)
                            const coverage = course.enrollments && course.enrollments.length > 0 
                                ? course.enrollments[0]?.syllabus_coverage || 0 
                                : 0;
                            
                            // Map static elements
                            const defaultBg = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600';
                            const imageBg = COURSE_IMAGES[course.code] || defaultBg;
                            const instructor = COURSE_INSTRUCTORS[course.code] || 'TBA';

                            return (
                                <div key={course.id} className="premium-card flex flex-col overflow-hidden group hover:shadow-2xl hover:shadow-navy-900/10 transition-all duration-500">
                                    {/* Card Header Image */}
                                    <div className="h-48 w-full relative overflow-hidden bg-slate-200">
                                        <div className="absolute inset-0 bg-navy-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                                        <img 
                                            src={imageBg} 
                                            alt={course.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute bottom-4 left-4 z-20">
                                            <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-black tracking-widest rounded-lg shadow-lg">
                                                {course.code}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* Card Content */}
                                    <div className="p-8 flex-1 flex flex-col">
                                        <h3 className="text-xl font-black text-navy-900 tracking-tight leading-tight mb-2 line-clamp-2">
                                            {course.name}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 mb-8 text-slate-500">
                                            <User size={14} className="text-slate-400" />
                                            <span className="text-xs font-bold">{instructor}</span>
                                        </div>
                                        
                                        <div className="mt-auto space-y-3">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Syllabus Coverage</span>
                                                <span className="text-sm font-black text-blue-900">{coverage}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-900 rounded-full transition-all duration-1000 group-hover:bg-blue-800"
                                                    style={{ width: `${coverage}%` }}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="mt-8 flex gap-4">
                                            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-colors">
                                                <Folder size={14} /> Materials
                                            </button>
                                            <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-colors">
                                                <ClipboardList size={14} /> Tasks
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Final Placeholder Card */}
                        <div className="premium-card flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 bg-transparent hover:border-blue-300 hover:bg-blue-50/50 transition-colors group cursor-pointer aspect-[3/4] md:aspect-auto">
                            <div className="w-16 h-16 bg-slate-100 text-slate-400 group-hover:bg-white group-hover:shadow-xl group-hover:text-blue-900 rounded-2xl flex items-center justify-center transition-all mb-6">
                                <Plus size={24} className="stroke-[3px]" />
                            </div>
                            <h3 className="text-lg font-black text-navy-900 mb-2">More to come</h3>
                            <p className="text-slate-500 text-xs font-medium leading-relaxed max-w-[200px]">
                                Register for elective courses to fill your remaining credit slots.
                            </p>
                        </div>

                    </div>
                )}
                
                {/* Upcoming Deadlines Section */}
                <div className="mt-16">
                    <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 ml-2">Upcoming Deadlines</h3>
                    <div className="premium-card bg-white p-6 space-y-4">
                        
                        {/* Deadline 1 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center shrink-0">
                                    <CalendarDays size={20} className="stroke-[2.5px]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-navy-900 tracking-tight group-hover:text-blue-900 transition-colors">Final Prototype Submission</h4>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Introduction to UX Design • Module 4 Project</p>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <span className="inline-flex items-center px-3 py-1 bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                    Due in 2 days
                                </span>
                            </div>
                        </div>
                        
                        <div className="h-px bg-slate-100 mx-4" />

                        {/* Deadline 2 */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                                    <HelpCircle size={20} className="stroke-[2.5px]" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-navy-900 tracking-tight group-hover:text-blue-900 transition-colors">Mid-term Quiz: B-Trees</h4>
                                    <p className="text-xs text-slate-500 mt-1 font-medium">Database Systems • Online Assessment</p>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">
                                    Oct 24, 2024
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </Layout>
    );
};

export default MyCourses;
