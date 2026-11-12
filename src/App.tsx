import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ExamSupervision from './components/ExamSupervision';
import ScoringSupervision from './components/ScoringSupervision';
import AdmissionSupervision from './components/AdmissionSupervision';
import ComplaintManagement from './components/ComplaintManagement';
import RiskWarning from './components/RiskWarning';
import DataAnalysis from './components/DataAnalysis';
import SecurityAudit from './components/SecurityAudit';
import PermissionManagement from './components/PermissionManagement';
import ExpertDatabase from './components/ExpertDatabase';
import EmergencyPlan from './components/EmergencyPlan';
import { Bell, User, Menu, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'exam': return <ExamSupervision />;
      case 'scoring': return <ScoringSupervision />;
      case 'admission': return <AdmissionSupervision />;
      case 'complaint': return <ComplaintManagement />;
      case 'risk': return <RiskWarning />;
      case 'analysis': return <DataAnalysis />;
      case 'security': return <SecurityAudit />;
      case 'permission': return <PermissionManagement />;
      case 'expert': return <ExpertDatabase />;
      case 'emergency': return <EmergencyPlan />;
      default: return <Dashboard />;
    }
  };

  const getTabTitle = () => {
    const titles: Record<string, string> = {
      dashboard: '监督总览',
      exam: '考试监督',
      scoring: '评分监督',
      admission: '录取监督',
      complaint: '信访举报',
      risk: '风险预警',
      analysis: '数据分析',
      security: '安全审计与保密管理',
      permission: '权限分级管理',
      expert: '专家库管理',
      emergency: '应急预案管理',
    };
    return titles[activeTab] || '监督总览';
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`fixed lg:static z-50 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSidebarOpen(false); }} />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-800">{getTabTitle()}</h1>
              <p className="text-xs text-slate-400">艺术类高校艺考招生监督工作平台</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-amber-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-700">管理员</p>
                <p className="text-xs text-slate-400">纪检监察组</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
        <footer className="bg-white border-t border-slate-200 px-6 py-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>© 2026 艺术类高校艺考招生监督工作平台</span>
            <span>技术支持：信息化建设中心 | 版本 v3.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
