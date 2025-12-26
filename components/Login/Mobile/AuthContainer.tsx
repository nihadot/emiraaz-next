'use client';

export default function AuthContainer({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white px-5 pt-10 pb-28 flex flex-col">
      {children}

      {footer && (
        <div className="fixed bottom-4 left-0 right-0 px-5">
          {footer}
        </div>
      )}
    </main>
  );
}
