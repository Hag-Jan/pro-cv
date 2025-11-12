import React from "react";

export default function StructuredCleanPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview structured clean" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Header Block */}
      <header style={{ 
        background: "#F9FAFB", 
        padding: "24px 32px",
        borderBottom: "1px solid #E5E7EB",
        textAlign: "center"
      }}>
        <div style={{ fontWeight: "700", fontSize: "24px", marginBottom: "6px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#6B7280", fontSize: "14px", marginBottom: "10px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280" }}>
          {r.contact?.email || "email@example.com"} • {r.contact?.phone || "+1 555-0000"} • {r.contact?.location || "City"}
        </div>
      </header>

      {/* Content */}
      <div style={{ padding: "32px" }}>
        {/* Summary */}
        <section style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            About
          </div>
          <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
            {r.summary || "Accomplished professional with expertise in driving organizational excellence and implementing strategic initiatives. Strong background in team leadership, stakeholder management, and delivering high-impact solutions across diverse business environments."}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "24px" }}>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "12px" }}>
            Experience
          </div>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ 
              marginBottom: "16px",
              paddingBottom: idx < exp.length - 1 ? "16px" : 0,
              borderBottom: idx < exp.length - 1 ? "1px dotted #E5E7EB" : "none"
            }}>
              <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>
                {job.position}
              </strong>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>
                {job.company} • {job.dates}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px dotted #E5E7EB" }}>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>Director of Operations</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Enterprise Solutions Ltd • 2019 - Present</div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Directed operational strategy for 500+ employee organization</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Achieved 40% efficiency improvement through process automation</li>
                </ul>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>Operations Manager</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Innovation Inc • 2016 - 2019</div>
                <ul style={{ paddingLeft: "18px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Managed daily operations for $10M business unit</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Reduced operational costs by 20% while maintaining quality standards</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Bottom Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "20px" }}>
          {/* Education */}
          <section>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
              Education
            </div>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution}, {ed.year}</div>
              </div>
            )) : (
              <div style={{ marginBottom: "8px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>MBA, Strategy</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>London Business School, 2016</div>
              </div>
            )}
          </section>

          {/* Skills */}
          <section>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
              Skills
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {(skills.length > 0 ? skills : ["Operations Management", "Process Improvement", "Team Leadership", "Strategic Planning"]).map((skill, idx) => (
                <span key={idx} style={{ 
                  fontSize: "10px", 
                  padding: "3px 8px", 
                  background: "#F3F4F6",
                  borderRadius: "4px",
                  color: "#374151"
                }}>
                  {typeof skill === 'string' ? skill : skill.name || skill}
                </span>
              ))}
            </div>
          </section>
        </div>

        {/* Certifications & Languages */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <section>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
              Certifications
            </div>
            <div style={{ fontSize: "10px", color: "#374151" }}>
              {certs.length > 0 ? certs.join(" • ") : "Lean Six Sigma Black Belt • PMP Certified"}
            </div>
          </section>

          <section>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
              Languages
            </div>
            <div style={{ fontSize: "10px", color: "#374151" }}>
              {langs.length > 0 ? langs.map((l, i) => {
                const name = typeof l === 'string' ? l : l.language;
                const prof = typeof l === 'object' ? l.proficiency : '';
                return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
              }) : "English (Native) • German (Fluent)"}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}