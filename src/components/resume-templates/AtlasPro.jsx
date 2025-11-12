import React from "react";
import { Mail, Phone, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";

export default function AtlasPro({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#2563EB";
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
  const lineHeight = customization.line_height || 1.6;

  const personal = resume.personal_info || {};
  const experience = resume.experience || [];
  const education = resume.education || [];
  const skills = resume.skills || [];
  const languages = resume.languages || [];
  const certificates = resume.certificates || [];

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
      <div className="flex h-full">
        {/* LEFT COLUMN - 60% */}
        <div className="w-[60%] px-12 py-12 pr-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{personal.full_name || "Your Name"}</h1>
            <p className="text-xl font-semibold mb-4" style={{ color: primaryColor }}>
              {personal.professional_title || "Professional Title"}
            </p>
            
            <div className="space-y-1.5 text-sm text-gray-600">
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
              <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-5 rounded" style={{ backgroundColor: primaryColor }} />
                Professional Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                <Briefcase className="w-5 h-5" style={{ color: primaryColor }} />
                Work Experience
              </h2>
              <div className="space-y-5">
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
                            <span className="text-gray-400 mt-1">•</span>
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
              <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide flex items-center gap-2">
                <GraduationCap className="w-5 h-5" style={{ color: primaryColor }} />
                Education
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

        {/* RIGHT COLUMN - 40% */}
        <div className="w-[40%] bg-gray-50 px-8 py-12">
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
                      <span className="text-sm text-gray-700">{skillName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Languages</h2>
              <div className="space-y-3">
                {languages.map((lang, idx) => {
                  const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
                  const langProf = typeof lang === 'object' ? (lang.proficiency || 'Intermediate') : 'Intermediate';
                  return (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-gray-900">{langName}</span>
                        <span className="text-xs text-gray-500">{langProf}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certificates.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Certifications</h2>
              <div className="space-y-2">
                {certificates.map((cert, idx) => {
                  const certName = typeof cert === 'string' ? cert : (cert.name || cert.title || cert.certificate || 'Certificate');
                  return (
                    <div key={idx} className="flex items-start gap-2">
                      <Award className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: primaryColor }} />
                      <span className="text-xs text-gray-700 leading-relaxed">{certName}</span>
                    </div>
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