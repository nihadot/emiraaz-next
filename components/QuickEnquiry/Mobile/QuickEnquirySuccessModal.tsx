'use client';

export default function QuickEnquirySuccessModal({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-end">
      <div className="w-full rounded-t-3xl bg-white p-6 text-center">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-green-500 flex items-center justify-center text-white">
          ✓
        </div>

        <h3 className="font-semibold text-lg">Enquiry Submitted</h3>
        <p className="text-sm text-gray-500 mt-2">
          Our team will contact you shortly for further assistance.
        </p>

        <button
          onClick={onClose}
          className="mt-4 font-medium text-black"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
