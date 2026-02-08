import React, { useState, useCallback } from 'react';
import { PredictionEvent, AnalysisResult } from '../types';
import { EventCard } from './EventCard';
import { analyzeMarket } from '../services/apiService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
    onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
    const [targetEvent, setTargetEvent] = useState<PredictionEvent>({
        id: 'target',
        name: 'Bitcoin $100K Milestone',
        description: 'Will Bitcoin reach $100,000 USD before June 1st, 2025?',
        probability: 45
    });

    const [relatedEvents, setRelatedEvents] = useState<PredictionEvent[]>([
        {
            id: '1',
            name: 'Fed Rate Cut Policy',
            description: 'The Federal Reserve reduces benchmark interest rates by 25bps or more in Q1.',
            probability: 65
        },
        {
            id: '2',
            name: 'MSTR Treasury Expansion',
            description: 'MicroStrategy announces additional Bitcoin acquisition exceeding $1B in current quarter.',
            probability: 80
        }
    ]);

    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleUpdateTarget = useCallback((id: string, name: string, description: string, probability: number) => {
        setTargetEvent({ id, name, description, probability });
    }, []);

    const handleUpdateRelated = useCallback((id: string, name: string, description: string, probability: number) => {
        setRelatedEvents(prev => prev.map(e => e.id === id ? { ...e, name, description, probability } : e));
    }, []);

    const handleRemoveRelated = useCallback((id: string) => {
        setRelatedEvents(prev => prev.filter(e => e.id !== id));
    }, []);

    const handleAddRelated = useCallback(() => {
        const newId = Math.random().toString(36).substr(2, 9);
        setRelatedEvents(prev => [...prev, { id: newId, name: '', description: '', probability: 50 }]);
    }, []);

    const runAnalysis = async () => {
        if (!targetEvent.name || !targetEvent.description) {
            setError('Target mission requires name and description to initiate.');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const analysis = await analyzeMarket(targetEvent, relatedEvents);
            setResult(analysis);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(`Mission synthesis failed: ${errorMessage}`);
            console.error('Full connection error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const chartData = result ? [
        { name: 'Market', value: targetEvent.probability },
        { name: 'Apollo', value: result.predictedProbability }
    ] : [];

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100">
            {/* ApolloMarkets Navbar */}
            <nav className="sticky top-0 z-50 bg-white/95 border-b border-slate-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
                        <div className="bg-slate-950 p-2 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight text-slate-950 uppercase leading-none">
                                Apollo<span className="text-indigo-600 font-black">Markets</span>
                            </h1>
                            <span className="text-[8px] font-black text-slate-400 tracking-[0.3em] uppercase">Future-Ready Intel</span>
                        </div>
                    </div>
                    <button
                        onClick={runAnalysis}
                        disabled={isLoading || !targetEvent.name}
                        className={`px-6 py-2.5 rounded-md text-[11px] font-black tracking-widest uppercase transition-all ${isLoading
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-950 text-white hover:bg-indigo-700 active:scale-[0.98]'
                            }`}
                    >
                        {isLoading ? 'Processing...' : 'Run Analysis'}
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 mt-16 pb-24">
                <header className="mb-16 border-l-8 border-indigo-600 pl-8 max-w-3xl">
                    <h2 className="text-4xl font-black text-slate-950 uppercase tracking-tighter leading-none mb-4">
                        The future isn’t a mystery. <br />It’s an equation.
                    </h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        Market volatility is just information waiting to be synthesized. ApolloMarkets leverages
                        high-fidelity AI synthesis to turn market noise into predictive alpha.
                        Dominate the prediction markets of tomorrow, today.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Inputs */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-8">
                        <div className="border-b border-slate-100 pb-2">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mission Control</h3>
                        </div>

                        <EventCard
                            event={targetEvent}
                            isTarget
                            onUpdate={handleUpdateTarget}
                        />

                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Correlated Signals</h4>
                                <button
                                    onClick={handleAddRelated}
                                    className="px-3 py-1 text-[9px] font-black text-indigo-600 hover:text-white hover:bg-indigo-600 border border-indigo-100 rounded transition-all uppercase tracking-widest"
                                >
                                    Add Signal
                                </button>
                            </div>

                            <div className="space-y-4">
                                {relatedEvents.map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        onUpdate={handleUpdateRelated}
                                        onRemove={handleRemoveRelated}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-8">
                        <div className="border-b border-slate-100 pb-2">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">System Status</h3>
                        </div>
                        {!result && !isLoading && !error && (
                            <div className="h-full min-h-[500px] flex flex-col items-center justify-center border border-dashed border-slate-200 rounded-lg bg-slate-50/30 text-slate-400 p-12 text-center">
                                <div className="bg-slate-100 p-4 rounded-full mb-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Awaiting Mission Parameters</h4>
                                <p className="text-xs max-w-xs leading-relaxed font-medium">Input your target market and correlated sub-signals to generate a predictive synthesis report.</p>
                            </div>
                        )}

                        {isLoading && (
                            <div className="h-full min-h-[500px] flex flex-col items-center justify-center border border-slate-100 rounded-lg p-12 space-y-8 bg-white">
                                <div className="flex items-center gap-1">
                                    <div className="w-1 h-6 bg-indigo-600 animate-[pulse_0.8s_infinite]"></div>
                                    <div className="w-1 h-10 bg-indigo-600 animate-[pulse_1.2s_infinite]"></div>
                                    <div className="w-1 h-4 bg-indigo-600 animate-[pulse_1s_infinite]"></div>
                                    <div className="w-1 h-8 bg-indigo-600 animate-[pulse_0.9s_infinite]"></div>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-xs font-black text-slate-950 uppercase tracking-[0.25em] mb-2">Calculating the Future</h4>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Running High-Fidelity Signal Synthesis...</p>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-8 border-2 border-red-50 rounded-lg bg-red-50/50 text-red-600 text-xs font-black uppercase tracking-widest text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {result && !isLoading && (
                            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                                {/* Metrics */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-8 border border-slate-950 bg-slate-950 text-white rounded-md">
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Apollo Prob</p>
                                        <p className="text-5xl font-black leading-none">{result.predictedProbability.toFixed(1)}<span className="text-xl">%</span></p>
                                        <div className="mt-5">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-sm border ${result.delta > 0 ? 'bg-indigo-600 border-indigo-500' : 'bg-red-600 border-red-500'}`}>
                                                {result.delta > 0 ? 'Signal Undervalued' : 'Signal Overvalued'} {Math.abs(result.delta).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 border border-slate-200 rounded-md">
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">System Confidence</p>
                                        <p className="text-5xl font-black text-slate-950 leading-none">{result.confidence}<span className="text-xl">%</span></p>
                                        <div className="mt-6 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                            <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${result.confidence}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="p-8 border border-slate-200 rounded-md">
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Alpha Index</p>
                                        <p className={`text-5xl font-black leading-none ${Math.abs(result.delta) > 5 ? 'text-indigo-600' : 'text-slate-950'}`}>
                                            {Math.abs(result.delta) > 12 ? 'MAX' : Math.abs(result.delta) > 6 ? 'HIGH' : 'LOW'}
                                        </p>
                                        <p className="text-[9px] text-slate-400 mt-4 font-black uppercase tracking-widest">Inefficiency Scale</p>
                                    </div>
                                </div>

                                {/* Analysis Breakdown */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    <div className="p-8 border border-slate-200 rounded-md bg-white">
                                        <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-2">Synthesis Variance</h4>
                                        <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                                    <CartesianGrid strokeDasharray="0" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800, textAnchor: 'middle' }} dy={10} />
                                                    <YAxis domain={[0, 100]} hide />
                                                    <Tooltip
                                                        cursor={{ fill: '#f8fafc' }}
                                                        contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: 'none', padding: '8px 12px' }}
                                                    />
                                                    <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={45}>
                                                        {chartData.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#f1f5f9' : '#4f46e6'} />
                                                        ))}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                    <div className="p-8 border border-slate-200 rounded-md bg-white flex flex-col">
                                        <h4 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.2em] mb-6 border-b border-slate-50 pb-2">Synthesis Intel</h4>
                                        <div className="prose prose-slate prose-xs flex-1 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar text-slate-600 font-medium leading-[1.8] text-[13px] whitespace-pre-wrap">
                                            {result.reasoning
                                                .replace(/['`]([^'`]*)['`]/g, (m, c) => /[0-9=\-<>]/.test(c) ? c : m)
                                                .split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, index) => {
                                                    if (part.startsWith('**') && part.endsWith('**')) {
                                                        return <span key={index} className="font-bold text-slate-800">{part.slice(2, -2)}</span>;
                                                    }
                                                    if (part.startsWith('*') && part.endsWith('*')) {
                                                        return <span key={index} className="">{part.slice(1, -1)}</span>;
                                                    }
                                                    // Format numbers and math operators
                                                    return part.split(/(\d+(?:\.\d+)?%?|\s*[+\-=<>:/]\s*)/g).map((subPart, subIndex) => {
                                                        if (/^(\d+(?:\.\d+)?%?|\s*[+\-=<>:/]\s*)$/.test(subPart)) {
                                                            return <span key={`${index}-${subIndex}`} className="font-mono text-indigo-600">{subPart}</span>;
                                                        }
                                                        return subPart;
                                                    });
                                                })}
                                        </div>
                                    </div>
                                </div>

                                {/* Intel Sources */}
                                {result.sources.length > 0 && (
                                    <div className="p-8 border border-slate-200 rounded-md bg-slate-50/20">
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Grounding Evidence</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                            {result.sources.map((source, idx) => (
                                                <a
                                                    key={idx}
                                                    href={source.uri}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex flex-col p-4 rounded bg-white border border-slate-100 hover:border-indigo-400 transition-all group"
                                                >
                                                    <p className="text-[11px] font-black text-slate-800 line-clamp-2 group-hover:text-indigo-600 mb-2 leading-tight">
                                                        {source.title}
                                                    </p>
                                                    <div className="mt-auto flex items-center justify-between">
                                                        <span className="text-[9px] text-slate-300 font-mono truncate max-w-[150px]">{source.uri}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-slate-200 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                        </svg>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <footer className="mt-auto border-t border-slate-100 py-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="max-w-sm">
                        <h5 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.2em] mb-4">ApolloMarkets Stratagem Labs</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-loose">
                            Predicting the future through high-fidelity multivariate synthesis.
                            The next generation of strategic market intelligence.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-16 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="space-y-4">
                            <p className="text-slate-900">Protocol</p>
                            <span className="block hover:text-indigo-600 cursor-pointer transition-colors">Synthesis Core</span>
                            <span className="block hover:text-indigo-600 cursor-pointer transition-colors">Alpha Discovery</span>
                        </div>
                        <div className="space-y-4">
                            <p className="text-slate-900">Endpoints</p>
                            <span className="block hover:text-indigo-600 cursor-pointer transition-colors">Live Ingestion</span>
                            <span className="block hover:text-indigo-600 cursor-pointer transition-colors">Grounding Search</span>
                        </div>
                        <div className="space-y-4">
                            <p className="text-slate-900">Intelligence</p>
                            <span className="block hover:text-indigo-600 cursor-pointer transition-colors">Compliance</span>
                            <span className="block hover:text-indigo-600 cursor-pointer transition-colors">Data Privacy</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
