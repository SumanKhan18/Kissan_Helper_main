import { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

export default function CountdownTimer({ deadline, className = '' }) {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    if (!deadline) {
      setTimeRemaining(null);
      return;
    }

    const calculateTime = () => {
      const now = new Date();
      // Ensure deadline is parsed correctly (handle both Date objects and ISO strings)
      const deadlineDate = deadline instanceof Date ? deadline : new Date(deadline);
      
      // Check if deadline is valid
      if (isNaN(deadlineDate.getTime())) {
        setTimeRemaining({ expired: true, text: 'Invalid Date' });
        return;
      }

      const diff = deadlineDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeRemaining({ expired: true, text: 'Expired' });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      let text = '';
      if (days > 0) {
        text = `${days} day${days > 1 ? 's' : ''} ${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
      } else if (hours > 0) {
        // Format: "1 hour 26 seconds" (show hours and seconds, skip minutes if 0)
        if (minutes > 0) {
          text = `${hours} hour${hours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
        } else {
          text = `${hours} hour${hours !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
        }
      } else if (minutes > 0) {
        text = `${minutes} minute${minutes !== 1 ? 's' : ''} ${seconds} second${seconds !== 1 ? 's' : ''}`;
      } else {
        text = `${seconds} second${seconds !== 1 ? 's' : ''}`;
      }

      setTimeRemaining({ 
        expired: false, 
        text,
        days, 
        hours, 
        minutes, 
        seconds 
      });
    };

    // Calculate immediately
    calculateTime();
    // Then update every second
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (!deadline || !timeRemaining) {
    return <span className="text-gray-400">—</span>;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Timer className={`h-4 w-4 ${
        timeRemaining.expired 
          ? 'text-red-400' 
          : timeRemaining.days < 1
          ? 'text-red-400 animate-pulse'
          : timeRemaining.days < 3
          ? 'text-orange-400'
          : 'text-green-400'
      }`} />
      <span className={`text-sm font-medium ${
        timeRemaining.expired 
          ? 'text-red-400' 
          : timeRemaining.days < 1
          ? 'text-red-400'
          : timeRemaining.days < 3
          ? 'text-orange-400'
          : 'text-green-400'
      }`}>
        {timeRemaining.text}
      </span>
    </div>
  );
}

