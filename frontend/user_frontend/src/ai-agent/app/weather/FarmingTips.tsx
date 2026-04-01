'use client';

interface WeatherTip {
  condition: string;
  icon: string;
  tips: string[];
  color: string;
}

interface FarmingTipsProps {
  weatherCondition: string;
}

export default function FarmingTips({ weatherCondition }: FarmingTipsProps) {
  const weatherTips: WeatherTip[] = [
    {
      condition: 'Sunny',
      icon: 'ri-sun-line',
      color: 'yellow',
      tips: [
        'Perfect time for harvesting grains and vegetables',
        'Increase watering frequency for young plants',
        'Apply mulch to retain soil moisture',
        'Early morning or evening watering is best'
      ]
    },
    {
      condition: 'Partly Cloudy',
      icon: 'ri-cloud-line',
      color: 'blue',
      tips: [
        'Good conditions for transplanting seedlings',
        'Ideal weather for outdoor farm work',
        'Monitor soil moisture levels regularly',
        'Perfect time for applying fertilizers'
      ]
    },
    {
      condition: 'Cloudy',
      icon: 'ri-cloudy-line',
      color: 'gray',
      tips: [
        'Reduce watering as evaporation is lower',
        'Good time for spraying pesticides',
        'Check plants for fungal diseases',
        'Prepare for possible rain'
      ]
    },
    {
      condition: 'Light Rain',
      icon: 'ri-drizzle-line',
      color: 'blue',
      tips: [
        'Natural irrigation - reduce manual watering',
        'Monitor drainage to prevent waterlogging',
        'Avoid heavy machinery on wet soil',
        'Good time for planting seeds'
      ]
    }
  ];

  const currentTips = weatherTips.find(tip => 
    weatherCondition.toLowerCase().includes(tip.condition.toLowerCase())
  ) || weatherTips[0];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <div className={`w-8 h-8 flex items-center justify-center mr-3 bg-${currentTips.color}-100 rounded-full`}>
          <i className={`${currentTips.icon} text-${currentTips.color}-600`}></i>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Farming Tips for {currentTips.condition} Weather
        </h3>
      </div>
      
      <div className="space-y-3">
        {currentTips.tips.map((tip, index) => (
          <div key={index} className="flex items-start">
            <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5">
              <i className="ri-plant-line text-green-600 text-sm"></i>
            </div>
            <p className="text-gray-700 text-sm">{tip}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-start">
          <div className="w-5 h-5 flex items-center justify-center mr-3 mt-0.5">
            <i className="ri-lightbulb-line text-green-600"></i>
          </div>
          <div>
            <h4 className="font-medium text-green-800 mb-1">Pro Tip</h4>
            <p className="text-green-700 text-sm">
              Always monitor local weather forecasts and adjust your farming activities accordingly. 
              Weather patterns can change quickly, so stay prepared!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}