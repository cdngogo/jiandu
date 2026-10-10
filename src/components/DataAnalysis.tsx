import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  TrendingUp,
  Users,
  Award,
  FileText,
  Download,
  Calendar,
} from 'lucide-react';

const yearlyTrend = [
  { year: '2021', 报名人数: 2800, 录取人数: 580, 录取率: 20.7 },
  { year: '2022', 报名人数: 3200, 录取人数: 620, 录取率: 19.4 },
  { year: '2023', 报名人数: 3600, 录取人数: 660, 录取率: 18.3 },
  { year: '2024', 报名人数: 3900, 录取人数: 690, 录取率: 17.7 },
  { year: '2025', 报名人数: 4200, 录取人数: 700, 录取率: 16.7 },
];

const provinceData = [
  { province: '山东', 人数: 680 },
  { province: '河南', 人数: 520 },
  { province: '广东', 人数: 450 },
  { province: '江苏', 人数: 380 },
  { province: '浙江', 人数: 350 },
  { province: '四川', 人数: 320 },
  { province: '湖北', 人数: 280 },
  { province: '湖南', 人数: 260 },
  { province: '河北', 人数: 240 },
  { province: '其他', 人数: 720 },
];

const supervisionEffectiveness = [
  { subject: '考试公平性', 得分: 95 },
  { subject: '评分公正性', 得分: 92 },
  { subject: '信息公开度', 得分: 98 },
  { subject: '信访处理率', 得分: 96 },
  { subject: '风险处置率', 得分: 89 },
  { subject: '社会满意度', 得分: 91 },
];

const categoryComparison = [
  { category: '美术类', '2024年': 1650, '2025年': 1800 },
  { category: '音乐类', '2024年': 880, '2025年': 960 },
  { category: '舞蹈类', '2024年': 480, '2025年': 520 },
  { category: '戏剧影视', '2024年': 620, '2025年': 680 },
  { category: '书法类', '2024年': 220, '2025年': 240 },
];

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6b7280'];

export default function DataAnalysis() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">数据分析</h2>
          <p className="text-slate-500 mt-1">招生监督工作数据统计与分析</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4" />
            2025-2026学年
          </button>
          <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-600 transition-colors">
            <Download className="w-4 h-4" />
            导出报告
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '五年报名增长', value: '+50%', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: '累计监督考生', value: '17,700', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: '监督场次', value: '430+', icon: Award, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: '信访处理件数', value: '156', icon: FileText, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className={`${stat.bg} rounded-xl p-4 border border-slate-100`}>
              <Icon className={`w-6 h-6 ${stat.color} mb-2`} />
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">五年招生趋势</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={yearlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Line type="monotone" dataKey="报名人数" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              <Line type="monotone" dataKey="录取人数" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">生源省份分布（Top 10）</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={provinceData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" stroke="#94a3b8" fontSize={12} />
              <YAxis type="category" dataKey="province" stroke="#94a3b8" fontSize={12} width={50} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="人数" radius={[0, 4, 4, 0]}>
                {provinceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">各专业年度对比</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={categoryComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="2024年" name="2024年" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="2025年" name="2025年" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">监督工作成效评估</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={supervisionEffectiveness}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" fontSize={11} stroke="#64748b" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
              <Radar name="成效得分" dataKey="得分" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">数据分析结论</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="border-l-4 border-amber-500 pl-4">
              <h4 className="font-semibold text-slate-800">报名趋势分析</h4>
              <p className="text-sm text-slate-600 mt-1">近五年报名人数持续增长，年均增长率约10.7%。2025年达到4200人，竞争日趋激烈，录取率降至16.7%。</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-slate-800">生源结构分析</h4>
              <p className="text-sm text-slate-600 mt-1">山东省生源占比最高（16.2%），前10省份生源占比83.3%。美术类仍为最大专业类别，占比42.9%。</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-slate-800">监督成效评估</h4>
              <p className="text-sm text-slate-600 mt-1">信息公开度得分最高（98分），风险处置率有待提升（89分）。整体监督工作社会满意度达91分。</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-slate-800">信访趋势分析</h4>
              <p className="text-sm text-slate-600 mt-1">信访量集中在3-4月考试季，评分异议类占比最高（35.3%）。处理及时率95%，满意率92%。</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-slate-800">风险防控分析</h4>
              <p className="text-sm text-slate-600 mt-1">本年度共识别风险点12个，已全部妥善处置。评分偏差和身份核验为主要风险领域。</p>
            </div>
            <div className="border-l-4 border-teal-500 pl-4">
              <h4 className="font-semibold text-slate-800">改进建议</h4>
              <p className="text-sm text-slate-600 mt-1">建议加强评分教师培训，完善身份核验系统，优化信访处理流程，提升风险预警智能化水平。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
