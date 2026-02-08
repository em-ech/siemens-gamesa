import { Link, useLocation } from "react-router-dom";
import { Wind, Leaf, Home, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4 py-4">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg transition-all",
              location.pathname === "/"
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Home className="h-5 w-5" />
            <span className="font-semibold">Home</span>
          </Link>
          
          <Link
            to="/turbines"
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg transition-all",
              location.pathname === "/turbines"
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Wind className="h-5 w-5" />
            <span className="font-semibold">Wind Turbines</span>
          </Link>
          
          <Link
            to="/emissions"
            className={cn(
              "flex items-center gap-2 px-6 py-2 rounded-lg transition-all",
              location.pathname === "/emissions"
                ? "bg-gradient-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Leaf className="h-5 w-5" />
            <span className="font-semibold">Emissions</span>
          </Link>
          
        </div>
      </div>
    </nav>
  );
};
