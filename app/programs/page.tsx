import dynamic from 'next/dynamic';

const Exhibition = dynamic(() => import('../components/ProgramDetailSection/Exhibition'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const BusinessMatching = dynamic(() => import('../components/ProgramDetailSection/BusinessMatching'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const InvestmentMatchMaking = dynamic(() => import('../components/ProgramDetailSection/InvestmentMatchMaking'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const YouthEvent = dynamic(() => import('../components/ProgramDetailSection/YouthEvent'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const D8HEITalk = dynamic(() => import('../components/ProgramDetailSection/D8HEITalk'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

const D8CultureFestival = dynamic(() => import('../components/ProgramDetailSection/D8CultureFestival'), {
  loading: () => <div style={{ minHeight: '400px' }}></div>,
});

export default function ProgramsPage() {
  return (
    <main>
      <Exhibition />
      <BusinessMatching />
      <InvestmentMatchMaking />
      <YouthEvent />
      <D8HEITalk />
      <D8CultureFestival />
    </main>
  );
}
