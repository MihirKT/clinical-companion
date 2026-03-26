import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, type UserRole } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [userName, setUserName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('full');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!userName.trim()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate login processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    login(userName, selectedRole);
    setIsLoading(false);
    navigate('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userName.trim()) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-success/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
              <LogIn className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Clinical Companion</h1>
          <p className="text-muted-foreground text-lg">AI-Powered Clinical Documentation</p>
        </div>

        {/* Main Container */}
        <Card className="clinical-card shadow-xl">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>Sign in to get started</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-6">
              {/* User Name Input */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-base">Your Name</Label>
                <Input
                  id="username"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="h-12 text-base"
                />
              </div>

              {/* Login Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Select Your Access Level</Label>
                <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                  <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted">
                    <TabsTrigger value="full" className="py-3 text-base">
                      <Zap className="w-4 h-4 mr-2" />
                      Full Access
                    </TabsTrigger>
                    <TabsTrigger value="ai-only" className="py-3 text-base">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Only
                    </TabsTrigger>
                  </TabsList>

                  {/* Full Access */}
                  <TabsContent value="full" className="space-y-4 mt-4">
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-primary" />
                        Full Access Features
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>Live transcription and audio capture</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>Transcript review and corrections</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>Clinical summary generation (SOAP, Discharge, etc.)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>Patient hub and demographics management</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>Patient linking and record linking</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>Complete clinical workflows</span>
                        </li>
                      </ul>
                    </div>
                  </TabsContent>

                  {/* AI Only */}
                  <TabsContent value="ai-only" className="space-y-4 mt-4">
                    <div className="bg-success/5 border border-success/20 rounded-lg p-6">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-success" />
                        AI Only Features
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span>AI-powered summary generation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span>Edit summaries with AI assistance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span>Multiple summary formats</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span>Auto-generated titles and formatting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-success mt-1">✓</span>
                          <span>Optional patient linking</span>
                        </li>
                      </ul>
                      <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Note:</p>
                        <p>Patient Hub and full workflow features are not available in AI Only mode. Patient linking is optional.</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Login Button */}
              <Button
                onClick={handleLogin}
                disabled={!userName.trim() || isLoading}
                variant="clinical"
                size="lg"
                className="w-full h-12 text-base gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Login & Continue
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Demo Environment • All features available for testing</p>
        </div>
      </div>
    </div>
  );
}
