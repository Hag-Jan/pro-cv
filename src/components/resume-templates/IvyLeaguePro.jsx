import React from "react";

export default function IvyLeaguePro({ resume = {} }) {
  const customization = resume.customization || {};
  const primaryColor = customization.color_scheme || "#1F2937";
  const fontFamily = customization.font_family || "Georgia, serif";
  const lineHeight = customization.line_height || 1.6;
  const backgroundColor = customization.background_color || "#FFFFFF";

  const personal = resume.personal_info || {
    full_name: "Alexander Taylor",
    professional_title: "Senior Software Engineer",
    email: "alexander.taylor@email.com",
    phone: "+1 (555) 987-6543",
    location: "Boston, MA",
    linkedin: "linkedin.com/in/alexandertaylor",
    summary: "Distinguished Senior Software Engineer with 12+ years architecting scalable cloud infrastructure."
  };

  const competencies = resume.competencies?.length > 0 ? resume.competencies.map(c => typeof c === 'string' ? c : (c.name || c.competency || 'Competency')) : [
    "Software Architecture",
    "Cloud Infrastructure (AWS, Azure)",
    "Big Data & Analytics"
  ];

  const experience = resume.experience?.length > 0 ? resume.experience : [
    {
      title: "Lead Software Engineer",
      company: "CloudScale Technologies",
      location: "Boston, MA",
      start_date: "2019-01",
      current: true,
      bullets: [
        "Developed infrastructure architecture that improved application scalability by 300%",
        "Led team of 12 engineers in migrating legacy monolithic systems to microservices"
      ]
    }
  ];

  const skills = resume.skills?.length > 0 ? resume.skills.map(s => typeof s === 'string' ? s : (s.name || s.skill || 'Skill')) : [
    "Python, Java, Go, TypeScript",
    "AWS (EC2, S3, Lambda, RDS)",
    "Docker, Kubernetes, Terraform"
  ];

  const education = resume.education?.length > 0 ? resume.education : [
    {
      degree: "Master of Science in Computer Science",
      institution: "Massachusetts Institute of Technology",
      location: "Cambridge, MA",
      graduation_year: "2012",
      gpa: "3.9/4.0"
    }
  ];

  const achievements = resume.achievements?.length > 0 ? resume.achievements.map(a => typeof a === 'string' ? a : (a.name || a.achievement || a.title || 'Achievement')) : [
    "Architected infrastructure supporting 10M+ concurrent users with 99.99% uptime"
  ];

  const training = resume.certificates?.length > 0 
    ? resume.certificates.map(c => typeof c === 'string' ? c : (c.name || c.title || c.certificate || 'Certificate'))
    : ["AWS Certified Solutions Architect - Professional (2021)"];

  const languages = resume.languages?.length > 0 ? resume.languages : [
    { language: "English", proficiency: "Native" }
  ];

  const interests = resume.interests?.length > 0 ? resume.interests.map(i => typeof i === 'string' ? i : (i.name || i.interest || 'Interest')) : ["Open Source Contribution", "Technical Writing"];

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div 
      className="w-[210mm] min-h-[297mm] mx-auto px-16 py-12" 
      style={{ 
        fontFamily,
        lineHeight,
        backgroundColor
      }}
    >
      {/* Header */}
      <div className="text-center mb-6 pb-5 border-b-2" style={{ borderColor: primaryColor }}>
        <h1 className="text-4xl font-bold text-gray-900 mb-2.5 tracking-tight">{personal.full_name}</h1>
        <p className="text-lg text-gray-700 mb-3">{personal.professional_title}</p>
        <div className="text-xs text-gray-600 space-x-2.5">
          <span>{personal.email}</span>
          <span>•</span>
          <span>{personal.phone}</span>
          <span>•</span>
          <span>{personal.location}</span>
          {personal.linkedin && (
            <>
              <span>•</span>
              <span>{personal.linkedin}</span>
            </>
          )}
        </div>
      </div>

      {/* Core Competencies */}
      {competencies.length > 0 && (
        <div className="mb-5">
          <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Core Competencies</h2>
          <p className="text-xs text-gray-700 leading-relaxed">
            {competencies.join(' • ')}
          </p>
        </div>
      )}

      <div className="border-b border-gray-200 mb-5"></div>

      {/* Professional Summary */}
      {personal.summary && (
        <>
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Professional Summary</h2>
            <p className="text-xs text-gray-700 leading-relaxed text-justify">{personal.summary}</p>
          </div>
          <div className="border-b border-gray-200 mb-5"></div>
        </>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <>
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-3 uppercase tracking-wider">Professional Experience</h2>
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                      <p className="text-xs text-gray-700">{exp.company}, {exp.location}</p>
                    </div>
                    <span className="text-xs text-gray-600 italic">
                      {formatDate(exp.start_date)} – {exp.current ? 'Present' : formatDate(exp.end_date)}
                    </span>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul className="space-y-1.5 text-xs text-gray-700">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-200 mb-5"></div>
        </>
      )}

      {/* Technical Skills */}
      {skills.length > 0 && (
        <>
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Technical Skills</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-700">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-200 mb-5"></div>
        </>
      )}

      {/* Training & Certifications */}
      {training.length > 0 && (
        <>
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Training & Certifications</h2>
            <ul className="space-y-1 text-xs text-gray-700">
              {training.map((cert, idx) => (
                <li key={idx} className="pl-4 relative before:content-['•'] before:absolute before:left-0">{cert}</li>
              ))}
            </ul>
          </div>
          <div className="border-b border-gray-200 mb-5"></div>
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Education</h2>
            <div className="space-y-2.5">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline">
                    <div>
                      <p className="text-xs font-bold text-gray-900">{edu.degree}</p>
                      <p className="text-xs text-gray-700">{edu.institution}, {edu.location}</p>
                    </div>
                    <span className="text-xs text-gray-600 italic">{edu.graduation_year}</span>
                  </div>
                  {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-200 mb-5"></div>
        </>
      )}

      {/* Key Achievements */}
      {achievements.length > 0 && (
        <>
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Key Achievements</h2>
            <ul className="space-y-1.5 text-xs text-gray-700">
              {achievements.map((achievement, idx) => (
                <li key={idx} className="pl-4 relative before:content-['•'] before:absolute before:left-0 leading-relaxed">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-b border-gray-200 mb-5"></div>
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <div className="mb-5">
            <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Languages</h2>
            <p className="text-xs text-gray-700">
              {languages.map((lang, idx) => {
                const langName = typeof lang === 'string' ? lang : (lang.language || 'Language');
                const langProf = typeof lang === 'object' ? (lang.proficiency || 'Fluent') : 'Fluent';
                return (
                  <span key={idx}>
                    {langName} ({langProf}){idx < languages.length - 1 ? ' • ' : ''}
                  </span>
                );
              })}
            </p>
          </div>
          <div className="border-b border-gray-200 mb-5"></div>
        </>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-gray-900 mb-2.5 uppercase tracking-wider">Interests</h2>
          <p className="text-xs text-gray-700">{interests.join(' • ')}</p>
        </div>
      )}
    </div>
  );
}