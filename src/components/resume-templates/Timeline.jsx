import React from "react";

export default function Timeline({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const langs = r.languages || [];
  const achievements = r.achievements || [];
  const courses = r.courses || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "32px",
      fontSize: "9px",
      lineHeight: 1.5,
      color: "#111827"
    }}>
      {/* Header */}
      <header style={{ marginBottom: "24px", textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "700", margin: "0 0 4px 0" }}>
          {personal.full_name || personal.name || "HARPER GARCIA"}
        </h1>
        <p style={{ fontSize: "11px", color: "#6B7280", margin: "0 0 10px 0" }}>
          {personal.professional_title || personal.title || "Financial Analyst | Strategic Management | HR/Org Development"}
        </p>
        <div style={{ fontSize: "8px", color: "#9CA3AF" }}>
          📧 {personal.email || "your.email@example.com"} • 📱 {personal.phone || "+1 (555) 123-4567"} • 📍 {personal.location || "City"}
        </div>
      </header>

      {/* Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "55% 45%", gap: "24px" }}>
        {/* Left: Experience with Timeline */}
        <main>
          <section style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Experience
            </h2>
            {exp.length > 0 ? exp.map((job, idx) => (
              <div key={idx} style={{ marginBottom: "14px", position: "relative", paddingLeft: "16px", borderLeft: "1px solid #E5E7EB" }}>
                <div style={{
                  position: "absolute",
                  left: "-4px",
                  top: "2px",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#6B7280"
                }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <strong style={{ fontSize: "10px", color: "#111827" }}>
                    {job.title || job.position}
                  </strong>
                  <span style={{ fontSize: "8px", color: "#6B7280" }}>
                    {job.dates}
                  </span>
                </div>
                <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>
                  {job.company}
                </div>
                {job.bullets && (
                  <ul style={{ paddingLeft: "12px", margin: 0 }}>
                    {job.bullets.map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "14px", position: "relative", paddingLeft: "16px", borderLeft: "1px solid #E5E7EB" }}>
                  <div style={{ position: "absolute", left: "-4px", top: "2px", width: "7px", height: "7px", borderRadius: "50%", background: "#6B7280" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "10px", color: "#111827" }}>Financial Analyst</strong>
                    <span style={{ fontSize: "8px", color: "#6B7280" }}>01/2021 - Present</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>Corporate Finance Group</div>
                  <ul style={{ paddingLeft: "12px", margin: 0 }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Analyzed financial data and created reports for C-suite executives</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Led budgeting process for $50M+ annual operating budget</li>
                  </ul>
                </div>
                <div style={{ marginBottom: "14px", position: "relative", paddingLeft: "16px", borderLeft: "1px solid #E5E7EB" }}>
                  <div style={{ position: "absolute", left: "-4px", top: "2px", width: "7px", height: "7px", borderRadius: "50%", background: "#6B7280" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "10px", color: "#111827" }}>Business Analyst</strong>
                    <span style={{ fontSize: "8px", color: "#6B7280" }}>06/2018 - 12/2020</span>
                  </div>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "4px" }}>Consulting Firm</div>
                  <ul style={{ paddingLeft: "12px", margin: 0 }}>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Supported strategic projects for Fortune 500 clients</li>
                    <li style={{ marginBottom: "3px", color: "#4B5563", fontSize: "8px" }}>Conducted market research and competitive analysis</li>
                  </ul>
                </div>
              </>
            )}
          </section>
        </main>

        {/* Right: Skills, Education, etc. */}
        <aside>
          {/* Skills Boxes */}
          <section style={{ marginBottom: "18px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "10px" }}>
              Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {(skills.length > 0 ? skills : [
                "Data Analysis",
                "Financial Modeling",
                "Excel/SQL",
                "Strategic Planning",
                "Project Management",
                "Communication"
              ]).map((skill, idx) => (
                <span key={idx} style={{
                  fontSize: "8px",
                  padding: "5px 10px",
                  background: "#F3F4F6",
                  border: "1px solid #E5E7EB",
                  borderRadius: "4px",
                  color: "#374151",
                  fontWeight: "600"
                }}>
                  {typeof skill === 'string' ? skill : skill.name || skill}
                </span>
              ))}
            </div>
          </section>

          {/* Key Achievements */}
          <section style={{ marginBottom: "18px", background: "#F9FAFB", padding: "12px", borderRadius: "6px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
              ✓ Key Achievements
            </h3>
            <div style={{ fontSize: "8px", lineHeight: 1.7, color: "#374151" }}>
              {achievements.length > 0 ? achievements.map((ach, idx) => (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  • {typeof ach === 'string' ? ach : ach.description}
                </div>
              )) : (
                <>
                  <div style={{ marginBottom: "6px" }}>• Delivered $2M cost savings through process improvements</div>
                  <div style={{ marginBottom: "6px" }}>• Achieved 98% accuracy in financial reporting</div>
                  <div style={{ marginBottom: "6px" }}>• Led team of 5 analysts on strategic initiative</div>
                </>
              )}
            </div>
          </section>

          {/* Training */}
          <section style={{ marginBottom: "18px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
              📚 Training & Courses
            </h3>
            <div style={{ fontSize: "8px", color: "#374151", lineHeight: 1.7 }}>
              {courses.length > 0 ? courses.map((course, idx) => (
                <div key={idx} style={{ marginBottom: "6px" }}>• {typeof course === 'string' ? course : course.name}</div>
              )) : (
                <>
                  <div style={{ marginBottom: "6px" }}>• Financial Analysis Certification</div>
                  <div style={{ marginBottom: "6px" }}>• Advanced Excel for Finance</div>
                  <div style={{ marginBottom: "6px" }}>• Strategic Planning Workshop</div>
                </>
              )}
            </div>
          </section>

          {/* Education */}
          <section style={{ marginBottom: "18px" }}>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
              🎓 Education
            </h3>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "8px", fontSize: "8px", color: "#374151" }}>
                <div style={{ fontWeight: "600" }}>{ed.degree}</div>
                <div style={{ color: "#6B7280" }}>{ed.institution}, {ed.year || ed.graduation_year}</div>
              </div>
            )) : (
              <div style={{ marginBottom: "8px", fontSize: "8px", color: "#374151" }}>
                <div style={{ fontWeight: "600" }}>MBA, Finance</div>
                <div style={{ color: "#6B7280" }}>Northwestern University, 2018</div>
              </div>
            )}
          </section>

          {/* Languages with Dots */}
          <section>
            <h3 style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#111827", marginBottom: "8px" }}>
              🌐 Languages
            </h3>
            {(langs.length > 0 ? langs : [
              { language: "English", level: 5 },
              { language: "Spanish", level: 4 }
            ]).map((lang, idx) => {
              const langName = typeof lang === 'string' ? lang : lang.language || lang.name;
              const level = lang.level || 3;
              return (
                <div key={idx} style={{ marginBottom: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "8px", color: "#374151" }}>{langName}</span>
                  <div style={{ display: "flex", gap: "3px" }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: i <= level ? "#111827" : "#E5E7EB"
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        </aside>
      </div>
    </div>
  );
}