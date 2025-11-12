import React from "react";

export default function CalibreModernPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview calibre modern" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "12px",
      lineHeight: 1.6,
      display: "flex"
    }}>
      {/* Vertical Name */}
      <aside style={{ 
        width: "100px",
        background: "#F9FAFB",
        borderRight: "2px solid #2563EB",
        padding: "32px 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{ 
          writingMode: "vertical-rl",
          transform: "rotate(180deg)",
          fontSize: "22px",
          fontWeight: "700",
          color: "#111827",
          letterSpacing: "0.05em"
        }}>
          {r.name || "JOHN DOE"}
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "32px" }}>
        {/* Header */}
        <header style={{ marginBottom: "24px" }}>
          <div style={{ color: "#2563EB", fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
            {r.title || "Professional Title"}
          </div>
          <div style={{ fontSize: "11px", color: "#6B7280", lineHeight: 1.8 }}>
            {r.contact?.email && <div>{r.contact.email}</div>}
            {r.contact?.phone && <div>{r.contact.phone}</div>}
            {r.contact?.location && <div>{r.contact.location}</div>}
            {!r.contact && (
              <>
                <div>email@example.com</div>
                <div>+1 555-0000</div>
                <div>City</div>
              </>
            )}
          </div>
        </header>

        {/* Summary */}
        <section style={{ marginBottom: "22px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
            Overview
          </div>
          <p style={{ fontSize: "11px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
            {r.summary || "Cloud-native architect with 11+ years designing scalable infrastructure for Fortune 500 enterprises. Expert in multi-cloud strategies, cost optimization, and security compliance across AWS, Azure, and GCP platforms."}
          </p>
        </section>

        {/* Experience */}
        <section style={{ marginBottom: "22px" }}>
          <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "12px" }}>
            Professional Experience
          </div>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "14px" }}>
              <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>
                {job.position}
              </strong>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>
                {job.company} • {job.dates}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "3px", color: "#374151" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "14px" }}>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>Principal Cloud Architect</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Global Consulting • 2019 - Present</div>
                <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Architected cloud solutions for Fortune 500 clients managing $30M cloud spend</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Led cloud migration reducing operational costs by 40%</li>
                </ul>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <strong style={{ fontSize: "12px", color: "#111827", display: "block", marginBottom: "2px" }}>Cloud Architect</strong>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "4px" }}>Tech Enterprise • 2015 - 2019</div>
                <ul style={{ paddingLeft: "16px", margin: 0, fontSize: "10px" }}>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Designed multi-cloud infrastructure across AWS and Azure</li>
                  <li style={{ marginBottom: "3px", color: "#374151" }}>Implemented security frameworks achieving SOC 2 compliance</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Bottom Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "18px" }}>
          {/* Education */}
          <section>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
              Education
            </div>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution}, {ed.year}</div>
              </div>
            )) : (
              <div style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>M.Tech in Computer Science</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>IIT Bombay, 2013</div>
              </div>
            )}
          </section>

          {/* Skills */}
          <section>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
              Skills
            </div>
            <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.8 }}>
              {(skills.length > 0 ? skills : ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Cloud Security"]).map((skill, idx) => (
                <div key={idx}>• {typeof skill === 'string' ? skill : skill.name || skill}</div>
              ))}
            </div>
          </section>
        </div>

        {/* Certifications & Languages */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <section>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
              Certifications
            </div>
            <div style={{ fontSize: "10px", color: "#374151" }}>
              {certs.length > 0 ? certs.join(" • ") : "AWS Solutions Architect Pro • Azure Solutions Architect • GCP Professional"}
            </div>
          </section>

          <section>
            <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
              Languages
            </div>
            <div style={{ fontSize: "10px", color: "#374151" }}>
              {langs.length > 0 ? langs.map((l, i) => {
                const name = typeof l === 'string' ? l : l.language;
                const prof = typeof l === 'object' ? l.proficiency : '';
                return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
              }) : "English (Fluent) • Hindi (Native)"}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}