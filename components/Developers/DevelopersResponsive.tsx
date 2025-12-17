'use client';

import Developers from '@/components/Developers/Developers';
import DeveloperMobile from '@/components/Developers/Mobile/DevelopersMobile';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';

export default function DevelopersResponsive() {
  return (
    <ResponsiveSwitch
      mobile={<DeveloperMobile />}
      desktop={<Developers />}
    />
  );
}
