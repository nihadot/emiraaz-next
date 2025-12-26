'use client';

import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import QuickEnquiryContainer from './QuickEnquiryContainer';
import QuickEnquiryMobile from './Mobile/QuickEnquiryMobile';
import QuickEnquiry from './QuickEnquiry';

export default function QuickEnquiryResponsive() {
  return (
    <QuickEnquiryContainer>
      {(props) => (
        <ResponsiveSwitch
          desktop={<QuickEnquiry />}
          mobile={<QuickEnquiryMobile {...props} />}
        />
      )}
    </QuickEnquiryContainer>
  );
}
