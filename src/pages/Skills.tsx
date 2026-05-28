import { Badge } from "@/components/ui/badge";
import skillsData from "@/data/skills.json";

// Create a mapping of skill names to their SVG icon paths
const skillIconMap: Record<string, string> = {
  // AI/ML
  "Google ADK": "/icons/Google_ADK.svg",
  "RAG": "/icons/RAG.svg",
  "LangChain": "/icons/langchain.svg",
  "LlamaIndex": "/icons/llama-index.svg",
  "PyTorch": "/icons/torch.svg",
  "TensorFlow": "/icons/TensorFlow.svg",
  "Google Vertex AI": "/icons/vertexai.svg",
  "Prompt Engineering": "/icons/aistudio.svg",
  "LangSmith": "/icons/langsmith.svg",
  "LangGraph": "/icons/langgraph.svg",
  "OpenAI": "/icons/openai.svg",
  "Qwen": "/icons/qwen.svg",
  
  // Cloud
  "GCP PCA": "/icons/gcloud.svg",
  "AWS CPE": "/icons/aws.svg", // Default icon for now
 "Docker": "/icons/docker.svg",
  "Kubernetes (GKE)": "/icons/kubernetes.svg",
  "Rancher": "/icons/Rancher.svg",
  
 // Backend & Databases
 "FastAPI": "/icons/FastAPI.svg",
  "Spring Boot": "/icons/Spring_Boot.svg",
  "Node.js": "/icons/node.js.svg",
  "Express": "/icons/Express.svg",
  "PostgreSQL": "/icons/postgresql.svg",
  "MongoDB": "/icons/mongodb.svg",
  "Redis": "/icons/redis.svg",
  
  // Frontend
  "React": "/icons/js.svg",
  "Next.js": "/icons/next.js.svg",
 "Redux": "/icons/Redux.svg"
};

// Function to sort array alphabetically
const sortAlphabetically = <T,>(array: T[], keyFn: (item: T) => string): T[] => {
  const newArray = [...array];
  return newArray.sort((a, b) => keyFn(a).localeCompare(keyFn(b)));
};

const Skills = () => {
  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Skills</h1>
        <p className="text-lg text-muted-foreground">My technical expertise and capabilities</p>
      </div>

      {/* Skills by Category */}
      <div className="space-y-8">
        {skillsData.categories.map((category, categoryIndex) => {
          const sortedSkills = sortAlphabetically(category.skills, (skill) => skill);
          return (
            <section key={category.name} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sortedSkills.map((skill, skillIndex) => {
                  const iconPath = skillIconMap[skill] || "/icons/js.svg"; // Default icon
                  return (
                    <div 
                      key={skill}
                      className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                      style={{ animationDelay: `${(categoryIndex * sortedSkills.length + skillIndex) * 50}ms` }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                        <img 
                          src={iconPath} 
                          alt={skill}
                          className="w-6 h-6 object-contain"
                        />
                      </div>
                      <span className="font-medium text-foreground">{skill}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
