import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface SkinTypeData {
  skinType: string;
  skinConcerns: string[];
}

interface SkinTypeStepProps {
  data: SkinTypeData;
  updateData: (data: Partial<SkinTypeData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const skinTypes = [
  { id: 'normal', label: 'طبیعی', description: 'پوست متعادل، نه خیلی چرب نه خیلی خشک' },
  { id: 'dry', label: 'خشک', description: 'احساس کشیدگی، پوسته‌پوسته شدن' },
  { id: 'oily', label: 'چرب', description: 'براق، منافذ بزرگ، مستعد جوش' },
  { id: 'combination', label: 'مختلط', description: 'نواحی مختلف پوست متفاوت' },
  { id: 'sensitive', label: 'حساس', description: 'به راحتی تحریک می‌شود' }
];

const skinConcerns = [
  'جوش و آکنه',
  'چین و چروک',
  'لک و تیرگی',
  'سفیدی یا رنگ پریدگی',
  'حساسیت و قرمزی',
  'منافذ بزرگ',
  'خشکی و پوسته‌پوسته شدن',
  'چربی زیاد'
];

export const SkinTypeStep: React.FC<SkinTypeStepProps> = ({ data, updateData, onNext, onPrev }) => {
  const handleConcernChange = (concern: string, checked: boolean) => {
    const newConcerns = checked
      ? [...data.skinConcerns, concern]
      : data.skinConcerns.filter(c => c !== concern);
    updateData({ skinConcerns: newConcerns });
  };

  const isValid = data.skinType !== '';

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">پوستت چطوریه؟</h2>
        <p className="text-muted-foreground">نوع پوستت رو انتخاب کن</p>
      </div>

      <div className="space-y-4">
        <Label className="text-lg font-medium">نوع پوست:</Label>
        <RadioGroup
          value={data.skinType}
          onValueChange={(value) => updateData({ skinType: value })}
          className="space-y-3"
        >
          {skinTypes.map((type) => (
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
        <Label className="text-lg font-medium">مشکلات پوستی (اختیاری):</Label>
        <div className="grid grid-cols-2 gap-3">
          {skinConcerns.map((concern) => (
            <div key={concern} className="flex items-center space-x-2 space-x-reverse">
              <Checkbox
                id={concern}
                checked={data.skinConcerns.includes(concern)}
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