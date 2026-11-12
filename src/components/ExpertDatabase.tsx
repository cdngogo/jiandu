import React, { useState } from 'react';
import {
  Users,
  UserX,
  Search,
  Award,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Link2,
  Shield,
  Eye,
  Filter,
} from 'lucide-react';


interface Expert {
  id: string;
  name: string;
  title: string;
  institution: string;
  specialties: string[];
  experience: number;
  rating: number;
  assignedExams: number;
  avoidanceCount: number;
  status: 'available' | 'assigned' | 'avoidance' | 'resting';
  certifications: string[];
}

const experts: Expert[] = [
  { id: 'E001', name: '张**教授', title: '教授/博导', institution: '美术学院', specialties: ['素描', '色彩', '速写'], experience: 25, rating: 4.9, assignedExams: 12, avoidanceCount: 3, status: 'assigned', certifications: ['国家级评委资质', '省级督导员'] },
  { id: 'E002', name: '王**教授', title: '教授', institution: '美术学院', specialties: ['素描', '油画'], experience: 18, rating: 4.8, assignedExams: 8, avoidanceCount: 2, status: 'assigned', certifications: ['省级评委资质'] },
  { id: 'E003', name: '刘**副教授', title: '副教授', institution: '美术学院', specialties: ['色彩', '设计'], experience: 12, rating: 4.7, assignedExams: 6, avoidanceCount: 1, status: 'available', certifications: ['省级评委资质'] },
  { id: 'E004', name: '陈**教授', title: '教授/硕导', institution: '音乐学院', specialties: ['声乐', '视唱练耳'], experience: 22, rating: 4.9, assignedExams: 10, avoidanceCount: 4, status: 'assigned', certifications: ['国家级评委资质', '省级督导员'] },
  { id: 'E005', name: '吴**副教授', title: '副教授', institution: '音乐学院', specialties: ['器乐', '乐理'], experience: 15, rating: 4.6, assignedExams: 7, avoidanceCount: 2, status: 'available', certifications: ['省级评委资质'] },
  { id: 'E006', name: '周**教授', title: '教授', institution: '舞蹈学院', specialties: ['古典舞', '民族舞'], experience: 20, rating: 4.8, assignedExams: 9, avoidanceCount: 1, status: 'assigned', certifications: ['国家级评委资质'] },
  { id: 'E007', name: '孙**副教授', title: '副教授', institution: '舞蹈学院', specialties: ['现代舞', '芭蕾'], experience: 14, rating: 4.5, assignedExams: 5, avoidanceCount: 0, status: 'available', certifications: ['省级评委资质'] },
  { id: 'E008', name: '马**教授', title: '教授', institution: '戏剧学院', specialties: ['表演', '台词'], experience: 28, rating: 4.9, assignedExams: 11, avoidanceCount: 5, status: 'avoidance', certifications: ['国家级评委资质', '省级督导员'] },
  { id: 'E009', name: '赵**副教授', title: '副教授', institution: '戏剧学院', specialties: ['导演', '戏剧文学'], experience: 16, rating: 4.7, assignedExams: 8, avoidanceCount: 2, status: 'assigned', certifications: ['省级评委资质'] },
  { id: 'E010', name: '钱**教授', title: '教授', institution: '书法学院', specialties: ['楷书', '行书', '篆刻'], experience: 30, rating: 5.0, assignedExams: 6, avoidanceCount: 1, status: 'resting', certifications: ['国家级评委资质', '中国书协理事'] },
];

interface AvoidanceRelation {
  id: string;
  expert: string;
  candidate: string;
  relation: string;
  reason: string;
  status: 'active' | 'resolved';
}

const avoidanceRelations: AvoidanceRelation[] = [
  { id: 'AV001', expert: '张**教授', candidate: '考生A***', relation: '师生关系', reason: '该考生为专家指导的本科生', status: 'active' },
  { id: 'AV002', expert: '张**教授', candidate: '考生B***', relation: '亲属关系', reason: '该考生为专家侄子', status: 'active' },
  { id: 'AV003', expert: '陈**教授', candidate: '考生C***', relation: '师生关系', reason: '该考生为专家指导的研究生', status: 'active' },
  { id: 'AV004', expert: '陈**教授', candidate: '考生D***', relation: '利益关系', reason: '该考生家长为专家同事', status: 'active' },
  { id: 'AV005', expert: '马**教授', candidate: '考生E***', relation: '亲属关系', reason: '该考生为专家外甥女', status: 'active' },
  { id: 'AV006', expert: '王**教授', candidate: '考生F***', relation: '师生关系', reason: '该考生为专家培训班学员', status: 'resolved' },
];

const statusConfig = {
  available: { label: '可分配', color: 'bg-green-100 text-green-700' },
  assigned: { label: '已分配', color: 'bg-blue-100 text-blue-700' },
  avoidance: { label: '已回避', color: 'bg-amber-100 text-amber-700' },
  resting: { label: '休息中', color: 'bg-slate-100 text-slate-600' },
};

export default function ExpertDatabase() {
  const [activeTab, setActiveTab] = useState<'experts' | 'avoidance' | 'allocation'>('experts');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const filteredExperts = experts.filter(e =>
    e.name.includes(searchTerm) ||
    e.institution.includes(searchTerm) ||
    e.specialties.some(s => s.includes(searchTerm))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">专家库管理</h2>
          <p className="text-slate-500 mt-1">评分教师库管理、回避关系维护、智能分配</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">专家库 {experts.length} 人</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '专家总数', value: experts.length.toString(), icon: Users, color: 'bg-blue-500' },
          { label: '当前在岗', value: experts.filter(e => e.status === 'assigned').length.toString(), icon: CheckCircle, color: 'bg-green-500' },
          { label: '回避关系', value: avoidanceRelations.filter(r => r.status === 'active').length.toString(), icon: UserX, color: 'bg-amber-500' },
          { label: '资质认证率', value: '100%', icon: Award, color: 'bg-purple-500' },
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

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        {[
          { key: 'experts', label: '专家库', icon: Users },
          { key: 'avoidance', label: '回避关系', icon: UserX },
          { key: 'allocation', label: '分配规则', icon: Filter },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all ${
                activeTab === tab.key
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Experts Tab */}
      {activeTab === 'experts' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索专家姓名、学院、专业..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExperts.map((expert) => {
              const status = statusConfig[expert.status];
              return (
                <div
                  key={expert.id}
                  onClick={() => setSelectedExpert(expert)}
                  className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                        {expert.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{expert.name}</h4>
                        <p className="text-xs text-slate-500">{expert.title}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{expert.institution}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {expert.specialties.map((s, idx) => (
                      <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400">教龄</p>
                      <p className="text-sm font-bold text-slate-800">{expert.experience}年</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">评分</p>
                      <p className="text-sm font-bold text-amber-600">{expert.rating}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">回避</p>
                      <p className="text-sm font-bold text-red-600">{expert.avoidanceCount}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Avoidance Tab */}
      {activeTab === 'avoidance' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-800">回避制度要求</h3>
            </div>
            <p className="text-sm text-amber-700">
              根据《普通高等学校艺术类专业招生监督办法》，评分教师与考生存在以下关系时必须回避：
              亲属关系（直系或三代以内旁系血亲）、师生关系（现任或近三年内指导关系）、
              利益关系（培训辅导、经济往来等）、其他可能影响公正评分的关系。
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">编号</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">评分教师</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">关联考生</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">关系类型</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">回避原因</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {avoidanceRelations.map((rel) => (
                    <tr key={rel.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-mono text-slate-600">{rel.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{rel.expert}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{rel.candidate}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          rel.relation === '师生关系' ? 'bg-blue-100 text-blue-700' :
                          rel.relation === '亲属关系' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {rel.relation}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-600">{rel.reason}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          rel.status === 'active' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {rel.status === 'active' ? '生效中' : '已解除'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Allocation Tab */}
      {activeTab === 'allocation' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-amber-500" />
              智能分配规则
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: '回避优先',
                  desc: '系统自动检测专家与考生的回避关系，存在回避关系的专家不参与该考生评分。',
                  priority: '最高',
                  color: 'border-red-200 bg-red-50/30',
                },
                {
                  title: '专业匹配',
                  desc: '根据专家专业特长匹配对应考试科目，确保评分专业性。',
                  priority: '高',
                  color: 'border-amber-200 bg-amber-50/30',
                },
                {
                  title: '负载均衡',
                  desc: '均衡分配评分任务，避免单个专家评分工作量过大。',
                  priority: '中',
                  color: 'border-blue-200 bg-blue-50/30',
                },
                {
                  title: '随机抽取',
                  desc: '在满足以上条件基础上，采用随机算法抽取评分专家，减少人为干预。',
                  priority: '中',
                  color: 'border-green-200 bg-green-50/30',
                },
                {
                  title: '双盲原则',
                  desc: '评分专家在评分前无法获知考生信息，考生也无法获知评分专家身份。',
                  priority: '最高',
                  color: 'border-red-200 bg-red-50/30',
                },
                {
                  title: '动态调整',
                  desc: '评分过程中如发现新的回避关系，系统实时调整评分专家。',
                  priority: '高',
                  color: 'border-amber-200 bg-amber-50/30',
                },
              ].map((rule, idx) => (
                <div key={idx} className={`border rounded-lg p-4 ${rule.color}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-slate-800">{rule.title}</h4>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      rule.priority === '最高' ? 'bg-red-100 text-red-700' :
                      rule.priority === '高' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      优先级：{rule.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">分配流程</h3>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {[
                { step: '1', title: '申报回避', desc: '专家主动申报' },
                { step: '2', title: '系统筛查', desc: '自动匹配关系' },
                { step: '3', title: '专业匹配', desc: '按特长分组' },
                { step: '4', title: '随机抽取', desc: '算法随机分配' },
                { step: '5', title: '双人复核', desc: '监督员确认' },
                { step: '6', title: '密封下达', desc: '考前30分钟' },
              ].map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm mb-2">
                      {item.step}
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="hidden md:block text-slate-300 text-2xl">→</div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expert Detail Modal */}
      {selectedExpert && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelectedExpert(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">专家详情</h3>
              <button onClick={() => setSelectedExpert(null)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {selectedExpert.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-800">{selectedExpert.name}</h4>
                <p className="text-sm text-slate-500">{selectedExpert.title}</p>
                <p className="text-sm text-slate-500">{selectedExpert.institution}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">专业领域</p>
                <p className="text-sm font-medium text-slate-800">{selectedExpert.specialties.join('、')}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">从业年限</p>
                <p className="text-sm font-medium text-slate-800">{selectedExpert.experience}年</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">评分次数</p>
                <p className="text-sm font-medium text-slate-800">{selectedExpert.assignedExams}次</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-500">综合评分</p>
                <p className="text-sm font-medium text-amber-600">★ {selectedExpert.rating}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-2">资质认证</p>
              <div className="flex flex-wrap gap-2">
                {selectedExpert.certifications.map((cert, idx) => (
                  <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-200">
                    <Award className="w-3 h-3 inline mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-medium text-amber-700 mb-1 flex items-center gap-1">
                <UserX className="w-3 h-3" /> 回避关系 ({selectedExpert.avoidanceCount})
              </p>
              <p className="text-sm text-slate-600">
                {selectedExpert.avoidanceCount > 0
                  ? `已识别 ${selectedExpert.avoidanceCount} 条回避关系，系统已自动屏蔽相关考生评分任务。`
                  : '暂无回避关系记录。'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
