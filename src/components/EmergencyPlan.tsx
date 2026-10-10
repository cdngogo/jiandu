import React, { useState } from 'react';
import {
  AlertTriangle,
  Phone,
  Shield,
  Users,
  FileText,
  Clock,
  CheckCircle,
  Zap,
  Siren,
  Radio,
  Megaphone,
  HeartPulse,
  Flame,
  Lock,
} from 'lucide-react';

interface EmergencyPlan {
  id: string;
  name: string;
  level: 'I' | 'II' | 'III' | 'IV';
  category: string;
  trigger: string;
  response: string[];
  responsible: string;
  contacts: string[];
  status: 'ready' | 'activated' | 'completed';
}

const emergencyPlans: EmergencyPlan[] = [
  {
    id: 'EP001',
    name: '考题泄露应急预案',
    level: 'I',
    category: '保密安全',
    trigger: '发现考题在开考前被泄露或有泄露迹象',
    response: [
      '立即启动备用试题',
      '封锁相关考场，禁止人员进出',
      '报告上级主管部门和公安机关',
      '启动泄密调查程序',
      '对涉事人员采取控制措施',
      '评估影响范围，决定是否延期考试',
      '发布官方公告，稳定考生情绪',
    ],
    responsible: '纪检监察组 + 保密办',
    contacts: ['组长电话：138****1234', '保密办：010-****5678', '公安：110'],
    status: 'ready',
  },
  {
    id: 'EP002',
    name: '群体性事件应急预案',
    level: 'I',
    category: '公共安全',
    trigger: '考生或家长聚集上访、冲击考场等群体性事件',
    response: [
      '立即启动应急响应机制',
      '通知保卫处和公安机关到场',
      '安排专人接待，倾听诉求',
      '记录诉求内容，承诺答复时限',
      '维护现场秩序，保障考试正常进行',
      '及时上报主管部门',
      '做好舆情引导和信息发布',
    ],
    responsible: '纪检监察组 + 保卫处 + 学工部',
    contacts: ['保卫处：010-****2345', '学工部：010-****3456'],
    status: 'ready',
  },
  {
    id: 'EP003',
    name: '评分争议应急预案',
    level: 'II',
    category: '考试公平',
    trigger: '考生或家长对评分结果提出重大异议',
    response: [
      '受理申诉，登记详细信息',
      '启动成绩复核程序',
      '组织专家组重新评审',
      '全程录音录像',
      '7个工作日内给出复核结论',
      '如确有问题，启动纠错和追责程序',
      '向申诉人反馈结果',
    ],
    responsible: '纪检监察组 + 招生办',
    contacts: ['招生办：010-****4567', '申诉热线：400-****8888'],
    status: 'ready',
  },
  {
    id: 'EP004',
    name: '身份舞弊应急预案',
    level: 'II',
    category: '考试纪律',
    trigger: '发现替考、伪造证件等身份舞弊行为',
    response: [
      '立即控制涉事考生',
      '保留现场证据（监控、证件等）',
      '通知公安机关介入调查',
      '取消该考生考试资格',
      '记录舞弊行为，上报考试主管部门',
      '核查是否存在组织舞弊行为',
      '发布警示公告',
    ],
    responsible: '纪检监察组 + 考务组 + 公安',
    contacts: ['考务组：010-****5678', '公安：110'],
    status: 'ready',
  },
  {
    id: 'EP005',
    name: '技术故障应急预案',
    level: 'III',
    category: '技术保障',
    trigger: '监控系统、网络系统、评分系统等出现故障',
    response: [
      '立即启动备用系统',
      '技术人员紧急抢修',
      '启用纸质备份方案',
      '记录故障时间和影响范围',
      '评估是否影响考试公平性',
      '必要时启用备用考场',
      '故障排除后恢复并验证',
    ],
    responsible: '信息中心 + 考务组',
    contacts: ['信息中心：010-****6789', '值班工程师：139****9876'],
    status: 'ready',
  },
  {
    id: 'EP006',
    name: '舆情危机应急预案',
    level: 'III',
    category: '舆情管理',
    trigger: '出现关于招生的重大负面舆情',
    response: [
      '启动舆情监测，实时跟踪',
      '核实舆情内容真实性',
      '拟定回应口径和声明',
      '通过官方渠道及时发布',
      '必要时召开新闻发布会',
      '联系主流媒体正面引导',
      '持续监测舆情走向',
    ],
    responsible: '宣传部 + 纪检监察组',
    contacts: ['宣传部：010-****7890', '新闻发言人：137****6543'],
    status: 'ready',
  },
  {
    id: 'EP007',
    name: '自然灾害应急预案',
    level: 'IV',
    category: '公共安全',
    trigger: '地震、火灾、极端天气等自然灾害',
    response: [
      '立即组织人员疏散',
      '拨打急救电话（119/120）',
      '启动应急避难场所',
      '清点人员，确保考生安全',
      '评估考场受损情况',
      '上报主管部门，申请延期',
      '做好考生安抚和后勤保障',
    ],
    responsible: '保卫处 + 后勤处 + 学工部',
    contacts: ['火警：119', '急救：120', '保卫处：010-****2345'],
    status: 'ready',
  },
];

const levelConfig = {
  'I': { label: '特别重大', color: 'bg-red-600', textColor: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200' },
  'II': { label: '重大', color: 'bg-orange-500', textColor: 'text-orange-700', bgColor: 'bg-orange-50', borderColor: 'border-orange-200' },
  'III': { label: '较大', color: 'bg-amber-500', textColor: 'text-amber-700', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' },
  'IV': { label: '一般', color: 'bg-blue-500', textColor: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' },
};

export default function EmergencyPlan() {
  const [selectedPlan, setSelectedPlan] = useState<EmergencyPlan | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">应急预案管理</h2>
          <p className="text-slate-500 mt-1">突发事件应急处置流程与资源调度</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">全部预案就绪</span>
        </div>
      </div>

      {/* Emergency Level Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(levelConfig).map(([level, config]) => {
          const count = emergencyPlans.filter(p => p.level === level).length;
          return (
            <div key={level} className={`${config.bgColor} rounded-xl p-4 border ${config.borderColor}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`${config.color} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {level}级
                </span>
                <Siren className={`w-5 h-5 ${config.textColor}`} />
              </div>
              <p className={`text-sm font-medium ${config.textColor}`}>{config.label}</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{count}</p>
              <p className="text-xs text-slate-500">项预案</p>
            </div>
          );
        })}
      </div>

      {/* Response Flow */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-400" />
          应急响应流程
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { step: '1', title: '发现报告', desc: '第一时间发现并上报', icon: Radio },
            { step: '2', title: '启动预案', desc: '按级别启动对应预案', icon: Zap },
            { step: '3', title: '现场处置', desc: '责任组赶赴现场', icon: Users },
            { step: '4', title: '资源调度', desc: '协调各方资源支援', icon: Megaphone },
            { step: '5', title: '总结复盘', desc: '事后评估与改进', icon: FileText },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur text-center">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-semibold text-amber-300 text-sm">{item.title}</p>
                <p className="text-xs text-slate-300 mt-1">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {emergencyPlans.map((plan) => {
          const level = levelConfig[plan.level];
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              className={`bg-white rounded-xl p-5 shadow-sm border ${level.borderColor} hover:shadow-md transition-all cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`${level.color} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {plan.level}级
                  </span>
                  <h4 className="font-semibold text-slate-800">{plan.name}</h4>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                  就绪
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">类别：{plan.category}</p>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{plan.trigger}</p>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {plan.responsible}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {plan.contacts.length}个联系方式
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelectedPlan(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`${levelConfig[selectedPlan.level].color} text-white text-xs font-bold px-2 py-1 rounded`}>
                  {selectedPlan.level}级
                </span>
                <h3 className="text-xl font-bold text-slate-800">{selectedPlan.name}</h3>
              </div>
              <button onClick={() => setSelectedPlan(null)} className="text-slate-400 hover:text-slate-600 text-2xl">×</button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs font-medium text-slate-500 mb-1">触发条件</p>
                <p className="text-sm text-slate-700">{selectedPlan.trigger}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> 处置步骤
                </p>
                <div className="space-y-2">
                  {selectedPlan.response.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2 rounded bg-slate-50">
                      <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-slate-700 pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-blue-600 mb-1">责任部门</p>
                  <p className="text-sm text-slate-700">{selectedPlan.responsible}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs font-medium text-green-600 mb-1">联系方式</p>
                  <div className="space-y-1">
                    {selectedPlan.contacts.map((c, idx) => (
                      <p key={idx} className="text-sm text-slate-700">{c}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors">
                  <Siren className="w-4 h-4" /> 启动预案
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                  <FileText className="w-4 h-4" /> 演练记录
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Drill Records */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          应急演练记录
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { date: '2026-02-20', drill: '考题泄露应急演练', participants: 25, result: '优秀', duration: '2小时' },
            { date: '2026-03-05', drill: '群体性事件应急演练', participants: 40, result: '良好', duration: '3小时' },
            { date: '2026-03-15', drill: '技术故障应急演练', participants: 15, result: '优秀', duration: '1.5小时' },
          ].map((drill, idx) => (
            <div key={idx} className="border border-slate-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">{drill.date}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                  drill.result === '优秀' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {drill.result}
                </span>
              </div>
              <h4 className="font-semibold text-slate-800 text-sm mb-2">{drill.drill}</h4>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>参与 {drill.participants} 人</span>
                <span>时长 {drill.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
