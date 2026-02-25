export interface Item {
  id: number;
  name: string;
  value: number;
  category: 'A' | 'B' | 'C';
  timestamp: Date;
  isActive: boolean;
  metadata: {
    created: Date;
    updated: Date;
    version: number;
  };
}

export interface ComponentMetric {
  name: string;
  renderCount: number;
  lastRenderTime: number;
  colorIntensity: number;
}

export interface DataUpdateConfig {
  interval: number;
  itemsToUpdate: number;
  valueVariation: number;
}
