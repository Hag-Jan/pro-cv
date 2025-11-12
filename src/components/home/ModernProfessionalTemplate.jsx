import React from "react";
import { Briefcase, GraduationCap, Award, TrendingUp } from "lucide-react";

export default function ModernProfessionalTemplate() {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden" style={{ aspectRatio: '210/297' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-6">
        <h1 className="text-3xl font-bold mb-1">Jamie Smith</h1>
        <p className="text-blue-100 text-lg font-medium">Senior Product Manager</p>
        <div className="flex gap-4 mt-3 text-sm text-blue-100">
          <span>jamie.smith@email.com</span>
          <span>•</span>
          <span>San Francisco, CA</span>
          <span>•</span>
          <span>+1 (555) 123-4567</span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6 p-8">
        {/* Left Column - 2/3 width */}
        <div className="col-span-2 space-y-6">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-blue-600">
              <Briefcase className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">EXPERIENCE</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">Senior Product Manager</h3>
                  <span className="text-sm text-gray-600">2021 - Present</span>
                </div>
                <p className="text-blue-600 font-semibold text-sm mb-2">TechCorp Inc. • San Francisco, CA</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Led cross-functional team of 12 in launching flagship product, generating $5M ARR</li>
                  <li>Improved user retention by 45% through data-driven feature prioritization</li>
                  <li>Managed product roadmap and strategic initiatives for B2B SaaS platform</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900">Product Manager</h3>
                  <span className="text-sm text-gray-600">2019 - 2021</span>
                </div>
                <p className="text-blue-600 font-semibold text-sm mb-2">InnovateLab • Palo Alto, CA</p>
                <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                  <li>Drove product strategy for mobile app with 2M+ active users</li>
                  <li>Reduced customer churn by 30% through UX optimization initiatives</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b-2 border-blue-600">
              <Award className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">KEY ACHIEVEMENTS</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-2xl text-blue-600">$5M</span>
                </div>
                <p className="text-xs text-gray-700">Annual Recurring Revenue</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-2xl text-blue-600">45%</span>
                </div>
                <p className="text-xs text-gray-700">User Retention Increase</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-2xl text-blue-600">2M+</span>
                </div>
                <p className="text-xs text-gray-700">Active Users Managed</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-2xl text-blue-600">30%</span>
                </div>
                <p className="text-xs text-gray-700">Churn Reduction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-blue-600">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">EDUCATION</h2>
            </div>
            
            <div>
              <h3 className="font-bold text-sm text-gray-900">MBA</h3>
              <p className="text-xs text-blue-600 font-semibold">Stanford University</p>
              <p className="text-xs text-gray-600">2017 - 2019</p>
            </div>
            
            <div className="mt-3">
              <h3 className="font-bold text-sm text-gray-900">BS Computer Science</h3>
              <p className="text-xs text-blue-600 font-semibold">UC Berkeley</p>
              <p className="text-xs text-gray-600">2013 - 2017</p>
            </div>
          </div>

          {/* Skills Distribution Chart */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-600">SKILLS</h2>
            
            {/* Circular Chart Representation */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                {/* This is a simplified circular chart using conic-gradient */}
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: `conic-gradient(
                      from 0deg,
                      #3B82F6 0deg 126deg,
                      #60A5FA 126deg 234deg,
                      #93C5FD 234deg 306deg,
                      #BFDBFE 306deg 360deg
                    )`
                  }}
                />
                <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-xs text-gray-600">Skills</p>
                    <p className="text-lg font-bold text-blue-600">100%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
                <span className="flex-1 text-gray-700">Product Strategy</span>
                <span className="font-semibold text-gray-900">35%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
                <span className="flex-1 text-gray-700">Data Analysis</span>
                <span className="font-semibold text-gray-900">30%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-blue-300"></div>
                <span className="flex-1 text-gray-700">Agile/Scrum</span>
                <span className="font-semibold text-gray-900">20%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-sm bg-blue-200"></div>
                <span className="flex-1 text-gray-700">User Research</span>
                <span className="font-semibold text-gray-900">15%</span>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">Technical Skills</h3>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">SQL</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Python</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Tableau</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Figma</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Jira</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">Analytics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}