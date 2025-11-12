import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookOpen, Plus, X } from "lucide-react";

export default function PublicationsSection({ data, onChange }) {
  const addPublication = () => {
    const newPublication = {
      title: "",
      publisher: "",
      date: "",
      url: ""
    };
    onChange([...data, newPublication]);
  };

  const removePublication = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updatePublication = (index, field, value) => {
    const updated = data.map((pub, i) => 
      i === index ? { ...pub, [field]: value } : pub
    );
    onChange(updated);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-green-200/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <BookOpen className="w-5 h-5" />
            Publications
          </CardTitle>
          <Button onClick={addPublication} size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Publication
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No publications added yet. Add your academic publications or articles.</p>
          </div>
        ) : (
          data.map((publication, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">Publication {index + 1}</h3>
                <Button 
                  onClick={() => removePublication(index)} 
                  size="sm" 
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <Label>Publication Title</Label>
                <Input
                  value={publication.title || ""}
                  onChange={(e) => updatePublication(index, 'title', e.target.value)}
                  placeholder="Title of your publication or article"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Publisher / Journal</Label>
                  <Input
                    value={publication.publisher || ""}
                    onChange={(e) => updatePublication(index, 'publisher', e.target.value)}
                    placeholder="Journal Name / Publisher"
                  />
                </div>
                <div>
                  <Label>Publication Date</Label>
                  <Input
                    type="month"
                    value={publication.date || ""}
                    onChange={(e) => updatePublication(index, 'date', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label>URL (Optional)</Label>
                <Input
                  value={publication.url || ""}
                  onChange={(e) => updatePublication(index, 'url', e.target.value)}
                  placeholder="https://journal.com/article"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}