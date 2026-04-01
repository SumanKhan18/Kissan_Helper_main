import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

export default function DateTimeDisplay({ className = '' }) {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date) => {
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-700 p-4 shadow-lg ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <Calendar className="h-4 w-4 text-green-400" />
        <span className="text-xs text-gray-400 uppercase tracking-wide">Current Date & Time</span>
      </div>
      <div className="text-sm font-mono text-white font-semibold">
        {formatDateTime(currentDateTime)}
      </div>
    </div>
  );
}

