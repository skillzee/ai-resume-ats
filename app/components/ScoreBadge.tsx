import React from 'react';

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let badgeClass = '';
  let textClass = '';
  let label = '';

  if (score > 69) {
    badgeClass = 'bg-badge-green';
    textClass = 'text-green-600';
    label = 'Strong';
  } else if (score > 49) {
    badgeClass = 'bg-badge-yellow';
    textClass = 'text-yellow-700';
    label = 'Good Start';
  } else {
    badgeClass = 'bg-badge-red';
    textClass = 'text-red-600';
    label = 'Needs Work';
  }

  return (
    <div className={`inline-block px-3 py-1 rounded-full ${badgeClass}`}>
      <p className={`text-xs font-semibold ${textClass}`}>{label}</p>
    </div>
  );
};

export default ScoreBadge;
