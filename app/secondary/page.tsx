'use client'

import Secondary from "@/components/Secondary/Secondary"
import { Suspense } from "react";

function PageComponent() {


  return (
    <Secondary />
  )
}



export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageComponent />
    </Suspense>
  );
}