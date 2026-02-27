import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RFQSetup from './components/RFQSetup';
import SubmissionTracker from './components/SubmissionTracker';
import BidAnalysis from './components/BidAnalysis';
import EvaluationReport from './components/EvaluationReport';
import VendorEvaluationDashboard from './components/VendorEvaluationDashboard';
import ProjectEvaluationDashboard from './components/ProjectEvaluationDashboard';
import { Project } from './types';
import { PROJECTS } from './constants';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  const [activeProject, setActiveProject] = useState<Project | undefined>(PROJECTS[0]);
  const [activeVendorId, setActiveVendorId] = useState('v1');

  const handleProjectSelect = (project: Project, screen: string) => {
    setActiveProject(project);
    setActiveScreen(screen);
  };

  const handleBackToHome = () => {
    setActiveScreen('home');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Dashboard onProjectSelect={handleProjectSelect} onNewRFQ={() => setActiveScreen('setup')} />;
      case 'setup':
        return <RFQSetup />;
      case 'submissions':
        return <SubmissionTracker />;
      case 'analysis':
        return <BidAnalysis />;
      case 'reports':
        return (
          <ProjectEvaluationDashboard 
            onBack={() => setActiveScreen('analysis')}
            onViewVendor={(vendorId) => {
              setActiveVendorId(vendorId);
              setActiveScreen('vendor-dashboard');
            }}
          />
        );
      case 'vendor-dashboard':
        return (
          <VendorEvaluationDashboard 
            vendorId={activeVendorId}
            projectId={activeProject?.id || 'p1'}
            onBack={() => setActiveScreen('reports')}
            onVendorChange={(vId) => setActiveVendorId(vId)}
          />
        );
      default:
        return <Dashboard onProjectSelect={handleProjectSelect} onNewRFQ={() => setActiveScreen('setup')} />;
    }
  };

  return (
    <Layout 
      activeScreen={activeScreen} 
      setActiveScreen={setActiveScreen}
      activeProject={activeProject ? { name: activeProject.name, ref: activeProject.rfqRef, status: activeProject.status } : undefined}
      onBackToHome={handleBackToHome}
    >
      {renderScreen()}
    </Layout>
  );
}
