"use client";
import Card from "@/components/card/card";
import InputSearch from "@/components/search";
import { useState } from "react";

export default function SearchPage() {
  return (
    <div>
      <InputSearch />
      <Card Res={true} Edit={true} />
    </div>
  );
}
