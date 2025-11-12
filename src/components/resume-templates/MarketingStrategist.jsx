import React from "react";

export default function MarketingStrategist({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || "Jessica Brown",
    title: personal.professional_title || "Senior Marketing Strategist",
    contact: {
      email: personal.email || "jessica.brown@email.com",
      phone: personal.phone || "+1 (555) 012-3456",
      location: personal.location || "Los Angeles, CA",
    },
    summary: personal.summary || "Creative marketing strategist with 9+ years driving brand growth through data-driven campaigns. Expert in digital marketing, content strategy, and customer acquisition. Track record of delivering 300% ROI and building high-performing teams.",
    experience: r?.experience?.length > 0 ? r.experience : [
      {
        position: "Senior Marketing Strategist",
        company: "Adobe",
        dates: "2020 – Present",
        bullets: [
          "Led integrated campaigns generating $40M in pipeline and 20K MQLs quarterly",
          "Managed $5M marketing budget across digital, content, and events with 300% ROI",
          "Built content marketing engine producing 150+ pieces monthly, growing organic traffic by 250%"
        ],
      },
      {
        position: "Marketing Manager",
        company: "HubSpot",
        dates: "2016 – 2020",
        bullets: [
          "Launched ABM program targeting enterprise accounts, closing $15M in new business",
          "Grew social media following from 50K to 500K through influencer partnerships"
        ],
      }
    ],
    education: r?.education?.length > 0 ? r.education : [
      { degree: "MBA Marketing", institution: "UCLA Anderson", year: "2015" },
      { degree: "BA Communications", institution: "USC", year: "2011" }
    ],
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : [
      "Digital Marketing", "Content Strategy", "SEO/SEM", "Marketing Automation", "Brand Management", "Analytics", "Social Media", "Team Leadership", "Budget Management", "Campaign Planning"
    ],
    certifications: r?.certificates?.length > 0 ? r.certificates : [
      "Google Ads Certified",
      "HubSpot Inbound Certified",
      "Facebook Blueprint Certified"
    ]
  };

  return (
    <div className="bg-white text-gray-900 p-9 w-[210mm] h-[297mm] mx-auto font-sans">
      {/* Creative Header with Accent */}
      <header className="mb-6 pb-4 border-b-4 border-rose-900">
        <h1 className="text-3xl font-bold text-rose-900 mb-1">{data.name}</h1>
        <p className="text-base text-gray-700 font-semibold mb-3">{data.title}</p>
        <div className="flex gap-4 text-xs text-gray-600">
          <span>✉ {data.contact.email}</span>
          <span>☎ {data.contact.phone}</span>
          <span>📍 {data.contact.location}</span>
        </div>
      </header>

      {/* Strategic Profile */}
      <section className="mb-5 bg-rose-50 p-4 rounded">
        <h3 className="text-xs uppercase tracking-widest text-rose-900 font-bold mb-2">
          Strategic Profile
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      {/* Professional Experience */}
      <section className="mb-5">
        <h3 className="text-xs uppercase tracking-widest text-rose-900 font-bold mb-3">
          Professional Experience
        </h3>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4 border-l-4 border-rose-900 pl-3">
            <div className="flex justify-between items-baseline mb-1">
              <p className="font-bold text-sm text-gray-900">{exp.position}</p>
              <span className="text-xs text-gray-500">{exp.dates}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{exp.company}</p>
            <ul className="space-y-1">
              {exp.bullets.map((b, j) => (
                <li key={j} className="text-xs text-gray-700 flex items-start">
                  <span className="mr-2 text-rose-900">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Three Column Grid */}
      <div className="grid grid-cols-3 gap-4">
        <section>
          <h3 className="text-xs uppercase tracking-widest text-rose-900 font-bold mb-2">
            Education
          </h3>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="text-xs font-bold text-gray-900">{edu.degree}</p>
              <p className="text-xs text-gray-600">{edu.institution}</p>
              <p className="text-xs text-gray-500">{edu.year}</p>
            </div>
          ))}
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-widest text-rose-900 font-bold mb-2">
            Core Skills
          </h3>
          <ul className="space-y-0.5">
            {data.skills.slice(0, 6).map((s, i) => (
              <li key={i} className="text-xs text-gray-700">• {s}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-xs uppercase tracking-widest text-rose-900 font-bold mb-2">
            Certifications
          </h3>
          <ul className="space-y-0.5">
            {data.certifications.map((cert, i) => (
              <li key={i} className="text-xs text-gray-700">✓ {cert}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}