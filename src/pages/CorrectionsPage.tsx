import React, { useState } from 'react';
import { PenTool, Plus, Search, Download, Upload, Trash2, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { mockCorrections } from '@/data/mockData';
import { CorrectionEntry } from '@/types/clinical';
import { useToast } from '@/hooks/use-toast';

export function CorrectionsPage() {
  const { toast } = useToast();
  const [corrections, setCorrections] = useState<CorrectionEntry[]>(mockCorrections);
  const [searchQuery, setSearchQuery] = useState('');
  const [newOriginal, setNewOriginal] = useState('');
  const [newCorrected, setNewCorrected] = useState('');

  const filteredCorrections = corrections.filter(c =>
    c.original.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.corrected.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCorrection = () => {
    if (!newOriginal.trim() || !newCorrected.trim()) {
      toast({
        title: 'Error',
        description: 'Both fields are required.',
        variant: 'destructive',
      });
      return;
    }

    const newEntry: CorrectionEntry = {
      id: `c${Date.now()}`,
      original: newOriginal.trim(),
      corrected: newCorrected.trim(),
      createdAt: new Date(),
    };

    setCorrections([newEntry, ...corrections]);
    setNewOriginal('');
    setNewCorrected('');

    toast({
      title: 'Correction Added',
      description: `"${newOriginal}" will now be corrected to "${newCorrected}"`,
    });
  };

  const handleDelete = (id: string) => {
    setCorrections(corrections.filter(c => c.id !== id));
    toast({
      title: 'Correction Deleted',
      description: 'The correction has been removed from the dictionary.',
    });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Corrections Dictionary</h2>
        <p className="text-muted-foreground mt-1">Manage transcription corrections and replacements</p>
      </div>

      {/* Add New Correction */}
      <Card className="clinical-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">Add New Correction</CardTitle>
              <CardDescription>Create a new transcription correction rule</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="original">Original Word/Phrase</Label>
              <Input
                id="original"
                placeholder="e.g., metforman"
                value={newOriginal}
                onChange={(e) => setNewOriginal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corrected">Corrected Word/Phrase</Label>
              <Input
                id="corrected"
                placeholder="e.g., Metformin"
                value={newCorrected}
                onChange={(e) => setNewCorrected(e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={handleAddCorrection}
            variant="clinical"
            className="mt-4 gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Correction
          </Button>
        </CardContent>
      </Card>

      {/* Corrections List */}
      <Card className="clinical-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <PenTool className="w-5 h-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-lg">Saved Corrections</CardTitle>
                <CardDescription>{corrections.length} corrections in dictionary</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Upload className="w-4 h-4" />
                Import
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search corrections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Corrections Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
              <span>Original</span>
              <span>Corrected</span>
              <span>Added</span>
              <span className="sr-only">Actions</span>
            </div>
            <div className="divide-y divide-border">
              {filteredCorrections.map(correction => (
                <div
                  key={correction.id}
                  className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 p-3 items-center hover:bg-muted/30 transition-colors"
                >
                  <span className="text-sm font-mono text-muted-foreground line-through">
                    {correction.original}
                  </span>
                  <span className="text-sm font-mono text-foreground font-medium">
                    {correction.corrected}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(correction.createdAt)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon-sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleDelete(correction.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredCorrections.length === 0 && (
            <div className="text-center py-8">
              <PenTool className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No corrections match your search' : 'No corrections added yet'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
