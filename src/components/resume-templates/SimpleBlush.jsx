import React from "react";

export default function SimpleBlush({ resume = {} }) {
  const r = resume;
  const personal = r.personal_info || r.personalInfo || {};
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const langs = r.languages || [];
  const tools = r.tools || [];
  const books = r.favorite_books || [];
  
  return (
    <div style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      fontFamily: "Inter, system-ui, sans-serif",
      padding: "40px 36px",
      fontSize: "10px",
      lineHeight: 1.6,
      color: "#1F2937"
    }}>
      {/* Centered Header */}
      <header style={{ textAlign: "center", marginBottom: "28px" }}>
        <h1 style={{ fontSize: "26px", fontWeight: "700", margin: "0 0 4px 0", color: "#000" }}>
          {personal.full_name || personal.name || "Your Name"}
        </h1>
        <p style={{ fontSize: "12px", color: "#6B7280", margin: 0 }}>
          {personal.professional_title || personal.title || "UX/UI Designer"}
        </p>
      </header>

      {/* Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "28px" }}>
        {/* Left Column */}
        <div>
          {/* Professional Experience */}
          <section style={{ marginBottom: "24px" }}>
            <h2 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Professional Experience
            </h2>
            {exp.length > 0 ? exp.map((job, idx) => (
              <div key={idx} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <strong style={{ fontSize: "11px", color: "#111827" }}>
                    {job.title || job.position}
                  </strong>
                  <span style={{ fontSize: "9px", color: "#6B7280" }}>
                    {job.dates}
                  </span>
                </div>
                <div style={{ fontSize: "10px", color: "#6B7280", fontStyle: "italic", marginBottom: "4px" }}>
                  {job.company}, {job.location}
                </div>
                {job.bullets && (
                  <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "9px" }}>
                    {job.bullets.map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "3px", color: "#374151" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "11px", color: "#111827" }}>Senior UX/UI Designer</strong>
                    <span style={{ fontSize: "9px", color: "#6B7280" }}>03/2020 - present</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#6B7280", fontStyle: "italic", marginBottom: "4px" }}>
                    Design Studio, Berlin, Germany
                  </div>
                  <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "9px" }}>
                    <li style={{ marginBottom: "3px", color: "#374151" }}>Designed user-centered digital experiences for 15+ client projects</li>
                    <li style={{ marginBottom: "3px", color: "#374151" }}>Led design thinking workshops with stakeholders and development teams</li>
                    <li style={{ marginBottom: "3px", color: "#374151" }}>Created comprehensive design systems used across multiple products</li>
                  </ul>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                    <strong style={{ fontSize: "11px", color: "#111827" }}>UX Designer</strong>
                    <span style={{ fontSize: "9px", color: "#6B7280" }}>06/2017 - 02/2020</span>
                  </div>
                  <div style={{ fontSize: "10px", color: "#6B7280", fontStyle: "italic", marginBottom: "4px" }}>
                    Tech Agency, Hamburg, Germany
                  </div>
                  <ul style={{ paddingLeft: "14px", margin: 0, fontSize: "9px" }}>
                    <li style={{ marginBottom: "3px", color: "#374151" }}>Conducted user research and usability testing for web and mobile applications</li>
                    <li style={{ marginBottom: "3px", color: "#374151" }}>Collaborated with developers to implement design solutions</li>
                  </ul>
                </div>
              </>
            )}
          </section>

          {/* Education */}
          <section>
            <h2 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "12px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Education
            </h2>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>{ed.degree}</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>
                  {ed.institution}, {ed.location} | {ed.year || ed.graduation_year}
                </div>
              </div>
            )) : (
              <div style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "11px", color: "#111827" }}>Bachelor of Arts in Graphic Design</strong>
                <div style={{ fontSize: "10px", color: "#6B7280" }}>
                  University of Applied Sciences, Munich, Germany | 2017
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Skills */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "10px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Skills
            </h3>
            <div style={{ fontSize: "9px", color: "#374151", lineHeight: 1.8 }}>
              {(skills.length > 0 ? skills : [
                "Wireframing and prototyping",
                "User research",
                "Interaction design",
                "Visual design",
                "Design systems",
                "HTML & CSS"
              ]).map((skill, idx) => (
                <div key={idx}>• {typeof skill === 'string' ? skill : skill.name || skill}</div>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "10px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Languages
            </h3>
            {(langs.length > 0 ? langs : [
              { language: "German", level: 5 },
              { language: "English", level: 4 }
            ]).map((lang, idx) => {
              const langName = typeof lang === 'string' ? lang : lang.language || lang.name;
              const level = lang.level || 4;
              return (
                <div key={idx} style={{ marginBottom: "6px" }}>
                  <div style={{ fontSize: "9px", marginBottom: "2px", color: "#374151" }}>
                    {langName}
                  </div>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} style={{
                        width: "20%",
                        height: "4px",
                        background: i <= level ? "#000" : "#E5E7EB"
                      }} />
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Tools */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "10px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Tools
            </h3>
            <div style={{ fontSize: "9px", color: "#374151", lineHeight: 1.8 }}>
              {tools.length > 0 ? tools.map((tool, idx) => (
                <div key={idx}>• {typeof tool === 'string' ? tool : tool.name}</div>
              )) : (
                <>
                  <div>• Figma, Prototype</div>
                  <div>• Adobe Creative Suite</div>
                  <div>• Sketch, InVision</div>
                </>
              )}
            </div>
          </section>

          {/* Awards */}
          <section style={{ marginBottom: "20px" }}>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "10px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Awards
            </h3>
            <div style={{ fontSize: "9px", color: "#374151", lineHeight: 1.8 }}>
              <div style={{ marginBottom: "6px" }}>
                <div style={{ fontWeight: "600" }}>Red Dot Design Award</div>
                <div style={{ color: "#6B7280" }}>Category of "Website / commerce platform"</div>
              </div>
            </div>
          </section>

          {/* Favorite Books */}
          <section>
            <h3 style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#000", marginBottom: "10px", borderBottom: "1px solid #E5E7EB", paddingBottom: "4px" }}>
              Most Proud Of
            </h3>
            <div style={{ fontSize: "9px", color: "#374151", lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                Designed and delivered a website app for a non-profit organization that helped raise $50,000 for educational programs.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}