import React from "react";

export default function Quicksilver({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const langs = r.languages || [];
  const achievements = r.achievements || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      display: "flex",
      fontSize: "11px",
      lineHeight: 1.5
    }}>
      {/* Main Content - 70% */}
      <main style={{ width: "70%", padding: "32px" }}>
        {/* Header with Photo */}
        <header style={{ marginBottom: "28px", display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#E5E7EB",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: "700",
            color: "#9CA3AF"
          }}>
            {(personal.full_name || personal.name || "Y").charAt(0)}
          </div>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px 0", color: "#111827" }}>
              {personal.full_name || personal.name || "Your Name"}
            </h1>
            <p style={{ fontSize: "14px", color: "#6B7280", margin: 0 }}>
              {personal.professional_title || personal.title || "Business Development Consultant"}
            </p>
          </div>
        </header>

        {/* Work Experience */}
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "14px", borderBottom: "2px solid #14B8A6", paddingBottom: "6px" }}>
            Work Experience
          </h2>
          {exp.length > 0 ? exp.map((job, idx) => (
            <div key={idx} style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <strong style={{ fontSize: "12px", color: "#111827" }}>
                  {job.title || job.position}
                </strong>
                <span style={{ fontSize: "10px", color: "#6B7280" }}>
                  {job.dates}
                </span>
              </div>
              <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>
                {job.company}
              </div>
              {job.bullets && (
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  {job.bullets.map((bullet, bidx) => (
                    <li key={bidx} style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          )) : (
            <>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "12px", color: "#111827" }}>Senior Business Consultant</strong>
                  <span style={{ fontSize: "10px", color: "#6B7280" }}>2020 - Present</span>
                </div>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Strategic Solutions Inc.</div>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Achieved 180% of annual revenue target through strategic client partnerships</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Led cross-functional team of 12 professionals on enterprise projects</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Developed market expansion strategy entering 3 new geographic regions</li>
                </ul>
              </div>
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "12px", color: "#111827" }}>Business Analyst</strong>
                  <span style={{ fontSize: "10px", color: "#6B7280" }}>2017 - 2020</span>
                </div>
                <div style={{ fontSize: "11px", color: "#6B7280", marginBottom: "6px" }}>Enterprise Corp</div>
                <ul style={{ paddingLeft: "16px", margin: 0 }}>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Analyzed business requirements for $5M+ projects</li>
                  <li style={{ marginBottom: "4px", color: "#374151", fontSize: "10px" }}>Improved operational efficiency by 35% through process optimization</li>
                </ul>
              </div>
            </>
          )}
        </section>

        {/* Education */}
        <section>
          <h2 style={{ fontSize: "13px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "12px", borderBottom: "2px solid #14B8A6", paddingBottom: "6px" }}>
            Education
          </h2>
          {edu.length > 0 ? edu.map((ed, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>
                {ed.institution} | {ed.year || ed.graduation_year}
              </div>
            </div>
          )) : (
            <div style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "11px", color: "#111827" }}>MBA, Business Administration</strong>
              <div style={{ fontSize: "10px", color: "#6B7280" }}>Northwestern University | 2017</div>
            </div>
          )}
        </section>
      </main>

      {/* Teal Sidebar - 30% */}
      <aside style={{
        width: "30%",
        background: "#14B8A6",
        padding: "32px 20px",
        color: "#fff"
      }}>
        {/* Key Achievements */}
        <section style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", marginBottom: "14px" }}>
            Key Achievements
          </h3>
          <div style={{ fontSize: "10px", lineHeight: 1.8 }}>
            {achievements.length > 0 ? achievements.map((ach, idx) => (
              <div key={idx} style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
                <span>✓</span>
                <span>{typeof ach === 'string' ? ach : ach.description}</span>
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
                  <span>✓</span>
                  <span>Increased revenue by 45% year-over-year</span>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
                  <span>✓</span>
                  <span>Established 20+ strategic partnerships</span>
                </div>
                <div style={{ marginBottom: "10px", display: "flex", gap: "8px" }}>
                  <span>✓</span>
                  <span>Managed portfolio of $10M+ annually</span>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Skills Badges */}
        <section style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", marginBottom: "12px" }}>
            Skills
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {(skills.length > 0 ? skills : [
              "Strategic Planning",
              "Team Leadership",
              "Sales Strategy",
              "Data Analysis",
              "Negotiation",
              "Project Management"
            ]).map((skill, idx) => (
              <span key={idx} style={{
                fontSize: "9px",
                padding: "4px 10px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                color: "#fff",
                fontWeight: "600"
              }}>
                {typeof skill === 'string' ? skill : skill.name || skill}
              </span>
            ))}
          </div>
        </section>

        {/* Training & Courses */}
        <section style={{ marginBottom: "28px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", marginBottom: "12px" }}>
            Training & Courses
          </h3>
          <div style={{ fontSize: "10px", lineHeight: 1.8 }}>
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "600" }}>Advanced Leadership Program</div>
              <div style={{ fontSize: "9px", opacity: 0.9 }}>Harvard Business School, 2022</div>
            </div>
            <div style={{ marginBottom: "8px" }}>
              <div style={{ fontWeight: "600" }}>Certified Scrum Master</div>
              <div style={{ fontSize: "9px", opacity: 0.9 }}>Scrum Alliance, 2021</div>
            </div>
          </div>
        </section>

        {/* Languages */}
        <section>
          <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", marginBottom: "12px" }}>
            Languages
          </h3>
          {(langs.length > 0 ? langs : [
            { language: "English", proficiency: "Native" },
            { language: "Spanish", proficiency: "Professional" }
          ]).map((lang, idx) => {
            const langName = typeof lang === 'string' ? lang : lang.language || lang.name;
            const prof = typeof lang === 'object' ? lang.proficiency : 'Fluent';
            return (
              <div key={idx} style={{ marginBottom: "6px", fontSize: "10px" }}>
                <div style={{ fontWeight: "600" }}>{langName}</div>
                <div style={{ fontSize: "9px", opacity: 0.9 }}>{prof}</div>
              </div>
            );
          })}
        </section>
      </aside>
    </div>
  );
}