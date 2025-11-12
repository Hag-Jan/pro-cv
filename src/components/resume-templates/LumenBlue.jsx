import React from "react";
import { Mail, Phone, MapPin, Award } from "lucide-react";

export default function LumenBlue({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#1E3A8A";
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
      className="w-[210mm] min-h-[297mm] mx-auto bg-white flex" 
      style={{ fontFamily, lineHeight }}
    >
      {/* LEFT SIDEBAR - 35% */}
      <div className="w-[35%] text-white px-8 py-12" style={{ backgroundColor: primaryColor }}>
        {/* Profile */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">{personal.full_name || "Your Name"}</h1>
          <p className="text-sm text-white/80">{personal.professional_title || "Professional Title"}</p>
        </div>

        {/* Contact */}
        <div className="mb-8 pb-8 border-b border-white/20">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-3">Contact</h2>
          <div className="space-y-2 text-xs text-white/90">
            {personal.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span className="break-all">{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8 pb-8 border-b border-white/20">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3">Skills</h2>
            <div className="space-y-2">
              {skills.map((skill, idx) => {
                const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                return (
                  <div key={idx} className="text-xs text-white/90">{skillName}</div>
                );
              })}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-8 pb-8 border-b border-white/20">
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3">Languages</h2>
            <div className="space-y-2">
              {languages.map((lang, idx) => {
                const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
                const langProf = typeof lang === 'object' ? (lang.proficiency || 'Intermediate') : 'Intermediate';
                return (
                  <div key={idx} className="text-xs">
                    <div className="font-semibold text-white">{langName}</div>
                    <div className="text-white/70">{langProf}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certificates.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-3">Certifications</h2>
            <div className="space-y-2">
              {certificates.map((cert, idx) => {
                const certName = typeof cert === 'string' ? cert : (cert.name || cert.title || 'Certificate');
                return (
                  <div key={idx} className="flex items-start gap-2">
                    <Award className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-white/90 leading-relaxed">{certName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT CONTENT - 65% */}
      <div className="w-[65%] px-10 py-12">
        {/* Summary */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Profile</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Experience</h2>
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
            <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">Education</h2>
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
    </div>
  );
}