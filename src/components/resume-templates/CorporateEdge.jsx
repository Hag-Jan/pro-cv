import React from "react";

export default function CorporateEdge({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview corporate edge" 
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
      {/* Header Bar */}
      <header style={{ 
        background: "#F3F4F6", 
        padding: "32px 48px",
        borderBottom: "3px solid #0F172A"
      }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, margin: 0, marginBottom: "8px", color: "#0F172A", letterSpacing: "-0.02em" }}>
          {r.full_name || "John Doe"}
        </h1>
        <div style={{ fontSize: "15px", color: "#374151", fontWeight: 600, marginBottom: "12px" }}>
          {r.professional_title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "16px" }}>
          {r.email && <span>{r.email}</span>}
          {r.phone && <span>{r.phone}</span>}
          {r.location && <span>{r.location}</span>}
        </div>
      </header>

      {/* Content */}
      <main style={{ padding: "40px 48px" }}>
        {/* Summary */}
        {r.summary && (
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0F172A", marginBottom: "12px", borderBottom: "2px solid #E5E7EB", paddingBottom: "8px" }}>
              Executive Summary
            </h2>
            <p style={{ color: "#374151", margin: 0, lineHeight: 1.7 }}>{r.summary}</p>
          </section>
        )}

        {/* Experience */}
        {exp.length > 0 && (
          <section style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0F172A", marginBottom: "16px", borderBottom: "2px solid #E5E7EB", paddingBottom: "8px" }}>
              Professional Experience
            </h2>
            {exp.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "18px" }}>
                <div style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#0F172A", fontSize: "14px", display: "block", marginBottom: "4px" }}>
                    {item.title || item.position}
                  </strong>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#6B7280", fontSize: "12px", fontWeight: 600 }}>
                      {item.company}
                    </span>
                    <span style={{ color: "#9CA3AF", fontSize: "11px" }}>
                      {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                    </span>
                  </div>
                </div>
                {item.bullets && item.bullets.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: "20px", color: "#374151" }}>
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
              <h2 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0F172A", marginBottom: "12px", borderBottom: "2px solid #E5E7EB", paddingBottom: "8px" }}>
                Education
              </h2>
              {edu.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  <strong style={{ color: "#0F172A", fontSize: "12px" }}>{item.degree}</strong>
                  <div style={{ color: "#6B7280", fontSize: "11px" }}>
                    {item.institution}
                  </div>
                  <div style={{ color: "#9CA3AF", fontSize: "10px" }}>
                    {item.graduation_year || item.year}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0F172A", marginBottom: "12px", borderBottom: "2px solid #E5E7EB", paddingBottom: "8px" }}>
                Core Skills
              </h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
                  return (
                    <span key={idx} style={{ 
                      fontSize: "11px", 
                      padding: "6px 12px", 
                      background: "#F9FAFB", 
                      color: "#374151",
                      border: "1px solid #E5E7EB",
                      fontWeight: 500
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