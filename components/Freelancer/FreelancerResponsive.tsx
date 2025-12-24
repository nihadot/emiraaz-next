'use client';

import Freelancer from './Freelancer';
import FreelancerMobile from './Mobile/FreelancerMobile';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';

export default function FreelancerResponsive() {
  return (
    <ResponsiveSwitch
      mobile={<FreelancerMobile />}
      desktop={<Freelancer />}
    />
  );
}
