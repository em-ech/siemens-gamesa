import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2 } from "lucide-react";
import type { Alert } from "@/components/AlertsList";

interface NotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  alert: Alert | null;
}

export const NotificationDialog = ({ open, onOpenChange, alert }: NotificationDialogProps) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter a recipient email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    // Simulate sending email (replace with actual API call)
    setTimeout(() => {
      toast({
        title: "Alert Sent Successfully",
        description: `Maintenance alert for ${alert?.turbineId} sent to ${email}`,
      });
      setIsSending(false);
      onOpenChange(false);
      setEmail("");
      setMessage("");
    }, 1500);
  };

  const defaultMessage = alert
    ? `⚠️ MAINTENANCE ALERT

Turbine ID: ${alert.turbineId}
Priority: ${alert.severity === 'high' ? 'HIGH' : 'MEDIUM'}
Detection Time: ${new Date(alert.timestamp).toLocaleString()}
Confidence: ${(alert.probability * 100).toFixed(1)}%
Model: ${alert.model}

Description:
Predictive maintenance models have detected anomalies indicating this turbine requires immediate attention. Please schedule maintenance inspection as soon as possible.

This is an automated alert from the Wind Turbine Monitoring System.`
    : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Send Maintenance Alert
          </DialogTitle>
          <DialogDescription>
            Send email notification to maintenance worker about turbine {alert?.turbineId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">Recipient Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="maintenance@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Enter custom message..."
              value={message || defaultMessage}
              onChange={(e) => setMessage(e.target.value)}
              rows={12}
              className="font-mono text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSending}>
            Cancel
          </Button>
          <Button variant="gradient" onClick={handleSend} disabled={isSending}>
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Send Alert
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
