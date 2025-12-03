import React from "react";
import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";

export default function TelemetryChart({ telemetry, anomalyCount }) {
  return (
    <div className="col-span-2 bg-[#041a22]/30 p-3 rounded-lg border border-[#0f2b33]">
      <div className="flex items-center justify-between">
        <div className="text-xs text-[#9aa6b2]">Telemetry</div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff6b6b] animate-pulse"></span>
          <span className="text-xs font-mono text-white">Live stream</span>
        </div>
      </div>
      <div className="h-40 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={telemetry}>
            <Line 
              type="monotone" 
              dataKey="metric" 
              stroke="#ff6b6b" 
              strokeWidth={2} 
              dot={false}
              animationDuration={300}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1f2f39',
                borderRadius: '8px',
                color: '#fff'
              }}
              labelStyle={{ color: '#9aa6b2' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs text-[#9aa6b2]">
          Anomalies: <span className="font-mono text-[#ff6b6b]">{anomalyCount}</span>
        </div>
        <div className="text-xs text-[#9aa6b2]">
          Points: <span className="font-mono text-white">{telemetry.length}</span>
        </div>
      </div>
    </div>
  );
}