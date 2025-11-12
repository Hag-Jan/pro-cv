import React from "react";

export default function VantageClassic({ resume = {} }) {
  const customization = resume.customization || {};
  const fontFamily = customization.font_family || "Times New Roman, serif";
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
      className="w-[210mm] min-h-[297mm] mx-auto bg-white px-16 py-14" 
      style={{ fontFamily, lineHeight }}
    >
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-900">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 uppercase tracking-wide">
          {personal.full_name || "Your Name"}
        </h1>
        <p className="text-base text-gray-700 mb-3">{personal.professional_title || "Professional Title"}</p>
        
        <div className="flex justify-center gap-3 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span>|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.location && <span>|</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* Professional Summary */}
      {personal.summary && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-sm italic text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.bullets?.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="text-sm text-gray-700 leading-relaxed">
                        {bullet}
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
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-sm italic text-gray-700">{edu.institution}</p>
                </div>
                <span className="text-sm text-gray-600 whitespace-nowrap ml-4">{edu.graduation_year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Professional Skills
          </h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
              const isLast = idx === skills.length - 1;
              return (
                <span key={idx} className="text-sm text-gray-700">
                  {skillName}{!isLast && ' •'}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-gray-900 mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
            Languages
          </h2>
          <div className="flex flex-wrap gap-x-3">
            {languages.map((lang, idx) => {
              const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
              const langProf = typeof lang === 'object' ? (lang.proficiency || '') : '';
              return (
                <span key={idx} className="text-sm text-gray-700">
                  {langName} {langProf && `(${langProf})`}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}