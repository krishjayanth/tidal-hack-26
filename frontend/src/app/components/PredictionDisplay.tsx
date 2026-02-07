import React from 'react';

interface PredictionDisplayProps {
    probability: number | null;
    explanation: string;
    isLoading: boolean;
    error?: string;
}

export const PredictionDisplay: React.FC<PredictionDisplayProps> = ({ probability, explanation, isLoading, error }) => {
    if (isLoading) {
        return (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
                <p>Error: {error}</p>
            </div>
        );
    }

    if (probability === null) {
        return (
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 text-center">
                <p>Enter details to get a prediction.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                Predicted Probability
            </h2>
            <div className="flex items-baseline mb-4">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    {probability.toFixed(1)}%
                </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${probability}%` }}
                ></div>
            </div>

            <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {explanation}
                </p>
            </div>
        </div>
    );
};
