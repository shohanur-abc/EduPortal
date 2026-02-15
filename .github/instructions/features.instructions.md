---
applyTo: 'src/features/**/*.tsx'
---

path: src/features/featureName/

1. components/

* Feature‑scoped reusable UI components
* একই feature‑এর একাধিক section‑এ reuse হবে
* Stateless বা minimal logic
* অবশ্যই Server Competent হবে


2. sections/
* Feature‑এর পূর্ণ UI section compose করবে
* components  + hooks + etc ব্যবহার করবে
* src/app/**/page.tsx এ export হয়ে Props এর মাধ্যমে data নিবে
* সবসময় Server Component হবে কিন্তু server actions/logic থাকবে না

3. actions/

* Server‑only logic
* DB operation, side‑effect, mutation এখানেই
* Zod validation থাকতে পারে
* src/app/**/page.tsx এ export হয়ে server-side fetching এর জন্য ব্যবহার করা হবে।

4. shared/
* Multiple features এ reuse হবে এমন logic


5. other folders (optional):

* hooks/ → feature‑scoped hooks
* validators/ → zod schema
* types/ → feature‑specific types
* utils/ → pure helper functions

Goal:

* UI, Client logic, Server logic strict separation
* Feature isolation
* Predictable, scalable folder convention


