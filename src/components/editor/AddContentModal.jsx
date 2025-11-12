import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Search, Layers, Sparkles } from "lucide-react";

const builtInSections = [
  { id: "experience", name: "Experience", description: "Professional work history", icon: "💼" },
  { id: "education", name: "Education", description: "Academic background", icon: "🎓" },
  { id: "skills", name: "Skills", description: "Technical and soft skills", icon: "⚡" },
  { id: "projects", name: "Projects", description: "Portfolio projects", icon: "💻" },
  { id: "certificates", name: "Certificates", description: "Professional certifications", icon: "🏆" },
  { id: "languages", name: "Languages", description: "Language proficiencies", icon: "🌍" },
  { id: "interests", name: "Interests", description: "Hobbies and interests", icon: "❤️" },
  { id: "awards", name: "Awards", description: "Honors and recognitions", icon: "⭐" },
  { id: "publications", name: "Publications", description: "Published works", icon: "📚" },
  { id: "references", name: "References", description: "Professional references", icon: "👥" }
];

export default function AddContentModal({ open, onOpenChange, enabledSections, onAddSection }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("built-in");

  // Fetch custom sections
  const { data: customSections = [] } = useQuery({
    queryKey: ['customSections'],
    queryFn: async () => {
      const user = await base44.auth.me();
      return await base44.entities.CustomSection.filter(
        { created_by: user.email },
        '-created_date'
      );
    },
    initialData: [],
    enabled: open
  });

  const availableBuiltInSections = builtInSections.filter(
    section => !enabledSections.includes(section.id)
  );

  const filteredBuiltIn = availableBuiltInSections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCustom = customSections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddCustomSection = (customSection) => {
    const sectionId = `custom_${customSection.id}`;
    onAddSection(sectionId, customSection);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Plus className="w-6 h-6" />
            Add Section to Resume
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="built-in">
                <Sparkles className="w-4 h-4 mr-2" />
                Built-in Sections ({availableBuiltInSections.length})
              </TabsTrigger>
              <TabsTrigger value="custom">
                <Layers className="w-4 h-4 mr-2" />
                My Custom Sections ({customSections.length})
              </TabsTrigger>
            </TabsList>

            {/* Built-in Sections */}
            <TabsContent value="built-in" className="max-h-[50vh] overflow-y-auto">
              {filteredBuiltIn.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {availableBuiltInSections.length === 0 ? (
                    <p>All built-in sections have been added!</p>
                  ) : (
                    <p>No sections match your search.</p>
                  )}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredBuiltIn.map((section) => (
                    <Card
                      key={section.id}
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300"
                      onClick={() => {
                        onAddSection(section.id);
                        onOpenChange(false);
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{section.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{section.name}</h3>
                            <p className="text-sm text-gray-600">{section.description}</p>
                          </div>
                          <Button size="sm" variant="ghost" className="shrink-0">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Custom Sections */}
            <TabsContent value="custom" className="max-h-[50vh] overflow-y-auto">
              {customSections.length === 0 ? (
                <Card className="border-2 border-dashed border-gray-300">
                  <CardContent className="p-12 text-center">
                    <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No custom sections yet</h3>
                    <p className="text-gray-600 mb-4">
                      Create reusable custom sections in the Section Library
                    </p>
                    <Button
                      onClick={() => window.location.href = '/section-library'}
                      variant="outline"
                    >
                      <Layers className="w-4 h-4 mr-2" />
                      Go to Section Library
                    </Button>
                  </CardContent>
                </Card>
              ) : filteredCustom.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p>No sections match your search.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredCustom.map((section) => (
                    <Card
                      key={section.id}
                      className="hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-blue-300"
                      onClick={() => handleAddCustomSection(section)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-3xl">{section.icon || "📋"}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{section.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {section.description || "Custom section"}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {section.fields?.length || 0} fields
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {section.category}
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="shrink-0">
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}