import { Wind } from "lucide-react";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { AlertsList } from "@/components/AlertsList";
import { Navigation } from "@/components/Navigation";
import heroImage from "@/assets/wind-farm-hero.jpg";
import { regressionResults } from "@/data/turbineResults";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden mt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center gap-3 mb-4">
            <Wind className="h-12 w-12 text-primary animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Wind Farm Analytics Overview
            </h1>
          </div>
          <p className="text-xl text-foreground/80 max-w-2xl">
            Wind Turbine Predictive Maintenance Results
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Analysis of {regressionResults.records.toLocaleString()} turbine records
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div className="p-6 rounded-lg bg-gradient-card border border-border">
            <h2 className="text-2xl font-bold mb-2">Regression Analysis Complete</h2>
            <p className="text-muted-foreground">
              Successfully analyzed {regressionResults.records.toLocaleString()} records from {regressionResults.fileName}
            </p>
            <div className="mt-4 text-sm text-muted-foreground space-y-1">
              <p>Model: Random Forest Regression</p>
              <p>Analysis Date: {new Date().toLocaleDateString()}</p>
              <p>Turbines Analyzed: {regressionResults.turbines.length}</p>
            </div>
          </div>

          <AlertsList alerts={regressionResults.alerts} />
          <ResultsDashboard turbines={regressionResults.turbines} />
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Wind Turbine Maintenance System • Powered by Machine Learning</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
