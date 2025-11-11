import { MapPin, Upload, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export function SignUpScreen() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [locationGranted, setLocationGranted] = useState(false);
  const [name, setName] = useState('');
  const [manualInterestsText, setManualInterestsText] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedInterests, setExtractedInterests] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const parseManualInterests = (text: string): string[] => {
    if (!text.trim()) return [];
    
    return text
      .split(/[\n,]+/)
      .map(item => item.trim())
      .filter(item => item.length > 0)
      .slice(0, 30);
  };

  const getMergedInterests = (): string[] => {
    const manual = parseManualInterests(manualInterestsText);
    const combined = [...manual, ...extractedInterests];
    
    const seen = new Set<string>();
    const deduped = combined.filter(interest => {
      const lower = interest.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    });
    
    return deduped.slice(0, 15);
  };

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.includes('text') && !file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a text file (.txt or .md)",
        variant: "destructive",
      });
      return;
    }

    setUploadedFile(file);
    setIsAnalyzing(true);

    try {
      const text = await file.text();
      const truncatedText = text.slice(0, 8000);

      const response = await apiRequest('POST', '/api/analyze-document', {
        text: truncatedText,
      });

      const result = await response.json();
      
      if (result.interests && result.interests.length > 0) {
        setExtractedInterests(result.interests);
        toast({
          title: "Document analyzed!",
          description: `Extracted ${result.interests.length} interests from your document.`,
        });
      } else {
        toast({
          title: "Analysis complete",
          description: "Couldn't extract enough interests. Try a different document or enter manually.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Analysis failed",
        description: error.message || "Please try again or enter interests manually.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleConnect = async () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to continue.",
        variant: "destructive",
      });
      return;
    }

    const mergedInterests = getMergedInterests();
    
    if (mergedInterests.length < 5) {
      toast({
        title: "Interests required",
        description: "Please enter at least 5 interests (type manually or upload a document).",
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

    // Get current location with timeout
    const timeoutId = setTimeout(() => {
      // Timeout fallback - create without coordinates
      createProfileMutation.mutate({
        name: name.trim(),
        interests: mergedInterests,
      });
    }, 3000);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        createProfileMutation.mutate({
          name: name.trim(),
          interests: mergedInterests,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        clearTimeout(timeoutId);
        // If location fails, create without coordinates
        createProfileMutation.mutate({
          name: name.trim(),
          interests: mergedInterests,
        });
      },
      { timeout: 2000 }
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
          <h3 className="text-gray-700 text-base mb-2" data-testid="heading-upload">
            Upload your files, docs, and notes <span className="text-red-500">*</span>
          </h3>
          <p className="text-gray-500 text-sm mb-3">
            Upload a text file to extract your interests. Text is analyzed via OpenAI's API for topic extraction. Data is not stored or shared.
          </p>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt,.md,text/*"
            onChange={handleFileUpload}
            className="hidden"
            data-testid="input-file"
          />
          
          <button 
            className="w-full h-32 rounded-2xl border-2 border-dashed border-gray-400 bg-transparent flex flex-col items-center justify-center gap-2 hover-elevate"
            onClick={() => fileInputRef.current?.click()}
            disabled={isAnalyzing}
            data-testid="button-upload"
            type="button"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
                <span className="text-gray-600 text-base">Analyzing your document...</span>
              </>
            ) : uploadedFile ? (
              <>
                <FileText className="w-8 h-8 text-green-600" />
                <span className="text-gray-700 text-base font-medium">{uploadedFile.name}</span>
                <span className="text-gray-500 text-sm">Tap to upload different file</span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-gray-500 text-base">Tap to upload</span>
              </>
            )}
          </button>
          
        </div>
        
        <div className="mb-6">
          <h3 className="text-gray-700 text-base mb-2" data-testid="heading-talk-to-find">
            Talk to Find <span className="text-red-500">*</span>
          </h3>
          <p className="text-gray-500 text-sm mb-3">
            Tell Find about whatever is important to you - niche interests, things you're excited about, questions, anything you need.<br />
            Tip: the more detail you give, the better your connections will be.
          </p>
          <Textarea
            placeholder=""
            value={manualInterestsText}
            onChange={(e) => setManualInterestsText(e.target.value)}
            className="min-h-32 rounded-xl border-2 border-gray-300 resize-none"
            data-testid="textarea-interests"
          />
          {manualInterestsText.trim() && (
            <p className="text-gray-500 text-xs mt-2">
              {parseManualInterests(manualInterestsText).length} interests entered
            </p>
          )}
        </div>
        
        {(extractedInterests.length > 0 || manualInterestsText.trim()) && (
          <div className="mb-6 p-4 rounded-xl bg-white border border-gray-200" data-testid="extracted-interests">
            <p className="text-gray-700 text-sm font-medium mb-2">
              Your interests ({getMergedInterests().length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {getMergedInterests().map((interest, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  data-testid={`interest-${idx}`}
                >
                  {interest}
                </span>
              ))}
            </div>
            {getMergedInterests().length >= 15 && (
              <p className="text-orange-600 text-xs mt-2">
                Maximum of 15 interests reached
              </p>
            )}
          </div>
        )}
        
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
