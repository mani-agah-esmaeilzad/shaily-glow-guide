import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicInfoData {
  name: string;
  age: string;
  job: string;
}

interface BasicInfoStepProps {
  data: BasicInfoData;
  updateData: (data: Partial<BasicInfoData>) => void;
  onNext: () => void;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, updateData, onNext }) => {
  const isValid = data.name.trim() && data.age && data.job.trim();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">آشنایی اولیه</h2>
        <p className="text-muted-foreground">بیا با هم شروع کنیم</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">اسمت چیه؟</Label>
          <Input
            id="name"
            value={data.name}
            onChange={(e) => updateData({ name: e.target.value })}
            placeholder="مثل سارا، علی، مریم..."
            className="text-lg py-3"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">سنت چنده؟</Label>
          <Select value={data.age} onValueChange={(value) => updateData({ age: value })}>
            <SelectTrigger className="text-lg py-3">
              <SelectValue placeholder="رده سنی خودت رو انتخاب کن" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-18">زیر ۱۸ سال</SelectItem>
              <SelectItem value="18-25">۱۸ تا ۲۵ سال</SelectItem>
              <SelectItem value="26-35">۲۶ تا ۳۵ سال</SelectItem>
              <SelectItem value="36-45">۳۶ تا ۴۵ سال</SelectItem>
              <SelectItem value="46-55">۴۶ تا ۵۵ سال</SelectItem>
              <SelectItem value="over-55">بالای ۵۵ سال</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="job">شغلت چیه؟</Label>
          <Input
            id="job"
            value={data.job}
            onChange={(e) => updateData({ job: e.target.value })}
            placeholder="مثل دانشجو، مهندس، معلم..."
            className="text-lg py-3"
          />
          <p className="text-sm text-muted-foreground">این به ما کمک می‌کنه تا نوع محیط کارت رو در نظر بگیریم</p>
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={!isValid}
        className="w-full py-3 text-lg transition-bounce"
        size="lg"
      >
        بریم قدم بعدی
      </Button>
    </div>
  );
};