import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Education } from "@/types/awards";
import { ExternalLink, GraduationCap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";

const AcademicAwards = () => {
  const [education, setEducation] = useState<Education | null>(null);
  const [awards, setAwards] = useState<Award[]>([]);

 useEffect(() => {
    // Load data from JSON files
    const fetchEducation = async () => {
      const educationData = await import("@/data/education.json");
      setEducation(educationData.default);
    };

    const fetchAwards = async () => {
      const awardsData = await import("@/data/awards.json");
      setAwards(awardsData.default);
    };

    fetchEducation();
    fetchAwards();
  }, []);

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-2">Academic & Awards</h1>
          <p className="text-muted-foreground">
            Educational background and recognition
          </p>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Education</h2>
          </div>
          
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">
                {education?.degree}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <span className="text-lg font-medium text-primary">
                    {education?.institution}
                  </span>
                  <Badge variant="secondary" className="text-sm">
                    {education?.graduation}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span><strong>Period:</strong> {education?.period}</span>
                  <span><strong>CGPA:</strong> {education?.cgpa}</span>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-foreground mb-2">Activities</h4>
                  <p className="text-muted-foreground">{education?.activities}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Awards & Recognition</h2>
          </div>
          
          <div className="grid gap-6">
            {awards.map((award, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <Card className="bg-card border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <CardTitle className="text-xl text-foreground">
                        {award.title}
                      </CardTitle>
                      <Badge variant="outline" className="self-start">
                        {award.date}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {award.description}
                    </p>
                    
                    {/* Handle embed or regular LinkedIn post */}
                    {award.embedUrl ? (
                      // Display embed when embedUrl is available
                      <div className="mt-4">
                        <iframe
                          src={award.embedUrl}
                          width="100%"
                          height="610"
                          frameBorder="0"
                          allowFullScreen
                          title="Embedded LinkedIn Post"
                          className="rounded-lg border border-border"
                        />
                      </div>
                    ) : award.linkedinUrl ? (
                      // Display card with LinkedIn button when only linkedinUrl is available
                      <div className="mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex items-center gap-2 hover:bg-black hover:text-white transition-colors duration-200"
                        >
                          <a 
                            href={award.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4" />
                            View LinkedIn Post
                          </a>
                        </Button>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AcademicAwards;
