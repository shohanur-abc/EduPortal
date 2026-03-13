"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

/**
 * Reusable motion animation presets and utilities
 * Use these across all components for consistent animations
 */

// ============= ANIMATION PRESETS =============
export const ANIMATION_PRESETS = {
    // Entrance animations
    fadeInUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 },
        transition: { duration: 0.6 },
    },
    fadeInDown: {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 30 },
        transition: { duration: 0.6 },
    },
    fadeInLeft: {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
        transition: { duration: 0.6 },
    },
    fadeInRight: {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 30 },
        transition: { duration: 0.6 },
    },
    scaleIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { duration: 0.5 },
    },
    rotateIn: {
        initial: { opacity: 0, rotate: -10 },
        animate: { opacity: 1, rotate: 0 },
        exit: { opacity: 0, rotate: -10 },
        transition: { duration: 0.6 },
    },
} as const;

// ============= MOTION COMPONENTS =============

/**
 * FadeInWhenVisible - Wraps children with fade-in-on-scroll animation
 */
export const FadeInWhenVisible = ({
    children,
    delay = 0,
}: {
    children: ReactNode;
    delay?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * ScaleInWhenVisible - Wraps children with scale-in-on-scroll animation
 */
export const ScaleInWhenVisible = ({
    children,
    delay = 0,
}: {
    children: ReactNode;
    delay?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * RotateInWhenVisible - Wraps children with rotation animation on scroll
 */
export const RotateInWhenVisible = ({
    children,
    delay = 0,
    rotation = 180,
}: {
    children: ReactNode;
    delay?: number;
    rotation?: number;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, rotate: -rotation }}
            whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * SlideInWhenVisible - Wraps children with slide animation on scroll
 */
export const SlideInWhenVisible = ({
    children,
    direction = "up",
    delay = 0,
    distance = 50,
}: {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    distance?: number;
}) => {
    const getInitialValues = () => {
        switch (direction) {
            case "down":
                return { y: -distance };
            case "left":
                return { x: -distance };
            case "right":
                return { x: distance };
            case "up":
            default:
                return { y: distance };
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...getInitialValues() }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay }}
            viewport={{ once: true, amount: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * HoverScale - Scales element on hover
 */
export const HoverScale = ({
    children,
    scale = 1.05,
}: {
    children: ReactNode;
    scale?: number;
}) => {
    return (
        <motion.div
            whileHover={{ scale }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.div>
    );
};

/**
 * StaggerChildren - Animates children with stagger effect
 */
export const StaggerChildren = ({
    children,
    staggerDelay = 0.1,
    delayChildren = 0.2,
}: {
    children: ReactNode;
    staggerDelay?: number;
    delayChildren?: number;
}) => {
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {Array.isArray(children)
                ? children.map((child, index) => (
                    <motion.div key={index} variants={item}>
                        {child}
                    </motion.div>
                ))
                : children}
        </motion.div>
    );
};
