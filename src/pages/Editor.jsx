
import React, { useState, useEffect, useRef, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Download,
  Plus,
  ChevronDown,
  Eye,
  EyeOff,
  Edit2,
  Camera,
  Mail,
  Phone,
  MapPin,
  GripVertical,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Zap,
  Heart,
  BookOpen,
  Layout,
  Palette,
  Link as LinkIcon,
  RefreshCw,
  Trash2,
  Check,
  Type,
  AlignLeft,
  Maximize2,
  Settings
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { createPageUrl } from "@/utils";
import { getTemplateComponent } from "../components/resume-templates/index";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import EducationSection from "../components/editor/EducationSection";
import ExperienceSection from "../components/editor/ExperienceSection";
import SkillsSection from "../components/editor/SkillsSection";
import { ControlledInput } from "../components/editor/ControlledInputs";

const SAMPLE_DATA = {
  personal_info: {
    full_name: "Your Name",
    professional_title: "Professional Title",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Results-driven professional with 5+ years of experience."
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certificates: [],
  languages: [],
  interests: [],
  awards: [],
  publications: [],
  references: []
};

const SECTION_CONFIG = {
  personal_info: { icon: User, name: "Personal Info", color: "#6C3FE4" },
  experience: { icon: Briefcase, name: "Experience", color: "#6C3FE4" },
  education: { icon: GraduationCap, name: "Education", color: "#6C3FE4" },
  certificates: { icon: Award, name: "Certificates", color: "#6C3FE4" },
  languages: { icon: Globe, name: "Languages", color: "#6C3FE4" },
  skills: { icon: Zap, name: "Skills", color: "#6C3FE4" },
  interests: { icon: Heart, name: "Interests", color: "#6C3FE4" },
  projects: { icon: BookOpen, name: "Projects", color: "#6C3FE4" }
};

// Customize Panel Component
function CustomizePanel({ resume, setResume }) {
  const customization = resume?.customization || {};
  const [expandedSection, setExpandedSection] = useState("templates");

  const updateCustomization = (field, value) => {
    setResume(prev => ({
      ...prev,
      customization: {
        ...(prev.customization || {}),
        [field]: value
      }
    }));
  };

  const templates = [
    { id: "double-column-pro", name: "Double Column Pro" },
    { id: "ivy-league-pro", name: "Ivy League Pro" },
    { id: "elegant-pro", name: "Elegant Pro" }
  ];

  const colorPalettes = [
    { name: "Blue Ocean", primary: "#3B82F6", secondary: "#2563EB", accent: "#1D4ED8" },
    { name: "Purple Dream", primary: "#8B5CF6", secondary: "#7C3AED", accent: "#6D28D9" },
    { name: "Green Forest", primary: "#10B981", secondary: "#059669", accent: "#047857" },
    { name: "Red Energy", primary: "#EF4444", secondary: "#DC2626", accent: "#B91C1C" },
    { name: "Orange Sunset", primary: "#F97316", secondary: "#EA580C", accent: "#C2410C" },
    { name: "Teal Modern", primary: "#14B8A6", secondary: "#0D9488", accent: "#0F766E" },
    { name: "Pink Rose", primary: "#EC4899", secondary: "#DB2777", accent: "#BE185D" },
    { name: "Gray Professional", primary: "#6B7280", secondary: "#4B5563", accent: "#374151" }
  ];

  const fontFamilies = [
    { name: "Inter", value: "Inter, system-ui, sans-serif" },
    { name: "Plus Jakarta Sans", value: "Plus Jakarta Sans, system-ui, sans-serif" },
    { name: "Georgia", value: "Georgia, serif" },
    { name: "Times New Roman", value: "Times New Roman, serif" },
    { name: "Roboto", value: "Roboto, sans-serif" },
    { name: "Open Sans", value: "Open Sans, sans-serif" }
  ];

  const fontSizes = [
    { name: "Small", value: "small", icon: "S" },
    { name: "Medium", value: "medium", icon: "M" },
    { name: "Large", value: "large", icon: "L" }
  ];

  const spacingOptions = [
    { name: "Compact", value: "compact" },
    { name: "Normal", value: "comfortable" },
    { name: "Spacious", value: "spacious" }
  ];

  const headingStyles = [
    { name: "Bold", value: "bold", icon: "B" },
    { name: "Uppercase", value: "uppercase", icon: "AA" },
    { name: "Underline", value: "underline", icon: "U" },
    { name: "Minimal", value: "minimal", icon: "—" }
  ];

  const applyColorPalette = (palette) => {
    setResume(prev => ({
      ...prev,
      customization: {
        ...(prev.customization || {}),
        color_scheme: palette.primary,
        secondary_color: palette.secondary,
        accent_color: palette.accent
      }
    }));
  };

  const toggleSection = (sectionName) => {
    setExpandedSection(prev => prev === sectionName ? null : sectionName);
  };

  const AccordionSection = ({ name, icon: Icon, children }) => {
    const isExpanded = expandedSection === name;
    return (
      <div className="border-b border-gray-200">
        <button
          onClick={() => toggleSection(name)}
          className="w-full flex items-center justify-between py-3 px-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-[#6C3FE4]" />
            <h3 className="text-sm font-bold text-gray-900">{name}</h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </motion.div>
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 pt-2">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-white">
      {/* Templates */}
      <AccordionSection name="Templates" icon={Layout}>
        <div className="grid grid-cols-2 gap-2">
          {templates.map(template => (
            <button
              key={template.id}
              onClick={() => setResume(prev => ({ ...prev, template: template.id }))}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all p-4 ${
                resume.template === template.id
                  ? 'border-[#6C3FE4] bg-[#6C3FE4]/5 shadow-lg'
                  : 'border-gray-200 hover:border-[#6C3FE4]/50 bg-white'
              }`}
            >
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <Layout className="w-6 h-6 text-[#6C3FE4]" />
                </div>
                <p className="text-xs font-semibold text-gray-700">{template.name}</p>
              </div>
              {resume.template === template.id && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#6C3FE4] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* Color Palettes */}
      <AccordionSection name="Color Palettes" icon={Palette}>
        <div className="space-y-3">
          <p className="text-xs text-gray-600">Choose a pre-defined color scheme</p>
          <div className="grid grid-cols-2 gap-2">
            {colorPalettes.map((palette, idx) => (
              <button
                key={idx}
                onClick={() => applyColorPalette(palette)}
                className="group relative p-2 rounded-lg border-2 border-gray-200 hover:border-[#6C3FE4] transition-all bg-white"
              >
                <div className="flex gap-1 mb-1.5">
                  <div className="w-full h-6 rounded" style={{ backgroundColor: palette.primary }}></div>
                  <div className="w-full h-6 rounded" style={{ backgroundColor: palette.secondary }}></div>
                  <div className="w-full h-6 rounded" style={{ backgroundColor: palette.accent }}></div>
                </div>
                <p className="text-xs font-medium text-gray-700 text-center">{palette.name}</p>
              </button>
            ))}
          </div>

          <div className="pt-3 mt-3 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">Custom Colors</p>
            <div className="space-y-2">
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customization.color_scheme || "#3B82F6"}
                    onChange={(e) => updateCustomization('color_scheme', e.target.value)}
                    className="w-12 h-12 rounded border border-gray-200 cursor-pointer"
                  />
                  <Input
                    value={customization.color_scheme || "#3B82F6"}
                    onChange={(e) => updateCustomization('color_scheme', e.target.value)}
                    className="flex-1 h-12 text-sm px-3"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs text-gray-600 mb-1 block">Secondary Color</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={customization.secondary_color || "#2563EB"}
                    onChange={(e) => updateCustomization('secondary_color', e.target.value)}
                    className="w-12 h-12 rounded border border-gray-200 cursor-pointer"
                  />
                  <Input
                    value={customization.secondary_color || "#2563EB"}
                    onChange={(e) => updateCustomization('secondary_color', e.target.value)}
                    className="flex-1 h-12 text-sm px-3"
                    placeholder="#2563EB"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Spacing */}
      <AccordionSection name="Spacing" icon={Maximize2}>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold text-gray-700">Line Height</Label>
              <span className="text-xs font-bold text-[#6C3FE4] bg-[#6C3FE4]/10 px-2 py-1 rounded">
                {(customization.line_height || 1.6).toFixed(1)}
              </span>
            </div>
            <Slider
              value={[customization.line_height || 1.6]}
              onValueChange={(value) => updateCustomization('line_height', value[0])}
              min={1.2}
              max={2.4}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <Label className="text-xs font-semibold text-gray-700 mb-2 block">Section Spacing</Label>
            <div className="grid grid-cols-3 gap-2">
              {spacingOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => updateCustomization('spacing', option.value)}
                  className={`p-2 rounded-lg text-xs font-medium transition-all ${
                    (customization.spacing || 'comfortable') === option.value
                      ? 'bg-gradient-to-r from-[#6C3FE4] to-[#FF6B9D] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold text-gray-700">Page Margins</Label>
              <span className="text-xs font-bold text-[#6C3FE4] bg-[#6C3FE4]/10 px-2 py-1 rounded">
                {customization.page_margins || 40}px
              </span>
            </div>
            <Slider
              value={[customization.page_margins || 40]}
              onValueChange={(value) => updateCustomization('page_margins', value[0])}
              min={20}
              max={80}
              step={5}
              className="w-full"
            />
          </div>
        </div>
      </AccordionSection>

      {/* Font */}
      <AccordionSection name="Font" icon={Type}>
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-semibold text-gray-700 mb-2 block">Font Family</Label>
            <div className="grid grid-cols-2 gap-2">
              {fontFamilies.map(font => (
                <button
                  key={font.value}
                  onClick={() => updateCustomization('font_family', font.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    (customization.font_family || "Plus Jakarta Sans, system-ui, sans-serif") === font.value
                      ? 'border-[#6C3FE4] bg-[#6C3FE4]/5'
                      : 'border-gray-200 hover:border-[#6C3FE4]/50 bg-white'
                  }`}
                  style={{ fontFamily: font.value }}
                >
                  <div className="text-lg font-semibold text-gray-900 mb-0.5">Aa</div>
                  <div className="text-[10px] text-gray-600">{font.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-xs font-semibold text-gray-700 mb-2 block">Font Size</Label>
            <div className="grid grid-cols-3 gap-2">
              {fontSizes.map(size => (
                <button
                  key={size.value}
                  onClick={() => updateCustomization('font_size', size.value)}
                  className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
                    (customization.font_size || 'medium') === size.value
                      ? 'bg-gradient-to-r from-[#6C3FE4] to-[#FF6B9D] text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-lg font-bold">{size.icon}</span>
                  <span className="text-xs">{size.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <Label className="text-xs text-gray-600 mb-1.5 block">Text Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customization.text_color || "#374151"}
                  onChange={(e) => updateCustomization('text_color', e.target.value)}
                  className="w-12 h-12 rounded border border-gray-200 cursor-pointer"
                />
                <Input
                  value={customization.text_color || "#374151"}
                  onChange={(e) => updateCustomization('text_color', e.target.value)}
                  className="flex-1 h-12 text-sm px-3"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs text-gray-600 mb-1.5 block">Heading Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={customization.heading_color || "#111827"}
                  onChange={(e) => updateCustomization('heading_color', e.target.value)}
                  className="w-12 h-12 rounded border border-gray-200 cursor-pointer"
                />
                <Input
                  value={customization.heading_color || "#111827"}
                  onChange={(e) => updateCustomization('heading_color', e.target.value)}
                  className="flex-1 h-12 text-sm px-3"
                />
              </div>
            </div>
          </div>
        </div>
      </AccordionSection>

      {/* Header Style */}
      <AccordionSection name="Header Style" icon={AlignLeft}>
        <div className="space-y-3">
          <Label className="text-xs font-semibold text-gray-700 block">Heading Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {headingStyles.map(style => (
              <button
                key={style.value}
                onClick={() => updateCustomization('heading_style', style.value)}
                className={`p-3 rounded-lg transition-all flex flex-col items-center gap-1 ${
                  (customization.heading_style || 'bold') === style.value
                    ? 'bg-gradient-to-r from-[#6C3FE4] to-[#FF6B9D] text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span className="text-base font-bold">{style.icon}</span>
                <span className="text-xs">{style.name}</span>
              </button>
            ))}
          </div>
        </div>
      </AccordionSection>

      {/* Background */}
      <AccordionSection name="Background" icon={Palette}>
        <div>
          <Label className="text-xs font-semibold text-gray-700 mb-2 block">Page Background</Label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={customization.background_color || "#FFFFFF"}
              onChange={(e) => updateCustomization('background_color', e.target.value)}
              className="w-12 h-12 rounded border border-gray-200 cursor-pointer"
            />
            <Input
              value={customization.background_color || "#FFFFFF"}
              onChange={(e) => updateCustomization('background_color', e.target.value)}
              className="flex-1 h-12 text-sm px-3"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Choose a background color for your resume</p>
        </div>
      </AccordionSection>

      {/* Section Order */}
      <AccordionSection name="Section Order" icon={Layout}>
        <p className="text-xs text-gray-600 mb-3">Drag to reorder sections</p>
        <DragDropContext onDragEnd={(result) => {
          if (!result.destination) return;
          const items = Array.from(resume.sections_order || Object.keys(SECTION_CONFIG));
          const [reordered] = items.splice(result.source.index, 1);
          items.splice(result.destination.index, 0, reordered);
          setResume(prev => ({ ...prev, sections_order: items }));
        }}>
          <Droppable droppableId="sections">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {(resume.sections_order || Object.keys(SECTION_CONFIG)).map((sectionId, index) => {
                  const config = SECTION_CONFIG[sectionId];
                  if (!config) return null;
                  const Icon = config.icon;
                  return (
                    <Draggable key={sectionId} draggableId={sectionId} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex items-center gap-2 p-3 bg-white rounded-lg border-2 transition-all ${
                            snapshot.isDragging ? 'border-[#6C3FE4] shadow-lg' : 'border-gray-200'
                          }`}
                        >
                          <GripVertical className="w-4 h-4 text-gray-400" />
                          <Icon className="w-4 h-4 text-[#6C3FE4]" />
                          <span className="flex-1 text-xs font-medium text-gray-900">{config.name}</span>
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
      </AccordionSection>

      {/* Section Visibility */}
      <AccordionSection name="Section Visibility" icon={Eye}>
        <div className="space-y-2">
          {Object.entries(SECTION_CONFIG).map(([sectionId, config]) => {
            const Icon = config.icon;
            if (sectionId === 'personal_info') return null;
            const isEnabled = (resume.enabled_sections || []).includes(sectionId);
            return (
              <div key={sectionId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">{config.name}</span>
                </div>
                <button
                  onClick={() => {
                    const enabled = resume.enabled_sections || [];
                    setResume(prev => ({
                      ...prev,
                      enabled_sections: isEnabled
                        ? enabled.filter(id => id !== sectionId)
                        : [...enabled, sectionId]
                    }));
                  }}
                  className={`relative w-11 h-6 rounded-full transition-colors ${
                    isEnabled ? 'bg-gradient-to-r from-[#6C3FE4] to-[#FF6B9D]' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isEnabled ? 'translate-x-5' : ''
                  }`} />
                </button>
              </div>
            );
          })}
        </div>
      </AccordionSection>
    </div>
  );
}

export default function Editor() {
  const [resume, setResume] = useState(null);
  const [activeTab, setActiveTab] = useState("content");
  // Updated expandedSections to allow multiple open sections based on new toggleSection logic
  const [expandedSections, setExpandedSections] = useState({
    languages: false, // Initial state, can be adjusted
    experience: true,
    education: true,
    skills: true
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [sectionVisibility, setSectionVisibility] = useState({});
  const [editingHeading, setEditingHeading] = useState(null);
  const [addingEntry, setAddingEntry] = useState(null);
  const [newEntryValue, setNewEntryValue] = useState("");
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);
  const debounceTimeoutRef = useRef(null);

  const urlParams = new URLSearchParams(window.location.search);
  const resumeId = urlParams.get('id');
  const templateParam = urlParams.get('template');

  const TemplateComponent = resume ? getTemplateComponent(resume.template) : null;

  useEffect(() => {
    if (resumeId) {
      loadResume();
    } else if (templateParam) {
      createResumeFromTemplate(templateParam);
    }
  }, [resumeId, templateParam]);

  // Real-time auto-save with 1.5 second debounce
  useEffect(() => {
    if (resume && resumeId) {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        saveResume();
      }, 1500);
    }
  }, [resume, resumeId]);

  const loadResume = async () => {
    try {
      const data = await base44.entities.Resume.list();
      const resumeData = data.find(r => r.id === resumeId);
      if (resumeData) {
        setResume({
          ...SAMPLE_DATA,
          ...resumeData,
          template: resumeData.template || 'double-column-pro',
          sections_order: resumeData.sections_order || Object.keys(SECTION_CONFIG),
          enabled_sections: resumeData.enabled_sections || Object.keys(SECTION_CONFIG),
          customization: {
            color_scheme: "#3B82F6",
            secondary_color: "#2563EB",
            accent_color: "#1D4ED8",
            font_family: "Plus Jakarta Sans, system-ui, sans-serif",
            font_size: "medium",
            spacing: "comfortable",
            line_height: 1.6,
            page_margins: 40,
            heading_style: "bold",
            background_color: "#FFFFFF",
            text_color: "#374151",
            heading_color: "#111827",
            ...resumeData.customization
          }
        });
      }
    } catch (error) {
      console.error("Load error:", error);
    }
  };

  const createResumeFromTemplate = async (templateId) => {
    const newResumeData = {
      title: `Resume 1`,
      template: templateId,
      sections_order: Object.keys(SECTION_CONFIG),
      enabled_sections: Object.keys(SECTION_CONFIG),
      customization: {
        color_scheme: "#3B82F6",
        secondary_color: "#2563EB",
        accent_color: "#1D4ED8",
        font_family: "Plus Jakarta Sans, system-ui, sans-serif",
        font_size: "medium",
        spacing: "comfortable",
        line_height: 1.6,
        page_margins: 40,
        heading_style: "bold",
        background_color: "#FFFFFF",
        text_color: "#374151",
        heading_color: "#111827"
      },
      ...SAMPLE_DATA
    };

    try {
      const createdResume = await base44.entities.Resume.create(newResumeData);
      window.history.replaceState({}, '', createPageUrl('Editor') + `?id=${createdResume.id}`);
      setResume({ ...createdResume, id: createdResume.id });
    } catch (error) {
      console.error("Error:", error);
      setResume(newResumeData);
    }
  };

  const saveResume = async () => {
    if (!resume || !resumeId) return;
    setIsSaving(true);
    try {
      await base44.entities.Resume.update(resumeId, resume);
      setShowSavedIndicator(true);
      setTimeout(() => setShowSavedIndicator(false), 2000);
    } catch (error) {
      console.error("Save error:", error);
    }
    setIsSaving(false);
  };

  const exportPDF = () => {
    setIsExporting(true);
    window.print();
    setTimeout(() => setIsExporting(false), 1000);
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleVisibility = (sectionId, index) => {
    const key = `${sectionId}-${index}`;
    setSectionVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updatePersonalInfo = (field, value) => {
    setResume(prev => ({
      ...prev,
      personal_info: { ...(prev.personal_info || {}), [field]: value }
    }));
  };

  const updateSection = (sectionId, data) => {
    setResume(prev => ({
      ...prev,
      [sectionId]: data
    }));
  };

  const addEntry = (sectionId) => {
    if (!newEntryValue.trim()) return;
    setResume(prev => {
      const sectionData = prev[sectionId] || [];
      const newData = typeof sectionData[0] === 'string'
        ? [...sectionData, newEntryValue.trim()]
        : [...sectionData, { name: newEntryValue.trim() }];
      return { ...prev, [sectionId]: newData };
    });
    setNewEntryValue("");
    setAddingEntry(null);
  };

  const deleteEntry = (sectionId, index) => {
    setResume(prev => {
      const sectionData = [...(prev[sectionId] || [])];
      sectionData.splice(index, 1);
      return { ...prev, [sectionId]: sectionData };
    });
  };

  const updateHeading = (sectionId, newHeading) => {
    SECTION_CONFIG[sectionId].name = newHeading;
    setEditingHeading(null);
    setResume(prev => ({...prev}));
  };

  const handleDragEnd = (result, sectionId) => {
    if (!result.destination) return;
    setResume(prev => {
      const items = Array.from(prev[sectionId] || []);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      return { ...prev, [sectionId]: items };
    });
  };

  if (!resume) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFE8F5 100%)' }}>
        <RefreshCw className="w-8 h-8 animate-spin text-[#6C3FE4]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #F5F0FF 0%, #FFE8F5 100%)' }}>
      {/* Top Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between h-12">
            <div className="flex gap-4">
              {['overview', 'content', 'customize', 'links'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 text-xs font-medium transition-all relative ${
                    activeTab === tab ? "text-[#6C3FE4]" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab === 'overview' && <Layout className="w-3.5 h-3.5" />}
                  {tab === 'content' && <Edit2 className="w-3.5 h-3.5" />}
                  {tab === 'customize' && <Palette className="w-3.5 h-3.5" />}
                  {tab === 'links' && <LinkIcon className="w-3.5 h-3.5" />}
                  <span className="capitalize">{tab}</span>
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#6C3FE4] to-[#FF6B9D]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <AnimatePresence>
                {showSavedIndicator && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 text-xs font-medium text-green-600"
                  >
                    <Check className="w-3 h-3" />
                    <span>Saved</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={exportPDF}
                disabled={isExporting}
                className="px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #6C3FE4 0%, #FF6B9D 100%)' }}
              >
                {isExporting ? <RefreshCw className="w-3 h-3 mr-1 inline animate-spin" /> : <><Download className="w-3 h-3 mr-1 inline" />Download</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1800px] mx-auto flex gap-3 p-3 min-h-[calc(100vh-48px)]">
        {/* LEFT SIDEBAR - 35% */}
        <AnimatePresence mode="wait">
          {activeTab === "content" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-[35%] space-y-2 overflow-y-auto bg-white rounded-xl shadow-lg"
              style={{ maxHeight: 'calc(100vh - 60px)' }}
            >
              <div className="p-3 space-y-2">
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-md p-3 border border-gray-100">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-sm font-bold text-gray-900">Personal Information</h2>
                    <button className="p-1 hover:bg-[#F5F0FF] rounded transition-all">
                      <Edit2 className="w-3 h-3 text-[#6C3FE4]" />
                    </button>
                  </div>
                  <div className="flex justify-center mb-3">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg">
                        <Camera className="w-5 h-5 text-gray-400" />
                      </div>
                      <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#6C3FE4] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                        <Edit2 className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div>
                      <Label className="text-xs font-semibold text-gray-700 mb-1 block">Full Name</Label>
                      <ControlledInput
                        value={resume.personal_info?.full_name || ""}
                        onChange={(value) => updatePersonalInfo('full_name', value)}
                        placeholder="Your Full Name"
                        className="h-7 text-xs"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-xs font-semibold text-gray-700 mb-1 block">Professional Title</Label>
                      <ControlledInput
                        value={resume.personal_info?.professional_title || ""}
                        onChange={(value) => updatePersonalInfo('professional_title', value)}
                        placeholder="Your Professional Title"
                        className="h-7 text-xs"
                      />
                    </div>

                    {[
                      { icon: Mail, field: 'email', placeholder: 'Email', type: 'email' },
                      { icon: Phone, field: 'phone', placeholder: 'Phone', type: 'tel' },
                      { icon: MapPin, field: 'location', placeholder: 'Location', type: 'text' }
                    ].map(({ icon: Icon, field, placeholder, type }) => (
                      <div key={field} className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded">
                        <Icon className="w-3.5 h-3.5 text-[#6C3FE4] flex-shrink-0" />
                        <ControlledInput
                          value={resume.personal_info?.[field] || ""}
                          onChange={(value) => updatePersonalInfo(field, value)}
                          placeholder={placeholder}
                          type={type}
                          className="border-0 bg-transparent p-0 h-5 focus:ring-0 text-xs"
                        />
                      </div>
                    ))}

                    <div>
                      <Label className="text-xs font-semibold text-gray-700 mb-1 block">Professional Summary</Label>
                      <textarea
                        value={resume.personal_info?.summary || ""}
                        onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                        placeholder="Brief summary of your professional background..."
                        className="w-full min-h-[60px] text-xs p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-[#6C3FE4]"
                      />
                    </div>
                  </div>
                </div>

                {/* Experience Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <button
                    onClick={() => toggleSection('experience')}
                    className="w-full flex items-center justify-between p-2 hover:bg-[#F5F0FF] transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#6C3FE4]" />
                      <span className="text-xs font-semibold text-gray-900">Experience</span>
                    </div>
                    <motion.div animate={{ rotate: expandedSections.experience ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3.5 h-3.5 text-[#6C3FE4]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSections.experience && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100 bg-[#FAFBFF]"
                      >
                        <div className="p-2">
                          <ExperienceSection
                            experience={resume.experience || []}
                            onChange={(data) => updateSection('experience', data)}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Education Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <button
                    onClick={() => toggleSection('education')}
                    className="w-full flex items-center justify-between p-2 hover:bg-[#F5F0FF] transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-[#6C3FE4]" />
                      <span className="text-xs font-semibold text-gray-900">Education</span>
                    </div>
                    <motion.div animate={{ rotate: expandedSections.education ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3.5 h-3.5 text-[#6C3FE4]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSections.education && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100 bg-[#FAFBFF]"
                      >
                        <div className="p-2">
                          <EducationSection
                            education={resume.education || []}
                            onChange={(data) => updateSection('education', data)}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Skills Section */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <button
                    onClick={() => toggleSection('skills')}
                    className="w-full flex items-center justify-between p-2 hover:bg-[#F5F0FF] transition-all"
                  >
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-[#6C3FE4]" />
                      <span className="text-xs font-semibold text-gray-900">Skills</span>
                    </div >
                    <motion.div animate={{ rotate: expandedSections.skills ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-3.5 h-3.5 text-[#6C3FE4]" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedSections.skills && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-gray-100 bg-[#FAFBFF]"
                      >
                        <div className="p-2">
                          <SkillsSection
                            skills={resume.skills || []}
                            onChange={(data) => updateSection('skills', data)}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other Sections - Keep existing simple sections */}
                {Object.entries(SECTION_CONFIG)
                  .filter(([id]) => !['personal_info', 'experience', 'education', 'skills'].includes(id))
                  .map(([sectionId, config]) => {
                    const Icon = config.icon;
                    const isExpanded = expandedSections[sectionId];
                    const sectionData = resume[sectionId] || [];

                    return (
                      <div key={sectionId} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <button
                          onClick={() => toggleSection(sectionId)}
                          className="w-full flex items-center justify-between p-2 hover:bg-[#F5F0FF] transition-all"
                        >
                          <div className="flex items-center gap-1.5">
                            <Icon className="w-3.5 h-3.5" style={{ color: config.color }} />
                            <span className="text-xs font-semibold text-gray-900">{config.name}</span>
                          </div>
                          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown className="w-3.5 h-3.5" style={{ color: config.color }} />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="border-t border-gray-100 bg-[#FAFBFF]"
                            >
                              <div className="p-2 space-y-1">
                                <DragDropContext onDragEnd={(result) => handleDragEnd(result, sectionId)}>
                                  <Droppable droppableId={sectionId}>
                                    {(provided) => (
                                      <div {...provided.droppableProps} ref={provided.innerRef}>
                                        {Array.isArray(sectionData) && sectionData.length > 0 ? (
                                          sectionData.map((item, index) => {
                                            const isVisible = !sectionVisibility[`${sectionId}-${index}`];
                                            // Safely extract display text from item
                                            const displayText = typeof item === 'string' 
                                              ? item 
                                              : (item?.name || item?.title || item?.language || item?.certificate || 'Item');
                                            
                                            return (
                                              <Draggable key={`${sectionId}-${index}`} draggableId={`${sectionId}-${index}`} index={index}>
                                                {(provided, snapshot) => (
                                                  <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`flex items-center gap-1 p-1.5 bg-white rounded border border-gray-200 hover:border-[#6C3FE4] transition-all group mb-1 ${
                                                      snapshot.isDragging ? 'shadow-lg opacity-80' : ''
                                                    }`}
                                                  >
                                                    <GripVertical className="w-3 h-3 text-gray-400 cursor-move group-hover:text-[#6C3FE4]" />
                                                    <span className="flex-1 text-[10px] text-gray-700">
                                                      {displayText}
                                                    </span>
                                                    <button onClick={() => toggleVisibility(sectionId, index)} className="p-0.5 hover:bg-gray-100 rounded">
                                                      {isVisible ? <Eye className="w-3 h-3 text-[#6C3FE4]" /> : <EyeOff className="w-3 h-3 text-gray-400" />}
                                                    </button>
                                                    <button onClick={() => deleteEntry(sectionId, index)} className="p-0.5 hover:bg-red-50 rounded transition-colors">
                                                      <Trash2 className="w-3 h-3 text-gray-400 hover:text-red-600" />
                                                    </button>
                                                  </div>
                                                )}
                                              </Draggable>
                                            );
                                          })
                                        ) : (
                                          <p className="text-[10px] text-gray-500 text-center py-2">No items yet</p>
                                        )}
                                        {provided.placeholder}
                                      </div>
                                    )}
                                  </Droppable>
                                </DragDropContext>

                                {addingEntry === sectionId ? (
                                  <div className="space-y-1 pt-1">
                                    <Input
                                      value={newEntryValue}
                                      onChange={(e) => setNewEntryValue(e.target.value)}
                                      onKeyPress={(e) => e.key === 'Enter' && addEntry(sectionId)}
                                      placeholder="Type here..."
                                      className="h-7 text-[10px]"
                                      autoFocus
                                    />
                                    <div className="flex gap-1">
                                      <Button
                                        onClick={() => addEntry(sectionId)}
                                        className="flex-1 h-6 text-[10px]"
                                        style={{ background: 'linear-gradient(135deg, #6C3FE4 0%, #FF6B9D 100%)' }}
                                      >
                                        Save
                                      </Button>
                                      <Button
                                        onClick={() => { setAddingEntry(null); setNewEntryValue(""); }}
                                        variant="outline"
                                        className="flex-1 h-6 text-[10px]"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => setAddingEntry(sectionId)}
                                    className="w-full flex items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-[#6C3FE4] hover:bg-[#F5F0FF] rounded transition-all"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                    Add Entry
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                <button
                  onClick={() => setShowAddContentModal(true)}
                  className="w-full py-2.5 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5 text-xs"
                  style={{ background: 'linear-gradient(135deg, #6C3FE4 0%, #FF6B9D 100%)' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Content
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "customize" && (
            <motion.div
              key="customize"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-[35%] bg-white rounded-xl shadow-lg overflow-hidden"
              style={{ maxHeight: 'calc(100vh - 60px)' }}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-3 z-10">
                <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#6C3FE4]" />
                  Customize Resume
                </h2>
              </div>
              <CustomizePanel resume={resume} setResume={setResume} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* RIGHT PREVIEW - 65% - SHOW FULL TEMPLATE WITH SCROLL */}
        <div className="w-[65%] flex items-start justify-center p-0">
          <div 
            className="bg-white shadow-2xl w-full overflow-y-auto"
            style={{
              height: 'calc(100vh - 72px)',
              borderRadius: '12px'
            }}
          >
            <div 
              className="flex justify-center py-6"
              style={{
                minHeight: '100%'
              }}
            >
              {TemplateComponent && (
                <div style={{ 
                  transform: 'scale(0.85)',
                  transformOrigin: 'top center',
                  marginBottom: '40px'
                }}>
                  <TemplateComponent resume={{
                    ...resume,
                    languages: (resume.languages || []).filter((_, idx) => !sectionVisibility[`languages-${idx}`]),
                    skills: (resume.skills || []).filter((_, idx) => !sectionVisibility[`skills-${idx}`]),
                    interests: (resume.interests || []).filter((_, idx) => !sectionVisibility[`interests-${idx}`]),
                    experience: (resume.experience || []).filter((_, idx) => !sectionVisibility[`experience-${idx}`]),
                    education: (resume.education || []).filter((_, idx) => !sectionVisibility[`education-${idx}`]),
                    projects: (resume.projects || []).filter((_, idx) => !sectionVisibility[`projects-${idx}`]),
                    certificates: (resume.certificates || []).filter((_, idx) => !sectionVisibility[`certificates-${idx}`]),
                    awards: (resume.awards || []).filter((_, idx) => !sectionVisibility[`awards-${idx}`]),
                    publications: (resume.publications || []).filter((_, idx) => !sectionVisibility[`publications-${idx}`]),
                  }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showAddContentModal} onOpenChange={setShowAddContentModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Section</DialogTitle>
            <DialogDescription>Choose a section type to add to your resume</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            {['Projects', 'Awards', 'Publications', 'Volunteer', 'References', 'Hobbies'].map((section) => (
              <Button
                key={section}
                variant="outline"
                className="h-10"
                onClick={() => {
                  alert(`Adding ${section} section - feature coming soon!`);
                  setShowAddContentModal(false);
                }}
              >
                {section}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .w-\\[65\\%\\], .w-\\[65\\%\\] * { visibility: visible; }
          .w-\\[65\\%\\] { position: absolute; left: 0; top: 0; transform: scale(1) !important; width: 100% !important; }
        }
      `}</style>
    </div>
  );
}
