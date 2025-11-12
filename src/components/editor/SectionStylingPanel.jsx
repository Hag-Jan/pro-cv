import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Palette, Type, Box, Ruler, X, Save } from "lucide-react";

export default function SectionStylingPanel({ sectionId, currentStyles = {}, onSave, onClose }) {
  const [styling, setStyling] = useState(currentStyles);

  const updateStyle = (key, value) => {
    setStyling(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(styling);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white border-2 border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-3 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Section Styling
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="colors" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="colors" className="text-xs">
                <Palette className="w-3 h-3 mr-1" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="borders" className="text-xs">
                <Box className="w-3 h-3 mr-1" />
                Borders
              </TabsTrigger>
              <TabsTrigger value="spacing" className="text-xs">
                <Ruler className="w-3 h-3 mr-1" />
                Spacing
              </TabsTrigger>
              <TabsTrigger value="typography" className="text-xs">
                <Type className="w-3 h-3 mr-1" />
                Text
              </TabsTrigger>
            </TabsList>

            {/* Colors Tab */}
            <TabsContent value="colors" className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styling.background_color || "#ffffff"}
                    onChange={(e) => updateStyle('background_color', e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styling.background_color || "#ffffff"}
                    onChange={(e) => updateStyle('background_color', e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1 h-10 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs mb-2 block">Heading Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styling.heading_color || "#000000"}
                    onChange={(e) => updateStyle('heading_color', e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styling.heading_color || "#000000"}
                    onChange={(e) => updateStyle('heading_color', e.target.value)}
                    placeholder="#000000"
                    className="flex-1 h-10 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs mb-2 block">Text Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={styling.text_color || "#374151"}
                    onChange={(e) => updateStyle('text_color', e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={styling.text_color || "#374151"}
                    onChange={(e) => updateStyle('text_color', e.target.value)}
                    placeholder="#374151"
                    className="flex-1 h-10 font-mono text-sm"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Borders Tab */}
            <TabsContent value="borders" className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">Border Style</Label>
                <Select
                  value={styling.border_style || "none"}
                  onValueChange={(value) => updateStyle('border_style', value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="solid">Solid</SelectItem>
                    <SelectItem value="dashed">Dashed</SelectItem>
                    <SelectItem value="dotted">Dotted</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {styling.border_style && styling.border_style !== 'none' && (
                <>
                  <div>
                    <Label className="text-xs mb-2 block">
                      Border Width: {styling.border_width || 0}px
                    </Label>
                    <Slider
                      value={[styling.border_width || 0]}
                      onValueChange={(values) => updateStyle('border_width', values[0])}
                      min={0}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <Label className="text-xs mb-2 block">Border Color</Label>
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={styling.border_color || "#d1d5db"}
                        onChange={(e) => updateStyle('border_color', e.target.value)}
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={styling.border_color || "#d1d5db"}
                        onChange={(e) => updateStyle('border_color', e.target.value)}
                        placeholder="#d1d5db"
                        className="flex-1 h-10 font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs mb-2 block">
                      Border Radius: {styling.border_radius || 0}px
                    </Label>
                    <Slider
                      value={[styling.border_radius || 0]}
                      onValueChange={(values) => updateStyle('border_radius', values[0])}
                      min={0}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </>
              )}
            </TabsContent>

            {/* Spacing Tab */}
            <TabsContent value="spacing" className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">
                  Padding: {styling.padding || 0}px
                </Label>
                <Slider
                  value={[styling.padding || 0]}
                  onValueChange={(values) => updateStyle('padding', values[0])}
                  min={0}
                  max={48}
                  step={4}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-xs mb-2 block">
                  Margin Top: {styling.margin_top || 0}px
                </Label>
                <Slider
                  value={[styling.margin_top || 0]}
                  onValueChange={(values) => updateStyle('margin_top', values[0])}
                  min={0}
                  max={48}
                  step={4}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-xs mb-2 block">
                  Margin Bottom: {styling.margin_bottom || 0}px
                </Label>
                <Slider
                  value={[styling.margin_bottom || 0]}
                  onValueChange={(values) => updateStyle('margin_bottom', values[0])}
                  min={0}
                  max={48}
                  step={4}
                  className="w-full"
                />
              </div>
            </TabsContent>

            {/* Typography Tab */}
            <TabsContent value="typography" className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">Heading Size</Label>
                <Select
                  value={styling.heading_size || "medium"}
                  onValueChange={(value) => updateStyle('heading_size', value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xlarge">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs mb-2 block">Heading Weight</Label>
                <Select
                  value={styling.heading_weight || "bold"}
                  onValueChange={(value) => updateStyle('heading_weight', value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="semibold">Semibold</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs mb-2 block">Text Size</Label>
                <Select
                  value={styling.text_size || "base"}
                  onValueChange={(value) => updateStyle('text_size', value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xs">Extra Small</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="base">Base</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs mb-2 block">Text Alignment</Label>
                <Select
                  value={styling.text_align || "left"}
                  onValueChange={(value) => updateStyle('text_align', value)}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="justify">Justify</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="flex gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
              <Save className="w-4 h-4 mr-2" />
              Apply Styling
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}