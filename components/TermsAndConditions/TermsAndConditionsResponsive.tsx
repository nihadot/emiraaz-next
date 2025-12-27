'use client';

import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import TermsAndConditionsDesktop from './TermsAndConditionsDesktop';
import TermsAndConditionsMobile from './Mobile/TermsAndConditionsMobile';

type Props = {
  terms: {
    title: string;
    content: string[];
  }[];
};

export default function TermsAndConditionsResponsive({ terms }: Props) {
  return (
    <ResponsiveSwitch
      desktop={<TermsAndConditionsDesktop terms={terms} />}
      mobile={<TermsAndConditionsMobile terms={terms} />}
    />
  );
}
