import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/widgets/header/ui/Header';
import { Footer } from '@/widgets/footer/ui/Footer';

export const LandingPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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
      desc: 'React Flow displays the interactive tree with spring physics, updating in real time.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/>
          <path d="M5 16v-3a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3"/><path d="M12 8v8"/>
        </svg>
      ),
    },
  ];

  const useCases = [
    {
      title: 'Learn ASTs Visually',
      desc: 'Perfect for computer science students and developers seeking to master compiler principles and parser theory through direct interaction.',
    },
    {
      title: 'Debug Babel Plugins',
      desc: 'Inspect exact structures and nodes side-by-side to understand translation logic and easily build custom compilation plugins.',
    },
    {
      title: 'Understand ESLint Rules',
      desc: 'Trace ESTree node types and property values inside visual nodes to facilitate writing custom syntax-checking rules.',
    },
  ];

  const faqItems = [
    {
      q: 'What is an Abstract Syntax Tree (AST) in compiler design?',
      a: 'An Abstract Syntax Tree (AST) is a hierarchical tree representation of the structural syntax of source code written in a programming language. In compiler design, linters (ESLint), and transpilers (Babel), the AST acts as an intermediate structure that makes analyzing, translating, and transforming code easy for machines.',
    },
    {
      q: 'How does SynapseAST visualize JavaScript and TypeScript code?',
      a: 'SynapseAST uses a client-side parser (@babel/parser) to analyze your JS, TS, or JSX code, transforming it into an ESTree-compliant JSON AST. It then maps this structure onto a coordinate system using a specialized layout engine (Dagre) and renders it as an interactive, animated node graph using React Flow and Framer Motion.',
    },
    {
      q: 'What makes SynapseAST different from traditional AST Explorers?',
      a: 'Traditional tools output static, read-only JSON text trees. SynapseAST is an interactive visual simulator. It morphs, splits, merges, and animates tree nodes in real time using spring physics as you type, and supports bidirectional highlight syncing between the node canvas and the Monaco code editor.',
    },
    {
      q: 'Does SynapseAST send my source code to any backend servers?',
      a: 'No. SynapseAST is built as a client-side-only Single Page Application (SPA). All AST parsing, coordinate layout, and rendering happen inside your browser using JavaScript. Your source code never leaves your local machine, ensuring absolute security and zero data leaks.',
    },
    {
      q: 'Can SynapseAST help me write custom ESLint rules or Babel plugins?',
      a: 'Yes. Writing ESLint rules or Babel transforms requires you to mentally trace AST node relationships (e.g., CallExpression, Identifier, VariableDeclarator). SynapseAST shows you exactly how these nodes are structured and highlights node properties on hover, eliminating the trial-and-error of custom rule development.',
    },
    {
      q: 'How does SynapseAST achieve real-time, low-latency visual updates?',
      a: 'We achieve sub-16ms update cycles by combining an optimized client-side parse phase, an 80ms keystroke debounce, a lightweight layout calculation, and Zustand\'s selector-based state subscriptions. This prevents full React tree re-renders and keeps the typing experience lag-free.',
    },
    {
      q: 'Is TypeScript syntax supported out of the box?',
      a: 'Yes. The @babel/parser configuration includes TypeScript and JSX plugins. You can parse modern TypeScript interfaces, generics, type annotations, and TSX files, and see their corresponding TS-specific AST nodes visualised.',
    },
    {
      q: 'How does the bidirectional synchronization work?',
      a: 'Clicking a node in the graph triggers a lookup in the AST range map, which instructs the Monaco Editor to highlight the exact character positions of that syntax construct. Conversely, moving your cursor in Monaco updates the active node state, highlighting the corresponding node on the graph canvas.',
    },
    {
      q: 'Can I filter out specific AST nodes or collapse tree branches?',
      a: 'Yes. Large codebases produce deep ASTs. SynapseAST lets you collapse parent nodes (like a whole Class body or Function body) by clicking them. You can also use the filter dropdown to hide low-level leaf nodes like Identifier or Literal to reduce visual noise.',
    },
    {
      q: 'How can I share or export my AST graph designs?',
      a: 'You can export your visual tree layouts as high-resolution PNG images. You can also share your exact editor state by clicking "Share," which generates a unique shareable URL containing your code compressed in a Base64 hash.',
    },
    {
      q: 'Which AST specification does SynapseAST follow?',
      a: 'SynapseAST parses JS/TS code into AST nodes that conform strictly to the ESTree standard format. This is the same standard format used by ESLint, Babel, Prettier, and SWC, ensuring your learnings translate directly to mainstream development tools.',
    },
    {
      q: 'Is SynapseAST free to use?',
      a: 'Yes. SynapseAST is completely free, open-source, and runs entirely in-browser. It is designed to be an accessible learning aid for computer science students, compiler enthusiasts, and seasoned developers alike.',
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

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 mb-16">
            <Link
              to="/editor"
              className="w-full sm:w-auto text-center bg-[#7C3AED] hover:bg-[#A855F7] text-white text-base font-bold px-8 py-3.5 rounded-lg shadow-lg shadow-[#7C3AED]/20 hover:shadow-[#A855F7]/30 transition-all transform hover:-translate-y-0.5"
            >
              Try It Free
            </Link>
            <Link
              to="/examples"
              className="w-full sm:w-auto text-center bg-[#12121F] hover:bg-[#1C1C2E] border border-[#2A2A45] hover:border-[#94A3B8] text-white text-base font-semibold px-8 py-3.5 rounded-lg transition-all"
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
          className="w-full max-w-5xl aspect-auto md:aspect-[16/9] min-h-[360px] md:min-h-0 border border-[#2A2A45] rounded-xl bg-[#12121F] shadow-2xl overflow-hidden relative group"
        >
          <div className="h-9 border-b border-[#2A2A45] bg-[#0A0A12] px-4 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
            <span className="w-3 h-3 rounded-full bg-[#10B981]/80" />
            <span className="text-[11px] text-[#94A3B8] ml-2 font-mono">synapse-editor.ts</span>
          </div>
          <div className="flex flex-col md:flex-row h-auto md:h-[calc(100%-36px)] divide-y md:divide-y-0 md:divide-x divide-[#2A2A45]">
            {/* L Pane */}
            <div className="w-full md:w-1/2 p-4 text-left font-mono text-xs text-[#E2E8F0] space-y-2 select-none opacity-85 bg-[#0D0D1A]">
              <div><span className="text-[#7C3AED] font-bold">function</span> <span className="text-[#06B6D4]">parse</span>(code) {'{'}</div>
              <div className="pl-4 text-[#94A3B8]">// Debounced client-side compilation</div>
              <div className="pl-4"><span className="text-[#7C3AED] font-bold">const</span> ast = parser.<span className="text-[#06B6D4]">parse</span>(code);</div>
              <div className="pl-4"><span className="text-[#7C3AED] font-bold">return</span> ast;</div>
              <div>{'}'}</div>
            </div>
            {/* R Pane */}
            <div className="w-full md:w-1/2 bg-[#0A0A12] relative p-6 flex flex-col justify-center items-center min-h-[200px] md:min-h-0">
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

        {/* FAQ Section */}
        <section className="py-16 w-full border-t border-[#2A2A45]/30 text-left">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Frequently Asked Questions &mdash; Demystifying Abstract Syntax Trees (ASTs)
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto text-sm leading-relaxed">
              Learn how SynapseAST visualizes compiler theory, parses JavaScript/TypeScript, and helps you write better Babel plugins and ESLint rules.
            </p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {faqItems.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-[#12121F] border border-[#2A2A45] hover:border-[#7C3AED]/60 rounded-xl overflow-hidden transition-all duration-300 shadow-xl"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left text-white font-semibold text-sm sm:text-base hover:bg-[#1C1C2E]/40 outline-none select-none transition-colors"
                  >
                    <span>{faq.q}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`text-[#7C3AED] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-[#2A2A45]/30 text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
export default LandingPage;
