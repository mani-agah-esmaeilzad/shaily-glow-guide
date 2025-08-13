import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReviewData {
  name: string;
  age: string;
  job: string;
  skinType: string;
  skinConcerns: string[];
  hairType: string;
  hairConcerns: string[];
  currentSkinRoutine: string;
  currentHairRoutine: string;
}

interface ReviewStepProps {
  data: ReviewData;
  onNext: () => void;
  onPrev: () => void;
}

const getSkinTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    normal: 'طبیعی',
    dry: 'خشک',
    oily: 'چرب',
    combination: 'مختلط',
    sensitive: 'حساس'
  };
  return types[type] || type;
};

const getHairTypeLabel = (type: string) => {
  const types: Record<string, string> = {
    straight: 'صاف',
    wavy: 'موجدار',
    curly: 'فرفری',
    coily: 'پیچ‌پیچی'
  };
  return types[type] || type;
};

const getAgeLabel = (age: string) => {
  const ages: Record<string, string> = {
    'under-18': 'زیر ۱۸ سال',
    '18-25': '۱۸ تا ۲۵ سال',
    '26-35': '۲۶ تا ۳۵ سال',
    '36-45': '۳۶ تا ۴۵ سال',
    '46-55': '۴۶ تا ۵۵ سال',
    'over-55': 'بالای ۵۵ سال'
  };
  return ages[age] || age;
};

export const ReviewStep: React.FC<ReviewStepProps> = ({ data, onNext, onPrev }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">بررسی نهایی</h2>
        <p className="text-muted-foreground">اطلاعاتت رو چک کن و در صورت نیاز ویرایش کن</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">اطلاعات شخصی</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">نام:</span>
              <span className="font-medium">{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">سن:</span>
              <span className="font-medium">{getAgeLabel(data.age)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">شغل:</span>
              <span className="font-medium">{data.job}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">اطلاعات پوست</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">نوع پوست:</span>
              <span className="font-medium">{getSkinTypeLabel(data.skinType)}</span>
            </div>
            {data.skinConcerns.length > 0 && (
              <div>
                <span className="text-muted-foreground">نگرانی‌ها:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.skinConcerns.map((concern) => (
                    <span key={concern} className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">اطلاعات مو</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">نوع مو:</span>
              <span className="font-medium">{getHairTypeLabel(data.hairType)}</span>
            </div>
            {data.hairConcerns.length > 0 && (
              <div>
                <span className="text-muted-foreground">نگرانی‌ها:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.hairConcerns.map((concern) => (
                    <span key={concern} className="inline-block bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-xs">
                      {concern}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onPrev}
          variant="outline"
          className="flex-1 py-3"
          size="lg"
        >
          ویرایش
        </Button>
        <Button
          onClick={onNext}
          className="flex-1 py-3 transition-bounce shadow-glow"
          size="lg"
        >
          ساخت پروفایل
        </Button>
      </div>
    </div>
  );
};