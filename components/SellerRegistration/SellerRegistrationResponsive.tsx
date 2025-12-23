'use client';

import SellerRegistration from './SellerRegistration';
import SellerRegistrationMobile from './Mobile/SellerRegistrationMobile';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';

export default function SellerRegistrationResponsive() {
  return (
    <ResponsiveSwitch
      mobile={<SellerRegistrationMobile />}
      desktop={<SellerRegistration />}
    />
  );
}
