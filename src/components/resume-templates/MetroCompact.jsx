import React from "react";

export default function MetroCompact({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview metro compact" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "32px 40px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "10px",
        lineHeight: 1.5
      }}
    >
      {/* Compact Header */}
      <header style={{ marginBottom: "20px", paddingBottom: "12px", borderBottom: "2px solid #2563EB" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, margin: 0, marginBottom: "4px", color: "#2563EB" }}>
              {r.full_name || "John Doe"}
            </h1>
            <div style={{ fontSize: "12px", color: "#374151", fontWeight: 600 }}>
              {r.professional_title || "Professional Title"}
            </div>
          </div>
          <div style={{ fontSize: "9px", color: "#6B7280", textAlign: "right", lineHeight: 1.6 }}>
            {r.email && <div>{r.email}</div>}
            {r.phone && <div>{r.phone}</div>}
            {r.location && <div>{r.location}</div>}
          </div>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Left Column */}
        <div>
          {/* Summary */}
          {r.summary && (
            <section style={{ marginBottom: "18px" }}>
              <h2 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", marginBottom: "8px" }}>
                Summary
              </h2>
              <p style={{ color: "#374151", margin: 0, fontSize: "10px" }}>{r.summary}</p>
            </section>
          )}

          {/* Experience */}
          {exp.length > 0 && (
            <section style={{ marginBottom: "18px" }}>
              <h2 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", marginBottom: "10px" }}>
                Experience
              </h2>
              {exp.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "12px" }}>
                  <strong style={{ color: "#111827", fontSize: "11px", display: "block" }}>
                    {item.title || item.position}
                  </strong>
                  <div style={{ color: "#6B7280", fontSize: "9px", marginBottom: "4px" }}>
                    {item.company} • {item.dates || `${item.start_date || ''} - ${item.current ? 'Now' : item.end_date || ''}`}
                  </div>
                  {item.bullets && item.bullets.length > 0 && (
                    <ul style={{ margin: 0, paddingLeft: "12px", color: "#374151", fontSize: "9px" }}>
                      {item.bullets.slice(0, 2).map((bullet, bidx) => (
                        <li key={bidx} style={{ marginBottom: "3px" }}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {edu.length > 0 && (
            <section style={{ marginBottom: "18px" }}>
              <h2 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", marginBottom: "8px" }}>
                Education
              </h2>
              {edu.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "8px" }}>
                  <strong style={{ color: "#111827", fontSize: "10px", display: "block" }}>
                    {item.degree}
                  </strong>
                  <div style={{ color: "#6B7280", fontSize: "9px" }}>
                    {item.institution}
                  </div>
                  <div style={{ color: "#9CA3AF", fontSize: "8px" }}>
                    {item.graduation_year || item.year}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#2563EB", marginBottom: "8px" }}>
                Skills
              </h2>
              <div style={{ fontSize: "9px", color: "#374151", lineHeight: 1.6 }}>
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
                  return (
                    <span key={idx}>
                      {skillName}
                      {idx < skills.length - 1 ? ' • ' : ''}
                    </span>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}