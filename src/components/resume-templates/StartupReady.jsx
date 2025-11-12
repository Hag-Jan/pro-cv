import React from "react";

export default function StartupReady({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#10B981";
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
  const lineHeight = customization.line_height || 1.6;
  const backgroundColor = customization.background_color || "#FFFFFF";

  const personal = resume.personal_info || {};
  const experience = resume.experience || [];
  const education = resume.education || [];
  const skills = resume.skills || [];

  return (
    <div 
      className="w-[210mm] min-h-[297mm] mx-auto" 
      style={{ 
        fontFamily, 
        lineHeight,
        backgroundColor
      }}
    >
      {/* Dynamic Header */}
      <div className="px-12 py-10" style={{ backgroundColor: `${primaryColor}10` }}>
        <h1 className="text-4xl font-black mb-2" style={{ color: primaryColor }}>
          {personal.full_name || "Your Name"}
        </h1>
        <p className="text-xl font-semibold text-gray-700 mb-4">
          {personal.professional_title || "Professional Title"}
        </p>
        <div className="flex gap-3 text-sm text-gray-600">
          {personal.email && <span className="px-3 py-1 bg-white rounded-full">{personal.email}</span>}
          {personal.phone && <span className="px-3 py-1 bg-white rounded-full">{personal.phone}</span>}
          {personal.location && <span className="px-3 py-1 bg-white rounded-full">{personal.location}</span>}
        </div>
      </div>

      <div className="px-12 py-8">
        {/* About */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-lg font-black mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-1.5 h-6 rounded" style={{ backgroundColor: primaryColor }} />
              ABOUT ME
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-black mb-4 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-1.5 h-6 rounded" style={{ backgroundColor: primaryColor }} />
              EXPERIENCE
            </h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}05`, borderLeft: `4px solid ${primaryColor}` }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: primaryColor, color: 'white' }}>
                    {exp.current ? 'Current' : exp.end_date}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-2 text-sm text-gray-700 mt-3">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="flex items-start gap-2">
                        <span className="text-xs mt-1 font-bold" style={{ color: primaryColor }}>✓</span>
                        <span className="leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-black mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-1.5 h-6 rounded" style={{ backgroundColor: primaryColor }} />
              EDUCATION
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="mb-2">
                <p className="text-sm font-bold text-gray-900">{edu.degree}</p>
                <p className="text-sm text-gray-700">{edu.institution} • {edu.graduation_year}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2 className="text-lg font-black mb-3 flex items-center gap-2" style={{ color: primaryColor }}>
              <span className="w-1.5 h-6 rounded" style={{ backgroundColor: primaryColor }} />
              SKILLS
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="text-sm px-4 py-2 rounded-lg font-semibold"
                  style={{ 
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor,
                    border: `1px solid ${primaryColor}30`
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}