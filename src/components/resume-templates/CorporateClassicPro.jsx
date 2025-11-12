import React from "react";
import { Header, Section, ExperienceItem, EducationItem, SkillTag, LanguageItem } from "./ResumeBaseLayout";

export default function CorporateClassicPro({ resume }) {
  const r = resume?.personal_info ? resume : null;
  const personal = r?.personal_info || {};
  
  const data = {
    name: personal.full_name || "Ethan Williams",
    title: personal.professional_title || "Senior Financial Analyst",
    contact: {
      email: personal.email || "ethan.williams@email.com",
      phone: personal.phone || "+1 (555) 234-7890",
      location: personal.location || "Zurich, Switzerland",
    },
    summary: personal.summary || "Analytical and detail-oriented financial analyst with 8+ years of experience in corporate finance, M&A, and forecasting. Proven track record of optimizing financial processes and delivering strategic insights to C-level executives.",
    experience: r?.experience?.length > 0 ? r.experience.map(exp => ({
      position: exp.title || exp.position,
      company: exp.company,
      dates: exp.dates,
      bullets: exp.bullets
    })) : [
      {
        position: "Senior Financial Analyst",
        company: "Credit Suisse",
        dates: "2020 – Present",
        bullets: [
          "Developed financial models improving forecasting accuracy by 18%",
          "Collaborated with leadership to optimize quarterly reports for board reviews",
          "Led due diligence for 5 M&A transactions totaling $200M in value"
        ],
      },
      {
        position: "Financial Analyst",
        company: "UBS Group",
        dates: "2017 – 2020",
        bullets: [
          "Managed budgeting and variance analysis for $50M operations",
          "Automated reporting processes reducing preparation time by 30%"
        ],
      }
    ],
    education: r?.education?.length > 0 ? r.education : [
      { degree: "MSc Finance", institution: "University of Zurich", year: "2017" },
      { degree: "BSc Economics", institution: "ETH Zurich", year: "2015" }
    ],
    skills: r?.skills?.length > 0 ? r.skills.map(s => typeof s === 'string' ? s : s.name) : [
      "Financial Modeling", "Excel / VBA", "Budgeting", "Corporate Finance", "Forecasting", "Communication", "M&A Analysis", "Bloomberg Terminal"
    ],
    languages: r?.languages?.length > 0 ? r.languages : [
      { language: "English", level: "Native" },
      { language: "German", level: "Professional" },
      { language: "French", level: "Conversational" }
    ],
  };

  return (
    <div className="bg-white text-gray-900 p-10 w-[210mm] h-[297mm] mx-auto font-sans">
      <Header {...data} />
      
      <Section title="Professional Summary">
        {data.summary}
      </Section>
      
      <Section title="Professional Experience">
        {data.experience.map((exp, i) => (
          <ExperienceItem key={i} {...exp} />
        ))}
      </Section>
      
      <Section title="Education">
        {data.education.map((edu, i) => (
          <EducationItem key={i} {...edu} />
        ))}
      </Section>
      
      <Section title="Core Skills">
        <ul className="flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <SkillTag key={i} skill={s} />
          ))}
        </ul>
      </Section>
      
      <Section title="Languages">
        {data.languages.map((l, i) => (
          <LanguageItem key={i} {...l} />
        ))}
      </Section>
    </div>
  );
}