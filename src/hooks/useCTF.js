import { useState } from 'react';
import { initialChallenges, initialLeaderboard } from '../data/challenges';

export function useCTF() {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [solvedChallenges, setSolvedChallenges] = useState([]);
  const [unlockedHints, setUnlockedHints] = useState([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [activeTab, setActiveTab] = useState('challenges');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeChallengeModal, setActiveChallengeModal] = useState(null);
  const [selectedForTerminal, setSelectedForTerminal] = useState(null);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);

  // Calcular Nivel y Rango según XP
  const level = Math.floor(score / 250) + 1;
  const getRank = (xp) => {
    if (xp >= 1000) return 'Elite Cyber Warrior';
    if (xp >= 500) return 'Security Researcher';
    if (xp >= 200) return 'Junior Pentester';
    return 'Script Kiddie';
  };

  const unlockHint = (challenge) => {
    if (score < challenge.hintCost) {
      alert('¡No tienes suficiente XP para comprar esta pista!');
      return;
    }
    if (unlockedHints.includes(challenge.id)) return;

    setScore((prev) => prev - challenge.hintCost);
    setUnlockedHints((prev) => [...prev, challenge.id]);
  };

  const submitFlag = (challengeId, inputFlag) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (!challenge) return { success: false, message: 'Reto no encontrado.' };

    if (solvedChallenges.includes(challengeId)) {
      return { success: false, message: 'Ya has capturado esta bandera previamente.' };
    }

    if (inputFlag.trim() === challenge.flag) {
      const newScore = score + challenge.points;
      const newSolved = [...solvedChallenges, challengeId];
      
      setSolvedChallenges(newSolved);
      setScore(newScore);
      setStreak((prev) => prev + 1);

      // Actualizar Leaderboard
      setLeaderboard((prev) =>
        prev
          .map((item) =>
            item.isUser
              ? { ...item, points: newScore, solved: newSolved.length }
              : item
          )
          .sort((a, b) => b.points - a.points)
          .map((item, index) => ({ ...item, rank: index + 1 }))
      );

      return { success: true, message: `¡Bandera correcta! +${challenge.points} XP` };
    } else {
      setStreak(0);
      return { success: false, message: 'Bandera incorrecta. Inténtalo de nuevo.' };
    }
  };

  return {
    challenges,
    solvedChallenges,
    unlockedHints,
    score,
    streak,
    level,
    rank: getRank(score),
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
  };
}