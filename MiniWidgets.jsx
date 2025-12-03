import React from "react";
import { Map, Radio } from "lucide-react";

export default function MiniWidgets() {
  return (
    <div className="col-span-3 mt-3 grid grid-cols-2 gap-2">
      <div className="p-3 rounded-lg bg-[#04121a]/30 border border-[#0f2630]">
        <div className="flex items-center gap-2 text-xs text-[#9aa6b2]">
          <Map className="w-3 h-3" />
          <span>Mini-map</span>
        </div>
        <div className="h-20 bg-gradient-to-b from-[#021016] to-[#02101a] rounded-md mt-2 flex items-center justify-center relative overflow-hidden">
          {/* Simulated grid lines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(5)].map((_, i) => (
              <div 
                key={`h-${i}`}
                className="absolute w-full h-px bg-[#0ea5a0]"
                style={{ top: `${(i + 1) * 20}%` }}
              />
            ))}
            {[...Array(5)].map((_, i) => (
              <div 
                key={`v-${i}`}
                className="absolute h-full w-px bg-[#0ea5a0]"
                style={{ left: `${(i + 1) * 20}%` }}
              />
            ))}
          </div>
          {/* Blinking dot */}
          <div className="w-2 h-2 rounded-full bg-[#ff3b3b] animate-pulse shadow-lg shadow-[#ff3b3b]/50" />
          <span className="text-[11px] text-[#7aa3b1] ml-2">ACTIVE</span>
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-[#04121a]/30 border border-[#0f2630]">
        <div className="flex items-center gap-2 text-xs text-[#9aa6b2]">
          <Radio className="w-3 h-3" />
          <span>Comms</span>
        </div>
        <div className="h-20 mt-2 flex items-center gap-3">
          <div className="flex-1">
            <div className="text-[11px] text-[#9aa6b2]">Channel</div>
            <div className="text-sm text-white font-mono">HQ / Secure</div>
            <div className="mt-1 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1 bg-[#0ea5a0] rounded-full animate-pulse"
                  style={{ 
                    height: `${8 + Math.random() * 12}px`,
                    animationDelay: `${i * 100}ms`
                  }}
                />
              ))}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#071a22] grid place-items-center border border-[#12323a] hover:border-[#0ea5a0] transition-colors cursor-pointer">
            <span className="text-[#0ea5a0] font-mono text-sm">TX</span>
          </div>
        </div>
      </div>
    </div>
  );
}