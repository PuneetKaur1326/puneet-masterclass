import React, { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
interface LegalPageLayoutProps {
  title: string;
  effectiveDate: string;
  subtitle?: ReactNode;
  children: ReactNode;
  toc?: { id: string; title: string }[];
}

export default function LegalPageLayout({ title, effectiveDate, subtitle, children, toc }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Top Bar for Back Button */}
      <div className="w-full border-b border-border/50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-4 flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Workshop
          </Link>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
        {/* Table of Contents (Sticky) */}
        {toc && toc.length > 0 && (
          <aside className="hidden md:block w-64 shrink-0 sticky top-32 max-h-[calc(100vh-8rem)] overflow-y-auto pr-6 custom-scrollbar">
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase mb-6">Table of Contents</h3>
            <nav className="flex flex-col gap-3 border-l-2 border-border/50 pl-4">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200"
                >
                  {item.title}
                </a>
              ))}
            </nav>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="w-full max-w-[760px]">
          <header className="mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
              {title}
            </h1>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
                Effective Date: {effectiveDate}
              </p>
              {subtitle && (
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </header>

          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none 
                          prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-32
                          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border/40
                          prose-p:text-[var(--color-muted-foreground)] prose-p:leading-relaxed prose-p:mb-6
                          prose-li:text-[var(--color-muted-foreground)] prose-li:marker:text-[var(--color-primary)]
                          prose-ul:space-y-2 prose-ul:my-6
                          prose-a:text-[var(--color-primary)] prose-a:font-medium hover:prose-a:opacity-80">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
