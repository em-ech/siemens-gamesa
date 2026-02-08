import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle2, Send } from "lucide-react";

interface Alert {
  turbineId: string;
  probability: number;
  model: string;
  timestamp: string;
  severity: 'high' | 'medium';
}

interface AlertsListProps {
  alerts: Alert[];
}

export const AlertsList = ({ alerts }: AlertsListProps) => {

  if (alerts.length === 0) {
    return (
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-success" />
            Maintenance Alerts
          </CardTitle>
          <CardDescription>No turbines require immediate maintenance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-success" />
            <p>All turbines are operating within normal parameters</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning animate-pulse-glow" />
            Maintenance Alerts
          </CardTitle>
          <CardDescription>
            {alerts.length} turbine{alerts.length > 1 ? 's' : ''} requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-gradient-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    alert.severity === 'high' 
                      ? 'bg-destructive/10' 
                      : 'bg-warning/10'
                  }`}>
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.severity === 'high' 
                        ? 'text-destructive' 
                        : 'text-warning'
                    }`} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">{alert.turbineId}</h3>
                      <Badge 
                        variant={alert.severity === 'high' ? 'destructive' : 'secondary'}
                        className="font-medium"
                      >
                        {alert.severity === 'high' ? 'High Priority' : 'Medium Priority'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                      <span>Model: {alert.model}</span>
                      <span>Probability: {(alert.probability * 100).toFixed(1)}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Predicted maintenance required based on anomaly detection and supervised learning models.
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        <span className="text-success font-medium">Alert sent automatically</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Send className="h-3.5 w-3.5" />
                        <span className="text-xs">to maintenance team</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
