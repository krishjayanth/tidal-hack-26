import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export interface RelatedEvent {
    id: string;
    name: string;
    probability: number;
}

interface RelatedEventsInputProps {
    events: RelatedEvent[];
    onChange: (events: RelatedEvent[]) => void;
}

export const RelatedEventsInput: React.FC<RelatedEventsInputProps> = ({ events, onChange }) => {
    const updateEvent = (id: string, field: 'name' | 'probability', value: string | number) => {
        const newEvents = events.map(event => {
            if (event.id === id) {
                return { ...event, [field]: value };
            }
            return event;
        });
        onChange(newEvents);
    };

    const addEvent = () => {
        const newEvent: RelatedEvent = {
            id: crypto.randomUUID(),
            name: '',
            probability: 50
        };
        onChange([...events, newEvent]);
    };

    const removeEvent = (id: string) => {
        onChange(events.filter(e => e.id !== id));
    };

    return (
        <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Related Events
                </label>
                <button
                    onClick={addEvent}
                    className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Event
                </button>
            </div>

            <div className="space-y-4">
                {events.map((event) => (
                    <div key={event.id} className="group relative bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700 transition-all hover:border-gray-300 dark:hover:border-gray-600">
                        <div className="flex gap-4 items-start">
                            <div className="flex-grow">
                                <input
                                    type="text"
                                    placeholder="Event Name (e.g. Bitcoin ETF Approved)"
                                    className="w-full bg-transparent text-sm font-medium text-gray-900 dark:text-white placeholder-gray-400 border-none focus:ring-0 p-0 mb-2"
                                    value={event.name}
                                    onChange={(e) => updateEvent(event.id, 'name', e.target.value)}
                                />
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={event.probability}
                                        onChange={(e) => updateEvent(event.id, 'probability', Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-600"
                                    />
                                    <div className="min-w-[3rem] text-right font-mono text-sm text-gray-600 dark:text-gray-400">
                                        {event.probability}%
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => removeEvent(event.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                                title="Remove event"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
