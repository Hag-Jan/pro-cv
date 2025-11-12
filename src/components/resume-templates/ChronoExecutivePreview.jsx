import React from "react";

export default function ChronoExecutivePreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview chrono executive" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "32px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6
    }}>
      {/* Header */}
      <header style={{ marginBottom: "28px", textAlign: "center" }}>
        <div style={{ fontWeight: "700", fontSize: "26px", marginBottom: "6px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#6B7280", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>
          {r.title || "Executive Professional"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280" }}>
          {[r.contact?.email, r.contact?.phone, r.contact?.location].filter(Boolean).join(" • ") || "email@example.com • +1 555-0000 • City"}
        </div>
      </header>

      {/* Summary */}
      <section style={{ 
        marginBottom: "28px",
        padding: "14px",
        background: "#F9FAFB",
        borderRadius: "6px",
        borderLeft: "3px solid #2563EB"
      }}>
        <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {r.summary || "Visionary CTO with 18+ years scaling engineering organizations and leading digital transformation. Expert in cloud architecture, team building, product strategy, and driving innovation for high-growth technology companies serving millions of users."}
        </p>
      </section>

      {/* Timeline with dots and years */}
      <section style={{ marginBottom: "28px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "18px", textAlign: "center" }}>
          Professional Timeline
        </div>
        <div style={{ position: "relative" }}>
          {(exp.length > 0 ? exp : [
            { position: "Chief Technology Officer", company: "Tech Unicorn", dates: "2019 - Present", bullets: ["Built engineering org from 50 to 500+ engineers", "Led architecture supporting 200M+ users"] },
            { position: "VP of Engineering", company: "SaaS Startup", dates: "2015 - 2019", bullets: ["Scaled engineering team from 10 to 80 members", "Architected platform achieving 99.99% uptime"] }
          ]).map((job, idx) => (
            <div key={idx} style={{ 
              marginBottom: "20px",
              paddingLeft: "60px",
              position: "relative"
            }}>
              <div style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#2563EB",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: "700",
                flexDirection: "column",
                lineHeight: 1.2
              }}>
                {job.dates?.split(' ')[0] || job.dates?.split('-')[0] || 'NOW'}
              </div>

              <div>
                <strong style={{ fontSize: "13px", color: "#111827", display: "block", marginBottom: "2px" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "20px" }}>
        {/* Education */}
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "10px" }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution}, {ed.year}</div>
            </div>
          )) : (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>M.S. in Computer Science</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>MIT, 2006</div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "10px" }}>
            Expertise
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(skills.length > 0 ? skills : ["Cloud Architecture", "Team Building", "Product Strategy", "Agile", "DevOps", "Security"]).map((skill, idx) => (
              <span key={idx} style={{ 
                fontSize: "10px",
                padding: "5px 10px",
                border: "1px solid #E5E7EB",
                borderRadius: "16px",
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
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {certs.length > 0 ? certs.join(" • ") : "AWS Solutions Architect Professional"}
          </div>
        </section>

        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Languages
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
            }) : "English (Native) • Mandarin (Professional)"}
          </div>
        </section>
      </div>
    </div>
  );
}