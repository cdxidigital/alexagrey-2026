/**
 * Ellie May engagement: fleshsesh is a digital publisher and technology provider.
 * It is not an in-person sex-services booking, referral or payment operator.
 *
 * This is an operational boundary, not a claim about legal permissions for ads,
 * public content or online age-restricted media.
 */
export const ellieDigitalScope = {
  websiteDesign: true,
  approvedMediaPublishing: true,
  onlineProfileManagement: true,
  approvedDigitalMarketing: true,
  privacyAndTakedownSupport: true,
  creatorDecidesPhysicalServices: true,
  inPersonBookingByFleshsesh: false,
  physicalServicePaymentByFleshsesh: false,
  physicalServiceRateSettingByFleshsesh: false,
  recruitmentForPhysicalServicesByFleshsesh: false,
  physicalServiceCommissionByFleshsesh: false,
} as const;

export function rejectPhysicalBookingIntake(): never {
  throw new Error(
    "Ellie May handles in-person bookings independently. This digital publishing site does not accept or arrange appointments.",
  );
}
