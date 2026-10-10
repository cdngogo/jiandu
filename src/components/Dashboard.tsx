import React from 'react';
import {
  Users,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Shield,
  Eye,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const monthlyData = [
  { month: '1月', 报名人数: 1200, 考试人数: 980, 录取人数: 0 },
  { month: '2月', 报名人数: 2800, 考试人数: 2400, 录取人数: 0 },
  { month: '3月', 报名人数: 3500, 考试人数: 3200, 录取人数: 0 },
  { month: '4月', 报名人数: 3800, 考试人数: 3600, 录取人数: 120 },
  { month: '5月', 报名人数: 4000, 考试人数: 3900, 录取人数: 580 },
  { month: '6月', 报名人数: 4200, 考试人数: 4100, 录取人数: 1200 },
];

const categoryData = [
  { name: '美术类', value: 1800, color: '#f59e0b' },
  { name: '音乐类', value: 960, color: '#3b82f6' },
  { name: '舞蹈类', value: 520, color: '#10b981' },
  { name: '戏剧影视类', value: 680, color: '#8b5cf6' },
  { name: '书法类', value: 240, color: '#ef4444' },
];

const recentActivities = [
  { time: '09:30', event: '美术类复试评分完成，共评审作品1200份', type: 'success' },
  { time: '10:15', event: '收到信访举报1件，已转交纪检监察组', type: 'warning' },
  { time: '11:00', event: '音乐类初试考场巡查完毕，无异常', type: 'info' },
  { time: '14:20', event: '舞蹈类评分标准审核通过', type: 'success' },
  { time: '15:45', event: '发现1名考生身份存疑，已启动核查程序', type: 'warning' },
  { time: '16:30', event: '戏剧影视类复试安排已公示', type: 'info' },
];

const supervisionStats = [
  { label: '报名考生总数', value: '4,200', icon: Users, color: 'bg-blue-500', change: '+12%' },
  { label: '已完成考试场次', value: '86', icon: FileCheck, color: 'bg-green-500', change: '92%' },
  { label: '风险预警数', value: '7', icon: AlertTriangle, color: 'bg-red-500', change: '-3' },
  { label: '监督覆盖率', value: '100%', icon: Eye, color: 'bg-amber-500', change: '达标' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">监督工作总览</h2>
          <p className="text-slate-500 mt-1">2025-2026学年艺术类招生考试监督情况</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">系统运行正常</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supervisionStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">招生监督趋势</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-blue-500"></span>报名</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500"></span>考试</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500"></span>录取</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
              <Area type="monotone" dataKey="报名人数" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              <Area type="monotone" dataKey="考试人数" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
              <Area type="monotone" dataKey="录取人数" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">各专业报名分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-medium text-slate-800">{item.value}人</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security Posture Bar */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            安全态势感知
          </h3>
          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">系统安全等级：A</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: '数据加密', value: '100%', status: 'ok' },
            { label: '权限合规', value: '99.8%', status: 'ok' },
            { label: '审计完整', value: '100%', status: 'ok' },
            { label: '异常告警', value: '3', status: 'warn' },
            { label: '备份状态', value: '正常', status: 'ok' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur">
              <p className="text-xs text-slate-300">{item.label}</p>
              <p className={`text-lg font-bold ${item.status === 'warn' ? 'text-amber-300' : 'text-green-300'}`}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">最新监督动态</h3>
            <span className="text-xs text-slate-400">今日</span>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700">{activity.event}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">监督工作指标</h3>
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-5">
            {[
              { label: '考场巡查覆盖率', value: 98, color: 'bg-green-500' },
              { label: '评分监督到位率', value: 100, color: 'bg-blue-500' },
              { label: '信访处理及时率', value: 95, color: 'bg-amber-500' },
              { label: '风险处置完成率', value: 86, color: 'bg-purple-500' },
              { label: '信息公开及时率', value: 100, color: 'bg-teal-500' },
            ].map((metric) => (
              <div key={metric.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-600">{metric.label}</span>
                  <span className="text-sm font-semibold text-slate-800">{metric.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5">
                  <div
                    className={`${metric.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
