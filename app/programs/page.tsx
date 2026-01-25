import Exhibition from '../components/ProgramDetailSection/Exhibition';
import BusinessMatching from '../components/ProgramDetailSection/BusinessMatching';
import InvestmentMatchMaking from '../components/ProgramDetailSection/InvestmentMatchMaking';
import YouthEvent from '../components/ProgramDetailSection/YouthEvent';
import D8HEITalk from '../components/ProgramDetailSection/D8HEITalk';
import D8CultureFestival from '../components/ProgramDetailSection/D8CultureFestival';

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
