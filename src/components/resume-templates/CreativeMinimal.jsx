import React from "react";

export default function CreativeMinimal({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || "Isabella Romano",
    title: personal.professional_title || "UX/UI Designer",
    contact: {
      email: personal.email || "isabella.romano@email.com",
      phone: personal.phone || "+1 (555) 123-4567",
      location: personal.location || "Milan, Italy",
    },
    summary: personal.summary || "Creative UX/UI designer with 7+ years crafting intuitive digital experiences for luxury brands. Expert in user research, prototyping, and design systems. Passionate about creating beautiful, accessible interfaces that delight users.",
    experience: r?.experience?.length > 0 ? r.experience : [
      {
        position: "Senior UX/UI Designer",
        company: "Gucci",
        dates: "2020 – Present",
        bullets: [
          "Redesigned e-commerce platform increasing conversion rate by 45%",
          "Led user research with 500+ luxury consumers across Europe and Asia",
          "Built comprehensive design system adopted across all digital products"
        ],
      },
      {
        position: "UX Designer",
        company: "Prada Group",
        dates: "2017 – 2020",
        bullets: [
          "Designed mobile app achieving 4.8 star rating with 100K+ downloads",
          "Conducted 50+ usability tests improving task completion rate by 60%"
        ],
      }
    ],
    education: r?.education?.length > 0 ? r.education : [
      { degree: "MA Interaction Design", institution: "Politecnico di Milano", year: "2017" },
      { degree: "BA Visual Communication", institution: "IUAV Venice", year: "2015" }
    ],
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : [
      "Figma & Sketch", "Adobe Creative Suite", "User Research", "Prototyping", "Design Systems", "Usability Testing", "Wireframing", "Typography"
    ],
    languages: r?.languages?.length > 0 ? r.languages : [
      { language: "Italian", level: "Native" },
      { language: "English", level: "Fluent" },
      { language: "French", level: "Conversational" }
    ],
  };

  return (
    <div className="bg-white text-gray-900 w-[210mm] h-[297mm] mx-auto font-sans">
      {/* Asymmetric Header */}
      <header className="flex h-32">
        <div className="w-1/3 bg-gray-900 p-6 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {data.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        <div className="w-2/3 p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.name}</h1>
          <p className="text-sm text-gray-600 font-semibold mb-2">{data.title}</p>
          <div className="text-xs text-gray-500 space-y-0.5">
            <p>{data.contact.email}</p>
            <p>{data.contact.phone} • {data.contact.location}</p>
          </div>
        </div>
      </header>

      <div className="p-10">
        {/* Creative Brief */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-6 bg-gray-900"></div>
            <h3 className="text-xs uppercase tracking-widest text-gray-900 font-bold">
              Creative Brief
            </h3>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-6 bg-gray-900"></div>
            <h3 className="text-xs uppercase tracking-widest text-gray-900 font-bold">
              Experience
            </h3>
          </div>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4 ml-3">
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-bold text-sm text-gray-900">{exp.position}</p>
                <span className="text-xs text-gray-500">{exp.dates}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2 italic">{exp.company}</p>
              <ul className="space-y-1">
                {exp.bullets.map((b, j) => (
                  <li key={j} className="text-xs text-gray-700 flex items-start">
                    <span className="mr-2">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Split Grid */}
        <div className="grid grid-cols-5 gap-6">
          <section className="col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gray-900"></div>
              <h3 className="text-xs uppercase tracking-widest text-gray-900 font-bold">
                Education
              </h3>
            </div>
            {data.education.map((edu, i) => (
              <div key={i} className="mb-2 ml-3">
                <p className="text-xs font-bold text-gray-900">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institution}</p>
                <p className="text-xs text-gray-500">{edu.year}</p>
              </div>
            ))}
          </section>

          <section className="col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-6 bg-gray-900"></div>
              <h3 className="text-xs uppercase tracking-widest text-gray-900 font-bold">
                Skills & Languages
              </h3>
            </div>
            <div className="ml-3">
              <div className="flex flex-wrap gap-1.5 mb-3">
                {data.skills.map((s, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-800">
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-xs text-gray-700">
                {data.languages.map((l, i) => (
                  <span key={i}>
                    {l.language} ({l.level})
                    {i < data.languages.length - 1 ? ' • ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}