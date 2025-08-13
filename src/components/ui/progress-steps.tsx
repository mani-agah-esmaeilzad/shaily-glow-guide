import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressStepsProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  totalSteps,
  className
}) => {
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <div className="flex items-center justify-between mb-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium transition-smooth",
                    isCompleted
                      ? "bg-primary border-primary text-primary-foreground shadow-glow"
                      : isActive
                      ? "border-primary text-primary bg-primary/10"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">
                  قدم {stepNumber}
                </span>
              </div>
              {index < totalSteps - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 transition-smooth",
                    stepNumber < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        {currentStep} از {totalSteps} قدم
      </div>
    </div>
  );
};