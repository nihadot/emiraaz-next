'use client';

import CityComponent from '@/components/City/City';
import CityMobile from '@/components/City/Mobile/CityMobile';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';

export default function CityResponsive() {
  return (
    <ResponsiveSwitch
      mobile={<CityMobile />}
      desktop={<CityComponent />}
    />
  );
}
