---
agent: agent
---
প্রয়োজনীয় mcp server configure করো। বিশেষ করে vercel এবার nextjs16 তে mcp server নিয়ে এসেছে যেটার মাধ্যমে runtime-এ প্রতিটি route-এ কী ঘটছে তা ai agent inspect করতে পারবে। তারপর অবশ্যই init tool call execute করো। এটি MCP context setup করে এবং app state introspection enable করে।
নিশ্চিত করবে সব mcp server ঠিকমতো কাজ করছে।

সব কম্পোনেন্ট ডিফল্টভাবে **Server Component** হবে। যদি কোনো নির্দিষ্ট অংশে interactivity (যেমন state, event handler ইত্যাদি) দরকার হয়, তাহলে সেই অংশটিকে আলাদা ফাইলে রেখে **Client Component** হিসেবে তৈরি করে import করবে। এতে ছোট একটি interactivity-এর জন্য পুরো ফাইলকে Client Component বানাতে হবে না, ফলে performance এবং bundle size ভালো থাকবে।


Development workflow-এ Todo Tree extension ব্যবহার করো, যাতে task tracking structured ও visible থাকে।

শুরু করার আগে 
Nextjs16, tailwindcss^v4, React19 এ কি কি পরিবর্তন এসেছে সেগুলো পড় from websites। কি কি নতুন feature এসেছে।

follow #file:../instructions/
task: #file:../../care.yml 
fix errors, by typecheck and by nextjs's .mcp.json
then build then deploy to vercel via cli

some important resources:
- https://tailwindcss.com/docs/responsive-design#basic-example
- https://github.com/vercel/next-devtools-mcp
