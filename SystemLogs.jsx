import React, { useRef, useEffect } from "react";
import { AlertTriangle, Info, Zap, Bot, Bug } from "lucide-react";

const levelIcons = {
  warn: AlertTriangle,
  info: Info,
  action: Zap,
  ai: Bot,
  debug: Bug,
};

const levelColors = {
  warn: "text-[#ffb86b]",
  info: "text-[#0ea5a0]",
  action: "text-[#ff3b3b]",
  ai: "text-[#a78bfa]",
  debug: "text-[#6b7280]",
};

export default function SystemLogs({ logs, onSendCommand }) {
  const inputRef = useRef(null);
  const logsEndRef = useRef(null);

  const handleSend = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.value.trim();
    if (!value) return;
    onSendCommand(value);
    inputRef.current.value = '';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="bg-[#020b12] rounded-2xl p-4 border border-[#08202a] shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#9aa6b2]">System Logs</div>
        <div className="text-xs text-[#9aa6b2]">
          Entries: <span className="font-mono text-white">{logs.length}</span>
        </div>
      </div>

      <div className="mt-2 flex-1 overflow-y-auto pr-2 text-[12px] space-y-2 max-h-64 scrollbar-thin scrollbar-thumb-[#1f2f39] scrollbar-track-transparent">
        {logs.map((entry, idx) => {
          const Icon = levelIcons[entry.level] || Info;
          const colorClass = levelColors[entry.level] || "text-[#9aa6b2]";
          
          return (
            <div 
              key={idx} 
              className={`p-2 rounded ${
                entry.level === 'warn' ? 'bg-[#3b2b00]/20' : 'bg-[#03101a]/30'
              } border border-[#0f2b33]`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-3 h-3 ${colorClass}`} />
                <span className="text-[10px] text-[#9aa6b2]">
                  {entry.t.toLocaleTimeString()}
                </span>
              </div>
              <div className="font-mono text-[13px] text-white mt-1">{entry.msg}</div>
            </div>
          );
        })}
        <div ref={logsEndRef} />
      </div>

      <div className="mt-3 flex gap-2">
        <input 
          ref={inputRef}
          placeholder="Enter command..." 
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 rounded bg-[#03141a] border border-[#12323a] text-sm text-white placeholder-[#4a5568] focus:outline-none focus:border-[#ff3b3b]/50 transition-colors" 
        />
        <button 
          onClick={handleSend}
          className="px-4 py-2 rounded bg-[#ff3b3b] text-black font-medium hover:opacity-90 transition-opacity"
        >
          Send
        </button>
      </div>
    </div>
  );
}