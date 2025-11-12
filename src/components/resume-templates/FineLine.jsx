import React from "react";

export default function FineLine({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const langs = r.languages || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      display: "flex",
      fontSize: "11px",
      lineHeight: 1.6
    }}>
      {/* Bold Black Left Border - 5% */}
      <div style={{
        width: "12px",
        background: "#000"
      }} />

      {/* Main Content - 95% */}
      <main style={{ flex: 1, padding: "48px 40px" }}>
        {/* Header */}
        <header style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", margin: "0 0 6px 0", color: "#000" }}>
            {personal.full_name || personal.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "13px", color: "#6B7280", margin: "0 0 16px 0", fontStyle: "italic" }}>
            {personal.professional_title || personal.title || "Certified Nursing Assistant"}
          </p>
          <div style={{ fontSize: "10px", color: "#6B7280", lineHeight: 2 }}>
            {personal.email || "your.email@example.com"} | {personal.phone || "+1 (555) 123-4567"} | {personal.location || "San Francisco, CA"}
          </div>
        </header>

        {/* Summary */}
        <section style={{ marginBottom: "28px" }}>
          <p style={{ fontSize: "11px", color: "#374151", lineHeight: 1.7, margin: 0 }}>
            {personal.summary || r.summary || "Dedicated professional with 5+ years of experience in providing compassionate care. Highly skilled in patient care, vital signs monitoring, and medical documentation. Strong expertise in team collaboration and maintaining high standards of patient safety and comfort."}
          </p>
        </section>

        {/* Professional Experience */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "16px", letterSpacing: "0.05em" }}>
            Professional Experience
          </h2>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "12px", color: "#111827" }}>
                  {job.title || job.position}
                </strong>
                <span style={{ fontSize: "10px", color: "#6B7280" }}>
                  {job.dates}
                </span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", fontStyle: "italic", marginBottom: "8px" }}>
                {job.company}, {job.location}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "5px", color: "#374151", fontSize: "10px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "12px", color: "#111827" }}>Nursing Assistant</strong>
                  <span style={{ fontSize: "10px", color: "#6B7280" }}>01/2020 - Present</span>
                </div>
                <div style={{ fontSize: "11px", color: "#6B7280", fontStyle: "italic", marginBottom: "8px" }}>
                  Healthcare Facility, San Francisco, CA
                </div>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "5px", color: "#374151", fontSize: "10px" }}>Provided exceptional care to 15+ patients daily including vital sign monitoring and personal hygiene assistance</li>
                  <li style={{ marginBottom: "5px", color: "#374151", fontSize: "10px" }}>Collaborated with nursing staff and physicians to implement patient care plans</li>
                  <li style={{ marginBottom: "5px", color: "#374151", fontSize: "10px" }}>Maintained accurate medical records and documentation in compliance with regulations</li>
                </ul>
              </div>
              <div style={{ marginBottom: "18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "12px", color: "#111827" }}>Home Health Aide</strong>
                  <span style={{ fontSize: "10px", color: "#6B7280" }}>06/2018 - 12/2019</span>
                </div>
                <div style={{ fontSize: "11px", color: "#6B7280", fontStyle: "italic", marginBottom: "8px" }}>
                  Senior Care Services, Oakland, CA
                </div>
                <ul style={{ paddingLeft: "20px", margin: 0 }}>
                  <li style={{ marginBottom: "5px", color: "#374151", fontSize: "10px" }}>Assisted elderly clients with daily living activities and medication management</li>
                  <li style={{ marginBottom: "5px", color: "#374151", fontSize: "10px" }}>Developed positive relationships with patients and families ensuring high satisfaction</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Education */}
        <section>
          <h2 style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "14px", letterSpacing: "0.05em" }}>
            Education
          </h2>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>
                {ed.degree}
              </strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>
                {ed.institution} | {ed.year || ed.graduation_year}
              </div>
            </div>
          )) : (
            <div style={{ marginBottom: "12px" }}>
              <strong style={{ fontSize: "11px", color: "#111827", display: "block" }}>
                Certified Nursing Assistant Program
              </strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>
                San Francisco Community College | 2018
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}