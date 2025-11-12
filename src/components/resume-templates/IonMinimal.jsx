import React from "react";

export default function IonMinimal({ resume = {} }) {
  const customization = resume.customization || {};
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
  const lineHeight = customization.line_height || 1.8;

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
      className="w-[210mm] min-h-[297mm] mx-auto bg-white px-20 py-16" 
      style={{ fontFamily, lineHeight }}
    >
      {/* Header */}
      <div className="mb-12 pb-6 border-b border-black">
        <h1 className="text-5xl font-light text-black mb-3 tracking-tight">
          {personal.full_name || "Your Name"}
        </h1>
        <p className="text-lg text-black font-light">{personal.professional_title || "Professional Title"}</p>
      </div>

      {/* Contact */}
      <div className="flex justify-between text-sm text-black mb-12 pb-6 border-b border-black">
        {personal.email && <span>{personal.email}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.location && <span>{personal.location}</span>}
      </div>

      {/* Summary */}
      {personal.summary && (
        <div className="mb-12">
          <p className="text-sm text-black leading-relaxed">{personal.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-black mb-6 tracking-wide">EXPERIENCE</h2>
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-3">
                  <div>
                    <h3 className="text-base font-semibold text-black">{exp.title}</h3>
                    <p className="text-sm text-black font-light">{exp.company}</p>
                  </div>
                  <span className="text-xs text-black font-light whitespace-nowrap ml-4">
                    {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.bullets?.length > 0 && (
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="text-sm text-black leading-relaxed" style={{ paddingLeft: "1rem", textIndent: "-1rem" }}>
                        — {bullet}
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
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-black mb-6 tracking-wide">EDUCATION</h2>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline">
                <div>
                  <p className="text-base font-semibold text-black">{edu.degree}</p>
                  <p className="text-sm text-black font-light">{edu.institution}</p>
                </div>
                <span className="text-xs text-black font-light whitespace-nowrap ml-4">{edu.graduation_year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-black mb-6 tracking-wide">SKILLS</h2>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {skills.map((skill, idx) => {
              const skillName = typeof skill === 'string' ? skill : (skill.name || skill.skill || 'Skill');
              return (
                <span key={idx} className="text-sm text-black font-light">
                  {skillName}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}