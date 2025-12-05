import * as React from "react";
import toolsData from "@/data/tools.json";

// Create a mapping of tool icon names to their SVG icon paths
const toolIconMap: Record<string, string> = {
  vscode: "/namasivaayam-folio/icons/vscode.svg",
 docker: "/namasivaayam-folio/icons/docker.svg",
  datagrip: "/namasivaayam-folio/icons/datagrip.svg",
  github: "/namasivaayam-folio/icons/github.svg",
  "github-copilot": "/namasivaayam-folio/icons/github-copilot.svg",
  cline: "/namasivaayam-folio/icons/cline.svg",
  huggingface: "/namasivaayam-folio/icons/huggingface.svg",
  linux: "/namasivaayam-folio/icons/linux.svg",
  bash: "/namasivaayam-folio/icons/bash.svg",
};

// Fisher-Yates shuffle algorithm to randomize array order
const shuffleArray = <T,>(array: T[]): T[] => {
 const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
 return newArray;
};

export default function Tools() {
  const shuffledTools = shuffleArray(toolsData);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Shovels</h1>
        <p className="text-muted-foreground">Tools I frequently use to make life easier</p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
        {shuffledTools.map((tool, index) => {
          const iconPath = toolIconMap[tool.icon] || "/namasivaayam-folio/icons/js.svg"; // Default icon
          return (
            <div
              key={tool.name}
              className="group bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all animate-slide-in relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                <img 
                  src={iconPath} 
                  alt={tool.name}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-foreground">{tool.name}</h3>
              </div>
              {/* Category tooltip on hover */}
              <div className="absolute inset-0 bg-black/80 text-white text-xs rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-6">
                <span className="text-center">{tool.category}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
