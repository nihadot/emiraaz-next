'use client';

import { useState } from 'react';
import HeroCard from './HeroCard';
import OfferList from './OfferList';
import DisclaimerCard from './DisclaimerCard';
import RegisterCard from './RegisterCard';
import CommentsSection from './CommentsSection';
import FreelancerFormModal from './FreelancerFormModal';

export default function FreelancerMobile() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <main className="min-h-screen bg-white px-4 pb-24 pt-4">
      <HeroCard />
      <OfferList />
      <DisclaimerCard />

      <RegisterCard onRegister={() => setOpenForm(true)} />

      <CommentsSection />

      <FreelancerFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
      />
    </main>
  );
}
