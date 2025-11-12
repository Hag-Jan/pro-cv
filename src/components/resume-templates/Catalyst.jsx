import React from "react";
import { Mail, Phone, MapPin, TrendingUp } from "lucide-react";

export default function Catalyst({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#F97316";
  const fontFamily = customization.font_family || "Plus Jakarta Sans, system-ui, sans-serif";
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
      style={{ fontFamily, lineHeight }}
    >
      {/* Header with Accent */}
      <div className="relative px-12 pt-12 pb-10">
        <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: primaryColor }} />
        
        <h1 className="text-5xl font-bold text-gray-900 mb-2">{personal.full_name || "Your Name"}</h1>
        <p className="text-2xl font-semibold mb-6" style={{ color: primaryColor }}>
          {personal.professional_title || "Professional Title"}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personal.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{personal.location}</span>
            </div>
          )}
        </div>
      </div>

      <div className="px-12 pb-12">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-8 p-5 rounded-lg" style={{ backgroundColor: `${primaryColor}10` }}>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5" style={{ color: primaryColor }} />
              <h2 className="text-lg font-bold text-gray-900">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-sm font-semibold" style={{ color: primaryColor }}>{exp.company}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap ml-4 font-semibold">
                      {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: primaryColor }} />
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
        <div className="grid grid-cols-5 gap-8">
          {/* Education - 3/5 */}
          {education.length > 0 && (
            <div className="col-span-3">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.graduation_year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills - 2/5 */}
          {skills.length > 0 && (
            <div className="col-span-2">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                  return (
                    <span 
                      key={idx} 
                      className="text-xs px-3 py-1.5 rounded-lg font-semibold text-white"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {skillName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}