import React, { useState } from "react";
import { Plus, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ControlledInput } from "./ControlledInputs";

export default function SkillsSection({ skills = [], onChange }) {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim()) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <ControlledInput
          value={newSkill}
          onChange={setNewSkill}
          onKeyPress={handleKeyPress}
          placeholder="e.g., JavaScript, Project Management..."
          className="h-9 text-sm"
        />
        <Button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="bg-[#6C3FE4] hover:bg-[#5A2FD4] text-white px-4"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
          {skills.map((skill, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="pl-3 pr-1 py-1.5 bg-white border border-gray-200 hover:border-[#6C3FE4] transition-colors group"
            >
              <Zap className="w-3 h-3 mr-1.5 text-[#6C3FE4]" />
              <span className="text-sm font-medium text-gray-900">{skill}</span>
              <button
                onClick={() => removeSkill(index)}
                className="ml-2 rounded-full p-0.5 hover:bg-red-100 transition-colors"
              >
                <X className="w-3 h-3 text-gray-400 hover:text-red-600" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}