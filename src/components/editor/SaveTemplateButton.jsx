import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Star, Download, FileJson, Sparkles, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const industries = [
  { value: "technology", label: "Technology" },
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "creative", label: "Creative" },
  { value: "business", label: "Business" },
  { value: "engineering", label: "Engineering" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "legal", label: "Legal" },
  { value: "other", label: "Other" }
];

const styles = [
  { value: "minimal", label: "Minimal" },
  { value: "professional", label: "Professional" },
  { value: "creative", label: "Creative" },
  { value: "modern", label: "Modern" },
  { value: "classic", label: "Classic" },
  { value: "bold", label: "Bold" },
  { value: "elegant", label: "Elegant" },
  { value: "compact", label: "Compact" }
];

export default function SaveTemplateButton({ resume }) {
  const [showDialog, setShowDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("technology");
  const [selectedStyle, setSelectedStyle] = useState("modern");
  const [isPublic, setIsPublic] = useState(false);
  const [saveOption, setSaveOption] = useState("customization");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    setIsSaving(true);
    try {
      const templateData = {
        name: templateName.trim(),
        description: templateDescription.trim(),
        base_template: resume.template,
        customization: resume.customization,
        industry: selectedIndustry,
        style: selectedStyle,
        is_public: isPublic,
        usage_count: 0,
        tags: [selectedIndustry, selectedStyle, saveOption]
      };

      // Include different data based on save option
      if (saveOption === "full") {
        templateData.section_styles = resume.section_styles || {};
        templateData.placeholder_data = {
          personal_info: resume.personal_info || {},
          experience: resume.experience || [],
          education: resume.education || [],
          skills: resume.skills || [],
          projects: resume.projects || [],
          certificates: resume.certificates || [],
          languages: resume.languages || [],
          interests: resume.interests || [],
          awards: resume.awards || [],
          publications: resume.publications || [],
          references: resume.references || []
        };
      } else if (saveOption === "layout") {
        templateData.section_styles = resume.section_styles || {};
        templateData.placeholder_data = {
          sections_order: resume.sections_order || [],
          enabled_sections: resume.enabled_sections || []
        };
      }

      await base44.entities.CustomTemplate.create(templateData);

      alert("✓ Template saved successfully! You can now reuse it from My Templates.");
      setShowDialog(false);
      setTemplateName("");
      setTemplateDescription("");
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template. Please try again.");
    }
    setIsSaving(false);
  };

  const exportTemplate = () => {
    const exportData = {
      name: templateName.trim() || "Custom Template",
      description: templateDescription.trim(),
      base_template: resume.template,
      customization: resume.customization,
      section_styles: resume.section_styles || {},
      industry: selectedIndustry,
      style: selectedStyle,
      tags: [selectedIndustry, selectedStyle],
      version: "1.0",
      exported_at: new Date().toISOString()
    };

    if (saveOption === "full") {
      exportData.placeholder_data = {
        personal_info: resume.personal_info || {},
        experience: resume.experience || [],
        education: resume.education || [],
        skills: resume.skills || [],
        projects: resume.projects || []
      };
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(templateName || 'template').replace(/\s+/g, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert("Template exported successfully!");
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowDialog(true)}
        className="border-gray-300 hover:bg-gray-50 h-9"
      >
        <Star className="w-4 h-4 mr-2" />
        Save as Template
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              Save as Custom Template
            </DialogTitle>
            <DialogDescription>
              Save your current design as a reusable template
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="save" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="save" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Save to Library
              </TabsTrigger>
              <TabsTrigger value="export" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export File
              </TabsTrigger>
            </TabsList>

            <TabsContent value="save" className="space-y-4 mt-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">Template Name *</Label>
                <Input
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., My Tech Resume Style"
                  className="h-11"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Description</Label>
                <Textarea
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Brief description of this template"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">What to Save?</Label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSaveOption("customization")}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                      saveOption === "customization" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">Design Only</p>
                        <p className="text-xs text-gray-600">
                          Save colors, fonts, spacing, and styling preferences
                        </p>
                      </div>
                      {saveOption === "customization" && (
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSaveOption("layout")}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                      saveOption === "layout" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">Design + Layout</p>
                        <p className="text-xs text-gray-600">
                          Include section order and layout structure
                        </p>
                      </div>
                      {saveOption === "layout" && (
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>

                  <button
                    onClick={() => setSaveOption("full")}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                      saveOption === "full" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-sm mb-1">Complete Template</p>
                        <p className="text-xs text-gray-600">
                          Save everything including placeholder content
                        </p>
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs mt-2">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Recommended
                        </Badge>
                      </div>
                      {saveOption === "full" && (
                        <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Industry</Label>
                  <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(ind => (
                        <SelectItem key={ind.value} value={ind.value}>
                          {ind.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Style</Label>
                  <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {styles.map(style => (
                        <SelectItem key={style.value} value={style.value}>
                          {style.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Share with Community
                    </p>
                    <p className="text-xs text-gray-600">
                      Make this template public so others can use it (you can change this later)
                    </p>
                  </div>
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs text-blue-800">
                  💡 <strong>Tip:</strong> Your template will be saved to My Templates where you can edit, duplicate, export, or delete it anytime.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !templateName.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Template
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="export" className="space-y-4 mt-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileJson className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">Export Template as JSON</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      Download your template as a JSON file to share with others, backup, or import into another account.
                    </p>
                    <ul className="space-y-1 text-sm text-gray-600 mb-4">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Share with team members
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Backup your designs
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        Import on any device
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Template Name (for export)</Label>
                <Input
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="e.g., My Tech Resume Style"
                  className="h-11"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">Export Options</Label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSaveOption("customization")}
                    className={`w-full text-left p-3 border-2 rounded-lg transition-all ${
                      saveOption === "customization" 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-sm">Design Only</p>
                    <p className="text-xs text-gray-600">Colors, fonts, and styling</p>
                  </button>

                  <button
                    onClick={() => setSaveOption("full")}
                    className={`w-full text-left p-3 border-2 rounded-lg transition-all ${
                      saveOption === "full" 
                        ? "border-purple-500 bg-purple-50" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-sm">Complete Template</p>
                    <p className="text-xs text-gray-600">Everything including content</p>
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDialog(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={exportTemplate}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Template
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}