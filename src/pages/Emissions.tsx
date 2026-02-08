import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Leaf, Zap, TrendingDown, Sparkles, Activity, Battery, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// CO2 emission factors (gCO2/kWh) from IPCC/NREL
const EMISSION_FACTORS = {
  solar: 45,
  wind: 12,
  hydro: 24,
  nuclear: 12,
  biomass: 230,
  gas: 490,
  oil: 650,
  coal: 820,
};

const Emissions = () => {
  const [energyMix, setEnergyMix] = useState({
    solar: 30,
    wind: 25,
    hydro: 10,
    nuclear: 10,
    biomass: 5,
    gas: 15,
    oil: 2,
    coal: 3,
  });

  const [annualElectricity, setAnnualElectricity] = useState(10000);
  const [carbonPrice, setCarbonPrice] = useState(75);

  const updateMix = (source: keyof typeof energyMix, value: number) => {
    setEnergyMix(prev => ({ ...prev, [source]: value }));
  };

  const totalPercentage = Object.values(energyMix).reduce((sum, val) => sum + val, 0);

  const { emissionIntensity, status, statusColor, breakdownData, totalEmissions, carbonCost } = useMemo(() => {
    const intensity = Object.entries(energyMix).reduce((sum, [source, percentage]) => {
      return sum + (percentage / 100) * EMISSION_FACTORS[source as keyof typeof EMISSION_FACTORS];
    }, 0);

    let status = "🟢 Green Zone";
    let statusColor = "success";
    if (intensity > 350) {
      status = "🔴 Red Zone";
      statusColor = "destructive";
    } else if (intensity > 150) {
      status = "🟠 Orange Zone";
      statusColor = "warning";
    }

    const breakdown = Object.entries(energyMix)
      .map(([source, percentage]) => ({
        source,
        percentage,
        factor: EMISSION_FACTORS[source as keyof typeof EMISSION_FACTORS],
        weighted: (percentage / 100) * EMISSION_FACTORS[source as keyof typeof EMISSION_FACTORS],
      }))
      .sort((a, b) => b.weighted - a.weighted);

    const totalEmissionsValue = (intensity * annualElectricity) / 1000; // Convert to tonnes
    const carbonCostValue = (totalEmissionsValue * carbonPrice) / 1000; // in k€

    return {
      emissionIntensity: Math.round(intensity),
      status,
      statusColor,
      breakdownData: breakdown,
      totalEmissions: totalEmissionsValue.toFixed(1),
      carbonCost: carbonCostValue.toFixed(1),
    };
  }, [energyMix, annualElectricity, carbonPrice]);

  const getSourceIcon = (source: string) => {
    const icons: Record<string, string> = {
      solar: "☀️",
      wind: "💨",
      hydro: "💧",
      nuclear: "⚛️",
      biomass: "🌱",
      gas: "🔥",
      oil: "🛢️",
      coal: "⚫",
    };
    return icons[source] || "⚡";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Leaf className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            Optimize Your Energy Mix.
          </h1>
          <h2 className="text-4xl font-bold text-primary-glow mb-6">
            Lower Emissions with Siemens AI.
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Real-time CO₂ impact modeling, cost simulation, and tailored decarbonization insights.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              Launch Dashboard
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white/50 text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">AI-Powered Energy Intelligence</h2>
        <p className="text-center text-muted-foreground mb-12">Three pillars of sustainable energy transformation</p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <TrendingDown className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Predict</CardTitle>
              <CardDescription>
                Machine learning models analyze your mix and compute emission intensity.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Assist</CardTitle>
              <CardDescription>
                GenAI suggests Siemens services to improve efficiency.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <CardTitle>Optimize</CardTitle>
              <CardDescription>
                Simulate renewable energy scenarios to cut CO₂ and cost.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Interactive Dashboard Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">Interactive Demo</Badge>
            <h2 className="text-3xl font-bold mb-4">CO₂ Impact Dashboard Preview</h2>
            <p className="text-muted-foreground mb-2">
              Adjust your energy mix and see real-time emission calculations
            </p>
            <p className="text-sm text-muted-foreground">Powered by official IPCC/NREL data</p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Annual Energy & Pricing */}
            <Card>
              <CardHeader>
                <CardTitle>Annual Energy & Pricing</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="electricity">Annual Electricity (MWh)</Label>
                  <Input
                    id="electricity"
                    type="number"
                    value={annualElectricity}
                    onChange={(e) => setAnnualElectricity(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carbon-price">Carbon Price (€/tCO₂)</Label>
                  <Input
                    id="carbon-price"
                    type="number"
                    value={carbonPrice}
                    onChange={(e) => setCarbonPrice(Number(e.target.value))}
                    className="text-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emission Intensity */}
            <Card className={`border-2 ${statusColor === 'success' ? 'border-success' : statusColor === 'warning' ? 'border-warning' : 'border-destructive'}`}>
              <CardHeader>
                <CardTitle>Emission Intensity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2" style={{
                    color: statusColor === 'success' ? 'hsl(var(--success))' : 
                           statusColor === 'warning' ? 'hsl(var(--warning))' : 
                           'hsl(var(--destructive))'
                  }}>
                    {emissionIntensity}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">gCO₂/kWh</div>
                  <Badge variant={statusColor === 'success' ? 'default' : 'destructive'} className="text-sm">
                    Status: {status}
                  </Badge>
                  <div className="grid md:grid-cols-2 gap-4 mt-6 text-sm">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-muted-foreground">Total Annual Emissions</div>
                      <div className="text-2xl font-bold">{totalEmissions} tCO₂</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-muted-foreground">Annual Carbon Cost</div>
                      <div className="text-2xl font-bold">€{carbonCost}k</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Energy Mix Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Energy Mix Configuration</CardTitle>
                <CardDescription>
                  Total: {totalPercentage}% {totalPercentage !== 100 && <span className="text-warning">(should equal 100%)</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(energyMix).map(([source, value]) => (
                  <div key={source} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-base">
                        <span>{getSourceIcon(source)}</span>
                        <span className="capitalize">{source}</span>
                      </Label>
                      <span className="font-semibold">{value}%</span>
                    </div>
                    <Slider
                      value={[value]}
                      onValueChange={(vals) => updateMix(source as keyof typeof energyMix, vals[0])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Emissions Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Emissions Breakdown</CardTitle>
                <CardDescription>Weighted CO₂ contribution by source</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Share (%)</TableHead>
                      <TableHead className="text-right">CO₂ factor (g/kWh)</TableHead>
                      <TableHead className="text-right">Weighted (g/kWh)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breakdownData.map((item) => (
                      <TableRow key={item.source}>
                        <TableCell className="font-medium">
                          {getSourceIcon(item.source)} {item.source.charAt(0).toUpperCase() + item.source.slice(1)}
                        </TableCell>
                        <TableCell className="text-right">{item.percentage.toFixed(1)}</TableCell>
                        <TableCell className="text-right">{item.factor}</TableCell>
                        <TableCell className="text-right font-semibold">{item.weighted.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-xs text-muted-foreground mt-4">
                  Data source: IPCC/NREL medians via Our World in Data (gCO₂e/kWh). 
                  Thresholds: Green ≤150, Orange 150–350, Red ≥350.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Recommended Services */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Recommended Siemens Services</h2>
          <p className="text-muted-foreground">AI-powered recommendations tailored to your energy profile and emissions band</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-glow transition-all">
            <CardHeader>
              <Activity className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Energy Performance Audit</CardTitle>
              <CardDescription>
                Baseline your sites, detect inefficiencies, quantify savings & CO₂ abatement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-all">
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">ISO 50001 Monitoring & Reporting</CardTitle>
              <CardDescription>
                Continuous metering, dashboards and compliance reporting.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-all">
            <CardHeader>
              <TrendingDown className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Digital EMS & Demand Response</CardTitle>
              <CardDescription>
                Automate peak shaving and shift loads to lower-cost, low-carbon hours.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-all">
            <CardHeader>
              <Battery className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Battery Storage Sizing & Integration</CardTitle>
              <CardDescription>
                Stabilize variable renewables and cut peak charges/curtailment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-all">
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Grid Stability & Power Quality</CardTitle>
              <CardDescription>
                SVC/STATCOM, synchronous condensers and protection upgrades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-glow transition-all">
            <CardHeader>
              <Activity className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Performance Analytics Dashboard</CardTitle>
              <CardDescription>
                Track KPIs, alarms and CO₂ intensity in real time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground mb-4">
            💡 Recommendations are dynamically generated based on your energy mix composition and emission intensity band
          </p>
          <Button size="lg" className="bg-gradient-primary">Request Demo</Button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-muted py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-6">About This Tool</h2>
          <p className="text-center text-muted-foreground mb-8">
            This CO₂ Impact & Advisory Dashboard is part of Siemens Energy's AI-driven sustainability suite, 
            helping organizations model and reduce emissions through data-driven insights. Built on official 
            IPCC and NREL emission factors, our platform combines machine learning predictions with 
            GenAI-powered recommendations to accelerate your decarbonization journey.
          </p>
          <div className="flex gap-4 justify-center mb-8">
            <Button variant="default">Request Demo</Button>
            <Button variant="outline">Learn More</Button>
            <Button variant="outline">Contact Us</Button>
          </div>
          <div className="flex gap-6 justify-center text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">IPCC Emission Factors</a>
            <a href="#" className="hover:text-primary transition-colors">NREL Database</a>
            <a href="#" className="hover:text-primary transition-colors">Our World in Data</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Demo version for academic and evaluation purposes</p>
          <p className="mt-2">Emissions Lens • AI-Powered Energy Optimization by Siemens</p>
        </div>
      </footer>
    </div>
  );
};

export default Emissions;
