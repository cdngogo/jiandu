import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Key,
  FileWarning,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserCheck,
  Database,
  Fingerprint,
  FileKey,
  ShieldCheck,
  Layers,
} from 'lucide-react';

interface SecurityEvent {
  id: string;
  time: string;
  user: string;
  role: string;
  action: string;
  target: string;
  level: 'info' | 'warning' | 'critical';
  ip: string;
  result: 'success' | 'failed' | 'blocked';
}

const securityEvents: SecurityEvent[] = [
  { id: 'LOG001', time: '2026-04-15 09:23:15', user: '张**', role: '纪检组长', action: '查看考生成绩', target: '考生 20260***15', level: 'info', ip: '192.168.1.***', result: 'success' },
  { id: 'LOG002', time: '2026-04-15 09:45:32', user: '李**', role: '监督员', action: '导出评分记录', target: '美术类A101考场', level: 'warning', ip: '192.168.1.***', result: 'success' },
  { id: 'LOG003', time: '2026-04-15 10:12:08', user: '未知', role: '-', action: '尝试访问考题数据库', target: '/api/exam/questions', level: 'critical', ip: '45.***.***.12', result: 'blocked' },
  { id: 'LOG004', time: '2026-04-15 10:30:45', user: '王**', role: '系统管理员', action: '修改用户权限', target: '用户 赵**', level: 'warning', ip: '192.168.1.***', result: 'success' },
  { id: 'LOG005', time: '2026-04-15 11:05:22', user: '赵**', role: '评分教师', action: '登录失败', target: '系统登录', level: 'warning', ip: '10.***.***.5', result: 'failed' },
  { id: 'LOG006', time: '2026-04-15 11:20:18', user: '张**', role: '纪检组长', action: '审批录取名单', target: '音乐类录取名单', level: 'info', ip: '192.168.1.***', result: 'success' },
  { id: 'LOG007', time: '2026-04-15 13:15:40', user: '未知', role: '-', action: '暴力破解尝试', target: '管理员账号', level: 'critical', ip: '103.***.***.88', result: 'blocked' },
  { id: 'LOG008', time: '2026-04-15 14:02:55', user: '李**', role: '监督员', action: '查看监控视频', target: '考场B101录像', level: 'info', ip: '192.168.1.***', result: 'success' },
];

const secretLevels = [
  {
    level: '绝密',
    color: 'bg-red-600',
    textColor: 'text-red-700',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    items: ['考试试题（开考前）', '评分教师名单（评分期间）', '未公示的录取名单', '系统管理员密钥'],
    measures: ['双人授权访问', '全程录像', '物理隔离存储', '访问日志永久保存'],
  },
  {
    level: '机密',
    color: 'bg-orange-500',
    textColor: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    items: ['考生身份证号', '考生成绩明细', '评分教师评分记录', '信访举报人信息'],
    measures: ['脱敏展示', '操作留痕', '加密传输', '定期审计'],
  },
  {
    level: '秘密',
    color: 'bg-amber-500',
    textColor: 'text-amber-700',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    items: ['考生姓名', '考生联系方式', '考场安排详情', '内部工作记录'],
    measures: ['部分脱敏', '权限控制', '传输加密', '操作记录'],
  },
  {
    level: '内部',
    color: 'bg-blue-500',
    textColor: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    items: ['统计数据', '工作流程', '内部通知', '培训资料'],
    measures: ['内部访问', '基本防护', '常规管理'],
  },
];

const desensitizationRules = [
  { field: '姓名', rule: '保留姓氏，其余用*替代', example: '张**', status: '已启用' },
  { field: '身份证号', rule: '保留前3后4，中间用*替代', example: '370***********1234', status: '已启用' },
  { field: '手机号', rule: '保留前3后4，中间用*替代', example: '138****5678', status: '已启用' },
  { field: '考生号', rule: '保留前4后2，中间用*替代', example: '2026****15', status: '已启用' },
  { field: '家庭住址', rule: '保留省市，详细地址用*替代', example: '山东省济南市******', status: '已启用' },
  { field: '成绩', rule: '非本人查询时隐藏具体分数', example: '****', status: '已启用' },
  { field: 'IP地址', rule: '保留前两段，后两段用*替代', example: '192.168.*.*', status: '已启用' },
];

export default function SecurityAudit() {
  const [activeTab, setActiveTab] = useState<'logs' | 'secret' | 'encrypt'>('logs');
  const [showSensitive, setShowSensitive] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">安全审计与保密管理</h2>
          <p className="text-slate-500 mt-1">操作留痕、数据加密、涉密信息分级管控</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg">
          <ShieldCheck className="w-4 h-4" />
          <span className="text-sm font-medium">安全态势：良好</span>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '今日操作日志', value: '1,286', icon: FileKey, color: 'bg-blue-500' },
          { label: '异常告警', value: '3', icon: AlertTriangle, color: 'bg-red-500' },
          { label: '加密数据量', value: '2.4TB', icon: Database, color: 'bg-green-500' },
          { label: '审计合规率', value: '99.8%', icon: CheckCircle, color: 'bg-amber-500' },
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
          { key: 'logs', label: '操作审计日志', icon: FileKey },
          { key: 'secret', label: '涉密信息分级', icon: Lock },
          { key: 'encrypt', label: '数据脱敏规则', icon: EyeOff },
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

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">实时操作日志</h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>成功
                </span>
                <span className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>警告
                </span>
                <span className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>阻断
                </span>
              </div>
            </div>
            <div className="space-y-2">
              {securityEvents.map((event) => (
                <div key={event.id} className={`flex items-start gap-3 p-3 rounded-lg border ${
                  event.level === 'critical' ? 'border-red-200 bg-red-50/30' :
                  event.level === 'warning' ? 'border-amber-200 bg-amber-50/30' :
                  'border-slate-100 bg-slate-50/30'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    event.result === 'success' ? 'bg-green-500' :
                    event.result === 'failed' ? 'bg-amber-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono text-slate-500">{event.id}</span>
                      <span className="text-xs text-slate-400">{event.time}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        event.level === 'critical' ? 'bg-red-100 text-red-700' :
                        event.level === 'warning' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {event.level === 'critical' ? '严重' : event.level === 'warning' ? '警告' : '信息'}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mt-1">
                      <span className="font-medium">{event.user}</span>
                      <span className="text-slate-400 mx-1">({event.role})</span>
                      <span>{event.action}</span>
                      <span className="text-slate-400 mx-1">→</span>
                      <span className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">{event.target}</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">IP: {event.ip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Anti-tampering */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Fingerprint className="w-6 h-6 text-amber-400" />
              <h3 className="text-lg font-semibold">日志防篡改机制</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: '区块链存证', desc: '关键操作日志实时上链，不可篡改' },
                { title: '数字签名', desc: '每条日志附加操作者数字签名' },
                { title: '异地备份', desc: '日志实时同步至异地灾备中心' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 rounded-lg p-3 backdrop-blur">
                  <h4 className="font-medium text-amber-300 mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-300">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Secret Level Tab */}
      {activeTab === 'secret' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-slate-800">涉密信息四级分类</h3>
            </div>
            <div className="space-y-4">
              {secretLevels.map((level, idx) => (
                <div key={idx} className={`border ${level.borderColor} rounded-lg p-4 ${level.bgColor}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`${level.color} text-white text-xs font-bold px-3 py-1 rounded`}>
                      {level.level}
                    </span>
                    <span className={`text-sm font-medium ${level.textColor}`}>
                      共 {level.items.length} 类信息
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">包含信息：</p>
                      <div className="flex flex-wrap gap-1.5">
                        {level.items.map((item, i) => (
                          <span key={i} className="text-xs bg-white/70 border border-slate-200 px-2 py-1 rounded text-slate-700">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 mb-2">管控措施：</p>
                      <div className="flex flex-wrap gap-1.5">
                        {level.measures.map((measure, i) => (
                          <span key={i} className="text-xs bg-white/70 border border-slate-200 px-2 py-1 rounded text-slate-700 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {measure}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desensitization Tab */}
      {activeTab === 'encrypt' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <EyeOff className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-slate-800">数据脱敏规则配置</h3>
              </div>
              <button
                onClick={() => setShowSensitive(!showSensitive)}
                className="flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200"
              >
                {showSensitive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSensitive ? '隐藏示例' : '显示示例'}
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">字段</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">脱敏规则</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">示例</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">状态</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {desensitizationRules.map((rule, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{rule.field}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{rule.rule}</td>
                      <td className="px-4 py-3">
                        {showSensitive ? (
                          <code className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded font-mono">
                            {rule.example}
                          </code>
                        ) : (
                          <span className="text-xs text-slate-400">点击显示</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">
                          {rule.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Encryption Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                加密传输状态
              </h4>
              <div className="space-y-3">
                {[
                  { item: 'HTTPS/TLS 1.3', status: '启用', detail: '全站加密传输' },
                  { item: '数据库加密', status: '启用', detail: 'AES-256加密存储' },
                  { item: '文件加密', status: '启用', detail: '敏感文件独立加密' },
                  { item: 'API签名', status: '启用', detail: 'HMAC-SHA256签名' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{item.item}</p>
                      <p className="text-xs text-slate-400">{item.detail}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 text-green-700">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-500" />
                身份认证机制
              </h4>
              <div className="space-y-3">
                {[
                  { item: '双因子认证', status: '强制', detail: '密码+短信/动态令牌' },
                  { item: '生物识别', status: '可选', detail: '指纹/人脸识别' },
                  { item: '会话超时', status: '30分钟', detail: '无操作自动登出' },
                  { item: '登录限制', status: '启用', detail: '5次失败锁定30分钟' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-50">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{item.item}</p>
                      <p className="text-xs text-slate-400">{item.detail}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-700">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
