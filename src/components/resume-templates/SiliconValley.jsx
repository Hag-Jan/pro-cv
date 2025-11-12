import React from "react";

export default function SiliconValley({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Sarah Chen",
    title: personal.professional_title || resume?.title || "Full Stack Developer",
    contact: {
      email: personal.email || resume?.contact?.email || "sarah.chen@email.com",
      phone: personal.phone || resume?.contact?.phone || "+1 (555) 234-8901",
      location: personal.location || resume?.contact?.location || "Palo Alto, CA",
      github: "github.com/sarahchen",
      website: "sarahchen.dev"
    },
    summary: personal.summary || resume?.summary || "Creative Full Stack Developer with 5+ years building modern web applications using React, Node.js, and cloud technologies. Open source enthusiast with contributions to popular libraries and frameworks. Passionate about clean code, user experience, and building products that make a difference. Strong believer in agile methodologies and collaborative development.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Full Stack Developer",
        company: "Stripe",
        location: "San Francisco, CA",
        dates: "2022 – Present",
        bullets: [
          "Built payment processing features handling $500M+ in annual transactions with 99.99% uptime using React, TypeScript, and microservices architecture",
          "Developed real-time dashboard processing 10M+ events daily using WebSockets, Redis, and React, reducing data latency from 5s to sub-second",
          "Led technical design for API v3 migration serving 50K+ merchants, ensuring backward compatibility and achieving 90% adoption within 6 months",
          "Mentored 3 junior developers through code reviews, pair programming, and technical workshops, improving team velocity by 30%"
        ]
      },
      {
        role: "Full Stack Developer",
        company: "Notion",
        location: "San Francisco, CA",
        dates: "2019 – 2022",
        bullets: [
          "Implemented collaborative editing features using operational transforms and CRDTs, supporting real-time collaboration for 1M+ concurrent users",
          "Optimized application bundle size by 40% through code splitting, lazy loading, and tree shaking, improving initial load time from 4s to 1.5s",
          "Built comprehensive test suite with 85% code coverage using Jest, Cypress, and React Testing Library, reducing production bugs by 60%",
          "Contributed to open source libraries including rich text editor components with 5K+ GitHub stars and adoption by 50+ companies"
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
      { degree: "B.S. in Computer Science", institution: "Stanford University", location: "Stanford, CA", year: "2019", gpa: "3.9/4.0" }
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location,
      year: edu.year || edu.graduation_year,
      gpa: edu.gpa
    })),
    skills: {
      frontend: ["React", "TypeScript", "Next.js", "Vue.js", "HTML/CSS", "Tailwind CSS"],
      backend: ["Node.js", "Express", "GraphQL", "PostgreSQL", "MongoDB", "Redis"],
      tools: ["Git", "Docker", "AWS", "CI/CD", "Jest", "Webpack"]
    },
    openSource: [
      { project: "react-markdown-editor", description: "Open source Markdown editor with 5K+ stars", role: "Core Contributor" },
      { project: "node-api-boilerplate", description: "TypeScript API starter template with 2K+ stars", role: "Maintainer" }
    ],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "English", level: "Native" },
      { lang: "Mandarin", level: "Native" },
      { lang: "Japanese", level: "Intermediate" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    }))
  };

  return (
    <div
      className="w-[210mm] h-[297mm] bg-white text-gray-900 p-10 mx-auto border border-gray-100 shadow-sm overflow-hidden"
      style={{ fontFamily: "Inter, system-ui, sans-serif", fontSize: "9.5px" }}
    >
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-black leading-tight text-gray-900 mb-1">{data.name}</h1>
        <p className="text-base text-teal-600 font-semibold mb-3">{data.title}</p>
        <div className="flex justify-center items-center gap-3 text-[8.5px] text-gray-600 flex-wrap">
          <span>{data.contact.email}</span>
          <span>•</span>
          <span>{data.contact.phone}</span>
          <span>•</span>
          <span>{data.contact.location}</span>
          <span>•</span>
          <span className="text-teal-600">{data.contact.github}</span>
          <span>•</span>
          <span className="text-teal-600">{data.contact.website}</span>
        </div>
      </header>

      <div className="border-b-2 border-teal-500 mb-5"></div>

      {/* Skills Section - Tags */}
      <section className="mb-6">
        <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-3 text-center">Technical Skills</h2>
        
        <div className="mb-3">
          <p className="text-[8.5px] font-semibold text-gray-700 mb-1.5">Frontend</p>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.frontend.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full text-[8px] font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-[8.5px] font-semibold text-gray-700 mb-1.5">Backend & Database</p>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.backend.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full text-[8px] font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-3">
          <p className="text-[8.5px] font-semibold text-gray-700 mb-1.5">Tools & DevOps</p>
          <div className="flex flex-wrap gap-1.5">
            {data.skills.tools.map((skill, i) => (
              <span key={i} className="px-2.5 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-[8px] font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="mb-5">
        <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-2 text-center">About Me</h2>
        <p className="text-[9px] leading-[1.6] text-gray-700 text-center max-w-4xl mx-auto">{data.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-3 text-center">Work Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4 bg-teal-50/30 rounded-lg p-3 border border-teal-100">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-[10px] text-gray-900">{exp.role}</h3>
              <span className="text-[8px] text-gray-500 font-medium">{exp.dates}</span>
            </div>
            <p className="text-[9px] text-teal-600 font-semibold mb-2">
              {exp.company} {exp.location && `• ${exp.location}`}
            </p>
            <ul className="list-disc list-inside space-y-0.5">
              {exp.bullets.map((bullet, j) => (
                <li key={j} className="text-[8.5px] leading-[1.5] text-gray-700 ml-2">{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Open Source */}
      <section className="mb-5">
        <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-3 text-center">Open Source Contributions</h2>
        <div className="grid grid-cols-2 gap-3">
          {data.openSource.map((project, i) => (
            <div key={i} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-3 border border-teal-200">
              <h3 className="font-bold text-[9px] text-teal-700 mb-1">{project.project}</h3>
              <p className="text-[8px] text-gray-700 mb-1">{project.description}</p>
              <p className="text-[7.5px] text-teal-600 font-semibold">{project.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Languages */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <section>
          <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-2">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-bold text-[9px] text-gray-900">{edu.degree}</p>
              <p className="text-[8.5px] text-gray-600">{edu.institution}</p>
              <p className="text-[8px] text-gray-500">{edu.year} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-[11px] uppercase tracking-wider font-bold text-gray-900 mb-2">Languages</h2>
          <div className="space-y-1">
            {data.languages.map((lang, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-[8.5px] font-semibold text-gray-800">{lang.lang}</span>
                <span className="text-[8px] text-gray-600">{lang.level}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-center text-[7.5px] text-gray-500 mt-4 pt-3 border-t border-gray-200">
        <p>Portfolio & Projects: {data.contact.website} • GitHub: {data.contact.github}</p>
      </footer>
    </div>
  );
}