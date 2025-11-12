import React from "react";

export default function StructuredClean({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview structured clean" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "12px",
        lineHeight: 1.6
      }}
    >
      {/* Header Band */}
      <header style={{ 
        background: "#F3F4F6", 
        padding: "32px 0", 
        textAlign: "center",
        borderBottom: "1px solid #E5E7EB"
      }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, marginBottom: "6px", color: "#111827" }}>
          {r.full_name || "John Doe"}
        </h1>
        <div style={{ fontSize: "14px", color: "#374151", fontWeight: 600 }}>
          {r.professional_title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", marginTop: "12px", display: "flex", gap: "16px", justifyContent: "center" }}>
          {r.email && <span>{r.email}</span>}
          {r.phone && <span>{r.phone}</span>}
          {r.location && <span>{r.location}</span>}
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: "40px 64px" }}>
        {/* Summary */}
        {r.summary && (
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "12px" }}>
              Professional Summary
            </h2>
            <p style={{ color: "#374151", margin: 0, lineHeight: 1.6 }}>
              {r.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {exp.length > 0 && (
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "16px" }}>
              Professional Experience
            </h2>
            {exp.map((item, idx) => (
              <div key={idx} style={{ 
                marginBottom: "20px", 
                paddingBottom: idx < exp.length - 1 ? "20px" : "0",
                borderBottom: idx < exp.length - 1 ? "1px dotted #E5E7EB" : "none"
              }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#111827", fontSize: "13px" }}>{item.title || item.position}</strong>
                  <div style={{ color: "#6B7280", fontSize: "11px", marginTop: "2px" }}>
                    {item.company} • {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                  </div>
                </div>
                {item.bullets && item.bullets.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: "18px", color: "#374151" }}>
                    {item.bullets.map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "6px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Education & Skills Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {/* Education */}
          {edu.length > 0 && (
            <section>
              <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "12px" }}>
                Education
              </h2>
              {edu.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  <strong style={{ color: "#111827", fontSize: "12px" }}>{item.degree}</strong>
                  <div style={{ color: "#6B7280", fontSize: "11px" }}>
                    {item.institution}
                  </div>
                  <div style={{ color: "#6B7280", fontSize: "10px" }}>
                    {item.graduation_year || item.year}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", marginBottom: "12px" }}>
                Core Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
                  return (
                    <span key={idx} style={{ 
                      fontSize: "11px", 
                      color: "#374151",
                      padding: "4px 8px",
                      background: "#F9FAFB",
                      borderRadius: "4px"
                    }}>
                      {skillName}
                    </span>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}