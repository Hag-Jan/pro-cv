import React from "react";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, ArrowRight, CheckCircle, Mail, Phone, MapPin, Briefcase, GraduationCap, Award, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { getTemplateComponent } from "../resume-templates/index";

export default function TemplatePreviewModal({ template, onClose, onUse }) {
  const TemplateComponent = getTemplateComponent(template.id);
  const resumeData = template.resumeData || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2
                id="modal-title"
                className="text-3xl font-black text-gray-900"
              >
                {template.name}
              </h2>
              {template.atsFriendly && (
                <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  ATS Friendly
                </span>
              )}
            </div>
            <p className="text-gray-600 text-lg">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-white/80 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left: Structured Resume Data */}
            <div className="space-y-6">
              {/* Personal Info */}
              {resumeData.name && (
                <div className="bg-white rounded-xl border-2 border-gray-100 p-6 shadow-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {resumeData.name}
                  </h3>
                  {resumeData.title && (
                    <p className="text-lg font-semibold mb-4" style={{ color: template.primaryColor }}>
                      {resumeData.title}
                    </p>
                  )}
                  
                  {resumeData.contact && (
                    <div className="space-y-2 text-sm text-gray-600">
                      {resumeData.contact.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" style={{ color: template.primaryColor }} />
                          <span>{resumeData.contact.email}</span>
                        </div>
                      )}
                      {resumeData.contact.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" style={{ color: template.primaryColor }} />
                          <span>{resumeData.contact.phone}</span>
                        </div>
                      )}
                      {resumeData.contact.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" style={{ color: template.primaryColor }} />
                          <span>{resumeData.contact.location}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Professional Summary */}
              {resumeData.summary && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <div className="w-1 h-4 rounded" style={{ backgroundColor: template.primaryColor }} />
                    Professional Summary
                  </h4>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-4">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experience && resumeData.experience.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" style={{ color: template.primaryColor }} />
                    Professional Experience
                  </h4>
                  <div className="space-y-4">
                    {resumeData.experience.slice(0, 2).map((exp, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4 border-l-4" style={{ borderColor: template.primaryColor }}>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="text-sm font-bold text-gray-900">{exp.position}</h5>
                            <p className="text-sm font-semibold" style={{ color: template.primaryColor }}>
                              {exp.company}
                            </p>
                            {exp.location && (
                              <p className="text-xs text-gray-500">{exp.location}</p>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                            {exp.dates}
                          </span>
                        </div>
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="space-y-1.5 mt-3">
                            {exp.bullets.slice(0, 2).map((bullet, bidx) => (
                              <li key={bidx} className="text-xs text-gray-700 leading-relaxed flex items-start gap-2">
                                <span className="text-gray-400 mt-0.5">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education && resumeData.education.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" style={{ color: template.primaryColor }} />
                    Education
                  </h4>
                  <div className="space-y-3">
                    {resumeData.education.map((edu, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                        <p className="text-sm font-semibold" style={{ color: template.primaryColor }}>
                          {edu.institution}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          {edu.location && <span>{edu.location}</span>}
                          {edu.location && edu.year && <span>•</span>}
                          {edu.year && <span>{edu.year}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills && resumeData.skills.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" style={{ color: template.primaryColor }} />
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1.5 rounded-full font-medium"
                        style={{
                          backgroundColor: `${template.primaryColor}15`,
                          color: template.primaryColor,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {resumeData.languages && resumeData.languages.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Globe className="w-4 h-4" style={{ color: template.primaryColor }} />
                    Languages
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {resumeData.languages.map((lang, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {lang.language}
                        </p>
                        <p className="text-xs text-gray-600">{lang.proficiency}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" style={{ color: template.primaryColor }} />
                    Certifications
                  </h4>
                  <ul className="space-y-2">
                    {resumeData.certifications.map((cert, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-700 bg-gray-50 rounded-lg p-3 flex items-start gap-2"
                      >
                        <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: template.primaryColor }} />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Template Details */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                  Template Details
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-xs text-gray-600 font-medium">Category</span>
                    <span className="capitalize font-bold text-gray-900 text-sm">
                      {template.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-xs text-gray-600 font-medium">Font</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {template.font}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="text-xs text-gray-600 font-medium">
                      Primary Color
                    </span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: template.primaryColor }}
                      />
                      <span className="font-mono text-xs text-gray-600">
                        {template.primaryColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Live Template Preview */}
            <div className="sticky top-0">
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Preview
              </h4>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
                <div
                  className="bg-white overflow-auto"
                  style={{ height: "600px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        transform: "scale(0.35)",
                        transformOrigin: "top center",
                        width: "210mm",
                        height: "297mm",
                      }}
                    >
                      {TemplateComponent && (
                        <TemplateComponent
                          resume={{
                            personal_info: {
                              full_name: resumeData.name,
                              professional_title: resumeData.title,
                              email: resumeData.contact?.email,
                              phone: resumeData.contact?.phone,
                              location: resumeData.contact?.location,
                              summary: resumeData.summary,
                            },
                            experience: resumeData.experience || [],
                            education: resumeData.education || [],
                            skills: resumeData.skills || [],
                            languages: resumeData.languages || [],
                            certificates: resumeData.certifications || [],
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">✨ Pro Tip:</span> All sections
              are fully customizable after you select this template
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => window.open(template.previewPdfUrl, "_blank")}
                className="font-semibold border-2"
                disabled={!template.previewPdfUrl}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Preview
              </Button>
              <Button
                onClick={onUse}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold px-8 shadow-lg hover:shadow-xl transition-all"
              >
                Use This Template
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}