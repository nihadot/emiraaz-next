'use client';

import BottomModal from './BottomModal';
import FreelancerForm from './FreelancerForm';
import FreelancerSuccess from './FreelancerSuccess';
import { useState } from 'react';

export default function FreelancerFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [success, setSuccess] = useState(false);

  return (
    <BottomModal open={open} onClose={onClose}>
      {!success ? (
        <FreelancerForm onSuccess={() => setSuccess(true)} onClose={onClose} />
      ) : (
        <FreelancerSuccess onClose={onClose} />
      )}
    </BottomModal>
  );
}
