'use client';

import React from 'react';
import type { OrderStatus } from '@/lib/store';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; bgColor: string; textColor: string; dot: string }
> = {
  pending: {
    label: 'Pending',
    bgColor: '#FEF3C7',
    textColor: '#92400E',
    dot: '#F59E0B',
  },
  pickup_scheduled: {
    label: 'Pickup Scheduled',
    bgColor: '#DBEAFE',
    textColor: '#1E40AF',
    dot: '#3B82F6',
  },
  picked_up: {
    label: 'Picked Up',
    bgColor: '#E0E7FF',
    textColor: '#3730A3',
    dot: '#6366F1',
  },
  in_transit: {
    label: 'In Transit',
    bgColor: '#DBEAFE',
    textColor: '#1D4ED8',
    dot: '#3B82F6',
  },
  delivered: {
    label: 'Delivered',
    bgColor: '#D1FAE5',
    textColor: '#065F46',
    dot: '#10B981',
  },
};

interface Props {
  status: OrderStatus;
  size?: 'sm' | 'md';
}

export default function OrderStatusBadge({ status, size = 'md' }: Props) {
  const config = STATUS_CONFIG[status];
  const padding = size === 'sm' ? '2px 8px' : '4px 12px';
  const fontSize = size === 'sm' ? '11px' : '12px';

  return (
    <span
      className="order-status-badge"
      style={{
        background: config.bgColor,
        color: config.textColor,
        padding,
        fontSize,
        borderRadius: '999px',
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: size === 'sm' ? 6 : 7,
          height: size === 'sm' ? 6 : 7,
          borderRadius: '50%',
          background: config.dot,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {config.label}
    </span>
  );
}
