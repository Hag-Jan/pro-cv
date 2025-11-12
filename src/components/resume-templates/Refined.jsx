import React from "react";

export default function Refined({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const langs = r.languages || [];
  const courses = r.courses || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      display: "flex",
      fontSize: "10px",
      lineHeight: 1.5
    }}>
      {/* Left Column - 35% */}
      <aside style={{
        width: "35%",
        background: "#F9FAFB",
        padding: "32px 24px",
        borderRight: "1px solid #E5E7EB"
      }}>
        {/* Profile Photo */}
        <div style={{ marginBottom: "24px" }}>
          <div style={{
            width: "100px",
            height: "100px",
            borderRadius: "8px",
            background: "#E5E7EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            fontWeight: "700",
            color: "#9CA3AF"
          }}>
            {(personal.full_name || personal.name || "I").charAt(0)}
          </div>
        </div>

        {/* Name & Title */}
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px 0", color: "#111827" }}>
            {personal.full_name || personal.name || "Your Name"}
          </h1>
          <p style={{ fontSize: "11px", color: "#6B7280", margin: 0 }}>
            {personal.professional_title || personal.title || "Area Supervisor"}
          </p>
        </div>

        {/* Contact */}
        <section style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "10px", fontWeight: "700", marginBottom: "10px", color: "#111827" }}>
            📧 your.email@example.com
          </h3>
          <div style={{ fontSize: "9px", color: "#6B7280", lineHeight: 1.8 }}>
            <div>📱 {personal.phone || "+1 (555) 123-4567"}</div>
            <div>📍 {personal.location || "San Francisco, CA"}</div>
            <div>🔗 linkedin.com/in/yourname</div>
          </div>
        </section>

        {/* Languages */}
        <section style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", marginBottom: "10px", color: "#111827" }}>
            Languages
          </h3>
          {(langs.length > 0 ? langs : [
            { language: "Portuguese", level: 5 },
            { language: "German", level: 3 },
            { language: "English", level: 4 }
          ]).map((lang, idx) => {
            const langName = typeof lang === 'string' ? lang : lang.language || lang.name;
            const level = lang.level || 3;
            return (
              <div key={idx} style={{ marginBottom: "8px" }}>
                <div style={{ fontSize: "9px", marginBottom: "3px", color: "#374151" }}>
                  {langName}
                </div>
                <div style={{ display: "flex", gap: "3px" }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} style={{
                      width: "20%",
                      height: "5px",
                      borderRadius: "2px",
                      background: i <= level ? "#111827" : "#E5E7EB"
                    }} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Courses */}
        <section>
          <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", marginBottom: "10px", color: "#111827" }}>
            Courses
          </h3>
          <div style={{ fontSize: "9px", color: "#6B7280", lineHeight: 1.8 }}>
            <div style={{ marginBottom: "6px" }}>• Advanced Project Management</div>
            <div style={{ marginBottom: "6px" }}>• Strategic Leadership</div>
            <div style={{ marginBottom: "6px" }}>• Data Analytics Fundamentals</div>
          </div>
        </section>
      </aside>

      {/* Main Content - 65% */}
      <main style={{ flex: 1, padding: "32px 28px" }}>
        {/* Professional Experience */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "14px", borderBottom: "1px solid #E5E7EB", paddingBottom: "6px" }}>
            Professional Experience
          </h2>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
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
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <strong style={{ fontSize: "11px", color: "#111827" }}>Elderday Services</strong>
                  <span style={{ fontSize: "9px", color: "#6B7280" }}>01/2021 - present</span>
                </div>
                <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px", fontStyle: "italic" }}>
                  Area Supervisor, Berlin, Germany
                </div>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Supervise daily operations overseeing team of 25+ care professionals</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Collaborate with cross-functional teams to drive business growth and operational excellence</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Ensured compliance with health and safety regulations maintaining 98% quality standards</li>
                </ul>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <strong style={{ fontSize: "11px", color: "#111827" }}>Lead Elderday Services</strong>
                  <span style={{ fontSize: "9px", color: "#6B7280" }}>06/2019 - 12/2020</span>
                </div>
                <div style={{ fontSize: "10px", color: "#6B7280", marginBottom: "6px", fontStyle: "italic" }}>
                  Senior Care Facility, Munich, Germany
                </div>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Led team of 10 caregivers providing comprehensive support to elderly clients</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "9px" }}>Developed individualized care plans improving patient satisfaction by 35%</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Education */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "6px" }}>
            Education
          </h2>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "9px", color: "#6B7280" }}>
                {ed.institution}, {ed.location} | {ed.year || ed.graduation_year}
              </div>
            </div>
          )) : (
            <div style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>Bachelor of Arts in Graphic Design</strong>
              <div style={{ fontSize: "9px", color: "#6B7280" }}>
                University of Applied Sciences, Munich | 2019
              </div>
            </div>
          )}
        </section>

        {/* Skills */}
        <section>
          <h2 style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "6px" }}>
            Skills
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {(skills.length > 0 ? skills : [
              "Patient care",
              "Vital signs monitoring",
              "Medical documentation",
              "Team collaboration",
              "Communication",
              "Time management"
            ]).map((skill, idx) => (
              <div key={idx} style={{ fontSize: "9px", color: "#374151", display: "flex", alignItems: "flex-start", gap: "4px" }}>
                <span style={{ color: "#6B7280" }}>•</span>
                <span>{typeof skill === 'string' ? skill : skill.name || skill}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}