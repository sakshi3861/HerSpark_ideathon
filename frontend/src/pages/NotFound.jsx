import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useTitle from '../hooks/useTitle';

export default function NotFound() {
  useTitle('Page not found');
  return (
    <>
      <Header active="" />
      <main className="w-full pt-20 bg-background min-h-screen">
        <div className="page flex justify-center">
          <div className="card-bordered max-w-lg w-full flex flex-col items-center text-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-outline">
              <span className="material-symbols-outlined">search_off</span>
            </div>
            <span className="font-mono text-t-mono text-on-surface-variant">404</span>
            <h1 className="page-title">Page not found</h1>
            <p className="text-t-body text-on-surface-variant">The page you requested doesn&apos;t exist or has moved.</p>
            <div className="flex gap-space-sm">
              <Link to="/home" className="btn-primary">Back to overview</Link>
              <Link to="/console" className="btn-secondary">Open console</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
