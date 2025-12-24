'use client';

import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import DonationsMobile from './Mobile/DonationsMobile';
import DonationsDesktop from './DonationsDesktop';

export default function DonationsResponsive({
  content,
}: {
  content?: any;
}) {
  return (
    <ResponsiveSwitch
      mobile={<DonationsMobile content={content} />}
      desktop={<DonationsDesktop />}
    />
  );
}
