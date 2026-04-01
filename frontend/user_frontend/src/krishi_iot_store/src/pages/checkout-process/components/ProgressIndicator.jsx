import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, steps }) => {
  const getStepStatus = (stepIndex) => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step, status) => {
    if (status === 'completed') return 'CheckCircle';
    return step?.icon;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => {
          const status = getStepStatus(index);
          const isLast = index === steps?.length - 1;

          return (
            <div key={step?.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-smooth ${
                    status === 'completed'
                      ? 'bg-success text-white'
                      : status === 'current' ?'bg-primary text-white' :'bg-muted text-text-secondary border-2 border-border'
                  }`}
                >
                  <Icon
                    name={getStepIcon(step, status)}
                    size={20}
                    color={status === 'upcoming' ? 'currentColor' : 'white'}
                  />
                </div>
                
                {/* Step Info */}
                <div className="ml-3 hidden sm:block">
                  <h4
                    className={`text-sm font-medium ${
                      status === 'current' ?'text-primary'
                        : status === 'completed' ?'text-success' :'text-text-secondary'
                    }`}
                  >
                    {step?.title}
                  </h4>
                  <p className="text-xs text-text-secondary">{step?.description}</p>
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 transition-smooth ${
                      status === 'completed'
                        ? 'bg-success' :'bg-border'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile Step Info */}
      <div className="sm:hidden mt-4 text-center">
        <h4 className="text-sm font-medium text-primary">
          {steps?.[currentStep]?.title}
        </h4>
        <p className="text-xs text-text-secondary">
          {steps?.[currentStep]?.description}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;