import React, { useState } from 'react';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  Mail,
  FileText,
  Search,
  Filter,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const complaintTypeData = [
  { name: '评分异议', value: 12, color: '#f59e0b' },
  { name: '考试纪律', value: 5, color: '#ef4444' },
  { name: '录取公平', value: 8, color: '#3b82f6' },
  { name: '信息公开', value: 3, color: '#10b981' },
  { name: '服务态度', value: 2, color: '#8b5cf6' },
  { name: '其他', value: 4, color: '#6b7280' },
];

const monthlyComplaints = [
  { month: '1月', 信访量: 2, 处理量: 2 },
  { month: '2月', 信访量: 5, 处理量: 4 },
  { month: '3月', 信访量: 12, 处理量: 10 },
  { month: '4月', 信访量: 8, 处理量: 8 },
  { month: '5月', 信访量: 6, 处理量: 5 },
  { month: '6月', 信访量: 1, 处理量: 1 },
];

interface Complaint {
  id: string;
  date: string;
  type: string;
  source: string;
  content: string;
  status: 'pending' | 'processing' | 'resolved' | 'closed';
  handler: string;
  priority: 'high' | 'medium' | 'low';
}

const complaints: Complaint[] = [
  { id: 'XF2026001', date: '2026-03-15', type: '评分异议', source: '电话', content: '考生家长反映美术类复试评分存在不公，要求复查试卷', status: 'resolved', handler: '张纪检员', priority: 'high' },
  { id: 'XF2026002', date: '2026-03-18', type: '考试纪律', source: '来信', content: '举报某考场存在考生作弊行为，附带照片证据', status: 'resolved', handler: '李纪检员', priority: 'high' },
  { id: 'XF2026003', date: '2026-03-22', type: '录取公平', source: '网络', content: '质疑某考生加分资格，要求公示加分依据', status: 'processing', handler: '王纪检员', priority: 'medium' },
  { id: 'XF2026004', date: '2026-04-01', type: '信息公开', source: '来访', content: '要求公开舞蹈类专业课评分细则和评分教师名单', status: 'resolved', handler: '赵纪检员', priority: 'low' },
  { id: 'XF2026005', date: '2026-04-05', type: '评分异议', source: '电话', content: '音乐类考生对初试成绩有异议，申请成绩复核', status: 'processing', handler: '张纪检员', priority: 'medium' },
  { id: 'XF2026006', date: '2026-04-10', type: '录取公平', source: '网络', content: '反映某省招生名额分配不合理，要求说明依据', status: 'pending', handler: '待分配', priority: 'medium' },
  { id: 'XF2026007', date: '2026-04-12', type: '服务态度', source: '电话', content: '投诉招生咨询电话长时间无人接听', status: 'closed', handler: '李纪检员', priority: 'low' },
  { id: 'XF2026008', date: '2026-04-15', type: '评分异议', source: '来信', content: '戏剧影视类考生反映面试评分标准不透明', status: 'pending', handler: '待分配', priority: 'high' },
];

const statusConfig = {
  pending: { label: '待处理', color: 'bg-red-100 text-red-700', icon: AlertTriangle },
  processing: { label: '处理中', color: 'bg-amber-100 text-amber-700', icon: Clock },
  resolved: { label: '已解决', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  closed: { label: '已结案', color: 'bg-slate-100 text-slate-600', icon: CheckCircle },
};

const priorityConfig = {
  high: { label: '高', color: 'text-red-600 bg-red-50' },
  medium: { label: '中', color: 'text-amber-600 bg-amber-50' },
  low: { label: '低', color: 'text-green-600 bg-green-50' },
};

export default function ComplaintManagement() {
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComplaints = complaints.filter(c => {
    const matchFilter = filter === 'all' || c.status === filter;
    const matchSearch = searchTerm === '' || c.content.includes(searchTerm) || c.id.includes(searchTerm);
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">信访举报管理</h2>
          <p className="text-slate-500 mt-1">受理、处理和跟踪信访举报事项</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">待处理 {complaints.filter(c => c.status === 'pending').length} 件</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '本月新增', value: '3', icon: MessageSquare, color: 'bg-blue-500' },
          { label: '处理中', value: '2', icon: Clock, color: 'bg-amber-500' },
          { label: '已解决', value: '28', icon: CheckCircle, color: 'bg-green-500' },
          { label: '处理及时率', value: '95%', icon: FileText, color: 'bg-purple-500' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
              <div className={`${stat.color} w-9 h-9 rounded-lg flex items-center justify-center mb-2`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">信访类型分布</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={complaintTypeData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {complaintTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">月度信访趋势</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyComplaints}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="信访量" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="处理量" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜索编号或内容..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>
        <div className="flex gap-2">
          {[
            { key: 'all', label: '全部' },
            { key: 'pending', label: '待处理' },
            { key: 'processing', label: '处理中' },
            { key: 'resolved', label: '已解决' },
            { key: 'closed', label: '已结案' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                filter === tab.key
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complaint List */}
      <div className="space-y-3">
        {filteredComplaints.map((complaint) => {
          const status = statusConfig[complaint.status];
          const priority = priorityConfig[complaint.priority];
          const StatusIcon = status.icon;
          return (
            <div key={complaint.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{complaint.id}</span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${priority.color}`}>{priority.label}优先级</span>
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 mb-2">{complaint.content}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {complaint.date}</span>
                    <span className="flex items-center gap-1">
                      {complaint.source === '电话' ? <Phone className="w-3 h-3" /> : complaint.source === '来信' ? <Mail className="w-3 h-3" /> : <MessageSquare className="w-3 h-3" />}
                      {complaint.source}
                    </span>
                    <span className="bg-slate-50 px-2 py-0.5 rounded">{complaint.type}</span>
                    <span>处理人：{complaint.handler}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
