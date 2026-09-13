"use client";

import Link from "next/link";
import {
  Activity,
  Bot,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Eye,
  Filter,
  RefreshCw,
  Search,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const runs = [
  {
    id: "RUN-92841",
    task: "Campaign Generation",
    business: "Beyond Stories",
    model: "Generation",
    status: "Completed",
    duration: "2.4s",
    tokens: "2,841",
    time: "2 min ago",
  },
  {
    id: "RUN-92840",
    task: "Content Optimization",
    business: "Nova Retail",
    model: "Optimization",
    status: "Completed",
    duration: "1.8s",
    tokens: "1,942",
    time: "4 min ago",
  },
  {
    id: "RUN-92839",
    task: "Audience Analysis",
    business: "Growth Labs",
    model: "Strategy",
    status: "Completed",
    duration: "3.1s",
    tokens: "3,184",
    time: "7 min ago",
  },
  {
    id: "RUN-92838",
    task: "Post Generation",
    business: "Urban Goods",
    model: "Generation",
    status: "Running",
    duration: "1.2s",
    tokens: "1,428",
    time: "9 min ago",
  },
  {
    id: "RUN-92837",
    task: "Brand Analysis",
    business: "Pixel House",
    model: "Analysis",
    status: "Failed",
    duration: "4.8s",
    tokens: "3,824",
    time: "12 min ago",
  },
  {
    id: "RUN-92836",
    task: "Content Generation",
    business: "Nova Retail",
    model: "Generation",
    status: "Completed",
    duration: "2.2s",
    tokens: "2,416",
    time: "14 min ago",
  },
];

export default function AdminAIRunsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredRuns = runs.filter((run) => {
    const matchesSearch =
      run.id.toLowerCase().includes(search.toLowerCase()) ||
      run.task.toLowerCase().includes(search.toLowerCase()) ||
      run.business.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = status === "All" || run.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/admin">Admin</Link>
              <span>/</span>
              <Link href="/admin/ai">AI</Link>
              <span>/</span>
              <span>Runs</span>
            </div>

            <h1 className="text-2xl font-semibold sm:text-3xl">AI Runs</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Inspect individual AI agent executions.
            </p>
          </div>

          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        <div className="rounded-xl border border-dashed border-border bg-muted/30 p-4 text-sm">
          AI run data is currently mocked and will be connected to the backend
          during API integration.
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Total Runs</p>
            <p className="mt-2 text-2xl font-semibold">96,284</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Successful</p>
            <p className="mt-2 text-2xl font-semibold">94,165</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted-foreground">Failed</p>
            <p className="mt-2 text-2xl font-semibold">1,728</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search run ID, task or business..."
              className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="relative">
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-10 min-w-[150px] appearance-none rounded-lg border border-border bg-background px-3 pr-9 text-sm outline-none"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Running</option>
              <option>Failed</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          </div>

          <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        <section className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs text-muted-foreground">
                  <th className="px-5 py-3 font-medium">Run</th>
                  <th className="px-5 py-3 font-medium">Task</th>
                  <th className="px-5 py-3 font-medium">Business</th>
                  <th className="px-5 py-3 font-medium">Model</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Duration</th>
                  <th className="px-5 py-3 font-medium">Tokens</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium"></th>
                </tr>
              </thead>

              <tbody>
                {filteredRuns.map((run) => (
                  <tr
                    key={run.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-4 font-medium">{run.id}</td>
                    <td className="px-5 py-4">{run.task}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {run.business}
                    </td>
                    <td className="px-5 py-4">{run.model}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={run.status} />
                    </td>
                    <td className="px-5 py-4">{run.duration}</td>
                    <td className="px-5 py-4">{run.tokens}</td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {run.time}
                    </td>
                    <td className="px-5 py-4">
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-border md:hidden">
            {filteredRuns.map((run) => (
              <div key={run.id} className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{run.task}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {run.id} · {run.business}
                    </p>
                  </div>

                  <StatusBadge status={run.status} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <p className="text-muted-foreground">Model</p>
                    <p className="mt-1 font-medium">{run.model}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="mt-1 font-medium">{run.duration}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Tokens</p>
                    <p className="mt-1 font-medium">{run.tokens}</p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="mt-1 font-medium">{run.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
        <CheckCircle2 className="h-3 w-3" />
        Completed
      </span>
    );
  }

  if (status === "Failed") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
        <XCircle className="h-3 w-3" />
        Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
      <Activity className="h-3 w-3" />
      Running
    </span>
  );
}
