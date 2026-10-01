// src/types/domain.ts
// Single source of truth for the API contract between the UI and the backend.
// Every interface maps to one endpoint in the request sent to the backend team.

/* ───────────── Enums ───────────── */

export type ObjectType =
  | 'local_table'
  | 'replication_flow'
  | 'dimension_view'
  | 'fact_view'
  | 'union_fact_view'
  | 'analytic_model';

export type ObjectStatus = 'deployed' | 'ready' | 'blocked' | 'waiting' | 'failed';

// 'deployed' is an assumption (fully deployed model) — confirm with backend
export type ModelStatus = 'blocked' | 'ready' | 'partially_deployed' | 'deployed';

// UNCONFIRMED: dashboard_mock.json's top_blockers only showed 2 reasons
// (missing_primary_key, unresolved_dimension_association) using different id strings
// than this enum. Kept all 4 here for the Readiness queue / Fix panel, which may still
// use them — ask backend to confirm the final reason list and exact string values.
export type BlockerReason =
  | 'missing_pk'
  | 'waiting_dependency'
  | 'name_collision'
  | 'deploy_failure';

// Renamed 'replication_flow' -> 'relational_dataset_view' to match dashboard_mock.json.
// UNCONFIRMED: ask backend whether this is a rename of the same step or a different one —
// if it's a rename, this same key must also be used later in the Building Objects step list.
export type LayerKey =
  | 'local_table'
  | 'relational_dataset_view'
  | 'dimension_fact_view'
  | 'union_fact_view'
  | 'analytic_model';

export type StepStatus = 'pending' | 'running' | 'done' | 'failed';

/* ───────────── Common ───────────── */

export interface ApiError {
  code: string;
  message: string;
}

/* ───────────── 1. GET /pipeline/summary ─────────────
   Shape confirmed against the backend's dashboard_mock.json (2026-09-30).
   NOTE: their JSON also included app.navigation and header.actions —
   those describe the top nav / Import button and are left OUT of this
   type on purpose: that's UI structure the frontend already owns, not
   data the backend needs to send. Confirm with backend whether the real
   endpoint will omit them too. */

export type CardVariant = 'neutral' | 'success' | 'warning' | 'error';
export type BlockerSeverity = 'high' | 'medium' | 'low'; // 'medium'/'low' not seen in sample — confirm values

export interface LastRun {
  runId: string;
  startedAt: string; // ISO-8601
  finishedAt: string; // ISO-8601
  relativeLabel: string; // e.g. "12 min ago" — backend-computed, do not recompute on frontend
  status: string; // e.g. "completed_with_issues" — confirm full enum with backend
  route: string;
}

export interface DashboardHeader {
  title: string;
  space: { id: string; tenant: string };
  lastRun: LastRun;
  subtitle: string;
}

export interface SummaryCard {
  id: 'total' | 'deployed' | 'blocked' | 'failed';
  label: string;
  value: number;
  variant: CardVariant;
  percentOfTotal?: number;
  link: string; // route to navigate to on click
}

export interface LayerStatus {
  id: LayerKey;
  label: string;
  deployed: number;
  total: number;
  blocked: number;
  failed: number;
  percentComplete: number;
  progressVariant: CardVariant;
  display: string; // e.g. "18 / 18" — backend-formatted, render as-is
  link: string;
}

export interface BlockerSampleObject {
  name: string;
  layer: LayerKey;
}

export interface TopBlockerItem {
  id: string; // e.g. "missing_primary_key" — confirm final enum with backend
  label: string;
  affectedObjectsCount: number;
  display: string; // e.g. "9 objects"
  severity: BlockerSeverity;
  link: string;
  sampleObjects: BlockerSampleObject[];
}

export interface PipelineSummary {
  header: DashboardHeader;
  summaryCards: SummaryCard[];
  statusByLayer: { title: string; layers: LayerStatus[] };
  topBlockers: { title: string; items: TopBlockerItem[] };
}

/* ───────────── 2. POST /imports (multipart zip) ───────────── */

// Folder-based validation, confirmed against ZCP_NUM_V3.zip (2026-09-30):
// zip must contain 4 top-level folders: "Data Sources", "Lineage", "Models", "Objects".
// "Data Sources" and "Lineage" must contain at least one file.
// "Models" and "Objects" must exist as folders; files inside them are optional.
export type RequiredFolder = 'Data Sources' | 'Lineage' | 'Models' | 'Objects';

export interface ImportCheck {
  folder: RequiredFolder;
  present: boolean;
  hasFiles: boolean;
}

export interface ImportValidationResult {
  importId: string;
  fileName: string;
  sizeBytes: number;
  valid: boolean;
  checks: ImportCheck[];
  errors: string[];
}

/* ───────────── 3. POST /imports/{id}/start, GET /builds/{id} ───────────── */

export interface StartImportResponse {
  buildId: string;
}

export interface BuildStep {
  key: LayerKey;
  label: string;
  status: StepStatus;
  done: number;
  total: number;
}

export interface BuildStatus {
  buildId: string;
  status: 'running' | 'complete' | 'failed';
  overallPercent: number; // 0-100
  steps: BuildStep[];
  error?: string;
  resumable: boolean; // true when the run stopped mid-sequence (no rollback)
}

/* ───────────── 4. GET /models?model=&status=&blocker= ───────────── */

export interface ReadinessObject {
  id: string;
  name: string;
  type: ObjectType;
  status: ObjectStatus;
  blockerReason?: BlockerReason;
  blockerMessage?: string;
}

export interface ReadinessModel {
  id: string;
  name: string;
  status: ModelStatus;
  blockedNote?: string; // e.g. "Blocked at Dimension View: primary key missing"
  objects: ReadinessObject[];
}

export interface ReadinessResponse {
  models: ReadinessModel[];
}

export interface ReadinessFilters {
  model?: string;
  status?: ModelStatus;
  blocker?: BlockerReason;
}

/* ───────────── 5. GET /objects/{id}, GET /objects/{id}/columns ───────────── */

export interface ObjectDetail {
  id: string;
  name: string;
  type: ObjectType;
  status: ObjectStatus;
  blockerReason?: BlockerReason;
  blockerMessage?: string; // plain-language description shown in the Fix panel alert
  deltaConfig?: string;
}

export interface ObjectColumn {
  name: string;
  description: string;
  type: string;
  isPrimaryKey: boolean;
}

/* ───────────── 6. GET /meta/options ───────────── */

export interface SelectOption {
  value: string;
  label: string;
}

export interface FixOptions {
  objectTypes: SelectOption[];
  deltaConfigs: SelectOption[];
}

/* ───────────── 7. PUT /objects/{id}/override ───────────── */

export interface OverrideRequest {
  primaryKeys: string[];
  objectType?: string;
  deltaConfig?: string;
}

export interface OverrideResponse {
  status: ObjectStatus; // status after the re-check (and re-deploy attempt)
  message: string;
}

/* ───────────── 8. GET /models/{id}/flow ───────────── */

export interface FlowNode {
  id: string;
  name: string;
  type: ObjectType;
  status: ObjectStatus;
  isRootCause: boolean;
}

export interface FlowEdge {
  from: string;
  to: string;
}

export interface RootCause {
  objectId: string;
  explanation: string;
}

export interface ModelFlow {
  modelId: string;
  modelName: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  rootCause?: RootCause;
}

/* ───────────── 9. POST /deployments, GET /deployments/{id} ───────────── */

export interface StartDeploymentRequest {
  objectIds: string[];
}

export interface StartDeploymentResponse {
  deploymentId: string;
}

export type DeployItemStatus =
  | 'pending'
  | 'running'
  | 'deployed'
  | 'skipped' // same name + matching attributes
  | 'renamed' // attributes differ -> deployed as versioned copy (e.g. _1)
  | 'waiting' // upstream dependency not deployed yet
  | 'failed';

export interface DeployItem {
  objectId: string;
  name: string;
  type: ObjectType;
  status: DeployItemStatus;
  renamedTo?: string;
  message?: string;
}

export interface DeploymentStatus {
  deploymentId: string;
  status: 'running' | 'complete' | 'failed';
  items: DeployItem[];
  summary: {
    deployed: number;
    skipped: number;
    renamed: number;
    failed: number;
  };
  stoppedAtObjectId?: string; // a CLI failure stops the whole run (no rollback)
}

/* ───────────── 10. GET /runs?from=&to=, GET /runs/{id} ───────────── */

export interface RunSummary {
  id: string;
  startedAt: string; // ISO-8601
  objectCount: number;
  passed: number;
  failed: number;
  correlationId: string;
  partial: boolean; // stopped mid-sequence -> resumable
}

export interface RunResult {
  name: string;
  type: ObjectType;
  status: 'passed' | 'failed' | 'skipped';
  message?: string;
}

export interface RunDetail extends RunSummary {
  results: RunResult[];
  catalogCrossCheck?: {
    matchesCliStatus: boolean;
    notes?: string;
  };
}

export interface RunsFilters {
  from?: string; // YYYY-MM-DD
  to?: string;
}
