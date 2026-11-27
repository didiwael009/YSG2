# Passage des pages à la nouvelle charte

Demande de Wael (27 nov. 2026) : réduire jour après jour les landing pages à dominance noire et les remplacer par la nouvelle charte, progressivement, les pages internes d'abord, puis le blog. Précision le même jour : toutes les pages sont noires, sauf l'accueil et les articles de blog.

Référence : `/content-automation` (`src/pages/ContentAutomation.tsx`). Briques partagées : `src/components/creative2/style.ts` et `kit.tsx`.

Mesure du 27 nov. sur la production (part de pixels sombres, page entière, 1280 px). La charte garde des sections encre : Content Automation est à 60 %.

## File (ordre proposé par Claude)

| Lot | Pages | Noir avant | État |
|---|---|---|---|
| 1 | `/pricing` | 78 % | fait le 27 nov. (37 %), mis en ligne |
| 2 | `/book`, page 404 | 98 %, 100 % | à faire |
| 3 | `/case-studies`, puis zembra, pubrella, shipzzer, screenplay (`case-study/GrowthCaseStudyPage`) | 84 à 95 % | à faire |
| 4 | études de cas write-your-book, growapp, bottlenexus, ic-center | 76 à 97 % | à faire |
| 5 | `/services/cold-email`, `/services/meta-ads`, `/services/landing-page`, `/creative/community-management` | 60 à 96 % | à faire |
| 6 | saas-marketing-agency, cold-email-for-saas, landing-page-for-saas, conversion-rate-optimisation-specialist, meta-ads-for-saas | 54 à 92 % | à faire |
| 7 | optimize-saas-landing-page, google-ads-vs-meta-ads-saas, saas-cold-email-strategy, landing-page-for-lead-generation, linkedin-outreach-for-saas | 56 à 71 % | à faire |
| 8 | `/resume` | 95 % | à faire |
| 9 | `/cro-teardowns` et le haut des 24 teardowns (`cro-teardown/TeardownHero`) | 43 %, haut à 81 à 90 % | à faire |
| 10 | blog : haut sombre de certains articles | page entière 8 à 45 % | après les pages internes |

Déjà claires ou déjà dans la charte : accueil, `/creative`, `/agency`, `/content-automation`, `/saas-marketing-plan`, `/b2b-saas-marketing-strategy`, `/blog`.
