import React from 'react';

interface TargetEventInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TargetEventInput: React.FC<TargetEventInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Target Event
      </label>
      <textarea
        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 min-h-[100px]"
        placeholder="e.g., Bitcoin hits $100k by end of 2024"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
