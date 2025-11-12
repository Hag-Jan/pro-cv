import React from "react";

export default function Harvard({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "40px 48px",
      fontSize: "11px",
      lineHeight: 1.6,
      color: "#111827"
    }}>
      {/* Centered Header */}
      <header style={{ textAlign: "center", marginBottom: "32px", borderBottom: "1px solid #E5E7EB", paddingBottom: "20px" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "28px", fontWeight: "400", margin: "0 0 8px 0" }}>
          {personal.full_name || personal.name || "Your Name"}
        </h1>
        <div style={{ fontSize: "10px", color: "#6B7280" }}>
          {personal.email || "your.email@example.com"} • {personal.phone || "+1 (555) 123-4567"}
        </div>
      </header>

      {/* Education First (Academic Focus) */}
      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "14px", borderBottom: "1px solid #000", paddingBottom: "6px" }}>
          Education
        </h2>
        {edu.length > 0 ? edu.map((ed, idx) => (
          <div key={idx} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong style={{ fontSize: "12px", color: "#111827" }}>
                {ed.institution}
              </strong>
              <span style={{ fontSize: "10px", color: "#6B7280" }}>
                {ed.year || ed.graduation_year || "Expected May 2018"}
              </span>
            </div>
            <div style={{ fontSize: "11px", color: "#374151" }}>
              {ed.degree}
            </div>
            {ed.details && (
              <ul style={{ paddingLeft: "16px", margin: "6px 0 0 0", fontSize: "10px", color: "#6B7280" }}>
                <li>Relevant coursework: {ed.details}</li>
              </ul>
            )}
          </div>
        )) : (
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong style={{ fontSize: "12px", color: "#111827" }}>Harvard University, Extension School</strong>
              <span style={{ fontSize: "10px", color: "#6B7280" }}>Expected May 2018</span>
            </div>
            <div style={{ fontSize: "11px", color: "#374151" }}>
              Master of Liberal Arts, Information Management Systems
            </div>
            <ul style={{ paddingLeft: "16px", margin: "6px 0 0 0", fontSize: "10px", color: "#6B7280" }}>
              <li>Relevant coursework: Database Systems, Web Development, Data Structures</li>
              <li>Dean's List Academic Achievement Award</li>
              <li>GPA: 3.9/4.0 • President of Computer Science Club</li>
            </ul>
          </div>
        )}
      </section>

      {/* Technical Skills */}
      <section style={{ marginBottom: "28px" }}>
        <h2 style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "14px", borderBottom: "1px solid #000", paddingBottom: "6px" }}>
          Technical Skills
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px 16px" }}>
          {(skills.length > 0 ? skills : [
            "Machine Learning",
            "JavaScript",
            "Java Scripting",
            "Java",
            "UI/UX",
            "HCI/HFO Easing",
            "Hadoop",
            "Python/TORCH",
            "Agile/eLab/Con",
            "XML Development"
          ]).map((skill, idx) => (
            <div key={idx} style={{ fontSize: "10px", color: "#374151", display: "flex", alignItems: "flex-start", gap: "4px" }}>
              <span style={{ color: "#6B7280" }}>•</span>
              <span>{typeof skill === 'string' ? skill : skill.name || skill}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      <section>
        <h2 style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "14px", borderBottom: "1px solid #000", paddingBottom: "6px" }}>
          Professional Experience
        </h2>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>
                {job.title || job.position}
              </strong>
              <span style={{ fontSize: "10px", color: "#6B7280" }}>
                {job.dates}
              </span>
            </div>
            <div style={{ fontSize: "10px", color: "#6B7280", fontStyle: "italic", marginBottom: "6px" }}>
              {job.company}, {job.location}
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>Event Corporate & Investment Banking</strong>
                <span style={{ fontSize: "10px", color: "#6B7280" }}>Sep 2015 - present</span>
              </div>
              <div style={{ fontSize: "10px", color: "#6B7280", fontStyle: "italic", marginBottom: "6px" }}>
                Associates | Amsterdam, Netherlands
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Evaluated investment opportunities and supported due diligency processes for tech startups</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Improved firm performance and efficiency through mentoring by being resourceful and data-driven</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Participated in deal sourcing activities and market research initiatives</li>
              </ul>
            </div>
            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>About Blowout</strong>
                <span style={{ fontSize: "10px", color: "#6B7280" }}>Feb 2021 - Sep 2015</span>
              </div>
              <div style={{ fontSize: "10px", color: "#6B7280", fontStyle: "italic", marginBottom: "6px" }}>
                Software Engineer & Technology
              </div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Built web application using React.js supporting peer-to-peer lending platform</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Developed API integrations reducing manual data entry by 60%</li>
              </ul>
            </div>
          </>
        )}
      </section>
    </div>
  );
}