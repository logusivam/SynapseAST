import { parse } from '@babel/parser';

export interface ParseResult {
  ast: any | null;
  error: string | null;
  errorLine?: number;
  errorColumn?: number;
  timeMs: number;
}

export function parseSourceCode(code: string, language: 'javascript' | 'typescript' | 'jsx'): ParseResult {
  const startTime = performance.now();
  const plugins: any[] = [];

  if (language === 'typescript') {
    plugins.push('typescript');
  } else if (language === 'jsx') {
    plugins.push('jsx');
  } else {
    // javascript support jsx by default or both
    plugins.push('jsx');
  }

  try {
    const ast = parse(code, {
      sourceType: 'module',
      plugins: plugins,
      tokens: false,
    });

    const endTime = performance.now();
    return {
      ast,
      error: null,
      timeMs: Math.round((endTime - startTime) * 100) / 100,
    };
  } catch (err: any) {
    const endTime = performance.now();
    return {
      ast: null,
      error: err.message || 'Parsing error',
      errorLine: err.loc ? err.loc.line : undefined,
      errorColumn: err.loc ? err.loc.column : undefined,
      timeMs: Math.round((endTime - startTime) * 100) / 100,
    };
  }
}
