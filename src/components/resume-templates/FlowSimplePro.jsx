import React from "react";

export default function FlowSimplePro({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || resume?.name || "Jane Anderson",
    title: personal.professional_title || resume?.title || "Senior Software Engineer",
    contact: {
      email: personal.email || resume?.contact?.email || "jane.anderson@example.com",
      phone: personal.phone || resume?.contact?.phone || "+46 70 123 4567",
      location: personal.location || resume?.contact?.location || "Stockholm, Sweden"
    },
    summary: personal.summary || resume?.summary || "Results-driven Senior Software Engineer with 8+ years of experience building scalable, high-performance web applications using modern JavaScript frameworks and cloud technologies. Proven track record of leading cross-functional teams, architecting complex systems, and delivering innovative solutions that drive business growth. Expert in React, TypeScript, Node.js, and AWS with a passion for clean code, agile methodologies, and continuous improvement. Strong communication skills with ability to translate technical concepts to non-technical stakeholders and mentor junior developers.",
    experience: (r?.experience?.length > 0 ? r.experience : resume?.experience?.length > 0 ? resume.experience : [
      {
        role: "Senior Software Engineer",
        company: "Spotify",
        dates: "2020 – Present",
        bullets: [
          "Architected and deployed microservices infrastructure serving 50M+ monthly active users with 99.99% uptime, reducing system downtime by 85% and improving API response times from 450ms to 180ms",
          "Led team of 6 engineers in rebuilding core playlist recommendation engine using machine learning algorithms, increasing user engagement by 34% and daily active users by 2.1M within 6 months",
          "Implemented comprehensive CI/CD pipeline with automated testing, reducing deployment time from 4 hours to 12 minutes and increasing release frequency from weekly to daily, improving team velocity by 400%",
          "Collaborated with product managers and designers to ship 15+ major features including real-time collaborative playlists, resulting in 18% increase in user retention"
        ],
      },
      {
        role: "Full Stack Developer",
        company: "Klarna",
        dates: "2016 – 2020",
        bullets: [
          "Developed payment processing features handling €120M in daily transactions across 14 European markets with zero downtime during Black Friday peak traffic of 50K requests/second",
          "Optimized database queries and implemented Redis caching strategy, reducing API latency by 67% (from 890ms to 290ms) and cutting infrastructure costs by €45K annually",
          "Mentored 4 junior developers through code reviews and pair programming sessions, improving team velocity by 28% and reducing bug rate by 35% within first quarter",
          "Built responsive customer dashboard using React and GraphQL, improving customer satisfaction score from 3.2 to 4.6 out of 5 based on user feedback surveys"
        ],
      },
    ]).map(exp => ({
      role: exp.role || exp.title || exp.position,
      company: exp.company,
      dates: exp.dates,
      bullets: exp.bullets || []
    })),
    education: (r?.education?.length > 0 ? r.education : resume?.education?.length > 0 ? resume.education : [
      {
        degree: "M.S. in Computer Science",
        institution: "KTH Royal Institute of Technology",
        year: "2014 - 2016",
        details: "Focus: Distributed Systems & Machine Learning"
      },
      {
        degree: "B.S. in Software Engineering",
        institution: "Uppsala University",
        year: "2010 - 2014",
        details: "Graduated with Honors, GPA: 3.8/4.0"
      },
    ]).map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      year: edu.year || edu.graduation_year,
      details: edu.details
    })),
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : resume?.skills?.length > 0 ? resume.skills : [
      "JavaScript/TypeScript",
      "React & Next.js",
      "Node.js & Express",
      "Python & Django",
      "AWS & Docker",
      "PostgreSQL & MongoDB",
      "GraphQL & REST APIs",
      "CI/CD & DevOps",
      "Git & GitHub",
      "Agile/Scrum"
    ],
    tools: ["VS Code", "Jira", "Figma", "Postman", "DataDog", "Terraform", "Jenkins", "Kubernetes"],
    languages: (r?.languages?.length > 0 ? r.languages : resume?.languages?.length > 0 ? resume.languages : [
      { lang: "Swedish", level: "Native" },
      { lang: "English", level: "Fluent" },
      { lang: "German", level: "Intermediate" }
    ]).map(lang => ({
      lang: lang.lang || lang.language,
      level: lang.level || lang.proficiency
    })),
    certifications: r?.certificates?.length > 0 ? r.certificates : resume?.certifications?.length > 0 ? resume.certifications : [
      "AWS Certified Solutions Architect – Associate (2022)",
      "Google Cloud Professional Developer (2021)",
      "Certified Scrum Master (CSM) (2020)"
    ],
    achievements: r?.awards?.length > 0 ? r.awards.map(a => typeof a === 'string' ? a : a.title) : resume?.achievements || [
      "Led migration of legacy monolith to microservices architecture serving 10M+ users, reducing system downtime by 85% and improving deployment frequency by 300%",
      "Open source contributor to React ecosystem with 2.3K GitHub stars across 3 popular libraries used by companies like Netflix, Airbnb, and Tesla",
      "Speaker at Nordic.js 2023 conference presenting 'Scaling Real-Time Applications' to audience of 400+ developers, receiving 4.8/5 rating"
    ],
    projects: r?.projects?.length > 0 ? r.projects : resume?.projects || [
      {
        name: "Real-Time Analytics Dashboard",
        description: "Built internal analytics platform processing 5M events/day with live data visualization, reducing reporting time from 24 hours to real-time",
        tech: "React, D3.js, WebSockets, Redis"
      },
      {
        name: "AI-Powered Code Review Assistant",
        description: "Developed ML-powered tool that automatically reviews pull requests, catching 78% of common bugs before human review",
        tech: "Python, TensorFlow, GitHub API"
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
        <h1 className="text-2xl font-extrabold leading-tight text-blue-700">
          {data.name}
        </h1>
        <p className="text-xs text-gray-600 mt-0.5">{data.title}</p>
        <p className="text-[8.5px] text-gray-500 mt-2">
          {data.contact.email} • {data.contact.phone} • {data.contact.location}
        </p>
        <div className="border-b border-blue-200 mt-3"></div>
      </header>

      {/* Two Column Layout */}
      <div className="flex gap-5">
        {/* Left Column - 34% */}
        <div className="w-[34%] pr-4 border-r border-blue-200 bg-blue-50/30">
          {/* Summary */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">
              Profile
            </h3>
            <p className="text-[9px] leading-[1.5] text-gray-800">
              {data.summary}
            </p>
          </section>

          {/* Skills */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-sm text-[8px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-1">
              {data.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-sm text-[8px]"
                >
                  {tool}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">
              Languages
            </h3>
            {data.languages.map((lang, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4]">
                <span className="font-semibold text-blue-700">{lang.lang}</span> —{" "}
                {lang.level}
              </p>
            ))}
          </section>

          {/* Certifications */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-1.5">
              Certifications
            </h3>
            {data.certifications.map((cert, i) => (
              <p key={i} className="text-[9px] text-gray-800 leading-[1.4] mb-0.5">
                {typeof cert === 'string' ? cert : cert.name || cert.title}
              </p>
            ))}
          </section>
        </div>

        {/* Right Column - 64% */}
        <div className="w-[64%] pl-4">
          {/* Experience */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">
              Professional Experience
            </h3>
            {data.experience.map((exp, i) => (
              <div key={i} className="mb-3">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="font-bold text-[9.5px] text-gray-900">{exp.role}</p>
                  <span className="text-[8px] text-gray-500">{exp.dates}</span>
                </div>
                <p className="text-[9px] text-blue-700 font-medium mb-1">{exp.company}</p>
                <ul className="list-disc list-inside ml-3 mt-1 space-y-0.5">
                  {exp.bullets.map((bullet, j) => (
                    <li key={j} className="text-[8.5px] leading-[1.45] text-gray-700">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <hr className="border-blue-100 my-3" />

          {/* Key Achievements */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">
              Key Achievements
            </h3>
            <ul className="list-disc list-inside ml-3 space-y-1">
              {data.achievements.map((achievement, i) => (
                <li key={i} className="text-[8.5px] leading-[1.45] text-gray-700">
                  {achievement}
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-blue-100 my-3" />

          {/* Projects */}
          <section className="mb-4">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">
              Featured Projects
            </h3>
            {data.projects.map((project, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{project.name}</p>
                <p className="text-[8.5px] leading-[1.4] text-gray-700 mb-0.5">
                  {project.description}
                </p>
                <p className="text-[8px] text-blue-700">
                  <span className="font-semibold">Tech:</span> {project.tech}
                </p>
              </div>
            ))}
          </section>

          <hr className="border-blue-100 my-3" />

          {/* Education */}
          <section className="mb-3">
            <h3 className="text-[9px] uppercase tracking-widest text-blue-600 font-semibold mb-2">
              Education
            </h3>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2">
                <p className="font-bold text-[9px] text-gray-900">{edu.degree}</p>
                <p className="text-[8.5px] text-gray-600">
                  {edu.institution} • {edu.year}
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
        <p className="text-center">
          References available upon request
        </p>
      </footer>
    </div>
  );
}