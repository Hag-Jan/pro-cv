import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function VertexClean({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#3B82F6";
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
      <div className="grid grid-cols-3 gap-0 h-full">
        {/* Left Column - 1/3 */}
        <div className="col-span-1 bg-gray-50 px-8 py-12">
          {/* Profile */}
          <div className="mb-8">
            <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: primaryColor }} />
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Contact</h2>
            <div className="space-y-2 text-xs text-gray-700">
              {personal.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span className="break-all">{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: primaryColor }} />
                  <span>{personal.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Expertise</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                  return (
                    <div key={idx} className="text-xs text-gray-700">{skillName}</div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div>
              <div className="w-16 h-1 mb-4 rounded" style={{ backgroundColor: primaryColor }} />
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Languages</h2>
              <div className="space-y-2">
                {languages.map((lang, idx) => {
                  const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
                  const langProf = typeof lang === 'object' ? (lang.proficiency || 'Intermediate') : 'Intermediate';
                  return (
                    <div key={idx} className="text-xs">
                      <div className="font-semibold text-gray-900">{langName}</div>
                      <div className="text-gray-600">{langProf}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - 2/3 */}
        <div className="col-span-2 px-12 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.full_name || "Your Name"}</h1>
            <p className="text-xl font-semibold" style={{ color: primaryColor }}>
              {personal.professional_title || "Professional Title"}
            </p>
          </div>

          {/* Summary */}
          {personal.summary && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-0.5 rounded" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profile</h2>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 rounded" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Experience</h2>
              </div>
              <div className="space-y-6">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                        <p className="text-sm font-semibold text-gray-700">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {formatDate(exp.start_date)} - {exp.current ? 'Present' : formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.bullets?.length > 0 && (
                      <ul className="space-y-1.5">
                        {exp.bullets.map((bullet, bidx) => (
                          <li key={bidx} className="text-sm text-gray-700 leading-relaxed flex items-start gap-2">
                            <span className="text-gray-400">•</span>
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-0.5 rounded" style={{ backgroundColor: primaryColor }} />
                <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Education</h2>
              </div>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                    <p className="text-sm text-gray-700">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.graduation_year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}