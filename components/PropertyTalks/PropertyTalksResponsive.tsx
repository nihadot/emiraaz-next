'use client';

import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import PropertyTalksMobile from './Mobile/PropertyTalksMobile';
import PropertyTalksDesktop from './PropertyTalksDesktop';

export default function PropertyTalksResponsive() {
  return (
    <ResponsiveSwitch
      mobile={<PropertyTalksMobile />}
      desktop={<PropertyTalksDesktop />}
    />
  );
}
