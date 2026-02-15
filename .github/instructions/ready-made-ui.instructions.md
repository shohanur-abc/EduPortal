---
applyTo: 'src/components/ready-made-ui/**/*.tsx'
---
এখানে এমন কিছু reusable components বানাবে যেটা শুধু input হিসাবে data via props নিবে আর output হিসেবে readymade pre-built ui দিবে। যেমন: Eyebrow, Title, Subtitle, Description, Carousel, ProductCard ইত্যাদি। cva ব্যবহার করে variant define করো। Boolean variants ব্যবহার করলে API concise ও readable থাকবে।

এখানে অবশ্য কিছু গুরুত্বপূর্ণ wrapper component বানাবে যেমন: Section যেটা প্রতিটা section এর children কে wrapped করে রাখবে।