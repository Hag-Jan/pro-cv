import React from "react";

export default function PrimeBalancedPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview prime balanced" style={{
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
      {/* Split Header */}
      <header style={{ 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "24px",
        paddingBottom: "16px",
        borderBottom: "1px solid #E5E7EB"
      }}>
        <div>
          <div style={{ fontWeight: "700", fontSize: "24px", marginBottom: "4px", color: "#111827" }}>
            {r.name || "John Doe"}
          </div>
          <div style={{ color: "#2563EB", fontSize: "14px", fontWeight: "600" }}>
            {r.title || "Professional Title"}
          </div>
        </div>
        <div style={{ textAlign: "right", fontSize: "11px", color: "#6B7280" }}>
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
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Profile
        </div>
        <p style={{ fontSize: "12px", lineHeight: 1.6, color: "#374151", margin: 0 }}>
          {r.summary || "Creative UX Designer with 8+ years crafting intuitive digital experiences for luxury brands and e-commerce platforms. Expert in user research, prototyping, and design systems that drive engagement and conversion."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "22px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "12px" }}>
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
                <strong style={{ fontSize: "13px", color: "#111827" }}>Senior UX Designer</strong>
                <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "12px" }}>2019 - Present</span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Luxury Fashion Brand</div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Redesigned e-commerce platform increasing conversion by 45%</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Led UX research with 500+ luxury consumers globally</li>
              </ul>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "13px", color: "#111827" }}>UX Designer</strong>
                <span style={{ fontSize: "11px", color: "#6B7280", marginLeft: "12px" }}>2016 - 2019</span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Digital Agency</div>
              <ul style={{ paddingLeft: "18px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Designed user interfaces for 20+ client projects</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "11px" }}>Built comprehensive design system used across teams</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "8px" }}>
          Skills
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {(skills.length > 0 ? skills : ["Figma", "Sketch", "User Research", "Prototyping", "Design Systems", "Usability Testing"]).map((skill, idx) => (
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

      {/* Education */}
      <section style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
          Education
        </div>
        {edu.length > 0 ? edu.map((ed, idx) => (
          <div key={idx} style={{ marginBottom: "6px" }}>
            <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>
              {ed.degree}
            </strong>
            <div style={{ fontSize: "10px", color: "#6B7280" }}>{ed.institution}</div>
            <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{ed.year}</div>
          </div>
        )) : (
          <div style={{ marginBottom: "6px" }}>
            <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>M.A. in Design</strong>
            <div style={{ fontSize: "10px", color: "#6B7280" }}>Design Institute</div>
            <div style={{ fontSize: "10px", color: "#9CA3AF" }}>2016</div>
          </div>
        )}
      </section>

      {/* Certifications */}
      <section style={{ marginBottom: "16px" }}>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
          Certifications
        </div>
        <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.6 }}>
          {certs.length > 0 ? certs.join(" • ") : "Nielsen Norman UX • Google UX Design"}
        </div>
      </section>

      {/* Languages */}
      <section>
        <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#6B7280", fontWeight: "600", marginBottom: "6px" }}>
          Languages
        </div>
        <div style={{ fontSize: "10px", color: "#374151", lineHeight: 1.6 }}>
          {langs.length > 0 ? langs.map((l, i) => {
            const name = typeof l === 'string' ? l : l.language;
            const prof = typeof l === 'object' ? l.proficiency : '';
            return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ' • ' : ''}`;
          }) : "Italian (Native) • English (Fluent)"}
        </div>
      </section>
    </div>
  );
}