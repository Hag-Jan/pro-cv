import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Plus, X } from "lucide-react";

export default function InterestsSection({ data, onChange }) {
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    if (newInterest.trim() && !data.includes(newInterest.trim())) {
      onChange([...data, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove) => {
    onChange(data.filter(interest => interest !== interestToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addInterest();
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-green-200/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-900">
          <Heart className="w-5 h-5" />
          Interests & Hobbies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add an interest (e.g., Photography, Hiking, Volunteering)"
            className="flex-1"
          />
          <Button onClick={addInterest} size="icon" variant="outline" className="border-green-200 hover:bg-green-50">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Heart className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No interests added yet. Share your passions and hobbies.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {data.map((interest, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-red-100 text-red-800 hover:bg-red-200 transition-colors group"
              >
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-2 hover:text-red-600 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}