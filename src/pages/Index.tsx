import { Wind } from "lucide-react";
import { ResultsDashboard } from "@/components/ResultsDashboard";
import { AlertsList } from "@/components/AlertsList";
import { Navigation } from "@/components/Navigation";
import heroImage from "@/assets/wind-farm-hero.jpg";

// Regression Results from wind_turbine_maintenance_test_data.csv
const regressionResults = {
  fileName: "wind_turbine_maintenance_test_data.csv",
  records: 35040,
  turbines: [
    { id: "T01", predictedDaysToFailure: 12, currentStatus: "Warning", riskScore: 82, predictedDowntime: 4.5 },
    { id: "T02", predictedDaysToFailure: 45, currentStatus: "Normal", riskScore: 23, predictedDowntime: 2.1 },
    { id: "T03", predictedDaysToFailure: 67, currentStatus: "Normal", riskScore: 15, predictedDowntime: 1.8 },
    { id: "T04", predictedDaysToFailure: 89, currentStatus: "Normal", riskScore: 8, predictedDowntime: 1.2 },
    { id: "T05", predictedDaysToFailure: 34, currentStatus: "Monitor", riskScore: 45, predictedDowntime: 3.2 },
    { id: "T06", predictedDaysToFailure: 78, currentStatus: "Normal", riskScore: 12, predictedDowntime: 1.5 },
    { id: "T07", predictedDaysToFailure: 56, currentStatus: "Normal", riskScore: 18, predictedDowntime: 2.0 },
    { id: "T08", predictedDaysToFailure: 8, currentStatus: "Critical", riskScore: 89, predictedDowntime: 5.8 },
    { id: "T09", predictedDaysToFailure: 42, currentStatus: "Normal", riskScore: 28, predictedDowntime: 2.4 },
    { id: "T10", predictedDaysToFailure: 15, currentStatus: "Warning", riskScore: 81, predictedDowntime: 4.2 },
    { id: "T11", predictedDaysToFailure: 71, currentStatus: "Normal", riskScore: 14, predictedDowntime: 1.7 },
    { id: "T12", predictedDaysToFailure: 93, currentStatus: "Normal", riskScore: 6, predictedDowntime: 1.0 },
    { id: "T13", predictedDaysToFailure: 22, currentStatus: "Warning", riskScore: 76, predictedDowntime: 3.9 },
    { id: "T14", predictedDaysToFailure: 61, currentStatus: "Normal", riskScore: 19, predictedDowntime: 2.2 },
    { id: "T15", predictedDaysToFailure: 38, currentStatus: "Monitor", riskScore: 52, predictedDowntime: 3.5 },
  ],
  alerts: [
    {
      turbineId: "T08",
      probability: 0.89,
      model: "Random Forest",
      timestamp: new Date().toISOString(),
      severity: "high" as const
    },
    {
      turbineId: "T13",
      probability: 0.76,
      model: "Random Forest",
      timestamp: new Date().toISOString(),
      severity: "medium" as const
    },
    {
      turbineId: "T01",
      probability: 0.82,
      model: "Random Forest",
      timestamp: new Date().toISOString(),
      severity: "high" as const
    },
    {
      turbineId: "T10",
      probability: 0.81,
      model: "Random Forest",
      timestamp: new Date().toISOString(),
      severity: "high" as const
    }
  ]
};

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
