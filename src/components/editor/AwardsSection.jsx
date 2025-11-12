import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Star, Plus, X } from "lucide-react";

export default function AwardsSection({ data, onChange }) {
  const addAward = () => {
    const newAward = {
      title: "",
      issuer: "",
      date: "",
      description: ""
    };
    onChange([...data, newAward]);
  };

  const removeAward = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateAward = (index, field, value) => {
    const updated = data.map((award, i) => 
      i === index ? { ...award, [field]: value } : award
    );
    onChange(updated);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-green-200/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Star className="w-5 h-5" />
            Awards & Achievements
          </CardTitle>
          <Button onClick={addAward} size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Award
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Star className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No awards added yet. Showcase your achievements and recognitions.</p>
          </div>
        ) : (
          data.map((award, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">Award {index + 1}</h3>
                <Button 
                  onClick={() => removeAward(index)} 
                  size="sm" 
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Award Title</Label>
                  <Input
                    value={award.title || ""}
                    onChange={(e) => updateAward(index, 'title', e.target.value)}
                    placeholder="Employee of the Year"
                  />
                </div>
                <div>
                  <Label>Issuer</Label>
                  <Input
                    value={award.issuer || ""}
                    onChange={(e) => updateAward(index, 'issuer', e.target.value)}
                    placeholder="Company Name / Organization"
                  />
                </div>
              </div>
              
              <div>
                <Label>Date Received</Label>
                <Input
                  type="month"
                  value={award.date || ""}
                  onChange={(e) => updateAward(index, 'date', e.target.value)}
                />
              </div>
              
              <div>
                <Label>Description (Optional)</Label>
                <Textarea
                  value={award.description || ""}
                  onChange={(e) => updateAward(index, 'description', e.target.value)}
                  placeholder="Brief description of the award and why you received it..."
                  rows={2}
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}