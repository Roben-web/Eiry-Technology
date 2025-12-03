/*
EIRY HUD & UX Prototype (Single-file React component)

How to use:
1) Create a React app (Vite or CRA). Example with Vite:
	 npm create vite@latest eiry-hud -- --template react
	 cd eiry-hud
	 npm install

2) Install dependencies:
	 - TailwindCSS (setup per Tailwind docs)
	 - framer-motion, recharts, lucide-react (icons), @heroicons/react
	 npm install framer-motion recharts lucide-react @heroicons/react

3) Tailwind: ensure tailwind is configured (postcss) and imported in main.css.

4) Drop this file as src/components/EiryHud.jsx and import into App.jsx.

Notes:
- This prototype is self-contained and uses mocked AI/data-science functions to simulate realistic behavior (prediction, anomaly detection, sentiment).
- Replace mocked functions with real AI backend calls (FastAPI, Flask, or serverless endpoints) when available.

*/

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { IconAlertTriangle, IconSend, IconLoaderQuarter } from "lucide-react";

// Mocked AI / Data Science utilities (replace with real endpoints)
function mockPredictiveScore(features) {
	// deterministic pseudo-random score from features
	const s = (features.reduce((a, b) => a + (b || 0), 0) * 73129) % 100;
	return Math.round(s * 100) / 100;
}

function mockAnomalyDetector(series) {
	// return indices flagged as anomalies
	const mean = series.reduce((a, b) => a + b, 0) / series.length;
	return series.map((v, i) => ({ i, v, anomaly: Math.abs(v - mean) > mean * 0.4 }));
}

function mockGenerateProfileImageSeed(name) {
	// returns a placeholder avatar URL from initials (we will just use SVG data URL)
	const initials = name
		.split(" ")
		.map((p) => p[0])
		.slice(0, 2)
		.join("");
	const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='100%' height='100%' fill='#0f172a'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='72' fill='#f97316'>${initials}</text></svg>`;
	return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Sample telemetry data
const sampleTelemetry = [...Array(40)].map((_, i) => ({
	t: i,
	metric: Math.round(50 + 20 * Math.sin(i / 3) + Math.random() * 12),
}));

export default function EiryHud() {
	const [selectedProfile] = useState({
		name: "Eve Kim",
		dob: "07/26/1986",
		residence: "1982 Gilford Rd",
		education: ["Franklin High School '04", "Northwestern University '08"],
		bio: "Systems Engineer, AI & Spatial UX",
		id: "EIRY-0007",
	});

	const [telemetry, setTelemetry] = useState(sampleTelemetry);
	const [anomalies, setAnomalies] = useState([]);
	const [predictScore, setPredictScore] = useState(0);
	const [tickerMessages, setTickerMessages] = useState([
		"CREATOR OF SPACE PARANOIDS: PANIC CITY",
		"CEO OF ENCOM",
		"SYSTEM ALERT: 3 DEVICES OUT OF RANGE",
		"AI LAB: NEW QUANTUM SIMULATION READY",
	]);
	const [log, setLog] = useState([]);
	const profileImage = useMemo(() => mockGenerateProfileImageSeed(selectedProfile.name), [selectedProfile]);

	useEffect(() => {
		// Run mocked analytics once
		const series = telemetry.map((d) => d.metric);
		const mal = mockAnomalyDetector(series);
		setAnomalies(mal.filter((m) => m.anomaly));
		const score = mockPredictiveScore(series.slice(-6));
		setPredictScore(score);

		setLog((l) => [
			{ t: new Date(), level: "info", msg: "Telemetry ingested", data: series.length },
			{ t: new Date(), level: "warn", msg: `${mal.filter((m) => m.anomaly).length} anomalies detected` },
			...l,
		]);
	}, []);

	useEffect(() => {
		// Append telemetry periodically to simulate live stream
		const id = setInterval(() => {
			setTelemetry((prev) => {
				const nextT = prev[prev.length - 1].t + 1;
				const nextVal = Math.round(50 + 20 * Math.sin(nextT / 3) + Math.random() * 12);
				const newSeries = [...prev.slice(1), { t: nextT, metric: nextVal }];
				const mal = mockAnomalyDetector(newSeries.map((d) => d.metric));
				setAnomalies(mal.filter((m) => m.anomaly));
				setPredictScore(mockPredictiveScore(newSeries.slice(-6).map((d) => d.metric)));
				return newSeries;
			});
			setLog((l) => [
				{ t: new Date(), level: "debug", msg: "Telemetry tick" },
				...l.slice(0, 50),
			]);
		}, 1500);
		return () => clearInterval(id);
	}, []);

	function sendCommand(cmd) {
		setLog((l) => [{ t: new Date(), level: "action", msg: `Sent: ${cmd}` }, ...l].slice(0, 200));
		// simulate AI response
		setTimeout(() => {
			setLog((l) => [{ t: new Date(), level: "ai", msg: `AI: ${cmd.split(" ")[0]} acknowledged` }, ...l].slice(0, 200));
		}, 700 + Math.random() * 800);
	}

	return (
		<div className="min-h-screen bg-[#020617] text-white p-6 font-sans">
			<div className="max-w-[1400px] mx-auto grid grid-cols-12 gap-4">
				{/* Left column: profile & controls */}
				<div className="col-span-4 bg-gradient-to-b from-[#061021] to-[#04101a] rounded-2xl p-4 border border-[#13242f]/50 shadow-2xl">
					<div className="flex items-center gap-3">
						<img src={profileImage} alt="avatar" className="w-24 h-24 rounded-lg border-2 border-[#ff3b3b] object-cover shadow-lg" />
						<div>
							<h2 className="text-2xl font-semibold tracking-wide">{selectedProfile.name}</h2>
							<p className="text-sm text-[#9aa6b2]">{selectedProfile.bio}</p>
							<div className="mt-2 text-xs text-[#a7b6c3]">ID: <span className="font-mono">{selectedProfile.id}</span></div>
						</div>
					</div>

					<div className="mt-4 grid grid-cols-2 gap-2">
						<div className="p-3 rounded-lg bg-[#071426]/60 border border-[#1f2f39]">
							<div className="text-xs text-[#9aa6b2]">DOB</div>
							<div className="font-mono">{selectedProfile.dob}</div>
						</div>
						<div className="p-3 rounded-lg bg-[#071426]/60 border border-[#1f2f39]">
							<div className="text-xs text-[#9aa6b2]">Residence</div>
							<div className="font-mono">{selectedProfile.residence}</div>
						</div>
					</div>

					<div className="mt-4">
						<div className="text-xs text-[#9aa6b2]">Education</div>
						<ul className="text-sm mt-1">
							{selectedProfile.education.map((e) => (
								<li key={e} className="font-mono text-sm">• {e}</li>
							))}
						</ul>
					</div>

					<div className="mt-4">
						<div className="flex items-center justify-between">
							<div className="text-xs text-[#9aa6b2]">Predictive Score</div>
							<div className="text-sm font-mono">{predictScore}</div>
						</div>
						<div className="w-full bg-[#052233] rounded-full h-3 mt-2 overflow-hidden border border-[#123041]">
							<div className="h-3 bg-gradient-to-r from-[#ff3b3b] to-[#ff8a00]" style={{ width: `${Math.min(100, predictScore)}%` }} />
						</div>
					</div>

					<div className="mt-4 flex gap-2">
						<button onClick={() => sendCommand("REBOOT_MODULE")}
							className="flex-1 py-2 rounded-lg bg-[#ff3b3b] text-black font-semibold hover:opacity-90">Reboot</button>
						<button onClick={() => sendCommand("LOCK_DOWN")}
							className="py-2 px-3 rounded-lg border border-[#ff3b3b] text-sm">Lock</button>
					</div>

					<div className="mt-4 p-3 rounded-lg bg-[#041a22]/40 border border-[#10202a]">
						<div className="text-xs text-[#9aa6b2] mb-2">Quick AI Actions</div>
						<div className="flex gap-2">
							<button onClick={() => sendCommand("ANALYZE_TELEMETRY")}
								className="flex-1 py-2 rounded-lg bg-[#0ea5a0]/20 border border-[#0ea5a0] text-[11px]">Analyze</button>
							<button onClick={() => sendCommand("SUMMARIZE_LOGS")}
								className="py-2 px-2 rounded-lg bg-[#ffb86b]/10 border border-[#ffb86b] text-[11px]">Summarize</button>
						</div>
					</div>

				</div>

				{/* Middle column: main HUD */}
				<div className="col-span-5 bg-[#031021]/40 rounded-2xl p-4 border border-[#162230] shadow-xl">
					<div className="flex items-start justify-between">
						<div>
							<div className="text-xs text-[#9aa6b2]">SYSTEM HUD • EIRY DS</div>
							<h1 className="text-2xl font-bold tracking-wider mt-1">Operational Overview</h1>
						</div>
						<div className="text-right text-xs text-[#9aa6b2]">
							<div>STATUS: <span className="text-[#ffb86b]">Degraded</span></div>
							<div className="mt-1 font-mono">UTC {new Date().toISOString().slice(11, 19)}</div>
						</div>
					</div>

					<div className="mt-4 grid grid-cols-3 gap-3">
						<div className="col-span-2 bg-[#041a22]/30 p-3 rounded-lg border border-[#0f2b33]">
							<div className="flex items-center justify-between">
								<div className="text-xs text-[#9aa6b2]">Telemetry</div>
								<div className="text-xs font-mono">Live stream</div>
							</div>
							<div className="h-40 mt-2">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={telemetry}>
										<Line type="monotone" dataKey="metric" stroke="#ff6b6b" strokeWidth={2} dot={false} />
										<Tooltip wrapperStyle={{ color: "black" }} />
									</LineChart>
								</ResponsiveContainer>
							</div>
							<div className="mt-2 text-xs text-[#9aa6b2]">Anomalies: <span className="font-mono">{anomalies.length}</span></div>
						</div>

						<div className="bg-[#041a22]/30 p-3 rounded-lg border border-[#0f2b33] flex flex-col justify-between">
							<div className="text-xs text-[#9aa6b2]">AI Summary</div>
							<div className="mt-1">Latest: <span className="font-mono">Model drift increase</span></div>
							<div className="mt-3 text-sm font-semibold text-[#ffb86b]">Action: Recalibrate</div>
							<div className="mt-3 text-xs text-[#9aa6b2]">Confidence: <span className="font-mono">{(predictScore/100).toFixed(2)}</span></div>
						</div>

						<div className="col-span-3 mt-3 grid grid-cols-2 gap-2">
							<div className="p-2 rounded-lg bg-[#04121a]/30 border border-[#0f2630]">
								<div className="text-xs text-[#9aa6b2]">Mini-map</div>
								<div className="h-20 bg-gradient-to-b from-[#021016] to-[#02101a] rounded-md mt-2 flex items-center justify-center text-[11px] text-[#7aa3b1]">SIMULATED MAP</div>
							</div>
							<div className="p-2 rounded-lg bg-[#04121a]/30 border border-[#0f2630]">
								<div className="text-xs text-[#9aa6b2]">Comms</div>
								<div className="h-20 mt-2 flex items-center gap-2">
									<div className="flex-1 text-[11px] text-[#9aa6b2]">Channel: HQ / Secure</div>
									<div className="w-10 h-10 rounded-full bg-[#071a22] grid place-items-center border border-[#12323a]">TX</div>
								</div>
							</div>
						</div>

					</div>
				</div>

				{/* Right column: logs & details */}
				<div className="col-span-3 bg-[#020b12] rounded-2xl p-4 border border-[#08202a] shadow-lg">
					<div className="flex items-center justify-between">
						<div className="text-xs text-[#9aa6b2]">System Logs</div>
						<div className="text-xs text-[#9aa6b2]">Entries: <span className="font-mono">{log.length}</span></div>
					</div>

					<div className="mt-2 h-64 overflow-y-auto pr-2 text-[12px]">
						{log.map((entry, idx) => (
							<div key={idx} className={`mb-2 p-2 rounded ${entry.level === 'warn' ? 'bg-[#3b2b00]/20' : 'bg-[#03101a]/30'} border border-[#0f2b33]`}>
								<div className="text-[10px] text-[#9aa6b2]">{entry.t.toLocaleTimeString()}</div>
								<div className="font-mono text-[13px]">{entry.msg}</div>
							</div>
						))}
					</div>

					<div className="mt-3 flex gap-2">
						<input id="cmd" placeholder="command" className="flex-1 px-3 py-2 rounded bg-[#03141a] border border-[#12323a] text-sm" />
						<button onClick={() => {
							const el = document.getElementById('cmd');
							if (!el) return; const v = el.value.trim(); if (!v) return; sendCommand(v); el.value = '';
						}} className="px-3 py-2 rounded bg-[#ff3b3b]">Send</button>
					</div>
				</div>

				{/* Bottom ticker / banner spanning full width */}
				<div className="col-span-12 mt-2">
					<div className="rounded-lg overflow-hidden border border-[#401414] bg-[#06080a] p-2">
						<div className="flex items-center gap-4">
							<div className="px-3 py-1 bg-[#1c0b0b] text-[#ff8a00] font-mono rounded">- COMMS -</div>
							<div className="flex-1 overflow-hidden">
								<div className="whitespace-nowrap animate-marquee text-[#ff7043] font-mono tracking-wider">{tickerMessages.join(' • ') + ' • ' + tickerMessages.join(' • ')}</div>
							</div>
							<div className="w-48 text-right text-xs text-[#9aa6b2]">AI Stream • Real-time</div>
						</div>
					</div>
				</div>

			</div>

			<style>
				{`@keyframes marquee { 0% { transform: translateX(0%);} 100% { transform: translateX(-50%);} }
				.animate-marquee { display: inline-block; will-change: transform; animation: marquee 18s linear infinite; }
				`}
			</style>
		</div>
	);
}