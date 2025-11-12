import React from "react";

export const Section = ({ title, children, className = "" }) => (
  <section className={`mb-6 ${className}`}>
    <h3 className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">
      {title}
    </h3>
    <div className="text-sm text-gray-800 leading-relaxed">{children}</div>
  </section>
);

export const Header = ({ name, title, contact }) => (
  <header className="mb-6 pb-4 border-b border-gray-200">
    <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-xs text-gray-500 mt-2">
      {contact?.email} • {contact?.phone} • {contact?.location}
    </p>
  </header>
);

export const ExperienceItem = ({ position, company, dates, bullets }) => (
  <div className="mb-4">
    <p className="font-semibold text-gray-900">{position}</p>
    <p className="text-sm text-gray-600">
      {company} • {dates}
    </p>
    {bullets && (
      <ul className="list-disc list-inside text-sm mt-1 space-y-1">
        {bullets.map((b, j) => (
          <li key={j} className="text-gray-700">{b}</li>
        ))}
      </ul>
    )}
  </div>
);

export const EducationItem = ({ degree, institution, year }) => (
  <p className="mb-2 text-gray-800">
    <span className="font-semibold">{degree}</span> — {institution} ({year})
  </p>
);

export const SkillTag = ({ skill }) => (
  <li className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 text-sm">
    {skill}
  </li>
);

export const LanguageItem = ({ language, level }) => (
  <p className="mb-1 text-gray-800">
    <span className="font-semibold">{language}</span> — {level}
  </p>
);