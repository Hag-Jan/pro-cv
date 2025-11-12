import React from "react";

export default function TrueBlue({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "32px 40px",
      fontSize: "10px",
      lineHeight: 1.6,
      color: "#1F2937"
    }}>
      {/* Header with Photo on Right */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 6px 0", color: "#3B82F6" }}>
            {personal.full_name || personal.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "14px", color: "#6B7280", margin: "0 0 12px 0" }}>
            {personal.professional_title || personal.title || "Molecular & Cellular Biology Student"}
          </p>
          <div style={{ fontSize: "9px", color: "#9CA3AF", lineHeight: 1.8 }}>
            <div>📧 {personal.email || "your.email@example.com"}</div>
            <div>📱 {personal.phone || "+1 (555) 123-4567"}</div>
            <div>📍 {personal.location || "Cambridge, MA"}</div>
            <div>🔗 linkedin.com/in/yourname</div>
          </div>
        </div>
        <div style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          background: "#E5E7EB",
          marginLeft: "24px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          fontWeight: "700",
          color: "#9CA3AF"
        }}>
          {(personal.full_name || personal.name || "S").charAt(0)}
        </div>
      </header>

      {/* Professional Summary */}
      <section style={{ marginBottom: "24px", padding: "14px", background: "#F9FAFB", borderRadius: "6px", borderLeft: "3px solid #3B82F6" }}>
        <h2 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#3B82F6", marginBottom: "8px" }}>
          Professional Summary
        </h2>
        <p style={{ fontSize: "10px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {personal.summary || r.summary || "Dedicated molecular biology student with extensive experience in genetic engineering, plasmid design, and laboratory research. Proven track record in conducting independent research projects and collaborating with interdisciplinary teams. Strong analytical and problem-solving skills with expertise in CRISPR technology and molecular techniques."}
        </p>
      </section>

      {/* Research Experience */}
      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#3B82F6", marginBottom: "14px", borderBottom: "2px solid #3B82F6", paddingBottom: "6px" }}>
          Research Experience
        </h2>
        {exp.length > 0 ? exp.map((job, idx) => (
          <div key={idx} style={{ marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>
                {job.title || job.position}
              </strong>
              <span style={{ fontSize: "9px", color: "#6B7280" }}>
                {job.dates}
              </span>
            </div>
            <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px", fontStyle: "italic" }}>
              {job.company}, {job.location}
            </div>
            {job.bullets && (
              <ul style={{ paddingLeft: "16px", margin: 0 }}>
                {job.bullets.map((bullet, bidx) => (
                  <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        )) : (
          <>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>Research Assistant, Molecular Biology Lab</strong>
                <span style={{ fontSize: "9px", color: "#6B7280" }}>01/2023 - 12/2023</span>
              </div>
              <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px", fontStyle: "italic" }}>
                Harvard University, Cambridge, MA
              </div>
              <ul style={{ paddingLeft: "16px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Conducted genetic engineering experiments using CRISPR-Cas9 technology</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Analyzed gene expression data contributing to 2 published research papers</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Collaborated with team of 6 researchers on cancer therapeutics project</li>
              </ul>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>Undergraduate Researcher</strong>
                <span style={{ fontSize: "9px", color: "#6B7280" }}>08/2022 - 12/2022</span>
              </div>
              <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px", fontStyle: "italic" }}>
                Biology Department, Harvard University
              </div>
              <ul style={{ paddingLeft: "16px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Performed PCR amplification and gel electrophoresis for DNA analysis</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Maintained detailed laboratory notebooks and prepared research presentations</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Education */}
      <section>
        <h2 style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#3B82F6", marginBottom: "14px", borderBottom: "2px solid #3B82F6", paddingBottom: "6px" }}>
          Education
        </h2>
        {edu.length > 0 ? edu.map((ed, idx) => (
          <div key={idx} style={{ marginBottom: "12px" }}>
            <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>
              {ed.degree}
            </strong>
            <div style={{ fontSize: "9px", color: "#6B7280" }}>
              {ed.institution} | {ed.year || ed.graduation_year}
            </div>
            {ed.details && (
              <div style={{ fontSize: "9px", color: "#6B7280", marginTop: "4px" }}>
                {ed.details}
              </div>
            )}
          </div>
        )) : (
          <div style={{ marginBottom: "12px" }}>
            <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>
              Master of Science in Renewable Energy Systems
            </strong>
            <div style={{ fontSize: "9px", color: "#6B7280" }}>
              Technical University of Munich | Expected 2025
            </div>
            <div style={{ fontSize: "9px", color: "#6B7280", marginTop: "4px" }}>
              Specialization: Solar and wind energy technologies, grid integration
            </div>
          </div>
        )}
      </section>
    </div>
  );
}