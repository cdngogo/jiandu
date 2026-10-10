import React from 'react';
import {
  AlertTriangle,
  Shield,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const riskTrend = [
  { week: '第1周', 风险指数: 25 },
  { week: '第2周', 风险指数: 32 },
  { week: '第3周', 风险指数: 45 },
  { week: '第4周', 风险指数: 38 },
  { week: '第5周', 风险指数: 52 },
  { week: '第6周', 风险指数: 41 },
  { week: '第7周', 风险指数: 35 },
  { week: '第8周', 风险指数: 28 },
];

interface RiskItem {
  id: string;
  level: 'high' | 'medium' | 'low';
  category: string;
  title: string;
  description: string;
  source: string;
  date: string;
  status: 'active' | 'monitoring' | 'resolved';
  measures: string[];
}

const riskItems: RiskItem[] = [
  {
    id: 'R001',
    level: 'high',
    category: '评分风险',
    title: '美术类评分偏差预警',
    description: '素描科目第3考场评分教师间分差超过阈值（>8%），可能存在评分标准不一致问题。',
    source: '系统自动监测',
    date: '2026-03-20',
    status: 'resolved',
    measures: ['已启动复评程序', '约谈相关评分教师', '统一评分标准后重新评分'],
  },
  {
    id: 'R002',
    level: 'high',
    category: '舞弊风险',
    title: '疑似替考行为',
    description: '身份核验系统发现1名考生人脸比对相似度偏低（72%），疑似非本人参考。',
    source: '人脸识别系统',
    date: '2026-03-22',
    status: 'resolved',
    measures: ['暂停该考生考试', '启动身份核查程序', '通知公安机关协助调查', '经核实为本人，系统误报'],
  },
  {
    id: 'R003',
    level: 'medium',
    category: '舆情风险',
    title: '社交媒体负面舆情',
    description: '微博出现关于"艺考黑幕"的帖子，虽内容不实但传播较快，需及时回应。',
    source: '舆情监测系统',
    date: '2026-04-01',
    status: 'monitoring',
    measures: ['已启动舆情应对预案', '发布官方声明', '持续监测传播态势'],
  },
  {
    id: 'R004',
    level: 'medium',
    category: '制度风险',
    title: '评分教师回避制度执行不到位',
    description: '抽查发现1名评分教师与考生存在师生关系但未主动申报回避。',
    source: '监督检查',
    date: '2026-04-05',
    status: 'active',
    measures: ['立即更换评分教师', '对该教师进行批评教育', '完善回避申报系统'],
  },
  {
    id: 'R005',
    level: 'low',
    category: '技术风险',
    title: '监控系统存储容量预警',
    description: '考场监控系统存储空间使用率达85%，预计3天后将满。',
    source: '系统自动监测',
    date: '2026-04-08',
    status: 'resolved',
    measures: ['已扩容存储设备', '优化录像压缩策略'],
  },
  {
    id: 'R006',
    level: 'low',
    category: '管理风险',
    title: '候考区秩序管理',
    description: '舞蹈类候考区人员密集，存在拥挤和噪音问题，可能影响考试秩序。',
    source: '现场巡查',
    date: '2026-04-10',
    status: 'resolved',
    measures: ['增设候考区引导员', '优化候考分区方案', '增加等候座椅'],
  },
];

const levelConfig = {
  high: { label: '高风险', color: 'bg-red-100 text-red-700 border-red-200', dot: 'bg-red-500' },
  medium: { label: '中风险', color: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
  low: { label: '低风险', color: 'bg-green-100 text-green-700 border-green-200', dot: 'bg-green-500' },
};

const statusConfig = {
  active: { label: '活跃', icon: AlertTriangle, color: 'text-red-500' },
  monitoring: { label: '监控中', icon: Eye, color: 'text-amber-500' },
  resolved: { label: '已处置', icon: CheckCircle, color: 'text-green-500' },
};

export default function RiskWarning() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">风险预警</h2>
          <p className="text-slate-500 mt-1">智能识别和预警招生各环节风险</p>
        </div>
        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">当前活跃风险 1 项</span>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">高风险</p>
              <p className="text-3xl font-bold text-red-700 mt-1">0</p>
              <p className="text-xs text-red-500 mt-1">活跃预警</p>
            </div>
            <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-5 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium">中风险</p>
              <p className="text-3xl font-bold text-amber-700 mt-1">2</p>
              <p className="text-xs text-amber-500 mt-1">活跃预警</p>
            </div>
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">低风险</p>
              <p className="text-3xl font-bold text-green-700 mt-1">0</p>
              <p className="text-xs text-green-500 mt-1">活跃预警</p>
            </div>
            <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Risk Trend Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800">风险指数趋势</h3>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span>整体趋势下降</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={riskTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 60]} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Line type="monotone" dataKey="风险指数" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Risk List */}
      <div className="space-y-4">
        {riskItems.map((risk) => {
          const level = levelConfig[risk.level];
          const status = statusConfig[risk.status];
          const StatusIcon = status.icon;
          return (
            <div key={risk.id} className={`bg-white rounded-xl p-5 shadow-sm border transition-all hover:shadow-md ${
              risk.status === 'active' ? 'border-red-200' : 'border-slate-100'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-3 h-3 rounded-full ${level.dot}`}></span>
                  <h4 className="font-semibold text-slate-800">{risk.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full border ${level.color}`}>
                    {level.label}
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-medium ${status.color}`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{risk.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                <span>来源：{risk.source}</span>
                <span>发现时间：{risk.date}</span>
                <span>类别：{risk.category}</span>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs font-medium text-slate-500 mb-2">处置措施：</p>
                <div className="flex flex-wrap gap-2">
                  {risk.measures.map((measure, idx) => (
                    <span key={idx} className="text-xs bg-white border border-slate-200 px-2 py-1 rounded text-slate-600">
                      {measure}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Risk Model */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-500" />
          风险识别模型说明
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: '数据采集层', items: ['考场监控视频分析', '评分数据实时采集', '身份核验系统数据', '舆情监测数据', '信访举报数据'] },
            { title: '分析研判层', items: ['评分偏差自动检测', '身份异常比对分析', '考试行为模式识别', '舆情情感分析', '历史数据对比'] },
            { title: '预警输出层', items: ['实时风险等级评估', '自动预警推送', '处置建议生成', '风险趋势预测', '关联风险识别'] },
            { title: '处置反馈层', items: ['预警处置跟踪', '处置效果评估', '模型参数优化', '风险案例库建设', '经验教训总结'] },
          ].map((layer, idx) => (
            <div key={idx} className="border border-slate-100 rounded-lg p-4">
              <h4 className="font-semibold text-slate-800 mb-2">{layer.title}</h4>
              <ul className="space-y-1">
                {layer.items.map((item, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
