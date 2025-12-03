import React from "react";
import { Brain } from "lucide-react";

export default function AISummary({ predictScore }) {
  return (
    <div className="bg-[#041a22]/30 p-3 rounded-lg border border-[#0f2b33] flex flex-col justify-between">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-[#0ea5a0]" />
        <div className="text-xs text-[#9aa6b2]">AI Summary</div>
      </div>
      <div className="mt-2 text-white text-sm">
        Latest: <span className="font-mono text-[#9aa6b2]">Model drift increase</span>
      </div>
      <div className="mt-3 text-sm font-semibold text-[#ffb86b]">
        Action: Recalibrate
      </div>
      <div className="mt-3 text-xs text-[#9aa6b2]">
        Confidence: <span className="font-mono text-white">{(predictScore / 100).toFixed(2)}</span>
      </div>
    </div>
  );
}