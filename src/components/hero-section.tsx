import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 gradient-hero">
      <div className="max-w-4xl mx-auto text-center text-white">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              شایلی
            </h1>
            <p className="text-xl md:text-2xl opacity-90 font-light">
              دستیار هوشمند مراقبت از پوست و مو
            </p>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              با شایلی، روتین مراقبت از پوست و مویت رو شخصی‌سازی کن و با مشاوره هوش مصنوعی به بهترین نتیجه برس
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 shadow-elegant px-8 py-4 text-lg font-medium transition-bounce"
              >
                شروع کن
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium"
              >
                درباره شایلی
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold">مشاوره هوشمند</h3>
              <p className="text-sm opacity-80">تشخیص نوع پوست و مو با هوش مصنوعی</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="font-semibold">روتین شخصی</h3>
              <p className="text-sm opacity-80">برنامه مراقبت روزانه مخصوص تو</p>
            </div>
            
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold">پیگیری پیشرفت</h3>
              <p className="text-sm opacity-80">مشاهده تغییرات پوست و مو در طول زمان</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};