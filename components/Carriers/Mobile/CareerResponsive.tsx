import Career from '@/components/Carriers/Carriers';
import CareerMobile from '@/components/Carriers/Mobile/CareerMobile';
import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';

export default function CareersPage() {
  return (
    <ResponsiveSwitch
      mobile={<CareerMobile />}
      desktop={<Career />}
    />
  );
}
