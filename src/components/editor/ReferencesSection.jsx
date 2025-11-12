import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Users, Plus, X } from "lucide-react";

export default function ReferencesSection({ data, onChange }) {
  const addReference = () => {
    const newReference = {
      name: "",
      position: "",
      company: "",
      email: "",
      phone: ""
    };
    onChange([...data, newReference]);
  };

  const removeReference = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateReference = (index, field, value) => {
    const updated = data.map((ref, i) => 
      i === index ? { ...ref, [field]: value } : ref
    );
    onChange(updated);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-green-200/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Users className="w-5 h-5" />
            References
          </CardTitle>
          <Button onClick={addReference} size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Reference
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No references added yet. Add professional references who can vouch for you.</p>
          </div>
        ) : (
          data.map((reference, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">Reference {index + 1}</h3>
                <Button 
                  onClick={() => removeReference(index)} 
                  size="sm" 
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={reference.name || ""}
                    onChange={(e) => updateReference(index, 'name', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={reference.position || ""}
                    onChange={(e) => updateReference(index, 'position', e.target.value)}
                    placeholder="Senior Manager"
                  />
                </div>
              </div>
              
              <div>
                <Label>Company</Label>
                <Input
                  value={reference.company || ""}
                  onChange={(e) => updateReference(index, 'company', e.target.value)}
                  placeholder="Company Name"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={reference.email || ""}
                    onChange={(e) => updateReference(index, 'email', e.target.value)}
                    placeholder="john.doe@company.com"
                  />
                </div>
                <div>
                  <Label>Phone (Optional)</Label>
                  <Input
                    value={reference.phone || ""}
                    onChange={(e) => updateReference(index, 'phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}