import SpeedTest from './SpeedTest';
import SpeedTestHistory from './SpeedTestHistory';
import AboutSection from './AboutSection';
import { useTestHistory } from '../hooks/useTestHistory';

const HomePage = () => {
  const { history, addTestResult, clearHistory } = useTestHistory();

  return (
    <div className="max-w-6xl mx-auto">
      <SpeedTest onTestComplete={addTestResult} />
      <SpeedTestHistory history={history} onClearHistory={clearHistory} />
      <AboutSection />
    </div>
  );
};

export default HomePage; 