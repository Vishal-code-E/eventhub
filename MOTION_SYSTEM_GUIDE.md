# Motion System - Developer Guide

## Overview

Event Hub uses a **performance-aware motion system** that adapts based on:
- User's system preference (`prefers-reduced-motion`)
- Device capabilities (mobile vs desktop)
- Component complexity (heavy 3D vs simple transitions)

---

## Core Utilities

### Import Statement
```tsx
import { useReducedMotion, useIsMobile } from '@/lib/motion';
```

### Hooks

#### `useReducedMotion()`
Detects if user has enabled "Reduce Motion" in system settings.

```tsx
const prefersReducedMotion = useReducedMotion();

// Returns: boolean (true if motion should be reduced)
```

#### `useIsMobile()`
Detects if viewport width is below 768px.

```tsx
const isMobile = useIsMobile();

// Returns: boolean (true on mobile devices)
```

---

## Usage Patterns

### Pattern 1: Conditional Framer Motion

```tsx
import { motion } from 'framer-motion';
import { useReducedMotion, useIsMobile } from '@/lib/motion';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  const shouldAnimate = !prefersReducedMotion && !isMobile;

  return (
    <motion.div
      whileHover={shouldAnimate ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  );
}
```

### Pattern 2: Conditional Component Rendering

```tsx
import dynamic from 'next/dynamic';
import { useReducedMotion, useIsMobile } from '@/lib/motion';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <Skeleton />
});

function Page() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  const shouldShowHeavyComponent = !prefersReducedMotion && !isMobile;

  return (
    <div>
      {shouldShowHeavyComponent ? (
        <HeavyComponent />
      ) : (
        <StaticFallback />
      )}
    </div>
  );
}
```

### Pattern 3: Adaptive Animation Values

```tsx
import { useReducedMotion, useIsMobile } from '@/lib/motion';

function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  
  // Adaptive values
  const tiltAmount = prefersReducedMotion || isMobile ? 0 : 15;
  const scaleAmount = prefersReducedMotion || isMobile ? 1 : 1.1;
  const duration = prefersReducedMotion ? 0 : isMobile ? 0.2 : 0.4;

  return (
    <motion.div
      whileHover={{ 
        rotate: tiltAmount,
        scale: scaleAmount 
      }}
      transition={{ duration }}
    >
      Card Content
    </motion.div>
  );
}
```

---

## Dynamic Imports for Heavy Components

### When to Use
Use dynamic imports for components that:
- Use Three.js or 3D rendering
- Have continuous animations (requestAnimationFrame)
- Use Canvas API extensively
- Import large libraries

### Template

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false, // Disable server-side rendering
  loading: () => (
    // Show while loading
    <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
  )
});

export default function Page() {
  return <HeavyComponent />;
}
```

---

## Motion Design Principles

### 1. **Purpose Over Decoration**
Every animation should serve a purpose:
- ✅ Provide feedback (button press)
- ✅ Direct attention (new notification)
- ✅ Show relationships (dropdown expansion)
- ❌ Just look cool

### 2. **Respect User Preferences**
Always check `useReducedMotion()` for:
- Complex animations
- Continuous motion
- Parallax effects
- 3D transformations

### 3. **Mobile Performance**
On mobile devices:
- Reduce animation complexity
- Shorten durations (0.4s → 0.2s)
- Disable heavy effects entirely
- Prefer CSS over JavaScript animations

### 4. **Progressive Enhancement**
```
1. Static content (works for everyone)
2. Simple transitions (CSS only)
3. Enhanced animations (Framer Motion)
4. Complex effects (3D, Canvas) - desktop only
```

---

## Animation Performance Checklist

### ✅ Good Practices
- Animate `transform` and `opacity` only
- Use `will-change` for animated properties
- Disable complex animations on mobile
- Respect `prefers-reduced-motion`
- Use dynamic imports for heavy components

### ❌ Avoid
- Animating `width`, `height`, `top`, `left`
- Continuous animations on mobile
- Complex transforms on low-end devices
- Ignoring user preferences
- Blocking the main thread

---

## Easing Curves

### Custom Easing
```tsx
// Smooth, natural ease
transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}

// Bouncy (use sparingly)
transition={{ type: "spring", stiffness: 200, damping: 15 }}

// Instant (reduced motion)
transition={{ duration: 0 }}
```

### Common Easing Values
```tsx
const easings = {
  smooth: [0.22, 1, 0.36, 1],      // Default for most animations
  snappy: [0.4, 0, 0.2, 1],        // Quick, decisive
  gentle: [0.25, 0.1, 0.25, 1],    // Soft, gradual
  bounce: { type: "spring" },       // Playful (buttons, badges)
};
```

---

## Accessibility Compliance

### WCAG 2.1 Guidelines

**Success Criterion 2.3.3** - "Animation from Interactions"
- ✅ All motion animations can be disabled
- ✅ Check `prefers-reduced-motion` before animating
- ✅ Essential motion only when reduced motion is preferred

### Testing

```tsx
// Test with system preference
// macOS: System Preferences → Accessibility → Display → Reduce motion
// Windows: Settings → Ease of Access → Display → Show animations

const prefersReducedMotion = useReducedMotion();
console.log('Reduced motion:', prefersReducedMotion);
```

---

## Examples in Codebase

### Event Card
[components/eventcard.tsx](../components/eventcard.tsx)
- Hover lift animation
- Poster scale effect
- Overlay fade
- All disabled on mobile/reduced-motion

### Event Detail
[app/events/id/EventDetailClient.tsx](../app/events/id/EventDetailClient.tsx)
- Parallax poster scroll
- Staggered entrance animations
- Conditional based on motion preference

### Hero
[components/hero.tsx](../components/hero.tsx)
- Dynamic import of 3D component
- Static fallback on mobile
- Respects reduced motion

---

## Quick Reference

| Scenario | Hook | Action |
|----------|------|--------|
| User prefers reduced motion | `useReducedMotion()` | Disable animations |
| Mobile device | `useIsMobile()` | Simplify animations |
| Heavy 3D component | Both hooks | Conditionally render |
| Simple transition | N/A | Always render, short duration |
| Continuous animation | Both hooks | Disable on mobile |

---

## Decision Tree

```
Should I animate this?
├─ Is it essential to understanding?
│  ├─ Yes → Animate with reduced motion fallback
│  └─ No → Check device capabilities
│     ├─ Desktop + motion OK → Full animation
│     ├─ Mobile → Simplified or no animation
│     └─ Reduced motion → No animation
```

---

## Support

For questions or issues with the motion system:
1. Check this guide
2. Review existing component examples
3. Test with system preferences enabled
4. Profile performance with Chrome DevTools

**Remember:** Less is more. Intentional motion beats flashy effects.
