import type { ComponentType } from 'react';
import type { BlockId } from '../adaptive/rules';
import type { BlockProps } from './types';
import { ActionNeeded } from './ActionNeeded';
import { BenefitPrograms } from './BenefitPrograms';
import { DeductibleSpotlight } from './DeductibleSpotlight';
import { GetStarted } from './GetStarted';
import { HelpfulResources } from './HelpfulResources';
import { IdCards } from './IdCards';
import { PlanBasics } from './PlanBasics';
import { RecentActivity } from './RecentActivity';
import { SavingsOpportunity } from './SavingsOpportunity';

export const blockComponents: Record<BlockId, ComponentType<BlockProps>> = {
  actionNeeded: ActionNeeded,
  getStarted: GetStarted,
  deductibleSpotlight: DeductibleSpotlight,
  recentActivity: RecentActivity,
  planBasics: PlanBasics,
  idCards: IdCards,
  savingsOpportunity: SavingsOpportunity,
  benefitPrograms: BenefitPrograms,
  helpfulResources: HelpfulResources,
};
