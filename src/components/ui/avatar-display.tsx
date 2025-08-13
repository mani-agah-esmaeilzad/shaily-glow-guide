import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AvatarDisplayProps {
  gender: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ 
  gender, 
  name, 
  size = 'md',
  className = '' 
}) => {
  const getAvatarUrl = (gender: string) => {
    // Using UI Avatars API with Persian-friendly settings
    const encodedName = encodeURIComponent(name || 'User');
    const colors = gender === 'female' ? '8B5CF6,F3E8FF' : '3B82F6,DBEAFE';
    
    return `https://ui-avatars.com/api/?name=${encodedName}&background=${colors.split(',')[1]}&color=${colors.split(',')[0].replace('#', '')}&bold=true&format=svg&rounded=true&size=200`;
  };

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
    xl: 'h-24 w-24'
  };

  const getInitials = () => {
    return name ? name.charAt(0).toUpperCase() : gender === 'female' ? '👩' : '👨';
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage 
        src={getAvatarUrl(gender)} 
        alt={`${name} avatar`}
      />
      <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
        {getInitials()}
      </AvatarFallback>
    </Avatar>
  );
};