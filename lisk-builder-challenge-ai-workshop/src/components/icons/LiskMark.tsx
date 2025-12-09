type Props = { size?: number };

export default function LiskMark({ size = 28 }: Props) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="28" height="28" rx="8" fill="var(--brand-primary)"/>
      <path d="M14 6l5 8-5 8-5-8 5-8z" fill="white"/>
    </svg>
  );
}


