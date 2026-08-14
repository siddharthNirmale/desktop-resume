# Design & Development Principles

These principles serve as the foundational guidelines for all design, layout, styling, interaction, and code architecture across the codebase.

## Design Philosophy
* **Apple-Inspired Minimalism & Microsoft-Inspired Functional Design**: Clean, intentional, modern, expressive, and highly usable.
* **Design like an artist, code like a professional, think like a product designer, build like an engineer.**
* **Signature Visual Identity**: Premium, distinctive, and intentional — never generic, template-like, or AI-generated in appearance.
* **Clarity & Composition**: Clean, organized, visually balanced, and understandable even under heavy data density. Avoid visual noise, filler padding, or unneeded decoration.

## Core Requirements
* **Light and Dark Modes**: Mandatory support for both themes across all views and components.
* **Responsive Layouts**: Seamless experience across Desktop, Tablet, and Mobile devices.
* **Accent & Color Systems**: Use consistent, intentional accent colors; support customizable or bold/expressive color palettes.
* **Typography**: Expressive typography using 2–3 complementary fonts to build character while maintaining high contrast, legibility, and accessibility.
* **Refined Aesthetics**: Avoid overused generic UI tropes (such as meaningless glassmorphism or generic gradients) unless they serve a distinct functional purpose.

## Layout & UI Principles
* **Intentional Whitespace**: Eliminate wasted space and excessive padding without cluttering.
* **Cohesive Component Architecture**: All UI elements share unified spacing, border radii, iconography, hover/active states, and typography.
* **Calm Information Hierarchy**: Prioritize composition and readability so information feels organized and effortless to parse.

## Code Quality & Architecture
* **Production-Ready & Scalable**: Modular, component-driven architecture without giant monolithic files.
* **Separation of Concerns**: Keep UI components, business logic, static data, and utility functions decoupled.
* **Centralized Design Tokens & Data**: Maintain shared configurations (themes, constants, icons, colors, data mappings) centrally to avoid duplication.
* **Clean & Maintainable**: Readable code with meaningful naming conventions and zero unnecessary complexity or over-engineering.

## Libraries & Stack
* **Tailwind CSS**: Preferred utility-first styling system using centralized design tokens.
* **Motion & Animation**: Use Framer Motion / Motion, GSAP, Lenis, or Three.js to deliver fluid micro-interactions, state transitions, and immersive scroll effects where they enhance the user experience.
* **Icons & UI Primitives**: Standardize iconography with Lucide and React Icons for clean, consistent visuals.

## Final Principle
> **Design like an artist. Code like a professional. Think like a product designer. Build like an engineer.**
