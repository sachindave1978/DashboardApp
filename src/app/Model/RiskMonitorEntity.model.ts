import { MarginEntity } from './MarginEntity.model'
import { RiskEntity } from './RiskEntity.model'

export class RiskMonitorEntity {
    TotalMargin: number;
    TotalMarginPercent: number;
    TotalRisk: number;
    TotalRiskPercent: number;
    TotalExposure: number;
    TotalExposurePercent: number;
    TotalPortfolio: number;    
    TotalPortfolioPercent: number;
    objMarginData: Array<MarginEntity>;
    objRiskData: Array<RiskEntity>;
    constructor() {
    }
}