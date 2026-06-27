/**
 * cro-principles.ts — the framework bridge for the headless pipeline.
 *
 * WHY THIS EXISTS:
 * The interactive `cro-expert` Claude Code skill (CXL CRO curriculum) is only
 * available to a human-driven Claude session. The teardown pipeline runs as
 * unattended `tsx` scripts that call the Anthropic API directly — they cannot
 * invoke a skill. This file is the distilled CXL/CRO + positioning knowledge in
 * a form those scripts can `import` and paste into their system prompts, so the
 * analysis is grounded in NAMED frameworks instead of the model's generic CRO
 * intuition. This is what upgrades pipeline output from "V1" (narrates the diff)
 * to "V2" (names the mechanism, scores it, says what it cost + the fix).
 *
 * Source frameworks: CXL CRO (7 Levels of Conversion, Awareness ladder,
 * VoC, LPO tactics) + category design + positioning ladder.
 *
 * Keep this COMPACT — it is injected into every strategic-shift and lesson-card
 * prompt, so token cost compounds. Add frameworks only if they change the output.
 */

export const CRO_PRINCIPLES = `
─── CRO FRAMEWORKS — ground every interpretation in one of these ───────────────

Do NOT invent CRO opinions. When you explain WHY a change matters or what it
COST, anchor it to one of these named frameworks. Name the framework in plain
language; never use it as jargon.

1. AWARENESS LADDER (Eugene Schwartz). A headline targets one rung:
   Unaware → Problem-aware → Solution-aware → Product-aware → Most-aware.
   • Feature/category-name headlines speak to Solution/Product-aware buyers (narrow, specific).
   • Generic outcome headlines ("turn data into action") drift toward Unaware (broad, low-relevance).
   • A move UP the ladder = wider audience, LESS specificity. Name the trade-off.

2. 7 LEVELS OF CONVERSION (CXL heuristic). Read a page on these:
   Relevance · Trust · Orientation · Stimulance · Security · Convenience · Confirmation.
   • Relevance = can the visitor tell in 5 seconds why THIS product, not a competitor?
   • Orientation = does the page argue one story, or just list sections?
   The LOWEST level is the highest-ROI fix. Cite the level by name when scoring.

3. CATEGORY LADDER / POSITIONING. feature → benefit → category.
   • feature = "what it is" (most defensible, narrowest).
   • benefit = "what you get" (wider, less unique).
   • category = "what space we own" (widest TAM, weakest differentiation, must out-compete incumbents).
   Each rung trades a defensible WEDGE for reach. If a company buries its moat
   (the thing competitors cannot copy) below the fold to claim a broader category,
   NAME that cost — it is the single most common repositioning mistake.

4. VOICE OF CUSTOMER (VoC). The fix for a buried wedge is not "retreat to the niche."
   It is: confirm with VoC data that buyers aren't choosing you FOR the narrow thing,
   then lead with the wedge in the H1 and let category breadth follow in the sub-head.

5. SPECIFICITY BEATS GENERALITY (LPO). Named numbers, named buyers, named outcomes
   convert better than abstract claims. A claim every competitor could also make
   ("AI-powered", "real-time insights", "unified platform") is a parity claim, not a wedge.

6. ONE PRIMARY ACTION. A page should have one visually dominant CTA. Two equal CTAs
   (e.g. "Request a demo" + "Explore plans") with no hierarchy split intent —
   for an enterprise/sales-led ICP the demo should dominate; self-serve is secondary.

USE: pick the ONE framework the evidence most supports. State the finding, name
the framework in plain words, state what the move bought AND what it cost. Never
list all six. Never name a framework you cannot tie to a specific quote/number.
`.trim();
