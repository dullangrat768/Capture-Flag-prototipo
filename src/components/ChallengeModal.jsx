import React, { useState } from 'react';
import { X, Key, Lightbulb, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';

export function ChallengeModal({ challenge, isSolved, isHintUnlocked, onUnlockHint, onSubmitFlag, onClose }) {
  const [flagInput, setFlagInput] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = onSubmitFlag(challenge.id, flagInput);
    setFeedback(res);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-150">
        
        {/* Header Modal */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-950/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-emerald-400">{challenge.category}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-amber-400">+{challenge.points} XP</span>
            </div>
            <h2 className="text-xl font-bold text-slate-100">{challenge.title}</h2>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Descripción */}
          <div className="text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
            {challenge.description}
          </div>

          {/* Sección de Pista */}
          <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Pista del Reto
              </span>
              {!isHintUnlocked && !isSolved && (
                <button
                  onClick={() => onUnlockHint(challenge)}
                  className="text-xs bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-lg transition-colors"
                >
                  Desbloquear (-{challenge.hintCost} XP)
                </button>
              )}
            </div>

            {isHintUnlocked ? (
              <p className="text-xs text-amber-300/90 font-mono bg-amber-950/20 p-2.5 rounded border border-amber-900/40">
                💡 {challenge.hint}
              </p>
            ) : (
              <p className="text-xs text-slate-500 italic">
                La pista está bloqueada. Puedes comprarla si te quedas atascado.
              </p>
            )}
          </div>

          {/* Formulario de Envío */}
          {!isSolved ? (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="text-xs font-medium text-slate-300 block">Enviar Flag</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Key className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="CTF{...}"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-sm transition-colors"
                >
                  Submit
                </button>
              </div>

              {feedback && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  feedback.success ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800' : 'bg-rose-950/60 text-rose-300 border border-rose-800'
                }`}>
                  {feedback.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  {feedback.message}
                </div>
              )}
            </form>
          ) : (
            /* Sección de Aprendizaje Post-Captura */
            <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <BookOpen className="w-4 h-4" /> Explicación Teórica (Writeup)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {challenge.explanation}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}