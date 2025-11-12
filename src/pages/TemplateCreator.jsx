import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Plus,
  Trash2,
  GripVertical,
  Layout,
  Palette,
  Eye,
  Save,
  Sparkles,
  FileText,
  Settings,
  Grid3x3,
  Columns,
  Rows,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { createPageUrl } from "@/utils";
import ResumePreview from "../components/editor/ResumePreview";

const STEP_TITLES = {
  1: "Choose Starting Point",
  2: "Design Layout",
  3: "Customize Sections",
  4: "Preview & Save"
};

const SAMPLE_TEMPLATES = [
  { id: "minimal-clean", name: "Minimal Clean", description: "Clean and modern design", preview: "/api/placeholder/200/280" },
  { id: "bold-header", name: "Bold Header", description: "Eye-catching header design", preview: "/api/placeholder/200/280" },
  { id: "left-accent-bar", name: "Left Accent", description: "Elegant left accent bar", preview: "/api/placeholder/200/280" },
  { id: "sidebar-left-skills", name: "Skills Sidebar", description: "Skills-focused layout", preview: "/api/placeholder/200/280" },
];

const AVAILABLE_SECTIONS = [
  { id: "personal_info", name: "Personal Info", icon: "👤", required: true },
  { id: "experience", name: "Experience", icon: "💼" },
  { id: "education", name: "Education", icon: "🎓" },
  { id: "skills", name: "Skills", icon: "⚡" },
  { id: "projects", name: "Projects", icon: "💻" },
  { id: "certificates", name: "Certificates", icon: "🏆" },
  { id: "languages", name: "Languages", icon: "🌍" },
  { id: "interests", name: "Interests", icon: "❤️" },
  { id: "awards", name: "Awards", icon: "⭐" },
  { id: "publications", name: "Publications", icon: "📚" },
  { id: "references", name: "References", icon: "👥" },
];

const LAYOUT_OPTIONS = [
  { id: "single-column", name: "Single Column", icon: Rows, description: "Traditional single column layout" },
  { id: "two-column", name: "Two Column", icon: Columns, description: "Modern two column layout" },
  { id: "sidebar-left", name: "Left Sidebar", icon: Layout, description: "Sidebar on the left" },
  { id: "sidebar-right", name: "Right Sidebar", icon: Layout, description: "Sidebar on the right" },
];

export default function TemplateCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [startingPoint, setStartingPoint] = useState(null);
  const [baseTemplate, setBaseTemplate] = useState(null);
  const [layoutType, setLayoutType] = useState("single-column");
  const [selectedSections, setSelectedSections] = useState(["personal_info", "experience", "education", "skills"]);
  const [sectionOrder, setSectionOrder] = useState(["personal_info", "experience", "education", "skills"]);
  const [customization, setCustomization] = useState({
    color_scheme: "#2563EB",
    secondary_color: "#1E40AF",
    font_family: "Inter",
    font_size: "medium",
    spacing: "comfortable",
    heading_style: "bold"
  });
  const [showPreview, setShowPreview] = useState(false);
  const [industry, setIndustry] = useState("technology");
  const [style, setStyle] = useState("modern");
  const [isSaving, setIsSaving] = useState(false);

  const queryClient = useQueryClient();

  // Fetch user's existing custom templates
  const { data: existingTemplates = [] } = useQuery({
    queryKey: ['customTemplates'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return await base44.entities.CustomTemplate.filter(
        { created_by: user.email },
        '-created_date'
      );
    },
    initialData: []
  });

  const createTemplateMutation = useMutation({
    mutationFn: async (templateData) => {
      return await base44.entities.CustomTemplate.create(templateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customTemplates'] });
      window.location.href = createPageUrl('MyTemplates');
    }
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartFromScratch = () => {
    setStartingPoint("scratch");
    setBaseTemplate("minimal-clean");
    handleNext();
  };

  const handleDuplicateTemplate = (templateId) => {
    setStartingPoint("duplicate");
    setBaseTemplate(templateId);
    handleNext();
  };

  const handleAddSection = (sectionId) => {
    if (!selectedSections.includes(sectionId)) {
      setSelectedSections([...selectedSections, sectionId]);
      setSectionOrder([...sectionOrder, sectionId]);
    }
  };

  const handleRemoveSection = (sectionId) => {
    if (sectionId === "personal_info") return;
    setSelectedSections(selectedSections.filter(id => id !== sectionId));
    setSectionOrder(sectionOrder.filter(id => id !== sectionId));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sectionOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSectionOrder(items);
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      alert("Please enter a template name");
      return;
    }

    setIsSaving(true);
    try {
      await createTemplateMutation.mutateAsync({
        name: templateName,
        description: templateDescription,
        base_template: baseTemplate,
        customization: customization,
        section_styles: {},
        placeholder_data: {},
        industry: industry,
        style: style,
        is_public: false,
        tags: [industry, style, layoutType]
      });
    } catch (error) {
      console.error("Error saving template:", error);
      alert("Failed to save template. Please try again.");
      setIsSaving(false);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return startingPoint !== null;
      case 2:
        return layoutType !== null;
      case 3:
        return selectedSections.length > 0;
      case 4:
        return templateName.trim() !== "";
      default:
        return true;
    }
  };

  const previewResume = {
    template: baseTemplate,
    sections_order: sectionOrder,
    enabled_sections: selectedSections,
    customization: customization,
    personal_info: {
      full_name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Experienced professional with a passion for innovation."
    },
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Tech Company",
        location: "San Francisco, CA",
        start_date: "2020-01",
        current: true,
        bullets: ["Led development of key features", "Mentored junior developers"]
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        institution: "University Name",
        graduation_year: "2018"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python"],
    projects: [],
    certificates: [],
    languages: [],
    interests: [],
    awards: [],
    publications: [],
    references: []
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => window.location.href = createPageUrl('Templates')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Templates
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Custom Template</h1>
                <p className="text-sm text-gray-600">Design your perfect resume template in 4 easy steps</p>
              </div>
            </div>
            <Badge variant="outline" className="text-sm">
              Step {currentStep} of 4
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      step < currentStep
                        ? "bg-green-500 text-white"
                        : step === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-sm font-medium ${step <= currentStep ? "text-gray-900" : "text-gray-500"}`}>
                      {STEP_TITLES[step]}
                    </p>
                  </div>
                </div>
                {step < 4 && (
                  <div className={`flex-1 h-1 mx-4 rounded-full ${step < currentStep ? "bg-green-500" : "bg-gray-200"}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 1: Choose Starting Point */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">How would you like to start?</h2>
                  <p className="text-gray-600">Choose a starting point for your custom template</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Start from Scratch */}
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      startingPoint === "scratch" ? "border-2 border-blue-500 shadow-lg" : "border-2 border-gray-200"
                    }`}
                    onClick={handleStartFromScratch}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Sparkles className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Start from Scratch</h3>
                      <p className="text-gray-600 mb-4">Create a completely custom template with full control over every aspect</p>
                      <Badge className="bg-blue-100 text-blue-800">Blank Canvas</Badge>
                    </CardContent>
                  </Card>

                  {/* Duplicate Existing */}
                  <Card className="border-2 border-gray-200 overflow-hidden">
                    <CardContent className="p-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Copy className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Duplicate Template</h3>
                      <p className="text-gray-600 mb-4 text-center">Start with an existing template and customize it</p>
                      
                      <div className="space-y-3 mt-6">
                        {SAMPLE_TEMPLATES.slice(0, 3).map((template) => (
                          <button
                            key={template.id}
                            onClick={() => handleDuplicateTemplate(template.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:border-purple-300 hover:bg-purple-50 ${
                              startingPoint === "duplicate" && baseTemplate === template.id
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200"
                            }`}
                          >
                            <FileText className="w-5 h-5 text-purple-600" />
                            <div className="flex-1 text-left">
                              <p className="font-medium text-sm text-gray-900">{template.name}</p>
                              <p className="text-xs text-gray-500">{template.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 2: Design Layout */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Layout</h2>
                  <p className="text-gray-600">Select the overall structure for your template</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  {LAYOUT_OPTIONS.map((layout) => (
                    <Card
                      key={layout.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        layoutType === layout.id ? "border-2 border-blue-500 shadow-lg" : "border-2 border-gray-200"
                      }`}
                      onClick={() => setLayoutType(layout.id)}
                    >
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                          layoutType === layout.id ? "bg-blue-500" : "bg-gray-100"
                        }`}>
                          <layout.icon className={`w-8 h-8 ${layoutType === layout.id ? "text-white" : "text-gray-600"}`} />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">{layout.name}</h3>
                        <p className="text-xs text-gray-600">{layout.description}</p>
                        {layoutType === layout.id && (
                          <Badge className="mt-3 bg-blue-100 text-blue-800">Selected</Badge>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Section Order */}
                <Card className="max-w-4xl mx-auto mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Grid3x3 className="w-5 h-5" />
                      Organize Sections
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Drag to reorder sections in your template</p>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="sections">
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                            {sectionOrder.map((sectionId, index) => {
                              const section = AVAILABLE_SECTIONS.find(s => s.id === sectionId);
                              return (
                                <Draggable key={sectionId} draggableId={sectionId} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className={`flex items-center gap-3 p-3 bg-white border-2 rounded-lg transition-all ${
                                        snapshot.isDragging ? "border-blue-400 shadow-lg" : "border-gray-200"
                                      }`}
                                    >
                                      <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                                        <GripVertical className="w-5 h-5 text-gray-400" />
                                      </div>
                                      <span className="text-2xl">{section?.icon}</span>
                                      <span className="flex-1 font-medium text-gray-900">{section?.name}</span>
                                      {!section?.required && (
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => handleRemoveSection(sectionId)}
                                        >
                                          <Trash2 className="w-4 h-4 text-red-500" />
                                        </Button>
                                      )}
                                    </div>
                                  )}
                                </Draggable>
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    {/* Add Section */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-3">Add More Sections:</p>
                      <div className="flex flex-wrap gap-2">
                        {AVAILABLE_SECTIONS.filter(s => !selectedSections.includes(s.id)).map((section) => (
                          <button
                            key={section.id}
                            onClick={() => handleAddSection(section.id)}
                            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                          >
                            <span>{section.icon}</span>
                            <span className="text-sm font-medium">{section.name}</span>
                            <Plus className="w-4 h-4 text-blue-600" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Customize Sections */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Customize Your Template</h2>
                  <p className="text-gray-600">Choose colors, fonts, and styling options</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                  {/* Customization Panel */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Color & Style
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Primary Color */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Primary Color</Label>
                        <div className="flex gap-3">
                          <Input
                            type="color"
                            value={customization.color_scheme}
                            onChange={(e) => setCustomization({...customization, color_scheme: e.target.value})}
                            className="w-20 h-12 cursor-pointer"
                          />
                          <Input
                            type="text"
                            value={customization.color_scheme}
                            onChange={(e) => setCustomization({...customization, color_scheme: e.target.value})}
                            placeholder="#2563EB"
                            className="flex-1"
                          />
                        </div>
                      </div>

                      {/* Font Family */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Font Family</Label>
                        <Select
                          value={customization.font_family}
                          onValueChange={(value) => setCustomization({...customization, font_family: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Lato">Lato</SelectItem>
                            <SelectItem value="Montserrat">Montserrat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Font Size */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Font Size</Label>
                        <Select
                          value={customization.font_size}
                          onValueChange={(value) => setCustomization({...customization, font_size: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small (9pt)</SelectItem>
                            <SelectItem value="medium">Medium (11pt)</SelectItem>
                            <SelectItem value="large">Large (12pt)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Spacing */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Spacing</Label>
                        <Select
                          value={customization.spacing}
                          onValueChange={(value) => setCustomization({...customization, spacing: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="compact">Compact</SelectItem>
                            <SelectItem value="comfortable">Comfortable</SelectItem>
                            <SelectItem value="spacious">Spacious</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Heading Style */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Heading Style</Label>
                        <Select
                          value={customization.heading_style}
                          onValueChange={(value) => setCustomization({...customization, heading_style: value})}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bold">Bold</SelectItem>
                            <SelectItem value="uppercase">Uppercase</SelectItem>
                            <SelectItem value="underline">Underline</SelectItem>
                            <SelectItem value="italic">Italic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Template Metadata */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Template Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Industry */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Industry</Label>
                        <Select value={industry} onValueChange={setIndustry}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="sales">Sales & Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Style Category */}
                      <div>
                        <Label className="text-sm font-medium mb-2 block">Style Category</Label>
                        <Select value={style} onValueChange={setStyle}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                            <SelectItem value="elegant">Elegant</SelectItem>
                            <SelectItem value="compact">Compact</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Preview Button */}
                      <Button
                        onClick={() => setShowPreview(true)}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview Template
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 4: Preview & Save */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Name Your Template</h2>
                  <p className="text-gray-600">Give your template a name and save it</p>
                </div>

                <Card className="max-w-2xl mx-auto">
                  <CardContent className="p-8 space-y-6">
                    <div>
                      <Label htmlFor="templateName" className="text-sm font-medium mb-2 block">
                        Template Name *
                      </Label>
                      <Input
                        id="templateName"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        placeholder="My Custom Template"
                        className="text-lg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="templateDesc" className="text-sm font-medium mb-2 block">
                        Description (Optional)
                      </Label>
                      <Textarea
                        id="templateDesc"
                        value={templateDescription}
                        onChange={(e) => setTemplateDescription(e.target.value)}
                        placeholder="A brief description of your template..."
                        rows={3}
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                      <h4 className="font-semibold text-gray-900 mb-3">Template Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Base Template:</span>
                          <p className="font-medium text-gray-900">{SAMPLE_TEMPLATES.find(t => t.id === baseTemplate)?.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Layout:</span>
                          <p className="font-medium text-gray-900">{LAYOUT_OPTIONS.find(l => l.id === layoutType)?.name}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Sections:</span>
                          <p className="font-medium text-gray-900">{selectedSections.length} sections</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Industry:</span>
                          <p className="font-medium text-gray-900 capitalize">{industry}</p>
                        </div>
                      </div>
                    </div>

                    {/* Preview Button */}
                    <Button
                      onClick={() => setShowPreview(true)}
                      variant="outline"
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-12 max-w-7xl mx-auto">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 1}
            className="min-w-[120px]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceedToNext()}
              className="min-w-[120px] bg-blue-600 hover:bg-blue-700"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSaveTemplate}
              disabled={!canProceedToNext() || isSaving}
              className="min-w-[120px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Template
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Template Preview</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto p-4 bg-gray-100 rounded-lg" style={{ maxHeight: '70vh' }}>
            <div className="bg-white shadow-xl mx-auto" style={{ width: '210mm', minHeight: '297mm' }}>
              <ResumePreview resume={previewResume} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}