
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7fd0e28d726b473fb169519aafae82f2',
  appName: 'AskZen Pro',
  webDir: 'dist',
  server: {
    url: 'https://7fd0e28d-726b-473f-b169-519aafae82f2.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#4F46E5',
      showSpinner: false
    }
  }
};

export default config;
