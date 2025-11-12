import React from "react";
import { Mail, Phone, MapPin, Linkedin, Award, Briefcase, GraduationCap, Globe } from "lucide-react";

export default function ElegantPro({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#8B5CF6";
  const secondaryColor = customization.secondary_color || "#7C3AED";
  const backgroundColor = customization.background_color || "#FFFFFF";
  const fontFamily = customization.font_family || "Inter, system-ui, sans-serif";
  const lineHeight = customization.line_height || 1.6;

  const personal = resume.personal_info || {
    full_name: "Sophia Chen",
    professional_title: "Product Design Lead",
    email: "sophia.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/sophiachen",
    summary: "Award-winning Product Design Lead with 10+ years creating user-centric digital experiences."
  };

  const experience = resume.experience?.length > 0 ? resume.experience : [
    {
      title: "Senior Product Designer",
      company: "Innovation Labs Inc.",
      location: "Seattle, WA",
      start_date: "2020-01",
      current: true,
      bullets: [
        "Led design for flagship product serving 2M+ users, resulting in 45% increase in user engagement",
        "Established design system adopted across 8 product teams, improving consistency and development speed by 60%"
      ]
    }
  ];

  const education = resume.education?.length > 0 ? resume.education : [
    {
      degree: "Master of Fine Arts in Interaction Design",
      institution: "Rhode Island School of Design",
      location: "Providence, RI",
      graduation_year: "2014"
    }
  ];

  const skills = resume.skills?.length > 0 ? resume.skills.map(s => typeof s === 'string' ? s : (s.name || s.skill || 'Skill')) : [
    "User Research & Testing",
    "Figma & Adobe Creative Suite",
    "Design Systems",
    "Prototyping"
  ];

  const achievements = resume.achievements?.length > 0 ? resume.achievements.map(a => typeof a === 'string' ? a : (a.name || a.achievement || a.title || 'Achievement')) : [
    "Red Dot Design Award 2022",
    "Featured in UX Design Magazine",
    "Speaker at Design Conference 2023"
  ];

  const languages = resume.languages?.length > 0 ? resume.languages : [
    { language: "English", proficiency: 100 },
    { language: "Mandarin", proficiency: 90 }
  ];

  const interests = resume.interests?.length > 0 ? resume.interests.map(i => typeof i === 'string' ? i : (i.name || i.interest || 'Interest')) : ["Photography", "Typography", "Modern Art"];

  const certifications = resume.certificates?.length > 0 
    ? resume.certificates.map(c => typeof c === 'string' ? c : (c.name || c.title || c.certificate || 'Certificate'))
    : ["Google UX Design Professional Certificate", "Nielsen Norman Group UX Certification"];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div 
      className="w-[210mm] min-h-[297mm] mx-auto relative" 
      style={{ 
        fontFamily,
        lineHeight,
        backgroundColor
      }}
    >
      {/* Accent Bar */}
      <div 
        className="absolute top-0 left-0 w-2 h-full"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="pl-16 pr-12 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 
            className="text-4xl font-bold mb-2"
            style={{ color: primaryColor }}
          >
            {personal.full_name}
          </h1>
          <p className="text-xl text-gray-700 mb-4">{personal.professional_title}</p>
          
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{personal.phone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" style={{ color: primaryColor }} />
              <span>{personal.location}</span>
            </div>
            {personal.linkedin && (
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-4 h-4" style={{ color: primaryColor }} />
                <span>{personal.linkedin}</span>
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {personal.summary && (
          <div className="mb-7">
            <h2 
              className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">{personal.summary}</p>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-7">
            <h2 
              className="text-sm font-bold mb-4 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <Briefcase className="w-4 h-4" />
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Experience
            </h2>
            <div className="space-y-5">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-xs font-semibold" style={{ color: primaryColor }}>
                        {exp.company}
                      </p>
                      <p className="text-xs text-gray-500">{exp.location}</p>
                    </div>
                    <span className="text-xs text-gray-500 italic whitespace-nowrap ml-4">
                      {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="leading-relaxed pl-4 relative before:content-['→'] before:absolute before:left-0" style={{ color: 'inherit' }}>
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
          <div className="mb-7">
            <h2 
              className="text-sm font-bold mb-4 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <GraduationCap className="w-4 h-4" />
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Education
            </h2>
            <div className="space-y-3 pl-4">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <p className="text-xs font-bold text-gray-900">{edu.degree}</p>
                  <p className="text-xs" style={{ color: primaryColor }}>{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.location} • {edu.graduation_year}</p>
                  {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-7">
            <h2 
              className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <Award className="w-4 h-4" />
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 pl-4">
              {skills.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{ 
                    backgroundColor: `${primaryColor}15`,
                    color: primaryColor
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div className="mb-7">
            <h2 
              className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <Award className="w-4 h-4" />
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Certifications
            </h2>
            <ul className="space-y-1.5 pl-4">
              {certifications.map((cert, idx) => (
                <li key={idx} className="text-xs text-gray-700 pl-4 relative before:content-['✓'] before:absolute before:left-0" style={{ color: primaryColor }}>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-7">
            <h2 
              className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <Award className="w-4 h-4" />
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Achievements
            </h2>
            <ul className="space-y-1.5 pl-4">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="text-xs text-gray-700 leading-relaxed pl-4 relative before:content-['★'] before:absolute before:left-0" style={{ color: primaryColor }}>
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-7">
            <h2 
              className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <Globe className="w-4 h-4" />
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Languages
            </h2>
            <div className="space-y-2.5 pl-4">
              {languages.map((lang, idx) => {
                const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
                const langProf = typeof lang === 'object' ? (lang.proficiency || 50) : 50;
                return (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-semibold text-gray-900">{langName}</span>
                      <span className="text-xs text-gray-500">{langProf}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all"
                        style={{ 
                          width: `${langProf}%`,
                          backgroundColor: primaryColor
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Interests */}
        {interests.length > 0 && (
          <div>
            <h2 
              className="text-sm font-bold mb-3 uppercase tracking-wider flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <div className="w-8 h-0.5" style={{ backgroundColor: primaryColor }} />
              Interests
            </h2>
            <div className="flex flex-wrap gap-2 pl-4">
              {interests.map((interest, idx) => (
                <span 
                  key={idx} 
                  className="text-xs px-3 py-1 rounded-full text-gray-700 border"
                  style={{ borderColor: primaryColor }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}