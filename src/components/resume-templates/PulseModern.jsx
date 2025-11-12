import React from "react";
import { Mail, Phone, MapPin, Code, Database } from "lucide-react";

export default function PulseModern({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#0EA5E9";
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
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
      {/* Top Accent Bar */}
      <div className="h-3" style={{ backgroundColor: primaryColor }} />

      <div className="px-12 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.full_name || "Your Name"}</h1>
          <p className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
            {personal.professional_title || "Professional Title"}
          </p>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
          <div className="mb-8 p-5 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Two Column Layout */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - 2/3 */}
          <div className="col-span-2">
            {/* Experience */}
            {experience.length > 0 && (
              <div className="mb-8">
                <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>
                  WORK EXPERIENCE
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                          <p className="text-sm font-semibold" style={{ color: primaryColor }}>{exp.company}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
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

            {/* Education */}
            {education.length > 0 && (
              <div>
                <h2 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>
                  EDUCATION
                </h2>
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
          </div>

          {/* Right Column - 1/3 */}
          <div>
            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>
                  TECHNICAL SKILLS
                </h2>
                <div className="space-y-2">
                  {skills.map((skill, idx) => {
                    const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                    return (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                        <span className="text-xs text-gray-700">{skillName}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <div>
                <h2 className="text-sm font-bold text-gray-900 mb-4 pb-2 border-b-2" style={{ borderColor: primaryColor }}>
                  LANGUAGES
                </h2>
                <div className="space-y-2">
                  {languages.map((lang, idx) => {
                    const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
                    const langProf = typeof lang === 'object' ? (lang.proficiency || 'Intermediate') : 'Intermediate';
                    return (
                      <div key={idx}>
                        <div className="text-xs font-semibold text-gray-900">{langName}</div>
                        <div className="text-xs text-gray-600">{langProf}</div>
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