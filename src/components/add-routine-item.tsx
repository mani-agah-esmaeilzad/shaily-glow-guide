import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface RoutineItem {
  id: string;
  title: string;
  type: 'skin' | 'hair';
  time: 'morning' | 'evening';
}

interface AddRoutineItemProps {
  onAdd: (item: Omit<RoutineItem, 'id'>) => void;
}

export const AddRoutineItem: React.FC<AddRoutineItemProps> = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'skin' | 'hair'>('skin');
  const [time, setTime] = useState<'morning' | 'evening'>('morning');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        type,
        time,
      });
      setTitle('');
      setType('skin');
      setTime('morning');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          اضافه کردن مرحله جدید
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>مرحله جدید روتین</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">عنوان مرحله</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثل: شستشوی صورت، ماساژ پوست..."
            />
          </div>
          
          <div className="space-y-2">
            <Label>نوع مراقبت</Label>
            <Select value={type} onValueChange={(value: 'skin' | 'hair') => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="skin">پوست</SelectItem>
                <SelectItem value="hair">مو</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>زمان انجام</Label>
            <Select value={time} onValueChange={(value: 'morning' | 'evening') => setTime(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">صبح</SelectItem>
                <SelectItem value="evening">شب</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">
              لغو
            </Button>
            <Button onClick={handleSubmit} disabled={!title.trim()} className="flex-1">
              اضافه کردن
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};