/**
 * Official Portfolio Data for ABHINAV K M
 * Extracted directly from Resume CV
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "ABHINAV K M",
    title: "Data Analyst",
    email: "kmabhinav25@gmail.com",
    phone: "+91 9207302577",
    location: "Malappuram, Kerala, India",
    linkedin: "https://linkedin.com/in/abhinav-k-m",
    github: "https://github.com",
    tagline: "Transforming raw data into actionable business insights.",
    bio: "Motivated BCA graduate and Data Analyst with a strong foundation in Excel, SQL, Python, Pandas, NumPy, Power BI, and data visualization. Skilled in data cleaning, exploratory data analysis, dashboard creation, and extracting meaningful insights from datasets. Possess strong analytical and problem-solving skills with a keen interest in transforming data into actionable business insights.",
    stats: [
      { label: "Education", value: "BCA Graduate" },
      { label: "Core Stack", value: "SQL & Python" },
      { label: "BI & Reporting", value: "Power BI" },
      { label: "Spreadsheets", value: "Advanced Excel" }
    ]
  },

  caseStudies: [
    {
      id: "academic-department-assistance-system",
      title: "Academic Department Assistance System (Next Gen Grading)",
      category: "Data Automation & Analytics System",
      tools: ["Python", "MySQL", "Advanced Excel", "Power Query"],
      summary: "Developed an automated system that processes internal assessment marks from Excel spreadsheets and database attendance records to generate student progress reports.",
      problem: "Educational departments faced time-consuming manual workflows when aggregating student assessment scores, calculating grade benchmarks, tracking attendance rates, and generating progress cards.",
      methodology: [
        "Built automated data cleaning and ingestion pipelines in Python to process internal mark sheets from Excel.",
        "Structured MySQL relational database tables with optimized JOINs and aggregate queries to track student attendance and performance.",
        "Implemented role-based access control portals for Admin, Staff, Student, and Parent accounts.",
        "Integrated an academic assistance chatbot providing real-time performance analytics and personalized improvement tips."
      ],
      codeSnippet: `-- MySQL: Student Academic Performance & Attendance Summary Query
SELECT 
  s.student_id,
  s.student_name,
  ROUND(AVG(m.marks_obtained), 2) AS avg_marks,
  ROUND((SUM(att.attended_days) / SUM(att.total_days)) * 100, 1) AS attendance_percentage,
  CASE 
    WHEN AVG(m.marks_obtained) >= 85 THEN 'A Grade'
    WHEN AVG(m.marks_obtained) >= 70 THEN 'B Grade'
    WHEN AVG(m.marks_obtained) >= 50 THEN 'C Grade'
    ELSE 'Needs Improvement'
  END AS academic_rating
FROM students s
JOIN internal_marks m ON s.student_id = m.student_id
JOIN attendance_records att ON s.student_id = att.student_id
GROUP BY s.student_id, s.student_name
ORDER BY avg_marks DESC;`,
      impact: [
        { label: "Workflow Automation", value: "100%" },
        { label: "User Access Portals", value: "4 Roles" },
        { label: "Report Accuracy", value: "High" }
      ]
    },
    {
      id: "eda-powerbi-sales-analytics",
      title: "Exploratory Data Analysis & Power BI Dashboarding",
      category: "Exploratory Data Analysis & BI",
      tools: ["Power BI", "DAX", "Advanced Excel", "MySQL"],
      summary: "Performed thorough data cleaning and EDA on transactional datasets, building interactive Power BI dashboards with dynamic filtering and DAX metrics.",
      problem: "Raw unstructured business data lacked clear visibility into monthly sales trends, key performance indicators (KPIs), and customer buying patterns.",
      methodology: [
        "Cleaned, transformed, and merged raw data tables using Power Query in Excel & Power BI.",
        "Applied Exploratory Data Analysis (EDA) in Python (Pandas, Seaborn) to uncover trend anomalies and distributions.",
        "Constructed dynamic Power BI dashboards featuring custom DAX calculations, interactive slicers, and trend visualizers."
      ],
      codeSnippet: `// DAX Measure: Total Revenue & Growth YoY
Total Revenue = SUM('SalesData'[Amount])

Sales YoY Growth % = 
VAR CurrentRevenue = [Total Revenue]
VAR PreviousRevenue = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR('Calendar'[Date]))
RETURN
DIVIDE(CurrentRevenue - PreviousRevenue, PreviousRevenue, 0)`,
      impact: [
        { label: "Data Transformed", value: "Cleaned & Processed" },
        { label: "Visual Dashboards", value: "Power BI" },
        { label: "DAX Measures", value: "Custom Calculated" }
      ]
    }
  ],

  skills: [
    { name: "Microsoft Excel", category: "tools", level: "Advanced", desc: "Advanced Excel, VLOOKUP, XLOOKUP, INDEX-MATCH, Pivot Tables, Charts, Conditional Formatting, Power Query, DAX" },
    { name: "SQL & Database Querying", category: "db", level: "Proficient", desc: "MySQL, Joins, Subqueries, CTEs, Window Functions, Aggregate Functions, Data Filtering & Cleaning" },
    { name: "Python & Libraries", category: "python", level: "Proficient", desc: "Python Fundamentals, Functions, OOP, File Handling, Exception Handling, Pandas, NumPy, Matplotlib, Seaborn, Plotly" },
    { name: "Power BI & Visualization", category: "bi", level: "Proficient", desc: "Data Cleaning, Data Modeling, DAX, Interactive Dashboards, Data Visualization, Excel Charts" },
    { name: "Data Analysis & Transformation", category: "stats", level: "Proficient", desc: "Data Cleaning, Data Transformation, Exploratory Data Analysis (EDA), Trend Analysis, KPI Analysis" }
  ],

  education: [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "SAFI Institute of Advanced Study (Autonomous) — Affiliated to Calicut University",
      period: "08/2023 – 03/2026",
      location: "Malappuram, Kerala"
    }
  ],

  experience: [
    {
      role: "Data Analyst Trainee",
      company: "Techno Dot Academy of R&D&I",
      period: "06/2026 – Present",
      location: "Malappuram, Kerala",
      highlights: [
        "Participating in intensive hands-on data analysis training focusing on SQL, Python, Excel, and Power BI.",
        "Performing data cleaning, transformation, and exploratory data analysis (EDA) on datasets to derive actionable insights.",
        "Designing interactive dashboards, writing DAX measures, and extracting key business KPIs."
      ]
    }
  ],

  certifications: [
    { title: "Data Analytics Using AI", issuer: "Professional Certificate", year: "2026" }
  ]
};
