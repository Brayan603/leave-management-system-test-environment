let mockDate = null;
let simulationEnabled = false;

export const enableSimulation = () => {
  simulationEnabled = true;
};

export const disableSimulation = () => {
  simulationEnabled = false;
  mockDate = null;
};

export const setMockDate = (date) => {
  if (simulationEnabled) {
    mockDate = new Date(date);
  }
};

export const getCurrentDate = () => {
  if (simulationEnabled && mockDate) {
    return new Date(mockDate);
  }
  return new Date();
};

export const isSimulationEnabled = () => simulationEnabled;     //const isProduction = process.env.NODE_ENV === "production";