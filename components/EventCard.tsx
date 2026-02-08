import React from 'react';
import { PredictionEvent } from '../types';

interface EventCardProps {
  event: PredictionEvent;
  isTarget?: boolean;
  onUpdate: (id: string, name: string, description: string, prob: number) => void;
  onRemove?: (id: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, isTarget, onUpdate, onRemove }) => {
  const handleChange = (field: keyof PredictionEvent, value: string | number) => {
    const name = field === 'name' ? (value as string) : event.name;
    const description = field === 'description' ? (value as string) : event.description;
    const probability = field === 'probability' ? (value as number) : event.probability;
    onUpdate(event.id, name, description, probability);
  };

  return (
    <div className={`p-6 rounded-xl transition-all ${isTarget
        ? 'border-2 border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-transparent shadow-lg shadow-blue-500/5'
        : 'border border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-transparent hover:border-purple-500/40 hover:from-purple-500/20 hover:to-purple-500/5'
      }`}>
      <div className="flex justify-between items-center mb-5">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isTarget ? 'text-blue-500' : 'text-purple-500'}`}>
          {isTarget ? 'Target Asset' : 'Correlation Variable'}
        </span>
        {onRemove && (
          <button
            onClick={() => onRemove(event.id)}
            className="p-1 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-all"
            title="Remove Variable"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      <div className="space-y-5">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Market Name</label>
          <input
            type="text"
            value={event.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Identify the market event..."
            className="w-full px-3 py-2.5 border border-slate-200 rounded-md bg-white text-sm text-slate-900 placeholder:text-slate-300 transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Context Description</label>
          <textarea
            rows={3}
            value={event.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Define constraints, news data, or specific signals..."
            className="w-full px-3 py-2.5 border border-slate-200 rounded-md bg-white text-sm text-slate-900 placeholder:text-slate-300 transition-all focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 resize-none"
          />
        </div>

        <div className="pt-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Predicted Probability
            </label>
            <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {event.probability}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={event.probability}
            onChange={(e) => handleChange('probability', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700"
          />
        </div>
      </div>
    </div>
  );
};