import React from 'react';
import { Trophy, Flag, Zap, Award } from 'lucide-react';

export function StatsOverview({ score, solvedCount, totalCount, rank }) {
  const percentage = Math.round((solvedCount / totalCount) * 100) || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Puntos Totales (XP)</p>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">{score}</p>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/20">
          <Flag className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Flags Capturadas</p>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">{solvedCount} / {totalCount}</p>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
          <Trophy className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Progreso Global</p>
          <p className="text-2xl font-extrabold text-slate-100 font-mono">{percentage}%</p>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
          <Award className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Rango Actual</p>
          <p className="text-sm font-bold text-amber-400 font-mono mt-1">{rank}</p>
        </div>
      </div>
    </div>
  );
}