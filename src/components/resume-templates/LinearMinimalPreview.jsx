import React from "react";

export default function LinearMinimalPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview linear minimal" style={{
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
      <header style={{ marginBottom: "24px" }}>
        <div style={{ fontWeight: "700", fontSize: "24px", marginBottom: "4px", color: "#111827" }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ color: "#6B7280", fontSize: "14px", marginBottom: "12px" }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "11px", color: "#6B7280", display: "flex", gap: "10px" }}>
          <span>{r.contact?.email || "email@example.com"}</span>
          <span>•</span>
          <span>{r.contact?.phone || "+1 555-0000"}</span>
          <span>•</span>
          <span>{r.contact?.location || "City"}</span>
        </div>
      </header>

      <div style={{ borderTop: "2px solid #111827", marginBottom: "24px" }} />

      {/* Summary */}
      <section style={{ marginBottom: "24px" }}>
        <p style={{ fontSize: "12px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {r.summary || "Corporate Legal Counsel with 10+ years advising on M&A transactions, compliance, and commercial contracts. Specialized in cross-border deals, regulatory matters, and risk management for global organizations."}
        </p>
      </section>

      <div style={{ borderTop: "1px solid #E5E7EB", marginBottom: "24px" }} />

      {/* Experience */}
      <section style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#111827", fontWeight: "700", marginBottom: "14px" }}>
          Experience
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
                <strong style={{ fontSize: "13px", color: "#111827" }}>Senior Legal Counsel</strong>
                <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "12px" }}>2018 - Present</span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>International Law Firm</div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Managed legal affairs for 15+ M&A transactions totaling €500M</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Advised on GDPR compliance for 50+ EU clients</li>
              </ul>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>Associate Attorney</strong>
                <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "12px" }}>2014 - 2018</span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Corporate Law Practice</div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Negotiated commercial contracts and licensing agreements</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Provided legal counsel on corporate governance matters</li>
              </ul>
            </div>
          </>
        )}
      </section>

      <div style={{ borderTop: "1px solid #E5E7EB", marginBottom: "24px" }} />

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "20px" }}>
        {/* Education */}
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#111827", fontWeight: "700", marginBottom: "10px" }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution} • {ed.year}</div>
            </div>
          )) : (
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>LL.M., Corporate Law</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>University of Warsaw • 2014</div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#111827", fontWeight: "700", marginBottom: "10px" }}>
            Skills
          </div>
          <div style={{ fontSize: "11px", color: "#374151", lineHeight: 1.8 }}>
            {(skills.length > 0 ? skills : ["Corporate Law", "M&A", "Contract Negotiation", "Compliance", "Due Diligence", "GDPR"]).map((skill, idx) => (
              <span key={idx}>
                {typeof skill === 'string' ? skill : skill.name || skill}
                {idx < (skills.length || 6) - 1 ? ' • ' : ''}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Certifications & Languages */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#111827", fontWeight: "700", marginBottom: "8px" }}>
            Certifications
          </div>
          <div style={{ fontSize: "11px", color: "#374151" }}>
            {certs.length > 0 ? certs.join(" • ") : "Licensed Attorney - EU Bar"}
          </div>
        </section>

        <section>
          <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#111827", fontWeight: "700", marginBottom: "8px" }}>
            Languages
          </div>
          <div style={{ fontSize: "11px", color: "#374151" }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
            }) : "Polish (Native) • English (Fluent)"}
          </div>
        </section>
      </div>
    </div>
  );
}