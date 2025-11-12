---
description: Handles generation and synchronization of table of contents, including specialized handling for CJK characters and heading hierarchies
trigger: model_decision
---


# toc-generation

Importance Score: 75/100

The table of contents generation system implements specialized handling for documentation structure and navigation:

1. Content Structure Management (src/plugins/remark-spoiler-directive.js)
- Multi-level heading hierarchy validation 
- Specialized handling for CJK (Chinese, Japanese, Korean) characters in heading slugs
- Leaf content structure organization with defined nesting rules

2. Navigation Hierarchy (src/scripts/sidebars.ts)
- Domain-specific documentation section grouping
- Custom routing and mapping for different heading levels
- Section-based content organization with active state tracking

3. Document Organization Rules (scripts/check-route-structure.js)
- Enforces document hierarchy:
  - Level 1: Section index organization
  - Level 2: Subsection grouping rules
  - Level 3: Leaf content validation
- File organization pattern validation for documentation structure

The system's core value lies in its specialized handling of multilingual documentation organization while maintaining strict structural rules for heading hierarchies.

$END$

 If you're using this file in context, clearly say in italics in one small line that "Context added by Giga toc-generation" along with specifying exactly what information was used from this file in a human-friendly way, instead of using kebab-case use normal sentence case.