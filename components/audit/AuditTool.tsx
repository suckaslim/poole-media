"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  ArrowRight,
  XCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

type Severity = "critical" | "warning" | "info";

// Shape returned by the SEO agent's demo crawl endpoint (proxied via
// /api/audit/demo), confirmed against the live endpoint:
// { domain, issues: { total, critical, warnings, info, items: [...] } }
type AuditIssue = {
  type: string;
  severity: Severity;
  page_url: string;
  description: string;
  recommendation: string;
  auto_fixable?: boolean;
};

type AuditApiResponse = {
  domain?: string;
  issues?: {
    total: number;
    critical: number;
    warnings: number;
    info: number;
    items: AuditIssue[];
  };
  error?: string;
};

type AuditResult = {
  domain: string;
  auditedAt: Date;
  issues: AuditIssue[];
  score: number;
};

const ISSUE_LABELS: Record<string, string> = {
  missing_meta_description: "Missing Meta Description",
  missing_meta_title: "Missing Meta Title",
  duplicate_meta_title: "Duplicate Meta Title",
  duplicate_meta_description: "Duplicate Meta Description",
  missing_h1: "Missing H1 Tag",
  multiple_h1: "Multiple H1 Tags",
  missing_alt_text: "Images Missing Alt Text",
  broken_internal_link: "Broken Internal Link",
  missing_schema: "No Schema Markup Found",
  thin_content: "Thin Content Detected",
  missing_canonical: "Missing Canonical Tag",
  slow_page_speed: "Slow Page Speed",
};

const SEVERITY_ORDER: Severity[] = ["critical", "warning", "info"];

const SEVERITY_DEDUCTIONS: Record<Severity, number> = {
  critical: 15,
  warning: 7,
  info: 2,
};

const SEVERITY_LABELS: Record<Severity, string> = {
  critical: "Critical",
  warning: "Warning",
  info: "Info",
};

const SEVERITY_STYLES: Record<
  Severity,
  { badge: string; icon: typeof AlertCircle }
> = {
  critical: {
    badge: "border-red-500/30 bg-red-500/10 text-red-400",
    icon: XCircle,
  },
  warning: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    icon: AlertTriangle,
  },
  info: {
    badge: "border-[#6366f1]/30 bg-[#6366f1]/10 text-[#6366f1]",
    icon: Info,
  },
};

const ERROR_MESSAGES: Record<string, string> = {
  invalid_url: "Please enter a valid URL including https://",
  private_url: "Please enter a public website URL",
  timeout: "The audit is taking longer than expected. Please try again.",
  endpoint_error:
    "We couldn't complete the audit. Check the URL and try again.",
  rate_limited:
    "You've run several audits recently. Please wait before trying again.",
  network_error: "Something went wrong. Check your connection and try again.",
};

function calculateScore(issues: AuditIssue[]): number {
  const deductions = issues.reduce(
    (sum, issue) => sum + (SEVERITY_DEDUCTIONS[issue.severity] ?? 0),
    0
  );
  return Math.max(0, 100 - deductions);
}

function scoreLabel(score: number): string {
  if (score >= 90) return "Excellent — your site is well optimized";
  if (score >= 75) return "Good — a few things to fix";
  if (score >= 50) return "Needs work — several issues found";
  return "Critical issues — your site needs attention";
}

function scoreBarColor(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 75) return "bg-[#6366f1]";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}

function formatAuditedAt(date: Date): string {
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${month} ${day} ${year} at ${hours}:${minutes} ${ampm}`;
}

function formatFileDate(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function buildReport(result: AuditResult): string {
  const counts = {
    critical: result.issues.filter((i) => i.severity === "critical").length,
    warning: result.issues.filter((i) => i.severity === "warning").length,
    info: result.issues.filter((i) => i.severity === "info").length,
  };
  const totalTypes = Object.keys(ISSUE_LABELS).length;
  const foundTypes = new Set(result.issues.map((i) => i.type)).size;
  const passed = Math.max(0, totalTypes - foundTypes);

  const lines: string[] = [
    "POOLE MEDIA — FREE SEO AUDIT REPORT",
    "=====================================",
    `Site: ${result.domain}`,
    `Audited: ${formatAuditedAt(result.auditedAt)}`,
    `Overall Score: ${result.score} / 100`,
    "",
    "SUMMARY",
    "-------",
    `Critical issues: ${counts.critical}`,
    `Warnings: ${counts.warning}`,
    `Info: ${counts.info}`,
    `Passed checks: ${passed}`,
    "",
    "ISSUES FOUND",
    "------------",
    "",
  ];

  for (const severity of SEVERITY_ORDER) {
    for (const issue of result.issues.filter((i) => i.severity === severity)) {
      lines.push(
        `[${SEVERITY_LABELS[severity].toUpperCase()}] ${ISSUE_LABELS[issue.type] ?? issue.type}`
      );
      lines.push(`Page: ${issue.page_url}`);
      lines.push(`Description: ${issue.description}`);
      lines.push(`Recommendation: ${issue.recommendation}`);
      lines.push(`Auto-fixable: ${issue.auto_fixable ? "Yes" : "No"}`);
      lines.push("");
    }
  }

  lines.push("---");
  lines.push("Want a full site audit? Visit https://poole.media/contact");
  lines.push("Powered by Poole Media — poole.media");

  return lines.join("\n");
}

export function AuditTool({
  postResultsCtaHeadline,
  postResultsCtaBody,
}: {
  postResultsCtaHeadline: string;
  postResultsCtaBody: string;
}) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<AuditResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();

    if (!/^https?:\/\//i.test(trimmed)) {
      setErrorMsg(ERROR_MESSAGES.invalid_url);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/audit/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });

      const data: AuditApiResponse = await res.json().catch(() => ({}));

      if (!res.ok || data.error) {
        const key = data.error ?? "endpoint_error";
        setErrorMsg(ERROR_MESSAGES[key] ?? ERROR_MESSAGES.endpoint_error);
        setStatus("error");
        return;
      }

      const issues = data.issues?.items ?? [];
      const domain = data.domain ?? new URL(trimmed).hostname;

      setResult({
        domain,
        auditedAt: new Date(),
        issues,
        score: calculateScore(issues),
      });
      setStatus("success");
    } catch {
      setErrorMsg(ERROR_MESSAGES.network_error);
      setStatus("error");
    }
  }

  function handleDownload() {
    if (!result) return;
    const blob = new Blob([buildReport(result)], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `poole-media-audit-${result.domain}-${formatFileDate(result.auditedAt)}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  const isLoading = status === "loading";

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3"
      >
        <input
          type="url"
          placeholder="https://yoursite.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={isLoading}
          className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.04] px-4 py-3.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1]/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 shrink-0"
        >
          {isLoading ? (
            <>
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              Auditing...
            </>
          ) : (
            "Run Free Audit"
          )}
        </button>
      </form>

      <AnimatePresence>
        {status === "error" && errorMsg && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 overflow-hidden"
          >
            <AlertCircle className="h-4 w-4 shrink-0" />
            {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-3 text-xs text-white/35">
        Results are for the homepage only. For a full site audit across all
        pages, book a{" "}
        <Link
          href="/contact"
          className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
        >
          free consultation
        </Link>
        .
      </p>

      <AnimatePresence>
        {status === "success" && result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <AuditResults
              result={result}
              onDownload={handleDownload}
              postResultsCtaHeadline={postResultsCtaHeadline}
              postResultsCtaBody={postResultsCtaBody}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function AuditResults({
  result,
  onDownload,
  postResultsCtaHeadline,
  postResultsCtaBody,
}: {
  result: AuditResult;
  onDownload: () => void;
  postResultsCtaHeadline: string;
  postResultsCtaBody: string;
}) {
  const counts = {
    critical: result.issues.filter((i) => i.severity === "critical").length,
    warning: result.issues.filter((i) => i.severity === "warning").length,
    info: result.issues.filter((i) => i.severity === "info").length,
  };
  const totalTypes = Object.keys(ISSUE_LABELS).length;
  const foundTypes = new Set(result.issues.map((i) => i.type)).size;
  const passed = Math.max(0, totalTypes - foundTypes);

  return (
    <div className="space-y-8">
      {/* Score header */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-white mb-4">
          Your Score: {result.score} / 100
        </h3>
        <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden mb-3">
          <div
            className={`h-full rounded-full transition-all duration-700 ${scoreBarColor(result.score)}`}
            style={{ width: `${result.score}%` }}
          />
        </div>
        <p className="text-sm text-white/60 mb-5">
          {scoreLabel(result.score)}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 text-xs text-white/40">
          <span>Site audited: {result.domain}</span>
          <span>Audited: {formatAuditedAt(result.auditedAt)}</span>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6 py-4">
        <span className="flex items-center gap-1.5 text-sm text-white/70">
          <XCircle className="h-4 w-4 text-red-400" /> {counts.critical}{" "}
          Critical
        </span>
        <span className="flex items-center gap-1.5 text-sm text-white/70">
          <AlertTriangle className="h-4 w-4 text-amber-400" /> {counts.warning}{" "}
          Warnings
        </span>
        <span className="flex items-center gap-1.5 text-sm text-white/70">
          <Info className="h-4 w-4 text-[#6366f1]" /> {counts.info} Info
        </span>
        <span className="flex items-center gap-1.5 text-sm text-white/70">
          <CheckCircle2 className="h-4 w-4 text-green-400" /> {passed} Passed
        </span>
      </div>

      {/* Issues list */}
      {result.issues.length > 0 && (
        <div className="space-y-4">
          {SEVERITY_ORDER.flatMap((severity) =>
            result.issues
              .filter((issue) => issue.severity === severity)
              .map((issue, i) => (
                <IssueCard key={`${severity}-${i}`} issue={issue} />
              ))
          )}
        </div>
      )}

      {/* Download */}
      <button
        onClick={onDownload}
        className="inline-flex items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white/80 hover:text-white hover:border-white/25 transition-all duration-200"
      >
        <Download className="h-4 w-4" />
        Download Report
      </button>

      {/* Post-results CTA */}
      <div className="rounded-2xl border border-[#6366f1]/25 bg-gradient-to-b from-[#6366f1]/[0.07] to-transparent p-7 md:p-8 text-center">
        <p className="text-white/70 leading-relaxed mb-2">
          {postResultsCtaHeadline}
        </p>
        <p className="text-white/50 leading-relaxed mb-6 max-w-lg mx-auto">
          {postResultsCtaBody}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          Book Your Full Audit — It&apos;s Free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function IssueCard({ issue }: { issue: AuditIssue }) {
  const styles = SEVERITY_STYLES[issue.severity] ?? SEVERITY_STYLES.info;
  const Icon = styles.icon;
  const label = ISSUE_LABELS[issue.type] ?? issue.type;

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest ${styles.badge}`}
        >
          <Icon className="h-3 w-3" />
          {SEVERITY_LABELS[issue.severity]}
        </span>
        <h4 className="text-base font-semibold text-white">{label}</h4>
        {issue.auto_fixable && (
          <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-[11px] font-semibold text-green-400">
            Auto-fixable
          </span>
        )}
      </div>
      <p className="text-xs text-white/40 mb-3 truncate">{issue.page_url}</p>
      <p className="text-sm text-white/60 leading-relaxed mb-2">
        {issue.description}
      </p>
      <p className="text-sm text-white/70 leading-relaxed">
        <span className="font-medium text-white/50">Recommendation: </span>
        {issue.recommendation}
      </p>
    </div>
  );
}
