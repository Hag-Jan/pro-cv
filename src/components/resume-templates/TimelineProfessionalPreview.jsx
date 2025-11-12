import React from "react";

export default function TimelineProfessionalPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview timeline professional" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "28px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "28px" }}>
        <div style={{ fontWeight: "700", fontSize: "24px", marginBottom: "6px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#6B7280", fontSize: "14px", marginBottom: "10px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280" }}>
          {[r.contact?.email, r.contact?.phone, r.contact?.location].filter(Boolean).join(" • ") || "email@example.com • +1 555-0000 • City"}
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: "24px", padding: "12px", background: "#F9FAFB", borderRadius: "6px" }}>
        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#374151", margin: 0, textAlign: "center" }}>
          {r.summary || "Dedicated professional with comprehensive experience in project management and strategic planning. Skilled in leading cross-functional teams, managing complex initiatives, and delivering results that exceed stakeholder expectations."}
        </p>
      </section>

      {/* Timeline Experience */}
      <section style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "16px", textAlign: "center" }}>
          Professional Timeline
        </div>
        <div style={{ position: "relative", paddingLeft: "100px", borderLeft: "2px solid #E5E7EB", marginLeft: "50px" }}>
          {(exp.length > 0 ? exp : [
            { position: "Project Manager", company: "Tech Solutions", dates: "2019 - Present", bullets: ["Led 15+ strategic projects with $10M+ budget", "Achieved 98% on-time delivery rate"] },
            { position: "Business Analyst", company: "Digital Corp", dates: "2016 - 2019", bullets: ["Analyzed requirements for enterprise applications", "Improved process efficiency by 30%"] }
          ]).map((job, idx) => (
            <div key={idx} style={{ marginBottom: "20px", position: "relative" }}>
              <div style={{ 
                position: "absolute",
                left: "-100px",
                top: 0,
                width: "80px",
                textAlign: "right",
                fontSize: "11px",
                color: "#6B7280",
                fontWeight: "600"
              }}>
                {job.dates}
              </div>
              
              <div style={{
                position: "absolute",
                left: "-20px",
                top: "4px",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#2563EB",
                border: "2px solid #fff"
              }} />

              <div style={{ paddingLeft: "16px" }}>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block" }}>
                  {job.position}
                </strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>
                  {job.company}
                </div>
                {job.bullets && (
                  <ul style={{ paddingLeft: "16px", margin: 0 }}>
                    {job.bullets.map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "18px" }}>
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
              <strong style={{ fontSize: "11px", color: "#111827" }}>MBA, Project Management</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>MIT Sloan, 2016</div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Skills
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(skills.length > 0 ? skills : ["Agile/Scrum", "Stakeholder Management", "Risk Management", "Budget Planning"]).map((skill, idx) => (
              <span key={idx} style={{ 
                fontSize: "10px", 
                padding: "4px 8px",
                border: "1px solid #E5E7EB",
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {certs.length > 0 ? certs.join(" • ") : "PMP • Scrum Master (CSM) • Prince2"}
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
            }) : "English (Fluent) • French (Professional)"}
          </div>
        </section>
      </div>
    </div>
  );
}