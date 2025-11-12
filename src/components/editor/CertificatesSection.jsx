import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Award, Plus, X } from "lucide-react";

export default function CertificatesSection({ data, onChange }) {
  const addCertificate = () => {
    const newCertificate = {
      name: "",
      issuer: "",
      date: "",
      description: ""
    };
    onChange([...data, newCertificate]);
  };

  const removeCertificate = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCertificate = (index, field, value) => {
    const updated = data.map((cert, i) => 
      i === index ? { ...cert, [field]: value } : cert
    );
    onChange(updated);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-green-200/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Award className="w-5 h-5" />
            Certificates
          </CardTitle>
          <Button onClick={addCertificate} size="sm" variant="outline" className="border-green-200 hover:bg-green-50">
            <Plus className="w-4 h-4 mr-2" />
            Add Certificate
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>No certificates added yet. Add your professional certifications.</p>
          </div>
        ) : (
          data.map((certificate, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-gray-900">Certificate {index + 1}</h3>
                <Button 
                  onClick={() => removeCertificate(index)} 
                  size="sm" 
                  variant="ghost"
                  className="text-red-500 hover:bg-red-50"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Certificate Name</Label>
                  <Input
                    value={certificate.name || ""}
                    onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                    placeholder="AWS Certified Solutions Architect"
                  />
                </div>
                <div>
                  <Label>Issuing Organization</Label>
                  <Input
                    value={certificate.issuer || ""}
                    onChange={(e) => updateCertificate(index, 'issuer', e.target.value)}
                    placeholder="Amazon Web Services"
                  />
                </div>
              </div>
              
              <div>
                <Label>Issue Date</Label>
                <Input
                  type="month"
                  value={certificate.date || ""}
                  onChange={(e) => updateCertificate(index, 'date', e.target.value)}
                />
              </div>
              
              <div>
                <Label>Description (Optional)</Label>
                <Textarea
                  value={certificate.description || ""}
                  onChange={(e) => updateCertificate(index, 'description', e.target.value)}
                  placeholder="Brief description of the certification..."
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