import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function SignUpScreen() {
  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }} data-testid="signup-screen">
      <div className="h-11" />
      
      <div className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2" data-testid="heading-welcome">Welcome to Find</h2>
          <p className="text-gray-600">Use your data, on your terms. Get ready to unlock serendipity.</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-gray-900 mb-3" data-testid="heading-pod">Set up your Pod</h3>
          <p className="text-gray-500 text-sm mb-4">Connect your accounts to build your private interest graph</p>
          
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline"
              className="h-9 rounded-lg border-gray-300 bg-white p-0"
              data-testid="button-facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-9 rounded-lg border-gray-300 bg-white p-0"
              data-testid="button-twitter"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-9 rounded-lg border-gray-300 bg-white p-0"
              data-testid="button-instagram"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#FD5949' }} />
                    <stop offset="50%" style={{ stopColor: '#D6249F' }} />
                    <stop offset="100%" style={{ stopColor: '#285AEB' }} />
                  </linearGradient>
                </defs>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-9 rounded-lg border-gray-300 bg-white p-0"
              data-testid="button-google"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="mb-5">
          <label className="block text-gray-700 mb-2">Your Name</label>
          <Input 
            type="text" 
            placeholder="Enter your name"
            className="h-12 rounded-xl border-2 border-black"
            data-testid="input-name"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-3">Talk to Find</label>
          <p className="text-gray-500 text-sm mb-3 leading-relaxed">
            Tell Find about whatever is important to you - niche interests, things you're excited about, questions, anything you need.
            <br />
            <span className="font-semibold">Tip:</span> the more detail you give, the better your connections will be.
          </p>
          
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-center gap-1 pointer-events-none">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400" />
              <span className="text-gray-400">...</span>
            </div>
            <Textarea 
              placeholder=""
              className="min-h-[180px] rounded-xl border-2 border-black resize-none pl-11"
              data-testid="textarea-interests"
            />
          </div>
        </div>
        
        <div className="mt-auto space-y-3">
          <Button 
            variant="outline"
            className="w-full h-14 rounded-2xl border-2 border-gray-900 text-gray-900"
            data-testid="button-location"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Allow location access
          </Button>
          
          <Button 
            className="w-full h-14 rounded-2xl bg-black text-white"
            data-testid="button-connect"
          >
            I'm ready to connect
          </Button>
        </div>
      </div>
    </div>
  );
}
