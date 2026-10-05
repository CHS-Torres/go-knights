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
        { code: 'int total = 0;\nfor (int score : scores) {\n    if (score >= 70) {\n        total += score;\n    }\n}', walkthrough: 'The loop visits each score. The if statement selects only passing scores, and total accumulates those values. Together, selection and repetition express an algorithm.', tasks: ['Review the example and trace total after each loop iteration.', 'Complete CodeHS Unit 2.1.', 'Complete the listed CodingBat exercises.', 'Update your journal and reflect on a challenge.'], exercises: ['sleepIn', 'monkeyTrouble', 'sumDouble', 'parrotTrouble'] }),
      section('Unit 2.2 · Boolean Expressions',
        'A Boolean expression evaluates to exactly true or false. Comparison operators include ==, !=, <, >, <=, and >=. Logical operators &&, ||, and ! combine or reverse Boolean values; use parentheses to make complex reasoning easier to read.',
        { code: 'int temperature = 24;\nboolean isWarm = temperature >= 20;\nboolean canSwim = isWarm && !isRaining;', walkthrough: 'The comparison assigns true to isWarm when the temperature is at least 20. The final expression is true only when it is warm and it is not raining.', tasks: ['Predict each expression before evaluating it.', 'Complete CodeHS Unit 2.2.', 'Practice the listed CodingBat Boolean exercises.', 'Record one example of a Boolean expression in your journal.'], exercises: ['posNeg', 'in1020', 'loneTeen'] }),
      section('Unit 2.3 · If Statements',
        'An if statement runs a block only when its condition is true. Add else for the alternative path. Conditional execution lets a program respond differently to data or events.',
        { code: 'if (lives > 0) {\n    System.out.println(\"Keep playing!\");\n} else {\n    System.out.println(\"Game over\");\n}', walkthrough: 'Java evaluates lives > 0 first. Exactly one branch runs: the if branch when the condition is true, otherwise the else branch.', tasks: ['Review the lesson and trace both possible outcomes.', 'Complete CodeHS Unit 2.3.', 'Try the listed CodingBat exercises and explain one decision in your journal.'], exercises: ['mixStart', 'intMax', 'close10'], challenge: 'Write an if/else statement that prints \"Even\" or \"Odd\" based on an integer.' }),
      section('Unit 2.4 · Nested If Statements',
        'A nested decision places an if statement inside another if or else block. It is useful when the second question should only be asked after the first condition is met. Keep indentation consistent and consider whether conditions can be combined clearly.',
        { code: 'if (hasTicket) {\n    if (age >= 13) {\n        System.out.println(\"Enter the event\");\n    } else {\n        System.out.println(\"Ask an adult\");\n    }\n} else {\n    System.out.println(\"Get a ticket first\");\n}', walkthrough: 'The program checks for a ticket first. Only ticket holders reach the age decision, so the second condition is nested inside the first branch.', tasks: ['Trace the result for all combinations of ticket status and age.', 'Complete CodeHS Unit 2.4.', 'Complete the exercises and reflect on when a nested decision is useful.'], exercises: ['dateFashion', 'squirrelPlay', 'caughtSpeeding', 'sortaSum', 'alarmClock'], challenge: 'Design a decision tree for unlocking a game level: the player needs enough experience and a key.' })
    ],
    checklist: ['CodeHS lessons completed', 'CodingBat practice completed', 'Journal updated', 'Vocabulary recorded', 'Weekly reflection completed'],
    extra: 'frq'
  },
  {
    id: 'ap-csp',
    code: 'AP Computer Science Principles',
    short: 'AP CSP',
    subtitle: 'Coding Bootcamp Survival Guide · Unit 5 and Big Idea 2',
    theme: 'Practice makes progress',
    resources: ['canvas', 'codehs', 'apClassroom', 'codingbatPython'],
    resourceNote: 'Use your Coding Bootcamp Survival Journal, previous notes, and previous assignments. AP Classroom may be used when your teacher assigns an assessment.',
    practice: 'Programming is learned through repetition, experimentation, debugging, and reflection. Aim to practice Python for 20–30 minutes per day: review a lesson, complete the matching CodeHS work, practice, and then update your journal.',
    sections: [
      section('Functions',
        'A function is a named, reusable group of instructions. In Python, def starts a function definition. Defining a function does not run it; calling its name followed by parentheses runs its body.',
        { code: 'def greet():\n    print(\"Welcome to AP CSP\")\n\ngreet()\ngreet()\ngreet()', walkthrough: 'The definition stores the instructions under the name greet. Each call runs the print statement once.', tasks: ['Review the example and call greet three times.', 'Complete the corresponding CodeHS lesson.', 'Complete the listed CodingBat Python practice.', 'Update your journal and reflection.'], exercises: ['make_abba'], challenge: 'Modify the greeting so it welcomes students to your course and gives them an encouraging message.' }),
      section('Functions with Parameters',
        'A parameter is a named input in a function definition. An argument is the actual value passed when the function is called. Parameters make one function useful with different data.',
        { code: 'def greet(name):\n    print(\"Hello\", name)\n\ngreet(\"Jordan\")\ngreet(\"Avery\")\n\ndef introduce(name, grade):\n    print(name, \"is in grade\", grade)', walkthrough: 'name and grade are parameters. \"Jordan\", \"Avery\", and 10 are arguments supplied by a caller.', tasks: ['Call greet with at least two names.', 'Write and call introduce(name, grade) using school-related information.', 'Complete the matching CodeHS lesson and journal entry.'], exercises: ['rotate_left3'] }),
      section('Functions with Return Values',
        'A return statement sends a result back to the caller. Functions can return a String, integer, float, or Boolean. A returned result can be stored, displayed, compared, or passed to another function.',
        { code: 'def welcome(name):\n    return \"Welcome, \" + name\n\ndef add_points(score, points):\n    return score + points\n\ndef is_passing(score):\n    return score >= 70', walkthrough: 'welcome returns a String, add_points returns an integer, and is_passing returns a Boolean. The caller decides what to do with each result.', tasks: ['Write one function that returns a String, integer, float, and Boolean.', 'Complete the corresponding CodeHS lesson.', 'Practice returning values and note how each result is used.'], exercises: ['rotate_left3'] }),
      section('Returning a Float',
        'A function can return a decimal value when the calculation produces one. In Python, the / operator returns a float, even when the division is even.',
        { code: 'def average(total, count):\n    return total / count\n\nclass_average = average(85, 2)\nprint(class_average)', walkthrough: 'average returns 42.5, and the assignment stores that float in class_average for later use.', tasks: ['Call average with different totals and counts.', 'Store the returned value, then use it in a print statement.', 'Explain why the returned value is a float.'] }),
      section('Saving Return Values',
        'Store a function result with an assignment such as variable = function_name(). The function runs first; then its returned value is assigned to the variable. You can use the saved value later.',
        { code: 'def greet():\n    return \"Welcome to AP CSP\"\n\nmessage = greet()\nprint(message)', walkthrough: 'greet() returns a String. The assignment saves that String in message, and print uses the saved value.', tasks: ['Store a function result in a variable.', 'Use that variable in a later print statement.', 'Explain the difference between print and return in your journal.'] }),
      section('Global and Local Variables',
        'A local variable is created inside a function and is available only in that function. A global variable is created outside functions and can be read throughout the program. Prefer parameters and return values for sharing data because they make dependencies explicit.',
        { code: 'score = 0\nelapsed_seconds = 0\nrunning = True\n\ndef award_points(points):\n    updated_score = score + points  # local variable\n    return updated_score', walkthrough: 'score, elapsed_seconds, and running are global names. updated_score is local to award_points. The function returns the changed value rather than silently changing global state.', tasks: ['Identify each local and global variable in the example.', 'Create a teacher-style example that uses score, elapsed_seconds, and running.', 'Compare scope and reflect on why local variables are useful.'], challenge: 'Change the example to accept score as a parameter and return the updated score. Explain how this reduces reliance on global state.' }),
      section('Try and Except',
        'try runs statements that might fail. except handles a matching error so the program can respond instead of stopping unexpectedly. Keep the try block focused, and give users a clear recovery path.',
        { code: '# Without handling: invalid text causes ValueError\nage = int(input(\"Enter your age: \"))\n\n# With handling:\ntry:\n    age = int(input(\"Enter your age: \"))\n    print(\"Next year you will be\", age + 1)\nexcept ValueError:\n    print(\"Please enter a whole number, such as 15.\")', walkthrough: 'If the input can be converted to an integer, the program prints the next age. If conversion raises ValueError, the except block explains how to try again.', tasks: ['Compare the handled and unhandled programs.', 'Write a safe numeric-input activity.', 'Test valid and invalid input and record what happened.'], challenge: 'Modify the program to ask again after invalid input and explain how the user can recover.' }),
      section('Big Idea 2 · Data and Information',
        'Data is information represented in a form a computer can store and process. Big Idea 2 connects the way data is represented, compressed, extracted, and used to make decisions.',
        { tasks: ['Review the visual roadmap: binary representation → compression → extracting patterns → using programs with data → decisions and impact.', 'Complete the CodeHS Big Idea 2 activities assigned for your class.', 'Record key vocabulary and a weekly reflection.'] }),
      section('Binary Numbers Activity',
        'Binary is a base-2 number system that uses the digits 0 and 1. Each place represents a power of 2. To convert a decimal value, decompose it into powers of 2 and mark the corresponding places with 1.',
        { code: 'Decimal 13 = 8 + 4 + 1\nPlace values: 8  4  2  1\nBinary:      1  1  0  1  = 1101', walkthrough: '13 contains 8, 4, and 1 but not 2, so its four-bit representation is 1101.', tasks: ['Convert at least five decimal values to binary: 6, 10, 19, 25, and 42.', 'Show place values or repeated division for each answer.', 'Check each conversion by converting back to decimal.'] }),
      section('Data Compression',
        'Compression represents data using fewer bits. Lossless compression preserves every original detail; lossy compression removes some detail to reduce file size. The appropriate choice depends on the data and how it will be used.',
        { tasks: ['Compare a compressed file with its uncompressed version using file size and what information is preserved.', 'Describe one suitable use for lossless compression and one for lossy compression.', 'Reflect: Why is compression important when storing or sending data?'] }),
      section('Extracting Information from Data',
        'A dataset is a collection of related observations. Organize or visualize its values, look for patterns and trends, and support conclusions with evidence. A pattern does not automatically prove what caused it.',
        { tasks: ['Choose a small, teacher-approved dataset.', 'Identify at least one pattern and one trend.', 'Write a conclusion supported by specific data and note one limitation.'] }),
      section('Using Programs with Data',
        'Programs can use data to personalize recommendations, organize information, and support decisions. Services such as Spotify, Netflix, and YouTube use data to help recommend content; school information systems organize academic and operational records.',
        { tasks: ['Research how Spotify, Netflix, YouTube, or a school information system uses data.', 'Describe the input data, how a program might use it, and the possible output or decision.', 'Reflect: How does data influence decisions? Include one benefit and one concern.'] }),
      section('Why Data Matters',
        'Data can help people notice patterns, make informed decisions, and improve services. It can also be incomplete, inaccurate, biased, or sensitive. Responsible computing considers who collected the data, who benefits, who may be harmed, and how privacy is protected.',
        { tasks: ['Give an example of a useful decision supported by data.', 'Identify one limitation, privacy concern, or risk of bias.', 'Explain how a person could check whether a data-based conclusion is fair and well supported.'] })
    ],
    checklist: ['CodeHS lesson completed', 'CodingBat Python practice completed', 'Functions practice completed', 'Parameters practice completed', 'Return values practice completed', 'Global variables practice completed', 'Try and except practice completed', 'Big Idea 2 activities completed', 'Vocabulary recorded', 'Weekly reflection completed'],
    journalName: 'Coding Bootcamp Survival Journal'
  },
  {
    id: 'ist-csp',
    code: 'Intro to Software Technology / CSP',
    short: 'IST / CSP',
    subtitle: 'CodeHS Unit 9.1 · Create Your Own CodeHS.me Website',
    theme: 'Build a portfolio of your first eight weeks',
    resources: ['canvas', 'codehs'],
    resourceNote: 'Also revisit previous CodeHS units, notes, assignments, focus notes, and completed projects. Use your Student Learning Journal to plan and reflect.',
    practice: 'Students with an approved personal website idea may build it. Freshmen and students without an approved idea should complete the default project: My First 8 Weeks in Computer Science.',
    sections: [
      section('Project Overview and Prior Learning',
        'Build a CodeHS.me website that demonstrates your learning and basic web design skills. Revisit Digital Citizenship, Cyber Hygiene, Hardware, Software, Operating Systems, HTML, and CSS. Use your prior lessons, notes, assignments, and projects as references.',
        { tasks: ['Confirm with your teacher whether your personal website idea is approved; otherwise use the default project.', 'Gather your previous learning resources and notes.', 'Plan the website layout before building it.'] }),
      section('CodeHS Sandbox Setup',
        'Build the project in the CodeHS Sandbox. Select HTML > WebDev, then name your program before you begin.',
        { tasks: ['Open the CodeHS Sandbox.', 'Select HTML > WebDev.', 'Give your program a clear name.'] }),
      section('Default Website · Required Header and Styling',
        'The default project is titled My First 8 Weeks in Computer Science. Its header must include the project title, student name, course name, school name, school year, and a project description. Demonstrate headings, paragraphs, fonts, colors, background styling, and CSS formatting.',
        { tasks: ['Add all six required header details.', 'Use semantic headings and readable paragraphs.', 'Apply intentional fonts, colors, background styling, and CSS formatting.'] }),
      section('Learning Journey Table',
        'Create a table with at least eight rows. Each row documents a week or topic and includes a description and an example image. Suggested topics: Digital Citizenship, Cyber Hygiene, Hardware, Software, Operating Systems, HTML, CSS, and Current Learning.',
        { table: {
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
        { table: {
          headers: ['Career', 'Description', 'Average salary', 'Technical skills', 'Soft skills'],
          rows: [
            ['Web Developer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.'],
            ['Front-End Developer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.'],
            ['Software Developer or UI/UX Designer', 'Research and summarize.', 'Research and cite.', 'Research.', 'Research.']
          ]
        }, tasks: ['Research at least three careers (for example, Web Developer, Front-End Developer, Software Developer, or UI/UX Designer).', 'Complete the table with career, description, average salary, technical skills, and soft skills.', 'Use credible sources such as the U.S. Bureau of Labor Statistics and O*NET; record citation details.', 'Answer: Which career interests you most and why?'] }),
      section('References and Build Workflow',
        'Cite images, career sources, salary sources, and other research sources. Use the citation format required by your teacher and make each reference traceable.',
        { tasks: ['Review previous learning and gather notes and resources.', 'Gather suitable images and record citations before adding them.', 'Plan the layout, build the HTML structure, then apply CSS styling.', 'Complete the career section and references section.', 'Test every link, image, table, and page section before submitting.'] }),
      section('Ready for the Next Step? · CodeHS Unit 10',
        'If Unit 9.1 is complete, properly styled, and includes all required tables, images, references, and career exploration content, you may begin CodeHS Unit 10: JavaScript and Graphics.',
        { tasks: ['Unit 9 completion check: title and required header are present.', 'Unit 9 completion check: CSS styling and the eight-row learning table are complete.', 'Unit 9 completion check: images are cited, career exploration is complete, and references are included.', 'Preview: variables store values; user input gathers information; events respond to actions; graphics draw visual elements; interactive programming combines these ideas.'] })
    ],
    checklist: ['Title', 'Student name', 'Project description', 'CSS styling', 'Learning table with at least eight rows', 'Images with AMA citations', 'Career table with at least three careers', 'References']
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

let state = { checks: {}, notes: {}, open: {} };
const coursePageId = document.body.dataset.coursePage || null;

const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const resourceAnchor = key => {
  const [label, url] = resources[key];
  return `<a class="resource-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(label)}</a>`;
};

function emptyState() {
  return { checks: {}, notes: {}, open: {} };
}

function parseState(saved) {
  if (!saved) return emptyState();
  const parsed = JSON.parse(saved);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('Saved progress has an unexpected format.');
  return {
    checks: parsed.checks && typeof parsed.checks === 'object' ? parsed.checks : {},
    notes: parsed.notes && typeof parsed.notes === 'object' ? parsed.notes : {},
    open: parsed.open && typeof parsed.open === 'object' ? parsed.open : {}
  };
}

function legacyCourseState(courseId, legacy) {
  const prefix = `${courseId}-`;
  const checks = Object.fromEntries(Object.entries(legacy.checks).filter(([id]) => id.startsWith(prefix) || (courseId === 'ap-csa' && id === 'ap-csa-frq-complete')));
  const notes = Object.fromEntries(Object.entries(legacy.notes).filter(([id]) => id.startsWith(prefix)));
  const open = Object.fromEntries(Object.entries(legacy.open).filter(([id]) => id.startsWith(prefix)));
  return { checks, notes, open };
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

function sectionMarkup(course, item, sectionIndex) {
  const sectionId = `${course.id}-section-${sectionIndex}`;
  const open = state.open[sectionId] === true;
  const catalog = course.id === 'ap-csa' ? javaExercises : pythonExercises;
  const exercises = item.exercises ? exerciseList(item.exercises, catalog) : '';
  const tasks = (item.tasks || []).map((task, taskIndex) =>
    checkRow(`${sectionId}-task-${taskIndex}`, task)).join('');
  const prompts = item.prompts ? `<h4>Journal prompts</h4><ul>${item.prompts.map(prompt => `<li>${escapeHTML(prompt)}</li>`).join('')}</ul>` : '';
  const reflection = item.reflection ? `<h4>Reflection question</h4><p>${escapeHTML(item.reflection)}</p>` : '';
  const challenge = item.challenge ? `<h4>Challenge activity</h4><p>${escapeHTML(item.challenge)}</p>` : '';
  const code = item.code ? `<h4>Teacher example</h4><pre><code>${escapeHTML(item.code)}</code></pre>` : '';
  const walkthrough = item.walkthrough ? `<h4>Code walkthrough</h4><p>${escapeHTML(item.walkthrough)}</p>` : '';
  const table = item.table ? `<div class="table-wrap"><table><thead><tr>${item.table.headers.map(header => `<th scope="col">${escapeHTML(header)}</th>`).join('')}</tr></thead><tbody>${item.table.rows.map(row => `<tr>${row.map(cell => `<td>${escapeHTML(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
  return `<details class="lesson" data-open="${sectionId}"${open ? ' open' : ''}>
    <summary>${escapeHTML(item.title)}</summary>
    <div class="lesson-body"><p>${escapeHTML(item.description)}</p>${code}${walkthrough}${table}${exercises}${challenge}${reflection}${prompts}
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
    </aside>
  </div>`;
}

function frqMarkup() {
  return `<section class="panel"><h2>AP-style practice FRQ · Space Station Supply System</h2>
    <p>A space station tracks its oxygen supply while a crew completes tasks. The station begins with an oxygen level and a reserve flag. Each task consumes oxygen. The system must warn the crew when oxygen becomes low, and it may use reserve oxygen only when the reserve is available.</p>
    <h3>Student tasks</h3><ol>
      <li>Write a method that uses a loop to process an array of oxygen-use values and returns the total used.</li>
      <li>Write a Boolean expression that is true when the remaining oxygen is at or below a warning threshold.</li>
      <li>Use if/else selection to determine whether to display a low-oxygen warning.</li>
      <li>Use a nested if statement to activate the reserve only when oxygen is low and the reserve is available; otherwise report the appropriate status.</li>
      <li>Trace your algorithm with at least two test cases, including a case where the reserve is unavailable.</li>
    </ol>
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
    const value = state.notes[field.dataset.note] || '';
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

  document.addEventListener('change', event => {
    const target = event.target;
    if (target.matches('input[type="checkbox"][data-check]')) {
      state.checks[target.dataset.check] = target.checked;
      updateProgress();
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
        else field.value = '';
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