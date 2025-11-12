import React from "react";
import { Mail, Phone, MapPin, Code } from "lucide-react";

export default function CobaltTech({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#1E40AF";
  const fontFamily = customization.font_family || "Roboto Mono, monospace";
  const lineHeight = customization.line_height || 1.6;

  const personal = resume.personal_info || {};
  const experience = resume.experience || [];
  const education = resume.education || [];
  const skills = resume.skills || [];
  const languages = resume.languages || [];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div 
      className="w-[210mm] min-h-[297mm] mx-auto bg-white" 
      style={{ fontFamily: "Inter, system-ui, sans-serif", lineHeight }}
    >
      {/* Left Accent Line */}
      <div className="flex h-full">
        <div className="w-2" style={{ backgroundColor: primaryColor }} />
        
        <div className="flex-1 px-12 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2" style={{ fontFamily: "Roboto Mono, monospace" }}>
              {personal.full_name || "Your Name"}
            </h1>
            <p className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              {personal.professional_title || "Professional Title"}
            </p>
            
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              {personal.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          {personal.summary && (
            <div className="mb-8">
              <div className="border-l-4 pl-4 mb-3" style={{ borderColor: primaryColor }}>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide" style={{ fontFamily: "Roboto Mono, monospace" }}>
                  &gt; Summary
                </h2>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <div className="border-l-4 pl-4 mb-4" style={{ borderColor: primaryColor }}>
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide" style={{ fontFamily: "Roboto Mono, monospace" }}>
                  &gt; Experience
                </h2>
              </div>
              <div className="space-y-5">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-sm font-semibold" style={{ color: primaryColor }}>{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4" style={{ fontFamily: "Roboto Mono, monospace" }}>
                        [{formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}]
                      </span>
                    </div>
                    {exp.bullets?.length > 0 && (
                      <ul className="space-y-1.5">
                        {exp.bullets.map((bullet, bidx) => (
                          <li key={bidx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                            <Code className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: primaryColor }} />
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

          {/* Two Column Grid */}
          <div className="grid grid-cols-2 gap-8">
            {/* Education */}
            {education.length > 0 && (
              <div>
                <div className="border-l-4 pl-4 mb-4" style={{ borderColor: primaryColor }}>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide" style={{ fontFamily: "Roboto Mono, monospace" }}>
                    &gt; Education
                  </h2>
                </div>
                <div className="space-y-3">
                  {education.map((edu, idx) => (
                    <div key={idx}>
                      <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-sm" style={{ color: primaryColor }}>{edu.institution}</p>
                      <p className="text-xs text-gray-500" style={{ fontFamily: "Roboto Mono, monospace" }}>
                        [{edu.graduation_year}]
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div>
                <div className="border-l-4 pl-4 mb-4" style={{ borderColor: primaryColor }}>
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide" style={{ fontFamily: "Roboto Mono, monospace" }}>
                    &gt; Skills
                  </h2>
                </div>
                <div className="space-y-1.5">
                  {skills.map((skill, idx) => {
                    const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                    return (
                      <div key={idx} className="text-xs text-gray-700" style={{ fontFamily: "Roboto Mono, monospace" }}>
                        &rarr; {skillName}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}