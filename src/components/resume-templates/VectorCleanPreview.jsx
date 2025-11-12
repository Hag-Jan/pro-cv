import React from "react";

export default function VectorCleanPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview vector clean" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "28px 32px 28px 36px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6,
      position: "relative"
    }}>
      {/* Left accent line */}
      <div style={{
        position: "absolute",
        left: "24px",
        top: "28px",
        bottom: "28px",
        width: "3px",
        background: "linear-gradient(to bottom, #2563EB 0%, #93C5FD 100%)",
        borderRadius: "2px"
      }} />

      {/* Header */}
      <header style={{ marginBottom: "24px" }}>
        <div style={{ fontWeight: "700", fontSize: "24px", marginBottom: "4px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#2563EB", fontSize: "14px", fontWeight: "600", marginBottom: "10px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {r.contact?.email && <span>{r.contact.email}</span>}
          {r.contact?.phone && <span>•</span>}
          {r.contact?.phone && <span>{r.contact.phone}</span>}
          {r.contact?.location && <span>•</span>}
          {r.contact?.location && <span>{r.contact.location}</span>}
          {!r.contact && <span>email@example.com • +1 555-0000 • City</span>}
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: "22px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Profile
        </div>
        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
          {r.summary || "Strategic Product Manager with 9+ years launching B2B SaaS products from 0 to 1M+ users. Expert in product strategy, user research, roadmap planning, and cross-functional leadership driving measurable business impact."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "22px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "12px" }}>
          Professional Experience
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong style={{ fontSize: "13px", color: "#111827" }}>
                {job.position}
              </strong>
              <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "12px" }}>
                {job.dates}
              </span>
            </div>
            <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>
              {job.company}
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
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>Senior Product Manager</strong>
                <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "12px" }}>2019 - Present</span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Payments Platform Inc.</div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Launched payment API adopted by 100K+ developers worldwide</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Drove product strategy generating $50M ARR growth</li>
              </ul>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>Product Manager</strong>
                <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "12px" }}>2016 - 2019</span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Tech Startup</div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Launched marketplace feature adopted by 500K+ users</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Conducted 100+ user interviews to validate product-market fit</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "18px" }}>
        {/* Education */}
        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution} • {ed.year}</div>
            </div>
          )) : (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>MBA, Entrepreneurship</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>London Business School • 2016</div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Skills
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(skills.length > 0 ? skills : ["Product Strategy", "User Research", "SQL", "A/B Testing", "Agile", "Analytics"]).map((skill, idx) => (
              <span key={idx} style={{ 
                fontSize: "10px",
                padding: "4px 8px",
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {certs.length > 0 ? certs.join(" • ") : "Pragmatic Marketing • CSPO"}
          </div>
        </section>

        <section>
          <div style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
            Languages
          </div>
          <div style={{ fontSize: "10px", color: "#374151" }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
            }) : "English (Native)"}
          </div>
        </section>
      </div>
    </div>
  );
}