import React, { useState } from 'react';

export const Footer: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  // Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
      // Mock submit action
      setIsSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setErrors({});
        setIsSubmitted(false);
        setIsContactOpen(false);
        alert('Thank you! Your message has been sent.');
      }, 1000);
    }
  };

  return (
    <footer className="border-t border-[#2A2A45] py-8 bg-[#0A0A12] relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#94A3B8]">
        {/* Brand Metadata */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-bold text-white tracking-wide">logusivam vision</span>
          <span className="text-xs text-[#94A3B8]">Built by Loganathan G P</span>
        </div>

        {/* Links & Contact */}
        <div className="flex flex-wrap justify-center gap-6">
          <button 
            onClick={() => alert('Privacy Policy: All parsed code remains client-side and is never sent to any server.')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => alert('Terms of Service: This product is licensed under the MIT License.')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <button 
            onClick={() => setIsContactOpen(true)}
            className="text-[#7C3AED] hover:text-[#A855F7] font-semibold transition-colors cursor-pointer"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* Contact Popover Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div 
            className="bg-[#12121F] border border-[#2A2A45] w-full max-w-md rounded-xl p-6 shadow-2xl relative flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#2A2A45] pb-3">
              <h3 className="text-lg font-bold text-white">Contact Us</h3>
              <button 
                onClick={() => {
                  setIsContactOpen(false);
                  setErrors({});
                }}
                className="text-[#94A3B8] hover:text-white cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
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

              {/* Email */}
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

              {/* Message */}
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
                {errors.message && <span className="text-[10px] text-[#EF4444]">{errors.message}</span>}
              </div>

              {/* Submit */}
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
