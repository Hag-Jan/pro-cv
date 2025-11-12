import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Copy, Eye, Layers, TrendingUp, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { value: "all", label: "All Categories" },
  { value: "professional", label: "Professional" },
  { value: "education", label: "Education" },
  { value: "skills", label: "Skills" },
  { value: "personal", label: "Personal" },
  { value: "creative", label: "Creative" },
  { value: "other", label: "Other" }
];

const fieldTypes = [
  { value: "text", label: "Text (Single Line)" },
  { value: "textarea", label: "Text Area (Multi-line)" },
  { value: "date", label: "Date" },
  { value: "number", label: "Number" },
  { value: "url", label: "URL" },
  { value: "email", label: "Email" },
  { value: "list", label: "List (Bullet Points)" },
  { value: "rich_text", label: "Rich Text" }
];

export default function SectionLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("my-sections");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  // Fetch user's custom sections
  const { data: mySections = [], refetch: refetchMySections } = useQuery({
    queryKey: ['customSections'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return await base44.entities.CustomSection.filter(
        { created_by: user.email },
        '-created_date'
      );
    },
    initialData: []
  });

  // Fetch community sections
  const { data: communitySections = [] } = useQuery({
    queryKey: ['communitySections'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return await base44.entities.CustomSection.filter(
        { is_public: true, created_by: { $ne: user.email } },
        '-usage_count'
      );
    },
    initialData: []
  });

  const filterSections = (sections) => {
    return sections.filter(section => {
      const matchesSearch = section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           section.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || section.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredMySections = filterSections(mySections);
  const filteredCommunitySections = filterSections(communitySections);

  const handleDelete = async (sectionId) => {
    if (!confirm("Are you sure you want to delete this section?")) return;
    
    try {
      await base44.entities.CustomSection.delete(sectionId);
      refetchMySections();
      alert("Section deleted successfully!");
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("Failed to delete section.");
    }
  };

  const handleDuplicate = async (section) => {
    try {
      const newSection = {
        name: `${section.name} (Copy)`,
        description: section.description,
        icon: section.icon,
        fields: section.fields,
        styling: section.styling,
        layout: section.layout,
        is_multiple: section.is_multiple,
        category: section.category,
        is_public: false,
        usage_count: 0,
        tags: section.tags || []
      };
      
      await base44.entities.CustomSection.create(newSection);
      refetchMySections();
      alert("Section duplicated successfully!");
    } catch (error) {
      console.error("Error duplicating section:", error);
      alert("Failed to duplicate section.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Layers className="w-10 h-10 text-blue-600" />
            Section Library
          </h1>
          <p className="text-gray-600 text-lg">
            Create, manage, and reuse custom resume sections across all your resumes
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-lg border-2 border-white/50">
          <CardContent className="p-6">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-64 h-12">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                onClick={() => {
                  setEditingSection(null);
                  setShowCreateDialog(true);
                }}
                className="h-12 bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Section
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-sections" className="text-base">
              <Layers className="w-4 h-4 mr-2" />
              My Sections ({mySections.length})
            </TabsTrigger>
            <TabsTrigger value="community" className="text-base">
              <Users className="w-4 h-4 mr-2" />
              Community ({communitySections.length})
            </TabsTrigger>
          </TabsList>

          {/* My Sections */}
          <TabsContent value="my-sections">
            {mySections.length === 0 ? (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="p-12 text-center">
                  <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No custom sections yet</h3>
                  <p className="text-gray-600 mb-6">
                    Create reusable sections with custom fields to use across multiple resumes
                  </p>
                  <Button
                    onClick={() => {
                      setEditingSection(null);
                      setShowCreateDialog(true);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Section
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMySections.map((section, index) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    index={index}
                    onEdit={() => {
                      setEditingSection(section);
                      setShowCreateDialog(true);
                    }}
                    onDelete={() => handleDelete(section.id)}
                    onDuplicate={() => handleDuplicate(section)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Community Sections */}
          <TabsContent value="community">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunitySections.map((section, index) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  index={index}
                  isCommunity={true}
                  onDuplicate={() => handleDuplicate(section)}
                />
              ))}
            </div>
            {filteredCommunitySections.length === 0 && (
              <Card className="border-2 border-dashed border-gray-300">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No community sections available yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Create/Edit Dialog */}
        <CreateSectionDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          section={editingSection}
          onSave={refetchMySections}
        />
      </div>
    </div>
  );
}

function SectionCard({ section, index, isCommunity = false, onEdit, onDelete, onDuplicate }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="hover:shadow-xl transition-all duration-300 border-2 border-white/50 hover:border-blue-300 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg mb-1 flex items-center gap-2">
                {section.icon && <span className="text-2xl">{section.icon}</span>}
                {section.name}
              </CardTitle>
              <p className="text-sm text-gray-600 line-clamp-2">{section.description}</p>
            </div>
            {isCommunity && (
              <Badge className="bg-purple-500 text-white">
                <Users className="w-3 h-3 mr-1" />
                Community
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{section.category}</Badge>
            <Badge variant="outline">{section.fields?.length || 0} fields</Badge>
            {section.usage_count > 0 && (
              <Badge variant="outline">
                <TrendingUp className="w-3 h-3 mr-1" />
                {section.usage_count} uses
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            {!isCommunity && onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onDuplicate} className="flex-1">
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
            {!isCommunity && onDelete && (
              <Button variant="outline" size="sm" onClick={onDelete} className="text-red-500">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function CreateSectionDialog({ open, onOpenChange, section, onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("📋");
  const [category, setCategory] = useState("other");
  const [isMultiple, setIsMultiple] = useState(false);
  const [layout, setLayout] = useState("single");
  const [fields, setFields] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  React.useEffect(() => {
    if (section) {
      setName(section.name || "");
      setDescription(section.description || "");
      setIcon(section.icon || "📋");
      setCategory(section.category || "other");
      setIsMultiple(section.is_multiple || false);
      setLayout(section.layout || "single");
      setFields(section.fields || []);
    } else {
      setName("");
      setDescription("");
      setIcon("📋");
      setCategory("other");
      setIsMultiple(false);
      setLayout("single");
      setFields([]);
    }
  }, [section, open]);

  const addField = () => {
    setFields([...fields, {
      name: "",
      label: "",
      type: "text",
      required: false,
      placeholder: ""
    }]);
  };

  const updateField = (index, key, value) => {
    const newFields = [...fields];
    newFields[index][key] = value;
    setFields(newFields);
  };

  const removeField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!name.trim() || fields.length === 0) {
      alert("Please provide a name and at least one field");
      return;
    }

    setIsSaving(true);
    try {
      const sectionData = {
        name: name.trim(),
        description: description.trim(),
        icon,
        category,
        is_multiple: isMultiple,
        layout,
        fields,
        styling: {},
        is_public: false,
        usage_count: section?.usage_count || 0,
        tags: [category]
      };

      if (section) {
        await base44.entities.CustomSection.update(section.id, sectionData);
      } else {
        await base44.entities.CustomSection.create(sectionData);
      }

      onSave();
      onOpenChange(false);
      alert(section ? "Section updated!" : "Section created!");
    } catch (error) {
      console.error("Error saving section:", error);
      alert("Failed to save section");
    }
    setIsSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {section ? "Edit Section" : "Create Custom Section"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Section Name *</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Volunteer Work"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Icon</label>
              <Input
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="📋"
                maxLength={2}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this section"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.filter(c => c.value !== 'all').map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Layout</label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Column</SelectItem>
                  <SelectItem value="two_column">Two Columns</SelectItem>
                  <SelectItem value="list">List</SelectItem>
                  <SelectItem value="grid">Grid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMultiple}
                  onChange={(e) => setIsMultiple(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium">Multiple Entries</span>
              </label>
            </div>
          </div>

          {/* Fields */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium">Fields *</label>
              <Button onClick={addField} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Add Field
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <Card key={index} className="p-4">
                  <div className="grid gap-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <Input
                        placeholder="Field name (e.g., organization)"
                        value={field.name}
                        onChange={(e) => updateField(index, 'name', e.target.value)}
                      />
                      <Input
                        placeholder="Label (e.g., Organization Name)"
                        value={field.label}
                        onChange={(e) => updateField(index, 'label', e.target.value)}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-3">
                      <Select
                        value={field.type}
                        onValueChange={(value) => updateField(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {fieldTypes.map(ft => (
                            <SelectItem key={ft.value} value={ft.value}>
                              {ft.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Input
                        placeholder="Placeholder text"
                        value={field.placeholder}
                        onChange={(e) => updateField(index, 'placeholder', e.target.value)}
                      />

                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={(e) => updateField(index, 'required', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Required</span>
                        </label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeField(index)}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {fields.length === 0 && (
                <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  <p>No fields added yet. Click "Add Field" to create fields.</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving || !name.trim() || fields.length === 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
            >
              {isSaving ? "Saving..." : section ? "Update Section" : "Create Section"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}