import React from 'react';
import {
  LayoutDashboard,
  FileCheck,
  ClipboardCheck,
  GraduationCap,
  MessageSquare,
  AlertTriangle,
  BarChart3,
  Shield,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: '监督总览', icon: LayoutDashboard },
  { id: 'exam', label: '考试监督', icon: FileCheck },
  { id: 'scoring', label: '评分监督', icon: ClipboardCheck },
  { id: 'admission', label: '录取监督', icon: GraduationCap },
  { id: 'complaint', label: '信访举报', icon: MessageSquare },
  { id: 'risk', label: '风险预警', icon: AlertTriangle },
  { id: 'analysis', label: '数据分析', icon: BarChart3 },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen flex flex-col shadow-2xl">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-amber-400" />
          <div>
            <h1 className="text-lg font-bold">艺考招生监督</h1>
            <p className="text-xs text-slate-400">工作管理平台</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="bg-slate-700/50 rounded-lg p-3">
          <p className="text-xs text-slate-400">当前学年</p>
          <p className="text-sm font-semibold text-white">2025-2026</p>
          <p className="text-xs text-slate-400 mt-1">招生季进行中</p>
          <div className="mt-2 w-full bg-slate-600 rounded-full h-2">
            <div className="bg-amber-400 h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-slate-400 mt-1">进度 65%</p>
        </div>
      </div>
    </aside>
  );
}
