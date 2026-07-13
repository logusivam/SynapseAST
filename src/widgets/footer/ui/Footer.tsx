import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'contact' | 'privacy' | 'terms' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const startYear = 2026;
  const currentYear = new Date().getFullYear();
  const copyrightText =
    currentYear > startYear
      ? `© ${startYear} - ${currentYear} SynapseAST. All rights reserved.`
      : `© ${startYear} SynapseAST. All rights reserved.`;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.length > 50) {
      newErrors.name = 'Name must be 50 characters or less';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!message.trim()) {
      newErrors.message = 'Message is required';
    } else if (message.length > 500) {
      newErrors.message = 'Message must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        setIsSubmitted(false);
        setActiveModal(null);
        alert('Thank you! Your message has been sent.');
      }, 1000);
    }
  };

  return (
    <footer className="border-t border-[#2A2A45] py-8 bg-[#0A0A12] relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#94A3B8] mb-6">
        {/* Brand Metadata */}
        <div className="flex items-center gap-3">
          <img src="/assets/footer-logo.svg" alt="Logusivam Vision Logo" className="w-8 h-8" />
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[11px] text-[#94A3B8]">Built by Loganathan G P</span>
            <span className="font-bold text-white tracking-wide text-sm">Logusivam Vision</span>
          </div>
        </div>

        {/* Links & Contact */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button
            onClick={() => setActiveModal('privacy')}
            className="hover:text-white transition-colors cursor-pointer text-xs md:text-sm"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setActiveModal('terms')}
            className="hover:text-white transition-colors cursor-pointer text-xs md:text-sm"
          >
            Terms of Service
          </button>
          <button
            onClick={() => setActiveModal('contact')}
            className="text-[#7C3AED] hover:text-[#A855F7] font-semibold transition-colors cursor-pointer text-xs md:text-sm"
          >
            Contact Us
          </button>

          <div className="flex items-center gap-3 border-l border-[#2A2A45] pl-6 ml-2">
            <a
              href="https://www.linkedin.com/in/loganathan26"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#7C3AED] transition-colors"
              title="Developer's LinkedIn Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://github.com/logusivam/SynapseAST"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] hover:text-[#7C3AED] transition-colors"
              title="Project GitHub Repository"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-[#94A3B8] border-t border-[#2A2A45]/30 pt-4 max-w-7xl mx-auto px-6">
        {copyrightText}
      </div>

      {/* Privacy Policy Popover Modal */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#12121F] border border-[#2A2A45] w-full max-w-lg rounded-xl p-6 shadow-2xl relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="flex items-center justify-between border-b border-[#2A2A45] pb-3">
              <h3 className="text-lg font-bold text-white">Privacy Policy</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-[#94A3B8] hover:text-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-[#94A3B8] flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              <p className="text-white font-semibold">1. Client-Side Only Parsing</p>
              <p>
                SynapseAST is designed as a browser-only, zero-backend studio. Every keystroke is
                parsed locally inside your browser using @babel/parser. Your source code never
                leaves your computer and is never sent to any server.
              </p>
              <p className="text-white font-semibold">2. Local Storage & Sharing</p>
              <p>
                When you use the "Share" feature, your code is encoded in Base64 and appended to the
                URL hash. This configuration is stored exclusively in your browser history and is
                only shared when you explicitly copy and send the link to others.
              </p>
              <p className="text-white font-semibold">3. Third-party Libraries</p>
              <p>
                We bundle standard packages (like Monaco Editor and React Flow) locally. No external
                analytics, tracking pixels, or cookie monitors are integrated.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="bg-[#7C3AED] hover:bg-[#A855F7] text-white text-sm font-bold py-2 rounded-lg mt-2 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms of Service Popover Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#12121F] border border-[#2A2A45] w-full max-w-lg rounded-xl p-6 shadow-2xl relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="flex items-center justify-between border-b border-[#2A2A45] pb-3">
              <h3 className="text-lg font-bold text-white">Terms of Service</h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-[#94A3B8] hover:text-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="text-sm text-[#94A3B8] flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
              <p className="text-white font-semibold">1. License</p>
              <p>
                SynapseAST is licensed under the MIT License. You are free to copy, modify,
                distribute, and execute the code for personal or commercial projects.
              </p>
              <p className="text-white font-semibold">2. Disclaimer of Warranties</p>
              <p>
                The software is provided "as is", without warranty of any kind, express or implied,
                including but not limited to the warranties of merchantability, fitness for a
                particular purpose, and noninfringement.
              </p>
              <p className="text-white font-semibold">3. Use Guidelines</p>
              <p>
                You agree not to use SynapseAST to generate or compile malicious scripts. This tool
                is designed strictly for compilation analysis, educational visuals, and dev tooling.
              </p>
            </div>
            <button
              onClick={() => setActiveModal(null)}
              className="bg-[#7C3AED] hover:bg-[#A855F7] text-white text-sm font-bold py-2 rounded-lg mt-2 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Contact Popover Modal */}
      {activeModal === 'contact' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#12121F] border border-[#2A2A45] w-full max-w-md rounded-xl p-6 shadow-2xl relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150 text-left">
            <div className="flex items-center justify-between border-b border-[#2A2A45] pb-3">
              <h3 className="text-lg font-bold text-white">Contact Us</h3>
              <button
                onClick={() => {
                  setActiveModal(null);
                  setErrors({});
                }}
                className="text-[#94A3B8] hover:text-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#94A3B8]">Name</label>
                  <span className="text-[10px] text-[#94A3B8]">{name.length}/50</span>
                </div>
                <input
                  type="text"
                  maxLength={50}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full bg-[#1C1C2E] border ${errors.name ? 'border-[#EF4444]' : 'border-[#2A2A45]'} focus:border-[#06B6D4] text-white px-3 py-2 rounded-lg outline-none text-sm`}
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-[10px] text-[#EF4444]">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#94A3B8]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-[#1C1C2E] border ${errors.email ? 'border-[#EF4444]' : 'border-[#2A2A45]'} focus:border-[#06B6D4] text-white px-3 py-2 rounded-lg outline-none text-sm`}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="text-[10px] text-[#EF4444]">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[#94A3B8]">Message</label>
                  <span className="text-[10px] text-[#94A3B8]">{message.length}/500</span>
                </div>
                <textarea
                  maxLength={500}
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full bg-[#1C1C2E] border ${errors.message ? 'border-[#EF4444]' : 'border-[#2A2A45]'} focus:border-[#06B6D4] text-white px-3 py-2 rounded-lg outline-none text-sm resize-none`}
                  placeholder="Your message details..."
                />
                {errors.message && (
                  <span className="text-[10px] text-[#EF4444]">{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-[#7C3AED] hover:bg-[#A855F7] text-white text-sm font-bold py-2.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50 mt-2"
              >
                {isSubmitted ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </footer>
  );
};
export default Footer;
