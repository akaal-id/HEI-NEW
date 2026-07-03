import OurDelegatesFull from './OurDelegatesFull';
import OurDelegatesPreview from './OurDelegatesPreview';

interface OurDelegatesSectionProps {
  preview?: boolean;
}

export default function OurDelegatesSection({ preview = false }: OurDelegatesSectionProps) {
  if (preview) return <OurDelegatesPreview />;
  return <OurDelegatesFull />;
}
