'use client';

import ResponsiveSwitch from '@/components/Common/ResponsiveSwitch';
import Login from './Login';
import LoginMobile from './Mobile/LoginMobile';
import SignupMobile from './Mobile/SignupMobile';
import Registration from "@/components/Registration/Registration";

export default function AuthResponsive({
  mode = 'login',
}: {
  mode?: 'login' | 'registration';
}) {
  return (
    <ResponsiveSwitch
      mobile={mode === 'login' ? <LoginMobile /> : <SignupMobile />}
      desktop={mode === 'login' ? <Login /> : <Registration />}
    />
  );
}
