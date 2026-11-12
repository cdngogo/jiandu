import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Shield,
  Lock,
  Eye,
} from 'lucide-react';

const admissionData = [
  { category: '美术类', 计划招生: 300, 已录取: 280, 候补: 20 },
  { category: '音乐类', 计划招生: 160, 已录取: 148, 候补: 12 },
  { category: '舞蹈类', 计划招生: 80, 已录取: 75, 候补: 5 },
  { category: '戏剧影视', 计划招生: 120, 已录取: 108, 候补: 12 },
  { category: '书法类', 计划招生: 40, 已录取: 36, 候补: 4 },
];

interface AdmissionRecord {
  id: string;
  name: string;
  examId: string;
  category: string;
  artScore: number;
  cultureScore: number;
  totalScore: number;
  rank: number;
  status: 'admitted' | 'waitlist' | 'rejected' | 'review';
  supervisionNote: string;
}

const admissionRecords: AdmissionRecord[] = [
  { id: '2026001', name: '李*华', examId: 'A101', category: '美术类', artScore: 92.5, cultureScore: 485, totalScore: 78.2, rank: 1, status: 'admitted', supervisionNote: '正常录取' },
  { id: '2026002', name: '王*明', examId: 'A102', category: '美术类', artScore: 91.0, cultureScore: 472, totalScore: 76.8, rank: 2, status: 'admitted', supervisionNote: '正常录取' },
  { id: '2026003', name: '张*丽', examId: 'B101', category: '音乐类', artScore: 89.5, cultureScore: 468, totalScore: 75.4, rank: 3, status: 'admitted', supervisionNote: '正常录取' },
  { id: '2026004', name: '陈*强', examId: 'C101', category: '舞蹈类', artScore: 88.0, cultureScore: 445, totalScore: 73.1, rank: 5, status: 'admitted', supervisionNote: '正常录取' },
  { id: '2026005', name: '刘*芳', examId: 'A101', category: '美术类', artScore: 85.5, cultureScore: 490, totalScore: 74.6, rank: 4, status: 'review', supervisionNote: '成绩复核中，家长提出异议' },
  { id: '2026006', name: '赵*伟', examId: 'D101', category: '戏剧影视', artScore: 84.0, cultureScore: 456, totalScore: 72.0, rank: 8, status: 'waitlist', supervisionNote: '候补第3位' },
  { id: '2026007', name: '孙*婷', examId: 'B102', category: '音乐类', artScore: 82.5, cultureScore: 438, totalScore: 70.1, rank: 12, status: 'waitlist', supervisionNote: '候补第5位' },
  { id: '2026008', name: '周*杰', examId: 'E101', category: '书法类', artScore: 78.0, cultureScore: 420, totalScore: 65.5, rank: 18, status: 'rejected', supervisionNote: '未达录取线' },
];

export default function AdmissionSupervision() {
  const [activeTab, setActiveTab] = useState<'progress' | 'records' | 'policy'>('progress');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">录取监督</h2>
          <p className="text-slate-500 mt-1">全程监督录取过程，确保公平公正</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
          <Lock className="w-4 h-4" />
          <span className="text-sm font-medium">录取系统安全运行中</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { key: 'progress', label: '录取进度' },
          { key: 'records', label: '录取记录' },
          { key: 'policy', label: '录取政策' },
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

      {activeTab === 'progress' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: '计划招生总数', value: '700', icon: Users, color: 'bg-blue-500' },
              { label: '已录取人数', value: '647', icon: CheckCircle, color: 'bg-green-500' },
              { label: '候补人数', value: '53', icon: Clock, color: 'bg-amber-500' },
              { label: '待复核', value: '2', icon: AlertTriangle, color: 'bg-red-500' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                  <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">各专业录取进度</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={admissionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="category" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="计划招生" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="已录取" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="候补" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Supervision Timeline */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">录取监督流程</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
              {[
                { step: '1', title: '录取方案审核', desc: '审核录取方案是否符合招生章程和政策规定', status: 'done' },
                { step: '2', title: '成绩公示监督', desc: '监督成绩公示是否及时、完整、准确', status: 'done' },
                { step: '3', title: '投档录取监督', desc: '监督投档规则执行和录取操作是否规范', status: 'done' },
                { step: '4', title: '录取结果审核', desc: '审核录取名单与成绩是否一致，有无违规操作', status: 'current' },
                { step: '5', title: '录取通知书发放', desc: '监督录取通知书的发放和邮寄过程', status: 'pending' },
                { step: '6', title: '新生入学复查', desc: '配合学校做好新生入学资格复查工作', status: 'pending' },
              ].map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-12 pb-6">
                  <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    item.status === 'done' ? 'bg-green-500 text-white' :
                    item.status === 'current' ? 'bg-amber-500 text-white ring-4 ring-amber-100' :
                    'bg-slate-200 text-slate-500'
                  }`}>
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                    <span className={`text-xs font-medium mt-2 inline-block px-2 py-0.5 rounded ${
                      item.status === 'done' ? 'bg-green-100 text-green-700' :
                      item.status === 'current' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {item.status === 'done' ? '已完成' : item.status === 'current' ? '进行中' : '待执行'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'records' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">考生编号</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">姓名</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">专业</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">专业分</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">文化分</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">综合分</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">排名</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">状态</th>
                  <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">监督备注</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admissionRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-slate-600">{record.id}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{record.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{record.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-800">{record.artScore}</td>
                    <td className="px-4 py-3 text-sm text-slate-800">{record.cultureScore}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-800">{record.totalScore}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{record.rank}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        record.status === 'admitted' ? 'bg-green-100 text-green-700' :
                        record.status === 'waitlist' ? 'bg-amber-100 text-amber-700' :
                        record.status === 'review' ? 'bg-blue-100 text-blue-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {record.status === 'admitted' ? '已录取' : record.status === 'waitlist' ? '候补' : record.status === 'review' ? '复核中' : '未录取'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{record.supervisionNote}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'policy' && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" />
            录取监督要点
          </h3>
          <div className="space-y-4">
            {[
              { title: '录取原则', content: '按照"分数优先、遵循志愿"原则，根据考生综合成绩从高到低依次录取。综合成绩=专业成绩×60%+文化成绩×40%（折算后）。' },
              { title: '同分排序规则', content: '综合成绩相同时，依次按专业成绩、文化成绩、语文、外语成绩排序。' },
              { title: '加分政策', content: '严格执行国家和省级教育行政部门规定的加分政策，加分项目须经公示。' },
              { title: '特殊类型招生', content: '高水平艺术团、保送生等特殊类型招生须单独公示，接受社会监督。' },
              { title: '信息公开', content: '录取结果须在学校官网和省级招生考试机构网站同步公示，公示期不少于10个工作日。' },
              { title: '纪检监察', content: '录取期间纪检监察组全程在场监督，录取操作须双人以上在场，全程录像。' },
            ].map((policy, idx) => (
              <div key={idx} className="border border-slate-100 rounded-lg p-4 hover:border-amber-200 transition-colors">
                <h4 className="font-semibold text-slate-800 mb-2">{policy.title}</h4>
                <p className="text-sm text-slate-600">{policy.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
