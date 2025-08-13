import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface HairTypeData {
  hairType: string;
  hairConcerns: string[];
}

interface HairTypeStepProps {
  data: HairTypeData;
  updateData: (data: Partial<HairTypeData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const hairTypes = [
  { id: 'straight', label: 'صاف', description: 'مو کاملاً صاف و بدون فر' },
  { id: 'wavy', label: 'موجدار', description: 'موج ملایم تا متوسط' },
  { id: 'curly', label: 'فرفری', description: 'فر مشخص و حلقه‌ای' },
  { id: 'coily', label: 'پیچ‌پیچی', description: 'فر بسیار تنگ و پیچیده' }
];

const hairConcerns = [
  'ریزش مو',
  'خشکی و شکنندگی',
  'چربی زیاد',
  'شوره سر',
  'کم‌پشتی',
  'سفیدی زودرس',
  'نازک شدن مو',
  'رنگ گرفتگی',
  'آسیب ناشی از رنگ',
  'فردار نشدن'
];

export const HairTypeStep: React.FC<HairTypeStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleConcernChange = (concern: string, checked: boolean) => {
    const newConcerns = checked
      ? [...data.hairConcerns, concern]
      : data.hairConcerns.filter(c => c !== concern);
    updateData({ hairConcerns: newConcerns });
  };

  const isValid = data.hairType !== '';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">موهات چطوریه؟</h2>
        <p className="text-muted-foreground">نوع موت رو انتخاب کن</p>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-medium">نوع مو:</Label>
        <RadioGroup
          value={data.hairType}
          onValueChange={(value) => updateData({ hairType: value })}
          className="space-y-3"
        >
          {hairTypes.map((type) => (
            <div key={type.id} className="flex items-start space-x-3 space-x-reverse p-4 rounded-lg border border-border hover:bg-muted/50 transition-smooth">
              <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={type.id} className="font-medium cursor-pointer">
                  {type.label}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-medium">مشکلات مو (اختیاری):</Label>
        <div className="grid grid-cols-2 gap-3">
          {hairConcerns.map((concern) => (
            <div key={concern} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={concern}
                checked={data.hairConcerns.includes(concern)}
                onCheckedChange={(checked) => handleConcernChange(concern, !!checked)}
              />
              <Label htmlFor={concern} className="text-sm cursor-pointer">
                {concern}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onPrev}
          variant="outline"
          className="flex-1 py-3"
          size="lg"
        >
          قدم قبلی
        </Button>
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="flex-1 py-3 transition-bounce"
          size="lg"
        >
          ادامه
        </Button>
      </div>
    </div>
  );
};