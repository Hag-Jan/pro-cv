import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  RotateCcw, 
  Save, 
  User,
  GitBranch,
  FileText,
  Download,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function VersionHistory({ resume, onRestoreVersion, onSaveVersion }) {
  const [versions, setVersions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [versionName, setVersionName] = useState("");
  const [changeSummary, setChangeSummary] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (resume?.id) {
      loadVersions();
    }
  }, [resume?.id]);

  const loadVersions = async () => {
    if (!resume?.id) return;
    setIsLoading(true);
    try {
      const data = await base44.entities.ResumeVersion.filter(
        { resume_id: resume.id },
        '-version_number'
      );
      setVersions(data);
    } catch (error) {
      console.error("Error loading versions:", error);
    }
    setIsLoading(false);
  };

  const saveCurrentVersion = async () => {
    if (!versionName.trim()) {
      alert("Please enter a version name");
      return;
    }

    setIsSaving(true);
    try {
      const currentUser = await base44.auth.me();
      const latestVersion = versions[0];
      const versionNumber = (latestVersion?.version_number || 0) + 1;

      // Detect changed sections
      const changedSections = [];
      if (latestVersion) {
        const oldData = latestVersion.content_snapshot;
        Object.keys(resume).forEach(key => {
          if (JSON.stringify(oldData[key]) !== JSON.stringify(resume[key])) {
            changedSections.push(key);
          }
        });
      }

      await base44.entities.ResumeVersion.create({
        resume_id: resume.id,
        version_number: versionNumber,
        version_name: versionName.trim(),
        content_snapshot: resume,
        change_summary: changeSummary.trim(),
        changed_sections: changedSections,
        is_auto_save: false,
        edited_by_name: currentUser.full_name,
        edited_by_email: currentUser.email
      });

      alert("Version saved successfully!");
      setShowSaveDialog(false);
      setVersionName("");
      setChangeSummary("");
      loadVersions();
    } catch (error) {
      console.error("Error saving version:", error);
      alert("Failed to save version. Please try again.");
    }
    setIsSaving(false);
  };

  const restoreVersion = async (version) => {
    if (!confirm(`Restore to version "${version.version_name}"? Current changes will be saved automatically.`)) {
      return;
    }

    try {
      // Auto-save current state before restoring
      const currentUser = await base44.auth.me();
      const latestVersion = versions[0];
      const versionNumber = (latestVersion?.version_number || 0) + 1;

      await base44.entities.ResumeVersion.create({
        resume_id: resume.id,
        version_number: versionNumber,
        version_name: "Auto-save before restore",
        content_snapshot: resume,
        change_summary: `Before restoring to ${version.version_name}`,
        changed_sections: [],
        is_auto_save: true,
        edited_by_name: currentUser.full_name,
        edited_by_email: currentUser.email
      });

      // Restore the version
      onRestoreVersion(version.content_snapshot);
      loadVersions();
      alert("Version restored successfully!");
    } catch (error) {
      console.error("Error restoring version:", error);
      alert("Failed to restore version. Please try again.");
    }
  };

  const compareVersions = (v1, v2) => {
    if (!v1 || !v2) return [];
    const differences = [];
    const allKeys = new Set([...Object.keys(v1), ...Object.keys(v2)]);
    
    allKeys.forEach(key => {
      if (JSON.stringify(v1[key]) !== JSON.stringify(v2[key])) {
        differences.push(key);
      }
    });
    
    return differences;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <GitBranch className="w-5 h-5" />
          Version History
        </h3>
        <Button
          size="sm"
          onClick={() => setShowSaveDialog(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Version
        </Button>
      </div>

      {/* Versions List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {versions.map((version, index) => {
          const isLatest = index === 0;
          const prevVersion = versions[index + 1];
          const changes = prevVersion ? compareVersions(version.content_snapshot, prevVersion.content_snapshot) : [];

          return (
            <Card key={version.id} className={`hover:shadow-md transition-shadow ${isLatest ? 'border-purple-300 bg-purple-50' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">
                        {version.version_name}
                      </span>
                      {isLatest && (
                        <Badge className="bg-purple-500 text-white text-xs">
                          Current
                        </Badge>
                      )}
                      {version.is_auto_save && (
                        <Badge variant="outline" className="text-xs">
                          Auto-save
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {version.edited_by_name || version.edited_by_email}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(version.created_date).toLocaleString()}
                      </span>
                      <span>•</span>
                      <span className="font-medium">v{version.version_number}</span>
                    </div>

                    {version.change_summary && (
                      <p className="text-xs text-gray-600 mb-2">
                        {version.change_summary}
                      </p>
                    )}

                    {version.changed_sections && version.changed_sections.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {version.changed_sections.map((section, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedVersion(version);
                        setShowPreview(true);
                      }}
                      className="h-8 px-2"
                    >
                      <FileText className="w-4 h-4" />
                    </Button>
                    {!isLatest && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => restoreVersion(version)}
                        className="h-8 px-2 text-purple-600 hover:text-purple-700"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {versions.length === 0 && !isLoading && (
          <Card>
            <CardContent className="p-8 text-center">
              <GitBranch className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                No saved versions yet. Save your first version to track changes.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Save Version Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Save Version</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Version Name *
              </label>
              <Input
                value={versionName}
                onChange={(e) => setVersionName(e.target.value)}
                placeholder="e.g., After adding AWS experience"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Change Summary (Optional)
              </label>
              <Input
                value={changeSummary}
                onChange={(e) => setChangeSummary(e.target.value)}
                placeholder="Brief description of changes..."
              />
            </div>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800">
              💡 Versions help you track changes and restore previous states if needed
            </div>

            <Button
              onClick={saveCurrentVersion}
              disabled={isSaving || !versionName.trim()}
              className="w-full"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Save Version
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Version Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedVersion?.version_name} - v{selectedVersion?.version_number}
            </DialogTitle>
          </DialogHeader>
          {selectedVersion && (
            <div className="mt-4 space-y-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-xs text-gray-600 space-y-1">
                  <div><strong>Saved by:</strong> {selectedVersion.edited_by_name}</div>
                  <div><strong>Date:</strong> {new Date(selectedVersion.created_date).toLocaleString()}</div>
                  {selectedVersion.change_summary && (
                    <div><strong>Summary:</strong> {selectedVersion.change_summary}</div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Resume Snapshot</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Title:</strong> {selectedVersion.content_snapshot.title}
                  </div>
                  <div>
                    <strong>Experience Entries:</strong> {selectedVersion.content_snapshot.experience?.length || 0}
                  </div>
                  <div>
                    <strong>Education Entries:</strong> {selectedVersion.content_snapshot.education?.length || 0}
                  </div>
                  <div>
                    <strong>Skills:</strong> {selectedVersion.content_snapshot.skills?.length || 0}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => restoreVersion(selectedVersion)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Restore This Version
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}