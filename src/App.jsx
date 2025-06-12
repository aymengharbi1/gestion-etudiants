import React, { useState, useEffect, createContext, useContext } from 'react';
import { School, Users, BookUser, Book, ClipboardList, Megaphone, LogOut, User, GraduationCap, MessageSquare, Briefcase, ChevronRight, UserCircle, Plus, Edit, Trash2, Search, X, ArrowRightCircle, Save, CalendarDays, BarChart2, ChevronLeft, ChevronRight as ChevronRightIcon, Send, Home, Eye, CheckCircle, XCircle, Clock, BookOpen, Globe, Atom, Calculator, Palette, Settings, Menu } from 'lucide-react';

// --- CONTEXTE DE L'APPLICATION ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  // --- MOCK DATA (DONNÉES FICTIVES) ---
  const [schoolYear, setSchoolYear] = useState('2024-2025');
  const [trimesters, setTrimesters] = useState([
    { id: 1, name: 'الثلاثي الأول', startDate: '2024-09-15', endDate: '2024-12-20' },
    { id: 2, name: 'الثلاثي الثاني', startDate: '2025-01-06', endDate: '2025-03-28' },
    { id: 3, name: 'الثلاثي الثالث', startDate: '2025-04-07', endDate: '2025-06-28' },
  ]);
  const [students, setStudents] = useState([ { id: 'S202401', name: 'أحمد بن علي', classId: 'C1A', dob: '2015-03-12', parentId: 'PAR01' }, { id: 'S202302', name: 'فاطمة الزهراء', classId: 'C2B', dob: '2014-07-22', parentId: 'PAR02' }, { id: 'S202403', name: 'يوسف الماجري', classId: 'C1A', dob: '2015-01-05', parentId: 'PAR03' }, { id: 'S202204', name: 'مريم الشارني', classId: 'C3C', dob: '2013-11-18', parentId: 'PAR04' }, { id: 'S202305', name: 'علي الغربي', classId: 'C2B', dob: '2014-05-30', parentId: 'PAR05' }, { id: 'S202106', name: 'سارة العياري', classId: 'C4A', dob: '2012-09-10', parentId: 'PAR06' } ]);
  const [teachers, setTeachers] = useState([ { id: 'T101', name: 'سليم الكامل', subject: 'الرياضيات', phone: '98123456', email: 'salim.kamel@medrassa.tn' }, { id: 'T102', name: 'هندة بن صالح', subject: 'اللغة العربية', phone: '97654321', email: 'henda.salah@medrassa.tn' }, { id: 'T103', name: 'كمال مراد', subject: 'العلوم', phone: '95112233', email: 'kamel.mourad@medrassa.tn' }, { id: 'T104', name: 'ألفة العرفاوي', subject: 'Langue française', phone: '94332211', email: 'olfa.arfaoui@medrassa.tn' } ]);
  const [classes, setClasses] = useState([ { id: 'C1A', name: 'السنة الأولى أ', level: 'السنة الأولى', mainTeacherId: 'T102' }, { id: 'C2B', name: 'السنة الثانية ب', level: 'السنة الثانية', mainTeacherId: 'T101' }, { id: 'C3C', name: 'السنة الثالثة ج', level: 'السنة الثالثة', mainTeacherId: 'T103' }, { id: 'C4A', name: 'السنة الرابعة', level: 'السنة الرابعة', mainTeacherId: 'T104' }, { id: 'C1B', name: 'السنة الأولى ب', level: 'السنة الأولى', mainTeacherId: 'T101' } ]);
  const [subjects, setSubjects] = useState([ { id: 'SUB01', name: 'اللغة العربية', coefficient: 2, icon: BookOpen }, { id: 'SUB02', name: 'Langue française', coefficient: 2, icon: Globe }, { id: 'SUB03', name: 'الرياضيات', coefficient: 2.5, icon: Calculator }, { id: 'SUB04', name: 'الإيقاظ العلمي', coefficient: 1.5, icon: Atom }, { id: 'SUB05', name: 'التربية الإسلامية', coefficient: 1, icon: Book }, { id: 'SUB06', name: 'التربية الفنية', coefficient: 1, icon: Palette } ]);
  const [grades, setGrades] = useState([ 
      { id: 'G01', studentId: 'S202401', subjectId: 'SUB01', examType: 'فرض مراقبة عدد 1', grade: 12.5, trimester: 1 }, 
      { id: 'G02', studentId: 'S202401', subjectId: 'SUB01', examType: 'شفاهي', grade: 15, trimester: 1 },
      { id: 'G08', studentId: 'S202401', subjectId: 'SUB01', examType: 'فرض تأليفي', grade: 14, trimester: 1 },
      { id: 'G03', studentId: 'S202401', subjectId: 'SUB03', examType: 'فرض مراقبة عدد 1', grade: 16, trimester: 1 }, 
      { id: 'G09', studentId: 'S202401', subjectId: 'SUB03', examType: 'فرض مراقبة عدد 2', grade: 15, trimester: 2 },
      { id: 'G10', studentId: 'S202401', subjectId: 'SUB03', examType: 'فرض تأليفي', grade: 17.5, trimester: 2 },
      { id: 'G04', studentId: 'S202401', subjectId: 'SUB02', examType: 'فرض مراقبة عدد 1', grade: 11.75, trimester: 1 },
      { id: 'G05', studentId: 'S202401', subjectId: 'SUB04', examType: 'فرض تأليفي', grade: 18, trimester: 2 },
      { id: 'G06', studentId: 'S202302', subjectId: 'SUB03', examType: 'فرض مراقبة عدد 1', grade: 14.5, trimester: 1 }, 
      { id: 'G07', studentId: 'S202305', subjectId: 'SUB03', examType: 'فرض مراقبة عدد 1', grade: 17, trimester: 1 }, 
  ]);
  const [attendanceRecords, setAttendanceRecords] = useState({ '2025-06-11': { 'S202302': 'present', 'S202305': 'absent', 'S202401': 'present' }, '2025-06-10': { 'S202401': 'present' }, '2025-06-09': { 'S202401': 'absent' }, '2025-06-06': { 'S202401': 'late' } });
  const [announcements, setAnnouncements] = useState([ {id: 'AN01', date: '2025-06-10', title: 'اجتماع أولياء الأمور', content: 'نعلم كافة الأولياء أنه سيتم عقد اجتماع بداية من الساعة الرابعة بعد الزوال يوم الجمعة المقبل لمناقشة النتائج الثلاثية.'}, {id: 'AN02', date: '2025-06-08', title: 'عطلة نهاية السنة الدراسية', content: 'تبدأ عطلة نهاية السنة الدراسية يوم 28 جوان. نتمنى لكم عطلة سعيدة!'}]);
  const [messages, setMessages] = useState([ { id: 'M01', fromId: 'T102', toId: 'PAR01', text: 'مرحبا، كيف حال ابنك أحمد؟', timestamp: new Date().toISOString() } ]);
  const [homeworks, setHomeworks] = useState([ { id: 'HW01', classId: 'C1A', subjectId: 'SUB01', title: 'مراجعة قصيدة', description: 'حفظ أول 3 أبيات من قصيدة "يا ليل"', dueDate: '2025-06-15' }, { id: 'HW02', classId: 'C2B', subjectId: 'SUB03', title: 'تمارين القسمة', description: 'إنجاز التمارين 1, 2, و 5 صفحة 88 من الكتاب المدرسي.', dueDate: '2025-06-14' } ]);
  const [parents, setParents] = useState([
    { id: 'PAR01', name: 'محمد بن علي', phone: '22123456' },
    { id: 'PAR02', name: 'حنان المزوغي', phone: '23654321' },
    { id: 'PAR03', name: 'كريم الماجري', phone: '24112233' },
    { id: 'PAR04', name: 'سنية الشارني', phone: '25332211' },
    { id: 'PAR05', name: 'هشام الغربي', phone: '28998877' },
    { id: 'PAR06', name: 'ليلى العياري', phone: '27778899' },
  ]);

  const value = {
      currentUser, 
      loginAs: (role) => {
        const roles = {'admin': {name: 'مدير النظام', id: 'ADM01'}, 'teacher': {name: 'سليم الكامل', id: 'T101'}, 'parent': {name: 'ولي التلميذ أحمد', id: 'PAR01', childId: 'S202401'}};
        setCurrentUser({ name: roles[role].name, id: roles[role].id, role, childId: roles[role].childId });
      },
      logout: () => setCurrentUser(null),
      students, setStudents,
      teachers, setTeachers,
      classes, setClasses,
      subjects, setSubjects,
      grades, setGrades,
      attendanceRecords, setAttendanceRecords,
      announcements, setAnnouncements,
      messages, setMessages,
      homeworks, setHomeworks,
      schoolYear, setSchoolYear,
      trimesters, setTrimesters,
      parents, setParents,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// --- COMPOSANT PRINCIPAL ---
export default function App() { return ( <AppProvider> <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap'); .font-cairo { font-family: 'Cairo', sans-serif; }`}</style> <Main /> </AppProvider> ); }
const Main = () => { const { currentUser } = useContext(AppContext); return <div dir="rtl" className="bg-gray-100 min-h-screen font-cairo text-gray-800">{currentUser ? <Dashboard /> : <RoleSelectionScreen />}</div>; };

// --- ÉCRAN DE SÉLECTION DE RÔLE ---
const RoleSelectionScreen = () => {
    const { loginAs } = useContext(AppContext);
    const roles = [ { role: 'admin', name: 'فضاء المدير', icon: Briefcase, color: 'bg-blue-600' }, { role: 'teacher', name: 'فضاء المعلم', icon: BookUser, color: 'bg-green-600' }, { role: 'parent', name: 'فضاء الولي', icon: Users, color: 'bg-orange-600' }, ];
    return (<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4"><div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 text-center"><div className="flex flex-col items-center mb-8"><div className="bg-blue-600 p-4 rounded-full mb-4 shadow-lg"><School className="w-12 h-12 text-white" /></div><h1 className="text-4xl font-bold text-gray-800">نظام إدارة التلاميذ</h1><p className="text-gray-500 mt-2 text-lg">الرجاء إختيار فضاء الدخول</p></div><div className="space-y-4">{roles.map((item) => (<button key={item.role} onClick={() => loginAs(item.role)} className={`w-full flex items-center justify-between p-5 rounded-xl text-white font-bold text-xl ${item.color} hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1`}><div className="flex items-center"><item.icon className="w-8 h-8" /><span className="mr-4">{item.name}</span></div><ChevronRight className="w-8 h-8" /></button>))}</div></div></div>);
};

// --- MODALS ET FORMULAIRES ---
const FormModal = ({ isOpen, onClose, children, title }) => { if (!isOpen) return null; return (<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"><div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"><div className="flex justify-between items-center mb-6"><h3 className="text-2xl font-bold">{title}</h3><button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X className="w-6 h-6" /></button></div>{children}</div></div>); };
const StudentForm = ({ onSave, student, onClose }) => { 
    const { classes, parents } = useContext(AppContext);
    const [formData, setFormData] = useState({}); 
    useEffect(() => { setFormData(student || { id: `S${Math.floor(1000 + Math.random() * 9000)}`, name: '', classId: '', dob: '', parentId: '' }); }, [student]); 
    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); }; 
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); }; 
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block mb-1 font-semibold">رقم التسجيل</label><input type="text" name="id" value={formData.id || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-gray-50" required readOnly={!!student} /></div>
            <div><label className="block mb-1 font-semibold">الاسم الكامل</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div>
            <div><label className="block mb-1 font-semibold">القسم</label>
                <select name="classId" value={formData.classId || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white" required>
                    <option value="" disabled>اختر قسما</option>
                    {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
             <div><label className="block mb-1 font-semibold">الولي</label>
                <select name="parentId" value={formData.parentId || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white" required>
                    <option value="" disabled>اختر وليا</option>
                    {parents.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>
            <div><label className="block mb-1 font-semibold">تاريخ الولادة</label><input type="date" name="dob" value={formData.dob || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div>
            <div className="mt-8 flex justify-end space-x-4 space-x-reverse"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">إلغاء</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">حفظ</button></div>
        </form>
    ); 
};
const ParentForm = ({ onSave, parent, onClose }) => {
    const [formData, setFormData] = useState({});
    useEffect(() => { setFormData(parent || { id: `PAR${Math.floor(100 + Math.random() * 900)}`, name: '', phone: '' }); }, [parent]);
    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block mb-1 font-semibold">الاسم الكامل للولي</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div>
            <div><label className="block mb-1 font-semibold">رقم الهاتف</label><input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div>
            <div className="mt-8 flex justify-end space-x-4 space-x-reverse"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">إلغاء</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">حفظ</button></div>
        </form>
    );
};
const TeacherForm = ({ onSave, teacher, onClose }) => { const [formData, setFormData] = useState({}); useEffect(() => { setFormData(teacher || { id: `T${Math.floor(100 + Math.random() * 900)}`, name: '', subject: '', phone: '', email: '' }); }, [teacher]); const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); }; const handleSubmit = (e) => { e.preventDefault(); onSave(formData); }; return (<form onSubmit={handleSubmit} className="space-y-4"><div><label className="block mb-1 font-semibold">الاسم الكامل</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div><label className="block mb-1 font-semibold">المادة</label><input type="text" name="subject" value={formData.subject || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div><label className="block mb-1 font-semibold">رقم الهاتف</label><input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div><label className="block mb-1 font-semibold">البريد الإلكتروني</label><input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div className="mt-8 flex justify-end space-x-4 space-x-reverse"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">إلغاء</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">حفظ</button></div></form>); };
const ClassForm = ({ onSave, classData, onClose }) => { const { teachers } = useContext(AppContext); const [formData, setFormData] = useState({}); useEffect(() => { setFormData(classData || { id: `C${Math.floor(100 + Math.random() * 900)}`, name: '', level: '', mainTeacherId: '' }); }, [classData]); const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); }; const handleSubmit = (e) => { e.preventDefault(); onSave(formData); }; return (<form onSubmit={handleSubmit} className="space-y-4"><div><label className="block mb-1 font-semibold">اسم القسم</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div><label className="block mb-1 font-semibold">المستوى</label><input type="text" name="level" value={formData.level || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div><label className="block mb-1 font-semibold">المعلم(ة) الرئيسي(ة)</label><select name="mainTeacherId" value={formData.mainTeacherId || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white" required><option value="" disabled>اختر معلما</option>{teachers.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div><div className="mt-8 flex justify-end space-x-4 space-x-reverse"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">إلغاء</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">حفظ</button></div></form>); };
const SubjectForm = ({ onSave, subject, onClose }) => { const [formData, setFormData] = useState({}); useEffect(() => { setFormData(subject || { id: `SUB${Math.floor(10 + Math.random() * 90)}`, name: '', coefficient: '' }); }, [subject]); const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); }; const handleSubmit = (e) => { e.preventDefault(); onSave(formData); }; return (<form onSubmit={handleSubmit} className="space-y-4"><div><label className="block mb-1 font-semibold">اسم المادة</label><input type="text" name="name" value={formData.name || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div><label className="block mb-1 font-semibold">الضارب (Coefficient)</label><input type="number" step="0.5" name="coefficient" value={formData.coefficient || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div className="mt-8 flex justify-end space-x-4 space-x-reverse"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">إلغاء</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">حفظ</button></div></form>); };
const AnnouncementForm = ({ onSave, announcement, onClose }) => { const [formData, setFormData] = useState({}); useEffect(() => { setFormData(announcement || { id: `AN${Math.floor(10 + Math.random() * 90)}`, title: '', content: '', date: new Date().toISOString().slice(0, 10) }); }, [announcement]); const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); }; const handleSubmit = (e) => { e.preventDefault(); onSave(formData); }; return (<form onSubmit={handleSubmit} className="space-y-4"><div><label className="block mb-1 font-semibold">عنوان الإعلان</label><input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div><div><label className="block mb-1 font-semibold">محتوى الإعلان</label><textarea name="content" value={formData.content || ''} onChange={handleChange} className="w-full p-2 border rounded-lg h-32" required /></div><div className="mt-8 flex justify-end space-x-4 space-x-reverse"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">إلغاء</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">حفظ</button></div></form>); };
const HomeworkForm = ({ onSave, homework, onClose, classId }) => {
    const { subjects } = useContext(AppContext);
    const [formData, setFormData] = useState({});
    useEffect(() => { setFormData(homework || { id: `HW${Date.now()}`, classId, title: '', description: '', subjectId: '', dueDate: '' }); }, [homework, classId]);
    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div><label className="block mb-1 font-semibold">المادة</label><select name="subjectId" value={formData.subjectId || ''} onChange={handleChange} className="w-full p-2 border rounded-lg bg-white" required><option value="" disabled>اختر المادة</option>{subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
            <div><label className="block mb-1 font-semibold">عنوان الواجب</label><input type="text" name="title" value={formData.title || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div>
            <div><label className="block mb-1 font-semibold">الوصف</label><textarea name="description" value={formData.description || ''} onChange={handleChange} className="w-full p-2 border rounded-lg h-24" required /></div>
            <div><label className="block mb-1 font-semibold">آخر أجل</label><input type="date" name="dueDate" value={formData.dueDate || ''} onChange={handleChange} className="w-full p-2 border rounded-lg" required /></div>
            <div className="mt-8 flex justify-end space-x-4 space-x-reverse"><button type="button" onClick={onClose} className="py-2 px-6 bg-gray-200 rounded-lg font-semibold hover:bg-gray-300">إلغاء</button><button type="submit" className="py-2 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">حفظ</button></div>
        </form>
    );
};

// --- COMPOSANTS DE GESTION (CRUD) ---
const CrudComponent = ({ items, setItems, FormComponent, columns, renderItem, itemSingular, itemPlural, ...props }) => {
    const [filteredItems, setFilteredItems] = useState(items); const [isModalOpen, setIsModalOpen] = useState(false); const [editingItem, setEditingItem] = useState(null); const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => { setFilteredItems(items.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchQuery.toLowerCase())))); }, [searchQuery, items]);
    const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); }; const handleEdit = (item) => { setEditingItem(item); setIsModalOpen(true); }; const handleDelete = (id) => { if (window.confirm(`هل أنت متأكد من حذف هذا ${itemSingular}؟`)) { setItems(items.filter(i => i.id !== id)); } }; const handleSave = (data) => { if (editingItem) { setItems(items.map(i => (i.id === data.id ? data : i))); } else { setItems([data, ...items]); } setIsModalOpen(false); };
    return (<><FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? `تعديل ${itemSingular}` : `إضافة ${itemSingular} جديد`}><FormComponent onSave={handleSave} onClose={() => setIsModalOpen(false)} {...{ [itemSingular.toLowerCase()]: editingItem, ...props }} /></FormModal><div className="p-6 bg-white rounded-xl shadow-lg"><div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"><h2 className="text-2xl font-bold text-gray-700">قائمة {itemPlural}</h2><button onClick={handleAdd} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto justify-center"><Plus className="w-5 h-5 ml-2" />إضافة {itemSingular} جديد</button></div><div className="mb-4"><div className="relative"><input type="text" placeholder={`البحث عن ${itemSingular}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" /><Search className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" /></div></div><div className="overflow-x-auto"><table className="w-full text-right"><thead className="bg-gray-50"><tr>{columns.map(c => <th key={c.key} className="p-4 font-semibold text-gray-600">{c.label}</th>)}<th className="p-4 font-semibold text-gray-600 text-center">إجراءات</th></tr></thead><tbody>{filteredItems.map(item => renderItem(item, handleEdit, handleDelete))}</tbody></table>{filteredItems.length === 0 && <p className="text-center text-gray-500 py-8">لا توجد نتائج مطابقة للبحث.</p>}</div></div></>);
};
const StudentsManagement = ({ onViewStudent }) => { 
    const { students, setStudents, classes, parents } = useContext(AppContext); 
    const columns = [ { key: 'id', label: 'رقم التسجيل' }, { key: 'name', label: 'الاسم الكامل' }, { key: 'class', label: 'القسم' }, { key: 'parent', label: 'الولي' }]; 
    const renderItem = (student, handleEdit, handleDelete) => (
        <tr key={student.id} className="border-b hover:bg-gray-50">
            <td className="p-4 text-gray-700">{student.id}</td>
            <td className="p-4 text-gray-800 font-medium">{student.name}</td>
            <td className="p-4 text-gray-700">{classes.find(c => c.id === student.classId)?.name || 'N/A'}</td>
             <td className="p-4 text-gray-700">{parents.find(p => p.id === student.parentId)?.name || 'غير محدد'}</td>
            <td className="p-4 text-center">
                <button onClick={() => onViewStudent(student.id)} className="text-gray-500 hover:text-gray-700 mx-2"><Eye className="w-5 h-5" /></button>
                <button onClick={() => handleEdit(student)} className="text-blue-500 hover:text-blue-700 mx-2"><Edit className="w-5 h-5" /></button>
                <button onClick={() => handleDelete(student.id)} className="text-red-500 hover:text-red-700 mx-2"><Trash2 className="w-5 h-5" /></button>
            </td>
        </tr>
    ); 
    return <CrudComponent title="قائمة التلاميذ" items={students} setItems={setStudents} FormComponent={StudentForm} columns={columns} renderItem={renderItem} itemSingular="تلميذ" itemPlural="التلاميذ" />;
};
const TeachersManagement = () => { const { teachers, setTeachers } = useContext(AppContext); const columns = [ { key: 'name', label: 'الاسم الكامل' }, { key: 'subject', label: 'المادة' }, { key: 'phone', label: 'الهاتف' }, { key: 'email', label: 'البريد الإلكتروني' }]; const renderItem = (teacher, handleEdit, handleDelete) => (<tr key={teacher.id} className="border-b hover:bg-gray-50"><td className="p-4 text-gray-800 font-medium">{teacher.name}</td><td className="p-4 text-gray-700">{teacher.subject}</td><td className="p-4 text-gray-700">{teacher.phone}</td><td className="p-4 text-gray-700">{teacher.email}</td><td className="p-4 text-center"><button onClick={() => handleEdit(teacher)} className="text-blue-500 hover:text-blue-700 mx-2"><Edit className="w-5 h-5" /></button><button onClick={() => handleDelete(teacher.id)} className="text-red-500 hover:text-red-700 mx-2"><Trash2 className="w-5 h-5" /></button></td></tr>); return <CrudComponent title="قائمة المعلمين" items={teachers} setItems={setTeachers} FormComponent={TeacherForm} columns={columns} renderItem={renderItem} itemSingular="معلم" itemPlural="المعلمين" />;};
const ParentsManagement = () => { const { parents, setParents } = useContext(AppContext); const columns = [ { key: 'name', label: 'الاسم الكامل للولي' }, { key: 'phone', label: 'الهاتف' }]; const renderItem = (parent, handleEdit, handleDelete) => (<tr key={parent.id} className="border-b hover:bg-gray-50"><td className="p-4 text-gray-800 font-medium">{parent.name}</td><td className="p-4 text-gray-700">{parent.phone}</td><td className="p-4 text-center"><button onClick={() => handleEdit(parent)} className="text-blue-500 hover:text-blue-700 mx-2"><Edit className="w-5 h-5" /></button><button onClick={() => handleDelete(parent.id)} className="text-red-500 hover:text-red-700 mx-2"><Trash2 className="w-5 h-5" /></button></td></tr>); return <CrudComponent title="قائمة الأولياء" items={parents} setItems={setParents} FormComponent={ParentForm} columns={columns} renderItem={renderItem} itemSingular="ولي" itemPlural="الأولياء" />;};
const ClassesManagement = () => { const { classes, setClasses, teachers, students } = useContext(AppContext); const [isModalOpen, setIsModalOpen] = useState(false); const [editingClass, setEditingClass] = useState(null); const handleAdd = () => { setEditingClass(null); setIsModalOpen(true); }; const handleEdit = (classData) => { setEditingClass(classData); setIsModalOpen(true); }; const handleDelete = (id) => { if (window.confirm('هل أنت متأكد من حذف هذا القسم؟')) { setClasses(classes.filter(c => c.id !== id)); } }; const handleSave = (data) => { if (editingClass) { setClasses(classes.map(c => (c.id === data.id ? data : c))); } else { setClasses([data, ...classes]); } setIsModalOpen(false); }; const getTeacherName = (teacherId) => teachers.find(t => t.id === teacherId)?.name || 'غير محدد'; const getStudentCount = (classId) => students.filter(s => s.classId === classId).length; return (<><FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingClass ? 'تعديل قسم' : 'إضافة قسم جديد'}><ClassForm onSave={handleSave} onClose={() => setIsModalOpen(false)} classData={editingClass} /></FormModal><div className="p-6"><div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"><h2 className="text-2xl font-bold text-gray-700">إدارة الأقسام</h2><button onClick={handleAdd} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto justify-center"><Plus className="w-5 h-5 ml-2" />إضافة قسم جديد</button></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{classes.map(c => (<div key={c.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"><div><h3 className="text-xl font-bold text-blue-700">{c.name}</h3><p className="text-gray-500 mb-4">{c.level}</p><div className="text-sm space-y-2"><p><strong className="font-semibold">المعلم الرئيسي:</strong> {getTeacherName(c.mainTeacherId)}</p><p><strong className="font-semibold">عدد التلاميذ:</strong> {getStudentCount(c.id)}</p></div></div><div className="border-t mt-4 pt-4 flex justify-end gap-2"><button onClick={() => handleEdit(c)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"><Edit className="w-5 h-5" /></button><button onClick={() => handleDelete(c.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full"><Trash2 className="w-5 h-5" /></button></div></div>))}</div></div></>);};
const SubjectsManagement = () => { const { subjects, setSubjects } = useContext(AppContext); const columns = [ { key: 'name', label: 'اسم المادة' }, { key: 'coefficient', label: 'الضارب' }]; const renderItem = (subject, handleEdit, handleDelete) => (<tr key={subject.id} className="border-b hover:bg-gray-50"><td className="p-4 text-gray-800 font-medium">{subject.name}</td><td className="p-4 text-gray-700">{subject.coefficient}</td><td className="p-4 text-center"><button onClick={() => handleEdit(subject)} className="text-blue-500 hover:text-blue-700 mx-2"><Edit className="w-5 h-5" /></button><button onClick={() => handleDelete(subject.id)} className="text-red-500 hover:text-red-700 mx-2"><Trash2 className="w-5 h-5" /></button></td></tr>); return <CrudComponent title="قائمة المواد" items={subjects} setItems={setSubjects} FormComponent={SubjectForm} columns={columns} renderItem={renderItem} itemSingular="مادة" itemPlural="المواد" />;};
const SchoolYearManagement = () => {
    const { schoolYear, setSchoolYear, trimesters, setTrimesters } = useContext(AppContext);
    const [localYear, setLocalYear] = useState(schoolYear);
    const [localTrimesters, setLocalTrimesters] = useState(trimesters);

    const handleTrimesterChange = (index, field, value) => {
        const updated = [...localTrimesters];
        updated[index][field] = value;
        setLocalTrimesters(updated);
    };

    const handleSave = () => {
        setSchoolYear(localYear);
        setTrimesters(localTrimesters);
        alert('تم حفظ إعدادات السنة الدراسية');
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">إعدادات السنة الدراسية</h2>
            <div className="mb-6">
                <label className="block font-semibold mb-2">السنة الدراسية الحالية</label>
                <input type="text" value={localYear} onChange={(e) => setLocalYear(e.target.value)} className="w-full md:w-1/3 p-2 border rounded-lg" />
            </div>
            <div className="space-y-4">
                {localTrimesters.map((trimester, index) => (
                    <div key={trimester.id} className="p-4 border rounded-lg">
                        <h3 className="font-bold text-lg mb-2">{trimester.name}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">تاريخ البداية</label>
                                <input type="date" value={trimester.startDate} onChange={(e) => handleTrimesterChange(index, 'startDate', e.target.value)} className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">تاريخ النهاية</label>
                                <input type="date" value={trimester.endDate} onChange={(e) => handleTrimesterChange(index, 'endDate', e.target.value)} className="w-full p-2 border rounded-lg" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-end">
                 <button onClick={handleSave} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700"><Save className="w-5 h-5 ml-2" />حفظ الإعدادات</button>
            </div>
        </div>
    );
};
const ClassStudentsList = ({ selectedClass, onBack }) => {
    const { students } = useContext(AppContext);
    const classStudents = students.filter(s => s.classId === selectedClass.id);
    return (<div className="p-6 bg-white rounded-xl shadow-lg"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-700">قائمة تلاميذ قسم: {selectedClass.name}</h2><button onClick={onBack} className="flex items-center bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"><ArrowRightCircle className="w-5 h-5 ml-2" />رجوع</button></div><div className="overflow-x-auto"><table className="w-full text-right"><thead className="bg-gray-50"><tr><th className="p-4 font-semibold text-gray-600">رقم التسجيل</th><th className="p-4 font-semibold text-gray-600">الاسم الكامل</th><th className="p-4 font-semibold text-gray-600">تاريخ الولادة</th></tr></thead><tbody>{classStudents.map(student => (<tr key={student.id} className="border-b hover:bg-gray-50"><td className="p-4 text-gray-700">{student.id}</td><td className="p-4 text-gray-800 font-medium">{student.name}</td><td className="p-4 text-gray-700">{student.dob}</td></tr>))}{classStudents.length === 0 && <p className="text-center text-gray-500 py-8">لا يوجد تلاميذ في هذا القسم.</p>}</tbody></table></div></div>);
};
const MyClasses = ({ onClassSelect, title="أقسامي" }) => { const { currentUser, classes, students } = useContext(AppContext); const assignedClasses = classes.filter(c => c.mainTeacherId === currentUser.id); return (<div className="p-6"><h2 className="text-2xl font-bold text-gray-700 mb-6">{title}</h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{assignedClasses.map(c => (<div key={c.id} className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"><div><h3 className="text-xl font-bold text-green-700">{c.name}</h3><p className="text-gray-500 mb-4">{c.level}</p><p className="text-sm"><strong className="font-semibold">عدد التلاميذ:</strong> {students.filter(s => s.classId === c.id).length}</p></div><div className="border-t mt-4 pt-4 flex justify-end"><button onClick={() => onClassSelect(c)} className="text-green-600 font-bold hover:text-green-800">إختيار القسم</button></div></div>))}{assignedClasses.length === 0 && <p className="text-center text-gray-500 py-8 col-span-full">لم يتم تعيين أي قسم لك.</p>}</div></div>); };
const TeacherClassesView = () => {
    const [selectedClass, setSelectedClass] = useState(null);
    return selectedClass ? <ClassStudentsList selectedClass={selectedClass} onBack={() => setSelectedClass(null)} /> : <MyClasses onClassSelect={setSelectedClass} />;
};
const GradesManagement = () => { const { students, subjects, grades, setGrades, trimesters } = useContext(AppContext); const [selectedClass, setSelectedClass] = useState(null); const [selectedTrimester, setSelectedTrimester] = useState(''); const [selectedSubjectId, setSelectedSubjectId] = useState(''); const [selectedExamType, setSelectedExamType] = useState(''); const [currentGrades, setCurrentGrades] = useState({}); const classStudents = selectedClass ? students.filter(s => s.classId === selectedClass.id) : []; useEffect(() => { if(selectedClass && selectedTrimester && selectedSubjectId && selectedExamType) { const gradeMap = {}; classStudents.forEach(student => { const gradeObj = grades.find(g => g.studentId === student.id && g.subjectId === selectedSubjectId && g.examType === selectedExamType && g.trimester === selectedTrimester); gradeMap[student.id] = gradeObj ? gradeObj.grade : ''; }); setCurrentGrades(gradeMap); } }, [selectedClass, selectedTrimester, selectedSubjectId, selectedExamType, grades, students]); const handleGradeChange = (studentId, grade) => { if (grade === '' || /^[0-9]*\.?[0-9]*$/.test(grade)) { setCurrentGrades(prev => ({...prev, [studentId]: grade})); } }; const handleSaveGrades = () => { const updatedGrades = [...grades]; Object.entries(currentGrades).forEach(([studentId, grade]) => { const gradeValue = parseFloat(grade); if(isNaN(gradeValue)) return; const existingGradeIndex = updatedGrades.findIndex(g => g.studentId === studentId && g.subjectId === selectedSubjectId && g.examType === selectedExamType && g.trimester === selectedTrimester); if(existingGradeIndex !== -1) { updatedGrades[existingGradeIndex].grade = gradeValue; } else { updatedGrades.push({ id: `G${Math.random()}`, studentId, subjectId: selectedSubjectId, examType: selectedExamType, trimester: selectedTrimester, grade: gradeValue }); } }); setGrades(updatedGrades); alert('تم حفظ الأعداد بنجاح!'); }; if(!selectedClass) { return <MyClasses onClassSelect={setSelectedClass} title="إختر قسما لإدخال الأعداد" />; } return (<div className="p-6 bg-white rounded-xl shadow-lg"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-700">إدخال أعداد قسم: {selectedClass.name}</h2><button onClick={() => setSelectedClass(null)} className="flex items-center bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"><ArrowRightCircle className="w-5 h-5 ml-2" />تغيير القسم</button></div><div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"><select onChange={e => setSelectedTrimester(Number(e.target.value))} value={selectedTrimester} className="w-full p-3 border rounded-lg bg-white"><option value="">-- إختر الثلاثي --</option>{trimesters.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}</select><select onChange={e => setSelectedSubjectId(e.target.value)} value={selectedSubjectId} className="w-full p-3 border rounded-lg bg-white" disabled={!selectedTrimester}><option value="">-- إختر المادة --</option>{subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select><select onChange={e => setSelectedExamType(e.target.value)} value={selectedExamType} className="w-full p-3 border rounded-lg bg-white" disabled={!selectedSubjectId}><option value="">-- إختر نوع الفرض --</option><option>فرض مراقبة عدد 1</option><option>فرض مراقبة عدد 2</option><option>فرض تأليفي</option><option>شفاهي</option></select></div>{selectedTrimester && selectedSubjectId && selectedExamType && (<div><div className="overflow-x-auto"><table className="w-full text-right"><thead className="bg-gray-50"><tr><th className="p-4 font-semibold text-gray-600">اسم التلميذ</th><th className="p-4 font-semibold text-gray-600 w-32">العدد</th></tr></thead><tbody>{classStudents.map(student => (<tr key={student.id} className="border-b"><td className="p-4 text-gray-800 font-medium">{student.name}</td><td className="p-2"><input type="number" step="0.25" min="0" max="20" value={currentGrades[student.id] || ''} onChange={(e) => handleGradeChange(student.id, e.target.value)} className="w-full p-2 text-center border rounded-lg" /></td></tr>))}</tbody></table></div><div className="mt-6 flex justify-end"><button onClick={handleSaveGrades} className="flex items-center bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700"><Save className="w-5 h-5 ml-2" />حفظ الأعداد</button></div></div>)}</div>);};
const AttendanceManagement = () => { const { students, attendanceRecords, setAttendanceRecords } = useContext(AppContext); const [selectedClass, setSelectedClass] = useState(null); const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10)); const [todaysAttendance, setTodaysAttendance] = useState({}); const classStudents = selectedClass ? students.filter(s => s.classId === selectedClass.id) : []; useEffect(() => { const recordsForDate = attendanceRecords[selectedDate] || {}; const initialAttendance = {}; classStudents.forEach(student => { initialAttendance[student.id] = recordsForDate[student.id] || 'present'; }); setTodaysAttendance(initialAttendance); }, [selectedClass, selectedDate, students, attendanceRecords]); const handleStatusChange = (studentId, status) => { setTodaysAttendance(prev => ({...prev, [studentId]: status})); }; const handleSaveAttendance = () => { setAttendanceRecords(prev => ({...prev, [selectedDate]: {...prev[selectedDate], ...todaysAttendance}})); alert('تم حفظ الحضور بنجاح!'); }; if(!selectedClass) { return <MyClasses onClassSelect={setSelectedClass} title="إختر قسما لتسجيل الحضور" />; } return (<div className="p-6 bg-white rounded-xl shadow-lg"><div className="flex justify-between items-center mb-6"><h2 className="text-2xl font-bold text-gray-700">تسجيل الحضور والغياب لقسم: {selectedClass.name}</h2><button onClick={() => setSelectedClass(null)} className="flex items-center bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"><ArrowRightCircle className="w-5 h-5 ml-2" />تغيير القسم</button></div><div className="mb-6 flex items-center gap-4"><label htmlFor="attendance-date" className="font-semibold">التاريخ:</label><input id="attendance-date" type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="p-2 border rounded-lg"/></div><div className="overflow-x-auto"><table className="w-full text-right"><thead className="bg-gray-50"><tr><th className="p-4 font-semibold text-gray-600">اسم التلميذ</th><th className="p-4 font-semibold text-gray-600 text-center">الحالة</th></tr></thead><tbody>{classStudents.map(student => (<tr key={student.id} className="border-b"><td className="p-4 text-gray-800 font-medium">{student.name}</td><td className="p-4 text-center"><div className="flex justify-center items-center gap-x-4"><label className="flex items-center cursor-pointer"><input type="radio" name={`status-${student.id}`} value="present" checked={todaysAttendance[student.id] === 'present'} onChange={() => handleStatusChange(student.id, 'present')} className="ml-2" />حاضر</label><label className="flex items-center cursor-pointer"><input type="radio" name={`status-${student.id}`} value="absent" checked={todaysAttendance[student.id] === 'absent'} onChange={() => handleStatusChange(student.id, 'absent')} className="ml-2" />غائب</label><label className="flex items-center cursor-pointer"><input type="radio" name={`status-${student.id}`} value="late" checked={todaysAttendance[student.id] === 'late'} onChange={() => handleStatusChange(student.id, 'late')} className="ml-2" />متأخر</label></div></td></tr>))}</tbody></table></div><div className="mt-6 flex justify-end"><button onClick={handleSaveAttendance} className="flex items-center bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-700"><Save className="w-5 h-5 ml-2" />حفظ الحضور</button></div></div>);};
const HomeworkManagement = () => {
    const { homeworks, setHomeworks, subjects } = useContext(AppContext);
    const [selectedClass, setSelectedClass] = useState(null);
    if(!selectedClass) { return <MyClasses onClassSelect={setSelectedClass} title="إختر قسما لإدارة الواجبات" />; }
    
    const classHomeworks = homeworks.filter(hw => hw.classId === selectedClass.id);
    const getSubjectName = (id) => subjects.find(s => s.id === id)?.name || 'N/A';
    
    const columns = [{ key: 'subject', label: 'المادة' }, { key: 'title', label: 'العنوان' }, { key: 'dueDate', label: 'آخر أجل' }];
    const renderItem = (item, handleEdit, handleDelete) => (
        <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="p-4 text-gray-700 font-medium">{getSubjectName(item.subjectId)}</td>
            <td className="p-4 text-gray-800">{item.title}</td>
            <td className="p-4 text-gray-700">{item.dueDate}</td>
            <td className="p-4 text-center">
                <button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 mx-2"><Edit className="w-5 h-5" /></button>
                <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 mx-2"><Trash2 className="w-5 h-5" /></button>
            </td>
        </tr>
    );
    
    return (<><button onClick={() => setSelectedClass(null)} className="flex items-center text-gray-600 font-semibold mb-4"><ArrowRightCircle className="w-5 h-5 ml-2" />الرجوع إلى قائمة الأقسام</button><CrudComponent items={classHomeworks} setItems={setHomeworks} FormComponent={HomeworkForm} columns={columns} renderItem={renderItem} itemSingular="واجب" itemPlural={`الواجبات لقسم ${selectedClass.name}`} classId={selectedClass.id} /></>);
};


// --- COMPOSANTS ESPACE PARENT ET ADMIN ---
const ChildGrades = ({studentId}) => {
    const { students, grades, subjects, classes, trimesters } = useContext(AppContext);
    const [activeTrimester, setActiveTrimester] = useState(1);
    const child = students.find(s => s.id === studentId);
    if(!child) return <div className="p-6 bg-white rounded-xl shadow-lg text-center"><p>لم يتم ربط حسابكم بأي تلميذ.</p></div>;

    const calculateSubjectAverage = (subject, trimester) => {
        const subjectGrades = grades.filter(g => g.studentId === studentId && g.subjectId === subject.id && g.trimester === trimester);
        if (subjectGrades.length === 0) return { avg: 'N/A', details: {} };
        const controls = subjectGrades.filter(g => g.examType.includes('مراقبة'));
        const synthesis = subjectGrades.find(g => g.examType.includes('تأليفي'));
        const oral = subjectGrades.find(g => g.examType.includes('شفاهي'));

        let controlAvg = controls.length > 0 ? controls.reduce((sum, g) => sum + g.grade, 0) / controls.length : null;
        if(oral) { controlAvg = controlAvg ? (controlAvg + oral.grade) / 2 : oral.grade; }
        
        let finalAvg;
        if(controlAvg !== null && synthesis) { finalAvg = ((controlAvg * 2) + synthesis.grade) / 3; } 
        else if (controlAvg !== null) { finalAvg = controlAvg; }
        else if (synthesis) { finalAvg = synthesis.grade; }
        else { return { avg: 'N/A', details: {} }; }
        
        return { avg: finalAvg.toFixed(2), details: { controlAvg: controlAvg?.toFixed(2), synthesis: synthesis?.grade.toFixed(2) } };
    };

    const calculateTrimesterAverage = (trimester) => {
        let totalPoints = 0; let totalCoefficients = 0;
        subjects.forEach(subject => {
            const subjectAvgData = calculateSubjectAverage(subject, trimester);
            const subjectAvg = parseFloat(subjectAvgData.avg);
            if(!isNaN(subjectAvg)) { totalPoints += subjectAvg * subject.coefficient; totalCoefficients += subject.coefficient; }
        });
        return totalCoefficients === 0 ? 'N/A' : (totalPoints / totalCoefficients).toFixed(2);
    };

    const generalAverage = () => {
        let trimesterAverages = [];
        trimesters.forEach(t => {
            const avg = parseFloat(calculateTrimesterAverage(t.id));
            if(!isNaN(avg)) trimesterAverages.push(avg);
        });
        return trimesterAverages.length > 0 ? (trimesterAverages.reduce((a,b)=>a+b, 0) / trimesterAverages.length).toFixed(2) : 'N/A';
    };

    const trimesterGrades = grades.filter(g => g.studentId === studentId && g.trimester === activeTrimester).reduce((acc, grade) => { const subject = subjects.find(s => s.id === grade.subjectId); if(!subject) return acc; if(!acc[subject.id]) { acc[subject.id] = { ...subject, grades: [] }; } acc[subject.id].grades.push({ examType: grade.examType, grade: grade.grade }); return acc; }, {});

    return (<div className="p-6">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800">بطاقة أعداد التلميذ: {child.name}</h2>
            <p className="text-gray-500">القسم: {classes.find(c => c.id === child.classId)?.name}</p>
        </div>
        <div className="flex mb-4 border-b">
            {trimesters.map(t => <button key={t.id} onClick={() => setActiveTrimester(t.id)} className={`py-2 px-4 font-semibold ${activeTrimester === t.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>{t.name}</button>)}
            <button onClick={() => setActiveTrimester(0)} className={`py-2 px-4 font-semibold ${activeTrimester === 0 ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>السنوي</button>
        </div>
        
        {activeTrimester > 0 && <div>
            <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-gray-700">المعدل الثلاثي</span>
                <span className={`text-3xl font-bold ${calculateTrimesterAverage(activeTrimester) >= 10 ? 'text-green-600' : 'text-red-600'}`}>{calculateTrimesterAverage(activeTrimester)}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{Object.values(trimesterGrades).map(subject => {
                const { avg, details } = calculateSubjectAverage(subject, activeTrimester);
                const SubjectIcon = subject.icon || Book;
                return (<div key={subject.id} className="bg-white rounded-xl shadow-md p-5">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b">
                        <div className="flex items-center gap-3"><SubjectIcon className="w-6 h-6 text-blue-600" /><h3 className="text-lg font-bold text-gray-700">{subject.name}</h3></div>
                        <span className="text-sm text-gray-500">الضارب: {subject.coefficient}</span>
                    </div>
                    <div className="space-y-2 mb-4 text-sm">{details.controlAvg && <div className="flex justify-between"><span>معدل المراقبة:</span><span className="font-semibold">{details.controlAvg}</span></div>}{details.synthesis && <div className="flex justify-between"><span>الفرض التأليفي:</span><span className="font-semibold">{details.synthesis}</span></div>}{!details.controlAvg && !details.synthesis && subject.grades.map((g,i) => <div key={i} className="flex justify-between"><span>{g.examType}:</span><span className="font-semibold">{g.grade.toFixed(2)}</span></div>)}</div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t"><span className="font-bold text-lg">المعدل</span><span className={`font-bold text-xl ${avg >= 10 ? 'text-green-600' : 'text-red-600'}`}>{avg}</span></div>
                </div>);
            })}</div>
        </div>}

        {activeTrimester === 0 && <div>
             <div className="bg-blue-50 border-r-4 border-blue-500 p-4 rounded-lg flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-gray-700">المعدل السنوي العام</span>
                <span className={`text-3xl font-bold ${generalAverage() >= 10 ? 'text-green-600' : 'text-red-600'}`}>{generalAverage()}</span>
            </div>
        </div>}
    </div>);
};
const ChildAttendance = ({studentId}) => {
    const { students, attendanceRecords } = useContext(AppContext);
    const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // Juin 2025 pour la démo
    const child = students.find(s => s.id === studentId);
    if(!child) return <div className="p-6 bg-white rounded-xl shadow-lg text-center"><p>لم يتم ربط حسابكم بأي تلميذ.</p></div>
    const monthNames = ["جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const daysOfWeek = ["ح", "ن", "ث", "ر", "خ", "ج", "س"];
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const changeMonth = (offset) => { setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1)); };
    const getStatusForDay = (day) => { const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; return attendanceRecords[dateStr]?.[child.id]; };
    return (<div className="p-6 bg-white rounded-xl shadow-lg"><h2 className="text-2xl font-bold text-gray-700 mb-6">متابعة حضور التلميذ: {child.name}</h2><div className="flex items-center justify-between mb-4"><button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-200"><ChevronRightIcon className="w-6 h-6" /></button><h3 className="text-xl font-semibold">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3><button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-200"><ChevronLeft className="w-6 h-6" /></button></div><div className="grid grid-cols-7 gap-2 text-center">{daysOfWeek.map(day => <div key={day} className="font-bold text-gray-500">{day}</div>)}{Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}{Array.from({ length: daysInMonth }).map((_, dayIndex) => { const day = dayIndex + 1; const status = getStatusForDay(day); let bgColor = 'bg-gray-100'; if (status === 'present') bgColor = 'bg-green-100 border-green-500'; else if (status === 'absent') bgColor = 'bg-red-100 border-red-500'; else if (status === 'late') bgColor = 'bg-orange-100 border-orange-500'; return <div key={day} className={`p-3 rounded-lg border-2 ${bgColor}`}>{day}</div>; })}</div><div className="mt-6 flex flex-wrap gap-4 text-sm"><div className="flex items-center"><CheckCircle className="w-4 h-4 text-green-500 ml-2"/>حاضر</div><div className="flex items-center"><XCircle className="w-4 h-4 text-red-500 ml-2" />غائب</div><div className="flex items-center"><Clock className="w-4 h-4 text-orange-500 ml-2" />متأخر</div></div></div>);
};
const ChildHomework = () => {
    const { currentUser, students, classes, homeworks, subjects } = useContext(AppContext);
    const child = students.find(s => s.id === currentUser.childId);
    if (!child) return null;
    const childHomeworks = homeworks.filter(hw => hw.classId === child.classId);
    return (<div className="p-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">الواجبات المنزلية للتلميذ: {child.name}</h2>
            <div className="space-y-4">
            {childHomeworks.length > 0 ? childHomeworks.map(hw => (
                <div key={hw.id} className="bg-white p-5 rounded-lg shadow-md">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-sm text-blue-600">{subjects.find(s => s.id === hw.subjectId)?.name}</p>
                            <h3 className="font-bold text-lg text-gray-800 mb-2">{hw.title}</h3>
                        </div>
                        <span className="text-sm text-gray-500">آخر أجل: {hw.dueDate}</span>
                    </div>
                    <p className="text-gray-600">{hw.description}</p>
                </div>
            )) : <p>لا توجد واجبات حاليا.</p>}
            </div>
        </div>
    );
};
const StudentProfile = ({ studentId, onBack }) => {
    const { students, classes } = useContext(AppContext);
    const student = students.find(s => s.id === studentId);
    if (!student) return <p>لم يتم العثور على التلميذ.</p>;
    return (
      <div>
        <button onClick={onBack} className="flex items-center text-gray-600 font-semibold mb-6 hover:text-blue-600">
            <ArrowRightCircle className="w-5 h-5 ml-2" />
            الرجوع إلى قائمة التلاميذ
        </button>
        <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
             <div className="flex items-center gap-6">
                <UserCircle className="w-24 h-24 text-gray-300" />
                <div>
                     <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
                     <p className="text-gray-500 text-lg">{classes.find(c => c.id === student.classId)?.name}</p>
                     <p className="text-sm text-gray-500">تاريخ الولادة: {student.dob}</p>
                </div>
             </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                 <ChildGrades studentId={student.id} />
            </div>
            <div>
                 <ChildAttendance studentId={student.id} />
            </div>
        </div>
      </div>
    );
};


// --- COMPOSANT DE COMMUNICATION ---
const Announcements = () => {
    const { currentUser, announcements, setAnnouncements } = useContext(AppContext);
    if(currentUser.role === 'admin') { const columns = [ { key: 'date', label: 'التاريخ' }, { key: 'title', label: 'العنوان' } ]; const renderItem = (item, handleEdit, handleDelete) => (<tr key={item.id} className="border-b hover:bg-gray-50"><td className="p-4 text-gray-700">{item.date}</td><td className="p-4 text-gray-800 font-medium">{item.title}</td><td className="p-4 text-center"><button onClick={() => handleEdit(item)} className="text-blue-500 hover:text-blue-700 mx-2"><Edit className="w-5 h-5" /></button><button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 mx-2"><Trash2 className="w-5 h-5" /></button></td></tr>); return <CrudComponent title="قائمة الإعلانات" items={announcements} setItems={setAnnouncements} FormComponent={AnnouncementForm} columns={columns} renderItem={renderItem} itemSingular="إعلان" itemPlural="الإعلانات" />; }
    return (<div className="p-6"><h2 className="text-2xl font-bold text-gray-700 mb-6">الإعلانات</h2><div className="space-y-4">{announcements.map(ann => (<div key={ann.id} className="bg-white p-5 rounded-lg shadow-md"><p className="text-sm text-gray-500 mb-1">{ann.date}</p><h3 className="font-bold text-lg text-blue-800 mb-2">{ann.title}</h3><p className="text-gray-600">{ann.content}</p></div>))}</div></div>);
}
const Messages = () => {
    const { currentUser, messages, setMessages, students, teachers, classes } = useContext(AppContext);
    const [activeConversation, setActiveConversation] = useState(null); const [newMessage, setNewMessage] = useState('');
    const getContactList = () => { if (currentUser.role === 'teacher') { const myClassIds = classes.filter(c => c.mainTeacherId === currentUser.id).map(c => c.id); const parentIds = new Set(students.filter(s => myClassIds.includes(s.classId)).map(s => s.parentId)); return [...parentIds].map(parentId => { const student = students.find(s => s.parentId === parentId); return { id: parentId, name: `ولي التلميذ: ${student.name}` }; }); } if (currentUser.role === 'parent') { const child = students.find(s => s.id === currentUser.childId); if (!child) return []; const mainClass = classes.find(c => c.id === child.classId); if (!mainClass) return []; const mainTeacher = teachers.find(t => t.id === mainClass.mainTeacherId); return mainTeacher ? [{ id: mainTeacher.id, name: mainTeacher.name }] : []; } return []; };
    const contacts = getContactList();
    useEffect(() => { if(currentUser.role === 'parent' && contacts.length > 0) { setActiveConversation(contacts[0].id); } }, [currentUser, contacts.length]);
    const currentMessages = messages.filter(m => (m.fromId === currentUser.id && m.toId === activeConversation) || (m.fromId === activeConversation && m.toId === currentUser.id)).sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));
    const handleSendMessage = (e) => { e.preventDefault(); if (newMessage.trim() === '' || !activeConversation) return; const msg = { id: `M${Date.now()}`, fromId: currentUser.id, toId: activeConversation, text: newMessage, timestamp: new Date().toISOString() }; setMessages([...messages, msg]); setNewMessage(''); };
    return (<div className="flex h-[calc(100vh-10rem)] bg-white rounded-xl shadow-lg">{currentUser.role === 'teacher' && (<div className="w-1/3 border-l-2 border-gray-100"><div className="p-4 border-b font-bold text-lg">قائمة الأولياء</div><ul className="overflow-y-auto h-full">{contacts.map(contact => (<li key={contact.id} onClick={() => setActiveConversation(contact.id)} className={`p-4 cursor-pointer hover:bg-gray-50 ${activeConversation === contact.id ? 'bg-blue-50' : ''}`}>{contact.name}</li>))}</ul></div>)}<div className="flex-1 flex flex-col">{activeConversation ? (<><div className="p-4 border-b flex-shrink-0"><h3 className="font-bold">{contacts.find(c=>c.id === activeConversation)?.name}</h3></div><div className="flex-1 p-4 space-y-4 overflow-y-auto">{currentMessages.map(msg => (<div key={msg.id} className={`flex ${msg.fromId === currentUser.id ? 'justify-end' : 'justify-start'}`}><div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.fromId === currentUser.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}><p>{msg.text}</p></div></div>))}</div><form onSubmit={handleSendMessage} className="p-4 border-t flex-shrink-0 flex gap-2"><input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="اكتب رسالتك..." className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" /><button type="submit" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700"><Send className="w-6 h-6"/></button></form></>) : <div className="flex items-center justify-center h-full text-gray-500">الرجاء إختيار محادثة</div>}</div></div>);
};


// --- COMPOSANTS TABLEAU DE BORD (HOME) ---
const AdminDashboard = () => { const { students, teachers, classes, announcements } = useContext(AppContext); return (<div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"><div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><Users className="w-12 h-12 text-blue-500" /><div><p className="text-gray-500 text-lg">عدد التلاميذ</p><p className="text-3xl font-bold">{students.length}</p></div></div><div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><BookUser className="w-12 h-12 text-green-500" /><div><p className="text-gray-500 text-lg">عدد المعلمين</p><p className="text-3xl font-bold">{teachers.length}</p></div></div><div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><School className="w-12 h-12 text-orange-500" /><div><p className="text-gray-500 text-lg">عدد الأقسام</p><p className="text-3xl font-bold">{classes.length}</p></div></div></div><div className="bg-white p-6 rounded-xl shadow-lg"><h3 className="text-xl font-bold text-gray-700 mb-4">آخر الإعلانات</h3><div className="space-y-3">{announcements.slice(0, 3).map(ann => (<div key={ann.id} className="border-b pb-3"><p className="font-semibold text-blue-800">{ann.title}</p><p className="text-sm text-gray-600">{ann.content.substring(0, 100)}...</p><p className="text-xs text-gray-400 mt-1">{ann.date}</p></div>))}</div></div></div>);};
const TeacherDashboard = () => { const { currentUser, classes, students } = useContext(AppContext); const myClasses = classes.filter(c => c.mainTeacherId === currentUser.id); const myStudentsCount = students.filter(s => myClasses.some(c => c.id === s.classId)).length; return (<div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><School className="w-12 h-12 text-green-500" /><div><p className="text-gray-500 text-lg">الأقسام المسؤولة</p><p className="text-3xl font-bold">{myClasses.length}</p></div></div><div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><Users className="w-12 h-12 text-blue-500" /><div><p className="text-gray-500 text-lg">مجموع التلاميذ</p><p className="text-3xl font-bold">{myStudentsCount}</p></div></div><div className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg"><h3 className="text-xl font-bold text-gray-700 mb-4">جدول الحصص (قيد الإنشاء)</h3><p className="text-gray-500">سيتم عرض جدول الحصص الخاص بك هنا.</p></div></div>);};
const ParentDashboard = () => {
    const { currentUser, students, grades, subjects, announcements, attendanceRecords } = useContext(AppContext);
    const child = students.find(s => s.id === currentUser.childId);
    const calculateGeneralAverage = () => { if (!child) return 'N/A'; const childGrades = grades.filter(g => g.studentId === child.id); const gradesBySubject = childGrades.reduce((acc, grade) => { const subject = subjects.find(s => s.id === grade.subjectId); if(!subject) return acc; if(!acc[subject.id]) { acc[subject.id] = { ...subject, grades: [] }; } acc[subject.id].grades.push({ grade: grade.grade }); return acc; }, {}); let totalPoints = 0; let totalCoefficients = 0; Object.values(gradesBySubject).forEach(subject => { if (!subject.grades || subject.grades.length === 0) return; const subjectAvg = subject.grades.reduce((sum, g) => sum + g.grade, 0) / subject.grades.length; if(!isNaN(subjectAvg)) { totalPoints += subjectAvg * subject.coefficient; totalCoefficients += subject.coefficient; } }); return totalCoefficients === 0 ? 'N/A' : (totalPoints / totalCoefficients).toFixed(2); };
    const generalAverage = calculateGeneralAverage();
    const absencesThisMonth = Object.values(attendanceRecords).filter(record => record[child?.id] === 'absent').length;

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><BarChart2 className="w-12 h-12 text-blue-500" /><div><p className="text-gray-500 text-lg">المعدل العام</p><p className={`text-3xl font-bold ${generalAverage >= 10 ? 'text-green-600' : 'text-red-600'}`}>{generalAverage}</p></div></div>
                <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4"><CalendarDays className="w-12 h-12 text-red-500" /><div><p className="text-gray-500 text-lg">الغيابات هذا الشهر</p><p className="text-3xl font-bold">{absencesThisMonth}</p></div></div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-700 mb-4">آخر إعلان</h3>
                {announcements.length > 0 ? (<div className="border-b pb-3"><p className="font-semibold text-blue-800">{announcements[0].title}</p><p className="text-sm text-gray-600">{announcements[0].content}</p><p className="text-xs text-gray-400 mt-1">{announcements[0].date}</p></div>) : <p>لا توجد إعلانات حاليا.</p>}
            </div>
        </div>
    );
};


// --- TABLEAU DE BORD PRINCIPAL ---
const Dashboard = () => {
    const { currentUser, logout } = useContext(AppContext);
    const [activeComponent, setActiveComponent] = useState('home');
    const [viewingStudentId, setViewingStudentId] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleViewStudent = (studentId) => {
        setViewingStudentId(studentId);
        setActiveComponent('student-profile');
    };
    
    const handleMenuItemClick = (id) => {
        setActiveComponent(id);
        setIsSidebarOpen(false); // Fermer le menu sur mobile après un clic
    }

    const renderComponent = () => {
        if (activeComponent === 'student-profile') {
            return <StudentProfile studentId={viewingStudentId} onBack={() => setActiveComponent('students')} />;
        }
        const components = {
            home: { admin: <AdminDashboard />, teacher: <TeacherDashboard />, parent: <ParentDashboard /> }[currentUser.role],
            students: <StudentsManagement onViewStudent={handleViewStudent} />, 
            teachers: <TeachersManagement />, 
            parents: <ParentsManagement />,
            classes: <ClassesManagement />, 
            subjects: <SubjectsManagement />, 
            announcements: <Announcements />,
            myclasses: <TeacherClassesView />, 
            grades: <GradesManagement />, 
            attendance: <AttendanceManagement />, 
            homework: <HomeworkManagement/>,
            childgrades: <ChildGrades studentId={currentUser.childId} />, 
            childattendance: <ChildAttendance studentId={currentUser.childId} />, 
            childhomework: <ChildHomework />, 
            messages: <Messages />,
            schoolyear: <SchoolYearManagement />,
        };
        return components[activeComponent.replace(/-/g, '')] || <h2 className="text-3xl font-bold text-gray-700">مرحبا بك (قيد الإنشاء)</h2>;
    };
    
    const menuItems = {
      admin: [ { id: 'home', label: 'الرئيسية', icon: Home }, { id: 'students', label: 'إدارة التلاميذ', icon: Users }, { id: 'teachers', label: 'إدارة المعلمين', icon: BookUser }, { id: 'parents', label: 'إدارة الأولياء', icon: Users }, { id: 'classes', label: 'إدارة الأقسام', icon: School }, { id: 'subjects', label: 'إدارة المواد', icon: Book }, {id: 'school-year', label: 'السنة الدراسية', icon: Settings}, { id: 'announcements', label: 'الإعلانات', icon: Megaphone } ],
      teacher: [ { id: 'home', label: 'الرئيسية', icon: Home }, { id: 'my-classes', label: 'أقسامي', icon: School }, { id: 'grades', label: 'إدخال الأعداد', icon: GraduationCap }, { id: 'attendance', label: 'الحضور والغياب', icon: ClipboardList }, {id: 'homework', label: 'الواجبات المنزلية', icon: Book}, { id: 'announcements', label: 'الإعلانات', icon: Megaphone }, { id: 'messages', label: 'الرسائل', icon: MessageSquare } ],
      parent: [ { id: 'home', label: 'الرئيسية', icon: Home }, { id: 'child-grades', label: 'أعداد ابني/ابنتي', icon: GraduationCap }, { id: 'child-attendance', label: 'حضور ابني/ابنتي', icon: ClipboardList }, { id: 'child-homework', label: 'الواجبات', icon: Book }, { id: 'announcements', label: 'الإعلانات', icon: Megaphone }, { id: 'messages', label: 'الرسائل', icon: MessageSquare } ]
    };

    return (
        <div className="relative md:flex h-screen bg-gray-50 overflow-hidden">
            {/* Overlay pour mobile */}
            {isSidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            <aside className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg flex flex-col transition-transform duration-300 ease-in-out z-30 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0`}>
                <div className="h-20 flex items-center justify-center border-b"><School className="w-8 h-8 text-blue-600" /><span className="mr-3 font-bold text-xl text-gray-800">فضاء المعهد</span></div>
                <nav className="flex-1 px-4 py-4 overflow-y-auto"><ul>{(menuItems[currentUser?.role] || []).map(item => (<li key={item.id} className="mb-2"><a href="#" onClick={(e) => { e.preventDefault(); handleMenuItemClick(item.id); }} className={`flex items-center p-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 ${activeComponent === item.id ? 'bg-blue-100 text-blue-700 font-bold' : ''}`}><item.icon className="w-5 h-5" /><span className="mr-4">{item.label}</span></a></li>))}</ul></nav>
                <div className="p-4 border-t"><button onClick={logout} className="w-full flex items-center justify-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"><LogOut className="w-5 h-5"/><span className="mr-3 font-semibold">تسجيل الخروج</span></button></div>
            </aside>
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-4 md:px-8">
                     <div className="flex items-center">
                        <button className="p-2 md:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="w-6 h-6 text-gray-700" />
                        </button>
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                            <UserCircle className="w-8 h-8 text-gray-600"/>
                        </div>
                        <div><h1 className="text-lg md:text-xl font-bold text-gray-800">مرحبا بك، {currentUser?.name}</h1><p className="text-sm text-gray-500 capitalize">{currentUser?.role === 'admin' ? 'مدير' : currentUser?.role === 'teacher' ? 'معلم' : 'ولي'}</p></div>
                     </div>
                </header>
                <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-100">{renderComponent()}</div>
                 <footer className="text-center p-4 text-gray-500 text-sm">
                    Développé par AYMEN GHARBI 2025
                </footer>
            </main>
        </div>
    );
};

// Effets visuels pour le modal
const style = document.createElement('style');
style.innerHTML = `@keyframes fade-in-scale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } } .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }`;
document.head.appendChild(style);
