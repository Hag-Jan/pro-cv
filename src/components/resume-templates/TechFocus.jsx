import React from "react";

export default function TechFocus({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || "Alex Kumar",
    title: personal.professional_title || "Full Stack Developer",
    contact: {
      email: personal.email || "alex.kumar@email.com",
      phone: personal.phone || "+1 (555) 789-0123",
      location: personal.location || "San Francisco, CA",
    },
    summary: personal.summary || "Passionate full stack developer with 6+ years building scalable web applications. Specialized in React, Node.js, and cloud-native architectures. Strong advocate for clean code and test-driven development.",
    experience: r?.experience?.length > 0 ? r.experience : [
      {
        position: "Senior Full Stack Developer",
        company: "Stripe",
        dates: "2021 – Present",
        bullets: [
          "Built payment processing features handling $50M+ daily transactions",
          "Reduced API latency by 40% through Redis caching implementation",
          "Mentored 6 junior developers on React best practices and code review"
        ],
      },
      {
        position: "Full Stack Developer",
        company: "Shopify",
        dates: "2018 – 2021",
        bullets: [
          "Developed React components used by 2M+ merchants worldwide",
          "Implemented GraphQL API improving data fetching efficiency by 60%"
        ],
      }
    ],
    education: r?.education?.length > 0 ? r.education : [
      { degree: "BS Computer Science", institution: "Stanford University", year: "2018" }
    ],
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : [
      "JavaScript/TypeScript", "React & Redux", "Node.js & Express", "Python", "PostgreSQL & MongoDB", "AWS & Docker", "GraphQL", "Jest & Testing", "CI/CD", "Git"
    ],
    languages: r?.languages?.length > 0 ? r.languages : [
      { language: "English", level: "Native" },
      { language: "Hindi", level: "Professional" }
    ],
  };

  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto font-mono">
      {/* Code-style Header */}
      <header className="bg-gray-900 text-green-400 p-6 font-mono">
        <p className="text-xs mb-2">{'// DEVELOPER_PROFILE'}</p>
        <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
        <p className="text-sm text-green-300 mb-3">{data.title}</p>
        <div className="text-xs text-gray-400 space-y-0.5">
          <p>{'📧'} {data.contact.email}</p>
          <p>{'📱'} {data.contact.phone}</p>
          <p>{'📍'} {data.contact.location}</p>
        </div>
      </header>

      <div className="p-8">
        {/* Summary */}
        <section className="mb-6">
          <h3 className="text-xs font-bold text-gray-900 mb-2 font-mono border-l-4 border-gray-900 pl-2">
            {'// SUMMARY'}
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        {/* Technical Skills */}
        <section className="mb-6">
          <h3 className="text-xs font-bold text-gray-900 mb-2 font-mono border-l-4 border-gray-900 pl-2">
            {'// TECHNICAL_STACK'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((s, i) => (
              <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-800 border border-gray-300 font-mono">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <h3 className="text-xs font-bold text-gray-900 mb-3 font-mono border-l-4 border-gray-900 pl-2">
            {'// WORK_EXPERIENCE'}
          </h3>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4 border-l-2 border-gray-300 pl-4">
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-bold text-sm text-gray-900">{exp.position}</p>
                <span className="text-xs text-gray-500 font-mono">{exp.dates}</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{exp.company}</p>
              <ul className="space-y-1">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-xs text-gray-700 flex items-start">
                    <span className="mr-2 text-green-600 font-bold">{'>'}</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education & Languages */}
        <div className="grid grid-cols-2 gap-6">
          <section>
            <h3 className="text-xs font-bold text-gray-900 mb-2 font-mono border-l-4 border-gray-900 pl-2">
              {'// EDUCATION'}
            </h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="text-xs font-bold text-gray-900">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}, {edu.year}</p>
              </div>
            ))}
          </section>

          <section>
            <h3 className="text-xs font-bold text-gray-900 mb-2 font-mono border-l-4 border-gray-900 pl-2">
              {'// LANGUAGES'}
            </h3>
            {data.languages.map((l, i) => (
              <p key={i} className="text-xs text-gray-700 mb-1">
                <span className="font-bold">{l.language}</span> — {l.level}
              </p>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}