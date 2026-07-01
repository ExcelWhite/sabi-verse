SabiVerse — Project Documentation & Deliverables
Version: 0.1 (Phase 1 / MVP scope) Prepared for: Development team Purpose: Define what we are building first, why, and exactly what "done" looks like for the competition submission.
1. What SabiVerse Is
SabiVerse is a media and information platform, built by Africans for Africans, that explains engineering, science, and resource projects happening across the African continent — in African voice, language, and cultural framing — and makes factual project information publicly searchable.
It has two linked parts:
Content arm — video explainers (YouTube/TikTok/broadcast-style) about specific projects, technologies, and resources, produced with local cultural nuance rather than imported Western science-explainer formats.
Information platform — a searchable database of real engineering/resource projects (objectives, milestones, technologies, resources involved, status), queryable by anyone, that links directly to the relevant content explaining each project.
The long-term vision is continental in scope. This document defines only Phase 1 — the working proof of concept we are submitting to the competition.
2. Why This Exists (Problem Statement)
Communities near engineering and resource projects (mines, plants, solar farms, etc.) in Africa often have little accessible, trustworthy information about what is actually happening on those projects, why, and what it means for them.
This information gap breeds misinformation, fear, and mistrust — and it works against community relations and social license for engineering projects.
Existing science communication efforts in Africa are mostly text/blog-based or training-focused; there is no dedicated, queryable, project-specific information platform tied to produced video content.
SabiVerse closes this gap by pairing structured factual data with culturally-fluent storytelling, so a community member can both look up facts and understand them.
3. Phase 1 Scope (What We Are Building Now)
Phase 1 is a single working vertical slice — one real or realistic project, taken all the way through the pipeline — not a feature-complete platform. The goal is to prove the mechanism works, not to cover many projects yet.
In scope for Phase 1
[ ] One (1) case study project selected, with real or realistically-modeled data
[ ] Structured data entry for that project (see Data Model, Section 5)
[ ] One (1) produced explainer video about that project, hosted and linked to its data entry
[ ] A simple query interface where a user can ask about the project in plain language and receive an answer pulled from the structured data, with a link to the related video
[ ] Basic web front-end displaying the project profile (no account system needed yet)
Explicitly out of scope for Phase 1 (future phases)
Multi-project, multi-region database
Trained/custom AI model (Phase 1 query layer can be simple keyword/structured lookup — does not need to be a real LLM yet)
User accounts, comments, community submission tools
Data partnerships/integrations with companies or government agencies
Web app
Multi-language support
Symbolic infrastructure / monument component (separate workstream, not part of this platform build)
4. Core User Flow (Phase 1)
User lands on the project profile page (or searches/asks a question).
User can either:
Browse the project profile directly (objectives, milestones, resources, status), or
Type a plain-language question (e.g., "What is happening with the [Project Name] project right now?")
System returns:
A direct factual answer pulled from structured data
A link/embed to the relevant explainer video
User can watch the video in-platform or be directed to YouTube/TikTok.
User question
     │
     ▼
Query handler (keyword match against structured fields)
     │
     ▼
Return: matched data fields + linked video(s)
     │
     ▼
Display: project profile page + embedded video
