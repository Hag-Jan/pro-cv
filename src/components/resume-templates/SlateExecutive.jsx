import React from "react";

export default function SlateExecutive({ resume = {} }) {
  const customization = resume.customization || {};
  const fontFamily = customization.font_family || "Georgia, serif";
  const lineHeight = customization.line_height || 1.7;

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
      className="w-[210mm] min-h-[297mm] mx-auto bg-white px-16 py-14 border-4 border-gray-300" 
      style={{ fontFamily, lineHeight }}
    >
      {/* Header */}
      <div className="text-center mb-10 pb-8 border-b-2 border-gray-800">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {personal.full_name || "Your Name"}
        </h1>
        <p className="text-lg text-gray-700 mb-4">{personal.professional_title || "Professional Title"}</p>
        
        <div className="flex justify-center gap-3 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
          {personal.email && personal.phone && <span>|</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.phone && personal.location && <span>|</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-10">
          <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
            Executive Profile
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed border-l-4 border-gray-800 pl-4">
            {personal.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-10">
          <h2 className="text-base font-bold text-gray-900 mb-5 uppercase tracking-wide">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-sm italic text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                    {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.bullets?.length > 0 && (
                  <ul className="list-disc list-inside space-y-1.5 ml-4">
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

      {/* Education & Skills Grid */}
      <div className="grid grid-cols-2 gap-10">
        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-sm italic text-gray-700">{edu.institution}</p>
                  <p className="text-xs text-gray-600">{edu.graduation_year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {skills.map((skill, idx) => {
                const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
                return (
                  <span key={idx} className="text-sm text-gray-700">
                    • {skillName}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}