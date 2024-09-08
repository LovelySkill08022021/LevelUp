import React, { useEffect, useState } from 'react'

interface Props {
  size: number;
  label: string;
  className?: string;
}

export default function Heading({ size, label, className }: Props) {

  const [fs, setFs] = useState<string>();

  useEffect(() => {
    switch (size) {
      case 1:
        setFs("text-4xl");
        break;
  
      case 2:
        setFs("text-3xl");
        break;
  
      case 3:
        setFs("text-2xl");
        break;
  
      case 4:
        setFs("text-xl");
        break;
  
      case 5:
        setFs("text-lg");
        break;
  
      case 6:
        setFs("text-base");
        break;
  
    }
  });

  return (
    <div className={`${fs} font-semibold mb-5 ${className}`}>{label}</div>
  )
}
