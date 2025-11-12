import React from "react";

export default function MinimalATSClean({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "David Rodriguez",
    title: personal.professional_title || resume?.title || "Senior Software Engineer",
    contact: {
      email: personal.email || resume?.contact?.email || "david.rodriguez@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 456-7890",
      location: personal.location || resume?.contact?.location || "Austin, TX",
    },
    summary: personal.summary || resume?.summary || "Results-driven Senior Software Engineer with 7+ years building scalable web applications using modern JavaScript frameworks and cloud infrastructure. Expert in React, Node.js, TypeScript, and AWS with proven track record of delivering high-quality solutions that serve millions of users. Passionate about clean architecture, test-driven development, and mentoring teams to achieve technical excellence and business impact.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Software Engineer",
        company: "Microsoft",
        location: "Redmond, WA",
        dates: "2021 – Present",
        bullets: [
          "Architected microservices platform serving 5M+ users with 99.99% uptime, reducing average API response time from 300ms to 85ms through caching optimization and database indexing",
          "Reduced API response time by 60% through strategic caching implementation with Redis and CDN optimization, improving user experience and reducing infrastructure costs by $30K annually",
          "Led technical design reviews for 10+ major feature launches, establishing best practices and coding standards adopted by engineering team of 50+ developers",
          "Mentored 5 junior engineers through pair programming, code reviews, and technical workshops, improving team code quality scores from 70% to 95% over 12 months"
        ]
      },
      {
        role: "Software Engineer",
        company: "Amazon",
        location: "Seattle, WA",
        dates: "2017 – 2021",
        bullets: [
          "Developed e-commerce features processing $100M+ in annual transactions with zero security incidents, implementing robust payment processing and fraud detection systems",
          "Improved page load time by 40% through code splitting, lazy loading, and performance optimization strategies, increasing conversion rate by 15%",
          "Built comprehensive test suite achieving 90% code coverage using Jest and React Testing Library, reducing production bugs by 65%",
          "Collaborated with product managers and designers in agile sprints to deliver 30+ features on time, consistently exceeding sprint velocity goals by 20%"
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
      { degree: "BS Computer Science", institution: "University of Texas at Austin", location: "Austin, TX", year: "2018", details: "Honors, GPA: 3.8/4.0" },
      { degree: "AWS Solutions Architect Certification", institution: "Amazon Web Services", year: "2022" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "JavaScript/TypeScript", "React & Node.js", "Python", "AWS & Docker",
      "PostgreSQL", "GraphQL", "CI/CD", "Agile/Scrum", "Git", "RESTful APIs"
    ],
    tools: ["VS Code", "Docker", "Jira", "GitHub", "Postman", "DataDog", "Jenkins", "Terraform"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Spanish", level: "Professional" },
      { lang: "Portuguese", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "AWS Certified Solutions Architect (2022)",
      "Certified Scrum Master (CSM) (2021)",
      "MongoDB Certified Developer (2020)"
    ],
    achievements: [
      "Recognized with 'Engineering Excellence Award' for architecting system that reduced operational costs by $250K annually",
      "Open source contributor with 500+ GitHub stars across 2 popular libraries used by Fortune 500 companies",
      "Led migration from monolithic architecture to microservices, improving deployment frequency from weekly to daily releases"
    ],
    projects: [
      {
        name: "Real-Time Analytics Dashboard",
        description: "Built internal analytics platform processing 5M events/day with live data visualization, reducing reporting time from 24 hours to real-time",
        tech: "React, D3.js, WebSockets, Redis, PostgreSQL"
      }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3 text-center">
        <h1 className="text-2xl font-extrabold leading-tight text-cyan-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-cyan-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-cyan-200 bg-cyan-50/30">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Technical Skills</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-sm text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-cyan-50 text-cyan-700 border border-cyan-200 rounded-sm text-[8px]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-cyan-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-1.5">Certifications</h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4] mb-0.5">
                {typeof cert === 'string' ? cert : cert.name || cert.title}
              </p>
            ))}
          </section>
        </div>

        {/* Right Column - 64% */}
        <div className="w-[64%] pl-4">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-2">Professional Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-cyan-700 font-medium mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-cyan-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-cyan-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-2">Featured Projects</h3>
            {data.projects.map((project, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{project.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {project.description}
                </p>
                <p className="text-[8px] text-cyan-700">
                  <span className="font-semibold">Tech:</span> {project.tech}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-cyan-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-cyan-600 font-semibold mb-2">Education</h3>
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
      <footer className="text-[7.5px] text-gray-500 mt-2">
        <p className="text-center">References available upon request</p>
      </footer>
    </div>
  );
}