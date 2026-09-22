/**
 * Omar Ibrahim - Verified Certificates & Credentials Dataset
 * To add a new certificate, simply add a new object to this array.
 */

var CERTIFICATES_DATA = [
  {
    id: "nti-pentest-appsec",
    title: "Penetration Testing & Application Security",
    issuer: "NTI - Cybersecurity Superhero Academy (Undergraduate Level)",
    issuerBadge: "nti-badge",
    date: "Aug 2026",
    desc: "Completed the NTI Cybersecurity Superhero Academy specialization in Penetration Testing & Application Security, covering 60 technical hours and 12 freelance hours, delivered in partnership with Silicon 21.",
    tag: {"60 Technical Hrs": true, "12 Freelance Hrs": true},
    fileUrl: "certs/NTI.pdf",
    highlight: true
},{
    id: "ibm-cybersecurity-analyst",
    title: "Cybersecurity Analyst Professional Certificate (14 courses)",
    issuer: "IBM",
    issuerBadge: "ibm-badge",
    date: "Jan 2026",
    desc: "14-course comprehensive specialization covering threat intelligence, SIEM tools, network defense, incident response, and compliance frameworks.",
    tag: "14 Courses",
    fileUrl: "certs/ibm-analyst.pdf",
    highlight: true
  },
  {
    id: "ibm-ethical-hacking",
    title: "Ethical Hacking with OpenVAS & Metasploit",
    issuer: "IBM",
    issuerBadge: "ibm-badge",
    date: "Jan 2026",
    desc: "Advanced vulnerability assessment scanning, NVT policy creation, CVE mapping, and hands-on exploitation using Metasploit Framework.",
    tag: "Offensive Security",
    fileUrl: "certs/ibm-ceh.pdf",
    highlight: true
  },
  {
    id: "educba-embedded-c",
    title: "Embedded Systems using C",
    issuer: "EDUCBA",
    issuerBadge: "educba-badge",
    date: "Jan 2026",
    desc: "Low-level embedded C development, memory-mapped I/O, timer interrupts, ADC, and hardware register manipulation.",
    tag: "Embedded C",
    fileUrl: "certs/edu-c.pdf",
    highlight: false
  },
  {
    id: "oracle-java",
    title: "Java Fundamentals",
    issuer: "Oracle",
    issuerBadge: "oracle-badge",
    date: "Dec 2024",
    desc: "Foundational exploration of Java programming, covering object-oriented principles, data types, control structures, and core syntax.",
    tag: "Java",
    fileUrl: "certs/Java-Oracle.pdf",
    highlight: false
  },
  {
    id: "oracle-sql",
    title: "Database Programming with SQL",
    issuer: "Oracle",
    issuerBadge: "oracle-badge",
    date: "Dec 2024",
    desc: "Relational database architecture, complex multi-table joins, subqueries, indexing, constraints, and secure transaction handling.",
    tag: "SQL & RDBMS",
    fileUrl: "certs/DB-oracle.pdf",
    highlight: false
  },
  {
    id: "umich-exploring-c",
    title: "Exploring C Programming",
    issuer: "University of Michigan",
    issuerBadge: "umich-badge",
    date: "Apr 2025",
    desc: "Pointers, dynamic memory allocation, custom data structures, modular compilation, and memory leak mitigation.",
    tag: "C Systems",
    fileUrl: "certs/C-Michigan-Univercity.pdf",
    highlight: false
  },
  {
    id: "google-ai-productivity",
    title: "Boost Your Productivity with AI",
    issuer: "Google",
    issuerBadge: "google-badge",
    date: "Aug 2024",
    desc: "Leveraging generative AI workflows, automated prompt engineering, and intelligent scripting for security analysis.",
    tag: "AI Workflows",
    fileUrl: "certs/Google-AI.pdf",
    highlight: false
  },
  {
    id: "google-fundamental-of-marketing",
    title: "Fundamentals of Digital Marketing",
    issuer: "Google",
    issuerBadge: "google-badge",
    date: "Aug 2024",
    desc: "Practical foundation in digital marketing principles including SEO, content strategy, paid advertising, and analytics.",
    tag: "Marketing",
    fileUrl: "certs/Google-marketing.pdf",
    highlight: false
  },
  {
    id: "ms-ai-concepts",
    title: "Introduction to AI / AI Concepts",
    issuer: "Microsoft",
    issuerBadge: "ms-badge",
    date: "Jun 2024",
    desc: "Fundamentals of Artificial Intelligence, neural networks, machine learning principles, and computational ethics.",
    tag: "AI Fundamentals",
    fileUrl: "certs/Microsoft-IndroDuction-to-AI.pdf",
    highlight: false
  },
  {
    id: "prompt engineering",
    title: "Prompt Engineering",
    issuer: "Microsoft",
    issuerBadge: "ms-badge",
    date: "Jun 2024",
    desc: "Comprehensive exploration of prompt design, few-shot and chain-of-thought techniques, and optimization strategies for reliable LLM outputs.",
    tag: "Prompt Engineering",
    fileUrl: "certs/Microsoft-pmt.pdf",
    highlight: false
  },
  {
    id: "programiz-c",
    title: "C Programming Certification",
    issuer: "Programiz",
    issuerBadge: "prog-badge",
    date: "Dec 2024",
    desc: "Comprehensive evaluation of foundational C language constructs, algorithm design, control flow, and data manipulation.",
    tag: "C Core",
    fileUrl: "certs/C-programming.pdf",
    highlight: false
  },
  {
    id: "codealpha-python-internship",
    title: "Python Programming Internship",
    issuer: "CodeAlpha",
    issuerBadge: "codealpha-badge",
    date: "Nov 2025",
    desc: "Hands-on virtual internship applying Python programming skills to real-world tasks and projects over a one-month period.",
    tag: "Python",
    fileUrl: "certs/CodeAlpha-python.pdf",
    highlight: false
  },

];

if (typeof window !== 'undefined') {
  window.CERTIFICATES_DATA = CERTIFICATES_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CERTIFICATES_DATA };
}
