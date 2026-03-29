import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book as BookIcon, Search, Plus, X, Calendar, User, Hash } from 'lucide-react';

interface Book {
    id: number;
    isbn: string;
    title: string;
    author: string;
    department: { name: string };
    available_copies: number;
    total_copies: number;
    image_urlText: string;
}

const LibraryCatalog: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [formData, setFormData] = useState({ student_id: '', return_date: '' });

    useEffect(() => {
        // Fetch books from API
        // For demonstration, using dummy data matching the UI
        setBooks([
            { id: 1, isbn: '978-0262033842', title: 'Advanced Algorithms', author: 'Thomas H. Cormen', department: { name: 'Comp. Science' }, available_copies: 12, total_copies: 15, image_urlText: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=100' },
            { id: 2, isbn: '978-0201896831', title: 'Introduction to Quantum Mechanics', author: 'David J. Griffiths', department: { name: 'Physics' }, available_copies: 5, total_copies: 8, image_urlText: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=100' },
            { id: 3, isbn: '978-0393931068', title: 'Principles of Economics', author: 'N. Gregory Mankiw', department: { name: 'Economics' }, available_copies: 22, total_copies: 25, image_urlText: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&q=80&w=100' },
        ]);
    }, []);

    const handleIssue = (book: Book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <header className="flex justify-between items-center mb-12">
                <div className="text-2xl font-black text-blue-900 flex items-center gap-3">
                    <BookIcon className="w-8 h-8" /> IUMS Library
                </div>
                <div className="flex items-center gap-6">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search by Title, Author, or ISBN..." 
                            className="pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl w-96 focus:ring-4 focus:ring-blue-100 transition-all font-medium text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="bg-blue-900 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-blue-800 transition-all">
                        <Plus className="w-4 h-4" /> Issue Book
                    </button>
                    <button className="bg-white text-slate-600 px-6 py-3 rounded-2xl font-bold text-sm border border-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-all">
                        <Calendar className="w-4 h-4" /> Return Book
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-50">
                            <th className="p-8">Book Details</th>
                            <th className="p-8">ISBN</th>
                            <th className="p-8">Department</th>
                            <th className="p-8">Status</th>
                            <th className="p-8 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                        {books.map(book => (
                            <tr key={book.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                <td className="p-8">
                                    <div className="flex items-center gap-6">
                                        <img src={book.image_urlText} className="w-12 h-16 rounded-lg object-cover shadow-sm bg-slate-100" />
                                        <div>
                                            <h4 className="font-black text-slate-900">{book.title}</h4>
                                            <p className="text-xs text-slate-400 mt-1">{book.author}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8 font-mono text-xs text-slate-400">{book.isbn}</td>
                                <td className="p-8 text-slate-600">{book.department.name}</td>
                                <td className="p-8">
                                    <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                                        Available ({book.available_copies})
                                    </span>
                                </td>
                                <td className="p-8 text-right">
                                    <button 
                                        onClick={() => handleIssue(book)}
                                        className="text-blue-600 hover:text-blue-800 font-bold text-lg"
                                    >
                                        <Plus className="w-6 h-6" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Issue Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
                    <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl p-10 relative animate-in fade-in zoom-in duration-300">
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute right-8 top-8 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-900">
                                <BookIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900">Issue New Book</h2>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Book ISBN / Title</label>
                                <div className="relative">
                                    <BookIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        readOnly 
                                        value={selectedBook?.isbn}
                                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600 focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Patron Student ID</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                                    <input 
                                        type="text" 
                                        placeholder="Enter student ID..."
                                        className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Issue Date</label>
                                    <input type="date" value="2023-10-12" readOnly className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-600" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Expected Return</label>
                                    <input type="date" className="w-full px-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 transition-all font-mono" />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-6">
                                <button className="flex-1 bg-blue-900 text-white py-5 rounded-3xl font-black text-sm shadow-xl shadow-blue-100 hover:bg-blue-800 transition-all">
                                    Confirm Issue
                                </button>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-10 bg-slate-50 text-slate-600 rounded-3xl font-black text-sm border border-slate-100 hover:bg-slate-100 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LibraryCatalog;
