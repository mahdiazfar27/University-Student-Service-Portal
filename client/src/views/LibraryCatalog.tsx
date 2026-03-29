import React, { useState } from 'react';
import Layout from '../components/Layout';
import { 
    Search, 
    BookOpen, 
    Plus, 
    Filter, 
    MoreHorizontal, 
    CheckCircle2, 
    Clock, 
    X,
    Calendar,
    User,
    Hash,
    Bookmark,
    ArrowRight,
    Library as LibraryIcon,
    Globe,
    ExternalLink
} from 'lucide-react';

const LibraryCatalog: React.FC = () => {
    const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

    return (
        <Layout title="Library Catalog" breadcrumbs={['Academic', 'Library Catalog']}>
            <div className="flex flex-col xl:flex-row gap-|0">
                
                {/* Book Catalog Grid (8 cols) */}
                <div className="flex-1 space-y-10">
                    {/* Catalog Header */}
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                             <h2 className="text-3xl font-black text-navy-900 tracking-tight">Institutional Repository</h2>
                             <p className="text-slate-400 font-medium text-sm">Access over 128,000+ physical and digital resources.</p>
                        </div>
                        <div className="flex gap-4">
                             <button 
                                onClick={() => setIsIssueModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-navy-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-navy-900/20 hover:bg-navy-800 transition-all group"
                             >
                                <Plus size={16} className="group-hover:rotate-90 transition-transform" /> Issue New Book
                             </button>
                             <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-400 border border-slate-100 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-sm hover:text-navy-900 transition-all">
                                <LibraryIcon size={16}/> Return Book
                             </button>
                        </div>
                    </div>

                    {/* Search & Tabs */}
                    <div className="premium-card p-6 flex flex-col md:flex-row items-center gap-6">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-navy-900 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search by Title, Author, or ISBN..."
                                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:ring-4 focus:ring-navy-100 transition-all outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                             <Tab active label="All Categories" />
                             <Tab label="Computer Science" />
                             <Tab label="Physics" />
                             <Tab label="Mathematics" />
                        </div>
                    </div>

                    {/* Book List Table */}
                    <div className="premium-card p-12 space-y-12">
                         <div className="overflow-x-auto">
                            <table className="w-full border-separate border-spacing-y-4">
                                <thead className="text-[10px] font-black uppercase tracking-widest text-slate-300">
                                    <tr>
                                        <th className="text-left px-8">Book Details</th>
                                        <th className="text-left px-4 uppercase tracking-widest">ISBN</th>
                                        <th className="text-left px-4 uppercase tracking-widest">Department</th>
                                        <th className="text-center px-4 uppercase tracking-widest">Status</th>
                                        <th className="text-right px-4 uppercase tracking-widest">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <BookRow 
                                        title="Advanced Algorithms" 
                                        author="Thomas H. Cormen" 
                                        isbn="978-0262033842" 
                                        dept="CSE" 
                                        status="Available" 
                                        img="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=100"
                                    />
                                    <BookRow 
                                        title="Introduction to Quantum Mechanics" 
                                        author="David J. Griffiths" 
                                        isbn="978-0201896831" 
                                        dept="Physics" 
                                        status="Borrowed" 
                                        img="https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=100"
                                    />
                                    <BookRow 
                                        title="Principles of Economics" 
                                        author="N. Gregory Mankiw" 
                                        isbn="978-1305155748" 
                                        dept="Business" 
                                        status="Available" 
                                        img="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=100"
                                    />
                                    <BookRow 
                                        title="Organic Chemistry" 
                                        author="Jonathan Clayden" 
                                        isbn="978-0199270293" 
                                        dept="Chemistry" 
                                        status="Reserved" 
                                        img="https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&q=80&w=100"
                                    />
                                </tbody>
                            </table>
                         </div>
                    </div>
                </div>

                {/* Right Area - Digital Resources & Stats (4 cols) */}
                <div className="xl:w-96 space-y-10">
                     {/* Digital Resources Card */}
                     <div className="premium-card p-10 space-y-10">
                          <h3 className="text-xl font-black text-navy-900 flex items-center gap-3">
                             <Globe size={20} className="text-blue-500" /> Digital Resources
                          </h3>
                          <div className="space-y-6">
                               <ResourceItem label="JSTOR Library" sub="Journal access" active />
                               <ResourceItem label="IEEE Xplore" sub="Research papers" />
                               <ResourceItem label="Springer Link" sub="e-Books" />
                          </div>
                          <button className="w-full py-4 text-[10px] font-black uppercase text-slate-300 tracking-widest hover:text-navy-900 transition-colors">View All Subscriptions</button>
                     </div>

                     {/* Quick Stats Sidebar */}
                     <div className="bg-navy-900 p-10 rounded-[48px] text-white space-y-10 shadow-2xl shadow-navy-900/20">
                          <div className="space-y-1">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-white/40">Today's Overview</h4>
                             <div className="text-5xl font-black tracking-tight mt-6">142</div>
                             <p className="text-sm font-bold text-white/60">Total Books Issued Today</p>
                          </div>
                          
                          <div className="space-y-4">
                               <div className="flex justify-between items-end">
                                   <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">Capacity Used</span>
                                   <span className="text-xs font-black text-emerald-400">88%</span>
                               </div>
                               <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-400 rounded-full" style={{ width: '88%' }}></div>
                               </div>
                          </div>
                     </div>
                </div>
            </div>

            {/* Issue Book Modal Backdrop */}
            {isIssueModalOpen && (
                <div className="fixed inset-0 bg-navy-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
                     <div className="w-full max-w-lg bg-white rounded-[48px] shadow-2xl p-12 relative animate-in zoom-in-95 duration-500">
                          <button 
                             onClick={() => setIsIssueModalOpen(false)}
                             className="absolute top-8 right-8 p-3 bg-slate-50 text-slate-300 hover:text-navy-900 rounded-2xl transition-all"
                          >
                             <X size={20} />
                          </button>

                          <div className="mb-10 flex items-center gap-4">
                               <div className="w-12 h-12 bg-navy-50 text-navy-900 rounded-2xl flex items-center justify-center">
                                    <Bookmark size={24} />
                               </div>
                               <h3 className="text-3xl font-black text-navy-900 tracking-tight">Issue New Book</h3>
                          </div>

                          <form className="space-y-8">
                               <div className="space-y-3">
                                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Book ISBN / Title</label>
                                   <div className="relative group">
                                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-navy-900 transition-colors w-5 h-5" />
                                        <input 
                                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-navy-100 transition-all"
                                            placeholder="978-0262033848"
                                        />
                                   </div>
                               </div>

                               <div className="space-y-3">
                                   <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Patron Student ID</label>
                                   <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-navy-900 transition-colors w-5 h-5" />
                                        <input 
                                            className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-navy-100 transition-all"
                                            placeholder="Enter Student ID..."
                                        />
                                   </div>
                               </div>

                               <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Issue Date</label>
                                        <input type="date" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-900 outline-none" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Expected Return</label>
                                        <input type="date" className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl text-sm font-bold text-slate-900 outline-none" />
                                    </div>
                               </div>

                               <div className="flex gap-4 pt-4">
                                   <button className="flex-1 bg-navy-900 text-white py-5 rounded-[24px] font-black text-sm tracking-tight shadow-2xl shadow-navy-900/20 hover:bg-navy-800 transition-all">Confirm Issue</button>
                                   <button 
                                      type="button" 
                                      onClick={() => setIsIssueModalOpen(false)}
                                      className="px-10 py-5 bg-white text-slate-400 border border-slate-100 rounded-[24px] font-black text-sm tracking-tight hover:bg-slate-50 transition-all"
                                   >
                                      Cancel
                                   </button>
                               </div>
                          </form>
                     </div>
                </div>
            )}
        </Layout>
    );
};

const Tab = ({ label, active }: any) => (
    <button className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/10' : 'text-slate-400 hover:text-navy-900 hover:bg-slate-50'}`}>
        {label}
    </button>
);

const BookRow = ({ title, author, isbn, dept, status, img }: any) => (
    <tr className="group">
        <td className="px-8 py-6 bg-slate-50 border-y border-l border-slate-100 rounded-l-[32px] group-hover:bg-navy-900 transition-all">
             <div className="flex items-center gap-6">
                  <div className="w-16 h-20 bg-white rounded-xl shadow-lg shadow-slate-200 overflow-hidden shrink-0 group-hover:border-2 group-hover:border-white/20 transition-all">
                       <img src={img} className="w-full h-full object-cover" alt="" />
                  </div>
                  <div className="space-y-1">
                       <p className="text-sm font-black text-navy-900 group-hover:text-white transition-colors">{title}</p>
                       <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/50 transition-colors uppercase tracking-widest">{author}</p>
                  </div>
             </div>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all">
             <span className="text-xs font-black text-slate-300 group-hover:text-white/30 transition-colors uppercase tracking-tighter">{isbn}</span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all">
             <span className="text-xs font-black text-slate-500 group-hover:text-white/80 transition-colors">{dept}</span>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-slate-100 group-hover:bg-navy-900 transition-all text-center">
             <div className="flex items-center justify-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${status === 'Available' ? 'bg-emerald-500 shadow-emerald-200' : status === 'Reserved' ? 'bg-amber-500' : 'bg-rose-500'} shadow-lg`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Available' ? 'text-emerald-700' : status === 'Reserved' ? 'text-amber-700' : 'text-rose-700'} group-hover:text-white`}>{status}</span>
             </div>
        </td>
        <td className="px-4 py-6 bg-slate-50 border-y border-r border-slate-100 rounded-r-[32px] group-hover:bg-navy-900 transition-all text-right">
             <button className="p-3 text-slate-300 hover:text-navy-900 group-hover:text-white transition-colors">
                  <MoreHorizontal size={20}/>
             </button>
        </td>
    </tr>
);

const ResourceItem = ({ label, sub, active }: any) => (
    <div className="flex items-center justify-between group cursor-pointer p-1">
        <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${active ? 'bg-blue-50 text-blue-900 shadow-xl shadow-blue-100' : 'bg-slate-50 text-slate-300 group-hover:bg-navy-900 group-hover:text-white'}`}>
                  <LibraryIcon size={20} />
             </div>
             <div>
                  <h4 className="text-sm font-black text-navy-900 tracking-tight group-hover:text-blue-900">{label}</h4>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{sub}</p>
             </div>
        </div>
        <ExternalLink size={16} className="text-slate-200 group-hover:text-navy-900 transition-all" />
    </div>
);

export default LibraryCatalog;
