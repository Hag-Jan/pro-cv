import React from "react";

export default function ModernTech({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "David Kim",
    title: personal.professional_title || resume?.title || "Senior Full Stack Developer",
    contact: {
      email: personal.email || resume?.contact?.email || "david.kim@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 678-9012",
      location: personal.location || resume?.contact?.location || "Austin, TX",
    },
    summary: personal.summary || resume?.summary || "Innovative Senior Full Stack Developer with 6+ years building cutting-edge web applications using modern JavaScript frameworks and cloud infrastructure. Expert in React, Node.js, TypeScript, and AWS with proven track record of delivering scalable solutions that serve millions of users. Passionate about clean code, test-driven development, and mentoring junior engineers to achieve technical excellence.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Full Stack Developer",
        company: "Tech Startup Inc.",
        location: "Austin, TX",
        dates: "2021 – Present",
        bullets: [
          "Built and deployed microservices architecture handling 100M+ API requests monthly with 99.95% uptime, reducing average response time from 350ms to 120ms",
          "Implemented real-time collaboration features using WebSockets and Redis pub/sub, increasing user engagement by 65% and daily active users by 1.2M",
          "Led technical architecture decisions for 3 major product launches serving 2M+ users, establishing coding standards and best practices adopted company-wide",
          "Optimized database queries and implemented caching strategies reducing infrastructure costs by $45K annually while improving application performance by 78%"
        ]
      },
      {
        role: "Full Stack Developer",
        company: "Digital Agency",
        location: "San Francisco, CA",
        dates: "2018 – 2021",
        bullets: [
          "Developed 20+ client projects using React, Node.js, and AWS services, delivering on-time and within budget with average client satisfaction score of 4.8/5",
          "Reduced deployment time by 70% through CI/CD automation with GitHub Actions and Docker containerization, enabling daily production releases",
          "Mentored 4 junior developers through code reviews and pair programming sessions, improving team code quality scores from 65% to 92%",
          "Built responsive e-commerce platform processing $5M in annual transactions with zero security incidents and 99.9% uptime"
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
      { degree: "B.S. in Software Engineering", institution: "University of Texas at Austin", location: "Austin, TX", year: "2018", details: "GPA: 3.9/4.0, Dean's List" },
      { degree: "AWS Solutions Architect Certification", institution: "Amazon Web Services", year: "2022" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "React & Redux", "Node.js & Express", "TypeScript", "MongoDB & PostgreSQL",
      "AWS & Kubernetes", "Docker & CI/CD", "GraphQL", "Jest & Testing", "Git", "RESTful APIs"
    ],
    tools: ["VS Code", "Docker", "Jira", "Figma", "Postman", "DataDog", "GitHub Actions", "Terraform"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Korean", level: "Native" },
      { lang: "Japanese", level: "Conversational" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "AWS Certified Developer - Associate (2022)",
      "Google Cloud Professional Developer (2021)",
      "MongoDB Certified Developer (2020)"
    ],
    achievements: [
      "Open source contributor with 800+ GitHub stars across 2 popular React libraries used by Fortune 500 companies",
      "Won 'Best Technical Innovation' award at company hackathon for developing AI-powered code review tool reducing bug rate by 45%",
      "Published technical blog posts on Medium with 50K+ total views covering advanced React patterns and performance optimization"
    ],
    projects: [
      {
        name: "Real-Time Analytics Dashboard",
        description: "Built internal analytics platform processing 5M events/day with live data visualization using WebSockets, reducing reporting time from 24 hours to real-time",
        tech: "React, D3.js, WebSockets, Redis, PostgreSQL"
      },
      {
        name: "E-Commerce Platform Migration",
        description: "Led migration from monolithic Rails app to microservices architecture, reducing page load time by 60% and supporting 10x traffic growth",
        tech: "Node.js, Docker, Kubernetes, AWS ECS"
      }
    ]
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-8 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="mb-3">
        <h1 className="text-2xl font-extrabold leading-tight text-indigo-700">{data.name}</h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-indigo-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-indigo-200 bg-indigo-50/30">
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Profile</h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">{data.summary}</p>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Technical Skills</h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-sm text-[8px]">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Tools & Platforms</h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span key={i} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-sm text-[8px]">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Languages</h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-indigo-700">{lang.lang}</span> — {lang.level}
              </p>
            ))}
          </section>

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-1.5">Certifications</h3>
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
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Professional Experience</h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-indigo-700 font-medium mb-1">{exp.company} {exp.location && `• ${exp.location}`}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Key Achievements</h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">{achievement}</li>
              ))}
            </ul>
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Featured Projects</h3>
            {data.projects.map((project, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{project.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {project.description}
                </p>
                <p className="text-[8px] text-indigo-700">
                  <span className="font-semibold">Tech:</span> {project.tech}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-indigo-100 my-3" />

          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-indigo-600 font-semibold mb-2">Education</h3>
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