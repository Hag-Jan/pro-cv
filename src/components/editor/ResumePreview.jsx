import React from "react";
import { getTemplateComponent } from "../resume-templates/index";

export default function ResumePreview({ resume }) {
  // Critical safety check - prevent rendering until resume is fully loaded and valid
  if (!resume || typeof resume !== 'object') {
    return (
      <div className="w-full h-full bg-white p-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading resume...</p>
        </div>
      </div>
    );
  }

  // Ensure all required properties exist with safe defaults
  const safeResume = {
    template: resume.template || 'minimal-clean',
    sections_order: Array.isArray(resume.sections_order) 
      ? resume.sections_order 
      : ['personal_info', 'experience', 'education', 'skills'],
    enabled_sections: Array.isArray(resume.enabled_sections) 
      ? resume.enabled_sections 
      : ['personal_info', 'experience', 'education', 'skills'],
    customization: resume.customization && typeof resume.customization === 'object' 
      ? resume.customization 
      : {},
    personal_info: resume.personal_info && typeof resume.personal_info === 'object' 
      ? resume.personal_info 
      : {},
    experience: Array.isArray(resume.experience) ? resume.experience : [],
    education: Array.isArray(resume.education) ? resume.education : [],
    skills: Array.isArray(resume.skills) ? resume.skills : [],
    projects: Array.isArray(resume.projects) ? resume.projects : [],
    certificates: Array.isArray(resume.certificates) ? resume.certificates : [],
    languages: Array.isArray(resume.languages) ? resume.languages : [],
    interests: Array.isArray(resume.interests) ? resume.interests : [],
    awards: Array.isArray(resume.awards) ? resume.awards : [],
    publications: Array.isArray(resume.publications) ? resume.publications : [],
    references: Array.isArray(resume.references) ? resume.references : []
  };

  const templateName = safeResume.template || 'minimal-clean';
  const TemplateComponent = getTemplateComponent(templateName);

  if (!TemplateComponent) {
    return (
      <div className="w-full h-full bg-white p-12 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg font-semibold mb-2">Template not found</p>
          <p className="text-sm">Template: {templateName}</p>
          <p className="text-xs mt-2">Using default template instead</p>
        </div>
      </div>
    );
  }

  // Wrap template rendering in error boundary-like try-catch
  try {
    return <TemplateComponent resume={safeResume} />;
  } catch (error) {
    console.error('Error rendering template:', error);
    return (
      <div className="w-full h-full bg-white p-12 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-lg font-semibold mb-2">Template Error</p>
          <p className="text-sm">Unable to render {templateName}</p>
          <p className="text-xs mt-2 text-gray-500">{error.message}</p>
        </div>
      </div>
    );
  }
}