
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface AdPlacementProps {
  position: 'header-banner' | 'sidebar' | 'content-break' | 'footer' | 'mobile-interstitial';
  className?: string;
  showDemo?: boolean;
}

const AdPlacement: React.FC<AdPlacementProps> = ({ 
  position, 
  className = '', 
  showDemo = true 
}) => {
  const adConfigs = {
    'header-banner': {
      height: 'h-24',
      width: 'w-full',
      title: 'Header Banner Ad',
      description: '728x90 Leaderboard'
    },
    'sidebar': {
      height: 'h-60',
      width: 'w-full',
      title: 'Sidebar Ad',
      description: '300x250 Medium Rectangle'
    },
    'content-break': {
      height: 'h-32',
      width: 'w-full',
      title: 'Content Break Ad',
      description: '728x90 or 320x100 Mobile'
    },
    'footer': {
      height: 'h-20',
      width: 'w-full',
      title: 'Footer Banner Ad',
      description: '728x90 Leaderboard'
    },
    'mobile-interstitial': {
      height: 'h-96',
      width: 'w-full max-w-sm',
      title: 'Mobile Interstitial',
      description: '320x480 Full Screen'
    }
  };

  const config = adConfigs[position];

  if (!showDemo) {
    // Return empty div for production - replace with actual ad code
    return (
      <div 
        className={`ad-placement ad-${position} ${config.height} ${config.width} ${className}`}
        id={`ad-${position}`}
      >
        {/* Replace this comment with actual ad network code (Google AdSense, etc.) */}
      </div>
    );
  }

  return (
    <Card className={`${config.height} ${config.width} ${className} flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 relative overflow-hidden`}>
      <div className="text-center p-4">
        <Badge variant="secondary" className="mb-2">
          {config.title}
        </Badge>
        <p className="text-sm text-muted-foreground">{config.description}</p>
        <p className="text-xs text-muted-foreground mt-1">Ad Space Available</p>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        className="absolute top-2 right-2 h-6 w-6 p-0"
        onClick={() => {/* Handle ad close */}}
      >
        <X className="h-3 w-3" />
      </Button>
    </Card>
  );
};

export default AdPlacement;
