import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface FileUploadResult {
  data: Record<string, string>[];
  headers: string[];
  results: ReturnType<typeof generateMockResults>;
  fileName: string;
}

interface FileUploadProps {
  onFileUpload: (data: FileUploadResult) => void;
}

const parseCSVHeaders = (text: string) => {
  const lines = text.split('\n').filter(line => line.trim());
  const headers = lines[0]?.split(',').map(h => h.trim()) ?? [];
  return { lines, headers };
};

export const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateCSV = (text: string): boolean => {
    const { lines, headers } = parseCSVHeaders(text);
    if (lines.length < 2) return false;
    return headers.includes('Maintenance_Label');
  };

  const processFile = async (uploadedFile: File) => {
    if (!uploadedFile.name.endsWith('.csv')) {
      toast({
        title: "Invalid File Format",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const text = await uploadedFile.text();
      
      if (!validateCSV(text)) {
        toast({
          title: "Invalid CSV Structure",
          description: "CSV must contain 'Maintenance_Label' column.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Parse CSV
      const { lines, headers } = parseCSVHeaders(text);

      const data = lines.slice(1).map(line => {
        const values = line.split(',');
        const row: Record<string, string> = {};
        headers.forEach((header, index) => {
          row[header] = values[index]?.trim();
        });
        return row;
      });

      // Simulate ML processing with mock results
      setTimeout(() => {
        const mockResults = generateMockResults(data.length);
        onFileUpload({ 
          data, 
          headers, 
          results: mockResults,
          fileName: uploadedFile.name 
        });
        
        toast({
          title: "Analysis Complete",
          description: `Processed ${data.length} turbine records successfully.`,
        });
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process the CSV file.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      processFile(droppedFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-all duration-300 ${
        isDragging 
          ? 'border-primary bg-primary/5 shadow-glow' 
          : 'border-border hover:border-primary/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {isProcessing ? (
          <>
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-lg font-medium">Processing your data...</p>
            <p className="text-sm text-muted-foreground">Running ML models and analyzing turbine data</p>
          </>
        ) : file ? (
          <>
            <FileText className="h-16 w-16 text-success" />
            <p className="text-lg font-medium">{file.name}</p>
            <p className="text-sm text-muted-foreground">File ready for processing</p>
          </>
        ) : (
          <>
            <Upload className="h-16 w-16 text-muted-foreground" />
            <div className="text-center">
              <p className="text-lg font-medium mb-2">Upload Wind Turbine Data</p>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop your CSV file here, or click to browse
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted px-4 py-2 rounded-md">
                <AlertCircle className="h-4 w-4" />
                <span>CSV must include 'Maintenance_Label' column</span>
              </div>
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="gradient" size="lg" className="cursor-pointer">
                Select CSV File
              </Button>
            </label>
          </>
        )}
      </div>
    </Card>
  );
};

// Mock ML results generator
const generateMockResults = (dataLength: number) => {
  const alerts = [];
  const numAlerts = Math.floor(Math.random() * 5) + 1;
  
  for (let i = 0; i < numAlerts; i++) {
    alerts.push({
      turbineId: `WT-${String(Math.floor(Math.random() * dataLength) + 1).padStart(3, '0')}`,
      probability: 0.7 + Math.random() * 0.3,
      model: Math.random() > 0.5 ? 'Random Forest' : 'GBDT',
      timestamp: new Date().toISOString(),
      severity: Math.random() > 0.5 ? 'high' : 'medium'
    });
  }

  return {
    alerts,
    metrics: {
      rf: {
        accuracy: 0.92 + Math.random() * 0.05,
        precision: 0.88 + Math.random() * 0.08,
        recall: 0.85 + Math.random() * 0.1,
        f1: 0.87 + Math.random() * 0.08,
        rocAuc: 0.94 + Math.random() * 0.05
      },
      gbdt: {
        accuracy: 0.93 + Math.random() * 0.04,
        precision: 0.89 + Math.random() * 0.07,
        recall: 0.86 + Math.random() * 0.09,
        f1: 0.88 + Math.random() * 0.07,
        rocAuc: 0.95 + Math.random() * 0.04
      }
    },
    confusionMatrix: {
      rf: { tp: 145, fp: 12, tn: 823, fn: 20 },
      gbdt: { tp: 148, fp: 10, tn: 825, fn: 17 }
    }
  };
};
