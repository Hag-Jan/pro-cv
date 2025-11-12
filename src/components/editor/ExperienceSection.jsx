import React, { useState } from "react";
import { Plus, Trash2, GripVertical, Calendar, Briefcase } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { ControlledInput, ControlledTextarea } from "./ControlledInputs";

export default function ExperienceSection({ experience = [], onChange }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const addExperience = () => {
    const newExperience = {
      title: "",
      company: "",
      location: "",
      start_date: "",
      end_date: "",
      current: false,
      bullets: [""]
    };
    onChange([...experience, newExperience]);
    setExpandedIndex(experience.length);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...experience];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const updateBullet = (expIndex, bulletIndex, value) => {
    const updated = [...experience];
    updated[expIndex].bullets[bulletIndex] = value;
    onChange(updated);
  };

  const addBullet = (expIndex) => {
    const updated = [...experience];
    updated[expIndex].bullets.push("");
    onChange(updated);
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const updated = [...experience];
    updated[expIndex].bullets.splice(bulletIndex, 1);
    onChange(updated);
  };

  const deleteExperience = (index) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(experience);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange(items);
  };

  return (
    <div className="space-y-3">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="experience-list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
              {experience.map((exp, index) => (
                <Draggable key={`exp-${index}`} draggableId={`exp-${index}`} index={index}>
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
                        <Briefcase className="w-4 h-4 text-[#6C3FE4]" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {exp.title || "New Position"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {exp.company || "Company"}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteExperience(index);
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
                              Job Title
                            </Label>
                            <ControlledInput
                              value={exp.title || ""}
                              onChange={(value) => updateExperience(index, 'title', value)}
                              placeholder="e.g., Senior Software Engineer"
                              className="h-9 text-sm"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                                Company
                              </Label>
                              <ControlledInput
                                value={exp.company || ""}
                                onChange={(value) => updateExperience(index, 'company', value)}
                                placeholder="e.g., Google"
                                className="h-9 text-sm"
                              />
                            </div>

                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                                Location
                              </Label>
                              <ControlledInput
                                value={exp.location || ""}
                                onChange={(value) => updateExperience(index, 'location', value)}
                                placeholder="e.g., San Francisco, CA"
                                className="h-9 text-sm"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                                <Calendar className="w-3 h-3 inline mr-1" />
                                Start Date
                              </Label>
                              <ControlledInput
                                type="month"
                                value={exp.start_date || ""}
                                onChange={(value) => updateExperience(index, 'start_date', value)}
                                className="h-9 text-sm"
                              />
                            </div>

                            <div>
                              <Label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                                End Date
                              </Label>
                              <div className="space-y-2">
                                <ControlledInput
                                  type="month"
                                  value={exp.end_date || ""}
                                  onChange={(value) => updateExperience(index, 'end_date', value)}
                                  disabled={exp.current}
                                  className="h-9 text-sm"
                                />
                                <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={exp.current || false}
                                    onChange={(e) => updateExperience(index, 'current', e.target.checked)}
                                    className="rounded border-gray-300"
                                  />
                                  Currently working here
                                </label>
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label className="text-xs font-semibold text-gray-700 mb-2 block">
                              Key Achievements
                            </Label>
                            <div className="space-y-2">
                              {(exp.bullets || []).map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="flex gap-2">
                                  <ControlledTextarea
                                    value={bullet}
                                    onChange={(value) => updateBullet(index, bulletIndex, value)}
                                    placeholder="Describe your achievement or responsibility..."
                                    className="text-sm min-h-[60px]"
                                  />
                                  {exp.bullets.length > 1 && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeBullet(index, bulletIndex)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                              ))}
                              <Button
                                onClick={() => addBullet(index)}
                                variant="outline"
                                size="sm"
                                className="w-full text-xs"
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add Bullet Point
                              </Button>
                            </div>
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
        onClick={addExperience}
        variant="outline"
        className="w-full border-dashed border-2 border-[#6C3FE4] text-[#6C3FE4] hover:bg-[#6C3FE4]/5 h-12"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}