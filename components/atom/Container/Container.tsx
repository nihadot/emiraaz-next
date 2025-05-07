import React, { ReactNode } from 'react';
import clsx from 'clsx';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * @component Container
 * 
 * A reusable layout wrapper component that applies consistent horizontal spacing (padding),
 * centers the content, and limits its maximum width.
 * 
 * 📦 **Separation of Concerns (SoC):**
 * - This component is responsible *only* for layout (max-width, centering, padding).
 * - It does **not handle** content, logic, or styling beyond layout constraints.
 * - Promotes reuse and layout consistency across pages.
 * 
 * 🧱 **Usage Example:**
 * ```tsx
 * <Container>
 *   <h1>Welcome</h1>
 *   <p>This content is centered and padded.</p>
 * </Container>
 * ```
 */
const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx('mx-auto w-full max-w-[1200px] px-5', className)}>
      {children}
    </div>
  );
};

export default Container;
