import React from "react";
import { Briefcase, GraduationCap, Code, Palette, Star } from "lucide-react";

export default function CreativePortfolioTemplate() {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden" style={{ aspectRatio: '210/297' }}>
      {/* Header with refined gradient - bold, colorful header for visual impact */}
      <div className="relative bg-gradient-to-br from-purple-500 via-purple-400 to-pink-400 text-white px-8 py-6">
        {/* Profile Photo */}
        <div className="absolute top-6 right-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-purple-600">AL</span>
              </div>
            </div>
            {/* HIRED Badge */}
            <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              HIRED
            </div>
          </div>
        </div>

        <div className="pr-32">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#FFFFFF' }}>Annie Levy</h1>
          <p className="text-xl font-medium mb-3" style={{ color: '#FFFFFF', opacity: 0.95 }}>Creative Designer & Developer</p>
          <div className="flex gap-3 text-sm" style={{ color: '#FFFFFF', opacity: 0.9 }}>
            <span>annie.levy@email.com</span>
            <span>•</span>
            <span>New York, NY</span>
          </div>
        </div>
      </div>

      {/* Summary Banner - Clean white background with subtle border */}
      <div className="bg-white px-8 py-5 border-b-2 border-gray-100">
        <p className="text-sm text-gray-800 italic leading-relaxed">
          "Award-winning designer with 6+ years creating engaging digital experiences. Passionate about blending creativity with functionality to deliver stunning user interfaces."
        </p>
      </div>

      {/* Main Content - Clean white background for professional readability */}
      <div className="bg-white p-8 space-y-7">
        {/* Experience - improved spacing */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Experience</h2>
          </div>
          
          <div className="space-y-5 ml-12">
            <div className="relative pl-6 border-l-2 border-purple-300">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-500"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">Senior UI/UX Designer</h3>
                <span className="text-xs text-gray-600 font-medium">2020 - Present</span>
              </div>
              <p className="text-purple-600 font-semibold text-sm mb-3">CreativeHub Studios • New York, NY</p>
              <ul className="text-xs text-gray-800 space-y-2 leading-relaxed">
                <li>• Led design system overhaul resulting in 40% faster development time</li>
                <li>• Managed design team of 5, mentoring junior designers</li>
                <li>• Created award-winning interfaces for Fortune 500 clients</li>
              </ul>
            </div>

            <div className="relative pl-6 border-l-2 border-purple-300">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-400"></div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900">UI Designer</h3>
                <span className="text-xs text-gray-600 font-medium">2018 - 2020</span>
              </div>
              <p className="text-purple-600 font-semibold text-sm mb-3">Digital Innovations • Brooklyn, NY</p>
              <ul className="text-xs text-gray-800 space-y-2 leading-relaxed">
                <li>• Designed mobile apps with 1M+ combined downloads</li>
                <li>• Conducted user research and usability testing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills with Circular Progress - improved spacing */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          </div>

          <div className="grid grid-cols-4 gap-4 ml-12">
            {/* Skill 1 */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E9D5FF" strokeWidth="8"/>
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#A855F7" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.95} ${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-purple-600">95%</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-800">UI Design</p>
            </div>

            {/* Skill 2 */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E9D5FF" strokeWidth="8"/>
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#EC4899" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.90} ${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-pink-600">90%</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-800">Figma</p>
            </div>

            {/* Skill 3 */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E9D5FF" strokeWidth="8"/>
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#A855F7" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.85} ${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-purple-600">85%</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-800">React</p>
            </div>

            {/* Skill 4 */}
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#E9D5FF" strokeWidth="8"/>
                  <circle 
                    cx="50" cy="50" r="45" 
                    fill="none" 
                    stroke="#EC4899" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45 * 0.80} ${2 * Math.PI * 45}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-pink-600">80%</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-gray-800">CSS/Tailwind</p>
            </div>
          </div>

          {/* Additional Skills - improved spacing */}
          <div className="ml-12 mt-5">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                Adobe Creative Suite
              </span>
              <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                Sketch
              </span>
              <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                Prototyping
              </span>
              <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                Webflow
              </span>
              <span className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold border border-purple-200">
                User Research
              </span>
            </div>
          </div>
        </div>

        {/* Education - improved spacing */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          </div>
          
          <div className="ml-12 space-y-3">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-1">BFA in Graphic Design</h3>
              <p className="text-purple-600 font-semibold text-sm mb-1">Parsons School of Design</p>
              <p className="text-xs text-gray-700 leading-relaxed">2014 - 2018 • GPA: 3.9/4.0</p>
            </div>
          </div>
        </div>

        {/* Awards - improved spacing */}
        <div className="ml-12">
          <div className="bg-teal-50 rounded-lg p-5 border-2 border-teal-400">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-teal-600 fill-teal-600" />
              <h3 className="font-bold text-gray-900">Awards & Recognition</h3>
            </div>
            <ul className="text-xs text-gray-800 space-y-2 leading-relaxed">
              <li>• Awwwards Site of the Day (2023)</li>
              <li>• CSS Design Awards - Special Kudos (2022)</li>
              <li>• Dribbble Top Designer Badge</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}