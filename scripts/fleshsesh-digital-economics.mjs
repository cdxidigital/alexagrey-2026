/**
 * Fleshsesh digital-only pricing scenario model.
 * Illustrative internal estimates only; NOT real financial history or a public quote.
 * Excludes sexual services, personal client bookings, commissions and all such revenue.
 */
export const MODELLING = Object.freeze({
  currency: 'AUD',
  includesGST: false,
  loadedLabourCostPerHour: 65,
  processingReserveRate: 0.02,
  illustrativeFixedOverheadPerMonth: 500,
});

export const DIGITAL_OFFERS = Object.freeze({
  launch: Object.freeze({ id: 'launch', period: 'one_off', fee: 995, deliveryHours: 7, otherVariableCost: 60 }),
  foundation: Object.freeze({ id: 'foundation', period: 'monthly', fee: 595, deliveryHours: 3, otherVariableCost: 45 }),
  momentum: Object.freeze({ id: 'momentum', period: 'monthly', fee: 1195, deliveryHours: 6, otherVariableCost: 90 }),
  audit: Object.freeze({ id: 'audit', period: 'one_off', fee: 395, deliveryHours: 2, otherVariableCost: 20 }),
});

const money = (amount) => Math.round((amount + Number.EPSILON) * 100) / 100;

export function digitalOfferEconomics(offerId, options = MODELLING) {
  if (!Object.hasOwn(DIGITAL_OFFERS, offerId)) throw new RangeError('Unknown digital-only offer');
  const offer = DIGITAL_OFFERS[offerId];
  const labourRate = options.loadedLabourCostPerHour;
  const feeRate = options.processingReserveRate;
  if (![labourRate, feeRate].every(Number.isFinite) || labourRate < 0 || feeRate < 0 || feeRate >= 1) {
    throw new RangeError('Invalid cost assumptions');
  }
  const labour = money(offer.deliveryHours * labourRate);
  const processing = money(offer.fee * feeRate);
  const costs = money(labour + offer.otherVariableCost + processing);
  const contribution = money(offer.fee - costs);
  return {
    offerId, period: offer.period, currency: 'AUD',
    revenueExcludingGST: offer.fee, deliveryHours: offer.deliveryHours,
    loadedDeliveryLabour: labour, otherVariableCost: offer.otherVariableCost,
    hypotheticalProcessingReserve: processing, modelledDirectCosts: costs,
    contributionBeforeFixed: contribution,
    contributionRatio: money(contribution / offer.fee),
    isActual: false, isProfit: false,
  };
}

export function digitalMonthlyScenario({ foundation = 0, momentum = 0 } = {}, options = MODELLING) {
  if (![foundation, momentum].every((x) => Number.isSafeInteger(x) && x >= 0)) {
    throw new RangeError('Account counts must be nonnegative integers');
  }
  const a = digitalOfferEconomics('foundation', options);
  const b = digitalOfferEconomics('momentum', options);
  const revenueExcludingGST = money(foundation * a.revenueExcludingGST + momentum * b.revenueExcludingGST);
  const modelledDirectCosts = money(foundation * a.modelledDirectCosts + momentum * b.modelledDirectCosts);
  const contributionBeforeFixed = money(revenueExcludingGST - modelledDirectCosts);
  const fixed = options.illustrativeFixedOverheadPerMonth;
  if (!Number.isFinite(fixed) || fixed < 0) throw new RangeError('Invalid illustrative fixed overhead');
  return {
    accounts: foundation + momentum,
    monthlyDeliveryHours: foundation * a.deliveryHours + momentum * b.deliveryHours,
    revenueExcludingGST, modelledDirectCosts, contributionBeforeFixed,
    indicativeAfterIllustrativeFixedBeforeOtherCosts: money(contributionBeforeFixed - fixed),
    currency: 'AUD', isActual: false, isProfit: false,
  };
}
