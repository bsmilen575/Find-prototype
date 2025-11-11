import { MapPin, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export function SignUpScreen() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [locationGranted, setLocationGranted] = useState(false);
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');

  const handleLocationAccess = async () => {
    try {
      if ('permissions' in navigator) {
        const permission = await navigator.permissions.query({ name: 'geolocation' as PermissionName });
        if (permission.state === 'granted') {
          setLocationGranted(true);
          toast({
            title: "Location access granted",
            description: "You're all set to discover nearby connections!",
          });
          return;
        }
      }
    } catch (e) {
      console.log('Permissions API not available, using getCurrentPosition');
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationGranted(true);
        toast({
          title: "Location access granted",
          description: "You're all set to discover nearby connections!",
        });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          toast({
            title: "Location access denied",
            description: "Please enable location access to use Find.",
            variant: "destructive",
          });
        } else {
          setLocationGranted(true);
          toast({
            title: "Location permission granted",
            description: "Network location lookup failed, but you can continue.",
          });
        }
      },
      { timeout: 5000 }
    );
  };

  const createProfileMutation = useMutation({
    mutationFn: async (data: { name: string; interests: string[]; latitude?: number; longitude?: number }) => {
      const response = await apiRequest('POST', '/api/profiles', {
        name: data.name,
        interests: data.interests,
        latitude: data.latitude,
        longitude: data.longitude,
        discoverable: true,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/profile/me'] });
      toast({
        title: "Profile created!",
        description: "Welcome to Find. Let's discover nearby connections.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating profile",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleConnect = async () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!interests.trim()) {
      toast({
        title: "Interests required",
        description: "Please enter at least 5 interests, one per line.",
        variant: "destructive",
      });
      return;
    }

    const interestArray = interests
      .split('\n')
      .map(i => i.trim())
      .filter(i => i.length > 0);

    if (interestArray.length < 5) {
      toast({
        title: "More interests needed",
        description: "Please enter at least 5 interests, one per line.",
        variant: "destructive",
      });
      return;
    }

    if (!locationGranted) {
      toast({
        title: "Location required",
        description: "Please allow location access first.",
        variant: "destructive",
      });
      return;
    }

    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        createProfileMutation.mutate({
          name: name.trim(),
          interests: interestArray.slice(0, 5),
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        // If location fails, create without coordinates
        createProfileMutation.mutate({
          name: name.trim(),
          interests: interestArray.slice(0, 5),
        });
      }
    );
  };

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: '#f5f3f0' }} data-testid="signup-screen">
      <div className="h-11" />
      
      <div className="flex-1 flex flex-col px-6 py-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2" data-testid="heading-welcome">Welcome to Find</h2>
          <p className="text-gray-600">Use your data, on your terms. Get ready to unlock serendipity.</p>
        </div>
        
        <div className="mb-5">
          <label className="block text-gray-700 mb-2">
            Your Name <span className="text-red-500">*</span>
          </label>
          <Input 
            type="text" 
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-xl border-2 border-black"
            data-testid="input-name"
            required
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-gray-900 text-2xl mb-3" data-testid="heading-pod">
            Set up your Pod
          </h3>
          <p className="text-gray-600 text-base mb-4">Connect your accounts to build your private interest graph</p>
          
          <div className="grid grid-cols-3 gap-3">
            <Button 
              variant="outline"
              className="h-16 rounded-2xl border-2 border-gray-300 bg-white p-0"
              data-testid="button-facebook"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-16 rounded-2xl border-2 border-gray-300 bg-white p-0"
              data-testid="button-twitter"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#000000">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-16 rounded-2xl border-2 border-gray-300 bg-white p-0"
              data-testid="button-instagram"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                <defs>
                  <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#FD5949' }} />
                    <stop offset="50%" style={{ stopColor: '#D6249F' }} />
                    <stop offset="100%" style={{ stopColor: '#285AEB' }} />
                  </linearGradient>
                </defs>
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm-.2 2C5.6 4 4 5.6 4 7.6v8.8c0 2 1.6 3.6 3.6 3.6h8.8c2 0 3.6-1.6 3.6-3.6V7.6C20 5.6 18.4 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-16 rounded-2xl border-2 border-gray-300 bg-white p-0"
              data-testid="button-google"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-16 rounded-2xl border-2 border-gray-300 bg-white p-0"
              data-testid="button-gmail"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                <path fill="#34A853" d="M0 5.457v.727l12 9 12-9v-.727c0-.399-.094-.772-.24-1.118L12 9.548l-11.76-5.21c-.146.346-.24.72-.24 1.118z"/>
                <path fill="#FBBC05" d="M0 6.184v13.182c0 .904.732 1.636 1.636 1.636h3.819V11.73z"/>
                <path fill="#EA4335" d="M24 6.184v13.182a1.636 1.636 0 0 1-1.636 1.636h-3.819V11.73z"/>
              </svg>
            </Button>
            <Button 
              variant="outline"
              className="h-16 rounded-2xl border-2 border-gray-300 bg-white p-0"
              data-testid="button-tiktok"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="#000000">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-gray-600 text-base mb-4" data-testid="heading-upload">
            Upload your files, docs, and notes
          </h3>
          
          <button 
            className="w-full h-32 rounded-2xl border-2 border-dashed border-gray-400 bg-transparent flex flex-col items-center justify-center gap-2 hover-elevate"
            data-testid="button-upload"
          >
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="text-gray-500 text-base">Tap to upload</span>
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 mb-3">
            Your Interests <span className="text-red-500">*</span>
          </label>
          <p className="text-gray-500 text-sm mb-3 leading-relaxed">
            Enter at least 5 interests, one per line. These help Find connect you with people nearby who share your curiosities.
          </p>
          
          <Textarea 
            placeholder={"Sustainable architecture\nAI ethics\nJazz fusion\nUrban gardening\nFilm photography"}
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="min-h-[180px] rounded-xl border-2 border-black resize-none"
            data-testid="textarea-interests"
            required
          />
        </div>
        
        <div className="mt-auto space-y-3">
          <Button 
            variant="outline"
            className="w-full h-14 rounded-2xl border-2 border-gray-900 text-gray-900"
            onClick={handleLocationAccess}
            data-testid="button-location"
          >
            <MapPin className="w-5 h-5 mr-2" />
            {locationGranted ? 'Location access granted ✓' : 'Allow location access'}
          </Button>
          
          <Button 
            className="w-full h-14 rounded-2xl bg-black text-white"
            onClick={handleConnect}
            disabled={createProfileMutation.isPending}
            data-testid="button-connect"
          >
            {createProfileMutation.isPending ? 'Creating your profile...' : "I'm ready to connect"}
          </Button>
        </div>
      </div>
    </div>
  );
}
