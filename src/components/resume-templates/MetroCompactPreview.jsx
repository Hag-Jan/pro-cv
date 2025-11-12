import React from "react";

export default function MetroCompactPreview({ resume = {} }) {
  const r = resume;
  const exp = r.experience || [];
  const edu = r.education || [];
  const skills = r.skills || [];
  const certs = r.certifications || [];
  const langs = r.languages || [];
  
  return (
    <div aria-label="resume preview metro compact" style={{
      width: "210mm",
      height: "297mm",
      background: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "24px",
      color: "#111827",
      fontFamily: "Inter, system-ui, sans-serif",
      boxSizing: "border-box",
      fontSize: "10px",
      lineHeight: 1.5
    }}>
      {/* Compact Header */}
      <header style={{ 
        marginBottom: "16px",
        paddingBottom: "10px",
        borderBottom: "2px solid #2563EB",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start"
      }}>
        <div>
          <div style={{ fontWeight: "700", fontSize: "20px", marginBottom: "3px", color: "#2563EB" }}>
            {r.name || "John Doe"}
          </div>
          <div style={{ fontSize: "12px", color: "#374151", fontWeight: "600" }}>
            {r.title || "Professional Title"}
          </div>
        </div>
        <div style={{ fontSize: "9px", color: "#6B7280", textAlign: "right", lineHeight: 1.6 }}>
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

      {/* Two Columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {/* Left Column */}
        <div>
          {/* Summary */}
          <section style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#2563EB", marginBottom: "6px" }}>
              Summary
            </div>
            <p style={{ fontSize: "9px", color: "#374151", margin: 0 }}>
              {r.summary || "Cloud-native DevOps engineer with 7+ years automating infrastructure and CI/CD pipelines. Specialized in Kubernetes, Terraform, and multi-cloud deployments at scale."}
            </p>
          </section>

          {/* Experience */}
          <section style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#2563EB", marginBottom: "8px" }}>
              Experience
            </div>
            {exp.length > 0 ? exp.map((job, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <strong style={{ fontSize: "10px", color: "#111827", display: "block" }}>
                  {job.position}
                </strong>
                <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "3px" }}>
                  {job.company} • {job.dates}
                </div>
                {job.bullets && (
                  <ul style={{ paddingLeft: "10px", margin: 0, fontSize: "8px" }}>
                    {job.bullets.slice(0, 2).map((bullet, bidx) => (
                      <li key={bidx} style={{ marginBottom: "2px", color: "#374151" }}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            )) : (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <strong style={{ fontSize: "10px", color: "#111827", display: "block" }}>Sr. DevOps Engineer</strong>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "3px" }}>Cloud Systems • 2020 - Present</div>
                  <ul style={{ paddingLeft: "10px", margin: 0, fontSize: "8px" }}>
                    <li style={{ marginBottom: "2px", color: "#374151" }}>Automated deployment reducing release time by 75%</li>
                    <li style={{ marginBottom: "2px", color: "#374151" }}>Managed Kubernetes clusters serving 100M+ users</li>
                  </ul>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong style={{ fontSize: "10px", color: "#111827", display: "block" }}>DevOps Engineer</strong>
                  <div style={{ fontSize: "9px", color: "#6B7280", marginBottom: "3px" }}>Tech Innovations • 2017 - 2020</div>
                  <ul style={{ paddingLeft: "10px", margin: 0, fontSize: "8px" }}>
                    <li style={{ marginBottom: "2px", color: "#374151" }}>Built CI/CD pipelines using Jenkins and GitLab</li>
                    <li style={{ marginBottom: "2px", color: "#374151" }}>Reduced infrastructure costs by 30% with AWS optimization</li>
                  </ul>
                </div>
              </>
            )}
          </section>

          {/* Certifications */}
          <section>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#2563EB", marginBottom: "6px" }}>
              Certifications
            </div>
            <div style={{ fontSize: "8px", color: "#374151", lineHeight: 1.6 }}>
              {certs.length > 0 ? certs.map((cert, idx) => (
                <div key={idx}>• {typeof cert === 'string' ? cert : cert.name || cert}</div>
              )) : (
                <>
                  <div>• CKA (Certified Kubernetes Admin)</div>
                  <div>• AWS DevOps Professional</div>
                  <div>• Terraform Associate</div>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          <section style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#2563EB", marginBottom: "6px" }}>
              Education
            </div>
            {edu.length > 0 ? edu.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "9px", color: "#111827", display: "block" }}>
                  {ed.degree}
                </strong>
                <div style={{ fontSize: "8px", color: "#6B7280" }}>{ed.institution}</div>
                <div style={{ fontSize: "8px", color: "#9CA3AF" }}>{ed.year}</div>
              </div>
            )) : (
              <div style={{ marginBottom: "6px" }}>
                <strong style={{ fontSize: "9px", color: "#111827", display: "block" }}>B.S. in Computer Science</strong>
                <div style={{ fontSize: "8px", color: "#6B7280" }}>Tech University</div>
                <div style={{ fontSize: "8px", color: "#9CA3AF" }}>2017</div>
              </div>
            )}
          </section>

          {/* Skills */}
          <section style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#2563EB", marginBottom: "6px" }}>
              Skills
            </div>
            <div style={{ fontSize: "9px", color: "#374151", lineHeight: 1.6 }}>
              {(skills.length > 0 ? skills : ["Kubernetes", "Docker", "Terraform", "Jenkins", "AWS", "Python", "Bash", "Monitoring"]).map((skill, idx) => (
                <span key={idx}>
                  {typeof skill === 'string' ? skill : skill.name || skill}
                  {idx < (skills.length || 8) - 1 ? ' • ' : ''}
                </span>
              ))}
            </div>
          </section>

          {/* Languages */}
          <section>
            <div style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#2563EB", marginBottom: "6px" }}>
              Languages
            </div>
            <div style={{ fontSize: "9px", color: "#374151", lineHeight: 1.6 }}>
              {langs.length > 0 ? langs.map((l, i) => (
                <div key={i}>{typeof l === 'string' ? l : `${l.language} (${l.proficiency || 'Fluent'})`}</div>
              )) : (
                <>
                  <div>English (Native)</div>
                  <div>Japanese (Professional)</div>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}