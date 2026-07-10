export function getNodeColor(type: string): string {
  if (type.endsWith('Declaration') || type.endsWith('Pattern') || type === 'ClassBody') {
    return '#7C3AED'; // Purple
  }
  if (type.endsWith('Expression') || type.endsWith('Member')) {
    return '#06B6D4'; // Cyan
  }
  if (type.endsWith('Statement') || type === 'SwitchCase' || type === 'CatchClause') {
    return '#F59E0B'; // Amber
  }
  if (type.endsWith('Literal')) {
    return '#10B981'; // Green
  }
  if (type === 'Identifier') {
    return '#94A3B8'; // Slate/Muted
  }
  if (type === 'File' || type === 'Program') {
    return '#EF4444'; // Red
  }
  return '#94A3B8'; // Default
}
