# Contributing to SynapseAST

Welcome! We are excited that you want to contribute to SynapseAST. Please follow these guidelines to keep the project clean, secure, and maintainable.

## Onboarding Guidelines

1. **Clone the repository:**
   ```bash
   git clone https://github.com/logusivam/SynapseAST.git
   cd SynapseAST
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run local dev server:**
   ```bash
   npm run dev
   ```

## Development Workflow

- **Branching Policy:** Always create a descriptive branch off of `develop` (e.g. `feature/xxx` or `bugfix/xxx`).
- **Commit Messages:** We follow Conventional Commits format (e.g. `feat(parser): add TSX support` or `fix(ui): responsive margins`).
- **Pull Requests:** Ensure all pre-commit hooks pass, code compiles without warnings (`npx tsc --noEmit`), and tests pass (`npm run test`).
