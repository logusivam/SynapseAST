import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '@/pages/landing/ui/LandingPage';
import EditorPage from '@/pages/editor/ui/EditorPage';
import ExamplesPage from '@/pages/examples/ui/ExamplesPage';
import DocsPage from '@/pages/docs/ui/DocsPage';
import { Preloader } from '@/shared/ui/Preloader';

export const App: React.FC = () => {
  return (
    <>
      <Preloader />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/examples" element={<ExamplesPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
