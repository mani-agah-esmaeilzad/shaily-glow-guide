import React, { useState } from 'react';
import { ProgressSteps } from '@/components/ui/progress-steps';
import { BasicInfoStep } from './basic-info-step';
import { GenderStep } from './gender-step';
import { SkinTypeStep } from './skin-type-step';
import { HairTypeStep } from './hair-type-step';
import { CurrentRoutineStep } from './current-routine-step';
import { ReviewStep } from './review-step';

interface OnboardingData {
  name: string;
  age: string;
  job: string;
  gender: string;
  skinType: string;
  skinConcerns: string[];
  hairType: string;
  hairConcerns: string[];
  currentSkinRoutine: string;
  currentHairRoutine: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    name: '',
    age: '',
    job: '',
    gender: '',
    skinType: '',
    skinConcerns: [],
    hairType: '',
    hairConcerns: [],
    currentSkinRoutine: '',
    currentHairRoutine: ''
  });

  const totalSteps = 6;

  const updateData = (newData: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep data={data} updateData={updateData} onNext={nextStep} />;
      case 2:
        return <GenderStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <SkinTypeStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <HairTypeStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <CurrentRoutineStep data={data} updateData={updateData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <ReviewStep data={data} onNext={nextStep} onPrev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">بیا خودتو معرفی کن</h1>
          <p className="text-muted-foreground">تا بتونیم بهترین روتین رو برات بسازیم</p>
        </div>

        <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} className="mb-8" />

        <div className="gradient-card rounded-3xl p-8 shadow-card">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};