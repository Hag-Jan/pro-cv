import React from "react";

export default function CompactSeniorExecutive({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "James Patterson",
    title: personal.professional_title || resume?.title || "Chief Technology Officer",
    contact: {
      email: personal.email || resume?.contact?.email || "james.patterson@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 678-9012",
      location: personal.location || resume?.contact?.location || "Seattle, WA",
    },
    summary: personal.summary || resume?.summary || "Visionary technology executive with 18+ years leading engineering organizations and driving digital transformation for enterprise companies. Expert in cloud architecture, team building, and scaling technical operations from startup to enterprise scale. Proven track record of building high-performing engineering teams, establishing technical strategy, and delivering innovative solutions that drive business growth and competitive advantage.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Chief Technology Officer",
        company: "CloudScale Systems",
        location: "Seattle, WA",
        dates: "2019 – Present",
        bullets: [
          "Built engineering organization from 50 to 400+ engineers supporting $300M ARR growth, establishing technical vision and recruiting top talent from FAANG companies",
          "Led cloud migration reducing infrastructure costs by 50% ($5M annually) while improving system reliability from 99.5% to 99.99% uptime",
          "Established technical roadmap for 5-year product strategy, making critical architecture decisions for platform supporting 10M+ users",
          "Implemented DevOps practices and CI/CD pipelines reducing deployment time from 2 weeks to multiple times daily, improving feature velocity by 10x"
        ]
      },
      {
        role: "VP of Engineering",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        dates: "2013 – 2019",
        bullets: [
          "Scaled engineering team from 15 to 120+ across 4 global offices (US, India, Poland, Brazil), establishing hiring processes and engineering culture",
          "Implemented DevOps practices reducing deployment time by 85% and increasing release frequency from monthly to daily, enabling rapid experimentation",
          "Led architecture transformation to microservices supporting 10M+ users with 99.95% uptime, reducing monolithic codebase complexity by 70%",
          "Established engineering standards and best practices including code review processes, testing frameworks, and documentation improving code quality by 60%"
        ]
      }
    ]).map(exp => ({
      role: exp.role || exp.title || exp.position,
      company: exp.company,
      location: exp.location,
      dates: exp.dates,
      bullets: exp.bullets || []
    })),
    education: (r?.education?.length > 0 ? r.education : resume?.education?.length > 0 ? resume.education : [
      { degree: "MS Computer Science", institution: "Stanford University", location: "Stanford, CA", year: "2006", details: "Distributed Systems Focus" },
      { degree: "BS Software Engineering", institution: "MIT", location: "Cambridge, MA", year: "2002", details: "Summa Cum Laude" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "Cloud Architecture", "Engineering Leadership", "Product Strategy", "Team Building",
      "Agile/DevOps", "Strategic Planning", "Microservices", "Security", "System Design", "Talent Development"
    ],
    tools: ["AWS", "Kubernetes", "Docker", "Jenkins", "GitHub", "Jira", "DataDog", "Terraform"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Mandarin", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "AWS Solutions Architect Professional (2021)",
      "Certified Scrum Master (CSM) (2018)",
      "CISSP - Certified Information Systems Security (2019)"
    ],
    achievements: [
      "Recognized as 'CTO of the Year' by Tech Leadership Awards for driving engineering excellence and innovation",
      "Built technical hiring program increasing acceptance rate from 15% to 75% for senior engineering candidates",
      "Published thought leadership articles in TechCrunch and InfoWorld on engineering culture and cloud architecture"
    ],
    speaking: [
      { event: "AWS re:Invent 2023", topic: "Building Scalable Systems", audience: "2,000+ attendees" },
      { event: "QCon San Francisco 2022", topic: "Engineering Leadership", audience: "1,500+ attendees" }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border-2 border-amber-700 shadow-sm overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3 pb-3 border-b-2 border-amber-700">
        <h1 className="text-2xl font-black leading-tight text-amber-700">{data.name}</h1>
        <p className="text-xs font-semibold text-gray-700 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-600 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r-2 border-amber-200 bg-amber-50/20">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5 pb-1 border-b border-amber-300">Executive Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5 pb-1 border-b border-amber-300">Core Competencies</h3>
            <div className="space-y-0.5">
              {data.skills.map((skill, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {skill}</p>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5 pb-1 border-b border-amber-300">Technologies</h3>
            <div className="space-y-0.5">
              {data.tools.map((tool, i) => (
                <p key={i} className="text-[8.5px] text-gray-800">• {tool}</p>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5 pb-1 border-b border-amber-300">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-amber-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5 pb-1 border-b border-amber-300">Certifications</h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4] mb-0.5">
                {typeof cert === 'string' ? cert : cert.name || cert.title}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-1.5 pb-1 border-b border-amber-300">Speaking</h3>
            {data.speaking.map((item, i) => (
              <div key={i} className="mb-1.5">
                <p className="text-[8.5px] font-semibold text-gray-900">{item.event}</p>
                <p className="text-[8px] text-gray-600">{item.topic}</p>
                <p className="text-[7.5px] text-gray-500">{item.audience}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Right Column - 64% */}
        <div className="w-[64%] pl-4">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-2 pb-1 border-b border-amber-300">Leadership Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] font-semibold text-gray-600">{exp.dates}</span>
                </div>
                <p className="text-[9px] font-semibold text-amber-700 mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-amber-200 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-2 pb-1 border-b border-amber-300">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-amber-200 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-amber-700 font-bold mb-2 pb-1 border-b border-amber-300">Education</h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{edu.degree}</p>
                <p className="text-[8.5px] text-gray-600">
                  {edu.institution} {edu.location && `• ${edu.location}`} • {edu.year}
                </p>
                {edu.details && (
                  <p className="text-[8px] text-gray-500 italic">{edu.details}</p>
                )}
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-[7.5px] text-gray-500 mt-2 pt-3 border-t border-amber-200">
        <p className="text-center">References available upon request</p>
      </footer>
    </div>
  );
}