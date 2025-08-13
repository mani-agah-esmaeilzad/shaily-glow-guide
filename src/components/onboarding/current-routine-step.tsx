import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CurrentRoutineData {
  currentSkinRoutine: string;
  currentHairRoutine: string;
}

interface CurrentRoutineStepProps {
  data: CurrentRoutineData;
  updateData: (data: Partial<CurrentRoutineData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const CurrentRoutineStep: React.FC<CurrentRoutineStepProps> = ({ data, updateData, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">روتین فعلیت چطوریه؟</h2>
        <p className="text-muted-foreground">از کارهایی که الان انجام می‌دی بگو</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="skinRoutine" className="text-lg font-medium">
            روتین مراقبت از پوست:
          </Label>
          <Textarea
            id="skinRoutine"
            value={data.currentSkinRoutine}
            onChange={(e) => updateData({ currentSkinRoutine: e.target.value })}
            placeholder="مثلاً: صبح شستشو با ژل، کرم آفتاب؛ شب پاک‌کننده آرایش، سرم، مرطوب‌کننده..."
            className="min-h-[100px] text-base"
          />
          <p className="text-sm text-muted-foreground">
            محصولاتی که استفاده می‌کنی و ترتیب استفاده‌شون رو بنویس
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="hairRoutine" className="text-lg font-medium">
            روتین مراقبت از مو:
          </Label>
          <Textarea
            id="hairRoutine"
            value={data.currentHairRoutine}
            onChange={(e) => updateData({ currentHairRoutine: e.target.value })}
            placeholder="مثلاً: شامپو هر روز، نرم‌کننده، ماسک مو هفته‌ای یکبار، روغن کراتین..."
            className="min-h-[100px] text-base"
          />
          <p className="text-sm text-muted-foreground">
            شامپو، نرم‌کننده، ماسک و سایر کارهایی که برای موت انجام می‌دی
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            💡 اگر هیچ روتین خاصی نداری، همین رو بنویس. ما با هم یه روتین عالی می‌سازیم!
          </p>
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
          className="flex-1 py-3 transition-bounce"
          size="lg"
        >
          ادامه
        </Button>
      </div>
    </div>
  );
};