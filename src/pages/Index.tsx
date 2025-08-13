import React, { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';
import { Dashboard } from '@/pages/dashboard';

interface UserProfile {
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

type AppState = 'landing' | 'onboarding' | 'dashboard';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleGetStarted = () => {
    setAppState('onboarding');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setAppState('dashboard');
  };

  if (appState === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  if (appState === 'dashboard' && userProfile) {
    return <Dashboard profile={userProfile} />;
  }

  return <HeroSection onGetStarted={handleGetStarted} />;
};

export default Index;
