import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ 
  message = 'Loading...', 
  subMessage = 'Please wait while we fetch the information',
  icon: Icon = Loader2,
  size = 'lg'
}) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const iconSizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="relative inline-block mb-6">
          <div className={`animate-spin rounded-full border-4 border-gray-700 border-t-green-500 ${sizeClasses[size]} shadow-lg`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className={`text-green-500 animate-pulse ${iconSizeClasses[size]}`} />
          </div>
        </div>
        <p className="text-gray-400 text-lg font-medium animate-pulse">{message}</p>
        {subMessage && (
          <p className="text-gray-500 text-sm mt-2">{subMessage}</p>
        )}
      </div>
    </div>
  );
}

