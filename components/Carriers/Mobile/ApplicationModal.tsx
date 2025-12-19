'use client';

import { useState } from 'react';
import BottomModal from './BottomModal';
import ApplicationForm from './ApplicationForm';
import ApplicationSuccess from './ApplicationSuccess';

export default function ApplicationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <BottomModal open={open} onClose={onClose}>
      {!submitted ? (
        <ApplicationForm
          onSubmit={() => setSubmitted(true)} // 🔴 THIS LINE IS CRITICAL
          onClose={onClose}
        />
      ) : (
        <ApplicationSuccess onClose={onClose} />
      )}
    </BottomModal>
  );
}
