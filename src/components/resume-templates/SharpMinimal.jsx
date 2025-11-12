import React from "react";

export default function SharpMinimal({ resume = {} }) {
  const r = resume.personal_info || resume || {};
  const exp = resume.experience || [];
  const edu = resume.education || [];
  const skills = resume.skills || [];
  
  return (
    <div 
      aria-label="A4 preview sharp minimal" 
      style={{
        width: "210mm",
        height: "297mm",
        boxSizing: "border-box",
        background: "#ffffff",
        padding: "48px",
        color: "#111827",
        fontFamily: "Inter, system-ui, sans-serif",
        fontSize: "12px",
        lineHeight: 1.6
      }}
    >
      {/* Centered Name */}
      <header style={{ textAlign: "center", marginBottom: "32px", paddingBottom: "24px", borderBottom: "2px solid #111827" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700, margin: 0, marginBottom: "6px", color: "#111827", letterSpacing: "-0.02em" }}>
          {r.full_name || "JOHN DOE"}
        </h1>
        <div style={{ fontSize: "13px", color: "#6B7280", fontWeight: 600, marginBottom: "12px" }}>
          {r.professional_title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280" }}>
          {[r.email, r.phone, r.location].filter(Boolean).join(" | ")}
        </div>
      </header>

      {/* Summary - Full Width */}
      {r.summary && (
        <section style={{ marginBottom: "28px", paddingBottom: "28px", borderBottom: "1px solid #E5E7EB" }}>
          <p style={{ color: "#374151", margin: 0, textAlign: "center", fontSize: "12px", lineHeight: 1.7 }}>
            {r.summary}
          </p>
        </section>
      )}

      {/* Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
        {/* Left: Experience */}
        <section>
          <h2 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "16px" }}>
            Experience
          </h2>
          {exp.length > 0 ? (
            exp.map((item, idx) => (
              <div key={idx} style={{ 
                marginBottom: "16px", 
                paddingBottom: "16px", 
                borderBottom: idx < exp.length - 1 ? "1px solid #F3F4F6" : "none" 
              }}>
                <strong style={{ color: "#111827", fontSize: "12px", display: "block", marginBottom: "2px" }}>
                  {item.title || item.position}
                </strong>
                <div style={{ color: "#6B7280", fontSize: "11px", marginBottom: "6px" }}>
                  {item.company}
                </div>
                <div style={{ color: "#9CA3AF", fontSize: "10px", marginBottom: "8px" }}>
                  {item.dates || `${item.start_date || ''} - ${item.current ? 'Present' : item.end_date || ''}`}
                </div>
                {item.bullets && item.bullets.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: "16px", color: "#374151", fontSize: "11px" }}>
                    {item.bullets.slice(0, 2).map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "4px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          ) : (
            <div style={{ color: "#6B7280", fontSize: "11px" }}>No experience listed</div>
          )}
        </section>

        {/* Right: Education & Skills */}
        <div>
          {/* Education */}
          {edu.length > 0 && (
            <section style={{ marginBottom: "24px" }}>
              <h2 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "12px" }}>
                Education
              </h2>
              {edu.map((item, idx) => (
                <div key={idx} style={{ marginBottom: "10px" }}>
                  <strong style={{ color: "#111827", fontSize: "12px", display: "block" }}>
                    {item.degree}
                  </strong>
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
              <h2 style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#111827", marginBottom: "12px" }}>
                Skills
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {skills.map((skill, idx) => {
                  const skillName = typeof skill === 'string' ? skill : skill.name || skill.skill;
                  return (
                    <div key={idx} style={{ 
                      fontSize: "11px", 
                      color: "#374151",
                      paddingLeft: "12px",
                      borderLeft: "2px solid #E5E7EB"
                    }}>
                      {skillName}
                    </div>
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