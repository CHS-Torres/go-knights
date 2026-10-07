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
  onet: ['O*NET OnLine', 'https://www.onetonline.org/']
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
    code: 'AP Computer Science Principles',
    short: 'AP CSP',
    subtitle: 'CodeHS Unit 5: Functions and Parameters (due Week 10) · Big Idea 2: Digital Information (MCQs due November 6)',
    theme: 'Practice makes progress',
    resources: ['canvas', 'codehs', 'apClassroom', 'codingbatPython'],
    resourceNote: 'Use your Coding Bootcamp Survival Journal, previous notes, and previous assignments. AP Classroom may be used when your teacher assigns an assessment.',
    practice: 'Programming is learned through repetition, experimentation, debugging, and reflection. Aim to practice Python for 20–30 minutes per day: review a lesson, complete the matching CodeHS work, practice, and then update your journal.',
    sections: [
      section('Functions · CodeHS Unit 5 (due Week 10)',
        'A function is a named, reusable group of instructions. In Python, def starts a function definition. Defining a function does not run it; calling its name followed by parentheses runs its body. Finish all assigned CodeHS Unit 5 Functions and Parameters work by the end of Week 10.',
        { code: 'def print_hello():\n    print(\"Hello\")\n\ndef print_hello_twice():\n    for i in range(2):\n        print(\"Hello\")\n\ndef print_hello_three_times():\n    for i in range(3):\n        print(\"Hello\")', walkthrough: 'Each definition names reusable instructions. Calling print_hello_twice() runs its loop twice; calling print_hello_three_times() runs it three times. Notice that each function still contains repeated print instructions: a parameter can make one function reusable for any count.', tasks: ['Review the examples and call each function.', 'Complete CodeHS Unit 5: Functions and Parameters by the end of Week 10.', 'Complete the listed CodingBat Python practice.', 'Update your journal and reflection.'], exercises: ['make_abba'], challenge: 'How could one function print Hello any number of times? Try replacing the separate functions with a parameter.' }),
      section('Functions with Parameters · CodeHS Unit 5',
        'A parameter is a named input in a function definition. An argument is the actual value passed when the function is called. Parameters make one function useful with different data.',
        { code: 'def greet(name):\n    print(\"Hello\", name)\n\ngreet(\"Jordan\")\ngreet(\"Avery\")\n\ndef introduce(name, grade):\n    print(name, \"is in grade\", grade)\n\n# Repeated version: identify the repeated setup.\nx = 30\ny = 50\nradius = 40\ncirc = Circle(radius)\ncirc.set_position(x, y)\ncirc.set_color(Color.red)\nadd(circ)\n\nx = 100\ny = 100\nradius = 60\ncirc = Circle(radius)\ncirc.set_position(x, y)\ncirc.set_color(Color.green)\nadd(circ)\n\n# Refactored version: one function, different arguments.\ndef draw_circle(radius, color, x, y):\n    circ = Circle(radius)\n    circ.set_position(x, y)\n    circ.set_color(color)\n    add(circ)\n\ndraw_circle(40, Color.red, 30, 50)\ndraw_circle(60, Color.green, 100, 100)', walkthrough: 'name, grade, radius, color, x, and y are parameters. Values such as \"Jordan\", 10, 40, and Color.red are arguments. draw_circle replaces the repeated setup code while still creating two different circles.', tasks: ['Before reading the refactored code, identify the repeated circle setup steps. Then explain how the parameters change each circle.', 'Call greet with at least two names and write your own two-parameter function.', 'Complete CodeHS Unit 5: Functions and Parameters by the end of Week 10.', 'Complete the matching journal entry.'], quickCheck: { prompt: 'In draw_circle(40, Color.red, 30, 50), which value is passed to the color parameter?', options: ['40', 'Color.red', '30'], correct: 1, explanation: 'Arguments are matched to parameters from left to right, so Color.red is the second argument for color.' }, exercises: ['rotate_left3'] }),
      section('Functions with Return Values · CodeHS Unit 5',
        'A return statement sends a result back to the caller. Functions can return a String, integer, float, or Boolean. A returned result can be stored, displayed, compared, or passed to another function.',
        { code: 'def double(x):\n    return 2 * x\n\nnumber = int(input(\"Enter a number: \"))\ntwice = double(number)\nfor i in range(twice):\n    print(\"hello\")', walkthrough: 'double returns a value; it does not just print one. The caller stores that returned value in twice, then range(twice) controls how many times the loop prints hello.', tasks: ['Write one function that returns a String, integer, float, and Boolean.', 'Run double with several inputs and predict how many times hello prints.', 'Complete CodeHS Unit 5: Functions and Parameters by the end of Week 10.', 'Explain the difference between print and return in your journal.'], quickCheck: { prompt: 'What is stored in twice when the user enters 4?', options: ['The text \"8\"', 'The integer 8', 'Nothing, because double only prints'], correct: 1, explanation: 'double returns the integer 8, and the assignment stores that return value in twice.' }, exercises: ['rotate_left3'] }),
      section('Returning a Float · CodeHS Unit 5',
        'A function can return a decimal value when the calculation produces one. In Python, the / operator returns a float, even when the division is even.',
        { code: 'def average(total, count):\n    return total / count\n\nclass_average = average(85, 2)\nprint(class_average)', walkthrough: 'average returns 42.5, and the assignment stores that float in class_average for later use.', tasks: ['Call average with different totals and counts.', 'Store the returned value, then use it in a print statement.', 'Explain why the returned value is a float.'] }),
      section('Saving Return Values · CodeHS Unit 5',
        'Store a function result with an assignment such as variable = function_name(). The function runs first; then its returned value is assigned to the variable. You can use the saved value later.',
        { code: 'def greet():\n    return \"Welcome to AP CSP\"\n\nmessage = greet()\nprint(message)', walkthrough: 'greet() returns a String. The assignment saves that String in message, and print uses the saved value.', tasks: ['Store a function result in a variable.', 'Use that variable in a later print statement.', 'Explain the difference between print and return in your journal.'] }),
      section('Global and Local Variables · CodeHS Unit 5',
        'A local variable is created inside a function and is available only in that function. A global variable is created outside functions and can be read throughout the program. Prefer parameters and return values for sharing data because they make dependencies explicit.',
        { code: 'elapsed_seconds = 0\nrunning = True\n\ndef update_clock(should_run):\n    global elapsed_seconds, running\n    running = should_run\n    if running:\n        elapsed_seconds += 1\n    display_time = f\"{elapsed_seconds // 60:02}:{elapsed_seconds % 60:02}\"\n    return display_time\n\ncurrent_time = update_clock(True)', walkthrough: 'elapsed_seconds and running are global variables; global lets the function update them. should_run is a parameter local to the function, and display_time is a local variable created inside it. update_clock returns a formatted clock value.', tasks: ['Identify the global variables and the local parameter/variable in the clock example.', 'Call update_clock(True) and update_clock(False); describe how elapsed time changes.', 'Complete CodeHS Unit 5: Functions and Parameters by the end of Week 10.', 'Compare local and global scope in your journal.'], quickCheck: { prompt: 'Which name is local to update_clock?', options: ['elapsed_seconds', 'running', 'display_time'], correct: 2, explanation: 'display_time is assigned inside update_clock and is not declared global or passed in as a parameter.' }, challenge: 'Modify the clock so it accepts a number of seconds as an argument and returns the updated display.' }),
      section('Try and Except',
        'try runs statements that might fail. except handles a matching error so the program can respond instead of stopping unexpectedly. Keep the try block focused, and give users a clear recovery path.',
        { code: '# Without handling: invalid text causes ValueError\nage = int(input(\"Enter your age: \"))\n\n# With handling:\ntry:\n    age = int(input(\"Enter your age: \"))\n    print(\"Next year you will be\", age + 1)\nexcept ValueError:\n    print(\"Please enter a whole number, such as 15.\")', walkthrough: 'If the input can be converted to an integer, the program prints the next age. If conversion raises ValueError, the except block explains how to try again.', tasks: ['Compare the handled and unhandled programs.', 'Write a safe numeric-input activity.', 'Test valid and invalid input and record what happened.'], challenge: 'Modify the program to ask again after invalid input and explain how the user can recover.' }),
      section('Big Idea 2 · Data and Information',
        'Data is information represented in a form a computer can store and process. Big Idea 2 connects the way data is represented, compressed, extracted, and used to make decisions.',
        { bigIdea: true, tasks: ['For each indented topic below, watch its assigned short video and complete the related AP Classroom MCQ by November 6.', 'Complete the related CodeHS Unit 8: Digital Information work.', 'Record key vocabulary and a weekly reflection.'] }),
      section('Binary Numbers Activity',
        'Binary is a base-2 number system that uses the digits 0 and 1. Each place represents a power of 2. To convert a decimal value, decompose it into powers of 2 and mark the corresponding places with 1.',
        { subtopic: true, code: 'Decimal 13 = 8 + 4 + 1\nPlace values: 8  4  2  1\nBinary:      1  1  0  1  = 1101', walkthrough: '13 contains 8, 4, and 1 but not 2, so its four-bit representation is 1101.', tasks: ['Watch the assigned short video, then complete the Binary Numbers MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Convert at least five decimal values to binary: 6, 10, 19, 25, and 42; show place values and check by converting back.'], quickCheck: { prompt: 'What is decimal 13 in binary?', options: ['1011', '1101', '1110'], correct: 1, explanation: '13 = 8 + 4 + 1, so the 8, 4, 2, 1 place values are 1, 1, 0, 1.' } }),
      section('Data Compression',
        'Compression represents data using fewer bits. Lossless compression preserves every original detail; lossy compression removes some detail to reduce file size. The appropriate choice depends on the data and how it will be used.',
        { subtopic: true, tasks: ['Watch the assigned short video, then complete the Data Compression MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Compare a compressed file with its uncompressed version and describe a suitable use for lossless and lossy compression.'], quickCheck: { prompt: 'Which type of compression preserves all original data?', options: ['Lossless', 'Lossy', 'Both always remove details'], correct: 0, explanation: 'Lossless compression reduces file size while preserving all original information.' } }),
      section('Extracting Information from Data',
        'A dataset is a collection of related observations. Organize or visualize its values, look for patterns and trends, and support conclusions with evidence. A pattern does not automatically prove what caused it.',
        { subtopic: true, tasks: ['Watch the assigned short video, then complete the Extracting Information from Data MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Use a small, teacher-approved dataset to identify a pattern and support one conclusion with evidence and a limitation.'], quickCheck: { prompt: 'What should support a conclusion drawn from a dataset?', options: ['Specific evidence from the data', 'A guess based on one unusual value', 'An unrelated opinion'], correct: 0, explanation: 'A sound conclusion should be supported by relevant data evidence, while noting limitations.' } }),
      section('Using Programs with Data',
        'Programs can use data to personalize recommendations, organize information, and support decisions. Services such as Spotify, Netflix, and YouTube use data to help recommend content; school information systems organize academic and operational records.',
        { subtopic: true, tasks: ['Watch the assigned short video, then complete the Using Programs with Data MCQ in AP Classroom by November 6.', 'Complete the related CodeHS Unit 8: Digital Information lesson.', 'Describe an input dataset, how a program uses it, and a resulting output or decision; include one benefit and one concern.'], quickCheck: { prompt: 'A recommendation program uses listening history to suggest songs. What is the listening history?', options: ['Input data', 'The program output', 'A compression method'], correct: 0, explanation: 'The listening history is data provided to the program; suggested songs are a possible output.' } }),
      section('Why Data Matters',
        'Data can help people notice patterns, make informed decisions, and improve services. It can also be incomplete, inaccurate, biased, or sensitive. Responsible computing considers who collected the data, who benefits, who may be harmed, and how privacy is protected.',
        { subtopic: true, tasks: ['Complete the related CodeHS Unit 8: Digital Information work.', 'Give an example of a data-supported decision and identify a limitation, privacy concern, or risk of bias.', 'Explain how to check whether a data-based conclusion is fair and well supported.'] })
    ],
    checklist: ['Complete Unit 5 in CodeHS lesson and journal entry: Functions', 'Complete Unit 5 in CodeHS lesson and journal entry: Parameters', 'Complete Unit 5 in CodeHS lesson and journal entry: Return Values', 'Complete Unit 5 in CodeHS lesson and journal entry: Local and Global Scope', 'Big Idea 2 short videos watched and related AP Classroom MCQs completed by November 6', 'CodeHS Unit 8: Digital Information completed', 'Vocabulary recorded', 'Weekly reflection completed'],
    journalName: 'Coding Bootcamp Survival Journal'
  },
  {
    id: 'ist-csp',
    asideExamples: true,
    code: 'Intro to Software Technology / CSP',
    short: 'IST / CSP',
    subtitle: 'Canvas Short-Term Project · Build a Portfolio',
    theme: 'Build a portfolio of your first eight weeks',
    resources: ['canvas', 'codehs'],
    resourceNote: 'Also revisit previous CodeHS units, notes, assignments, focus notes, and completed projects. Use your Student Learning Journal to plan and reflect.',
    practice: 'Create a portfolio titled My first 8 weeks in Computer Science. Use your work from the first eight weeks to show what you learned, practice basic HTML and CSS, and submit the finished portfolio to the Canvas Short-Term Project assignment: Build a Portfolio.',
    sections: [
      section('Project Overview and Prior Learning',
        'Build a CodeHS.me website that demonstrates your learning and basic web design skills. Revisit Digital Citizenship, Cyber Hygiene, Hardware, Software, Operating Systems, HTML, and CSS. Use your prior lessons, notes, assignments, and projects as references.',
        { tasks: ['Open the Canvas Short-Term Project assignment named Build a Portfolio.', 'Gather your learning resources, notes, and examples from the first eight weeks.', 'Plan the portfolio layout before building it.'] }),
      section('CodeHS Sandbox Setup',
        'Build the project in the CodeHS Sandbox. Select HTML > WebDev, then name your program before you begin.',
        { tasks: ['Open the CodeHS Sandbox.', 'Select HTML > WebDev.', 'Give your program a clear name.'] }),
      section('My first 8 weeks in Computer Science · Required Header and Styling',
        'Build a portfolio titled My first 8 weeks in Computer Science. Its header must include the project title, student name, course name, school name, school year, and a project description. Demonstrate headings, paragraphs, fonts, colors, background styling, and CSS formatting.',
        { code: '<h1>My first 8 weeks in Computer Science</h1>\n<h2>About Me</h2>\n<p>In this portfolio, I will share what I learned.</p>\n\n<style>\n  body { font-family: Arial, sans-serif; background-color: #eef5ff; }\n  h1 { color: #245a9b; }\n</style>', walkthrough: 'Use h1 for the page title and h2 for a section heading. Put text in p elements. CSS rules select an element and set properties such as color and background-color.', tasks: ['Add the title, student name, course name, school name, school year, and project description.', 'Use semantic headings and readable paragraphs.', 'Apply intentional fonts, colors, background styling, and CSS formatting.'] }),
      section('HTML and CSS Syntax Quick Reference',
        'Use these examples as reminders while building each portfolio section. Keep HTML structure in the page and use CSS rules to control its presentation.',
        { code: '<!-- Image with alternative text -->\n<img src=\"images/project.png\" alt=\"Screenshot of my project\">\n\n<!-- Link, unordered list (order does not matter), ordered list (order matters) -->\n<a href=\"https://example.com\">View my source</a>\n<ul><li>What I learned</li><li>What I can build</li></ul>\n<ol><li>First choice career</li><li>Second choice career</li></ol>\n\n<!-- Table structure -->\n<table>\n  <tr><th>Week</th><th>Learning</th></tr>\n  <tr><td>1</td><td>Digital citizenship</td></tr>\n</table>\n\n<style>\n  body { font-family: Arial, sans-serif; }\n  img { max-width: 100%; }\n  table { border-collapse: collapse; }\n  th, td { border: 1px solid #334; padding: 8px; }\n</style>', walkthrough: 'Use descriptive alt text for images, meaningful link text, list items for lists, and th/td cells in tables. CSS selectors (such as img or th, td) apply the declarations inside their braces.', tasks: ['Use the HTML examples as you build the heading, image, link, list, and table checklist items.', 'Use the CSS examples to style fonts, images, and table borders.'] }),
      section('Learning Journey Table',
        'Create a table with at least eight rows. Each row documents a week or topic and includes a description and an example image. Suggested topics: Digital Citizenship, Cyber Hygiene, Hardware, Software, Operating Systems, HTML, CSS, and Current Learning.',
        { example: 'journey', table: {
          headers: ['Week', 'Topic', 'Description', 'Example Image'],
          rows: [
            ['1', 'Digital Citizenship', 'Add a summary of your learning.', 'Add a cited image'],
            ['2', 'Cyber Hygiene', 'Add a summary of your learning.', 'Add a cited image'],
            ['3', 'Hardware', 'Add a summary of your learning.', 'Add a cited image'],
            ['4', 'Software', 'Add a summary of your learning.', 'Add a cited image'],
            ['5', 'Operating Systems', 'Add a summary of your learning.', 'Add a cited image'],
            ['6', 'HTML', 'Add a summary of your learning.', 'Add a cited image'],
            ['7', 'CSS', 'Add a summary of your learning.', 'Add a cited image'],
            ['8', 'Current Learning', 'Add a summary of your learning.', 'Add a cited image']
          ]
        }, tasks: ['Create columns for Week, Topic, Description, and Example Image.', 'Customize at least eight meaningful rows.', 'Cite every image in AMA format: include creator/organization, image title or description, site, publication/update date when available, URL, and access date. Follow your teacher’s citation example.'] }),
      section('Career Exploration',
        'Research at least three technology careers. Use current, credible sources for salary and education information; salaries vary by location, experience, and source. Do not copy a number without recording where and when you found it.',
        { example: 'careers', code: '<h2>Career Exploration</h2>\n<p>Careers I researched, ranked from most to least interesting:</p>\n<ol>\n  <li>Test Automation Engineer</li>\n  <li>Data Network Engineer</li>\n  <li>Electronic Engineer</li>\n</ol>\n\n<h3>Test Automation Engineer</h3>\n<img src=\"images/test-automation.jpg\" alt=\"Engineer reviewing automated test results\">\n<p>Creator. Image title. Website name. Date. URL. Accessed date.</p>\n<p>Technical skills:</p>\n<ul>\n  <li>Programming</li>\n  <li>Test frameworks</li>\n</ul>\n<p>Source: <a href=\"https://www.bls.gov/ooh/\">U.S. Bureau of Labor Statistics</a></p>', walkthrough: 'Use an ordered list (ol) when order matters, such as ranking careers from most to least interesting. Use an unordered list (ul) when order does not matter, such as skills. Every career needs an image with alt text and an AMA citation, and a link (a href) to the source you used.', table: {
          headers: ['Career', 'Description', 'Average salary', 'Technical skills', 'Soft skills'],
          rows: [
            ['Web Developer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.'],
            ['Front-End Developer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.'],
            ['Software Developer or UI/UX Designer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.']
          ]
        }, tasks: ['Add a Career Exploration section to your portfolio page; it is required, not optional.', 'Research at least three careers (for example, Web Developer, Front-End Developer, Software Developer, or UI/UX Designer).', 'Complete the table with career, description, average salary, technical skills, and soft skills.', 'Use an ordered list (ol) to rank your careers from most to least interesting.', 'Use an unordered list (ul) for each career’s technical skills and soft skills.', 'Include one image per career with alt text and an AMA citation.', 'Add a working link (a href) to the source of each career and salary; use credible sources such as the U.S. Bureau of Labor Statistics and O*NET and record citation details.', 'Answer: Which career interests you most and why?'] }),
      section('References and Build Workflow',
        'Cite images, career sources, salary sources, and other research sources. Use the citation format required by your teacher and make each reference traceable.',
        { tasks: ['Review previous learning and gather notes and resources.', 'Gather suitable images and record citations before adding them.', 'Plan the layout, build the HTML structure, then apply CSS styling.', 'Complete the career section and references section.', 'Test every link, image, table, and page section before submitting.'] }),
      section('Ready for the Next Step? · CodeHS Unit 10',
        'After the Build a Portfolio assignment is complete, properly styled, and includes the required tables, images, references, and career exploration content, you may begin CodeHS Unit 10: JavaScript and Graphics.',
        { tasks: ['Portfolio completion check: title and required header are present.', 'Portfolio completion check: CSS styling and the eight-row learning table are complete.', 'Portfolio completion check: images are cited, career exploration is complete, and references are included.', 'Preview: variables store values; user input gathers information; events respond to actions; graphics draw visual elements; interactive programming combines these ideas.'] })
    ],
    checklist: ['Portfolio title: My first 8 weeks in Computer Science', 'Student name, course, school, year, and project description', 'HTML headings and readable paragraphs', 'CSS fonts, colors, and background styling', 'Learning table with at least eight rows', 'Images with descriptive alt text and AMA citations', 'Career Exploration section included in the portfolio page with at least three careers', 'Career table: description, salary, technical skills, and soft skills', 'Ordered list (ol) ranking careers and unordered lists (ul) for skills', 'Each career has an image with alt text and an AMA citation', 'Each career has a working link to its source', 'References and Canvas submission']
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
  const sectionId = `${course.id}-section-${sectionIndex}`;
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
    const id = `${course.id}-journal-${key}`;
    const value = state.notes[id] || '';
    return `<div class="journal-field"><label for="${id}">${label}</label><textarea id="${id}" data-note="${id}" placeholder="${escapeHTML(hint)}">${escapeHTML(value)}</textarea></div>`;
  }).join('');
  const understandingId = `${course.id}-journal-understanding`;
  const selected = state.notes[understandingId] || '';
  const radios = [1, 2, 3, 4, 5].map(value =>
    `<label><input type="radio" name="${understandingId}" value="${value}" data-note="${understandingId}"${selected === String(value) ? ' checked' : ''}> ${value}</label>`).join('');
  return `<section class="panel" aria-labelledby="${course.id}-journal-title"><h2 id="${course.id}-journal-title">${escapeHTML(course.journalName || 'Student Learning Journal')}</h2><p>Use your journal to capture what you understand, what you are still practicing, and what you will try next.</p>${textareas}<div class="journal-field"><span class="journal-label">Understanding level (1–5)</span><div class="scale" role="radiogroup" aria-label="Understanding level">${radios}</div></div></section>`;
}

function courseMarkup(course) {
  const page = document.getElementById(`${course.id}-page`);
  const unitSections = course.sections.map((item, index) => sectionMarkup(course, item, index)).join('');
  const checklist = course.checklist.map((item, index) => checkRow(`${course.id}-checklist-${index}`, item)).join('');
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