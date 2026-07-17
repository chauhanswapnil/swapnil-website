---
title: "The AI Codebase"
date: "2026-07-18"
description: "AI makes it easier than ever to add code quickly. But I keep wondering what happens when nobody truly understands what has been added."
slug: "the-ai-codebase"
featured: true
tags: []
excerpt: "AI makes it easier than ever to add code quickly. But I keep wondering what happens when nobody truly understands what has been added."
---

# The AI Codebase

---

I have been using AI coding tools a lot recently, and they are genuinely useful. They help explain unfamiliar code, get you unstuck and make it much easier to build things quickly. Look at this diff from a PR I merged into one of my personal projects. Not my proudest moment as a software engineer...

![Recent PR I merged in a personal project](recent-pr-merged.png "Recent PR I merged in a personal project")

I keep wondering what happens when we keep adding thousands of lines of code that nobody has really thought through. The tests are green, the pull request gets merged and everything seems fine, until a few months later when something breaks and nobody can explain why that code exists. At some point, the only thing that understands the codebase well enough to work on it might be another LLM.

I have started countless projects with AI and built things out surprisingly quickly. But one thing I have realised is that I do not really enjoy reading code that I have not written, especially when the codebase becomes large so quickly. I end up feeling less attached to the project and, because of that, I find it much easier to abandon it instead of making the small changes and improvements I had originally wanted to make.

I also do not think the current pricing will last forever. Newer models are getting better, but they need more context and token usage keeps going up. Even if tokens get cheaper, we might just end up using a lot more of them. We are already starting to see companies trying to rein in their AI budgets which seems to have gotten out of control.[^1][^2][^3]

Well, for now these tools are incredibly cheap for what they can do and everyone should use them in some capacity, and when we hit a limit, [Tibo (@thsottiaux)](https://x.com/thsottiaux) just resets it for us again. But I would not build a company around the idea that unlimited AI labour will always be this cheap. AI should help us understand and simplify code, not just produce more of it.

[^1]: [Yahoo Finance coverage of Uber's Anthropic AI push](https://finance.yahoo.com/sectors/technology/articles/ubers-anthropic-ai-push-hits-223109852.html)
[^2]: [TechCrunch: Meta's Adam Mosseri says AI token budgets could soon be capped per engineer](https://techcrunch.com/2026/07/14/metas-adam-mosseri-says-ai-token-budgets-could-soon-be-capped-per-engineer/)
[^3]: [Forbes: Running Out of AI Tokens Faster Than Ever? Here's Why](https://www.forbes.com/sites/ronschmelzer/2026/04/10/running-out-of-ai-tokens-faster-than-ever-heres-why/)
