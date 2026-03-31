import { useLocation } from "react-router-dom";
import certificationsData from "@/data/certifications.json";
import React from "react";

export default function Certifications() {
  const location = useLocation();

  // Function to dynamically load the credly script
  const loadCredlyScript = () => {
    const scriptId = "credly-embed-script";
    
    // Check if script element already exists and remove it
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.async = true;
    script.src = "//cdn.credly.com/assets/utilities/embed.js";
    document.head.appendChild(script);
  };

  // Load the script when component mounts or when location changes to this page
  React.useEffect(() => {
    loadCredlyScript();
  }, [location]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Certifications</h1>
        <p className="text-muted-foreground">
          Professional certifications and credentials that demonstrate my expertise in various technologies and domains.
        </p>
      </div>
      {/* Certification Grid - Badges Only */}
      <div className="grid gap-x-20 gap-y-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {certificationsData.map((certification, index) => (
          <div
        key={certification.badgeId}
        className="animate-slide-in transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg rounded-lg p-2 hover:bg-muted/20 cursor-pointer"
        style={{ animationDelay: `${index * 10}ms` }}
          >
        {/* Credly Badge Embed */}
        <div 
          data-iframe-width="300" 
          data-iframe-height="240" 
          data-share-badge-id={certification.badgeId}
          data-share-badge-host="https://www.credly.com"
        />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {certificationsData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No certifications yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
