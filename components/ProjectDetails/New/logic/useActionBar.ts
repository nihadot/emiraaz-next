"use client";

export interface ActionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export function useActionBar(actions: ActionItem[]) {
  const handleClick = (id: string) => {
    const action = actions.find(a => a.id === id);
    action?.onClick();
  };

  return {
    actions,
    handleClick,
  };
}
