import raw from '@/fixtures/dashboard_mock.json'
import type { PipelineSummary } from '@/types/domain'

// PLACEHOLDER: reads the backend-provided dashboard_mock.json fixture.
// Swap to: return http<PipelineSummary>('/pipeline/summary')   (import { http } from './http')
// then delete this mapping function IF the real endpoint already returns camelCase keys —
// confirm key casing with backend before deleting.
export async function getPipelineSummary(): Promise<PipelineSummary> {
  return mapDashboardMock(raw)
}

// Maps the backend's snake_case mock shape to the app's camelCase PipelineSummary type.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDashboardMock(data: any): PipelineSummary {
  return {
    header: {
      title: data.header.title,
      space: data.header.space,
      lastRun: {
        runId: data.header.last_run.run_id,
        startedAt: data.header.last_run.started_at,
        finishedAt: data.header.last_run.finished_at,
        relativeLabel: data.header.last_run.relative_label,
        status: data.header.last_run.status,
        route: data.header.last_run.route,
      },
      subtitle: data.header.subtitle,
    },
    summaryCards: data.summary_cards.map((c: any) => ({
      id: c.id,
      label: c.label,
      value: c.value,
      variant: c.variant,
      percentOfTotal: c.percent_of_total,
      link: c.link,
    })),
    statusByLayer: {
      title: data.status_by_layer.title,
      layers: data.status_by_layer.layers.map((l: any) => ({
        id: l.id,
        label: l.label,
        deployed: l.deployed,
        total: l.total,
        blocked: l.blocked,
        failed: l.failed,
        percentComplete: l.percent_complete,
        progressVariant: l.progress_variant,
        display: l.display,
        link: l.link,
      })),
    },
    topBlockers: {
      title: data.top_blockers.title,
      items: data.top_blockers.items.map((b: any) => ({
        id: b.id,
        label: b.label,
        affectedObjectsCount: b.affected_objects_count,
        display: b.display,
        severity: b.severity,
        link: b.link,
        sampleObjects: b.sample_objects.map((s: any) => ({ name: s.name, layer: s.layer })),
      })),
    },
  }
}
