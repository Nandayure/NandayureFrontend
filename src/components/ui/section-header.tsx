import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground text-sm max-w-2xl">
            {description}
          </p>
        )}
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};
