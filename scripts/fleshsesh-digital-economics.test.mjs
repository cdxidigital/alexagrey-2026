import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MODELLING, DIGITAL_OFFERS, digitalOfferEconomics, digitalMonthlyScenario,
} from './fleshsesh-digital-economics.mjs';

test('offers are explicitly digital and scoped by fixed delivery hours', () => {
  assert.deepEqual(Object.keys(DIGITAL_OFFERS), ['launch', 'foundation', 'momentum', 'audit']);
  assert.equal(digitalOfferEconomics('foundation').period, 'monthly');
  assert.throws(() => digitalOfferEconomics('in_person_booking'), /Unknown digital-only offer/);
  assert.throws(() => digitalOfferEconomics('commission'), /Unknown digital-only offer/);
});

test('unit economics reproduce documented hypothetical figures', () => {
  for (const [name, value] of [['launch', 460.10], ['foundation', 343.10], ['momentum', 691.10], ['audit', 237.10]]) {
    const row = digitalOfferEconomics(name);
    assert.equal(row.contributionBeforeFixed, value);
    assert.equal(row.isProfit, false);
    assert.equal(row.isActual, false);
  }
});

test('monthly case forecasts are bounded by hours and show partial contribution only', () => {
  const conservative = digitalMonthlyScenario({ foundation: 3, momentum: 1 });
  const base = digitalMonthlyScenario({ foundation: 8, momentum: 3 });
  const growth = digitalMonthlyScenario({ foundation: 15, momentum: 6 });
  assert.deepEqual([conservative.revenueExcludingGST, base.revenueExcludingGST, growth.revenueExcludingGST], [2980, 8345, 16095]);
  assert.deepEqual([conservative.contributionBeforeFixed, base.contributionBeforeFixed, growth.contributionBeforeFixed], [1720.4, 4818.1, 9293.1]);
  assert.deepEqual([conservative.monthlyDeliveryHours, base.monthlyDeliveryHours, growth.monthlyDeliveryHours], [15, 42, 81]);
  assert.equal(base.isProfit, false);
});

test('reject bad cost assumptions and invented client counts', () => {
  assert.throws(() => digitalMonthlyScenario({ foundation: -2 }), /Account counts/);
  assert.throws(() => digitalMonthlyScenario({ foundation: 1.5 }), /Account counts/);
  assert.throws(() => digitalOfferEconomics('foundation', { ...MODELLING, processingReserveRate: 1 }), /Invalid cost/);
  assert.throws(() => digitalOfferEconomics('foundation', { ...MODELLING, loadedLabourCostPerHour: -1 }), /Invalid cost/);
});

test('higher loaded labour costs reduce contribution instead of improving margin', () => {
  const a = digitalOfferEconomics('momentum');
  const b = digitalOfferEconomics('momentum', { ...MODELLING, loadedLabourCostPerHour: 78 });
  assert.equal(a.contributionBeforeFixed - b.contributionBeforeFixed, 78);
});
