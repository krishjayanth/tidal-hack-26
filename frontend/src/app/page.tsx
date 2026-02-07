'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { TargetEventInput } from './components/TargetEventInput';
import { RelatedEventsInput, RelatedEvent } from './components/RelatedEventsInput';
import { PredictionDisplay } from './components/PredictionDisplay';
import { predictProbability, PredictionResponse } from './api';
import { Activity } from 'lucide-react';

export default function Home() {
  const [targetEvent, setTargetEvent] = useState('');
  const [relatedEvents, setRelatedEvents] = useState<RelatedEvent[]>([
    { id: '1', name: '', probability: 50 },
    { id: '2', name: '', probability: 50 }
  ]);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const getPrediction = useCallback(async () => {
    // Only predict if we have a target event and at least one related event with a name
    const validRelatedEvents = relatedEvents.filter(e => e.name.trim() !== '');

    if (!targetEvent.trim() || validRelatedEvents.length === 0) {
      setPrediction(null);
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      const result = await predictProbability(
        targetEvent,
        validRelatedEvents.map(e => ({ name: e.name, probability: e.probability }))
      );
      setPrediction(result);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to get prediction');
      setPrediction(null);
    } finally {
      setIsLoading(false);
    }
  }, [targetEvent, relatedEvents]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      getPrediction();
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [getPrediction]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">
      <main className="max-w-2xl mx-auto px-6 py-12">
        <header className="mb-10 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Polymarket Predictor</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered probability analysis</p>
          </div>
        </header>

        <section className="space-y-8">
          <TargetEventInput
            value={targetEvent}
            onChange={setTargetEvent}
          />

          <RelatedEventsInput
            events={relatedEvents}
            onChange={setRelatedEvents}
          />

          <PredictionDisplay
            probability={prediction ? prediction.probability : null}
            explanation={prediction ? prediction.explanation : ''}
            isLoading={isLoading}
            error={error}
          />
        </section>
      </main>
    </div>
  );
}
