import React, { useState } from "react";
import { Plus, Trash2, GripVertical, Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ControlledInput } from "./ControlledInputs";

export default function EducationSection({ education = [], onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addEducation = () => {
    const newEducation = {
      degree: "",
      institution: "",
      location: "",
      graduation_year: "",
      gpa: ""
    };
    onChange([...education, newEducation]);
    setExpandedIndex(education.length);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteEducation = (index) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(education);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange(items);
  };

  return (
    <div className="space-y-3">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="education-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {education.map((edu, index) => (
                <Draggable key={`edu-${index}`} draggableId={`edu-${index}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white rounded-lg border-2 transition-all ${
                        snapshot.isDragging ? 'border-[#6C3FE4] shadow-lg' : 'border-gray-200'
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-2 p-3 cursor-pointer hover:bg-gray-50"
                           onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {edu.degree || "New Education"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {edu.institution || "Institution"}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteEducation(index);
                          }}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Expanded Form */}
                      {expandedIndex === index && (
                        <div className="p-4 pt-0 space-y-3 border-t border-gray-100">
                          <div>
                            <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                              Degree/Certification
                            </Label>
                            <ControlledInput
                              value={edu.degree || ""}
                              onChange={(value) => updateEducation(index, 'degree', value)}
                              placeholder="e.g., Bachelor of Science in Computer Science"
                              className="h-9 text-sm"
                            />
                          </div>

                          <div>
                            <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                              Institution
                            </Label>
                            <ControlledInput
                              value={edu.institution || ""}
                              onChange={(value) => updateEducation(index, 'institution', value)}
                              placeholder="e.g., Stanford University"
                              className="h-9 text-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                                Location
                              </Label>
                              <ControlledInput
                                value={edu.location || ""}
                                onChange={(value) => updateEducation(index, 'location', value)}
                                placeholder="e.g., Stanford, CA"
                                className="h-9 text-sm"
                              />
                            </div>

                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Graduation Year
                              </Label>
                              <ControlledInput
                                value={edu.graduation_year || ""}
                                onChange={(value) => updateEducation(index, 'graduation_year', value)}
                                placeholder="e.g., 2024"
                                className="h-9 text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                              GPA (Optional)
                            </Label>
                            <ControlledInput
                              value={edu.gpa || ""}
                              onChange={(value) => updateEducation(index, 'gpa', value)}
                              placeholder="e.g., 3.8/4.0"
                              className="h-9 text-sm"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        onClick={addEducation}
        variant="outline"
        className="w-full border-dashed border-2 border-[#6C3FE4] text-[#6C3FE4] hover:bg-[#6C3FE4]/5 h-12"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Education
      </Button>
    </div>
  );
}