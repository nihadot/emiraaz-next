'use client';

import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import PrivacyPolicyDesktop from './PrivacyPolicyDesktop';
import PrivacyPolicyMobile from './Mobile/PrivacyPolicyMobile';

type Term = {
  title: string;
  content: string[];
};

export default function PrivacyPolicyResponsive({
  terms,
}: {
  terms: Term[];
}) {
  return (
    <ResponsiveSwitch
      desktop={<PrivacyPolicyDesktop terms={terms} />}
      mobile={<PrivacyPolicyMobile terms={terms} />}
    />
  );
}
