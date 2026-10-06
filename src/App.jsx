import React from 'react';
import { useCTF } from './hooks/useCTF';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { ChallengeCard } from './components/ChallengeCard';
import { ChallengeModal } from './components/ChallengeModal';
import { CyberTerminal } from './components/CyberTerminal';
import { Leaderboard } from './components/Leaderboard';

export default function App() {
  const {
    challenges,
    solvedChallenges,
    unlockedHints,
    score,
    streak,
    level,
    rank,
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
    activeChallengeModal,
    setActiveChallengeModal,
    selectedForTerminal,
    setSelectedForTerminal,
    leaderboard,
    unlockHint,
    submitFlag
  } = useCTF();

  const categories = ['All', 'Web Exploitation', 'Cryptography', 'Forensics', 'Reverse Engineering'];

  const filteredChallenges = selectedCategory === 'All'
    ? challenges
    : challenges.filter((c) => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-slate-950">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} level={level} rank={rank} streak={streak} />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <StatsOverview score={score} solvedCount={solvedChallenges.length} totalCount={challenges.length} rank={rank} />

        {activeTab === 'challenges' && (
          <section className="space-y-6">
            {/* Filtros de Categoría */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-colors ${
                    selectedCategory === cat
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid de Retos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  challenge={challenge}
                  isSolved={solvedChallenges.includes(challenge.id)}
                  onOpenModal={setActiveChallengeModal}
                  onSelectTerminal={(c) => {
                    setSelectedForTerminal(c);
                    setActiveTab('terminal');
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {activeTab === 'terminal' && (
          <CyberTerminal selectedChallenge={selectedForTerminal} onSubmitFlag={submitFlag} />
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard leaderboard={leaderboard} />
        )}
      </main>

      {/* Modal de Reto Activo */}
      {activeChallengeModal && (
        <ChallengeModal
          challenge={activeChallengeModal}
          isSolved={solvedChallenges.includes(activeChallengeModal.id)}
          isHintUnlocked={unlockedHints.includes(activeChallengeModal.id)}
          onUnlockHint={unlockHint}
          onSubmitFlag={submitFlag}
          onClose={() => setActiveChallengeModal(null)}
        />
      )}
    </div>
  );
}