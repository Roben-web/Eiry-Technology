import React, { useMemo } from "react";

function generateProfileImage(name) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='100%' height='100%' fill='#0f172a'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='72' fill='#f97316'>${initials}</text></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default function ProfilePanel({ profile, predictScore, onCommand }) {
  const profileImage = useMemo(() => generateProfileImage(profile.name), [profile.name]);

  return (
    <div className="bg-gradient-to-b from-[#061021] to-[#04101a] rounded-2xl p-4 border border-[#13242f]/50 shadow-2xl h-full">
      <div className="flex items-center gap-3">
        <img 
          src={profileImage} 
          alt="avatar" 
          className="w-24 h-24 rounded-lg border-2 border-[#ff3b3b] object-cover shadow-lg" 
        />
        <div>
          <h2 className="text-2xl font-semibold tracking-wide text-white">{profile.name}</h2>
          <p className="text-sm text-[#9aa6b2]">{profile.bio}</p>
          <div className="mt-2 text-xs text-[#a7b6c3]">
            ID: <span className="font-mono">{profile.id}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg bg-[#071426]/60 border border-[#1f2f39]">
          <div className="text-xs text-[#9aa6b2]">DOB</div>
          <div className="font-mono text-white">{profile.dob}</div>
        </div>
        <div className="p-3 rounded-lg bg-[#071426]/60 border border-[#1f2f39]">
          <div className="text-xs text-[#9aa6b2]">Residence</div>
          <div className="font-mono text-white text-sm">{profile.residence}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-[#9aa6b2]">Education</div>
        <ul className="text-sm mt-1">
          {profile.education.map((e) => (
            <li key={e} className="font-mono text-sm text-white">• {e}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <div className="text-xs text-[#9aa6b2]">Predictive Score</div>
          <div className="text-sm font-mono text-white">{predictScore}</div>
        </div>
        <div className="w-full bg-[#052233] rounded-full h-3 mt-2 overflow-hidden border border-[#123041]">
          <div 
            className="h-3 bg-gradient-to-r from-[#ff3b3b] to-[#ff8a00] transition-all duration-500" 
            style={{ width: `${Math.min(100, predictScore)}%` }} 
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => onCommand("REBOOT_MODULE")}
          className="flex-1 py-2 rounded-lg bg-[#ff3b3b] text-black font-semibold hover:opacity-90 transition-opacity"
        >
          Reboot
        </button>
        <button 
          onClick={() => onCommand("LOCK_DOWN")}
          className="py-2 px-3 rounded-lg border border-[#ff3b3b] text-sm text-white hover:bg-[#ff3b3b]/10 transition-colors"
        >
          Lock
        </button>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-[#041a22]/40 border border-[#10202a]">
        <div className="text-xs text-[#9aa6b2] mb-2">Quick AI Actions</div>
        <div className="flex gap-2">
          <button 
            onClick={() => onCommand("ANALYZE_TELEMETRY")}
            className="flex-1 py-2 rounded-lg bg-[#0ea5a0]/20 border border-[#0ea5a0] text-[11px] text-white hover:bg-[#0ea5a0]/30 transition-colors"
          >
            Analyze
          </button>
          <button 
            onClick={() => onCommand("SUMMARIZE_LOGS")}
            className="py-2 px-3 rounded-lg bg-[#ffb86b]/10 border border-[#ffb86b] text-[11px] text-white hover:bg-[#ffb86b]/20 transition-colors"
          >
            Summarize
          </button>
        </div>
      </div>
    </div>
  );
}