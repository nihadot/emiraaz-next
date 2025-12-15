"use client";

import { ActionItem, useActionBar } from "../logic/useActionBar";
import ActionBarUI from "./ActionBarUI";

interface Props {
  actions: ActionItem[];
}

export default function ActionBar({ actions }: Props) {
  const { actions: items, handleClick } = useActionBar(actions);

  return <ActionBarUI actions={items} onAction={handleClick} />;
}
