import * as React from "react";
import { BiCode } from "react-icons/bi";
import { HiLightBulb } from "react-icons/hi";
import { FaBox, FaNetworkWired, FaBook, FaGithub } from "react-icons/fa";
import toolsData from "@/data/tools.json";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Code2: BiCode,
  Lightbulb: HiLightBulb,
  Container: FaBox,
  Network: FaNetworkWired,
  BookOpen: FaBook,
  Github: FaGithub,
};

export default function Tools() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Shovels</h1>
        <p className="text-muted-foreground">Tools I frequently use to make life easier</p>
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 md:grid-cols-3 sm:grid-cols-2">
        {toolsData.map((tool, index) => {
          const Icon = iconMap[tool.icon] || BiCode;
          return (
            <div
              key={tool.name}
              className="group bg-card border border-border rounded-lg p-6 text-center space-y-4 hover:shadow-lg transition-all animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 mx-auto bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{tool.name}</h3>
                <p className="text-sm text-muted-foreground">{tool.category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
