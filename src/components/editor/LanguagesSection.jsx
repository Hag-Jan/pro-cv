import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, Plus, X } from "lucide-react";

export default function LanguagesSection({ data, onChange }) {
  const addLanguage = () => {
    const newLanguage = {
      language: "",
      proficiency: "intermediate"
    };
    onChange([...data, newLanguage]);
  };

  const removeLanguage = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateLanguage = (index, field, value) => {
    const updated = data.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    );
    onChange(updated);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-green-200/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Globe className="w-5 h-5" />
            Languages
          </CardTitle>
          <Button onClick={addLanguage} size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Language
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No languages added yet. Add the languages you speak.</p>
          </div>
        ) : (
          data.map((language, index) => (
            <div key={index} className="flex gap-4 items-end border border-gray-200 rounded-lg p-4">
              <div className="flex-1">
                <Label>Language</Label>
                <Input
                  value={language.language || ""}
                  onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                  placeholder="English, Spanish, French..."
                />
              </div>
              
              <div className="flex-1">
                <Label>Proficiency</Label>
                <Select
                  value={language.proficiency || "intermediate"}
                  onValueChange={(value) => updateLanguage(index, 'proficiency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="native">Native</SelectItem>
                    <SelectItem value="fluent">Fluent</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={() => removeLanguage(index)} 
                size="sm" 
                variant="ghost"
                className="text-red-500 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}