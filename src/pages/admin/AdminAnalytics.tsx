import {
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from 'recharts';
import { TrendingUp, Users, Award, MapPin } from 'lucide-react';

export default function AdminAnalytics() {
  const growthData = [
    { month: 'Jan', students: 120, applications: 45, placements: 8 },
    { month: 'Feb', students: 280, applications: 110, placements: 22 },
    { month: 'Mar', students: 450, applications: 180, placements: 38 },
    { month: 'Apr', students: 720, applications: 290, placements: 55 },
    { month: 'May', students: 1100, applications: 450, placements: 88 },
    { month: 'Jun', students: 1500, applications: 620, placements: 120 },
    { month: 'Jul', students: 2100, applications: 880, placements: 165 },
    { month: 'Aug', students: 2800, applications: 1200, placements: 220 },
    { month: 'Sep', students: 3500, applications: 1550, placements: 290 },
    { month: 'Oct', students: 4800, applications: 2100, placements: 380 },
    { month: 'Nov', students: 6200, applications: 2800, placements: 490 },
    { month: 'Dec', students: 7800, applications: 3500, placements: 620 },
  ];

  const categoryData = [
    { name: 'Software Dev', value: 35, color: '#3366ff' },
    { name: 'Data & AI', value: 25, color: '#13a892' },
    { name: 'Web Dev', value: 20, color: '#f59e0b' },
    { name: 'Cloud', value: 12, color: '#8b5cf6' },
    { name: 'Security', value: 8, color: '#ef4444' },
  ];

  const skillDemandData = [
    { skill: 'Java', demand: 85, fill: '#3366ff' },
    { skill: 'Python', demand: 92, fill: '#13a892' },
    { skill: 'React', demand: 78, fill: '#f59e0b' },
    { skill: 'SQL', demand: 88, fill: '#8b5cf6' },
    { skill: 'Cloud', demand: 65, fill: '#ef4444' },
    { skill: 'Analytics', demand: 72, fill: '#06b6d4' },
  ];

  const ruralData = [
    { state: 'Tamil Nadu', students: 3200, color: '#3366ff' },
    { state: 'Karnataka', students: 2400, color: '#13a892' },
    { state: 'Kerala', students: 1800, color: '#f59e0b' },
    { state: 'Andhra Pradesh', students: 1500, color: '#8b5cf6' },
    { state: 'Telangana', students: 1100, color: '#ef4444' },
  ];

  const placementRate = [
    { name: 'Placement Rate', value: 78, fill: '#13a892' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Analytics</h1>
        <p className="text-sm text-ink-500 mt-1">Platform-wide analytics and impact metrics.</p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Avg Skill Improvement', value: '78%', icon: TrendingUp, color: 'text-brand-600' },
          { label: 'Placement Rate', value: '78%', icon: Award, color: 'text-teal-600' },
          { label: 'Rural Students', value: '10,000+', icon: Users, color: 'text-amber-600' },
          { label: 'States Covered', value: '5', icon: MapPin, color: 'text-emerald-600' },
        ].map((m, i) => (
          <div key={i} className="card p-4">
            <m.icon className={`w-5 h-5 mb-2 ${m.color}`} />
            <p className="text-2xl font-bold text-ink-900 font-display">{m.value}</p>
            <p className="text-xs text-ink-500">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Growth chart */}
      <div className="card p-5">
        <h3 className="font-semibold text-ink-900 mb-4">Platform Growth Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={growthData}>
            <defs>
              <linearGradient id="cStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3366ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3366ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cApps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#13a892" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#13a892" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="cPlacements" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#8593aa' }} />
            <YAxis tick={{ fontSize: 11, fill: '#8593aa' }} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #eceef2', fontSize: '12px' }} />
            <Area type="monotone" dataKey="students" stroke="#3366ff" strokeWidth={2} fill="url(#cStudents)" name="Students" />
            <Area type="monotone" dataKey="applications" stroke="#13a892" strokeWidth={2} fill="url(#cApps)" name="Applications" />
            <Area type="monotone" dataKey="placements" stroke="#f59e0b" strokeWidth={2} fill="url(#cPlacements)" name="Placements" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Internship categories */}
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

        {/* Skill demand */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-4">Skill Demand</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={skillDemandData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#8593aa' }} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 11, fill: '#8593aa' }} width={80} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #eceef2', fontSize: '12px' }} />
              <Bar dataKey="demand" radius={[0, 6, 6, 0]}>
                {skillDemandData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rural participation */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-4">Rural Participation by State</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={ruralData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="state" tick={{ fontSize: 10, fill: '#8593aa' }} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11, fill: '#8593aa' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #eceef2', fontSize: '12px' }} />
              <Bar dataKey="students" radius={[6, 6, 0, 0]}>
                {ruralData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Placement rate */}
        <div className="card p-5">
          <h3 className="font-semibold text-ink-900 mb-4">Placement Rate</h3>
          <ResponsiveContainer width="100%" height={260}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={placementRate} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#13a892" background={{ fill: '#f0f0f0' }} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '28px', fontWeight: 'bold', fill: '#13a892' }}>
                78%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
