import { useNavigate } from 'react-router-dom';

interface LandingPageProps {
    onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 font-sans overflow-x-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] opacity-50 mix-blend-multiply animate-blob"></div>
                <div className="absolute top-[10%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] opacity-50 mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[30%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] opacity-50 mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-950 p-2 rounded-lg shadow-lg shadow-indigo-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-slate-950 uppercase leading-none">
                                Apollo<span className="text-indigo-600">Markets</span>
                            </h1>
                        </div>
                    </div>

                    <div className="hidden md:flex gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
                        <a href="#features" className="hover:text-indigo-600 transition-colors">About Us</a>
                        <button onClick={() => navigate('/intel')} className="hover:text-indigo-600 transition-colors uppercase">Intelligence</button>
                        <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
                    </div>

                    <button
                        onClick={onLaunch}
                        className="group relative px-6 py-2.5 bg-slate-950 text-white text-[11px] font-black uppercase tracking-widest rounded-lg overflow-hidden transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Launch App
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20 lg:pt-48 lg:pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-8 animate-fade-in-up">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse"></span>
                        Alpha v1.0 Live
                    </div>

                    <h1 className="text-5xl lg:text-8xl font-black text-slate-950 uppercase tracking-tighter leading-[0.9] mb-8 max-w-5xl mx-auto">
                        The Future Isn't <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">A Mystery.</span> <br />
                        It's An Equation.
                    </h1>

                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
                        Market volatility is just information waiting to be synthesized. ApolloMarkets leverages
                        high-fidelity AI synthesis to turn market noise into predictive alpha.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button
                            onClick={onLaunch}
                            className="px-8 py-4 bg-slate-950 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                        >
                            Start Synthesis
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </button>
                        <button className="px-8 py-4 bg-white text-slate-950 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center justify-center gap-3">
                            Read Protocol
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>


            {/* Feature Grid Section */}
            <section id="features" className="py-24 bg-slate-50/50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black text-slate-950 uppercase tracking-tighter mb-4">
                            Intelligence <span className="text-indigo-600">Reimagined</span>
                        </h2>
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                            Our high-fidelity synthesis engine processes correlated signals to provide actionable market intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-600 transition-all duration-300">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-3 group-hover:text-indigo-600 transition-colors">Unified Synthesis</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                Don't just read the news—synthesize it. ApolloMarkets combines correlated event signals to calculate a "True Probability" distinct from market consensus.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-600 transition-all duration-300">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-3 group-hover:text-indigo-600 transition-colors">Alpha Discovery</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                Identify market inefficiencies instantly. Our Alpha Index measures the divergence between market price and calculated probability.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-600 transition-all duration-300">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-black text-slate-950 uppercase tracking-tight mb-3 group-hover:text-indigo-600 transition-colors">Visual Reports</h3>
                            <p className="text-slate-500 leading-relaxed text-sm font-medium">
                                Get detailed reasoning reports and visual variance charts that explain the "Why" behind every prediction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Pricing Section */}
            <section id="pricing" className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/50 to-purple-50/50 z-0"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-950 uppercase tracking-tighter mb-4">
                            Strategic <span className="text-indigo-600">Access</span>
                        </h2>
                        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
                            Choose the level of intelligence synthesis your operation requires.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Standard Plan */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl shadow-slate-200/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6 text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight mb-2">Analyst</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold text-slate-900">$0</span>
                                <span className="text-slate-500 font-medium">/mo</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    3 Daily Predictions
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Basic Synthesis Logic
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Standard Community Support
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 rounded-lg border-2 border-indigo-600 text-indigo-600 font-black uppercase tracking-widest text-xs hover:bg-indigo-600 hover:text-white transition-all">
                                Start Free
                            </button>
                        </div>

                        {/* Pro Plan (Highlighted) */}
                        <div className="bg-slate-950 rounded-2xl p-8 border-2 border-indigo-600 shadow-2xl relative hover:-translate-y-2 transition-all duration-300">
                            <div className="absolute top-0 right-0 -mr-1 -mt-1 w-24 h-24 overflow-hidden rounded-tr-2xl">
                                <div className="absolute transform rotate-45 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest py-1 right-[-35px] top-[32px] w-[170px] text-center">
                                    Recommended
                                </div>
                            </div>
                            <div className="mb-6 text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Strategist</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold text-white">$10</span>
                                <span className="text-slate-400 font-medium">/mo</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Unlimited Predictions
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Advanced Alpha Synthesis
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Priority Logic Processing
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    API Access (Beta)
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-indigo-600 transition-all border-2 border-transparent hover:border-white">
                                Get Started
                            </button>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl shadow-slate-200/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6 text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tight mb-2">Enterprise</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-3xl font-bold text-slate-900">$50</span>
                                <span className="text-slate-500 font-medium">/mo</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Dedicated Synthesis Nodes
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Custom Data Ingestion
                                </li>
                                <li className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    SLA & 24/7 Support
                                </li>
                            </ul>
                            <button className="w-full py-3 px-6 rounded-lg border-2 border-indigo-600 text-indigo-600 font-black uppercase tracking-widest text-xs hover:bg-indigo-600 hover:text-white transition-all">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-100 py-16 bg-white relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="max-w-sm">
                        <h5 className="text-[11px] font-black text-slate-950 uppercase tracking-[0.2em] mb-4">ApolloMarkets Stratagem Labs</h5>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight leading-loose">
                            Predicting the future through high-fidelity multivariate synthesis. <br />
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
