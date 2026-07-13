import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useWorkspaceStore } from '@/entities/workspace/model/store';

export const Header: React.FC = () => {
  const location = useLocation();
  const isEditorPage = location.pathname === '/editor';

  const language = useWorkspaceStore((state) => state.language);
  const setLanguage = useWorkspaceStore((state) => state.setLanguage);
  const filterTypes = useWorkspaceStore((state) => state.filterTypes);
  const setFilterTypes = useWorkspaceStore((state) => state.setFilterTypes);
  const code = useWorkspaceStore((state) => state.code);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Common node types that can be filtered
  const filters = [
    { label: 'Identifiers (Name)', type: 'Identifier' },
    { label: 'String/Numeric Literals', type: 'StringLiteral' },
    { label: 'Comments', type: 'CommentLine' },
    { label: 'Expressions', type: 'MemberExpression' },
  ];

  const handleFilterToggle = (type: string) => {
    if (filterTypes.includes(type)) {
      setFilterTypes(filterTypes.filter((t) => t !== type));
    } else {
      setFilterTypes([...filterTypes, type]);
    }
  };

  // Copy URL with encoded code for workspace sharing
  const handleShare = () => {
    const encoded = btoa(unescape(encodeURIComponent(code)));
    const shareUrl = `${window.location.origin}/editor#code=${encoded}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Shareable workspace link copied to clipboard!');
  };

  // Icons for navigation links
  const editorIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  );

  const examplesIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );

  const docsIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
      <path d="M6 6h10M6 10h10" />
    </svg>
  );

  const navLinks = [
    { label: 'Editor', path: '/editor', icon: editorIcon },
    { label: 'Examples', path: '/examples', icon: examplesIcon },
    { label: 'Docs', path: '/docs', icon: docsIcon },
  ];

  return (
    <header className="h-[56px] border-b border-[#2A2A45] bg-[#12121F] px-4 md:px-6 flex items-center justify-between z-30 relative select-none">
      {/* Left: Logo & Wordmark */}
      <Link to="/" className="flex items-center gap-3">
        <img src="/assets/nav-logo.svg" alt="SynapseAST Logo" className="w-8 h-8" />
        <span className="font-bold text-[18px] tracking-wide text-white">
          Synapse<span className="text-[#7C3AED]">AST</span>
        </span>
      </Link>

      {/* Center Controls (Editor specific layout controls) */}
      {isEditorPage && (
        <div className="hidden md:flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#94A3B8] font-semibold uppercase hidden sm:inline">
              Lang
            </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="bg-[#1C1C2E] border border-[#2A2A45] text-white px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded-md focus:border-[#06B6D4] outline-none cursor-pointer"
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="jsx">React JSX</option>
            </select>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-[#1C1C2E] border border-[#2A2A45] hover:border-[#06B6D4] text-white px-2 py-0.5 md:px-3 md:py-1 text-xs md:text-sm rounded-md flex items-center gap-1.5 outline-none cursor-pointer"
            >
              <span>Filter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
            </button>
            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute left-0 mt-2 w-48 md:w-56 bg-[#12121F] border border-[#2A2A45] rounded-lg p-2 shadow-2xl z-20 flex flex-col gap-1">
                  {filters.map((filter) => (
                    <label
                      key={filter.type}
                      className="flex items-center gap-2 px-2 py-1.5 hover:bg-[#1C1C2E] rounded cursor-pointer text-xs md:text-sm text-[#F1F5F9]"
                    >
                      <input
                        type="checkbox"
                        checked={filterTypes.includes(filter.type)}
                        onChange={() => handleFilterToggle(filter.type)}
                        className="accent-[#7C3AED]"
                      />
                      <span>{filter.label}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Desktop Navigation Links with Icons */}
      {!isEditorPage && (
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white ${location.pathname === link.path ? 'text-white border-b-2 border-[#7C3AED] pb-1' : 'text-[#94A3B8]'}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      )}

      {/* Right Side CTA controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {isEditorPage ? (
          <>
            <button
              onClick={handleShare}
              className="bg-[#1C1C2E] border border-[#2A2A45] hover:border-[#7C3AED] text-xs md:text-sm text-white px-2.5 py-1.5 rounded-md flex items-center gap-1.5 cursor-pointer transition-colors hidden md:flex"
            >
              <span>Share</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
            <Link
              to="/"
              className="text-[#94A3B8] hover:text-white text-xs md:text-sm font-medium transition-colors hidden md:block"
            >
              Home
            </Link>

            {/* Hamburger Button for mobile menu */}
            <label className="hamburger md:hidden">
              <input
                type="checkbox"
                checked={isMobileMenuOpen}
                onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
              />
              <svg viewBox="0 0 32 32" className="w-8 h-8">
                <path
                  className="hamburger-line hamburger-line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path className="hamburger-line" d="M7 16 27 16" />
              </svg>
            </label>
          </>
        ) : (
          <>
            <Link
              to="/editor"
              className="bg-[#7C3AED] hover:bg-[#A855F7] text-white text-xs md:text-sm font-semibold px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all shadow-md shadow-[#7C3AED]/20 cursor-pointer hidden md:block"
            >
              Open Editor
            </Link>

            {/* Hamburger Button for mobile menu */}
            <label className="hamburger md:hidden">
              <input
                type="checkbox"
                checked={isMobileMenuOpen}
                onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
              />
              <svg viewBox="0 0 32 32" className="w-8 h-8">
                <path
                  className="hamburger-line hamburger-line-top-bottom"
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                />
                <path className="hamburger-line" d="M7 16 27 16" />
              </svg>
            </label>
          </>
        )}
      </div>

      {/* Mobile Animated Dropdown Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[56px] inset-x-0 bg-[#12121F] border-b border-[#2A2A45] flex flex-col p-4 gap-3 z-20 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#1C1C2E] transition-all ${location.pathname === link.path ? 'text-white bg-[#1C1C2E]/60' : 'text-[#94A3B8]'}`}
              >
                <span className="text-[#7C3AED]">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}

            {isEditorPage && (
              <div className="flex flex-col gap-3 border-t border-[#2A2A45] pt-3 mt-1">
                {/* Language Select */}
                <div className="flex items-center justify-between px-3">
                  <span className="text-xs text-[#94A3B8] font-semibold uppercase">Language</span>
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-[#1C1C2E] border border-[#2A2A45] text-white px-3 py-1 text-sm rounded-md focus:border-[#06B6D4] outline-none cursor-pointer"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="typescript">TypeScript</option>
                    <option value="jsx">React JSX</option>
                  </select>
                </div>

                {/* Filter node types */}
                <div className="flex flex-col gap-2 px-3">
                  <span className="text-xs text-[#94A3B8] font-semibold uppercase">
                    Filter Nodes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {filters.map((filter) => (
                      <button
                        key={filter.type}
                        onClick={() => handleFilterToggle(filter.type)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                          filterTypes.includes(filter.type)
                            ? 'bg-[#7C3AED]/20 border-[#7C3AED] text-white'
                            : 'bg-[#1C1C2E] border-[#2A2A45] text-[#94A3B8]'
                        }`}
                      >
                        {filter.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Share Button */}
                <button
                  onClick={() => {
                    handleShare();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#1C1C2E] border border-[#2A2A45] hover:border-[#7C3AED] text-sm text-white py-2 rounded-lg flex items-center justify-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>Share Workspace</span>
                </button>
              </div>
            )}

            {!isEditorPage && (
              <Link
                to="/editor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#7C3AED] hover:bg-[#A855F7] text-white text-center text-sm font-semibold py-2.5 rounded-lg transition-colors mt-2"
              >
                Open Editor
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Header;
