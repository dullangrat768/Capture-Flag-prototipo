import React from 'react';
import { Shield, Terminal, Trophy, Flame } from 'lucide-react';

export function Header({ activeTab, setActiveTab, level, rank, streak }) {
  return (
    <header className="border-b border-emerald-500/30 bg-slate-900/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-emerald-500/10 border border-emerald-500/40 rounded-lg text-emerald-400">
          <Shield className="w-7 h-7 animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-wider text-emerald-400 flex items-center gap-2">
            CYBER_LAB <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">CTF v1.0</span>
          </h1>
          <p className="text-xs text-slate-400">Plataforma Gamificada de Entrenamiento Ciberseguridad</p>
        </div>
      </div>

      <nav className="flex bg-slate-950/80 p-1 rounded-lg border border-slate-800">
        <button
          onClick={() => setActiveTab('challenges')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'challenges'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield className="w-4 h-4" /> Retos
        </button>
        <button
          onClick={() => setActiveTab('terminal')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'terminal'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" /> Consola Shell
        </button>
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" /> Clasificación
        </button>
      </nav>

      <div className="flex items-center gap-4 text-xs font-mono">
        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full">
          <Flame className="w-4 h-4" />
          <span>Racha: {streak} d.</span>
        </div>
        <div className="text-right">
          <div className="text-slate-200 font-bold">Nivel {level}</div>
          <div className="text-emerald-400 font-mono text-[11px]">{rank}</div>
        </div>
      </div>
    </header>
  );
}