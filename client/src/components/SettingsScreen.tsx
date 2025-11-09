import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { platformConnectors, PlatformConnector } from '@shared/synthetic-data';
import { Github, Music, Video, Twitter, FileText, Book, Mail, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiHuggingface, SiSpotify, SiYoutube } from 'react-icons/si';

const iconMap: Record<string, any> = {
  'github': Github,
  'huggingface': SiHuggingface,
  'spotify': SiSpotify,
  'youtube': SiYoutube,
  'twitter': Twitter,
  'file-text': FileText,
  'book': Book,
  'mail': Mail,
};

export function SettingsScreen() {
  const [connectors, setConnectors] = useState<PlatformConnector[]>(platformConnectors);
  const [selectedTab, setSelectedTab] = useState('import');
  
  const connectPlatform = (id: string) => {
    setConnectors(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'pending' as const } : c
    ));
    
    setTimeout(() => {
      setConnectors(prev => prev.map(c => 
        c.id === id ? { 
          ...c, 
          status: 'connected' as const, 
          lastSync: new Date().toISOString() 
        } : c
      ));
    }, 2000);
  };
  
  const groupedConnectors = connectors.reduce((acc, connector) => {
    if (!acc[connector.domain]) {
      acc[connector.domain] = [];
    }
    acc[connector.domain].push(connector);
    return acc;
  }, {} as Record<string, PlatformConnector[]>);
  
  return (
    <div className="flex h-full" style={{ backgroundColor: '#f2ede8' }} data-testid="settings-screen">
      <div className="w-64 border-r p-6" style={{ borderColor: '#d4cec4' }}>
        <h2 
          className="mb-6" 
          style={{ 
            fontFamily: 'Georgia, serif', 
            fontSize: '1.5rem',
            color: '#1a1a1a'
          }}
        >
          Settings
        </h2>
        
        <div className="space-y-2">
          <button
            onClick={() => setSelectedTab('import')}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedTab === 'import' 
                ? 'bg-black/5' 
                : 'hover:bg-black/5'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
            data-testid="tab-import"
          >
            Import Data
          </button>
          <button
            onClick={() => setSelectedTab('privacy')}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedTab === 'privacy' 
                ? 'bg-black/5' 
                : 'hover:bg-black/5'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
            data-testid="tab-privacy"
          >
            Privacy
          </button>
          <button
            onClick={() => setSelectedTab('profile')}
            className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
              selectedTab === 'profile' 
                ? 'bg-black/5' 
                : 'hover:bg-black/5'
            }`}
            style={{ fontFamily: 'Georgia, serif' }}
            data-testid="tab-profile"
          >
            Profile
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        {selectedTab === 'import' && (
          <div className="max-w-6xl mx-auto p-8">
            <div className="mb-8">
              <h1 
                className="mb-2" 
                style={{ 
                  fontFamily: 'Georgia, serif', 
                  fontSize: '2rem',
                  color: '#1a1a1a'
                }}
                data-testid="heading-import"
              >
                Import Your Digital Life
              </h1>
              <p className="text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
                Connect platforms to build your interest graph. All processing happens on-device and you can revoke access anytime.
              </p>
            </div>
            
            {Object.entries(groupedConnectors).map(([domain, domainConnectors]) => (
              <div key={domain} className="mb-8">
                <h2 
                  className="mb-4" 
                  style={{ 
                    fontFamily: 'Georgia, serif', 
                    fontSize: '1.25rem',
                    color: '#1a1a1a'
                  }}
                  data-testid={`heading-domain-${domain.toLowerCase()}`}
                >
                  {domain}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {domainConnectors.map((connector) => {
                    const IconComponent = iconMap[connector.icon];
                    
                    return (
                      <Card key={connector.id} className="hover-elevate" data-testid={`connector-card-${connector.id}`}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              {IconComponent && (
                                <div className="p-2 rounded-lg" style={{ backgroundColor: '#1a1a1a' }}>
                                  <IconComponent className="w-5 h-5 text-white" />
                                </div>
                              )}
                              <div>
                                <CardTitle style={{ fontFamily: 'Georgia, serif' }}>
                                  {connector.name}
                                </CardTitle>
                                <CardDescription style={{ fontFamily: 'Georgia, serif', fontSize: '0.875rem' }}>
                                  {connector.description}
                                </CardDescription>
                              </div>
                            </div>
                            
                            {connector.status === 'connected' && (
                              <CheckCircle2 className="w-5 h-5 text-green-600" data-testid={`status-connected-${connector.id}`} />
                            )}
                            {connector.status === 'pending' && (
                              <Loader2 className="w-5 h-5 animate-spin text-blue-600" data-testid={`status-pending-${connector.id}`} />
                            )}
                            {connector.status === 'error' && (
                              <AlertCircle className="w-5 h-5 text-red-600" data-testid={`status-error-${connector.id}`} />
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent>
                          <div className="space-y-3">
                            {connector.scopes && connector.scopes.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {connector.scopes.map(scope => (
                                  <Badge key={scope} variant="secondary" style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem' }}>
                                    {scope}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            {connector.status === 'connected' && connector.sampleInsights && (
                              <div>
                                <p className="text-sm text-gray-600 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                  Recent imports:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {connector.sampleInsights.slice(0, 3).map(insight => (
                                    <Badge key={insight} variant="outline" style={{ fontFamily: 'Georgia, serif', fontSize: '0.75rem' }}>
                                      {insight}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {connector.status === 'connected' && (
                              <div className="flex items-center justify-between text-sm text-gray-500" style={{ fontFamily: 'Georgia, serif' }}>
                                <span>Syncs {connector.syncCadence?.toLowerCase()}</span>
                                {connector.lastSync && (
                                  <span>Last: {new Date(connector.lastSync).toLocaleDateString()}</span>
                                )}
                              </div>
                            )}
                            
                            <Button
                              onClick={() => connectPlatform(connector.id)}
                              disabled={connector.status === 'pending' || connector.status === 'connected'}
                              className="w-full"
                              variant={connector.status === 'connected' ? 'outline' : 'default'}
                              style={{ 
                                fontFamily: 'Georgia, serif',
                                ...(connector.status === 'disconnected' && {
                                  backgroundColor: '#000000',
                                  color: '#ffffff'
                                })
                              }}
                              data-testid={`button-connect-${connector.id}`}
                            >
                              {connector.status === 'pending' && (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Connecting...
                                </>
                              )}
                              {connector.status === 'connected' && 'Connected'}
                              {connector.status === 'disconnected' && 'Connect'}
                              {connector.status === 'error' && 'Retry'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <Separator className="my-8" />
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold mb-2" style={{ fontFamily: 'Georgia, serif', color: '#1a1a1a' }}>
                Privacy First
              </h3>
              <p className="text-sm text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
                All data processing happens on your device. Your interest graph is computed locally using graph embeddings.
                Platform connections use read-only OAuth scopes and can be revoked at any time.
              </p>
            </div>
          </div>
        )}
        
        {selectedTab === 'privacy' && (
          <div className="max-w-4xl mx-auto p-8">
            <h1 
              className="mb-6" 
              style={{ 
                fontFamily: 'Georgia, serif', 
                fontSize: '2rem',
                color: '#1a1a1a'
              }}
              data-testid="heading-privacy"
            >
              Privacy Settings
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
              Privacy settings coming soon...
            </p>
          </div>
        )}
        
        {selectedTab === 'profile' && (
          <div className="max-w-4xl mx-auto p-8">
            <h1 
              className="mb-6" 
              style={{ 
                fontFamily: 'Georgia, serif', 
                fontSize: '2rem',
                color: '#1a1a1a'
              }}
              data-testid="heading-profile"
            >
              Profile Settings
            </h1>
            <p className="text-gray-600" style={{ fontFamily: 'Georgia, serif' }}>
              Profile settings coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
