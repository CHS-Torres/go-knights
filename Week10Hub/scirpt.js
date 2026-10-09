'use strict';

const STORAGE_KEY = 'centennial-week10-learning-hub-v1';
const COURSE_STORAGE_PREFIX = `${STORAGE_KEY}-`;
const coursePages = {
  'ap-csa': 'week10APCSA.html',
  'ap-csp': 'week10APCSP.html',
  'ist-csp': 'week10IST.html',
  'game-design': 'week10GD.html'
};
const resources = {
  canvas: ['Canvas', 'https://fultonschools.instructure.com'],
  codehs: ['CodeHS', 'https://codehs.com/'],
  apClassroom: ['AP Classroom', 'https://apclassroom.collegeboard.org/'],
  codingbatJava: ['CodingBat Java', 'https://codingbat.com/java'],
  codingbatPython: ['CodingBat Python', 'https://codingbat.com/python'],
  unity: ['Unity Learn', 'https://learn.unity.com/'],
  bls: ['U.S. Bureau of Labor Statistics', 'https://www.bls.gov/ooh/'],
  onet: ['O*NET OnLine', 'https://www.onetonline.org/'],
  w3schools: ['W3Schools', 'https://www.w3schools.com/'],
  cssTricks: ['CSS-Tricks', 'https://css-tricks.com/'],
  codepen: ['CodePen', 'https://codepen.io/'],
  googleFonts: ['Google Fonts', 'https://fonts.google.com/'],
  coolors: ['Coolors', 'https://coolors.co/'],
  colorHunt: ['Color Hunt', 'https://colorhunt.co/']
};

const routine = [
  'Open Canvas.',
  'Open the Week 10 Learning Hub.',
  'Open the required learning platform.',
  "Complete today's work.",
  'Update your journal.',
  'Submit work if required.'
];

const javaExercises = {
  sleepIn: ['p187868', 'Checks a Boolean condition and returns a simple result.'],
  monkeyTrouble: ['p181646', 'Combines two Boolean conditions to decide whether the monkeys are in trouble.'],
  sumDouble: ['p154485', 'Uses a conditional rule to change a calculation when the inputs match.'],
  parrotTrouble: ['p140449', 'Combines a time condition with a Boolean condition.'],
  posNeg: ['p160543', 'Combines sign checks and a Boolean condition.'],
  in1020: ['p144535', 'Practices inclusive range comparisons.'],
  loneTeen: ['p165701', 'Uses Boolean comparisons to test whether exactly one value is in a range.'],
  mixStart: ['p151713', 'Practices String checks and if/else decisions.'],
  intMax: ['p101887', 'Compares several values to choose the largest.'],
  close10: ['p172021', 'Uses absolute differences and decisions to compare values.'],
  dateFashion: ['p129125', 'Combines multiple conditions to make a nested decision.'],
  squirrelPlay: ['p141061', 'Practices a conditional range that changes with a Boolean value.'],
  caughtSpeeding: ['p157733', 'Uses nested thresholds to assign an outcome.'],
  sortaSum: ['p118633', 'Combines addition with a conditional threshold.'],
  alarmClock: ['p119308', 'Practices multiple conditions and nested choices.']
};

const pythonExercises = {
  make_abba: ['p182144', 'Uses two input strings to construct a result.'],
  rotate_left3: ['p173401', 'Processes and returns a reordered list.']
};

const istExamples = {
  journey: {
    headers: ['Week', 'Topic', 'Description', 'Example Image'],
    rows: [
      ['1', 'Digital Citizenship', 'I learned how to act responsibly online, protect my digital footprint, and credit the work of others.', 'Photo of my Canvas lesson notes. Source: my own screenshot, Oct 2026'],
      ['2', 'Cyber Hygiene', 'I practiced strong passwords, two-step sign-in, and spotting phishing messages.', 'Diagram of a phishing email. Source: cited site, date']
    ],
    images: [
      { src: 'example-digital-citizenship.svg', alt: 'Shield with a check mark beside a globe', cite: 'Torres, M. Digital citizenship shield and globe [illustration]. Centennial High School Computer Science. Created 2026. Accessed October 7, 2026.' },
      { src: 'example-cyber-hygiene.svg', alt: 'Padlock next to a password field with dots', cite: 'Torres, M. Padlock and password field [illustration]. Centennial High School Computer Science. Created 2026. Accessed October 7, 2026.' }
    ],
    note: 'Your table needs at least 8 rows. Every image needs alt text and an AMA citation (creator, title, site, date, URL if online, access date).'
  },
  careers: {
    headers: ['Career', 'Description', 'Average salary', 'Technical skills', 'Soft skills'],
    rows: [
      ['Electronic Engineer', 'Designs, tests, and improves circuits and electronic devices.', '$__ to $__ per year (source, date)', 'Circuit design, schematics, soldering, testing equipment', 'Problem solving, attention to detail, teamwork'],
      ['Data Network Engineer', 'Plans, builds, and maintains the networks that move data between computers.', '$__ to $__ per year (source, date)', 'Routers and switches, IP addressing, network security', 'Communication, patience, troubleshooting'],
      ['SMSC Systems Engineer', 'Designs and integrates hardware and software systems for products and customers.', '$__ to $__ per year (source, date)', 'Systems design, hardware and software integration, documentation', 'Collaboration, planning, clear writing'],
      ['Test Automation Engineer', 'Writes programs that automatically test software and hardware to find bugs early.', '$__ to $__ per year (source, date)', 'Programming, test frameworks, debugging, version control', 'Curiosity, persistence, teamwork']
    ],
    note: 'Careers from Mr. Torres. Replace the $__ with a real range you research and cite with the source and date. Choose your own three or more careers.'
  }
};

function section(title, description, options = {}) {
  return { title, description, ...options };
}

const courses = [
  {
    id: 'ap-csa',
    code: 'AP Computer Science A',
    short: 'AP CSA',
    subtitle: 'Build Java fluency through algorithms, decisions, and deliberate practice.',
    theme: 'Practice makes progress',
    resources: ['canvas', 'codehs', 'apClassroom', 'codingbatJava'],
    resourceNote: 'Use your AP CSA Learning Journal, previous notes, and previous assignments as well. Sign in through your school account when a platform requires it.',
    practice: 'Learning Java is similar to learning a sport or musical instrument. Watching videos alone is not enough: consistent practice and repetition build programming skills. Aim to practice Java coding at least 30 minutes every day.',
    sections: [
      section('Unit 2.1 · Algorithms with Selection and Repetition',
        'An algorithm is a finite, ordered set of steps for solving a problem. Selection chooses a path (for example, if/else); repetition runs steps again (for example, a loop). Algorithms matter because a clear plan makes a solution understandable, testable, and repeatable.',
        { code: 'int total = 0;\nfor (int score : scores) {\n    if (score >= 70) {\n        total += score;\n    }\n}', walkthrough: 'The loop visits each score. The if statement selects only passing scores, and total accumulates those values. Together, selection and repetition express an algorithm.', tasks: ['Review the example and trace total after each loop iteration.', 'Complete CodeHS Unit 2.1.', 'Log in to AP Classroom, find the Unit 2.1 MCQ, and complete it.', 'Complete the listed CodingBat exercises.', 'Update your journal and reflect on a challenge.'], exercises: ['sleepIn', 'monkeyTrouble', 'sumDouble', 'parrotTrouble'] }),
      section('Unit 2.2 · Boolean Expressions',
        'A Boolean expression evaluates to exactly true or false. Comparison operators include ==, !=, <, >, <=, and >=. Logical operators &&, ||, and ! combine or reverse Boolean values; use parentheses to make complex reasoning easier to read.',
        { code: 'int temperature = 24;\nboolean isWarm = temperature >= 20;\nboolean canSwim = isWarm && !isRaining;', walkthrough: 'The comparison assigns true to isWarm when the temperature is at least 20. The final expression is true only when it is warm and it is not raining.', tasks: ['Predict each expression before evaluating it.', 'Complete CodeHS Unit 2.2.', 'Log in to AP Classroom, find the Unit 2.2 MCQ, and complete it.', 'Practice the listed CodingBat Boolean exercises.', 'Record one example of a Boolean expression in your journal.'], exercises: ['posNeg', 'in1020', 'loneTeen'] }),
      section('Unit 2.3 · If Statements',
        'An if statement runs a block only when its condition is true. Add else for the alternative path. Conditional execution lets a program respond differently to data or events.',
        { code: 'if (lives > 0) {\n    System.out.println(\"Keep playing!\");\n} else {\n    System.out.println(\"Game over\");\n}', walkthrough: 'Java evaluates lives > 0 first. Exactly one branch runs: the if branch when the condition is true, otherwise the else branch.', tasks: ['Review the lesson and trace both possible outcomes.', 'Complete CodeHS Unit 2.3.', 'Log in to AP Classroom, find the Unit 2.3 MCQ, and complete it.', 'Try the listed CodingBat exercises and explain one decision in your journal.'], exercises: ['mixStart', 'intMax', 'close10'], challenge: 'Write an if/else statement that prints \"Even\" or \"Odd\" based on an integer.' }),
      section('Unit 2.4 · Nested If Statements',
        'A nested decision places an if statement inside another if or else block. It is useful when the second question should only be asked after the first condition is met. Keep indentation consistent and consider whether conditions can be combined clearly. Unit 2.4 may be extended into next week if the class completes only three units this week; focus on understanding rather than rushing.',
        { code: 'if (hasTicket) {\n    if (age >= 13) {\n        System.out.println(\"Enter the event\");\n    } else {\n        System.out.println(\"Ask an adult\");\n    }\n} else {\n    System.out.println(\"Get a ticket first\");\n}', walkthrough: 'The program checks for a ticket first. Only ticket holders reach the age decision, so the second condition is nested inside the first branch.', tasks: ['Trace the result for all combinations of ticket status and age.', 'Complete CodeHS Unit 2.4 when ready; this unit may continue next week if needed.', 'Log in to AP Classroom, find the Unit 2.4 MCQ, and complete it.', 'Complete the exercises and reflect on when a nested decision is useful.'], exercises: ['dateFashion', 'squirrelPlay', 'caughtSpeeding', 'sortaSum', 'alarmClock'], challenge: 'Design a decision tree for unlocking a game level: the player needs enough experience and a key.' })
    ],
    checklist: ['AP Classroom MCQ completed for each finished Unit 2 lesson; complete Unit 2.4 MCQ when that lesson is finished', 'CodeHS lessons completed', 'CodingBat practice completed', 'Journal updated', 'Vocabulary recorded', 'Weekly reflection completed'],
    extra: 'frq'
  },
  {
    id: 'ap-csp',
    progressVersion: 2,
    code: 'AP Computer Science Principles',
    short: 'AP CSP',
    subtitle: 'CodeHS Unit 5: Functions & Parameters due 10/24 · Data Technology Research Symposium',
    theme: 'Big Idea 2 Data Technology Research Symposium',
    resources: ['canvas', 'codehs', 'apClassroom'],
    resourceNote: 'Use your assigned symposium topic, class notes, and credible research sources. Complete the assigned Big Idea 2 MCQs in AP Classroom.',
    practice: 'Complete CodeHS Unit 5: Functions and Parameters by 10/24. Also work with your assigned team to research a data technology, explain how it developed and works, identify contributors, and evaluate its impact on people and industry. Build a professional presentation with AMA citations, speaker notes, and an audience activity; update your journal as you work.',
    sections: [
      section('Big Idea 2 · Data Technology Research Symposium',
        'Data is information represented in a form a computer can store and process. In this symposium, teams research an assigned data technology, its history and contributors, how it works, and its impact on people and industry.',
        { bigIdea: true,
          tasks: ['Work with your assigned team and confirm the topic below.', 'Tuesday: assign team roles, gather sources, and create a research outline.', 'Wednesday: research history, inventors, algorithms, applications, and careers; aim for a presentation that is 50% complete.', 'Thursday: develop visuals and speaker notes; add references and an audience activity.', 'Friday: review accuracy, AMA citations, timing, and professional expectations; rehearse.', 'Use credible sources and record AMA citation details as you research.', 'Update your Data Technology Research Journal and weekly reflection.'],
          prompts: ['What problem or need led to this technology?', 'Who contributed to its development, and what did they contribute?', 'How does the technology work, and what algorithms or technical processes does it use?', 'How has it affected society, careers, or industry? What ethical concerns or future trends should people consider?'],
          table: {
            headers: ['Team', 'Project topic', 'Students'],
            rows: [
              ['1', 'Binary Number Systems', 'Elijah, Lyric'],
              ['2', 'Bits, Bytes & Data Storage', 'Nadav, Caiden'],
              ['3', 'Text Encoding', 'Nathan, Owen'],
              ['4', 'Images as Data', 'Itay, Diego'],
              ['5', 'Data Compression Algorithms', 'Julian, Santiago'],
              ['6', 'Audio Data & Sampling', 'Aiyan, Geo'],
              ['7', 'Video Compression & Streaming', 'CJ, Kaiden'],
              ['8', 'Data Visualization', 'Robert, JP'],
              ['9', 'Big Data & Analytics', 'Maddy'],
              ['10', 'Data Privacy', 'Jimmy, Derick'],
              ['11', 'Data Security & Encryption', 'Grey, Jude, Leo'],
              ['12', 'Artificial Intelligence & Data', 'Caleb, Preston']
            ]
          }
        }),
      section('Binary Numbers · Digital Representation',
        'Binary is a base-2 number system that uses 0 and 1. Each place represents a power of 2; computers use binary patterns to represent many kinds of information.',
        { subtopic: true,
          code: 'Decimal 13 = 8 + 4 + 1\nPlace values: 8  4  2  1\nBinary:      1  1  0  1  = 1101',
          walkthrough: '13 contains 8, 4, and 1 but not 2, so its four-bit representation is 1101.',
          tasks: ['Explain how binary represents data in your assigned technology.', 'Complete the Binary Numbers MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Convert 6, 10, 19, 25, and 42 to binary; show place values and check each answer by converting back.'],
          quickCheck: { prompt: 'What is decimal 13 in binary?', options: ['1011', '1101', '1110'], correct: 1, explanation: '13 = 8 + 4 + 1, so the 8, 4, 2, 1 place values are 1, 1, 0, 1.' }
        }),
      section('Data Compression',
        'Compression represents data using fewer bits. Lossless compression preserves all original information; lossy compression removes some detail to reduce file size. The right method depends on the data and its use.',
        { subtopic: true,
          tasks: ['Investigate how compression supports your assigned technology and whether it uses lossless or lossy methods.', 'Complete the Data Compression MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Compare lossless and lossy compression and give an appropriate use for each.'],
          quickCheck: { prompt: 'Which type of compression preserves all original data?', options: ['Lossless', 'Lossy', 'Both always remove details'], correct: 0, explanation: 'Lossless compression reduces file size while preserving all original information.' }
        }),
      section('Extracting Information from Data',
        'A dataset is a collection of related observations. Organize or visualize its values, look for patterns and trends, and support conclusions with evidence. A pattern alone does not prove what caused it.',
        { subtopic: true,
          tasks: ['Find an example of how your assigned technology extracts or presents useful information from data.', 'Complete the Extracting Information from Data MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Use a small, teacher-approved dataset to identify a pattern and support one conclusion with evidence and a limitation.'],
          quickCheck: { prompt: 'What should support a conclusion drawn from a dataset?', options: ['Specific evidence from the data', 'A guess based on one unusual value', 'An unrelated opinion'], correct: 0, explanation: 'A sound conclusion should be supported by relevant data evidence, while noting limitations.' }
        }),
      section('Using Programs with Data',
        'Programs use data to personalize recommendations, organize information, and support decisions. Consider what data goes into a program, how it is processed, and what output or decision results.',
        { subtopic: true,
          tasks: ['Explain how a program uses data in your assigned technology and identify its outputs or decisions.', 'Complete the Using Programs with Data MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Discuss one benefit and one concern or ethical impact of using data in this technology.'],
          quickCheck: { prompt: 'A recommendation program uses listening history to suggest songs. What is the listening history?', options: ['Input data', 'The program output', 'A compression method'], correct: 0, explanation: 'The listening history is data provided to the program; suggested songs are a possible output.' }
        }),
      section('CodeHS Unit 5 · Functions (Due 10/24)',
        'A function is a named, reusable group of instructions. In Python, def creates a function definition. Defining a function does not run it; calling its name followed by parentheses runs its instructions.',
        { subtopic: true,
          code: 'def print_hello():\n    print("Hello")\n\ndef print_hello_twice():\n    for i in range(2):\n        print("Hello")\n\nprint_hello()\nprint_hello_twice()',
          walkthrough: 'The two function definitions describe reusable instructions. The calls at the bottom run those instructions; print_hello_twice uses a loop to print two times.',
          tasks: ['Trace what each function call displays.', 'Complete the CodeHS Unit 5 Functions lesson by 10/24.', 'Record a function definition and a function call in your journal.'],
          challenge: 'Create one function that prints a short message three times.' }),
      section('CodeHS Unit 5 · Parameters (Due 10/24)',
        'A parameter is a named input in a function definition. An argument is the value supplied when the function is called. Parameters let one function work with different inputs.',
        { subtopic: true,
          code: 'def greet(name):\n    print("Hello", name)\n\ngreet("Jordan")\ngreet("Avery")\n\ndef introduce(name, grade):\n    print(name, "is in grade", grade)\n\nintroduce("Jordan", 10)',
          walkthrough: 'name and grade are parameters. "Jordan", "Avery", and 10 are arguments. Arguments match parameters in order.',
          tasks: ['Identify each parameter and argument in the example.', 'Complete the CodeHS Unit 5 Parameters lesson by 10/24.', 'Write and call a function that accepts two parameters.'],
          quickCheck: { prompt: 'In greet("Jordan"), what is "Jordan"?', options: ['A parameter', 'An argument', 'A function definition'], correct: 1, explanation: 'The function definition names name as the parameter; "Jordan" is the argument supplied in the call.' } }),
      section('CodeHS Unit 5 · Return Values (Due 10/24)',
        'A return statement sends a result back to the code that called a function. Printing displays information; returning makes a value available for later calculations or decisions.',
        { subtopic: true,
          code: 'def double(number):\n    return number * 2\n\nresult = double(4)\nprint(result)',
          walkthrough: 'double(4) returns the integer 8. The assignment stores that returned value in result, and print displays it.',
          tasks: ['Predict the value returned by double(7).', 'Complete the CodeHS Unit 5 Return Values lesson by 10/24.', 'Explain the difference between print and return in your journal.'],
          quickCheck: { prompt: 'What value is stored in result after double(4)?', options: ['4', '8', 'The text "double"'], correct: 1, explanation: 'double returns 4 * 2, so result stores 8.' } }),
      section('CodeHS Unit 5 · Local and Global Scope (Due 10/24)',
        'A local variable is created inside a function and is available there. A global variable is created outside functions. Prefer parameters and return values to share information when possible because they make a function’s inputs and outputs clear.',
        { subtopic: true,
          code: 'school = "Centennial"  # global variable\n\ndef welcome(student):\n    message = "Welcome to " + school + ", " + student\n    return message\n\nprint(welcome("Jordan"))',
          walkthrough: 'school is defined outside welcome, so it is global. student and message are local to the function. The function returns its result instead of changing the global variable.',
          tasks: ['Identify the global variable, parameter, and local variable.', 'Complete the CodeHS Unit 5 Local and Global Scope lesson by 10/24.', 'Finish all assigned CodeHS Unit 5 Functions and Parameters work by 10/24 and update your journal.'],
          quickCheck: { prompt: 'Which name is local to welcome?', options: ['school', 'student', 'Centennial'], correct: 1, explanation: 'student is a parameter of welcome, so it is local to that function.' } })
    ],
    checklist: ['Team roles, research outline, and source list completed', 'Assigned topic explained, including its history and key contributors', 'Technical processes, applications, and career connections explained', 'Presentation is at least 50% complete after Wednesday research and development', 'Visuals, speaker notes, references, and audience activity completed', 'AMA citations included and presentation accuracy checked', 'Big Idea 2 AP Classroom MCQs completed by November 6', 'CodeHS Unit 8: Digital Information completed', 'Team rehearsal and professional expectations completed', 'Data Technology Research Journal and weekly reflection updated', 'CodeHS Unit 5 Functions lesson completed by 10/24', 'CodeHS Unit 5 Parameters lesson completed by 10/24', 'CodeHS Unit 5 Return Values lesson completed by 10/24', 'CodeHS Unit 5 Local and Global Scope lesson completed by 10/24'],
    journalName: 'Data Technology Research Journal'
  },
  {
    id: 'ist-csp',
    progressVersion: 2,
    code: 'Intro to Software Technology / CSP',
    short: 'IST / CSP',
    subtitle: 'Career Exploration Website · CodeHS Sandbox',
    theme: 'Build a professional career exploration website',
    resources: ['canvas', 'codehs', 'bls', 'onet', 'w3schools', 'cssTricks', 'codepen', 'googleFonts', 'coolors', 'colorHunt'],
    resourceNote: 'Research technology careers with credible, current sources. Cite salary and other research and record when the information was accessed.',
    practice: 'Choose a technology career and build a professional website in CodeHS Sandbox using HTML and CSS. Explain the career’s history, responsibilities, skills, education, salary, outlook, related careers, and sources.',
    sections: [
      section('Career Exploration Website · Project Brief',
        'Choose one technology career and create a website that informs an audience about that career. Possible areas include software, cybersecurity, data and AI, networking and cloud, and game development. Research carefully, take notes in your own words, and cite your sources.',
        { tasks: ['Choose one technology career and identify your intended audience.', 'Create a project in CodeHS Sandbox using HTML > WebDev.', 'Plan a clear homepage and navigation for the required information.', 'Use credible, current sources for career details, education, salary, and outlook.'] }),
      section('Research the Career',
        'Investigate what people in this career do, how the field developed, who leads or influences it, and what skills, education, and certifications are useful. Salary depends on location and experience; include the source and date for any figures.',
        { tasks: ['Research the career overview and history.', 'Identify industry leaders or notable contributors and explain their relevance.', 'Find required skills, education options, and certifications.', 'Research salary information and future outlook; cite each source.', 'Identify related careers and explain how they connect.', 'Record each source title, organization, URL, and access date as you work.'] }),
      section('Build the Website · HTML Structure',
        'Use semantic HTML headings and sections to organize your research. Make the page easy to scan, with a clear title and navigation between the required career sections.',
        { code: '<header>\n  <h1>Explore a Technology Career</h1>\n  <p>Career name and a short introduction</p>\n</header>\n<nav aria-label="Career information">\n  <a href="#overview">Overview</a>\n  <a href="#skills">Skills and education</a>\n  <a href="#outlook">Salary and outlook</a>\n</nav>\n<main>\n  <section id="overview"><h2>Career Overview</h2></section>\n  <section id="skills"><h2>Skills and Education</h2></section>\n  <section id="outlook"><h2>Salary and Future Outlook</h2></section>\n</main>',
          walkthrough: 'Use one h1 for the page title, h2 elements for major sections, and section elements to group related information. Navigation links with matching fragment IDs let visitors move through the page.',
          tasks: ['Create a homepage with a clear career title and introduction.', 'Use semantic headings and sections to organize information.', 'Add working navigation links for the main sections.', 'Write in your own words and check spelling and readability.'] }),
      section('Required Website Sections · CSS Design',
        'Every website must include all nine required sections. Use consistent colors, fonts, spacing, and layout so visitors can find information quickly. Use responsive styles so the page remains readable on different screens.',
        { table: {
          headers: ['Required section', 'What to include'],
          rows: [
            ['Career Overview', 'What the career is and its main purpose.'],
            ['Career History', 'How the career or field developed.'],
            ['Industry Leaders', 'People or organizations shaping the field.'],
            ['Skills Needed', 'Technical and professional skills used in the job.'],
            ['Education & Certifications', 'Relevant post-secondary pathways, credentials, or certifications.'],
            ['Salary Information', 'Current figures with a credible source, location/context, and date.'],
            ['Future Outlook', 'Demand, trends, and how the role may change.'],
            ['Related Careers', 'Other roles connected to this career.'],
            ['Sources', 'Working source links and complete citation details.']
          ]
        },
          code: '<style>\n  body { font-family: Arial, sans-serif; line-height: 1.6; }\n  main { max-width: 900px; margin: auto; padding: 1rem; }\n  section { margin: 1rem 0; padding: 1rem; border-radius: 8px; }\n  img { max-width: 100%; height: auto; }\n</style>',
          walkthrough: 'CSS selectors target HTML elements; declarations set properties such as font-family, margin, and color. Keep sufficient contrast and make images responsive.',
          tasks: ['Include Career Overview, Career History, Industry Leaders, Skills Needed, Education & Certifications, Salary Information, Future Outlook, Related Careers, and Sources.', 'Apply consistent CSS styling with readable text, clear contrast, and a responsive layout.', 'Add relevant images with descriptive alt text and source citations.', 'Cite research and salary sources in the Sources section.'] }),
      section('Daily Build Plan · Review and Submit',
        'Follow the weekly milestones to build the page in manageable steps. Save and preview your work as you go, and ask for help if you cannot access CodeHS Sandbox.',
        { table: {
          headers: ['Day', 'Milestones'],
          rows: [
            ['Tuesday', 'Choose a career; create the Sandbox project; research the topic; create the homepage.'],
            ['Wednesday', 'Add the overview, history, and industry leaders; begin CSS.'],
            ['Thursday', 'Add salary information, future outlook, and related careers; complete CSS.'],
            ['Friday', 'Review all required sections; check links and images; submit the project.']
          ]
        }, tasks: ['Tuesday: choose a career, create the Sandbox project, research the topic, and create the homepage.', 'Wednesday: add career overview, history, and industry leaders; begin CSS.', 'Thursday: add salary information, future outlook, and related careers; complete CSS.', 'Friday: review the project, test links and images, and submit it.'] }),
      section('Early Finishers · CodeHS Unit 10',
        'Begin CodeHS Unit 10 after the Career Exploration Website is complete, styled, reviewed, and submitted. Unit 10 topics include variables, user input, functions, graphics, and animations.',
        { tasks: ['Confirm all nine website sections are complete and sources are cited.', 'Open CodeHS Unit 10 after the website is ready for submission.', 'Explore variables, user input, functions, graphics, and animations.', 'Use W3Schools, CSS-Tricks, CodePen, Google Fonts, Coolors, or Color Hunt as helpful references.'] })
    ],
    checklist: ['Career selected and career research planned', 'Career Overview, Career History, and Industry Leaders sections complete', 'Skills Needed and Education & Certifications sections complete', 'Salary Information and Future Outlook sections complete with sources', 'Related Careers and Sources sections complete', 'HTML structure and navigation are clear and working', 'CSS styling is consistent, readable, and responsive', 'Links and images checked; alt text and citations included', 'Project reviewed and submitted', 'CodeHS Unit 10 started if project is complete'],
    journalName: 'Student Learning Journal'
  },
  {
    id: 'game-design',
    code: 'Game Design & Simulation',
    short: 'Game Design',
    subtitle: 'Develop, test, document, and reflect on your game programming skills.',
    theme: 'Choose the pathway that fits your setup',
    resources: ['canvas', 'unity', 'bls', 'onet'],
    resourceNote: 'Also use Week 10 Learning Hub tutorials, teacher examples, C# examples, your Game Development Journal, and Game Programming Portfolio activities.',
    practice: 'Maintain a development journal, collaborate with teammates, refine game ideas, and document progress. Choose Path A if Unity is available; otherwise use Path B. No game engine is required for Path B.',
    sections: [
      section('Path A · Unity Available',
        'Continue working in your main Environment Scene. Develop the five different camera and lighting setups, and improve the scene using feedback from classmates.',
        { tasks: ['Continue developing the main Environment Scene.', 'Develop the five different camera and lighting setups.', 'Use feedback from classmates to improve the scene.', 'Test the scene and record what changed.', 'Update the Game Development Journal and set a next goal.'], prompts: ['What was completed in the main Environment Scene?', 'How did you develop the cameras and lights?', 'What classmate feedback did you use?', 'What is the next goal?'] }),
      section('Path B · Unity Unavailable · 7-Day C# for Game Developers Portfolio',
        'Driving question: Can I learn enough C# programming concepts in one week to better understand how video games are built? Use teacher examples, Learning Hub tutorials, guided activities, journal reflections, pseudocode, and C# examples. No game engine is required.',
        { tasks: ['Complete the seven daily learning activities below.', 'For every day, record the learning target, vocabulary, example, practice, challenge, reflection, and journal prompt.', 'Use a checklist to confirm each daily activity is complete.'] }),
      ...[
        ['Day 1 · Variables and Data Types', 'Create a simple player statistics system using int, float, string, and bool.', 'string playerName = \"Nova\";\nint health = 100;\nfloat speed = 4.5f;\nbool hasKey = false;', 'Create fields for player name, health, score, and lives. Choose a suitable data type for each.', 'Add an extra stat, such as movement speed, and explain its type.', 'Why are variables important in video games?'],
        ['Day 2 · Input and Output', 'Learn how games receive and display information. Create a Character Creator.', 'string name = \"Rin\";\nstring characterClass = \"Mage\";\nstring startingWeapon = \"Staff\";\nConsole.WriteLine(name + \" the \" + characterClass);', 'Plan inputs for name, character class, and starting weapon; show the resulting character summary.', 'Add a choice and explain how it changes the character description.', 'How does user input affect game experiences?'],
        ['Day 3 · If Statements', 'Learn decision-making in programs. Create a simple Game Event System.', 'if (hasKey) {\n    Console.WriteLine(\"Open treasure chest\");\n} else {\n    Console.WriteLine(\"Find the key first\");\n}', 'Model an event such as opening a treasure chest, gaining gold, losing health, or unlocking an area.', 'Add another event that changes what the player sees.', 'How do decision structures affect gameplay?'],
        ['Day 4 · Nested If Statements', 'Learn advanced decision-making. Create an RPG Shop System.', 'if (playerLevel >= itemLevel) {\n    if (gold >= price) {\n        Console.WriteLine(\"Purchase allowed\");\n    }\n}', 'Check player level and gold to determine purchase eligibility.', 'Add a clear message for each reason a purchase might fail.', 'Why do games often require multiple conditions?'],
        ['Day 5 · Loops', 'Learn for and while loops. Create an Enemy Wave Generator.', 'for (int wave = 1; wave <= 3; wave++) {\n    Console.WriteLine(\"Wave \" + wave);\n}', 'Generate and label Waves 1, 2, and 3.', 'Change the number of waves and describe a safe loop stopping condition.', 'Where are loops commonly used in games?'],
        ['Day 6 · Methods', 'Learn reusable code design. Plan Attack(), Heal(), and Defend() methods.', 'void Heal() {\n    health += 20;\n}\n\nvoid Defend() {\n    isDefending = true;\n}', 'Write pseudocode or C# examples for Attack(), Heal(), and Defend().', 'Choose one method and list its inputs, steps, and effects.', 'Why do game developers create reusable methods?'],
        ['Day 7 · Game Programming Portfolio Challenge', 'Design a complete game system using the concepts from the week.', 'Game overview\nVariables: health, score, lives\nInput: player action\nDecisions: win / lose rules\nLoop: repeat turns\nMethods: Attack(), Heal()', 'Create a portfolio plan with a game overview, variables, input, decisions, loops, methods, and player goal.', 'State a win condition and a lose condition, then test your design with an example player.', 'How has learning programming concepts improved your understanding of game development?']
      ].map(([title, target, code, practice, challenge, reflection]) => section(title, target, {
        code,
        walkthrough: 'Learning target: ' + target + ' Vocabulary: identify and define the programming terms in this lesson. Teacher example: trace the code or pseudocode above and explain what changes.',
        tasks: [practice, 'Complete the challenge activity and test your idea with an example.', 'Journal prompt: record what you learned, what you tried, and your next step.', 'Completion checklist: learning target reviewed; vocabulary recorded; example explained; practice and challenge completed; reflection and journal prompt answered.'],
        challenge,
        reflection
      })),
      section('Game Industry Careers',
        'Research at least three careers in the game industry. Salary and education requirements vary by location and experience; use current, credible sources and cite where and when you found each figure.',
        { table: {
          headers: ['Career', 'Description', 'Salary', 'Technical skills', 'Soft skills', 'Education requirements'],
          rows: [
            ['Gameplay Programmer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.', 'Research.'],
            ['Game Designer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.', 'Research.'],
            ['Technical Artist or QA Tester', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.', 'Research.']
          ]
        }, tasks: ['Research at least three roles such as Gameplay Programmer, Game Designer, Technical Artist, Level Designer, QA Tester, or Producer.', 'Complete each table column using credible, current sources.', 'Cite salary and education sources and record access dates.', 'Reflect: Which career interests you most and why?'] })
    ],
    checklist: ['Development work or seven-day portfolio completed', 'Testing completed', 'Game Development Journal updated', 'Reflection completed', 'Career exploration completed']
  }
];

let state = { checks: {}, notes: {}, open: {}, answers: {} };
const coursePageId = document.body.dataset.coursePage || null;

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const resourceAnchor = key => {
  const [label, url] = resources[key];
  return `<a class="resource-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`;
};

function emptyState() {
  return { checks: {}, notes: {}, open: {}, answers: {} };
}

function parseState(saved) {
  if (!saved) return emptyState();
  const parsed = JSON.parse(saved);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Saved progress has an unexpected format.');
  return {
    checks: parsed.checks && typeof parsed.checks === 'object' ? parsed.checks : {},
    notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
    open: parsed.open && typeof parsed.open === 'object' ? parsed.open : {},
    answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {}
  };
}

function legacyCourseState(courseId, legacy) {
  const prefix = `${courseId}-`;
  const checks = Object.fromEntries(Object.entries(legacy.checks).filter(([id]) => id.startsWith(prefix) || (courseId === 'ap-csa' && id === 'ap-csa-frq-complete')));
  const notes = Object.fromEntries(Object.entries(legacy.notes).filter(([id]) => id.startsWith(prefix)));
  const open = Object.fromEntries(Object.entries(legacy.open).filter(([id]) => id.startsWith(prefix)));
  const answers = Object.fromEntries(Object.entries(legacy.answers).filter(([id]) => id.startsWith(prefix)));
  return { checks, notes, open, answers };
}

function loadCourseState(courseId) {
  const courseKey = `${COURSE_STORAGE_PREFIX}${courseId}`;
  try {
    const savedCourse = localStorage.getItem(courseKey);
    if (savedCourse) return parseState(savedCourse);
    const savedLegacy = localStorage.getItem(STORAGE_KEY);
    if (!savedLegacy) return emptyState();
    const splitState = legacyCourseState(courseId, parseState(savedLegacy));
    if (Object.keys(splitState.checks).length || Object.keys(splitState.notes).length || Object.keys(splitState.open).length) {
      localStorage.setItem(courseKey, JSON.stringify(splitState));
    }
    return splitState;
  } catch (error) {
    setSaveStatus(`Could not load saved progress: ${error.message}`, true);
    return emptyState();
  }
}

function loadState() {
  if (coursePageId) {
    state = loadCourseState(coursePageId);
    return;
  }
  state = emptyState();
  courses.forEach(course => {
    const courseState = loadCourseState(course.id);
    Object.assign(state.checks, courseState.checks);
    Object.assign(state.notes, courseState.notes);
    Object.assign(state.open, courseState.open);
    Object.assign(state.answers, courseState.answers);
  });
}

function saveState(message = '🟢 Progress saved in this browser') {
  if (!coursePageId) return true;
  try {
    localStorage.setItem(`${COURSE_STORAGE_PREFIX}${coursePageId}`, JSON.stringify(state));
    setSaveStatus(message);
    return true;
  } catch (error) {
    setSaveStatus(`Could not save progress: ${error.message}`, true);
    return false;
  }
}

function setSaveStatus(message, isError = false) {
  const status = document.getElementById('save-status');
  status.textContent = message;
  status.classList.toggle('error', isError);
}

function checkRow(id, label) {
  return `<li class="check-row"><input type="checkbox" data-check="${escapeHTML(id)}" id="${escapeHTML(id)}"${state.checks[id] ? ' checked' : ''}><label for="${escapeHTML(id)}"><span>${escapeHTML(label)}</span></label></li>`;
}

function exerciseList(exercises, catalog) {
  if (!exercises || !exercises.length) return '';
  return `<div class="exercise-list">${exercises.map(name => {
    const [problem, explanation] = catalog[name];
    const label = catalog === javaExercises ? name : name;
    return `<div class="exercise"><a href="https://codingbat.com/prob/${problem}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a><p>${escapeHTML(explanation)}</p></div>`;
  }).join('')}</div>`;
}

function quickCheckMarkup(item, questionId) {
  const quiz = item.quickCheck;
  const selected = state.answers[questionId];
  const hasAnswer = Number.isInteger(selected) && selected >= 0 && selected < quiz.options.length;
  const isCorrect = hasAnswer && selected === quiz.correct;
  const feedback = hasAnswer
    ? `${isCorrect ? 'Correct. ' : 'Not quite. '}${quiz.explanation}`
    : '';
  const options = quiz.options.map((option, index) =>
    `<label><input type="radio" name="${questionId}" data-answer="${questionId}" value="${index}"${selected === index ? ' checked' : ''}> ${escapeHTML(option)}</label>`
  ).join('');
  return `<fieldset class="quick-check" data-correct="${quiz.correct}" data-correct-feedback="Correct. ${escapeHTML(quiz.explanation)}" data-incorrect-feedback="Not quite. ${escapeHTML(quiz.explanation)}">
    <legend>Check your understanding</legend>
    <p>${escapeHTML(quiz.prompt)}</p>
    <div class="quick-check-options">${options}</div>
    <p class="quick-check-feedback${hasAnswer ? (isCorrect ? ' correct' : ' incorrect') : ''}" data-answer-feedback="${questionId}" aria-live="polite">${escapeHTML(feedback)}</p>
  </fieldset>`;
}

function sectionMarkup(course, item, sectionIndex) {
  const version = course.progressVersion ? `v${course.progressVersion}-` : '';
  const sectionId = `${course.id}-${version}section-${sectionIndex}`;
  const open = state.open[sectionId] === true;
  const lessonClasses = `lesson${item.bigIdea ? ' big-idea' : ''}${item.subtopic ? ' subtopic' : ''}`;
  const catalog = course.id === 'ap-csa' ? javaExercises : pythonExercises;
  const exercises = item.exercises ? exerciseList(item.exercises, catalog) : '';
  const quickCheck = item.quickCheck ? quickCheckMarkup(item, `${sectionId}-quick-check`) : '';
  const tasks = (item.tasks || []).map((task, taskIndex) =>
    checkRow(`${sectionId}-task-${taskIndex}`, task)).join('');
  const prompts = item.prompts ? `<h4>Journal prompts</h4><ul>${item.prompts.map(prompt => `<li>${escapeHTML(prompt)}</li>`).join('')}</ul>` : '';
  const reflection = item.reflection ? `<h4>Reflection question</h4><p>${escapeHTML(item.reflection)}</p>` : '';
  const challenge = item.challenge ? `<h4>Challenge activity</h4><p>${escapeHTML(item.challenge)}</p>` : '';
  const code = item.code ? `<h4>Teacher example</h4><pre><code>${escapeHTML(item.code)}</code></pre>` : '';
  const walkthrough = item.walkthrough ? `<h4>Code walkthrough</h4><p>${escapeHTML(item.walkthrough)}</p>` : '';
  const table = item.table ? `<div class="table-wrap"><table><thead><tr>${item.table.headers.map(header => `<th scope="col">${escapeHTML(header)}</th>`).join('')}</tr></thead><tbody>${item.table.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHTML(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
  return `<details class="${lessonClasses}"${item.example ? ` data-example="${item.example}"` : ''} data-open="${sectionId}"${open ? ' open' : ''}>
    <summary>${escapeHTML(item.title)}</summary>
    <div class="lesson-body"><p>${escapeHTML(item.description)}</p>${code}${walkthrough}${table}${exercises}${quickCheck}${challenge}${reflection}${prompts}
      ${item.exercises ? '<h4>Practice tasks</h4>' : ''}
      <ul class="activity-checks">${tasks}</ul>
    </div>
  </details>`;
}

function journalMarkup(course) {
  const fields = [
    ['learnings', 'Three main learnings', 'Write three things you learned this week.'],
    ['vocabulary', 'Five vocabulary terms', 'List five important terms and define each one.'],
    ['reflection', 'Reflection paragraph', 'What challenged you? What did you try? What will you do next?']
  ];
  const textareas = fields.map(([key, label, hint]) => {
    const version = course.progressVersion ? `v${course.progressVersion}-` : '';
    const id = `${course.id}-${version}journal-${key}`;
    const value = state.notes[id] || '';
    return `<div class="journal-field"><label for="${id}">${label}</label><textarea id="${id}" data-note="${id}" placeholder="${escapeHTML(hint)}">${escapeHTML(value)}</textarea></div>`;
  }).join('');
  const journalVersion = course.progressVersion ? `v${course.progressVersion}-` : '';
  const understandingId = `${course.id}-${journalVersion}journal-understanding`;
  const selected = state.notes[understandingId] || '';
  const radios = [1, 2, 3, 4, 5].map(value =>
    `<label><input type="radio" name="${understandingId}" value="${value}" data-note="${understandingId}"${selected === String(value) ? ' checked' : ''}> ${value}</label>`).join('');
  return `<section class="panel" aria-labelledby="${course.id}-journal-title"><h2 id="${course.id}-journal-title">${escapeHTML(course.journalName || 'Student Learning Journal')}</h2><p>Use your journal to capture what you understand, what you are still practicing, and what you will try next.</p>${textareas}<div class="journal-field"><span class="journal-label">Understanding level (1–5)</span><div class="scale" role="radiogroup" aria-label="Understanding level">${radios}</div></div></section>`;
}

function courseMarkup(course) {
  const page = document.getElementById(`${course.id}-page`);
  const unitSections = course.sections.map((item, index) => sectionMarkup(course, item, index)).join('');
  const checklistVersion = course.progressVersion ? `v${course.progressVersion}-` : '';
  const checklist = course.checklist.map((item, index) => checkRow(`${course.id}-${checklistVersion}checklist-${index}`, item)).join('');
  const resourceLinks = course.resources.map(resourceAnchor).join('');
  page.innerHTML = `<div class="hero course-hero">
    <p class="eyebrow">${escapeHTML(course.short)} · Week 10 pathway</p>
    <h1>${escapeHTML(course.code)}</h1>
    <p>${escapeHTML(course.subtitle)}</p>
    <div class="hero-meta"><span class="pill">Self-paced learning</span><span class="pill">Progress saved locally</span></div>
  </div>
  <div class="course-layout">
    <div class="course-main">
      <section class="panel"><h2>Daily success routine</h2><ol class="routine">${routine.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol></section>
      <section class="panel"><h2>${escapeHTML(course.theme)}</h2><p>${escapeHTML(course.practice)}</p></section>
      ${unitSections}
      ${course.extra === 'frq' ? frqMarkup() : ''}
      <section class="panel"><h2>Weekly completion checklist</h2><ul class="checklist">${checklist}</ul></section>
      ${journalMarkup(course)}
    </div>
    <aside class="course-aside">
      <section class="panel"><h2>Required learning resources</h2><div class="resource-list">${resourceLinks}</div><p class="resource-note">${escapeHTML(course.resourceNote)}</p></section>
      <section class="panel"><h2>Your course progress</h2><div class="progress-track"><span data-course-bar="${course.id}"></span></div><p class="percent"><strong data-course-percent="${course.id}">0%</strong> of checklist items complete</p><p class="resource-note">Check items as you finish activities. Your progress is saved automatically in this browser.</p></section>
      ${course.asideExamples ? istExamplesMarkup() : ''}
    </aside>
  </div>`;
}

const frqParts = [
  {
    title: 'Part (a) · Total oxygen used',
    prompt: 'Write the method totalUsed, which uses a loop to add every value in usage and returns the total oxygen used.',
    starter: 'public static int totalUsed(int[] usage) {\n    // write your loop here\n\n}',
    solution: 'public static int totalUsed(int[] usage) {\n    int total = 0;\n    for (int amount : usage) {\n        total += amount;\n    }\n    return total;\n}',
    rubric: ['Initializes an accumulator before the loop', 'Visits every element of usage', 'Adds each value to the accumulator', 'Returns the total after the loop']
  },
  {
    title: 'Part (b) · Low-oxygen Boolean expression',
    prompt: 'Write the method isLow, which returns true when remaining is at or below threshold. Return the Boolean expression directly.',
    starter: 'public static boolean isLow(int remaining, int threshold) {\n    // write your code here\n\n}',
    solution: 'public static boolean isLow(int remaining, int threshold) {\n    return remaining <= threshold;\n}',
    rubric: ['Uses <= (at or below), not <', 'Returns a boolean value']
  },
  {
    title: 'Part (c) · Warning message with if/else',
    prompt: 'Write the method warning, which returns "LOW OXYGEN" when remaining is at or below threshold and "Oxygen OK" otherwise.',
    starter: 'public static String warning(int remaining, int threshold) {\n    // use if / else here\n\n}',
    solution: 'public static String warning(int remaining, int threshold) {\n    if (remaining <= threshold) {\n        return "LOW OXYGEN";\n    } else {\n        return "Oxygen OK";\n    }\n}',
    rubric: ['Tests the condition with remaining and threshold', 'Returns "LOW OXYGEN" in the true branch', 'Returns "Oxygen OK" in the other branch']
  },
  {
    title: 'Part (d) · Reserve oxygen with a nested if',
    prompt: 'Write the method reserveStatus. If oxygen is low, check reserveAvailable: return "Reserve activated" when true, otherwise "Reserve unavailable". If oxygen is not low, return "No reserve needed".',
    starter: 'public static String reserveStatus(int remaining, int threshold, boolean reserveAvailable) {\n    // use a nested if here\n\n}',
    solution: 'public static String reserveStatus(int remaining, int threshold, boolean reserveAvailable) {\n    if (remaining <= threshold) {\n        if (reserveAvailable) {\n            return "Reserve activated";\n        } else {\n            return "Reserve unavailable";\n        }\n    }\n    return "No reserve needed";\n}',
    rubric: ['Checks low oxygen first', 'Checks reserveAvailable inside the low-oxygen branch', 'Handles all three outcomes with the correct messages']
  },
  {
    title: 'Part (e) · Trace two test cases',
    prompt: 'Trace reserveStatus(8, 10, true) and reserveStatus(8, 10, false). Write each step: which conditions are evaluated, whether each is true or false, and the value returned.',
    starter: 'Test 1: reserveStatus(8, 10, true)\n\n\nTest 2: reserveStatus(8, 10, false)\n\n',
    solution: 'Test 1: reserveStatus(8, 10, true)\n  8 <= 10 is true, so enter the outer if.\n  reserveAvailable is true, so return "Reserve activated".\n\nTest 2: reserveStatus(8, 10, false)\n  8 <= 10 is true, so enter the outer if.\n  reserveAvailable is false, so the else runs: return "Reserve unavailable".',
    rubric: ['Evaluates the outer condition for both tests', 'Shows the reserveAvailable condition for each test', 'States both returned values correctly']
  }
];

function exampleTable(example) {
  return `<div class="table-wrap"><table><thead><tr>${example.headers.map(h => `<th scope="col">${escapeHTML(h)}</th>`).join('')}</tr></thead><tbody>${example.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHTML(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><p class="resource-note">${escapeHTML(example.note)}</p>`;
}

function careerCards(example) {
  const labels = example.headers.slice(1);
  const cards = example.rows.map(row => `<article class="career-card"><h3>${escapeHTML(row[0])}</h3><dl>${labels.map((label, i) => `<dt>${escapeHTML(label)}</dt><dd>${escapeHTML(row[i + 1])}</dd>`).join('')}</dl></article>`).join('');
  return `<div class="career-grid">${cards}</div><p class="resource-note">${escapeHTML(example.note)}</p>`;
}

function journeyCards(example) {
  const cards = example.rows.map((row, i) => {
    const image = example.images[i];
    return `<article class="career-card"><h3>Week ${escapeHTML(row[0])} · ${escapeHTML(row[1])}</h3><dl><dt>Description</dt><dd>${escapeHTML(row[2])}</dd></dl><figure><img src="${escapeHTML(image.src)}" alt="${escapeHTML(image.alt)}"><figcaption>${escapeHTML(image.cite)}</figcaption></figure></article>`;
  }).join('');
  return `<div class="career-grid">${cards}</div><p class="resource-note">${escapeHTML(example.note)}</p>`;
}

function istExamplesMarkup() {
  return `<section class="panel example-panel journey-example" data-example-panel="journey" hidden><h2>Example: My first 8 weeks in Computer Science</h2>${journeyCards(istExamples.journey)}</section>
  <section class="panel example-panel career-example" data-example-panel="careers" hidden><h2>Example: Career exploration</h2>${careerCards(istExamples.careers)}</section>`;
}

function frqPartMarkup(part, index) {
  const base = `ap-csa-frq-${index}`;
  const code = state.notes[`${base}-code`];
  const revealed = state.open[`${base}-reveal`] === true;
  const rubric = part.rubric.map((item, i) => checkRow(`${base}-rubric-${i}`, item)).join('');
  return `<div class="frq-part" data-frq="${base}">
    <h3>${escapeHTML(part.title)}</h3>
    <p>${escapeHTML(part.prompt)}</p>
    <div class="frq-workspace">
      <div class="frq-pane"><label class="frq-label" for="${base}-code">Your code</label>
        <textarea id="${base}-code" class="code-editor" data-note="${base}-code" data-starter="${escapeHTML(part.starter)}" spellcheck="false" autocapitalize="off" autocomplete="off" wrap="off" rows="${Math.max(8, part.solution.split('\n').length + 2)}">${escapeHTML(code === undefined ? part.starter : code)}</textarea></div>
      <div class="frq-pane frq-solution" data-frq-solution${revealed ? '' : ' hidden'}><span class="frq-label">Sample answer (compare, then fix your own)</span>
        <pre><code>${escapeHTML(part.solution)}</code></pre></div>
    </div>
    <div class="frq-actions">
      <button type="button" class="button button-primary" data-frq-action="reveal">${revealed ? 'Hide sample answer' : 'Check my work: show sample answer'}</button>
      <button type="button" class="button button-secondary" data-frq-action="starter">Reset to starter code</button>
      <span class="frq-message" role="status" aria-live="polite"></span>
    </div>
    <details class="frq-rubric"><summary>Self-check rubric</summary><ul class="activity-checks">${rubric}</ul></details>
  </div>`;
}

function frqMarkup() {
  return `<section class="panel frq-panel"><h2>AP-style practice FRQ · Space Station Supply System</h2>
    <p>A space station tracks its oxygen supply while a crew completes tasks. Each task consumes oxygen. The system must warn the crew when oxygen becomes low, and it may use reserve oxygen only when the reserve is available.</p>
    <p class="inline-note"><strong>How it works:</strong> type your Java directly in each box (the Tab key indents; your code saves automatically). Try each part on your own first, then open the sample answer to compare. Fix your code and tick the rubric items you earned. This editor does not run Java; test your final code in CodeHS or another Java IDE.</p>
    ${frqParts.map(frqPartMarkup).join('')}
    <h3>Reflection questions</h3><ul><li>Which parts of your solution use selection and which use repetition?</li><li>How did a Boolean expression help make the decision?</li><li>What edge case did you test, and what did it reveal?</li></ul>
    <ul class="activity-checks">${checkRow('ap-csa-frq-complete', 'Complete the FRQ algorithm and trace at least two test cases.')}</ul>
  </section>`;
}

function homeMarkup() {
  const home = document.getElementById('home-page');
  home.innerHTML = `<div class="hero">
    <p class="eyebrow">Mr. Torres · Centennial High School</p>
    <h1>Week 10 Learning Hub</h1>
    <p>Welcome to Week 10. This Learning Hub contains activities, examples, resources, references, assignment requirements, and expectations for each course. Follow the guidance for your course and complete all required activities.</p>
    <div class="hero-meta"><span class="pill">Four course pathways</span><span class="pill">Save your progress in this browser</span></div>
  </div>
  <div class="section-heading"><div><h2>Choose your course</h2><p>Open your course pathway to find lessons, resources, and checklists.</p></div></div>
  <div class="card-grid">${courses.map(course => `<a class="course-card" href="${coursePages[course.id]}">
    <span class="course-code">${escapeHTML(course.short)}</span><h3>${escapeHTML(course.code)}</h3><p>${escapeHTML(course.subtitle)}</p>
    <span class="card-bottom"><span class="mini-track"><span data-card-bar="${course.id}"></span></span><span data-card-percent="${course.id}">0%</span><span aria-hidden="true">→</span></span>
  </a>`).join('')}</div>
  <div class="section-heading"><div><h2>Course completion dashboard</h2><p>Checklist completion updates automatically as you work.</p></div></div>
  <div class="dashboard-grid">${courses.map(course => `<article class="dashboard-card"><h3>${escapeHTML(course.code)}</h3><div class="progress-track"><span data-dashboard-bar="${course.id}"></span></div><div class="percent"><span data-dashboard-percent="${course.id}">0%</span><span data-dashboard-count="${course.id}">0 / 0 tasks</span></div></article>`).join('')}</div>
  <blockquote class="quote">“Success in computer science comes from persistence, practice, problem-solving, and learning from mistakes.”<cite>— Mr. Torres</cite></blockquote>
  <section class="panel"><h2>Keep your work safe</h2><p>Your progress is automatically saved in this browser. Each course saves its own checklists and journal, so work in one course does not affect another.</p></section>`;
}

function progressFor(courseId) {
  const inputs = [...document.querySelectorAll(`#${courseId}-page input[type="checkbox"][data-check]`)];
  const complete = inputs.filter(input => input.checked).length;
  return { complete, total: inputs.length, percent: inputs.length ? Math.round(complete / inputs.length * 100) : 0 };
}

function updateProgress() {
  courses.forEach(course => {
    const progress = progressFor(course.id);
    const percent = `${progress.percent}%`;
    document.querySelectorAll(`[data-course-bar="${course.id}"], [data-dashboard-bar="${course.id}"], [data-card-bar="${course.id}"]`).forEach(bar => { bar.style.width = percent; });
    document.querySelectorAll(`[data-course-percent="${course.id}"], [data-dashboard-percent="${course.id}"], [data-card-percent="${course.id}"]`).forEach(label => { label.textContent = percent; });
    const count = document.querySelector(`[data-dashboard-count="${course.id}"]`);
    if (count) count.textContent = `${progress.complete} / ${progress.total} tasks`;
    if (coursePageId === course.id) {
      const sidebarPercent = document.getElementById('overall-progress');
      const sidebarBar = document.getElementById('overall-progress-bar');
      if (sidebarPercent) sidebarPercent.textContent = percent;
      if (sidebarBar) sidebarBar.style.width = percent;
    }
  });
}

function restoreFields() {
  document.querySelectorAll('input[type="checkbox"][data-check]').forEach(input => {
    input.checked = Boolean(state.checks[input.dataset.check]);
  });
  document.querySelectorAll('[data-note]').forEach(field => {
    const saved = state.notes[field.dataset.note];
    const value = saved === undefined && field.dataset.starter !== undefined ? field.dataset.starter : saved || '';
    if (field.type === 'radio') field.checked = field.value === value;
    else field.value = value;
  });
}

function init() {
  loadState();
  const selectedCourse = courses.find(course => course.id === coursePageId);
  if (coursePageId && !selectedCourse) {
    setSaveStatus('This course page is not configured.', true);
    return;
  }
  if (selectedCourse) {
    document.querySelector('.save-controls').hidden = false;
    document.getElementById('primary-nav').innerHTML = `<a class="nav-link" href="week10.html"><span aria-hidden="true">←</span> All courses</a><a class="nav-link active" href="#${selectedCourse.id}" aria-current="page"><span aria-hidden="true">${escapeHTML(selectedCourse.short)}</span> ${escapeHTML(selectedCourse.code)}</a>`;
    courseMarkup(selectedCourse);
    document.querySelectorAll('.page').forEach(page => { page.hidden = page.dataset.page !== selectedCourse.id; });
    document.getElementById('sidebar-progress-title').textContent = `${selectedCourse.short} progress`;
  } else {
    document.querySelector('.save-controls').hidden = true;
    homeMarkup();
    courses.forEach(courseMarkup);
    document.querySelectorAll('.page').forEach(page => { page.hidden = page.dataset.page !== 'home'; });
  }
  restoreFields();
  updateProgress();

  const exampleSections = document.querySelectorAll('details[data-example]');
  if (exampleSections.length && 'IntersectionObserver' in window) {
    const visible = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const key = entry.target.dataset.example;
        if (entry.isIntersecting) visible.add(key); else visible.delete(key);
      });
      document.querySelectorAll('[data-example-panel]').forEach(panel => {
        panel.hidden = !visible.has(panel.dataset.examplePanel);
      });
      const aside = document.querySelector('.course-aside');
      if (aside) aside.classList.toggle('has-example', visible.size > 0);
    }, { rootMargin: '-80px 0px -35% 0px' });
    exampleSections.forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('[data-example-panel]').forEach(panel => { panel.hidden = false; });
  }

  document.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('input[type="checkbox"][data-check]')) {
      state.checks[target.dataset.check] = target.checked;
      updateProgress();
      saveState();
    } else if (target.matches('input[type="radio"][data-answer]')) {
      const question = target.closest('.quick-check');
      const feedback = question.querySelector(`[data-answer-feedback="${target.dataset.answer}"]`);
      const isCorrect = Number(target.value) === Number(question.dataset.correct);
      state.answers[target.dataset.answer] = Number(target.value);
      feedback.textContent = isCorrect ? question.dataset.correctFeedback : question.dataset.incorrectFeedback;
      feedback.classList.toggle('correct', isCorrect);
      feedback.classList.toggle('incorrect', !isCorrect);
      saveState();
    } else if (target.matches('[data-note]')) {
      state.notes[target.dataset.note] = target.value;
      saveState();
    }
  });
  document.addEventListener('input', event => {
    const target = event.target;
    if (target.matches('textarea[data-note], input[type="text"][data-note]')) {
      state.notes[target.dataset.note] = target.value;
      saveState();
    }
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-frq-action]');
    if (!button) return;
    const part = button.closest('.frq-part');
    const editor = part.querySelector('.code-editor');
    const message = part.querySelector('.frq-message');
    if (button.dataset.frqAction === 'reveal') {
      const solution = part.querySelector('[data-frq-solution]');
      const revealKey = `${part.dataset.frq}-reveal`;
      const attempted = editor.value.trim() !== editor.dataset.starter.trim() && editor.value.trim().length > 20;
      if (solution.hidden && !attempted) {
        message.textContent = 'Write your own attempt first, then compare.';
        return;
      }
      solution.hidden = !solution.hidden;
      state.open[revealKey] = !solution.hidden;
      button.textContent = solution.hidden ? 'Check my work: show sample answer' : 'Hide sample answer';
      message.textContent = '';
      saveState();
    } else if (button.dataset.frqAction === 'starter' && window.confirm('Replace your code in this part with the starter code?')) {
      editor.value = editor.dataset.starter;
      state.notes[editor.dataset.note] = editor.value;
      saveState();
    }
  });
  document.addEventListener('keydown', event => {
    const target = event.target;
    if (!target.matches || !target.matches('.code-editor') || event.key !== 'Tab' || event.shiftKey) return;
    event.preventDefault();
    const { selectionStart: start, selectionEnd: end } = target;
    target.setRangeText('    ', start, end, 'end');
    state.notes[target.dataset.note] = target.value;
    saveState();
  });
  document.addEventListener('toggle', event => {
    if (event.target.matches('details[data-open]')) {
      state.open[event.target.dataset.open] = event.target.open;
      saveState();
    }
  }, true);
  document.getElementById('save-button').addEventListener('click', () => saveState('🟢 Progress saved in this browser'));
  document.getElementById('reset-button').addEventListener('click', () => {
    const course = courses.find(item => item.id === coursePageId);
    if (!course || !window.confirm(`Reset ${course.short} Week 10 checklists and journal entries saved in this browser? This cannot be undone.`)) return;
    try {
      state = emptyState();
      saveState('Progress reset for this course.');
      document.querySelectorAll('input[type="checkbox"][data-check]').forEach(input => { input.checked = false; });
      document.querySelectorAll('[data-note]').forEach(field => {
        if (field.type === 'radio') field.checked = false;
        else field.value = field.dataset.starter !== undefined ? field.dataset.starter : '';
      });
      document.querySelectorAll('[data-frq-solution]').forEach(box => {
        box.hidden = true;
        box.closest('.frq-part').querySelector('[data-frq-action="reveal"]').textContent = 'Check my work: show sample answer';
      });
      document.querySelectorAll('input[type="radio"][data-answer]').forEach(input => { input.checked = false; });
      document.querySelectorAll('[data-answer-feedback]').forEach(feedback => {
        feedback.textContent = '';
        feedback.classList.remove('correct', 'incorrect');
      });
      document.querySelectorAll('details[data-open]').forEach(details => { details.open = false;       });
      updateProgress();
    } catch (error) {
      setSaveStatus(`Could not reset saved progress: ${error.message}`, true);
    }
  });
  document.getElementById('menu-toggle').addEventListener('click', event => {
    const sidebar = document.getElementById('sidebar');
    const open = sidebar.classList.toggle('open');
    event.currentTarget.setAttribute('aria-expanded', String(open));
    event.currentTarget.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
}

init();