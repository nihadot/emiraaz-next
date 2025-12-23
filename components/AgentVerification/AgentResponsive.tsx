import AgentVerification from '@/components/AgentVerification/AgentVerification';
import AgentVerificationMobile from '@/components/AgentVerification/Mobile/AgentVerificationMobile';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';

export default function AgentVerificationPage() {
  return (
    <ResponsiveSwitch
      mobile={<AgentVerificationMobile />}
      desktop={<AgentVerification />}
    />
  );
}
