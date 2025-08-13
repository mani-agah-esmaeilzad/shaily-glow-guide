import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface GenderData {
  gender: string;
}

interface GenderStepProps {
  data: GenderData;
  updateData: (data: Partial<GenderData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GenderStep: React.FC<GenderStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const isValid = data.gender;

  const genderOptions = [
    { value: 'female', label: 'زن', icon: '👩' },
    { value: 'male', label: 'مرد', icon: '👨' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">جنسیت</h2>
        <p className="text-muted-foreground">برای انتخاب اواتار مناسب</p>
      </div>

      <div className="space-y-4">
        <Label className="text-base font-medium">جنسیتت چیه؟</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {genderOptions.map((option) => (
            <Card
              key={option.value}
              className={`p-6 cursor-pointer transition-smooth hover:shadow-md ${
                data.gender === option.value
                  ? 'border-primary bg-primary/5 shadow-glow'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => updateData({ gender: option.value })}
            >
              <div className="text-center space-y-3">
                <div className="text-4xl">{option.icon}</div>
                <div className="font-medium text-lg">{option.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onPrev} className="flex-1">
          قبلی
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 transition-bounce"
        >
          ادامه
        </Button>
      </div>
    </div>
  );
};