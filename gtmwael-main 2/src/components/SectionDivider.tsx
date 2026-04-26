interface SectionDividerProps {
  variant?: 'line' | 'space' | 'glow' | 'curve-to-light' | 'curve-to-dark';
}

const SectionDivider = ({ variant = 'line' }: SectionDividerProps) => {
  if (variant === 'space') {
    return <div className="h-6 md:h-10" />;
  }

  if (variant === 'glow') {
    return <div className="h-0" />;
  }

  if (variant === 'curve-to-light') {
    return <div className="h-0" />;
  }

  if (variant === 'curve-to-dark') {
    return <div className="h-0" />;
  }

  return (
    <div className="flex items-center justify-center py-4 md:py-6">
      <div className="w-16 h-px bg-border/50" />
    </div>
  );
};

export default SectionDivider;
