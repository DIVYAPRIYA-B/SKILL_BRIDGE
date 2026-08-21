import { Users, Building2, Briefcase, FileText, CheckCircle2, TrendingUp } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { useApp } from '@/context/AppContext';
import DashboardCard from '@/components/ui/DashboardCard';

export default function AdminDashboard() {
  const { users, students, companies, internships, applications } = useApp();

  const totalStudents = students.length;
  const totalCompanies = companies.length;
  const activeInternships = internships.filter((i) => i.status === 'active').length;
  const totalApps = applications.length;
  const selectedStudents = applications.filter((a) => a.status === 'selected').length;
  const placements = applications.filter((a) => a.status === 'selected').length;

  // Student growth (demo monthly data)
  const growthData = [
    { month: 'Jan', students: 120 }, { month: 'Feb', students: 280 }, { month: 'Mar', students: 450 },
    { month: 'Apr', students: 720 }, { month: 'May', students: 1100 }, { month: 'Jun', students: 1500 },
    { month: 'Jul', students: 2100 }, { month: 'Aug', students: 2800 }, { month: 'Sep', students: 3500 },
    { month: 'Oct', students: 4800 }, { month: 'Nov', students: 6200 }, { month: 'Dec', students: 7800 },
  ];

  // Internship categories
  const categoryData = [
    { name: 'Software Dev', value: 35, color: '#3366ff' },
    { name: 'Data & AI', value: 25, color: '#13a892' },
    { name: 'Web Dev', value: 20, color: '#f59e0b' },
    { name: 'Cloud', value: 12, color: '#8b5cf6' },
    { name: 'Security', value: 8, color: '#ef4444' },
  ];

  // Skill demand
  const skillDemandData = [
    { skill: 'Java', demand: 85 }, { skill: 'Python', demand: 92 }, { skill: 'React', demand: 78 },
    { skill: 'SQL', demand: 88 }, { skill: 'Cloud', demand: 65 }, { skill: 'Data Analytics', demand: 72 },
  ];

  // Rural participation by state
  const ruralData = [
    { state: 'Tamil Nadu', students: 3200 }, { state: 'Karnataka', students: 2400 },
    { state: 'Kerala', students: 1800 }, { state: 'Andhra Pradesh', students: 1500 },
    { state: 'Telangana', students: 1100 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Admin Dashboard</h1>
        <p className="text-sm text-ink-500 mt-1">Platform overview and impact analytics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <DashboardCard label="Total Students" value={totalStudents + 9978} icon={<Users className="w-5 h-5" />} color="brand" />
        <DashboardCard label="Industry Partners" value={totalCompanies + 495} icon={<Building2 className="w-5 h-5" />} color="teal" />
        <DashboardCard label="Active Internships" value={activeInternships + 2492} icon={<Briefcase className="w-5 h-5" />} color="amber" />
        <DashboardCard label="Total Applications" value={totalApps + 4997} icon={<FileText className="w-5 h-5" />} color="brand" />
        <DashboardCard label="Selected Students" value={selectedStudents + 649} icon={<CheckCircle2 className="w-5 h-5" />} color="emerald" />
        <DashboardCard label="Placements" value={placements + 649} icon={<TrendingUp className="w-5 h-5" />} color="teal" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Student Growth */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-4">Student Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3366ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3366ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8593aa' }} />
              <YAxis tick={{ fontSize: 11, fill: '#8593aa' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #eceef2', fontSize: '12px' }} />
              <Area type="monotone" dataKey="students" stroke="#3366ff" strokeWidth={2} fill="url(#colorStudents)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Internship Categories */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-4">Internship Categories</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={(e) => e.name} labelLine={false} style={{ fontSize: 11 }}>
                {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #eceef2', fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Demand */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-4">Skill Demand</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={skillDemandData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#8593aa' }} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: '#8593aa' }} width={80} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #eceef2', fontSize: '12px' }} />
              <Bar dataKey="demand" fill="#3366ff" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rural Participation */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-4">Rural Participation by State</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ruralData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#8593aa' }} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11, fill: '#8593aa' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #eceef2', fontSize: '12px' }} />
              <Bar dataKey="students" fill="#13a892" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
