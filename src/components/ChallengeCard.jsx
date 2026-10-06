import React from 'react';
import { CheckCircle2, Lock, Terminal, HelpCircle } from 'lucide-react';

export function ChallengeCard({ challenge, isSolved, onOpenModal, onSelectTerminal }) {
  const getDifficultyBadge = (diff) => {
    switch (diff) {
      case 'Fácil': return 'bg-emerald-950 text-emerald-400 border-emerald-800';
      case 'Medio': return 'bg-amber-950 text-amber-400 border-amber-800';
      case 'Duro': return 'bg-rose-950 text-rose-400 border-rose-800';
      default: return 'bg-slate-800 text-slate-300';
    }
  };

  return (
    <div
      className={`relative group bg-slate-900/80 border rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
        isSolved
          ? 'border-emerald-500/50 bg-emerald-950/10'
          : 'border-slate-800 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5'
      }`}
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800">
            {challenge.category}
          </span>
          <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${getDifficultyBadge(challenge.difficulty)}`}>
            {challenge.difficulty}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-100 mb-2 flex items-center justify-between">
          {challenge.title}
          {isSolved && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        </h3>

        <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
          {challenge.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-2">
        <span className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-1">
          +{challenge.points} <span className="text-[10px] text-slate-500">XP</span>
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onSelectTerminal(challenge)}
            title="Abrir en terminal"
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            <Terminal className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenModal(challenge)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              isSolved
                ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
            }`}
          >
            {isSolved ? 'Revisar' : 'Resolver'}
          </button>
        </div>
      </div>
    </div>
  );
}