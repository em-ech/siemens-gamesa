import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Clock, AlertTriangle, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Turbine {
  id: string;
  predictedDaysToFailure: number;
  currentStatus: string;
  riskScore: number;
  predictedDowntime: number;
}

interface ResultsDashboardProps {
  turbines: Turbine[];
}

export const ResultsDashboard = ({ turbines }: ResultsDashboardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical": return "destructive";
      case "Warning": return "warning";
      case "Monitor": return "secondary";
      default: return "outline";
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 75) return "text-destructive";
    if (risk >= 50) return "text-warning";
    return "text-success";
  };

  const avgDaysToFailure = turbines.reduce((sum, t) => sum + t.predictedDaysToFailure, 0) / turbines.length;
  const avgRiskScore = turbines.reduce((sum, t) => sum + t.riskScore, 0) / turbines.length;
  const criticalTurbines = turbines.filter(t => t.currentStatus === "Critical" || t.currentStatus === "Warning").length;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Days to Failure</p>
                <p className="text-3xl font-bold mt-2">{avgDaysToFailure.toFixed(1)}</p>
              </div>
              <Clock className="h-10 w-10 text-primary opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Risk Score</p>
                <p className={`text-3xl font-bold mt-2 ${getRiskColor(avgRiskScore)}`}>{avgRiskScore.toFixed(0)}%</p>
              </div>
              <TrendingDown className="h-10 w-10 text-warning opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-3xl font-bold mt-2 text-destructive">{criticalTurbines}</p>
              </div>
              <AlertTriangle className="h-10 w-10 text-destructive opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Turbine Results Table */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wind className="h-5 w-5 text-primary" />
            Wind Turbine Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-sm">Turbine ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Days to Failure</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Risk Score</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm">Predicted Downtime (hrs)</th>
                </tr>
              </thead>
              <tbody>
                {turbines.map((turbine) => (
                  <tr key={turbine.id} className="border-b border-border/50 hover:bg-accent/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-primary" />
                        <span className="font-medium">{turbine.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={getStatusColor(turbine.currentStatus) as any}>
                        {turbine.currentStatus}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{turbine.predictedDaysToFailure}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`font-semibold ${getRiskColor(turbine.riskScore)}`}>
                        {turbine.riskScore}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{turbine.predictedDowntime.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
