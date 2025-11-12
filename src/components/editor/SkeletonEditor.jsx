import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

/**
 * Fast-loading skeleton placeholder for Editor
 * Appears instantly while real data loads in background
 * Provides better perceived performance than blank screen or spinner
 */
export default function SkeletonEditor() {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Top Bar Skeleton */}
      <div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-14 gap-2">
            {/* Left: Back button */}
            <div className="flex items-center gap-2">
              <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="hidden md:block w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Center: Tabs */}
            <div className="hidden sm:flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
              <div className="w-20 h-7 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-7 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-7 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              <div className="hidden md:block w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="w-16 h-8 bg-blue-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex overflow-hidden">
        {/* Form Panel Skeleton */}
        <div className="w-full lg:w-2/5 bg-gray-50 border-r border-gray-200 overflow-y-auto">
          <div className="w-full max-w-full p-4 space-y-3">
            {/* Section Cards */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-white border border-gray-200 animate-pulse">
                {/* Section Header */}
                <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-6 h-6 bg-blue-200 rounded"></div>
                  <div className="flex-1">
                    <div className="w-32 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>

                {/* Section Content */}
                <CardContent className="p-3 space-y-2">
                  <div className="space-y-2">
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    <div className="w-full h-8 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    <div className="w-full h-8 bg-gray-200 rounded"></div>
                  </div>
                  {i === 1 && (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                          <div className="w-16 h-3 bg-gray-200 rounded"></div>
                          <div className="w-full h-8 bg-gray-200 rounded"></div>
                        </div>
                        <div className="space-y-2">
                          <div className="w-16 h-3 bg-gray-200 rounded"></div>
                          <div className="w-full h-8 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="w-24 h-3 bg-gray-200 rounded"></div>
                        <div className="w-full h-16 bg-gray-200 rounded"></div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Add Section Button Skeleton */}
            <div className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 animate-pulse"></div>
          </div>
        </div>

        {/* Preview Panel Skeleton */}
        <div className="hidden lg:block flex-1 bg-gray-100 overflow-auto">
          <div className="w-full h-full p-4 flex items-start justify-center">
            <div 
              className="bg-white shadow-2xl animate-pulse"
              style={{
                width: '100%',
                maxWidth: '210mm',
                minHeight: '297mm',
              }}
            >
              {/* Resume Preview Skeleton */}
              <div className="p-8 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="w-48 h-8 bg-blue-200 rounded"></div>
                  <div className="flex gap-4">
                    <div className="w-32 h-3 bg-gray-200 rounded"></div>
                    <div className="w-32 h-3 bg-gray-200 rounded"></div>
                    <div className="w-32 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-full h-16 bg-gray-100 rounded mt-4"></div>
                </div>

                {/* Experience Section */}
                <div className="space-y-3">
                  <div className="w-40 h-5 bg-blue-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-64 h-4 bg-gray-300 rounded"></div>
                    <div className="w-48 h-3 bg-gray-200 rounded"></div>
                    <div className="space-y-1 ml-4 mt-2">
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                      <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>

                {/* Education Section */}
                <div className="space-y-3">
                  <div className="w-32 h-5 bg-blue-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-56 h-4 bg-gray-300 rounded"></div>
                    <div className="w-40 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-3">
                  <div className="w-24 h-5 bg-blue-200 rounded"></div>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="w-20 h-6 bg-blue-100 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator - Subtle */}
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Loading your resume...</span>
      </div>
    </div>
  );
}