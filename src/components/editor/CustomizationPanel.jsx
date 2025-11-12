
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Palette, 
  Type, 
  Layout, 
  Sparkles, 
  Save, 
  RotateCcw,
  X,
  Check,
  Grid,
  Square
} from "lucide-react";
import { motion } from "framer-motion";

// Pre-made color palettes inspired by Enhancv
const COLOR_PALETTES = {
  professional: {
    name: "Professional",
    colors: {
      primary: "#2563EB",
      secondary: "#1E40AF",
      background: "#FFFFFF"
    }
  },
  modern: {
    name: "Modern",
    colors: {
      primary: "#8B5CF6",
      secondary: "#7C3AED",
      background: "#FAFAFA"
    }
  },
  bold: {
    name: "Bold",
    colors: {
      primary: "#DC2626",
      secondary: "#B91C1C",
      background: "#FFFFFF"
    }
  },
  creative: {
    name: "Creative",
    colors: {
      primary: "#EC4899",
      secondary: "#DB2777",
      background: "#FFF7ED"
    }
  },
  minimal: {
    name: "Minimal",
    colors: {
      primary: "#0F172A",
      secondary: "#475569",
      background: "#FFFFFF"
    }
  }
};

// Preset color swatches
const COLOR_SWATCHES = [
  "#2563EB", // Blue
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#DC2626", // Red
  "#059669", // Green
  "#0891B2", // Cyan
  "#F59E0B", // Amber
  "#0F172A", // Slate
  "#7C3AED", // Violet
  "#DB2777"  // Rose
];

// Background patterns
const BACKGROUND_PATTERNS = [
  { id: "none", name: "None", preview: "bg-white" },
  { id: "dots", name: "Dots", preview: "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px]" },
  { id: "grid", name: "Grid", preview: "bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]" },
  { id: "stripes", name: "Stripes", preview: "bg-[linear-gradient(45deg,#e5e7eb_25%,transparent_25%,transparent_75%,#e5e7eb_75%,#e5e7eb)] bg-[size:20px_20px]" },
  { id: "hexagons", name: "Hexagons", preview: "bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px]" }
];

// Font options with preview
const FONT_OPTIONS = [
  { name: "Rubik", family: "Rubik, sans-serif" },
  { name: "Lato", family: "Lato, sans-serif" },
  { name: "Raleway", family: "Raleway, sans-serif" },
  { name: "Exo", family: "Exo 2, sans-serif" },
  { name: "Chivo", family: "Chivo, sans-serif" },
  { name: "Montserrat", family: "Montserrat, sans-serif" },
  { name: "Oswald", family: "Oswald, sans-serif" },
  { name: "Bitter", family: "Bitter, serif" },
  { name: "Volkhov", family: "Volkhov, serif" }
];

export default function CustomizationPanel({ customization, onChange, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("colors");
  const [hasChanges, setHasChanges] = useState(false);
  const [showCustomColorPicker, setShowCustomColorPicker] = useState(false);

  const updateCustomization = (key, value) => {
    const updated = {
      ...customization,
      [key]: value
    };
    onChange(updated);
    setHasChanges(true);
  };

  const applyColorPalette = (paletteKey) => {
    const palette = COLOR_PALETTES[paletteKey];
    const updated = {
      ...customization,
      color_scheme: palette.colors.primary,
      secondary_color: palette.colors.secondary
    };
    onChange(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave();
    setHasChanges(false);
  };

  const resetToDefault = () => {
    onChange({
      color_scheme: "#2563EB",
      secondary_color: "#1E40AF",
      font_family: "Rubik", // Changed from "Inter" to match FONT_OPTIONS
      font_size: "medium",
      spacing: "comfortable",
      line_height: 1.6,
      heading_style: "bold",
      section_spacing: 24,
      page_padding: 16
    });
    setHasChanges(true);
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: "spring", damping: 25 }}
      className="fixed right-0 top-0 bottom-0 w-[380px] bg-white dark:bg-slate-800 shadow-2xl z-50 overflow-y-auto border-l border-slate-200 dark:border-slate-700"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Customize Resume</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Save className="w-4 h-4 mr-2" />
            {hasChanges ? "Save Changes" : "Saved"}
          </Button>
          <Button
            onClick={resetToDefault}
            variant="outline"
            size="sm"
            title="Reset to default"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* COLORS Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Colors</h3>
          </div>

          {/* Color Palettes */}
          <div className="space-y-3 mb-4">
            <Label className="text-xs text-slate-600 dark:text-slate-400">Pre-made Palettes</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(COLOR_PALETTES).map(([key, palette]) => (
                <button
                  key={key}
                  onClick={() => applyColorPalette(key)}
                  className="group relative p-3 border-2 border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-500 transition-all"
                >
                  <div className="flex gap-1 mb-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.colors.primary }} />
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: palette.colors.secondary }} />
                    <div className="w-6 h-6 rounded border border-slate-300" style={{ backgroundColor: palette.colors.background }} />
                  </div>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{palette.name}</p>
                  {customization?.color_scheme === palette.colors.primary && (
                    <Check className="w-4 h-4 text-blue-600 absolute top-2 right-2" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Color Swatches */}
          <div className="space-y-3">
            <Label className="text-xs text-slate-600 dark:text-slate-400">Quick Colors</Label>
            <div className="grid grid-cols-5 gap-2">
              {COLOR_SWATCHES.map((color) => (
                <button
                  key={color}
                  onClick={() => updateCustomization("color_scheme", color)}
                  className="relative w-12 h-12 rounded-lg border-2 border-slate-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                >
                  {customization?.color_scheme === color && (
                    <Check className="w-4 h-4 text-white absolute inset-0 m-auto drop-shadow-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Picker */}
          <div className="space-y-3 mt-4">
            <button
              onClick={() => setShowCustomColorPicker(!showCustomColorPicker)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              {showCustomColorPicker ? "Hide" : "Use"} custom color
            </button>
            
            {showCustomColorPicker && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={customization?.color_scheme || "#2563EB"}
                    onChange={(e) => updateCustomization("color_scheme", e.target.value)}
                    className="w-16 h-16 rounded-lg cursor-pointer border-2 border-slate-200"
                  />
                  <div className="flex-1">
                    <Label className="text-xs mb-1">Primary Color</Label>
                    <Input
                      value={customization?.color_scheme || "#2563EB"}
                      onChange={(e) => updateCustomization("color_scheme", e.target.value)}
                      placeholder="#2563EB"
                      className="h-8 text-xs"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700" />

        {/* SPACING Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Layout className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Spacing</h3>
          </div>

          <div className="space-y-6">
            {/* Page Margins */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Page Margins</Label>
                <span className="text-xs font-mono text-slate-500">{customization?.page_padding || 16}px</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Narrow</span>
                <Slider
                  value={[customization?.page_padding || 16]}
                  onValueChange={(v) => updateCustomization("page_padding", v[0])}
                  min={8}
                  max={32}
                  step={4}
                  className="flex-1"
                />
                <span className="text-xs text-slate-500">Wide</span>
              </div>
            </div>

            {/* Section Spacing */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Section Spacing</Label>
                <span className="text-xs font-mono text-slate-500">{customization?.section_spacing || 24}px</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Compact</span>
                <Slider
                  value={[customization?.section_spacing || 24]}
                  onValueChange={(v) => updateCustomization("section_spacing", v[0])}
                  min={12}
                  max={40}
                  step={4}
                  className="flex-1"
                />
                <span className="text-xs text-slate-500">More</span>
              </div>
            </div>

            {/* Quick Presets */}
            <div>
              <Label className="text-xs text-slate-600 dark:text-slate-400 mb-2 block">Quick Presets</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    updateCustomization("spacing", "compact");
                    updateCustomization("page_padding", 12);
                    updateCustomization("section_spacing", 16);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                    customization?.spacing === "compact"
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Compact
                </button>
                <button
                  onClick={() => {
                    updateCustomization("spacing", "comfortable");
                    updateCustomization("page_padding", 16);
                    updateCustomization("section_spacing", 24);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                    customization?.spacing === "comfortable"
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => {
                    updateCustomization("spacing", "spacious");
                    updateCustomization("page_padding", 24);
                    updateCustomization("section_spacing", 32);
                  }}
                  className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                    customization?.spacing === "spacious"
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Spacious
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700" />

        {/* FONTS Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wide">Fonts</h3>
          </div>

          <div className="space-y-4">
            {/* Font Selector */}
            <div>
              <Label className="text-xs text-slate-600 dark:text-slate-400 mb-2 block">Font Family</Label>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                {FONT_OPTIONS.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => updateCustomization("font_family", font.name)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all border-2 ${
                      customization?.font_family === font.name
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    style={{ fontFamily: font.family }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{font.name}</span>
                      {customization?.font_family === font.name && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1" style={{ fontFamily: font.family }}>
                      The quick brown fox jumps
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Size Preset */}
            <div>
              <Label className="text-xs text-slate-600 dark:text-slate-400 mb-2 block">Font Size</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => updateCustomization("font_size", "small")}
                  className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                    customization?.font_size === "small"
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => updateCustomization("font_size", "medium")}
                  className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                    customization?.font_size === "medium"
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => updateCustomization("font_size", "large")}
                  className={`px-3 py-2 text-xs rounded-lg border transition-colors ${
                    customization?.font_size === "large"
                      ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Large
                </button>
              </div>
            </div>

            {/* Line Height */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs text-slate-600 dark:text-slate-400">Line Height</Label>
                <span className="text-xs font-mono text-slate-500">{customization?.line_height || 1.6}</span>
              </div>
              <Slider
                value={[customization?.line_height || 1.6]}
                onValueChange={(v) => updateCustomization("line_height", v[0])}
                min={1.2}
                max={2.0}
                step={0.1}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700" />

        {/* Heading Style */}
        <div>
          <Label className="text-xs text-slate-600 dark:text-slate-400 mb-2 block">Heading Style</Label>
          <div className="grid grid-cols-2 gap-2">
            {["bold", "uppercase", "underline", "italic"].map((style) => (
              <button
                key={style}
                onClick={() => updateCustomization("heading_style", style)}
                className={`px-3 py-2 text-xs rounded-lg border transition-colors capitalize ${
                  customization?.heading_style === style
                    ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20"
                    : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
