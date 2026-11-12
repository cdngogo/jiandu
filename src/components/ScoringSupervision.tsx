import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from 'recharts';
import { CheckCircle, AlertTriangle, Eye, Scale, RefreshCw, Shield } from 'lucide-react';

const scoreDistribution = [
  { range: '60以下', count: 45, color: '#ef4444' },
  { range: '60-69', count: 120, color: '#f97316' },
  { range: '70-79', count: 580, color: '#eab308' },
  { range: '80-89', count: 1200, color: '#22c55e' },
  { range: '90-95', count: 800, color: '#3b82f6' },
  { range: '95以上', count: 155, color: '#8b5cf6' },
];

const radarData = [
  { subject: '评分一致性', A: 92 },
  { subject: '标准执行', A: 96 },
  { subject: '回避制度', A: 100 },
  { subject: '监督覆盖', A: 98 },
  { subject: '申诉处理', A: 88 },
  { subject: '信息公开', A: 95 },
];

interface ScoringRecord {
  id: string;
  examId: string;
  category: string;
  examiner: string;
  avgScore: number;
  deviation: number;
  status: 'normal' | 'review' | 'approved';
  reviewedBy: string;
}

const scoringRecords: ScoringRecord[] = [
  { id: 'S001', examId: 'A101', category: '素描', examiner: '张教授（组长）', avgScore: 82.5, deviation: 2.1, status: 'approved', reviewedBy: '李监督员' },
  { id: 'S002', examId: 'A101', category: '素描', examiner: '王教授', avgScore: 81.8, deviation: 1.8, status: 'approved', reviewedBy: '李监督员' },
  { id: 'S003', examId: 'A101', category: '素描', examiner: '刘教授', avgScore: 83.2, deviation: 3.5, status: 'review', reviewedBy: '待审核' },
  { id: 'S004', examId: 'B101', category: '声乐', examiner: '陈教授（组长）', avgScore: 85.3, deviation: 1.2, status: 'approved', reviewedBy: '赵监督员' },
  { id: 'S005', examId: 'B101', category: '声乐', examiner: '吴教授', avgScore: 84.7, deviation: 2.0, status: 'approved', reviewedBy: '赵监督员' },
  { id: 'S006', examId: 'C101', category: '舞蹈', examiner: '周教授（组长）', avgScore: 87.1, deviation: 1.5, status: 'normal', reviewedBy: '待审核' },
  { id: 'S007', examId: 'C101', category: '舞蹈', examiner: '孙教授', avgScore: 86.4, deviation: 4.8, status: 'review', reviewedBy: '待审核' },
  { id: 'S008', examId: 'D101', category: '表演', examiner: '马教授（组长）', avgScore: 79.6, deviation: 2.3, status: 'normal', reviewedBy: '待审核' },
];

export default function ScoringSupervision() {
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'rules'>('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">评分监督</h2>
          <p className="text-slate-500 mt-1">确保评分过程公平、公正、公开</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
            <Shield className="w-4 h-4" />
            <span className="text-sm">评分监督全覆盖</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'overview', label: '评分概况' },
          { key: 'records', label: '评分记录' },
          { key: 'rules', label: '评分规则' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-amber-500 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Score Distribution & Radar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">成绩分布情况</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={scoreDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} />
                  <YAxis stroke="#94a3b8" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="count" name="人数" radius={[4, 4, 0, 0]}>
                    {scoreDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">评分质量评估</h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" fontSize={12} stroke="#64748b" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
                  <Radar name="评分质量" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: '已评试卷数', value: '2,890', icon: CheckCircle, color: 'text-green-500' },
              { label: '偏差预警数', value: '3', icon: AlertTriangle, color: 'text-red-500' },
              { label: '复评分数', value: '156', icon: RefreshCw, color: 'text-blue-500' },
              { label: '监督员在岗', value: '24', icon: Eye, color: 'text-amber-500' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <Icon className={`w-6 h-6 ${stat.color} mb-2`} />
                  <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'records' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">编号</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">考场</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">科目</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">评分教师</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">平均分</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">偏差值</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">状态</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">审核人</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scoringRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-slate-600">{record.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{record.examId}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{record.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{record.examiner}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-800">{record.avgScore}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-medium ${record.deviation > 3 ? 'text-red-600' : 'text-green-600'}`}>
                        {record.deviation > 3 ? '⚠ ' : ''}{record.deviation}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        record.status === 'approved' ? 'bg-green-100 text-green-700' :
                        record.status === 'review' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {record.status === 'approved' ? '已审核' : record.status === 'review' ? '待复核' : '评分中'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">{record.reviewedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-500" />
              评分监督制度
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: '双盲评分制度',
                  content: '考生信息密封，评分教师无法获取考生个人信息。每份作品/表演由不少于3名教师独立评分。',
                  status: '已落实'
                },
                {
                  title: '分差控制机制',
                  content: '同一考生各评分教师评分分差超过总分10%时，须进行复评。复评由专家组进行终评。',
                  status: '已落实'
                },
                {
                  title: '回避制度',
                  content: '与考生存在亲属关系、师生关系或其他利害关系的评分教师须主动回避。',
                  status: '已落实'
                },
                {
                  title: '全程录像制度',
                  content: '面试类考试全程录音录像，评分过程同步记录，录像资料保存不少于4年。',
                  status: '已落实'
                },
                {
                  title: '评分结果公示',
                  content: '考试成绩在规定时间内通过官方渠道公示，公示期不少于7个工作日。',
                  status: '待执行'
                },
                {
                  title: '纪检监察全程参与',
                  content: '纪检监察部门对命题、制卷、考试、评分、录取等各环节进行全程监督。',
                  status: '已落实'
                },
              ].map((rule, idx) => (
                <div key={idx} className="border border-slate-100 rounded-lg p-4 hover:border-amber-200 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{rule.title}</h4>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      rule.status === '已落实' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {rule.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{rule.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
