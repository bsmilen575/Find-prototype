import { Bell, ChevronRight, Eye, Lock, MapPin, Share2, Sliders } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export function SettingsScreen() {
  return (
    <div className="w-full h-full bg-gray-50 overflow-auto" data-testid="settings-screen">
      <div className="h-11" />
      
      <div className="px-6 pt-6 pb-4 bg-white">
        <h2 className="text-gray-900 mb-2" data-testid="heading-settings">Settings</h2>
        <p className="text-gray-500">Manage your privacy and preferences</p>
      </div>
      
      <div className="px-6 py-6">
        <h3 className="text-gray-900 mb-4" data-testid="heading-discovery">Discovery Preferences</h3>
        
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-gray-900">Visible to Others</p>
                  <p className="text-gray-500 text-sm">Show my profile to matches</p>
                </div>
              </div>
              <Switch defaultChecked data-testid="switch-visible" />
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">Location Services</p>
                  <p className="text-gray-500 text-sm">Find people nearby</p>
                </div>
              </div>
              <Switch defaultChecked data-testid="switch-location" />
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-gray-900">Push Notifications</p>
                  <p className="text-gray-500 text-sm">Get notified about matches</p>
                </div>
              </div>
              <Switch defaultChecked data-testid="switch-notifications" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4">
        <h3 className="text-gray-900 mb-4" data-testid="heading-sources">Interest Sources</h3>
        
        <div className="bg-white rounded-3xl border border-gray-100 p-4">
          <p className="text-gray-600 text-sm mb-4">
            Find uses your connected accounts to understand your interests and find better matches
          </p>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors" data-testid="button-facebook">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white text-sm">
                  f
                </div>
                <div className="text-left">
                  <p className="text-gray-900 text-sm">Facebook</p>
                  <p className="text-gray-500 text-xs">Connected</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors" data-testid="button-instagram">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm">
                  ig
                </div>
                <div className="text-left">
                  <p className="text-gray-900 text-sm">Instagram</p>
                  <p className="text-gray-500 text-xs">Connected</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </button>
            
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors" data-testid="button-twitter">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white text-sm">
                  𝕏
                </div>
                <div className="text-left">
                  <p className="text-gray-900 text-sm">Twitter</p>
                  <p className="text-gray-500 text-xs">Not connected</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4">
        <h3 className="text-gray-900 mb-4" data-testid="heading-privacy">Privacy & Security</h3>
        
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100" data-testid="button-data-privacy">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Lock className="w-5 h-5 text-gray-600" />
            </div>
            <span className="flex-1 text-left text-gray-900">Data & Privacy</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors border-b border-gray-100" data-testid="button-match-preferences">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-gray-600" />
            </div>
            <span className="flex-1 text-left text-gray-900">Match Preferences</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors" data-testid="button-data-sources">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-gray-600" />
            </div>
            <span className="flex-1 text-left text-gray-900">Data Sources</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="h-8" />
    </div>
  );
}
