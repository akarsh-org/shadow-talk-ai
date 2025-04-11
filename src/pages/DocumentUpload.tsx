
import { useState } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Upload, Trash2, FilePlus, Star, StarOff, Loader2 } from "lucide-react";

interface Document {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  trained: boolean;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "doc-1",
      name: "Project_Brief.pdf",
      size: "1.2 MB",
      uploadDate: "2025-04-10",
      trained: true,
    },
    {
      id: "doc-2",
      name: "Research_Notes.docx",
      size: "843 KB",
      uploadDate: "2025-04-09",
      trained: false,
    },
  ]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Add the new document to the list
          const newDocument: Document = {
            id: `doc-${Date.now()}`,
            name: selectedFile.name,
            size: `${(selectedFile.size / 1024).toFixed(0)} KB`,
            uploadDate: new Date().toISOString().split('T')[0],
            trained: false,
          };
          
          setDocuments([...documents, newDocument]);
          setSelectedFile(null);
          
          toast({
            title: "Upload complete",
            description: `${selectedFile.name} has been uploaded successfully.`,
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  const toggleTrainState = (docId: string) => {
    setDocuments(documents.map(doc => 
      doc.id === docId ? { ...doc, trained: !doc.trained } : doc
    ));

    const document = documents.find(doc => doc.id === docId);
    if (document) {
      toast({
        title: document.trained ? "Document untrained" : "Document trained",
        description: `${document.name} has been ${document.trained ? "removed from" : "added to"} training.`,
      });
    }
  };

  const deleteDocument = (docId: string) => {
    const documentToDelete = documents.find(doc => doc.id === docId);
    setDocuments(documents.filter(doc => doc.id !== docId));
    
    if (documentToDelete) {
      toast({
        title: "Document deleted",
        description: `${documentToDelete.name} has been removed.`,
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold">Document Management</h1>
            <p className="text-muted-foreground">Upload and manage documents for training the AI</p>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FilePlus className="h-5 w-5" />
                  Upload New Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Input 
                    type="file" 
                    className="flex-1" 
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <Button 
                    onClick={handleFileUpload} 
                    disabled={!selectedFile || uploading}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>

                {uploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading {selectedFile?.name}</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Uploaded Documents</h2>
              
              {documents.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">
                    No documents uploaded yet.
                  </CardContent>
                </Card>
              ) : (
                documents.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden">
                    <div className="flex items-center p-4">
                      <div className="flex-1">
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{doc.size}</span>
                          <span>Uploaded on {doc.uploadDate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant={doc.trained ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleTrainState(doc.id)}
                        >
                          {doc.trained ? (
                            <>
                              <StarOff className="mr-2 h-4 w-4" />
                              Untrain
                            </>
                          ) : (
                            <>
                              <Star className="mr-2 h-4 w-4" />
                              Train
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => deleteDocument(doc.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentUpload;
