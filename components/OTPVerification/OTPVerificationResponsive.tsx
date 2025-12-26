'use client';

import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import OTPVerification from './OTPVerification';
import OTPVerificationMobile from './Mobile/OTPVerificationMobile';

type Props = {
  email: string;
  loading: boolean;
  handleSubmit: () => void;
  handleResentOTP: () => void;
  onChange: (otp: string[]) => void;
};

export default function OTPVerificationResponsive(props: Props) {
  return (
    <ResponsiveSwitch
      mobile={<OTPVerificationMobile {...props} />}
      desktop={<OTPVerification {...props} />}
    />
  );
}
