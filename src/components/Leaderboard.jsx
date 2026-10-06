import React from 'react';
import { Trophy } from 'lucide-react';

export function Leaderboard({ leaderboard }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-amber-400" /> Tabla de Clasificación Global
      </h2>

      <div className="space-y-3">
        {leaderboard.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
              user.isUser
                ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300 font-bold'
                : 'bg-slate-950/40 border-slate-800/80 text-slate-300'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-7 text-center font-mono font-bold ${
                user.rank === 1 ? 'text-amber-400 text-lg' :
                user.rank === 2 ? 'text-slate-300 text-lg' :
                user.rank === 3 ? 'text-amber-700 text-lg' : 'text-slate-500 text-sm'
              }`}>
                #{user.rank}
              </span>
              <span className="text-xl">{user.avatar}</span>
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-[11px] text-slate-500">{user.solved} retos resueltos</p>
              </div>
            </div>

            <span className="font-mono text-sm font-bold text-emerald-400">
              {user.points} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}