import React from "react";

export default function NeutralSerifPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview neutral serif" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "40px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "13px",
      lineHeight: 1.8
    }}>
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ 
          fontFamily: "Georgia, serif",
          fontSize: "30px",
          fontWeight: "400",
          fontStyle: "italic",
          marginBottom: "10px",
          color: "#374151"
        }}>
          {r.name || "John Doe"}
        </div>
        <div style={{ 
          fontFamily: "Georgia, serif",
          fontSize: "13px",
          color: "#6B7280",
          fontWeight: "600",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "16px"
        }}>
          {r.title || "Professional Title"}
        </div>
        <div style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 2 }}>
          {r.contact?.email && <div>{r.contact.email}</div>}
          {r.contact?.phone && <div>{r.contact.phone}</div>}
          {r.contact?.location && <div>{r.contact.location}</div>}
          {!r.contact && (
            <>
              <div>email@example.com</div>
              <div>+1 (555) 123-4567</div>
              <div>City, Country</div>
            </>
          )}
        </div>
      </header>

      <div style={{ borderTop: "1px solid #E5E7EB", marginBottom: "32px" }} />

      {/* Summary */}
      <section style={{ marginBottom: "32px" }}>
        <div style={{ 
          fontFamily: "Georgia, serif",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "12px"
        }}>
          Professional Summary
        </div>
        <p style={{ fontSize: "12px", color: "#4B5563", margin: 0, textAlign: "justify" }}>
          {r.summary || "Distinguished research professional with 18+ years leading pharmaceutical R&D programs and clinical development. Extensive expertise in oncology therapeutics, regulatory affairs, and team leadership. Published author with 30+ peer-reviewed articles in top-tier scientific journals."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "32px" }}>
        <div style={{ 
          fontFamily: "Georgia, serif",
          fontSize: "14px",
          fontWeight: "600",
          color: "#374151",
          marginBottom: "16px"
        }}>
          Professional Experience
        </div>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "20px" }}>
            <strong style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#374151" }}>
              {job.position}
            </strong>
            <div style={{ fontSize: "12px", color: "#6B7280", fontStyle: "italic", marginTop: "2px" }}>
              {job.company} • {job.dates}
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "22px", margin: "8px 0 0 0" }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "6px", color: "#4B5563", fontSize: "12px" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "20px" }}>
              <strong style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#374151" }}>Research Director</strong>
              <div style={{ fontSize: "12px", color: "#6B7280", fontStyle: "italic", marginTop: "2px" }}>
                BioPharma Research Institute • 2016 - Present
              </div>
              <ul style={{ paddingLeft: "22px", margin: "8px 0 0 0" }}>
                <li style={{ marginBottom: "6px", color: "#4B5563", fontSize: "12px" }}>Lead research organization of 80+ scientists developing cancer therapies</li>
                <li style={{ marginBottom: "6px", color: "#4B5563", fontSize: "12px" }}>Directed development of 3 FDA-approved drugs generating $2B revenue</li>
                <li style={{ marginBottom: "6px", color: "#4B5563", fontSize: "12px" }}>Secured $50M+ in NIH and private research funding</li>
              </ul>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <strong style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "#374151" }}>Senior Scientist</strong>
              <div style={{ fontSize: "12px", color: "#6B7280", fontStyle: "italic", marginTop: "2px" }}>
                Medical Research Center • 2010 - 2016
              </div>
              <ul style={{ paddingLeft: "22px", margin: "8px 0 0 0" }}>
                <li style={{ marginBottom: "6px", color: "#4B5563", fontSize: "12px" }}>Conducted clinical research on novel oncology therapeutics</li>
                <li style={{ marginBottom: "6px", color: "#4B5563", fontSize: "12px" }}>Published 15 first-author papers in Nature and Science journals</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Bottom Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "24px" }}>
        {/* Education */}
        <section>
          <div style={{ 
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "10px"
          }}>
            Education
          </div>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "12px", color: "#374151" }}>{ed.degree}</strong>
              <div style={{ fontSize: "11px", color: "#6B7280", fontStyle: "italic" }}>
                {ed.institution}, {ed.year}
              </div>
            </div>
          )) : (
            <div style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "12px", color: "#374151" }}>Ph.D. in Molecular Biology</strong>
              <div style={{ fontSize: "11px", color: "#6B7280", fontStyle: "italic" }}>Harvard University, 2010</div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <div style={{ 
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "10px"
          }}>
            Expertise
          </div>
          <div style={{ fontSize: "11px", color: "#4B5563", lineHeight: 2 }}>
            {(skills.length > 0 ? skills : ["Drug Development", "Clinical Research", "Team Leadership", "Grant Writing", "Regulatory Affairs", "Project Management"]).map((skill, idx) => (
              <span key={idx}>
                {typeof skill === 'string' ? skill : skill.name || skill}
                {idx < (skills.length || 6) - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Certifications & Languages */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" }}>
        <section>
          <div style={{ 
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px"
          }}>
            Certifications
          </div>
          <div style={{ fontSize: "11px", color: "#4B5563" }}>
            {certs.length > 0 ? certs.join(", ") : "Board Certified - Clinical Pharmacology"}
          </div>
        </section>

        <section>
          <div style={{ 
            fontFamily: "Georgia, serif",
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "8px"
          }}>
            Languages
          </div>
          <div style={{ fontSize: "11px", color: "#4B5563" }}>
            {langs.length > 0 ? langs.map((l, i) => {
              const name = typeof l === 'string' ? l : l.language;
              const prof = typeof l === 'object' ? l.proficiency : '';
              return `${name}${prof ? ` (${prof})` : ''}${i < langs.length - 1 ? ', ' : ''}`;
            }) : "English (Native)"}
          </div>
        </section>
      </div>
    </div>
  );
}