import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { AIChat } from '@/components/ai-chat';
import { AvatarDisplay } from '@/components/ui/avatar-display';
import { AddRoutineItem } from '@/components/add-routine-item';

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

interface DashboardProps {
  profile: UserProfile;
}

interface Task {
  id: string;
  title: string;
  type: 'skin' | 'hair';
  completed: boolean;
  time: 'morning' | 'evening';
}

const initialTasks: Task[] = [
  { id: '1', title: 'شستشوی صورت با ژل ملایم', type: 'skin', completed: false, time: 'morning' },
  { id: '2', title: 'اسپری آفتاب', type: 'skin', completed: false, time: 'morning' },
  { id: '3', title: 'مرطوب‌کننده صورت', type: 'skin', completed: false, time: 'morning' },
  { id: '4', title: 'شامپو با فرمول ملایم', type: 'hair', completed: false, time: 'morning' },
  { id: '5', title: 'پاک‌کننده آرایش', type: 'skin', completed: false, time: 'evening' },
  { id: '6', title: 'سرم ویتامین C', type: 'skin', completed: false, time: 'evening' },
  { id: '7', title: 'کرم شب مغذی', type: 'skin', completed: false, time: 'evening' },
  { id: '8', title: 'نرم‌کننده مو', type: 'hair', completed: false, time: 'evening' },
];

export const Dashboard: React.FC<DashboardProps> = ({ profile }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAIChat, setShowAIChat] = useState(false);

  const addCustomTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      id: Date.now().toString(),
      completed: false,
      ...newTask,
    };
    setTasks(prev => [...prev, task]);
  };

  const toggleTask = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  const morningTasks = tasks.filter(task => task.time === 'morning');
  const eveningTasks = tasks.filter(task => task.time === 'evening');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AvatarDisplay 
                gender={profile.gender} 
                name={profile.name} 
                size="lg" 
              />
              <div>
                <h1 className="text-3xl font-bold">سلام {profile.name}! 👋</h1>
                <p className="text-xl opacity-90 mt-2">آماده‌ای برای مراقبت از خودت؟</p>
              </div>
            </div>
            <Button
              onClick={() => setShowAIChat(true)}
              variant="secondary"
              size="lg"
              className="shadow-glow"
            >
              💬 مشاوره با شایلی
            </Button>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-medium">پیشرفت امروز</span>
              <span className="text-lg font-bold">{completedTasks} از {tasks.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-3 bg-white/20" />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <div className="lg:col-span-1">
            <Card className="gradient-card shadow-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <AvatarDisplay 
                    gender={profile.gender} 
                    name={profile.name} 
                    size="md" 
                  />
                  <CardTitle>پروفایل شما</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">نوع پوست</h3>
                  <Badge variant="outline" className="mt-1">{profile.skinType}</Badge>
                </div>
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">نوع مو</h3>
                  <Badge variant="outline" className="mt-1">{profile.hairType}</Badge>
                </div>
                {profile.skinConcerns.length > 0 && (
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-2">نگرانی‌های پوستی</h3>
                    <div className="flex flex-wrap gap-1">
                      {profile.skinConcerns.slice(0, 3).map((concern) => (
                        <Badge key={concern} variant="secondary" className="text-xs">
                          {concern}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Daily Tasks */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>روتین روزانه</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">روتین روزانه</h3>
                  <AddRoutineItem onAdd={addCustomTask} />
                </div>
                <Tabs defaultValue="morning" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="morning">صبح</TabsTrigger>
                    <TabsTrigger value="evening">شب</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="morning" className="space-y-3 mt-4">
                    {morningTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center space-x-3 space-x-reverse p-4 rounded-lg border transition-smooth cursor-pointer ${
                          task.completed
                            ? 'bg-primary/10 border-primary/30'
                            : 'bg-card hover:bg-muted/50'
                        }`}
                        onClick={() => toggleTask(task.id)}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            task.completed
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-muted-foreground'
                          }`}
                        >
                          {task.completed && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </p>
                          <Badge variant={task.type === 'skin' ? 'default' : 'secondary'} className="text-xs mt-1">
                            {task.type === 'skin' ? 'پوست' : 'مو'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="evening" className="space-y-3 mt-4">
                    {eveningTasks.map((task) => (
                      <div
                        key={task.id}
                        className={`flex items-center space-x-3 space-x-reverse p-4 rounded-lg border transition-smooth cursor-pointer ${
                          task.completed
                            ? 'bg-primary/10 border-primary/30'
                            : 'bg-card hover:bg-muted/50'
                        }`}
                        onClick={() => toggleTask(task.id)}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            task.completed
                              ? 'bg-primary border-primary text-primary-foreground'
                              : 'border-muted-foreground'
                          }`}
                        >
                          {task.completed && (
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </p>
                          <Badge variant={task.type === 'skin' ? 'default' : 'secondary'} className="text-xs mt-1">
                            {task.type === 'skin' ? 'پوست' : 'مو'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* AI Chat Component */}
      <AIChat 
        isOpen={showAIChat} 
        onClose={() => setShowAIChat(false)} 
      />
    </div>
  );
};