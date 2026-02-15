/**
 * Centralized route configuration for the application
 * Used to index and manage all routes across navigation components
 */

export const ROUTES = {
    marketing: {
        home: "/",
        about: "/about",
        blog: "/blog",
        caseStudies: "/case-studies",
        comparison: "/comparison",
        contact: "/contact",
        demo: "/demo",
        faq: "/faq",
        features: "/features",
        integrations: "/integrations",
        pricing: "/pricing",
        resources: "/resources",
        securityPrivacy: "/security-privacy",
        testimonials: "/testimonials",
    },

    auth: {
        login: "/auth/login",
        signup: "/auth/signup",
        confirmation: "/auth/confirmation",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
        verifyEmail: "/auth/verify-email",
        mfaSetup: "/auth/mfa-setup",
        mfaVerify: "/auth/mfa-verify",
        sessionTimeout: "/auth/session-timeout",
        unauthorized: "/auth/unauthorized",
    },

    dashboard: {
        home: "/dashboard",
        admin: "/dashboard/admin",

        attendance: {
            root: "/dashboard/attendance",
            mark: "/dashboard/attendance/mark",
            corrections: "/dashboard/attendance/corrections",
            reports: "/dashboard/attendance/reports",
        },

        fees: {
            root: "/dashboard/fees",
            collection: "/dashboard/fees/collection",
            tracking: "/dashboard/fees/tracking",
            statements: "/dashboard/fees/statements",
            structure: "/dashboard/fees/structure",
        },

        notices: {
            root: "/dashboard/notices",
            manage: "/dashboard/notices/manage",
            publish: "/dashboard/notices/publish",
            analytics: "/dashboard/notices/analytics",
        },

        operations: {
            root: "/dashboard/operations",
            calendar: "/dashboard/operations/calendar",
            classes: "/dashboard/operations/classes",
            staff: "/dashboard/operations/staff",
            students: "/dashboard/operations/students",
            settings: "/dashboard/operations/settings",
        },

        results: {
            root: "/dashboard/results",
            enter: "/dashboard/results/enter",
            view: "/dashboard/results/view",
            reportCards: "/dashboard/results/report-cards",
            analytics: "/dashboard/results/analytics",
        },

        reports: {
            root: "/dashboard/reports",
            standard: "/dashboard/reports/standard",
            custom: "/dashboard/reports/custom",
            analytics: "/dashboard/reports/analytics",
        },

        roles: {
            root: "/dashboard/roles",
            manage: "/dashboard/roles/manage",
            permissions: "/dashboard/roles/permissions",
            users: "/dashboard/roles/users",
        },

        users: {
            root: "/dashboard/users",
            credentials: "/dashboard/users/credentials",
            activity: "/dashboard/users/activity",
        },

        parent: "/dashboard/parent",
        principal: "/dashboard/principal",
        student: "/dashboard/student",
        teacher: "/dashboard/teacher",
    },
};


export default ROUTES;
