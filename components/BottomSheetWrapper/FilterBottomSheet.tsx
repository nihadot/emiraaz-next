import BottomSheetWrapper from './BottomSheetWrapper';

export default function FilterBottomSheet({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <BottomSheetWrapper isOpen={isOpen} onClose={onClose}>
      {children}
    </BottomSheetWrapper>
  );
}
