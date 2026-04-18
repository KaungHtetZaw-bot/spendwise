import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.spendwise.app',
  appName: 'spendwise',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      backgroundColor: '#0f172a',
      overlaysWebView: false, // UI ကို Status Bar အောက်ကို ပို့ဖို့ false ထားရပါမယ်
      style: 'DARK',
    },
  },
};

export default config;
