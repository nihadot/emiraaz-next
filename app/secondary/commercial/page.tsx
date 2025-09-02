'use client'

import Commercial from "@/components/Secondary/Commercial"
import { Suspense } from "react";

function Page() {

   
    return (
        <Commercial/>
    )
}
export default function CommercialPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
