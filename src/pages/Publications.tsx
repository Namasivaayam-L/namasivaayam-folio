import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Publication } from "@/types/awards";
import { ExternalLink, BookOpen, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Publications = () => {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    // Load data from JSON files
    const fetchPublications = async () => {
      const publicationsData = await import("@/data/publications.json");
      setPublications(publicationsData.default);
    };

    fetchPublications();
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Publications</h1>
          <p className="text-muted-foreground">
            Research papers and academic publications
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Research Publications</h2>
          </div>
          
          <div className="grid gap-6">
            {publications.map((publication, index) => (
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
                        {publication.title}
                      </CardTitle>
                      {publication.conference && (
                        <Badge variant="secondary" className="self-start">
                          {publication.conference}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {publication.description}
                      </p>
                      
                      <div className="flex flex-col gap-4">
                        {/* Date and View Link spaced at both ends */}
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">
                            {publication.date}
                          </Badge>
                          
                          {/* Display publication link button */}
                          {publication.link && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="flex items-center gap-2 hover:bg-black hover:text-white transition-colors duration-200"
                            >
                              <a 
                                href={publication.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-4 w-4" />
                                View Publication
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        {/* Display embed when embedUrl is available */}
                        {publication.embedUrl && (
                          <div className="w-full">
                            <iframe
                              src={publication.embedUrl}
                              width="100%"
                              height="652"
                              frameBorder="0"
                              allowFullScreen
                              title="Embedded Publication"
                              className="rounded-lg border border-border"
                            />
                          </div>
                        )}
                      </div>
                    </div>
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

export default Publications;
