'use client';

import { Calendar } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

interface EventsEmptyStateProps {
  title?: string;
  description?: string;
  action?: {
    label: string;
    href: string;
  };
}

export function EventsEmptyState({
  title = "No Events Yet",
  description = "Exciting events are coming soon! Check back later to discover amazing experiences on campus.",
  action = { label: "Go to Dashboard", href: "/student/dashboard" }
}: EventsEmptyStateProps) {
  return (
    <EmptyState
      icon={Calendar}
      title={title}
      description={description}
      action={action}
    />
  );
}
