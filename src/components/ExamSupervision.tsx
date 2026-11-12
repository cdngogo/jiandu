import React, { useState } from 'react';
import {
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  MapPin,
  Users,
  Camera,
  FileText,
} from 'lucide-react';

interface ExamRoom {
  id: string;
  name: string;
  category: string;
  status: 'normal' | 'warning' | 'completed';
  candidates: number;
  supervisors: number;
  cameras: number;
  location: string;
  startTime: string;
  notes: string;
}

const examRooms: ExamRoom[] = [
  { id: 'A101', name: '素描考场一', category: '美术类', status: 'completed', candidates: 30, supervisors: 2, cameras: 4, location: '教学楼A-101', startTime: '08:30', notes: '考试秩序良好' },
  { id: 'A102', name: '素描考场二', category: '美术类', status: 'completed', candidates: 30, supervisors: 2, cameras: 4, location: '教学楼A-102', startTime: '08:30', notes: '正常' },
  { id: 'A201', name: '色彩考场一', category: '美术类', status: 'normal', candidates: 28, supervisors: 2, cameras: 4, location: '教学楼A-201', startTime: '14:00', notes: '考试中' },
  { id: 'B101', name: '声乐考场一', category: '音乐类', status: 'warning', candidates: 15, supervisors: 3, cameras: 3, location: '音乐楼B-101', startTime: '09:00', notes: '发现1名考生迟到，已按规处理' },
  { id: 'B102', name: '器乐考场一', category: '音乐类', status: 'normal', candidates: 12, supervisors: 3, cameras: 3, location: '音乐楼B-102', startTime: '09:00', notes: '正常进行' },
  { id: 'C101', name: '舞蹈考场一', category: '舞蹈类', status: 'normal', candidates: 20, supervisors: 3, cameras: 6, location: '舞蹈楼C-101', startTime: '10:00', notes: '正常进行' },
  { id: 'D101', name: '表演考场一', category: '戏剧影视类', status: 'normal', candidates: 18, supervisors: 3, cameras: 4, location: '演艺楼D-101', startTime: '13:30', notes: '候考中' },
  { id: 'E101', name: '书法考场一', category: '书法类', status: 'normal', candidates: 25, supervisors: 2, cameras: 4, location: '书法楼E-101', startTime: '14:00', notes: '待开考' },
];

const statusConfig = {
  normal: { label: '正常', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  warning: { label: '异常', color: 'bg-red-100 text-red-700', icon: AlertCircle },
  completed: { label: '已结束', color: 'bg-slate-100 text-slate-600', icon: Clock },
};

export default function ExamSupervision() {
  const [filter, setFilter] = useState<string>('all');
  const [selectedRoom, setSelectedRoom] = useState<ExamRoom | null>(null);

  const filteredRooms = filter === 'all'
    ? examRooms
    : examRooms.filter(room => room.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">考试过程监督</h2>
          <p className="text-slate-500 mt-1">实时监控各考场考试情况</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">今日考场：</span>
          <span className="text-lg font-bold text-amber-600">{examRooms.length}</span>
          <span className="text-sm text-slate-500 ml-2">在考：</span>
          <span className="text-lg font-bold text-green-600">{examRooms.filter(r => r.status === 'normal').length}</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {[
          { key: 'all', label: '全部' },
          { key: 'normal', label: '正常' },
          { key: 'warning', label: '异常' },
          { key: 'completed', label: '已结束' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filter === tab.key
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exam Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredRooms.map((room) => {
          const status = statusConfig[room.status];
          const StatusIcon = status.icon;
          return (
            <div
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                room.status === 'warning' ? 'border-red-200 bg-red-50/30' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{room.id}</span>
                  <h4 className="font-semibold text-slate-800">{room.name}</h4>
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${status.color}`}>
                  <StatusIcon className="w-3 h-3" />
                  {status.label}
                </span>
              </div>
              <p className="text-sm text-amber-600 font-medium mb-3">{room.category}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-500">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-xs">考生</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">{room.candidates}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-500">
                    <Eye className="w-3.5 h-3.5" />
                    <span className="text-xs">监考</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">{room.supervisors}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-slate-500">
                    <Camera className="w-3.5 h-3.5" />
                    <span className="text-xs">监控</span>
                  </div>
                  <p className="text-sm font-bold text-slate-800">{room.cameras}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-100 pt-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {room.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {room.startTime}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => setSelectedRoom(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-slate-800">考场详情 - {selectedRoom.name}</h3>
              <button onClick={() => setSelectedRoom(null)} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">考场编号</p>
                  <p className="font-semibold text-slate-800">{selectedRoom.id}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">专业类别</p>
                  <p className="font-semibold text-slate-800">{selectedRoom.category}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">考场位置</p>
                  <p className="font-semibold text-slate-800">{selectedRoom.location}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs text-slate-500">开考时间</p>
                  <p className="font-semibold text-slate-800">{selectedRoom.startTime}</p>
                </div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <p className="text-xs text-amber-600 font-medium mb-1">监督备注</p>
                <p className="text-sm text-slate-700">{selectedRoom.notes}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  <Camera className="w-4 h-4" /> 查看监控
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                  <FileText className="w-4 h-4" /> 巡查记录
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Supervision Checklist */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">考试监督要点清单</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            '考生身份核验（身份证+准考证+人脸识别）',
            '考场环境检查（桌椅间距、照明、通风）',
            '监控设备运行状态确认',
            '监考人员到岗及履职情况',
            '试卷/考题保密措施落实情况',
            '考生携带物品检查（禁止电子设备）',
            '考试纪律执行情况',
            '突发事件应急处置准备',
            '评分标准公示情况',
            '考试全程录像保存',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
