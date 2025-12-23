'use client';

import { useState } from 'react';
import BottomModal from './BottomModal';
import SellerForm from './SellerForm';
import SellerSuccessModal from './SellerSuccessModal';

export default function SellerFormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [successOpen, setSuccessOpen] = useState(false);

  return (
    <>
      {/* FORM MODAL */}
      <BottomModal open={open} onClose={onClose}>
        <SellerForm
          onClose={onClose}
          onSuccess={() => {
            onClose();          // close form
            setSuccessOpen(true); // open success
          }}
        />
      </BottomModal>

      {/* SUCCESS MODAL */}
      <BottomModal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
      >
        <SellerSuccessModal
          onClose={() => setSuccessOpen(false)}
        />
      </BottomModal>
    </>
  );
}
