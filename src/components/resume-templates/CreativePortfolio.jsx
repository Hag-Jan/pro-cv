import React from "react";

export default function CreativePortfolio({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#EC4899";
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
      {/* Creative Gradient Header */}
      <div 
        className="px-12 py-12 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(120deg, ${primaryColor} 0%, ${primaryColor}aa 100%)`
        }}
      >
        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
            {personal.full_name || "Your Name"}
          </h1>
          <p className="text-2xl text-white/90 font-light">
            {personal.professional_title || "Professional Title"}
          </p>
        </div>
        <div 
          className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
          style={{ 
            background: 'white',
            transform: 'translate(30%, -30%)',
            filter: 'blur(40px)'
          }}
        />
      </div>

      <div className="px-12 py-8">
        {/* Contact Bar */}
        <div className="flex gap-4 text-sm text-gray-600 mb-8 pb-4 border-b-2" style={{ borderColor: `${primaryColor}30` }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>•</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>•</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>

        {/* Creative Statement */}
        {personal.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-black mb-3" style={{ color: primaryColor }}>
              Creative Vision
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-black mb-4" style={{ color: primaryColor }}>
              Experience
            </h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="mb-6 relative pl-4" style={{ borderLeft: `3px solid ${primaryColor}` }}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-sm font-semibold" style={{ color: primaryColor }}>
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {exp.current ? 'Present' : exp.end_date}
                  </span>
                </div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul className="space-y-2 text-sm text-gray-700">
                    {exp.bullets.map((bullet, bidx) => (
                      <li key={bidx} className="leading-relaxed">
                        {bullet}
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
            <h2 className="text-xl font-black mb-3" style={{ color: primaryColor }}>
              Education
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
            <h2 className="text-xl font-black mb-3" style={{ color: primaryColor }}>
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="text-sm px-4 py-2 rounded-full font-bold text-white"
                  style={{ 
                    background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`
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