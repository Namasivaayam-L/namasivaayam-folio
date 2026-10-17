import { Badge } from "@/components/ui/badge";
import skillsData from "@/data/skills.json";

// Create a mapping of skill names to their SVG icon paths
const skillIconMap: Record<string, string> = {
  // AI/ML
  "Google ADK": "/namasivaayam-folio/icons/Google_ADK.svg",
  "RAG": "/namasivaayam-folio/icons/RAG.svg",
  "LangChain": "/namasivaayam-folio/icons/langchain.svg",
  "LlamaIndex": "/namasivaayam-folio/icons/llama-index.svg",
  "PyTorch": "/namasivaayam-folio/icons/torch.svg",
  "TensorFlow": "/namasivaayam-folio/icons/TensorFlow.svg",
  "Google Vertex AI": "/namasivaayam-folio/icons/vertexai.svg",
  "Prompt Engineering": "/namasivaayam-folio/icons/aistudio.svg",
  "LangSmith": "/namasivaayam-folio/icons/langsmith.svg",
  "LangGraph": "/namasivaayam-folio/icons/langgraph.svg",
  "OpenAI": "/namasivaayam-folio/icons/openai.svg",
  "Qwen": "/namasivaayam-folio/icons/qwen.svg",
  
  // Cloud
  "GCP PCA": "/namasivaayam-folio/icons/gcloud.svg",
  "AWS CPE": "/namasivaayam-folio/icons/aws.svg", // Default icon for now
 "Docker": "/namasivaayam-folio/icons/docker.svg",
  "Kubernetes (GKE)": "/namasivaayam-folio/icons/kubernetes.svg",
  "Rancher": "/namasivaayam-folio/icons/Rancher.svg",
  
 // Backend & Databases
 "FastAPI": "/namasivaayam-folio/icons/FastAPI.svg",
  "Spring Boot": "/namasivaayam-folio/icons/Spring_Boot.svg",
  "Node.js": "/namasivaayam-folio/icons/node.js.svg",
  "Express": "/namasivaayam-folio/icons/Express.svg",
  "PostgreSQL": "/namasivaayam-folio/icons/postgresql.svg",
  "MongoDB": "/namasivaayam-folio/icons/mongodb.svg",
  "Redis": "/namasivaayam-folio/icons/redis.svg",
  
  // Frontend
  "React": "/namasivaayam-folio/icons/js.svg",
  "Next.js": "/namasivaayam-folio/icons/next.js.svg",
 "Redux": "/namasivaayam-folio/icons/Redux.svg"
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
                  const iconPath = skillIconMap[skill] || "/namasivaayam-folio/icons/js.svg"; // Default icon
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
