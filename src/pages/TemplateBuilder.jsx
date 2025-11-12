
import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Save,
  Download,
  Undo,
  Redo,
  Eye,
  Edit,
  Layers,
  Palette,
  Layout,
  Sparkles,
  AlertTriangle,
  Plus,
  GripVertical,
  ChevronRight,
  Copy,
  Trash2,
  Lock,
  Unlock,
  Info,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { createPageUrl } from "@/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

const sampleResumeData = {
  personal_info: {
    full_name: "Alex Johnson",
    professional_title: "Senior Product Designer",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Creative product designer with 8+ years of experience."
  },
  experience: [
    {
      title: "Senior Product Designer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      bullets: ["Led design system initiative", "Reduced handoff time by 40%"]
    }
  ],
  education: [
    {
      degree: "Bachelor of Fine Arts",
      institution: "Design University",
      graduation_year: "2016"
    }
  ],
  skills: ["Figma", "Sketch", "Prototyping", "User Research"]
};

const SECTION_TYPES = [
  { id: 'personal_info', name: 'Personal Info', icon: '👤' },
  { id: 'summary', name: 'Summary', icon: '📝' },
  { id: 'experience', name: 'Experience', icon: '💼' },
  { id: 'education', name: 'Education', icon: '🎓' },
  { id: 'skills', name: 'Skills', icon: '⚡' },
  { id: 'projects', name: 'Projects', icon: '🚀' },
  { id: 'custom', name: 'Custom', icon: '✨' }
];

const DEFAULT_TEMPLATE = {
  name: "My Custom Template",
  description: "A custom template",
  structure: {
    sections: [
      { id: 'personal_info', type: 'personal_info', visible: true, locked: false },
      { id: 'summary', type: 'summary', visible: true, locked: false },
      { id: 'experience', type: 'experience', visible: true, locked: false },
      { id: 'skills', type: 'skills', visible: true, locked: false }
    ]
  },
  styling: {
    global: {
      colorScheme: "#4F46E5",
      textColor: "#1F2937",
      fontFamily: "Inter",
      fontSize: "14px",
      pageMargin: 40,
      sectionSpacing: 24
    }
  }
};

export default function TemplateBuilder() {
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [history, setHistory] = useState([DEFAULT_TEMPLATE]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('structure');
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showAIHelper, setShowAIHelper] = useState(false);
  const [atsWarnings, setAtsWarnings] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  const queryClient = useQueryClient();

  const updateTemplate = (updates) => {
    const newTemplate = { ...template, ...updates };
    setTemplate(newTemplate);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newTemplate);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setTemplate(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setTemplate(history[historyIndex + 1]);
    }
  };

  const addSection = (type) => {
    updateTemplate({
      structure: {
        sections: [...template.structure.sections, { 
          id: `${type}-${Date.now()}`, 
          type, 
          visible: true, 
          locked: false 
        }]
      }
    });
  };

  const removeSection = (id) => {
    updateTemplate({
      structure: {
        sections: template.structure.sections.filter(s => s.id !== id)
      }
    });
  };

  const toggleVisibility = (id) => {
    updateTemplate({
      structure: {
        sections: template.structure.sections.map(s =>
          s.id === id ? { ...s, visible: !s.visible } : s
        )
      }
    });
  };

  const toggleLock = (id) => {
    updateTemplate({
      structure: {
        sections: template.structure.sections.map(s =>
          s.id === id ? { ...s, locked: !s.locked } : s
        )
      }
    });
  };

  const duplicate = (id) => {
    const section = template.structure.sections.find(s => s.id === id);
    if (section) {
      updateTemplate({
        structure: {
          sections: [...template.structure.sections, { 
            ...section, 
            id: `${section.type}-${Date.now()}` 
          }]
        }
      });
    }
  };

  const reorder = (result) => {
    if (!result.destination) return;
    const items = Array.from(template.structure.sections);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    updateTemplate({ structure: { sections: items } });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const exportTemplate = () => {
    const data = JSON.stringify(template, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Toolbar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.href = createPageUrl('Templates')}
            >
              <ChevronRight className="w-4 h-4 mr-1 rotate-180" />
              Back
            </Button>

            <Input
              value={template.name}
              onChange={(e) => updateTemplate({ name: e.target.value })}
              className="max-w-xs font-semibold"
            />

            <Button variant="ghost" size="sm" onClick={undo} disabled={historyIndex === 0}>
              <Undo className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={redo} disabled={historyIndex === history.length - 1}>
              <Redo className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant={!previewMode ? "default" : "outline"} size="sm" onClick={() => setPreviewMode(false)}>
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button variant={previewMode ? "default" : "outline"} size="sm" onClick={() => setPreviewMode(true)}>
              <Eye className="w-4 h-4 mr-1" />
              Preview
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAIHelper(true)}>
              <Sparkles className="w-4 h-4 mr-1" />
              AI
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowExportDialog(true)}>
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button size="sm" onClick={handleSave} disabled={isSaving} className="bg-blue-600">
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {!previewMode && (
          <div className="w-80 bg-white border-r overflow-y-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="structure">
                  <Layers className="w-4 h-4 mr-1" />
                  Structure
                </TabsTrigger>
                <TabsTrigger value="styling">
                  <Palette className="w-4 h-4 mr-1" />
                  Styling
                </TabsTrigger>
                <TabsTrigger value="layout">
                  <Layout className="w-4 h-4 mr-1" />
                  Layout
                </TabsTrigger>
              </TabsList>

              <TabsContent value="structure" className="p-4">
                <h3 className="font-semibold mb-3">Sections</h3>
                <DragDropContext onDragEnd={reorder}>
                  <Droppable droppableId="sections">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                        {template.structure.sections.map((section, index) => {
                          const type = SECTION_TYPES.find(t => t.id === section.type);
                          return (
                            <Draggable key={section.id} draggableId={section.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`bg-gray-50 rounded-lg p-3 border ${snapshot.isDragging ? 'border-blue-400' : 'border-gray-200'}`}
                                >
                                  <div className="flex items-center gap-2">
                                    <div {...provided.dragHandleProps}>
                                      <GripVertical className="w-4 h-4 text-gray-400" />
                                    </div>
                                    <span>{type?.icon}</span>
                                    <span className="flex-1 text-sm font-medium">{type?.name}</span>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleVisibility(section.id)}>
                                      <Eye className={`w-3 h-3 ${section.visible ? 'text-blue-600' : 'text-gray-400'}`} />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleLock(section.id)}>
                                      {section.locked ? <Lock className="w-3 h-3 text-orange-600" /> : <Unlock className="w-3 h-3 text-gray-400" />}
                                    </Button>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => duplicate(section.id)}>
                                      <Copy className="w-3 h-3 text-gray-400" />
                                    </Button>
                                    {!section.locked && (
                                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeSection(section.id)}>
                                        <Trash2 className="w-3 h-3 text-red-600" />
                                      </Button>
                                    )}
                                  </div>
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
                <Button variant="outline" size="sm" className="w-full mt-3" onClick={() => addSection('custom')}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Section
                </Button>
              </TabsContent>

              <TabsContent value="styling" className="p-4 space-y-4">
                <div>
                  <Label className="text-xs">Primary Color</Label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="color"
                      value={template.styling.global.colorScheme}
                      onChange={(e) => updateTemplate({
                        styling: { global: { ...template.styling.global, colorScheme: e.target.value } }
                      })}
                      className="w-10 h-10 rounded"
                    />
                    <Input
                      value={template.styling.global.colorScheme}
                      onChange={(e) => updateTemplate({
                        styling: { global: { ...template.styling.global, colorScheme: e.target.value } }
                      })}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Font Size: {template.styling.global.fontSize}</Label>
                  <Slider
                    value={[parseInt(template.styling.global.fontSize)]}
                    onValueChange={(v) => updateTemplate({
                      styling: { global: { ...template.styling.global, fontSize: `${v[0]}px` } }
                    })}
                    min={10}
                    max={20}
                    className="mt-2"
                  />
                </div>
              </TabsContent>

              <TabsContent value="layout" className="p-4 space-y-4">
                <div>
                  <Label className="text-xs">Page Margin: {template.styling.global.pageMargin}px</Label>
                  <Slider
                    value={[template.styling.global.pageMargin]}
                    onValueChange={(v) => updateTemplate({
                      styling: { global: { ...template.styling.global, pageMargin: v[0] } }
                    })}
                    min={20}
                    max={80}
                    step={4}
                    className="mt-2"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Preview */}
        <div className="flex-1 bg-gray-100 overflow-y-auto p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-[210mm] mx-auto bg-white shadow-2xl"
            style={{
              padding: `${template.styling.global.pageMargin}px`,
              fontSize: template.styling.global.fontSize,
              fontFamily: template.styling.global.fontFamily,
              color: template.styling.global.textColor
            }}
          >
            {template.structure.sections.filter(s => s.visible).map((section) => {
              const type = SECTION_TYPES.find(t => t.id === section.type);
              return (
                <div key={section.id} style={{ marginBottom: `${template.styling.global.sectionSpacing}px` }}>
                  <h2 className="font-bold text-lg mb-3" style={{ color: template.styling.global.colorScheme }}>
                    {type?.name?.toUpperCase()}
                  </h2>
                  {section.type === 'personal_info' && (
                    <div>
                      <h1 className="text-3xl font-bold">{sampleResumeData.personal_info.full_name}</h1>
                      <p className="text-lg text-gray-600">{sampleResumeData.personal_info.professional_title}</p>
                    </div>
                  )}
                  {section.type === 'summary' && <p className="text-sm">{sampleResumeData.personal_info.summary}</p>}
                  {section.type === 'skills' && (
                    <div className="flex flex-wrap gap-2">
                      {sampleResumeData.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-sm rounded"
                          style={{
                            backgroundColor: `${template.styling.global.colorScheme}20`,
                            color: template.styling.global.colorScheme
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Dialogs */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Template</DialogTitle>
          </DialogHeader>
          <Button onClick={exportTemplate} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download JSON
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showAIHelper} onOpenChange={setShowAIHelper}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              AI Design Assistant
            </DialogTitle>
          </DialogHeader>
          <Card className="p-4 bg-blue-50">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600" />
              <div className="text-sm">
                <p className="font-semibold mb-2">Design Tips:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Font size {template.styling.global.fontSize} is optimal</li>
                  <li>Keep margins between 20-40px</li>
                  <li>Use 2-3 colors maximum</li>
                </ul>
              </div>
            </div>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
