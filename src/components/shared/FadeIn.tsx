import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export interface FadeInProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  viewportMargin?: string;
  amount?: number | 'some' | 'all';
  once?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.6,
  className = '',
  viewportMargin = '0px 0px -40px 0px',
  amount = 0.15,
  once = true,
  ...props
}: FadeInProps) {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount, margin: viewportMargin }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function FadeInStagger({
  children,
  className = '',
  faster = false,
  ...props
}: HTMLMotionProps<'div'> & { children: React.ReactNode; className?: string; faster?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -40px 0px' }}
      transition={{ staggerChildren: faster ? 0.08 : 0.15 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
