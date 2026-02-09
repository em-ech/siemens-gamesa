import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, AlertTriangle, Leaf, Sparkles, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Wind Turbines Risk Assessment",
      description: "Predictive analytics dashboard showing turbine health status and risk scores",
      icon: Activity,
      path: "/turbines",
      color: "from-primary to-primary-glow",
    },
    {
      title: "Wind Turbine Maintenance Alerts",
      description: "Automated alert system for predicted maintenance requirements",
      icon: AlertTriangle,
      path: "/turbines",
      color: "from-warning to-yellow-400",
    },
    {
      title: "CO2 Emissions Dashboard",
      description: "Calculate and optimize your energy mix for reduced carbon footprint",
      icon: Leaf,
      path: "/emissions",
      color: "from-success to-emerald-400",
    },
    {
      title: "Siemens Recommender",
      description: "AI-powered recommendations for optimal turbine performance and maintenance",
      icon: Sparkles,
      path: "/emissions",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Analytics Overview",
      description: "Comprehensive view of all wind farm operations and performance metrics",
      icon: Wind,
      path: "/turbines",
      color: "from-blue-500 to-cyan-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Siemens Intelligence Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive analytics and predictive maintenance platform for wind energy operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 hover:-translate-y-1 border-border/50 backdrop-blur-sm bg-card/95"
                onClick={() => navigate(feature.path)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
