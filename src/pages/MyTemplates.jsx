// This page has been removed - all template management is now in the Templates page
import React from "react";
import { createPageUrl } from "@/utils";

export default function MyTemplates() {
  // Redirect to Templates page
  React.useEffect(() => {
    window.location.href = createPageUrl("Templates");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-600">Redirecting to Templates...</p>
    </div>
  );
}