import { PageHeader } from '@/components/layout/PageHeader'
import { EmptyState } from './EmptyState'

// Temporary page body used until each feature page is built.
export function PlaceholderPage({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <EmptyState title="Coming next" description="This page is scaffolded and routed but not built yet." />
    </>
  )
}
