import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X, GripVertical } from "lucide-react";

export default function CustomSectionComponent({ section, data, onChange, dragHandleProps, onRemove }) {
  const addEntry = () => {
    const newEntry = {};
    section.fields.forEach(field => {
      newEntry[field.name] = field.type === 'list' ? [''] : '';
    });
    onChange([...data, newEntry]);
  };

  const removeEntry = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEntry = (index, fieldName, value) => {
    const newData = [...data];
    newData[index][fieldName] = value;
    onChange(newData);
  };

  const addListItem = (entryIndex, fieldName) => {
    const newData = [...data];
    if (!Array.isArray(newData[entryIndex][fieldName])) {
      newData[entryIndex][fieldName] = [];
    }
    newData[entryIndex][fieldName].push('');
    onChange(newData);
  };

  const updateListItem = (entryIndex, fieldName, itemIndex, value) => {
    const newData = [...data];
    newData[entryIndex][fieldName][itemIndex] = value;
    onChange(newData);
  };

  const removeListItem = (entryIndex, fieldName, itemIndex) => {
    const newData = [...data];
    newData[entryIndex][fieldName] = newData[entryIndex][fieldName].filter((_, i) => i !== itemIndex);
    onChange(newData);
  };

  const renderField = (entry, entryIndex, field) => {
    const fieldValue = entry[field.name] || (field.type === 'list' ? [''] : '');

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={fieldValue}
            onChange={(e) => updateEntry(entryIndex, field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={3}
            className="text-sm"
          />
        );

      case 'list':
        return (
          <div className="space-y-2">
            {(Array.isArray(fieldValue) ? fieldValue : ['']).map((item, itemIndex) => (
              <div key={itemIndex} className="flex gap-2">
                <Textarea
                  value={item}
                  onChange={(e) => updateListItem(entryIndex, field.name, itemIndex, e.target.value)}
                  placeholder={field.placeholder}
                  rows={2}
                  className="flex-1 text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeListItem(entryIndex, field.name, itemIndex)}
                  className="text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => addListItem(entryIndex, field.name)}
              className="text-xs"
            >
              <Plus className="w-3 h-3 mr-1" />
              Add Item
            </Button>
          </div>
        );

      case 'date':
        return (
          <Input
            type="date"
            value={fieldValue}
            onChange={(e) => updateEntry(entryIndex, field.name, e.target.value)}
            className="text-sm"
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            value={fieldValue}
            onChange={(e) => updateEntry(entryIndex, field.name, e.target.value)}
            placeholder={field.placeholder}
            className="text-sm"
          />
        );

      case 'url':
        return (
          <Input
            type="url"
            value={fieldValue}
            onChange={(e) => updateEntry(entryIndex, field.name, e.target.value)}
            placeholder={field.placeholder}
            className="text-sm"
          />
        );

      case 'email':
        return (
          <Input
            type="email"
            value={fieldValue}
            onChange={(e) => updateEntry(entryIndex, field.name, e.target.value)}
            placeholder={field.placeholder}
            className="text-sm"
          />
        );

      default: // text
        return (
          <Input
            value={fieldValue}
            onChange={(e) => updateEntry(entryIndex, field.name, e.target.value)}
            placeholder={field.placeholder}
            className="text-sm"
          />
        );
    }
  };

  return (
    <Card className="bg-[#F8FAFC] border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      <CardHeader className="pb-3 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-gray-900 text-lg font-bold">
            {section.icon && <span className="text-xl">{section.icon}</span>}
            {section.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            {section.is_multiple && (
              <Button onClick={addEntry} size="sm" variant="ghost" className="h-8 text-xs text-green-600 hover:bg-green-50">
                <Plus className="w-3.5 h-3.5 mr-1" />
                Add
              </Button>
            )}
            <div {...dragHandleProps} className="cursor-grab hover:bg-gray-200 p-1.5 rounded-lg transition-colors">
              <GripVertical className="w-4 h-4 text-gray-400" />
            </div>
            {onRemove && (
              <Button onClick={onRemove} size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-500 hover:bg-red-50">
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {data.length === 0 && section.is_multiple ? (
          <div className="text-center py-6 text-gray-400">
            <p className="text-xs">No entries added yet</p>
          </div>
        ) : section.is_multiple ? (
          data.map((entry, entryIndex) => (
            <div key={entryIndex} className="border border-gray-200 rounded-xl p-3 space-y-3 bg-white">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900 text-sm">Entry {entryIndex + 1}</h3>
                <Button
                  onClick={() => removeEntry(entryIndex)}
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </div>

              {section.fields.map((field) => (
                <div key={field.name}>
                  <Label className="text-xs font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  <div className="mt-1">
                    {renderField(entry, entryIndex, field)}
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="space-y-3">
            {section.fields.map((field) => (
              <div key={field.name}>
                <Label className="text-xs font-medium text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <div className="mt-1">
                  {renderField(data[0] || {}, 0, field)}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}