import React from "react";

/**
 * Centralized PDF Export Utility
 * Generates print-optimized HTML that triggers browser's native PDF save dialog
 * 
 * Usage:
 * import { exportResumeAsPDF, exportCoverLetterAsPDF } from "@/components/common/PDFExporter";
 * await exportResumeAsPDF(resumeData);
 */

// Common print styles for all PDF exports
const getPrintStyles = () => `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  @page {
    size: A4;
    margin: 0;
  }
  
  @media print {
    /* Remove ALL browser headers and footers */
    @page { 
      margin: 0;
      size: A4;
    }
    
    /* Hide browser-generated headers/footers */
    header, footer, .header, .footer { display: none !important; }
    
    /* Remove page numbers, dates, URLs */
    @page :first { margin-top: 0; }
    @page { margin: 0; }
    
    body { 
      width: 210mm;
      margin: 0 auto;
      background: white;
      padding: 0;
    }
    
    .no-print { display: none !important; }
    .page-break { page-break-after: always; }
    
    /* Ensure no extra margins or padding */
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      width: 210mm;
      height: auto;
    }
  }
  
  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #1a1a1a;
    background: white;
    padding: 20mm 15mm;
    max-width: 210mm;
    margin: 0 auto;
  }
  
  h1 {
    font-size: 28px;
    color: #2563EB;
    margin-bottom: 8px;
    font-weight: 700;
    border-bottom: 3px solid #2563EB;
    padding-bottom: 8px;
  }
  
  h2 {
    font-size: 18px;
    color: #1E40AF;
    margin-top: 24px;
    margin-bottom: 12px;
    font-weight: 600;
    border-bottom: 2px solid #E5E7EB;
    padding-bottom: 4px;
  }
  
  .contact-info {
    margin: 12px 0 20px 0;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 13px;
    color: #4B5563;
  }
  
  .summary {
    margin: 16px 0;
    padding: 12px;
    background: #F3F4F6;
    border-left: 4px solid #2563EB;
    font-size: 14px;
    line-height: 1.7;
  }
  
  .item {
    margin-bottom: 16px;
    page-break-inside: avoid;
  }
  
  .item-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 4px;
  }
  
  .item-title {
    font-size: 15px;
    font-weight: 600;
    color: #1F2937;
  }
  
  .item-subtitle {
    font-size: 14px;
    color: #6B7280;
    margin-bottom: 2px;
  }
  
  .item-date {
    font-size: 12px;
    color: #9CA3AF;
    font-style: italic;
  }
  
  ul {
    margin: 8px 0 0 20px;
    padding: 0;
  }
  
  li {
    margin-bottom: 4px;
    font-size: 13px;
    line-height: 1.6;
  }
  
  .skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }
  
  .skill-badge {
    background: #EFF6FF;
    color: #1E40AF;
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #BFDBFE;
  }
  
  .print-instructions {
    position: fixed;
    top: 10px;
    right: 10px;
    background: #2563EB;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 1000;
  }
  
  .print-button {
    background: white;
    color: #2563EB;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 8px;
    width: 100%;
    font-size: 14px;
  }
  
  .print-button:hover {
    background: #F3F4F6;
  }
`;

// Generate filename from name
const generateFilename = (name, type = 'resume') => {
  const cleanName = (name || type).toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_');
  const timestamp = Date.now();
  return `${type}_${cleanName}_${timestamp}`;
};

// Trigger print dialog
const triggerPrint = (html, filename) => {
  const printWindow = window.open('', '_blank');
  
  if (!printWindow) {
    // Fallback: Download HTML if pop-up blocked
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_print_to_pdf.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('⚠️ Pop-up blocked!\n\nDownloaded HTML file instead.\nOpen it in your browser and press Ctrl/Cmd+P to save as PDF.\n\nIMPORTANT: In print settings, uncheck "Headers and footers" option.');
    return false;
  }
  
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.document.title = filename;
  return true;
};

/**
 * Export Resume as PDF
 */
export const exportResumeAsPDF = (resume) => {
  const filename = generateFilename(resume.personal_info?.full_name, 'resume');
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${filename}</title>
  <style>${getPrintStyles()}</style>
</head>
<body>
  <div class="print-instructions no-print">
    <div style="margin-bottom: 8px;">📄 PDF Export Ready</div>
    <button class="print-button" onclick="window.print()">💾 Save as PDF</button>
    <div style="font-size: 11px; margin-top: 8px; opacity: 0.9; line-height: 1.4;">
      <strong>Instructions:</strong><br>
      1. Press Ctrl+P (Win) or Cmd+P (Mac)<br>
      2. Select "Save as PDF"<br>
      3. <strong>Uncheck "Headers and footers"</strong><br>
      4. Set margins to "None" or "Minimum"<br>
      5. Click Save
    </div>
  </div>

  <h1>${resume.personal_info?.full_name || 'Your Name'}</h1>
  
  <div class="contact-info">
    ${resume.personal_info?.email ? `<span>✉️ ${resume.personal_info.email}</span>` : ''}
    ${resume.personal_info?.phone ? `<span>📱 ${resume.personal_info.phone}</span>` : ''}
    ${resume.personal_info?.location ? `<span>📍 ${resume.personal_info.location}</span>` : ''}
    ${resume.personal_info?.linkedin ? `<span>🔗 ${resume.personal_info.linkedin}</span>` : ''}
    ${resume.personal_info?.website ? `<span>🌐 ${resume.personal_info.website}</span>` : ''}
  </div>
  
  ${resume.personal_info?.summary ? `
    <div class="summary">
      <strong>Professional Summary</strong><br>
      ${resume.personal_info.summary}
    </div>
  ` : ''}
  
  ${resume.experience && resume.experience.length > 0 ? `
    <h2>Professional Experience</h2>
    ${resume.experience.map(exp => `
      <div class="item">
        <div class="item-header">
          <div class="item-title">${exp.title || ''}</div>
          <div class="item-date">${exp.start_date || ''} - ${exp.current ? 'Present' : exp.end_date || ''}</div>
        </div>
        <div class="item-subtitle">${exp.company || ''} ${exp.location ? `• ${exp.location}` : ''}</div>
        ${exp.bullets && exp.bullets.length > 0 ? `
          <ul>
            ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('')}
  ` : ''}
  
  ${resume.education && resume.education.length > 0 ? `
    <h2>Education</h2>
    ${resume.education.map(edu => `
      <div class="item">
        <div class="item-header">
          <div class="item-title">${edu.degree || ''}</div>
          <div class="item-date">${edu.graduation_year || ''}</div>
        </div>
        <div class="item-subtitle">${edu.institution || ''} ${edu.location ? `• ${edu.location}` : ''}</div>
        ${edu.gpa ? `<div style="font-size: 13px; color: #6B7280; margin-top: 4px;">GPA: ${edu.gpa}</div>` : ''}
      </div>
    `).join('')}
  ` : ''}
  
  ${resume.skills && resume.skills.length > 0 ? `
    <h2>Skills</h2>
    <div class="skills-container">
      ${resume.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
    </div>
  ` : ''}
  
  ${resume.projects && resume.projects.length > 0 ? `
    <h2>Projects</h2>
    ${resume.projects.map(project => `
      <div class="item">
        <div class="item-title">${project.name || ''}</div>
        <div style="margin-top: 6px; font-size: 13px;">${project.description || ''}</div>
        ${project.technologies && project.technologies.length > 0 ? `
          <div style="font-size: 12px; color: #6B7280; margin-top: 4px;">
            <strong>Technologies:</strong> ${project.technologies.join(', ')}
          </div>
        ` : ''}
      </div>
    `).join('')}
  ` : ''}
  
  ${resume.certificates && resume.certificates.length > 0 ? `
    <h2>Certifications</h2>
    ${resume.certificates.map(cert => `
      <div class="item">
        <div class="item-header">
          <div class="item-title">${cert.name || ''}</div>
          <div class="item-date">${cert.date || ''}</div>
        </div>
        <div class="item-subtitle">${cert.issuer || ''}</div>
      </div>
    `).join('')}
  ` : ''}
  
  ${resume.languages && resume.languages.length > 0 ? `
    <h2>Languages</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
      ${resume.languages.map(lang => `
        <div style="font-size: 13px;">
          <span style="font-weight: 600;">${lang.language || ''}</span>
          <span style="color: #6B7280; margin-left: 8px;">(${lang.proficiency || ''})</span>
        </div>
      `).join('')}
    </div>
  ` : ''}
  
  ${resume.interests && resume.interests.length > 0 ? `
    <h2>Interests</h2>
    <div class="skills-container">
      ${resume.interests.map(interest => `
        <span style="background: #FEF3C7; color: #92400E; padding: 6px 14px; border-radius: 16px; font-size: 12px;">${interest}</span>
      `).join('')}
    </div>
  ` : ''}
  
  ${resume.awards && resume.awards.length > 0 ? `
    <h2>Awards & Achievements</h2>
    ${resume.awards.map(award => `
      <div class="item">
        <div class="item-header">
          <div class="item-title">${award.title || ''}</div>
          <div class="item-date">${award.date || ''}</div>
        </div>
        <div class="item-subtitle">${award.issuer || ''}</div>
      </div>
    `).join('')}
  ` : ''}
  
  ${resume.publications && resume.publications.length > 0 ? `
    <h2>Publications</h2>
    ${resume.publications.map(pub => `
      <div class="item">
        <div class="item-header">
          <div class="item-title">${pub.title || ''}</div>
          <div class="item-date">${pub.date || ''}</div>
        </div>
        <div class="item-subtitle">${pub.publisher || ''}</div>
      </div>
    `).join('')}
  ` : ''}
  
  ${resume.references && resume.references.length > 0 ? `
    <h2>References</h2>
    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
      ${resume.references.map(ref => `
        <div style="font-size: 13px;">
          <div style="font-weight: 600; margin-bottom: 2px;">${ref.name || ''}</div>
          <div style="color: #6B7280;">${ref.position || ''}</div>
          <div style="color: #6B7280;">${ref.company || ''}</div>
          ${ref.email ? `<div style="font-size: 12px; margin-top: 4px;">${ref.email}</div>` : ''}
        </div>
      `).join('')}
    </div>
  ` : ''}
  
  <script>
    setTimeout(() => {
      // Auto-trigger print dialog
      window.print();
      
      // Show additional instructions if needed
      setTimeout(() => {
        const instructionsShown = sessionStorage.getItem('pdfInstructionsShown');
        if (!instructionsShown) {
          alert('📄 PDF EXPORT INSTRUCTIONS\\n\\n✅ In the print dialog:\\n\\n1. Destination: "Save as PDF"\\n2. Margins: Select "None" or "Minimum"\\n3. UNCHECK "Headers and footers"\\n4. Click "Save"\\n\\nThis removes dates, page numbers, and URLs from your PDF.');
          sessionStorage.setItem('pdfInstructionsShown', 'true');
        }
      }, 1000);
    }, 500);
  </script>
</body>
</html>`;

  return triggerPrint(html, filename);
};

/**
 * Export Cover Letter as PDF
 */
export const exportCoverLetterAsPDF = (coverLetter) => {
  const filename = generateFilename(
    `${coverLetter.job_title}_${coverLetter.company_name}`,
    'cover_letter'
  );
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${filename}</title>
  <style>
    ${getPrintStyles()}
    .letter-content {
      font-size: 14px;
      line-height: 1.8;
      margin-top: 24px;
      white-space: pre-wrap;
    }
    .letter-header {
      margin-bottom: 24px;
    }
    .date {
      color: #6B7280;
      font-size: 13px;
      margin-bottom: 16px;
    }
  </style>
</head>
<body>
  <div class="print-instructions no-print">
    <div style="margin-bottom: 8px;">📄 Cover Letter PDF Ready</div>
    <button class="print-button" onclick="window.print()">💾 Save as PDF</button>
    <div style="font-size: 11px; margin-top: 8px; opacity: 0.9; line-height: 1.4;">
      <strong>Instructions:</strong><br>
      1. Press Ctrl+P (Win) or Cmd+P (Mac)<br>
      2. Select "Save as PDF"<br>
      3. <strong>Uncheck "Headers and footers"</strong><br>
      4. Set margins to "None" or "Minimum"<br>
      5. Click Save
    </div>
  </div>

  <div class="letter-header">
    <h1>${coverLetter.job_title || 'Position'}</h1>
    <div class="item-subtitle">${coverLetter.company_name || ''}</div>
    <div class="date">${new Date(coverLetter.generation_date || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>
  
  <div class="letter-content">${coverLetter.content || ''}</div>
  
  <script>
    setTimeout(() => {
      window.print();
      
      setTimeout(() => {
        const instructionsShown = sessionStorage.getItem('pdfInstructionsShown');
        if (!instructionsShown) {
          alert('📄 PDF EXPORT INSTRUCTIONS\\n\\n✅ In the print dialog:\\n\\n1. Destination: "Save as PDF"\\n2. Margins: Select "None" or "Minimum"\\n3. UNCHECK "Headers and footers"\\n4. Click "Save"\\n\\nThis removes dates, page numbers, and URLs from your PDF.');
          sessionStorage.setItem('pdfInstructionsShown', 'true');
        }
      }, 1000);
    }, 500);
  </script>
</body>
</html>`;

  return triggerPrint(html, filename);
};

/**
 * React Component: PDF Export Button
 */
export const PDFExportButton = ({ data, type = 'resume', children, className = '', ...props }) => {
  const [isExporting, setIsExporting] = React.useState(false);
  
  const handleExport = async () => {
    setIsExporting(true);
    try {
      if (type === 'resume') {
        exportResumeAsPDF(data);
      } else if (type === 'cover-letter') {
        exportCoverLetterAsPDF(data);
      }
    } catch (error) {
      console.error('PDF export failed:', error);
      alert('Export failed. Please try again.');
    }
    setTimeout(() => setIsExporting(false), 1000);
  };
  
  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={className}
      {...props}
    >
      {isExporting ? '⏳ Exporting...' : children}
    </button>
  );
};

export default {
  exportResumeAsPDF,
  exportCoverLetterAsPDF,
  PDFExportButton
};