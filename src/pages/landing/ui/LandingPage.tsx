import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/widgets/header/ui/Header';
import { Footer } from '@/widgets/footer/ui/Footer';

export const LandingPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const steps = [
    {
      num: '1',
      title: 'Write Code',
      desc: 'Type modern JavaScript, TypeScript, or JSX in our high-performance editor.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m10 10-2 2 2 2"/><path d="m14 14 2-2-2-2"/><path d="m6 16 1-8 1 8"/>
        </svg>
      ),
    },
    {
      num: '2',
      title: 'Parser Builds Tree',
      desc: '@babel/parser processes the code client-side, outputting pure AST nodes in milliseconds.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
    {
      num: '3',
      title: 'Graph Morphs Live',
      desc: 'Dagre layouts the structure, and Framer Motion smooth-morphs node positions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/>
          <path d="m9 17 2-2 1-1"/><path d="m15 17-2-2-1-1"/><path d="M12 8v4"/>
        </svg>
      ),
    },
  ];

  const useCases = [
    {
      title: 'Learn ASTs Visually',
      desc: 'Perfect for students and teachers of computer science. No more raw JSON headaches; see compiler theory brought to life.',
    },
    {
      title: 'Debug Babel Plugins',
      desc: 'Simulate transformation outcomes instantly. Map changes between source ranges and target compiler nodes in real time.',
    },
    {
      title: 'Understand ESLint Rules',
      desc: 'See node visitors, declarations, expressions, and structures so you can write custom lint regulations faster.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A12] flex flex-col text-[#F1F5F9] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1C1C2E_1px,transparent_1px),linear-gradient(to_bottom,#1C1C2E_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35" />

      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 max-w-7xl mx-auto relative z-10 w-full text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center max-w-3xl"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#2A2A45] bg-[#12121F] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-xs text-[#94A3B8] font-medium tracking-wide">Client-Side AST Studio</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            See Your Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#06B6D4]">Think.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#94A3B8] mb-10 max-w-2xl leading-relaxed"
          >
            Type modern JS, TS, or React JSX. Watch the abstract syntax tree morph in real time with interactive node physics.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mb-16">
            <Link
              to="/editor"
              className="bg-[#7C3AED] hover:bg-[#A855F7] text-white text-base font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-[#7C3AED]/20 hover:shadow-[#A855F7]/30 transition-all transform hover:-translate-y-0.5"
            >
              Try It Free
            </Link>
            <Link
              to="/examples"
              className="bg-[#12121F] hover:bg-[#1C1C2E] border border-[#2A2A45] hover:border-[#94A3B8] text-white text-base font-semibold px-8 py-3.5 rounded-lg transition-all"
            >
              View Examples
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Mockup (Representation of Editor) */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 50 }}
          className="w-full max-w-5xl aspect-[16/9] border border-[#2A2A45] rounded-xl bg-[#12121F] shadow-2xl overflow-hidden relative group"
        >
          <div className="h-9 border-b border-[#2A2A45] bg-[#0A0A12] px-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80" />
            <span className="text-[11px] text-[#94A3B8] ml-2 font-mono">synapse-editor.ts</span>
          </div>
          <div className="flex h-[calc(100%-36px)] divide-x divide-[#2A2A45]">
            {/* L Pane */}
            <div className="w-1/2 p-4 text-left font-mono text-xs text-[#E2E8F0] space-y-2 select-none opacity-85 bg-[#0D0D1A]">
              <div><span className="text-[#7C3AED] font-bold">function</span> <span className="text-[#06B6D4]">parse</span>(code) {'{'}</div>
              <div className="pl-4 text-[#94A3B8]">// Debounced client-side compilation</div>
              <div className="pl-4"><span className="text-[#7C3AED] font-bold">const</span> ast = parser.<span className="text-[#06B6D4]">parse</span>(code);</div>
              <div className="pl-4"><span className="text-[#7C3AED] font-bold">return</span> ast;</div>
              <div>{'}'}</div>
            </div>
            {/* R Pane */}
            <div className="w-1/2 bg-[#0A0A12] relative p-6 flex flex-col justify-center items-center">
              <div className="flex flex-col gap-6 relative">
                {/* Visual Tree */}
                <div className="px-4 py-2 border border-[#7C3AED] bg-[#1C1C2E] rounded-md text-xs font-bold text-center border-t-4 border-t-[#7C3AED] shadow-lg shadow-[#7C3AED]/10">
                  FunctionDeclaration
                </div>
                <div className="w-0.5 h-6 bg-[#06B6D4] self-center" />
                <div className="flex gap-4">
                  <div className="px-4 py-2 border border-[#06B6D4] bg-[#1C1C2E] rounded-md text-xs font-bold border-t-4 border-t-[#06B6D4]">
                    Identifier (name: parse)
                  </div>
                  <div className="px-4 py-2 border border-[#F59E0B] bg-[#1C1C2E] rounded-md text-xs font-bold border-t-4 border-t-[#F59E0B]">
                    BlockStatement
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <section className="py-24 w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">How It Works</h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto">Three simple steps translate your raw characters into physics-driven graphics.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={step.num}
                className="bg-[#12121F] border border-[#2A2A45] p-8 rounded-xl text-left relative flex flex-col gap-4 group hover:border-[#7C3AED] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-[#1C1C2E] rounded-lg group-hover:bg-[#7C3AED]/10 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-extrabold text-[#2A2A45] group-hover:text-[#7C3AED]/20 transition-colors">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-2">{step.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-12 w-full border-t border-[#2A2A45]/30">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">Built For Every Workflow</h2>
            <p className="text-[#94A3B8] max-w-xl mx-auto">Whether learning, creating tools, or upgrading your portfolio.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((uc) => (
              <div
                key={uc.title}
                className="bg-[#1C1C2E]/30 border border-[#2A2A45]/50 hover:border-[#7C3AED] p-8 rounded-xl text-left flex flex-col gap-3 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold text-white">{uc.title}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default LandingPage;
