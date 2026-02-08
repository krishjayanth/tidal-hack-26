import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Type definition for a Signal Event
interface SignalEvent {
    id: number;
    title: string;
    category: 'Macro' | 'Tech' | 'Crypto' | 'Geopolitics' | 'Politics';
    impact: 'High' | 'Medium' | 'Critical' | 'Low';
    probability: number; // 0-100
}

const MOCK_EVENTS: Omit<SignalEvent, 'probability'>[] = [
    { id: 1, title: 'Fed Interest Rate Cut (Sept)', category: 'Macro', impact: 'High' },
    { id: 2, title: 'SpaceX Starship Orbital Test', category: 'Tech', impact: 'Medium' },
    { id: 3, title: 'Bitcoin Spot ETF Approval', category: 'Crypto', impact: 'High' },
    { id: 4, title: 'Taiwan Strait Tensions Escalating', category: 'Geopolitics', impact: 'Critical' },
    { id: 5, title: 'NVIDIA Earnings Beat Consensus', category: 'Tech', impact: 'High' },
    { id: 6, title: 'US Election: Swing State Shift', category: 'Politics', impact: 'Critical' },
    { id: 7, title: 'Ethereum Layer 2 Adoption Spike', category: 'Crypto', impact: 'Medium' },
    { id: 8, title: 'Oil Prices Drop Below $70', category: 'Macro', impact: 'High' },
    { id: 9, title: 'OpenAI GPT-5 Release Date', category: 'Tech', impact: 'Critical' },
    { id: 10, title: 'Eurozone Inflation Data', category: 'Macro', impact: 'Medium' },
    { id: 11, title: 'Apple VR Headset V2 Launch', category: 'Tech', impact: 'Medium' },
    { id: 12, title: 'Solana Network Upgrade', category: 'Crypto', impact: 'Low' },
    { id: 13, title: 'Senate Bill: AI Regulation', category: 'Politics', impact: 'High' },
    { id: 14, title: 'Quantum Computing Breakthrough', category: 'Tech', impact: 'Critical' },
    { id: 15, title: 'Gold Price All-Time High', category: 'Macro', impact: 'Medium' }
];

interface LogEntry {
    id: number;
    type: 'SYSTEM' | 'SUCCESS' | 'WARN' | 'ERROR' | 'ANALYSIS' | 'LOG';
    message: string;
}

const MOCK_LOGS: Omit<LogEntry, 'id'>[] = [
    { type: 'WARN', message: 'Anomaly detected in Sector 7G (Crypto).' },
    { type: 'ANALYSIS', message: 'Calculating probability divergence...' },
    { type: 'LOG', message: 'Fed Chair Powell speech sentiment analysis: Dovish (0.65)' },
    { type: 'LOG', message: "Cross-referencing historical correlations for 'Rate Cut' events..." },
    { type: 'SUCCESS', message: 'Probability Vector Updated: 92.4% confidence.' },
    { type: 'SYSTEM', message: 'Garbage collection cycle completed.' },
    { type: 'ANALYSIS', message: 'Ingesting 4,200 new data points from Twitter API.' },
    { type: 'WARN', message: 'High volatility detected in Asian markets.' },
    { type: 'SUCCESS', message: 'Model weights optimized (Epoch 402).' },
    { type: 'LOG', message: 'Re-calibrating liquidity pools...' },
    { type: 'ERROR', message: 'Connection timeout on Node 4 (Retrying...)' },
    { type: 'ANALYSIS', message: 'Sentiment analysis running on 500k news articles.' }
];

export const IntelPage: React.FC = () => {
    const navigate = useNavigate();
    const [signals, setSignals] = useState<SignalEvent[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([
        { id: 1, type: 'SYSTEM', message: 'Initializing synthesis engine...' },
        { id: 2, type: 'SUCCESS', message: 'Connected to Polymarket data stream.' },
        { id: 3, type: 'SUCCESS', message: 'NewsAPIs aggregated (Sources: 142).' },
    ]);

    useEffect(() => {
        const refreshSignals = () => {
            const shuffled = [...MOCK_EVENTS].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 5).map(event => ({
                ...event,
                probability: Math.floor(Math.random() * (98 - 15 + 1) + 15),
                // Add a unique timestamp to force re-render and trigger animation
                renderId: Date.now()
            }));
            setSignals(selected);
        };

        // Initial signal load
        refreshSignals();

        // Signal interval (10s)
        const signalInterval = setInterval(refreshSignals, 10000);

        // Log interval (2s)
        const logInterval = setInterval(() => {
            const randomLog = MOCK_LOGS[Math.floor(Math.random() * MOCK_LOGS.length)];
            setLogs(prev => {
                const newLogs = [...prev, { ...randomLog, id: Date.now() }];
                return newLogs.slice(-8); // Keep last 8 logs
            });
        }, 2000);

        return () => {
            clearInterval(signalInterval);
            clearInterval(logInterval);
        };
    }, []);

    const getProbabilityColor = (prob: number) => {
        if (prob >= 80) return 'text-green-400';
        if (prob >= 60) return 'text-yellow-400';
        if (prob >= 40) return 'text-orange-400';
        return 'text-red-400';
    };

    const getIconColor = (category: string) => {
        switch (category) {
            case 'Macro': return 'text-blue-400 bg-blue-500/20 group-hover:bg-blue-600';
            case 'Tech': return 'text-purple-400 bg-purple-500/20 group-hover:bg-purple-600';
            case 'Crypto': return 'text-emerald-400 bg-emerald-500/20 group-hover:bg-emerald-600';
            case 'Geopolitics': return 'text-red-400 bg-red-500/20 group-hover:bg-red-600';
            default: return 'text-indigo-400 bg-indigo-500/20 group-hover:bg-indigo-600';
        }
    };

    const getLogColor = (type: string) => {
        switch (type) {
            case 'SYSTEM': return 'text-indigo-400';
            case 'SUCCESS': return 'text-green-400';
            case 'WARN': return 'text-yellow-400';
            case 'ERROR': return 'text-red-400';
            case 'ANALYSIS': return 'text-indigo-400';
            default: return 'text-slate-500';
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="bg-white/10 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-white uppercase leading-none">
                                Apollo<span className="text-indigo-500">Markets</span>
                            </h1>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="pt-32 pb-20 px-6">
                {/* Live Signal Feed Section Content */}
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
                                Live Feed
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                                Global <span className="text-indigo-500">Intelligence</span> Stream
                            </h2>
                        </div>
                        <div className="text-right hidden md:block">
                            <p className="text-slate-400 text-sm font-medium">System Status: <span className="text-green-400">Online</span></p>
                            <p className="text-slate-500 text-xs font-mono">Latency: 12ms</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Feed Column */}
                        <div className="space-y-4">
                            {signals.map((signal, index) => (
                                <div
                                    key={`${signal.id}-${signal.probability}`}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-between group cursor-pointer animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group-hover:text-white ${getIconColor(signal.category)}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-white">{signal.title}</h4>
                                            <p className="text-xs text-slate-400">{signal.category} • {signal.impact} Impact</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`block text-xl font-bold ${getProbabilityColor(signal.probability)}`}>{signal.probability}%</span>
                                        <span className="text-[10px] uppercase tracking-wider text-slate-500">Probability</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Visual Column */}
                        <div className="relative h-[600px] border border-white/10 rounded-2xl bg-black/40 backdrop-blur-sm p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900/0 to-slate-900/0"></div>

                            {/* Mock Terminal Output */}
                            <div className="font-mono text-xs text-slate-400 space-y-2 relative z-10 h-full flex flex-col justify-start">
                                {logs.map((log) => (
                                    <div key={log.id} className="flex gap-2 animate-fade-in-up">
                                        <span className={getLogColor(log.type)}>[{log.type}]</span>
                                        <span>{log.message}</span>
                                    </div>
                                ))}
                                <div className="flex gap-2 animate-pulse text-indigo-300">
                                    <span>_</span>
                                </div>
                            </div>

                            {/* Advanced Animation */}
                            <div className="absolute bottom-8 right-8 w-32 h-32 flex items-center justify-center">
                                {/* Rotating Container */}
                                <div className="absolute inset-0 animate-spin-slow">
                                    {/* Scaling Container (Breathing effect) */}
                                    <div className="w-full h-full animate-scale-in-out">
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-3 h-3 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.8)]"
                                                style={{
                                                    top: '50%',
                                                    left: '50%',
                                                    marginTop: '-6px',
                                                    marginLeft: '-6px',
                                                    transform: `rotate(${i * 45}deg) translate(48px) rotate(-${i * 45}deg)`, // Translate pushes them out, second rotate keeps dot upright (optional for circles)
                                                }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Center Core */}
                                <div className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(244,63,94,0.8)] animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
