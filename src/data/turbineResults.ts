// Regression Results from wind_turbine_maintenance_test_data.csv
export const regressionResults = {
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
