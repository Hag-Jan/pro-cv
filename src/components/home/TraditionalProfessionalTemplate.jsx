import React from "react";

export default function TraditionalProfessionalTemplate() {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden p-8" style={{ aspectRatio: '210/297' }}>
      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-1">Robert Chen</h1>
        <p className="text-xl text-gray-700 font-medium mb-3">Chief Financial Officer</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <span>robert.chen@email.com</span>
          <span>•</span>
          <span>Boston, MA 02108</span>
          <span>•</span>
          <span>(555) 987-6543</span>
          <span>•</span>
          <span>linkedin.com/in/robertchen</span>
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 border-b border-gray-300 pb-1">
          Professional Summary
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Accomplished financial executive with 15+ years of progressive leadership experience in corporate finance, strategic planning, and risk management. Proven track record of driving financial performance, optimizing operations, and leading organizations through periods of transformation and growth. Expert in M&A, financial modeling, and stakeholder management.
        </p>
      </div>

      {/* Professional Experience */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 border-b border-gray-300 pb-1">
          Professional Experience
        </h2>
        
        <div className="space-y-4">
          {/* Job 1 */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">Chief Financial Officer</h3>
              <span className="text-sm text-gray-600 font-medium">2020 - Present</span>
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-2">GlobalTech Corporation • Boston, MA</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4" style={{ listStyleType: 'disc' }}>
              <li>Direct all financial operations for $500M revenue technology services company with 1,200+ employees across 15 locations</li>
              <li>Led successful IPO process raising $150M in capital, managing relationships with investment banks and regulatory bodies</li>
              <li>Implemented enterprise-wide financial systems resulting in 25% reduction in operational costs and improved reporting accuracy</li>
              <li>Oversee treasury, tax, audit, financial planning & analysis, and investor relations functions</li>
              <li>Drive M&A strategy, completing 3 strategic acquisitions totaling $75M in value</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">Vice President of Finance</h3>
              <span className="text-sm text-gray-600 font-medium">2016 - 2020</span>
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Apex Industries • Cambridge, MA</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4" style={{ listStyleType: 'disc' }}>
              <li>Managed financial planning, budgeting, and forecasting for manufacturing division with $200M annual revenue</li>
              <li>Improved EBITDA margins by 8% through strategic cost optimization and operational efficiency initiatives</li>
              <li>Led financial due diligence for $30M acquisition, successfully integrating target company within 6 months</li>
              <li>Established financial controls and compliance framework ensuring SOX compliance</li>
            </ul>
          </div>

          {/* Job 3 */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">Finance Director</h3>
              <span className="text-sm text-gray-600 font-medium">2013 - 2016</span>
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Sterling Consulting Group • New York, NY</p>
            <ul className="text-sm text-gray-700 space-y-1 ml-4" style={{ listStyleType: 'disc' }}>
              <li>Directed financial operations for professional services firm with 500+ consultants</li>
              <li>Reduced DSO by 15 days through implementation of improved collections processes</li>
              <li>Led annual budgeting process and monthly financial close activities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 border-b border-gray-300 pb-1">
          Education
        </h2>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-gray-900">Master of Business Administration (MBA)</h3>
              <span className="text-sm text-gray-600">2013</span>
            </div>
            <p className="text-sm text-gray-700">Harvard Business School • Boston, MA</p>
            <p className="text-sm text-gray-600 italic">Concentration: Finance & Accounting</p>
          </div>

          <div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-gray-900">Bachelor of Science in Accounting</h3>
              <span className="text-sm text-gray-600">2008</span>
            </div>
            <p className="text-sm text-gray-700">University of Pennsylvania, Wharton School • Philadelphia, PA</p>
            <p className="text-sm text-gray-600 italic">Summa Cum Laude • GPA: 3.95/4.0</p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 border-b border-gray-300 pb-1">
          Certifications & Licenses
        </h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Certified Public Accountant (CPA) • Active License, Massachusetts</li>
          <li>• Chartered Financial Analyst (CFA) • CFA Institute</li>
          <li>• Certified Management Accountant (CMA) • IMA</li>
        </ul>
      </div>

      {/* Core Competencies */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 border-b border-gray-300 pb-1">
          Core Competencies
        </h2>
        <div className="grid grid-cols-3 gap-2 text-sm text-gray-700">
          <div>• Financial Strategy</div>
          <div>• M&A Integration</div>
          <div>• Risk Management</div>
          <div>• Financial Modeling</div>
          <div>• Capital Markets</div>
          <div>• Regulatory Compliance</div>
          <div>• FP&A</div>
          <div>• Treasury Management</div>
          <div>• Investor Relations</div>
          <div>• Budget Management</div>
          <div>• SOX Compliance</div>
          <div>• Strategic Planning</div>
        </div>
      </div>

      {/* Professional Affiliations */}
      <div>
        <h2 className="text-lg font-bold text-gray-900 uppercase mb-3 border-b border-gray-300 pb-1">
          Professional Affiliations
        </h2>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• American Institute of CPAs (AICPA) • Member</li>
          <li>• Financial Executives International (FEI) • Member</li>
          <li>• Massachusetts Society of CPAs • Board Member</li>
        </ul>
      </div>
    </div>
  );
}