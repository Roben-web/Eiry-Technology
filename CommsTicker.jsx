import React from "react";
import { Radio } from "lucide-react";

export default function CommsTicker({ messages }) {
  const tickerText = messages.join(' • ') + ' • ' + messages.join(' • ');

  return (
    <div className="rounded-lg overflow-hidden border border-[#401414] bg-[#06080a] p-2">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#1c0b0b] text-[#ff8a00] font-mono rounded">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>COMMS</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div 
            className="whitespace-nowrap text-[#ff7043] font-mono tracking-wider"
            style={{
              display: 'inline-block',
              animation: 'marquee 18s linear infinite',
            }}
          >
            {tickerText}
          </div>
        </div>
        <div className="w-48 text-right text-xs text-[#9aa6b2] hidden sm:block">
          AI Stream • Real-time
        </div>
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
}