import React, { useState } from 'react';
import {
  Users,
  Shield,
  Key,
  UserCheck,
  Lock,
  Unlock,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  AlertCircle,
  Search,
} from 'lucide-react';

interface Role {
  id: string;
  name: string;
  level: number;
  users: number;
  permissions: string[];
  dataScope: string;
  color: string;
}

const roles: Role[] = [
  {
    id: 'R01',
    name: '系统管理员',
    level: 5,
    users: 2,
    permissions: ['全部权限', '系统配置', '用户管理', '日志查看', '数据备份'],
    dataScope: '全系统',
    color: 'bg-red-500',
  },
  {
    id: 'R02',
    name: '纪检监察组长',
    level: 4,
    users: 1,
    permissions: ['监督总览', '考试监督', '评分监督', '录取监督', '信访管理', '风险预警', '审计日志', '审批权限'],
    dataScope: '全业务',
    color: 'bg-amber-500',
  },
  {
    id: 'R03',
    name: '监督员',
    level: 3,
    users: 8,
    permissions: ['考试监督', '评分监督', '录取监督', '信访查看', '风险查看'],
    dataScope: '分管领域',
    color: 'bg-blue-500',
  },
  {
    id: 'R04',
    name: '评分教师',
    level: 2,
    users: 45,
    permissions: ['评分操作', '查看本人评分', '查看分管考场'],
    dataScope: '本人评分',
    color: 'bg-green-500',
  },
  {
    id: 'R05',
    name: '考务人员',
    level: 2,
    users: 20,
    permissions: ['考场管理', '考生核验', '成绩录入'],
    dataScope: '负责考场',
    color: 'bg-teal-500',
  },
  {
    id: 'R06',
    name: '查询用户',
    level: 1,
    users: 15,
    permissions: ['公示信息查询', '政策查看'],
    dataScope: '公开信息',
    color: 'bg-slate-500',
  },
];

interface UserRecord {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'active' | 'locked' | 'disabled';
  lastLogin: string;
  loginCount: number;
  twoFA: boolean;
}

const users: UserRecord[] = [
  { id: 'U001', name: '张**', role: '纪检监察组长', department: '纪检监察组', status: 'active', lastLogin: '2026-04-15 09:20', loginCount: 156, twoFA: true },
  { id: 'U002', name: '李**', role: '监督员', department: '纪检监察组', status: 'active', lastLogin: '2026-04-15 08:45', loginCount: 89, twoFA: true },
  { id: 'U003', name: '王**', role: '系统管理员', department: '信息中心', status: 'active', lastLogin: '2026-04-15 07:30', loginCount: 234, twoFA: true },
  { id: 'U004', name: '赵**', role: '评分教师', department: '美术学院', status: 'locked', lastLogin: '2026-04-14 16:20', loginCount: 45, twoFA: true },
  { id: 'U005', name: '陈**', role: '监督员', department: '纪检监察组', status: 'active', lastLogin: '2026-04-15 09:10', loginCount: 67, twoFA: true },
  { id: 'U006', name: '刘**', role: '评分教师', department: '音乐学院', status: 'active', lastLogin: '2026-04-14 14:30', loginCount: 38, twoFA: false },
  { id: 'U007', name: '孙**', role: '考务人员', department: '教务处', status: 'active', lastLogin: '2026-04-15 08:00', loginCount: 112, twoFA: true },
  { id: 'U008', name: '周**', role: '评分教师', department: '舞蹈学院', status: 'disabled', lastLogin: '2026-03-20 10:00', loginCount: 12, twoFA: false },
];

const permissionMatrix = [
  { module: '监督总览', admin: 'full', leader: 'full', supervisor: 'full', teacher: 'none', staff: 'none', query: 'none' },
  { module: '考试监督', admin: 'full', leader: 'full', supervisor: 'full', teacher: 'none', staff: 'view', query: 'none' },
  { module: '评分监督', admin: 'full', leader: 'full', supervisor: 'full', teacher: 'own', staff: 'none', query: 'none' },
  { module: '录取监督', admin: 'full', leader: 'full', supervisor: 'full', teacher: 'none', staff: 'none', query: 'public' },
  { module: '信访举报', admin: 'full', leader: 'full', supervisor: 'view', teacher: 'none', staff: 'none', query: 'none' },
  { module: '风险预警', admin: 'full', leader: 'full', supervisor: 'view', teacher: 'none', staff: 'none', query: 'none' },
  { module: '安全审计', admin: 'full', leader: 'full', supervisor: 'none', teacher: 'none', staff: 'none', query: 'none' },
  { module: '系统配置', admin: 'full', leader: 'none', supervisor: 'none', teacher: 'none', staff: 'none', query: 'none' },
];

export default function PermissionManagement() {
  const [activeTab, setActiveTab] = useState<'roles' | 'users' | 'matrix'>('roles');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u =>
    u.name.includes(searchTerm) || u.role.includes(searchTerm) || u.department.includes(searchTerm)
  );

  const getPermBadge = (perm: string) => {
    switch (perm) {
      case 'full': return <span className="text-xs font-medium px-2 py-0.5 rounded bg-green-100 text-green-700">完全</span>;
      case 'view': return <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700">查看</span>;
      case 'own': return <span className="text-xs font-medium px-2 py-0.5 rounded bg-amber-100 text-amber-700">本人</span>;
      case 'public': return <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">公开</span>;
      default: return <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-50 text-slate-400">无</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">权限分级管理</h2>
          <p className="text-slate-500 mt-1">基于角色的访问控制（RBAC）与最小权限原则</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">当前在线 6 人</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: '角色总数', value: '6', icon: Shield, color: 'bg-amber-500' },
          { label: '用户总数', value: '91', icon: Users, color: 'bg-blue-500' },
          { label: '在线用户', value: '6', icon: UserCheck, color: 'bg-green-500' },
          { label: '异常账号', value: '2', icon: AlertCircle, color: 'bg-red-500' },
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
          { key: 'roles', label: '角色管理', icon: Shield },
          { key: 'users', label: '用户管理', icon: Users },
          { key: 'matrix', label: '权限矩阵', icon: Key },
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

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.id} className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`${role.color} w-8 h-8 rounded-lg flex items-center justify-center`}>
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-sm">{role.name}</h4>
                    <p className="text-xs text-slate-400">权限等级 Lv.{role.level}</p>
                  </div>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                  {role.users}人
                </span>
              </div>
              <div className="mb-3">
                <p className="text-xs text-slate-500 mb-1">数据范围</p>
                <p className="text-sm font-medium text-slate-700">{role.dataScope}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">权限列表</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((perm, idx) => (
                    <span key={idx} className="text-xs bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-slate-600">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="搜索用户..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">ID</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">姓名</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">角色</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">部门</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">状态</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">最后登录</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">双因子</th>
                    <th className="text-left text-xs font-medium text-slate-500 px-4 py-3">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-mono text-slate-600">{user.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-800">{user.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{user.role}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{user.department}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 w-fit ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' :
                          user.status === 'locked' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {user.status === 'active' ? <CheckCircle className="w-3 h-3" /> :
                           user.status === 'locked' ? <Lock className="w-3 h-3" /> :
                           <Ban className="w-3 h-3" />}
                          {user.status === 'active' ? '正常' : user.status === 'locked' ? '已锁定' : '已禁用'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-500">{user.lastLogin}</td>
                      <td className="px-4 py-3">
                        {user.twoFA ? (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> 已启用
                          </span>
                        ) : (
                          <span className="text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> 未启用
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded hover:bg-slate-100" title="查看">
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-slate-100" title="编辑">
                            <Edit className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                          <button className="p-1.5 rounded hover:bg-slate-100" title={user.status === 'active' ? '锁定' : '解锁'}>
                            {user.status === 'active' ? <Lock className="w-3.5 h-3.5 text-amber-500" /> : <Unlock className="w-3.5 h-3.5 text-green-500" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Permission Matrix Tab */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">权限分配矩阵</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left text-xs font-medium text-slate-500 px-3 py-3 sticky left-0 bg-slate-50">功能模块</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-3 py-3">管理员</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-3 py-3">纪检组长</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-3 py-3">监督员</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-3 py-3">评分教师</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-3 py-3">考务人员</th>
                  <th className="text-center text-xs font-medium text-slate-500 px-3 py-3">查询用户</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {permissionMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-3 py-3 text-sm font-medium text-slate-700 sticky left-0 bg-white">{row.module}</td>
                    <td className="px-3 py-3 text-center">{getPermBadge(row.admin)}</td>
                    <td className="px-3 py-3 text-center">{getPermBadge(row.leader)}</td>
                    <td className="px-3 py-3 text-center">{getPermBadge(row.supervisor)}</td>
                    <td className="px-3 py-3 text-center">{getPermBadge(row.teacher)}</td>
                    <td className="px-3 py-3 text-center">{getPermBadge(row.staff)}</td>
                    <td className="px-3 py-3 text-center">{getPermBadge(row.query)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-100 border border-green-200"></span>完全权限</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-100 border border-blue-200"></span>查看权限</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-100 border border-amber-200"></span>本人数据</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-100 border border-slate-200"></span>公开数据</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-50 border border-slate-200"></span>无权限</span>
          </div>
        </div>
      )}
    </div>
  );
}
