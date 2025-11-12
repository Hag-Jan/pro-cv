import React from "react";

export default function SteadyForm({ resume = {} }) {
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
      padding: "36px 40px",
      fontSize: "10px",
      lineHeight: 1.6,
      color: "#111827"
    }}>
      {/* Header with Photo on Right */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: "26px", fontWeight: "700", margin: "0 0 6px 0", color: "#111827" }}>
            {personal.full_name || personal.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 14px 0" }}>
            {personal.professional_title || personal.title || "Master's Student in Renewable Energy Systems"}
          </p>
          <div style={{ fontSize: "9px", color: "#9CA3AF", lineHeight: 1.9 }}>
            <div>📧 {personal.email || "your.email@example.com"}</div>
            <div>📱 {personal.phone || "+1 (555) 123-4567"}</div>
            <div>📍 {personal.location || "Munich, Germany"}</div>
            <div>🔗 linkedin.com/in/yourname</div>
          </div>
        </div>
        <div style={{
          width: "85px",
          height: "85px",
          borderRadius: "50%",
          background: "#E5E7EB",
          marginLeft: "24px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "26px",
          fontWeight: "700",
          color: "#9CA3AF"
        }}>
          {(personal.full_name || personal.name || "R").charAt(0)}
        </div>
      </header>

      {/* Profile */}
      <section style={{ marginBottom: "24px", padding: "12px", background: "#F9FAFB", borderRadius: "6px" }}>
        <h2 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
          Profile
        </h2>
        <p style={{ fontSize: "10px", lineHeight: 1.7, color: "#374151", margin: 0 }}>
          {personal.summary || r.summary || "Currently pursuing a Master of Science in Renewable Energy Systems with a specialization in Chemical Engineering. High-impact engineering student with proven ability to deliver innovative solutions. Passionate about sustainable technology and its applications in addressing global energy challenges."}
        </p>
      </section>

      {/* Experience */}
      <section style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "14px", borderBottom: "1px solid #000", paddingBottom: "6px" }}>
          Experience
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
            <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px" }}>
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
                <strong style={{ fontSize: "11px", color: "#111827" }}>Research Intern</strong>
                <span style={{ fontSize: "9px", color: "#6B7280" }}>04/2023 - 10/2023</span>
              </div>
              <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px" }}>
                Fraunhofer Institute, Munich, Germany
              </div>
              <ul style={{ paddingLeft: "16px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Conducted research on solar cell efficiency focusing on perovskite materials</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Analyzed experimental data using Python and MATLAB statistical tools</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Co-authored research paper submitted to Journal of Renewable Energy</li>
              </ul>
            </div>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>Technical Internship</strong>
                <span style={{ fontSize: "9px", color: "#6B7280" }}>01/2022 - 03/2022</span>
              </div>
              <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px" }}>
                Siemens Energy, Munich, Germany
              </div>
              <ul style={{ paddingLeft: "16px", margin: 0 }}>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Supported engineering team in wind turbine optimization projects</li>
                <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Performed technical analysis on renewable energy systems</li>
              </ul>
            </div>
          </>
        )}
      </section>

      {/* Education */}
      <section>
        <h2 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "12px", borderBottom: "1px solid #000", paddingBottom: "6px" }}>
          Education
        </h2>
        {edu.length > 0 ? edu.map((ed, idx) => (
          <div key={idx} style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>
                {ed.degree}
              </strong>
              <span style={{ fontSize: "9px", color: "#6B7280" }}>
                {ed.year || ed.graduation_year}
              </span>
            </div>
            <div style={{ fontSize: "10px", color: "#6B7280" }}>
              {ed.institution}, {ed.location}
            </div>
          </div>
        )) : (
          <div style={{ marginBottom: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>
                Master of Science in Renewable Energy Systems
              </strong>
              <span style={{ fontSize: "9px", color: "#6B7280" }}>
                Expected 2025
              </span>
            </div>
            <div style={{ fontSize: "10px", color: "#6B7280" }}>
              Technical University of Munich, Munich, Germany
            </div>
            <div style={{ fontSize: "9px", color: "#6B7280", marginTop: "4px" }}>
              Relevant coursework: Wind energy technologies, grid integration, sustainability science
            </div>
          </div>
        )}
      </section>
    </div>
  );
}