'use strict';

(() => {
  const STORAGE_KEY = 'centennial-apcsa-unit2-xp-academy-v1';
  const MAX_XP = 300;
  const MISSION_PASS_SCORE = 2;
  const FRQ_VERSION = 2;
  const FRQ_LEVELS = [
    { id: 'bead', title: 'Level 1 · Bead Sequence Analyzer', threshold: 72 },
    { id: 'formatting', title: 'Level 2 · String Formatting Challenge', threshold: 120 },
    { id: 'prefix', title: 'Level 3 · Prefix Search Challenge', threshold: 168 },
    { id: 'digits', title: 'Level 4 · Digit Analyzer', threshold: 216 },
    { id: 'parser', title: 'Level 5 · String Parser', threshold: 252 }
  ];
  const RANKS = [
    { name: 'Novice Coder', min: 0 },
    { name: 'Logic Learner', min: 48 },
    { name: 'Algorithm Apprentice', min: 96 },
    { name: 'Boolean Builder', min: 144 },
    { name: 'Loop Navigator', min: 192 },
    { name: 'String Specialist', min: 240 },
    { name: 'AP CSA Unit 2 Champion', min: 300 }
  ];
  const BADGES = [
    { id: 'boolean', name: 'Boolean Boss', icon: '∧', detail: 'Master Boolean logic and compound expressions.' },
    { id: 'conditional', name: 'Conditional Commander', icon: '⑂', detail: 'Clear the selection and nested decision missions.' },
    { id: 'loop', name: 'Loop Legend', icon: '↻', detail: 'Clear the while-loop and for-loop missions.' },
    { id: 'string', name: 'String Strategist', icon: 'Aa', detail: 'Clear the String Algorithm Lab.' },
    { id: 'debug', name: 'Debugging Detective', icon: '⌕', detail: 'Clear the Debugging Detective mission.' },
    { id: 'frq', name: 'FRQ Finisher', icon: '✎', detail: 'Complete all five FRQ command levels.' },
    { id: 'champion', name: 'AP CSA Champion', icon: '★', detail: 'Pass the Unit 2 Final Challenge.' }
  ];
  const MOTIVATION = [
    'Every AP reader started as a beginner.',
    'Trace first. Code second.',
    'Boolean logic powers every decision.',
    'Debugging is part of programming.',
    'Small improvements create big results.',
    'One challenge at a time.',
    'Loops become easier with practice.',
    'AP CSA champions learn from mistakes.'
  ];
  const MISSIONS = [
    {
      id: 'prerequisite', title: 'Prerequisite Checkpoint', short: 'Variables, assignments, and method calls',
      icon: '01', reward: 12, category: 'FOUNDATIONS',
      briefing: 'Warm up the tools you will use throughout Unit 2: variables, assignment, String methods, and method calls.',
      lessons: [
        '<strong>Assignment updates a variable.</strong> In <code>count = count + 1;</code>, evaluate the right side first, then store the result in <code>count</code>.',
        '<strong>Strings are objects.</strong> Methods such as <code>length()</code> return information; <code>substring(begin, end)</code> includes begin and excludes end.',
        '<strong>Trace one statement at a time.</strong> Keep a small table of each variable after every assignment.'
      ],
      code: 'String word = "knight";\\nint size = word.length();       // 6\\nString part = word.substring(1, 4); // "nig"\\nsize = size + 2;                 // 8'
    },
    {
      id: 'boolean', title: 'Boolean Logic Lab', short: 'Relational operators and truth values',
      icon: '02', reward: 24, category: 'BOOLEAN LOGIC',
      briefing: 'Conditions evaluate to exactly one value: <code>true</code> or <code>false</code>. Compare values before tracing the statements that depend on them.',
      lessons: [
        'Relational operators are <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, and <code>&gt;=</code>. The equality operator is two equals signs.',
        'For primitive values, evaluate the comparison using the actual values. For Strings, use <code>equals</code> to compare contents.',
        'Boundary operators matter: <code>&gt;=</code> includes equality; <code>&gt;</code> does not.'
      ],
      code: 'int points = 80;\\nboolean passed = points >= 70; // true\\nboolean perfect = points == 100; // false'
    },
    {
      id: 'selection', title: 'Selection Challenge', short: 'if statements and execution flow',
      icon: '03', reward: 24, category: 'SELECTION',
      briefing: 'An <code>if</code> statement runs its body only when its Boolean condition is true. Follow the flow before deciding what changes.',
      lessons: [
        'Evaluate the condition first. If it is false, skip the body and continue after the closing brace.',
        'A statement not inside a selected branch does not run. Variables keep their previous values when an assignment is skipped.',
        'Use braces to make the intended body clear, even when there is only one statement.'
      ],
      code: 'int score = 72;\\nif (score >= 70) {\\n    score = score + 5;\\n}\\n// score is now 77'
    },
    {
      id: 'decision', title: 'Decision Maker', short: 'if-else and multiple outcomes',
      icon: '04', reward: 24, category: 'SELECTION',
      briefing: 'An <code>if-else</code> statement chooses exactly one of two paths. Trace both possibilities, then follow the path whose condition is true.',
      lessons: [
        'When the condition is true, the <code>if</code> body runs and the <code>else</code> body is skipped.',
        'When the condition is false, the <code>else</code> body runs instead.',
        'For an <code>if / else if / else</code> chain, Java selects the first true branch and skips the rest.'
      ],
      code: 'int temperature = 18;\\nif (temperature > 20) {\\n    System.out.println("warm");\\n} else {\\n    System.out.println("cool");\\n}'
    },
    {
      id: 'nested', title: 'Nested Decision Workshop', short: 'Nested if statements and decision paths',
      icon: '05', reward: 24, category: 'SELECTION',
      briefing: 'Nested selection adds a second decision inside a branch. The inner condition is reached only when execution enters its surrounding block.',
      lessons: [
        'Read indentation and braces to identify which <code>if</code> owns each <code>else</code>.',
        'An inner condition is not evaluated when the outer branch containing it is skipped.',
        'For nested logic, write down the outer result first, then evaluate only the reachable inner conditions.'
      ],
      code: 'if (isMember) {\\n    if (points >= 100) {\\n        reward = "gold";\\n    } else {\\n        reward = "silver";\\n    }\\n}'
    },
    {
      id: 'compound', title: 'Boolean Expressions Lab', short: '&&, ||, ! and short-circuit logic',
      icon: '06', reward: 36, category: 'BOOLEAN LOGIC',
      briefing: 'Combine conditions to express rules precisely. Parentheses and short-circuit evaluation help you reason through compound expressions.',
      lessons: [
        '<code>A &amp;&amp; B</code> is true only when both operands are true. <code>A || B</code> is true when at least one is true.',
        '<code>!A</code> reverses a Boolean value. Use parentheses to make complex intent easy to read.',
        'Java short-circuits: in <code>A &amp;&amp; B</code>, B is skipped if A is false; in <code>A || B</code>, B is skipped if A is true.'
      ],
      code: 'boolean ready = hasTicket && age >= 13;\\nboolean freeEntry = isStudent || isStaff;\\nboolean locked = !isOpen;'
    },
    {
      id: 'while', title: 'While Loop Workshop', short: 'Counters, accumulators, and loop tracing',
      icon: '07', reward: 36, category: 'ITERATION',
      briefing: 'A <code>while</code> loop repeats while its condition remains true. Track the loop variable, body, and update in that order.',
      lessons: [
        'Check the condition before every iteration. A false condition skips the body.',
        'A counter tracks how many times something happens. An accumulator combines values, often by adding to a running total.',
        'Every loop needs progress toward termination. If no value affecting the condition changes, the loop may never end.'
      ],
      code: 'int count = 1;\\nint total = 0;\\nwhile (count <= 4) {\\n    total += count;\\n    count++;\\n}\\n// total is 10'
    },
    {
      id: 'for', title: 'For Loop Challenge', short: 'Counting algorithms and accumulators',
      icon: '08', reward: 36, category: 'ITERATION',
      briefing: 'A <code>for</code> loop puts initialization, condition, and update together. Trace each cycle in order to predict its output.',
      lessons: [
        'A <code>for</code> loop initializes once, checks its condition, runs its body, and then performs its update.',
        'With <code>i &lt; n</code>, the loop excludes <code>n</code>; with <code>i &lt;= n</code>, it includes <code>n</code>.',
        'For an accumulator, update the total inside the loop and preserve the order of operations.'
      ],
      code: 'int total = 0;\\nfor (int i = 1; i <= 4; i++) {\\n    total += i;\\n}\\n// total: 1 + 2 + 3 + 4 = 10'
    },
    {
      id: 'strings', title: 'String Algorithm Lab', short: 'String traversal and AP CSA methods',
      icon: '09', reward: 36, category: 'STRINGS',
      briefing: 'String algorithms often combine a loop with a condition. Work carefully with indexes and the exclusive end of <code>substring</code>.',
      lessons: [
        '<code>length()</code> returns the number of characters. Valid character indexes run from <code>0</code> through <code>length() - 1</code>.',
        '<code>charAt(i)</code> reads one character; <code>indexOf(part)</code> returns the first matching index or <code>-1</code>.',
        '<code>substring(start, end)</code> includes <code>start</code> and stops before <code>end</code>. A loop over every character often uses <code>i &lt; text.length()</code>.'
      ],
      code: 'String text = "knight";\\nfor (int i = 0; i < text.length(); i++) {\\n    System.out.println(text.charAt(i));\\n}'
    },
    {
      id: 'debugging', title: 'Debugging Detective', short: 'Conditions, loops, and off-by-one errors',
      icon: '10', reward: 36, category: 'DEBUGGING',
      briefing: 'Debug by finding the smallest incorrect assumption. Trace a failing case and repair the logic rather than changing code at random.',
      lessons: [
        'Check boundary conditions first: should the final value be included? Compare <code>&lt;</code> with <code>&lt;=</code>.',
        'For an infinite loop, inspect whether the update changes a value used by the condition.',
        'For String methods, check zero-based indexes and the exclusive end parameter.'
      ],
      code: 'int i = 0;\\nwhile (i < 5) {\\n    System.out.println(i);\\n    i++; // Without this update, i never changes.\\n}'
    },
    {
      id: 'algorithm', title: 'Algorithm Design Center', short: 'Combine selection, iteration, and Strings',
      icon: '11', reward: 12, category: 'ALGORITHM DESIGN',
      briefing: 'Bring the tools together. Decompose a problem into initialization, a repeated step, a decision, and a result.',
      lessons: [
        'Identify the input, the required output, and the condition that distinguishes matching from non-matching cases.',
        'Initialize variables before the loop. Update counters and accumulators only when the algorithm requires it.',
        'Trace a small example and a boundary example before deciding an algorithm is correct.'
      ],
      code: 'int vowels = 0;\\nfor (int i = 0; i < word.length(); i++) {\\n    char letter = word.charAt(i);\\n    if ("aeiou".indexOf(letter) >= 0) {\\n        vowels++;\\n    }\\n}'
    }
  ];
  const ARENA_MODES = [
    { id: 'output', name: 'Predict Output', description: 'Read code and predict exactly what it prints.', icon: '▶' },
    { id: 'trace', name: 'Trace Variables', description: 'Follow changing variables one statement at a time.', icon: '⌗' },
    { id: 'complete', name: 'Complete Missing Code', description: 'Supply the missing update or algorithm step.', icon: '▤' },
    { id: 'debug', name: 'Fix the Bug', description: 'Find the smallest change that repairs the logic.', icon: '⌕' },
    { id: 'build', name: 'Build the Algorithm', description: 'Combine conditions, loops, and Strings to solve a problem.', icon: '⌘' }
  ];
  const FRQ_PLANNING_FIELDS = [
    { id: 'variables', label: 'Variables', prompt: 'Which values or accumulators should your solution track?' },
    { id: 'conditions', label: 'Conditions', prompt: 'What conditions determine how the algorithm makes its decision?' },
    { id: 'loops', label: 'Loops', prompt: 'What needs to repeat, and what bounds or stopping rule should it use?' },
    { id: 'output', label: 'Expected output', prompt: 'What exact result should the sample input produce?' }
  ];
  const FRQ_RUBRIC_CATEGORIES = ['Selection Logic', 'Iteration Logic', 'String Processing', 'Variable Usage', 'Program Correctness'];
  const makeFRQRubric = criteria => FRQ_RUBRIC_CATEGORIES.map((category, index) => ({ category, criterion: criteria[index] }));
  const FRQ_TASKS = {
    bead: [{
      overview: 'A jewelry manufacturer stores bead patterns in Strings, with R for red, B for blue, G for green, and Y for yellow. Approve a design only when it contains red and green, contains the pattern RGB, starts with red, ends with blue, and has at least five beads.',
      title: 'Analyze and approve a bead sequence',
      prompt: 'Write isApproved so it checks every quality rule and returns one Boolean result. Use a length check before any substring indexes.',
      objectives: ['Analyze a String with length(), substring(), and indexOf()', 'Check for a pattern and start/end values', 'Store intermediate results in Boolean variables', 'Combine conditions with && and a nested if'],
      sampleInput: 'beads = "RGBRGB"',
      sampleOutput: 'Sequence Analysis\\nSequence: RGBRGB\\nContains Red: true\\nContains Green: true\\nContains Pattern RGB: true\\nStarts with Red: true\\nEnds with Blue: true\\nLength >= 5: true\\n\\nFinal Result:\\nDESIGN APPROVED',
      starter: `public static boolean isApproved(String beads) {
    // TODO: Check for red, green, and a length of at least five.
    return false;
}`,
      hint1: 'Break the approval rule into separate Boolean questions, and check the length before taking substrings.',
      hint2: 'Use indexOf for colors and RGB, then compare substring(0, 1) and substring(length - 1) with R and B using equals().',
      commonMistakes: ['Treating indexOf(...) as a Boolean instead of comparing it with -1.', 'Calling substring on a sequence before confirming it is long enough.', 'Using == to compare Strings instead of equals().', 'Using || when every quality rule must pass.'],
      walkthrough: ['Check the minimum length first; if it fails, do not take any substring.', 'Use indexOf to check for red, green, and the pattern RGB.', 'Compare the first character substring with R and the last character substring with B using equals().', 'Combine all five checks with && and return the result.'],
      rubric: makeFRQRubric([
        'Combines all required conditions with && and guards substring work with a length check.',
        'Uses no unnecessary loop; each requirement can be checked directly.',
        'Uses indexOf and substring with correct String boundaries.',
        'Stores meaningful Boolean results or forms the same clear decision.',
        'Approves only sequences meeting every color, pattern, boundary, and length rule.'
      ]),
      solution: `public class BeadSequenceAnalyzer {
    // Returns whether the sequence meets every quality-control rule.
    public static boolean isApproved(String beads) {
        // Check the length before using substring indexes.
        if (beads.length() >= 5) {
            boolean containsRed = beads.indexOf('R') != -1;
            boolean containsGreen = beads.indexOf('G') != -1;
            boolean containsPattern = beads.indexOf("RGB") != -1;
            boolean startsWithRed = beads.substring(0, 1).equals("R");
            boolean endsWithBlue = beads.substring(beads.length() - 1).equals("B");

            // Every design requirement must be satisfied.
            return containsRed && containsGreen && containsPattern
                    && startsWithRed && endsWithBlue;
        }

        return false;
    }

    public static void main(String[] args) {
        String beads = "RGBRGB";
        boolean containsRed = beads.indexOf('R') != -1;
        boolean containsGreen = beads.indexOf('G') != -1;
        boolean containsPattern = beads.indexOf("RGB") != -1;
        boolean startsWithRed = beads.substring(0, 1).equals("R");
        boolean endsWithBlue = beads.substring(beads.length() - 1).equals("B");
        boolean longEnough = beads.length() >= 5;

        System.out.println("Sequence Analysis");
        System.out.println("Sequence: " + beads);
        System.out.println("Contains Red: " + containsRed);
        System.out.println("Contains Green: " + containsGreen);
        System.out.println("Contains Pattern RGB: " + containsPattern);
        System.out.println("Starts with Red: " + startsWithRed);
        System.out.println("Ends with Blue: " + endsWithBlue);
        System.out.println("Length >= 5: " + longEnough);
        System.out.println();
        System.out.println("Final Result:");
        System.out.println(isApproved(beads) ? "DESIGN APPROVED" : "DESIGN REJECTED");
    }
}`
    }],
    formatting: [{
      overview: 'A company receives product identifiers containing letters and digits, but the letter case is inconsistent. Format each identifier with uppercase letters while keeping digits unchanged; ignore any other characters.',
      title: 'Format a product identifier',
      prompt: 'Write formatIdentifier to visit every character and return a new String containing uppercase letters and the original digits.',
      objectives: ['Traverse a String with charAt()', 'Use length() and a for loop with valid bounds', 'Identify letters and digits', 'Build a result with a StringBuilder'],
      sampleInput: 'identifier = "abc123"',
      sampleOutput: 'Original Value:\\nabc123\\n\\nFormatted Value:\\nABC123',
      starter: `public static String formatIdentifier(String identifier) {
    StringBuilder result = new StringBuilder();
    // TODO: Visit each character and append its formatted value.
    return result.toString();
}`,
      hint1: 'Use a loop to examine one character at a time and append accepted characters to a StringBuilder.',
      hint2: 'For a letter, append Character.toUpperCase(current). For a digit, append current unchanged; do not append other characters.',
      commonMistakes: ['Using i <= identifier.length(), which reads one past the end.', 'Appending to the original String instead of building a separate result.', 'Converting digits as though they were letters.', 'Forgetting to return result.toString().'],
      walkthrough: ['Create a StringBuilder to collect the formatted identifier.', 'Loop from index 0 while the index is less than identifier.length().', 'Read the current character with charAt(i).', 'Append its uppercase form if it is a letter, or append it unchanged if it is a digit.', 'Return the completed String.'],
      rubric: makeFRQRubric([
        'Uses conditional branches to handle letters, digits, and other characters as specified.',
        'Visits every character exactly once with valid loop bounds.',
        'Uses charAt, character classification, and uppercase conversion correctly.',
        'Builds the result in an accumulator and returns its String value.',
        'Produces ABC123 for the sample and preserves all digits.'
      ]),
      solution: `public class StringFormattingChallenge {
    // Returns uppercase letters and keeps digits, ignoring other characters.
    public static String formatIdentifier(String identifier) {
        StringBuilder result = new StringBuilder();

        // The condition keeps i within the valid String indexes.
        for (int i = 0; i < identifier.length(); i++) {
            char current = identifier.charAt(i);

            if (Character.isLetter(current)) {
                // Convert letters to uppercase before adding them.
                result.append(Character.toUpperCase(current));
            } else if (Character.isDigit(current)) {
                // Digits are already in the desired form.
                result.append(current);
            }
        }

        return result.toString();
    }

    public static void main(String[] args) {
        String identifier = "abc123";
        System.out.println("Original Value:");
        System.out.println(identifier);
        System.out.println();
        System.out.println("Formatted Value:");
        System.out.println(formatIdentifier(identifier));
    }
}`
    }],
    prefix: [{
      overview: 'A search system needs to count how many words in a list begin with a requested prefix. A word shorter than the prefix cannot match.',
      title: 'Count words with a prefix',
      prompt: 'Write countPrefixMatches to count the words that begin with prefix. Match case exactly and avoid taking a substring longer than its word.',
      objectives: ['Traverse an array with a loop', 'Use a counter', 'Use substring() and equals() for prefix comparison', 'Check bounds before taking a substring'],
      sampleInput: 'prefix = "pre"\\nwords = {"preview", "present", "prepare", "tree"}',
      sampleOutput: 'Prefix Search Results\\n\\nPrefix: pre\\n\\nMatches Found:\\npreview\\npresent\\nprepare\\n\\nTotal Matches: 3',
      starter: `public static int countPrefixMatches(String[] words, String prefix) {
    int matches = 0;
    // TODO: Check each word and count prefix matches.
    return matches;
}`,
      hint1: 'Visit each word and compare only its first prefix.length() characters.',
      hint2: 'First require word.length() >= prefix.length(); then compare word.substring(0, prefix.length()) to prefix with equals().',
      commonMistakes: ['Taking a substring before checking whether the word is long enough.', 'Using prefix.length() - 1 as the exclusive substring endpoint.', 'Comparing Strings with == instead of equals().', 'Incrementing the counter when the word does not match.'],
      walkthrough: ['Initialize matches to zero before the loop.', 'Visit each word in the array.', 'Check that the word is at least as long as the prefix before calling substring.', 'Compare the leading substring with prefix using equals().', 'Increment matches for each match and return the total after the loop.'],
      rubric: makeFRQRubric([
        'Checks word length before performing a prefix comparison.',
        'Visits each word and updates the count only for matching words.',
        'Uses the correct substring bounds and compares contents with equals().',
        'Initializes and increments a counter, then returns its final value.',
        'Counts all and only the words that start with the prefix.'
      ]),
      solution: `public class PrefixSearchChallenge {
    // Counts words whose first characters match the requested prefix.
    public static int countPrefixMatches(String[] words, String prefix) {
        int matches = 0;

        for (int i = 0; i < words.length; i++) {
            String word = words[i];

            // Check the length first so substring stays within bounds.
            if (word.length() >= prefix.length()
                    && word.substring(0, prefix.length()).equals(prefix)) {
                matches++;
            }
        }

        return matches;
    }

    public static void main(String[] args) {
        String prefix = "pre";
        String[] words = {"preview", "present", "prepare", "tree"};

        System.out.println("Prefix Search Results");
        System.out.println();
        System.out.println("Prefix: " + prefix);
        System.out.println();
        System.out.println("Matches Found:");
        for (int i = 0; i < words.length; i++) {
            if (words[i].length() >= prefix.length()
                    && words[i].substring(0, prefix.length()).equals(prefix)) {
                System.out.println(words[i]);
            }
        }
        System.out.println();
        System.out.println("Total Matches: " + countPrefixMatches(words, prefix));
    }
}`
    }],
    digits: [{
      overview: 'A quality-control tool analyzes a nonnegative integer one digit at a time. It must report how many digits it contains, their sum, and the largest digit.',
      title: 'Analyze the digits of a number',
      prompt: 'Write analyzeDigits to return an int array containing digit count, digit sum, and largest digit in that order. Treat 0 as a one-digit number.',
      objectives: ['Use a while loop to process digits', 'Extract a digit with % 10', 'Remove a digit with / 10', 'Update counters and accumulators'],
      sampleInput: 'number = 52342',
      sampleOutput: 'Digit Analysis\\n\\nNumber: 52342\\n\\nDigit Count: 5\\n\\nSum of Digits: 16\\n\\nLargest Digit: 5',
      starter: `public static int[] analyzeDigits(int number) {
    int count = 0;
    int sum = 0;
    int largest = 0;
    int remaining = number;
    // TODO: Extract and process each digit.
    return new int[] {count, sum, largest};
}`,
      hint1: 'The remainder after division by 10 is the last digit; integer division by 10 removes it.',
      hint2: 'Use a do-while loop so that 0 is processed once. For each digit, update count, sum, and largest before dividing remaining by 10.',
      commonMistakes: ['Using / 10 before saving the current last digit.', 'Forgetting integer division removes the final digit.', 'Not updating remaining, which can create an infinite loop.', 'Using while (remaining > 0) without a special case for zero.'],
      walkthrough: ['Initialize count, sum, and largest, and copy number into remaining.', 'A do-while loop processes at least one digit, including when number is zero.', 'Use remaining % 10 to get the last digit.', 'Update the count, sum, and maximum; then remove the processed digit with remaining / 10.', 'Return the three results in the requested order.'],
      rubric: makeFRQRubric([
        'Updates the largest digit only when the current digit is greater.',
        'Processes each digit and terminates after the remaining number reaches zero.',
        'Uses integer digit operations (% 10 and / 10) correctly.',
        'Initializes and updates the count, sum, maximum, and remaining value.',
        'Returns count, sum, and largest digit in order, including for input zero.'
      ]),
      solution: `public class DigitAnalyzer {
    // Returns {digit count, digit sum, largest digit} for a nonnegative number.
    public static int[] analyzeDigits(int number) {
        int count = 0;
        int sum = 0;
        int largest = 0;
        int remaining = number;

        // A do-while loop counts zero as a one-digit number.
        do {
            int digit = remaining % 10;
            count++;
            sum += digit;

            if (digit > largest) {
                largest = digit;
            }

            // Integer division removes the digit just processed.
            remaining /= 10;
        } while (remaining > 0);

        return new int[] {count, sum, largest};
    }

    public static void main(String[] args) {
        int number = 52342;
        int[] analysis = analyzeDigits(number);

        System.out.println("Digit Analysis");
        System.out.println();
        System.out.println("Number: " + number);
        System.out.println();
        System.out.println("Digit Count: " + analysis[0]);
        System.out.println();
        System.out.println("Sum of Digits: " + analysis[1]);
        System.out.println();
        System.out.println("Largest Digit: " + analysis[2]);
    }
}`
    }],
    parser: [{
      overview: 'A database stores a first name, last name, and occupation as three comma-separated fields. Each valid record has exactly two commas.',
      title: 'Parse a comma-separated record',
      prompt: 'Write parseRecord to locate both commas and return the three fields in a String array: first name, last name, and occupation.',
      objectives: ['Locate delimiters with indexOf()', 'Extract fields with substring()', 'Use indexes carefully with exclusive end positions', 'Assign parsed values to the correct fields'],
      sampleInput: 'record = "Aldrin,Torres,Teacher"',
      sampleOutput: 'Parsed Record\\n\\nFirst Name:\\nAldrin\\n\\nLast Name:\\nTorres\\n\\nOccupation:\\nTeacher',
      starter: `public static String[] parseRecord(String record) {
    // TODO: Find the comma indexes and extract all three fields.
    return new String[] {"", "", ""};
}`,
      hint1: 'Find the first comma, then search for the second comma starting just after the first.',
      hint2: 'The first field ends at the first comma; the second starts after it and ends at the second comma; the last starts after the second comma.',
      commonMistakes: ['Including a comma in one of the returned fields.', 'Using the second comma as the start of the final field.', 'Forgetting substring end indexes are exclusive.', 'Searching for both commas from index 0 and finding the first comma twice.'],
      walkthrough: ['Call indexOf(\',\') to locate the first delimiter.', 'Call indexOf(\',\', firstComma + 1) to locate the second delimiter.', 'Extract the first field from index 0 up to firstComma.', 'Extract the middle field between firstComma + 1 and secondComma.', 'Extract the final field from secondComma + 1 to the end and return all three in order.'],
      rubric: makeFRQRubric([
        'Uses the stated valid-record assumption and assigns each field to the right position.',
        'Uses direct delimiter searches without unnecessary iteration for three fixed fields.',
        'Locates both commas and uses correct substring boundaries.',
        'Stores delimiter indexes and returns the three extracted fields in order.',
        'Returns Aldrin, Torres, and Teacher for the sample record.'
      ]),
      solution: `public class StringParser {
    // Parses a valid record containing exactly two commas.
    public static String[] parseRecord(String record) {
        int firstComma = record.indexOf(',');
        int secondComma = record.indexOf(',', firstComma + 1);

        // substring's end index is exclusive, so commas are not included.
        String firstName = record.substring(0, firstComma);
        String lastName = record.substring(firstComma + 1, secondComma);
        String occupation = record.substring(secondComma + 1);

        return new String[] {firstName, lastName, occupation};
    }

    public static void main(String[] args) {
        String record = "Aldrin,Torres,Teacher";
        String[] fields = parseRecord(record);

        System.out.println("Parsed Record");
        System.out.println();
        System.out.println("First Name:");
        System.out.println(fields[0]);
        System.out.println();
        System.out.println("Last Name:");
        System.out.println(fields[1]);
        System.out.println();
        System.out.println("Occupation:");
        System.out.println(fields[2]);
    }
}`
    }]
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const shuffle = values => {
    const result = values.slice();
    for (let index = result.length - 1; index > 0; index--) {
      const swap = Math.floor(Math.random() * (index + 1));
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  };
  const displayCode = code => escapeHTML(String(code).replaceAll('\\n', '\n'));
  const isChoiceQuestion = question => question.kind === 'multipleChoice' || question.kind === 'boolean';
  const isAnswered = question => {
    if (isChoiceQuestion(question)) return question.selected !== null;
    if (question.kind === 'matching') {
      return question.pairs.every((pair, index) => Boolean(question.matchesSelected?.[index]));
    }
    return Boolean(question.draft.trim());
  };
  const freshState = () => ({
    xp: 0,
    completedMissions: [],
    badges: [],
    arenaBonuses: [],
    frqVersion: FRQ_VERSION,
    frqCompleted: [],
    unlockedFRQ: [],
    frqRuns: {},
    currentMissionRun: null,
    arenaRun: null,
    finalRun: null,
    finalScore: null,
    stats: { attempted: 0, correct: 0, byTopic: {} },
    timeSpent: 0,
    studentName: ''
  });
  let state;
  let toastTimer;
  let timeSaveCounter = 0;
  let lastTimeTick = Date.now();

  function showNotice(message) {
    const notice = $('#notice');
    notice.textContent = message;
    notice.hidden = false;
  }

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return freshState();
      const saved = JSON.parse(stored);
      if (!saved || typeof saved !== 'object' || Array.isArray(saved)) throw new Error('Saved progress has an unexpected format.');
      const initial = freshState();
      const merged = { ...initial, ...saved };
      merged.stats = { ...initial.stats, ...(saved.stats || {}) };
      merged.stats.byTopic = merged.stats.byTopic && typeof merged.stats.byTopic === 'object' ? merged.stats.byTopic : {};
      merged.completedMissions = Array.isArray(merged.completedMissions) ? merged.completedMissions : [];
      merged.badges = Array.isArray(merged.badges) ? merged.badges : [];
      merged.arenaBonuses = Array.isArray(merged.arenaBonuses) ? merged.arenaBonuses : [];
      if (saved.frqVersion !== FRQ_VERSION) {
        merged.frqVersion = FRQ_VERSION;
        merged.frqCompleted = [];
        merged.unlockedFRQ = [];
        merged.frqRuns = {};
        merged.badges = merged.badges.filter(badge => badge !== 'frq');
      } else {
        const frqIds = new Set(FRQ_LEVELS.map(level => level.id));
        merged.frqCompleted = Array.isArray(merged.frqCompleted) ? merged.frqCompleted.filter(id => frqIds.has(id)) : [];
        merged.unlockedFRQ = Array.isArray(merged.unlockedFRQ) ? merged.unlockedFRQ.filter(id => frqIds.has(id)) : [];
        merged.frqRuns = merged.frqRuns && typeof merged.frqRuns === 'object' && !Array.isArray(merged.frqRuns)
          ? Object.fromEntries(Object.entries(merged.frqRuns).filter(([id]) => frqIds.has(id)))
          : {};
      }
      merged.xp = Number.isFinite(Number(merged.xp)) ? Math.min(MAX_XP, Math.max(0, Number(merged.xp))) : 0;
      merged.timeSpent = Number.isFinite(Number(merged.timeSpent)) ? Math.max(0, Number(merged.timeSpent)) : 0;
      return merged;
    } catch (error) {
      showNotice('Saved progress could not be read. A fresh quest has started; browser storage may be unavailable.');
      console.error('Unable to read saved Unit 2 progress:', error);
      return freshState();
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      showNotice('Progress could not be saved. Check this browser’s local storage settings.');
      console.error('Unable to save Unit 2 progress:', error);
    }
  }

  function getRank(xp = state.xp) {
    return RANKS.slice().reverse().find(rank => xp >= rank.min) || RANKS[0];
  }

  function getNextRank(xp = state.xp) {
    return RANKS.find(rank => xp < rank.min) || null;
  }

  function updateProgress() {
    const xp = Math.min(MAX_XP, state.xp);
    const rank = getRank(xp);
    const nextRank = getNextRank(xp);
    const completed = state.completedMissions.length;
    $('#header-rank').textContent = rank.name.toUpperCase();
    $('#header-xp').textContent = xp;
    $('#current-xp').textContent = xp;
    $('#current-rank').textContent = rank.name;
    $('#missions-value').textContent = `${completed} / ${MISSIONS.length}`;
    $('#badges-value').textContent = `${state.badges.length} / ${BADGES.length}`;
    $('#map-completed').textContent = completed;
    $('#xp-progress-label').textContent = `${xp} / ${MAX_XP} XP`;
    $('#xp-progress').setAttribute('aria-valuenow', String(xp));
    $('#xp-progress-fill').style.width = `${(xp / MAX_XP) * 100}%`;
    const priorRank = rank.min;
    const nextXP = nextRank ? nextRank.min : MAX_XP;
    const rankProgress = xp - priorRank;
    const rankTotal = Math.max(1, nextXP - priorRank);
    $('#rank-progress-label').textContent = nextRank ? `${xp} / ${nextXP} XP` : 'MAX RANK REACHED';
    $('#rank-progress').setAttribute('aria-valuemax', String(rankTotal));
    $('#rank-progress').setAttribute('aria-valuenow', String(rankProgress));
    $('#rank-progress-fill').style.width = `${nextRank ? Math.min(100, (rankProgress / rankTotal) * 100) : 100}%`;
    const pbisReady = xp >= 240;
    $('#pbis-status').textContent = pbisReady ? 'Ready for teacher review' : `${240 - xp} XP to review`;
    $('#pbis-status').classList.toggle('ready', pbisReady);
    renderBadges();
    renderMissionCards();
  }

  function renderBadges() {
    const shelf = $('#badge-shelf');
    shelf.innerHTML = BADGES.map(badge => {
      const earned = state.badges.includes(badge.id);
      return `<article class="badge ${earned ? 'earned' : 'locked'}" title="${escapeHTML(badge.detail)}">
        <span class="badge-icon badge-${badge.id}" aria-hidden="true">${badge.icon}</span>
        <span class="badge-name">${escapeHTML(badge.name)}</span><span class="badge-state">${earned ? 'EARNED' : 'LOCKED'}</span>
      </article>`;
    }).join('');
    $('#badge-empty').hidden = state.badges.length > 0;
  }

  function renderMissionCards() {
    $('#mission-list').innerHTML = MISSIONS.map((mission, index) => {
      const completed = state.completedMissions.includes(mission.id);
      const active = state.currentMissionRun?.missionId === mission.id;
      return `<article class="mission-card ${completed ? 'mission-cleared' : ''} ${active ? 'mission-active' : ''}">
        <span class="mission-number">${mission.icon}</span>
        <div class="mission-info"><p class="mission-category">${escapeHTML(mission.category)} · MISSION ${String(index).padStart(2, '0')}</p><h3>${escapeHTML(mission.title)}</h3><p>${escapeHTML(mission.short)}</p></div>
        <div class="mission-card-meta"><span class="mission-reward">✦ ${mission.reward} XP</span><button type="button" class="button ${completed ? 'button-quiet' : 'button-secondary'} open-mission" data-mission="${mission.id}">${completed ? 'REPLAY' : active ? 'CONTINUE' : 'START'}</button></div>
      </article>`;
    }).join('');
    $$('.open-mission').forEach(button => button.addEventListener('click', () => openMission(button.dataset.mission)));
  }

  function updateUnlocks(showAnimation = true) {
    let newlyUnlocked = null;
    for (let index = 0; index < FRQ_LEVELS.length; index++) {
      const level = FRQ_LEVELS[index];
      const prerequisiteMet = index === 0 || state.frqCompleted.includes(FRQ_LEVELS[index - 1].id);
      const isUnlocked = state.xp >= level.threshold && prerequisiteMet;
      if (isUnlocked && !state.unlockedFRQ.includes(level.id)) {
        state.unlockedFRQ.push(level.id);
        if (!newlyUnlocked) newlyUnlocked = level;
      }
    }
    persist();
    renderFRQHome();
    if (newlyUnlocked && showAnimation) showUnlock(newlyUnlocked);
  }

  function showUnlock(level) {
    $('#unlock-title').textContent = `${level.title} unlocked`;
    $('#unlock-description').textContent = `You earned ${level.threshold} XP and completed the prerequisite. Your next AP-style coding challenge is ready.`;
    $('#unlock-overlay').hidden = false;
    $('#close-unlock').focus();
  }

  function closeUnlock() {
    $('#unlock-overlay').hidden = true;
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function showScreen(id, scrollTargetId = null) {
    $$('.screen').forEach(screen => { screen.hidden = screen.id !== id; });
    $$('.nav-button').forEach(button => button.classList.toggle('active', button.dataset.screen === id));
    if (id === 'home-screen') updateProgress();
    if (id === 'arena-screen') renderArena();
    if (id === 'frq-screen') renderFRQHome();
    if (id === 'teacher-screen') renderTeacher();
    const scrollTarget = scrollTargetId ? document.getElementById(scrollTargetId) : null;
    if (scrollTargetId && !scrollTarget) throw new Error(`Unknown scroll target: ${scrollTargetId}`);
    if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function recordAnswer(question, correct) {
    state.stats.attempted += 1;
    if (correct) state.stats.correct += 1;
    const topic = question.topic || question.kind;
    if (!state.stats.byTopic[topic]) state.stats.byTopic[topic] = { attempted: 0, correct: 0 };
    state.stats.byTopic[topic].attempted += 1;
    if (correct) state.stats.byTopic[topic].correct += 1;
  }

  function awardXP(amount, reason) {
    const previousXP = state.xp;
    state.xp = Math.min(MAX_XP, state.xp + amount);
    updateProgress();
    updateUnlocks(true);
    persist();
    const earned = state.xp - previousXP;
    if (earned > 0) showToast(`${reason}: +${earned} XP`);
  }

  function awardBadge(id) {
    if (state.badges.includes(id)) return;
    const badge = BADGES.find(item => item.id === id);
    if (!badge) return;
    state.badges.push(id);
    showToast(`Badge earned: ${badge.name}`);
    persist();
    updateProgress();
  }

  function checkMissionBadges() {
    const has = id => state.completedMissions.includes(id);
    if (has('boolean') && has('compound')) awardBadge('boolean');
    if (['selection', 'decision', 'nested'].every(has)) awardBadge('conditional');
    if (has('while') && has('for')) awardBadge('loop');
    if (has('strings')) awardBadge('string');
    if (has('debugging')) awardBadge('debug');
  }

  function getQuestionBank() {
    const questions = [];
    const mcMissions = ['prerequisite', 'boolean', 'selection', 'decision', 'nested', 'compound', 'algorithm'];
    const mcOperators = ['>', '<', '>=', '<=', '==', '!='];
    for (let index = 0; index < 40; index++) {
      const mission = mcMissions[index % mcMissions.length];
      if (index % 8 === 0) {
        const n = 3 + (index % 6);
        const answer = `n²`;
        questions.push({
          id: `mc-${index + 1}`, kind: 'multipleChoice', topic: 'runtime', mission: 'algorithm',
          prompt: `If n is a positive integer, how many times does the innermost statement execute?`,
          code: `for (int i = 0; i < n; i++) {\\n    for (int j = 0; j < n; j++) {\\n        total++;\\n    }\\n}`,
          choices: ['n', '2n', 'n²', 'n + 2'], answer: 2,
          explanation: `The inner loop runs n times for each of the n outer iterations, for n × n = n² executions. For example, when n = ${n}, it runs ${n * n} times.`,
          hints: ['Count the inner loop for one outer iteration.', 'Multiply that count by the number of outer iterations.']
        });
        continue;
      }
      const a = 2 + ((index * 7) % 17);
      const b = 1 + ((index * 5 + 3) % 16);
      const operator = mcOperators[index % mcOperators.length];
      const condition = operator === '>' ? a > b : operator === '<' ? a < b : operator === '>=' ? a >= b : operator === '<=' ? a <= b : operator === '==' ? a === b : a !== b;
      const correct = condition ? a + 4 : b + 6;
      const distractors = new Set([correct + 1, correct - 1, a, b, correct + 2]);
      distractors.delete(correct);
      const choices = shuffle([correct, ...Array.from(distractors).slice(0, 3)]).map(String);
      questions.push({
        id: `mc-${index + 1}`, kind: 'multipleChoice', topic: mission, mission,
        prompt: 'What is the value of result after this code runs?',
        code: `int score = ${a};\\nint result;\\nif (score ${operator} ${b}) {\\n    result = ${a + 4};\\n} else {\\n    result = ${b + 6};\\n}`,
        choices, answer: choices.indexOf(String(correct)),
        explanation: `Evaluate ${a} ${operator} ${b}: the condition is ${condition}. ${condition ? 'The if branch assigns' : 'The else branch assigns'} result = ${correct}.`,
        hints: ['Evaluate the condition before following either branch.', 'Only one branch assigns result.']
      });
    }

    const outputMissions = ['prerequisite', 'selection', 'decision', 'nested', 'compound', 'while', 'for', 'algorithm'];
    for (let index = 0; index < 40; index++) {
      const mission = outputMissions[index % outputMissions.length];
      const limit = 3 + (index % 7);
      if (index % 4 === 0) {
        const start = index % 5;
        const step = 1 + (index % 3);
        let value = start;
        for (let i = 0; i < limit; i++) value += step;
        questions.push({
          id: `out-${index + 1}`, kind: 'output', topic: mission, mission,
          prompt: 'What value is printed?',
          code: `int value = ${start};\\nfor (int i = 0; i < ${limit}; i++) {\\n    value += ${step};\\n}\\nSystem.out.println(value);`,
          answer: String(value),
          explanation: `The body runs ${limit} times and adds ${step} each time, so value is ${start} + ${limit} × ${step} = ${value}.`,
          hints: ['Count the number of loop iterations.', 'Add the increment once for each iteration.']
        });
      } else if (index % 4 === 1) {
        const answer = limit * (limit + 1) / 2;
        questions.push({
          id: `out-${index + 1}`, kind: 'output', topic: mission, mission,
          prompt: 'What value is printed?',
          code: mission === 'while'
            ? `int sum = 0;\\nint i = 1;\\nwhile (i <= ${limit}) {\\n    sum += i;\\n    i++;\\n}\\nSystem.out.println(sum);`
            : `int sum = 0;\\nfor (int i = 1; i <= ${limit}; i++) {\\n    sum += i;\\n}\\nSystem.out.println(sum);`,
          answer: String(answer),
          explanation: `The loop adds every integer from 1 through ${limit}, giving a total of ${answer}.`,
          hints: ['The <= includes the final value.', 'List the values added to sum, then add them.']
        });
      } else if (index % 4 === 2) {
        const start = 2 + (index % 4);
        const end = start + limit;
        const answer = start < 7 ? `low:${start + 1}` : `high:${end}`;
        questions.push({
          id: `out-${index + 1}`, kind: 'output', topic: mission, mission,
          prompt: 'What text is printed?',
          code: `int value = ${start};\\nif (value < 7) {\\n    value++;\\n    System.out.println("low:" + value);\\n} else {\\n    value += ${limit};\\n    System.out.println("high:" + value);\\n}`,
          answer,
          explanation: `The initial value ${start} ${start < 7 ? 'is less' : 'is not less'} than 7, so the ${start < 7 ? 'if' : 'else'} branch prints "${answer}".`,
          hints: ['Check the if condition using the initial value.', 'Trace only the branch that executes.']
        });
      } else {
        let total = 0;
        for (let i = 0; i < limit; i++) if (i % 2 === 0) total += i;
        questions.push({
          id: `out-${index + 1}`, kind: 'output', topic: mission, mission,
          prompt: 'What value is printed?',
          code: `int total = 0;\\nfor (int i = 0; i < ${limit}; i++) {\\n    if (i % 2 == 0) {\\n        total += i;\\n    }\\n}\\nSystem.out.println(total);`,
          answer: String(total),
          explanation: `The loop visits 0 through ${limit - 1}. It adds only even values, giving ${total}.`,
          hints: ['The loop stops before i reaches the limit.', 'Add only the values divisible by 2.']
        });
      }
    }

    const traceMissions = ['prerequisite', 'while', 'for', 'algorithm'];
    for (let index = 0; index < 20; index++) {
      const mission = traceMissions[index % traceMissions.length];
      const start = index % 6;
      const iterations = 2 + (index % 5);
      const increment = 1 + (index % 3);
      questions.push({
        id: `trace-${index + 1}`, kind: 'trace', topic: mission, mission,
        prompt: 'What is the final value of value?',
        code: mission === 'while'
          ? `int value = ${start};\\nint step = 0;\\nwhile (step < ${iterations}) {\\n    value += ${increment};\\n    step++;\\n}`
          : `int value = ${start};\\nfor (int step = 0; step < ${iterations}; step++) {\\n    value += ${increment};\\n}`,
        answer: String(start + iterations * increment),
        explanation: `The loop body runs ${iterations} times. Starting at ${start}, adding ${increment} each time gives ${start + iterations * increment}.`,
        hints: ['Make a row for value before the first iteration.', `Add ${increment} once per iteration.`]
      });
    }

    const booleanMissions = ['boolean', 'compound', 'nested'];
    for (let index = 0; index < 20; index++) {
      const mission = booleanMissions[index % booleanMissions.length];
      const first = index % 2 === 0;
      const second = index % 3 !== 0;
      const third = index % 4 === 0;
      const expression = index % 4 === 0
        ? `!${first} || (${second} && ${third})`
        : index % 4 === 1
          ? `${first} && !${second}`
          : index % 4 === 2
            ? `(${first} || ${second}) && ${third}`
            : `!(${first} && ${second}) || ${third}`;
      const answer = index % 4 === 0
        ? !first || (second && third)
        : index % 4 === 1
          ? first && !second
          : index % 4 === 2
            ? (first || second) && third
            : !(first && second) || third;
      questions.push({
        id: `bool-${index + 1}`, kind: 'boolean', topic: mission, mission,
        prompt: 'Evaluate this Boolean expression.',
        code: expression,
        choices: shuffle(['true', 'false']), answer: null,
        explanation: `Substitute the Boolean values and apply ! before && before ||. The expression evaluates to ${answer}.`,
        correctValue: String(answer),
        hints: ['Evaluate ! first, then &&, then ||.', 'Use parentheses to evaluate the grouped expression first.']
      });
    }

    const loopMissions = ['while', 'for', 'algorithm', 'debugging'];
    for (let index = 0; index < 15; index++) {
      const mission = loopMissions[index % loopMissions.length];
      if (index % 4 === 0) {
        questions.push({
          id: `loop-${index + 1}`, kind: 'loop', topic: 'debugging', mission: 'debugging', format: 'bug',
          prompt: 'This loop should print 0 through 4, then stop. What condition fixes the off-by-one error?',
          code: 'int i = 0;\\nwhile (i <= 5) {\\n    System.out.println(i);\\n    i++;\\n}',
          answer: 'i < 5',
          explanation: 'Starting at zero, i < 5 prints 0, 1, 2, 3, and 4. The condition i <= 5 incorrectly allows 5.',
          hints: ['The intended final printed value is 4.', 'Use a condition that stops before i reaches 5.']
        });
      } else if (index % 4 === 1) {
        questions.push({
          id: `loop-${index + 1}`, kind: 'loop', topic: mission, mission, format: 'completion',
          prompt: 'Complete the missing line so the loop calculates the sum from 1 through limit.',
          code: `int sum = 0;\\nfor (int i = 1; i <= ${3 + index}; i++) {\\n    // missing line\\n}\\nSystem.out.println(sum);`,
          answer: 'sum += i;',
          explanation: 'Each iteration adds its current i value to the accumulator sum.',
          hints: ['sum is the accumulator and i is the current value.', 'Add the current value to sum inside the loop.']
        });
      } else {
        const limit = 3 + index;
        let value = 0;
        for (let i = 1; i <= limit; i++) value += i;
        questions.push({
          id: `loop-${index + 1}`, kind: 'loop', topic: mission, mission, format: 'trace',
          prompt: 'What is the final value of total?',
          code: `int total = 0;\\nint number = 1;\\nwhile (number <= ${limit}) {\\n    total += number;\\n    number++;\\n}`,
          answer: String(value),
          explanation: `The counter visits each integer from 1 through ${limit}; their sum is ${value}.`,
          hints: ['The loop includes the limit because it uses <=.', 'Add all counter values from 1 through the limit.']
        });
      }
    }

    const sampleStrings = ['KNIGHT', 'iteration', 'beadSequence', 'Centennial', 'algorithm', 'Boolean'];
    for (let index = 0; index < 15; index++) {
      const value = sampleStrings[index % sampleStrings.length];
      const mode = index % 4;
      if (mode === 2) {
        questions.push({
          id: `str-${index + 1}`, kind: 'string', topic: 'debugging', mission: 'debugging', format: 'bug',
          prompt: 'The goal is to return the first count characters. What corrected expression avoids including one extra character?',
          code: `String result = text.substring(0, count + 1);`,
          answer: 'text.substring(0, count)',
          explanation: 'The end index of substring is exclusive. Using count as the end returns exactly the first count characters.',
          hints: ['The end index is not included in the returned String.', 'The end index should equal the number of characters wanted.']
        });
        continue;
      }
      let expression;
      let answer;
      if (mode === 0) {
        const start = index % Math.max(1, value.length - 2);
        const end = Math.min(value.length, start + 2);
        expression = `text.substring(${start}, ${end})`;
        answer = value.substring(start, end);
      } else if (mode === 1) {
        const at = index % value.length;
        expression = `text.charAt(${at})`;
        answer = value.charAt(at);
      } else {
        const needle = index % 2 === 0 ? value.charAt(0) : 'z';
        expression = `text.indexOf("${needle}")`;
        answer = String(value.indexOf(needle));
      }
      questions.push({
        id: `str-${index + 1}`, kind: 'string', topic: 'strings', mission: 'strings',
        prompt: `Given text = "${value}", what does this expression return?`,
        code: expression, answer,
        explanation: mode === 0
          ? `substring includes index ${expression.match(/\d+/g)[0]} and stops before its end index, so the result is "${answer}".`
          : mode === 1
            ? `charAt(${expression.match(/\d+/)[0]}) returns the character at that zero-based index: "${answer}".`
            : `indexOf returns the first matching index, or -1 if the character is absent. The result is ${answer}.`,
        hints: ['String indexes begin at zero.', 'For substring, include the start and exclude the end.']
      });
    }

    const matchingSamples = [
      { word: 'knight', part: 'ni', first: 'k', search: 'g', index: '3' },
      { word: 'bead', part: 'ea', first: 'b', search: 'd', index: '3' },
      { word: 'loop', part: 'oo', first: 'l', search: 'p', index: '3' },
      { word: 'logic', part: 'og', first: 'l', search: 'c', index: '4' }
    ];
    matchingSamples.forEach((sample, index) => {
      questions.push({
        id: `match-${index + 1}`, kind: 'matching', topic: 'prerequisite', mission: 'prerequisite',
        prompt: `Match each String expression for word = "${sample.word}" with its result.`,
        pairs: [
          { prompt: 'word.length()', answer: String(sample.word.length) },
          { prompt: 'word.substring(1, 3)', answer: sample.part },
          { prompt: 'word.charAt(0)', answer: sample.first },
          { prompt: `word.indexOf("${sample.search}")`, answer: sample.index }
        ],
        matches: [String(sample.word.length), sample.part, sample.first, sample.index],
        explanation: 'String indexes start at zero. length() counts characters, substring includes its start and excludes its end, charAt reads one character, and indexOf returns the first matching index.',
        hints: ['Write out the characters at indexes 0, 1, 2, and 3.', 'Remember that substring(1, 3) includes index 1 but not index 3.']
      });
    });

    const algorithmQuestions = [
      {
        prompt: 'Complete the condition so score values of 70 or higher pass.',
        code: 'if (/* missing condition */) {\\n    passed = true;\\n}',
        answer: 'score >= 70',
        hints: ['The boundary value 70 must pass.', 'Use an inclusive comparison.']
      },
      {
        prompt: 'Complete the Boolean expression: a member with at least 100 points qualifies.',
        code: 'boolean qualifies = /* missing expression */;',
        answer: 'isMember && points >= 100',
        hints: ['Both requirements must be true.', 'Join the membership check and points check with &&.']
      },
      {
        prompt: 'Complete the for-loop update so the algorithm visits every character once.',
        code: 'for (int i = 0; i < word.length(); /* missing update */) {\\n    inspect(word.charAt(i));\\n}',
        answer: 'i++',
        hints: ['The index should move forward after each character.', 'Increase i by one each iteration.']
      },
      {
        prompt: 'Complete the condition to identify whether letter is a lowercase vowel.',
        code: 'if (/* missing condition */) {\\n    vowels++;\\n}',
        answer: '"aeiou".indexOf(letter) >= 0',
        hints: ['Search for letter in the String of vowels.', 'A found character has an index greater than or equal to zero.']
      },
      {
        prompt: 'Complete the while-loop condition so it stops when count reaches limit.',
        code: 'while (/* missing condition */) {\\n    count++;\\n}',
        answer: 'count < limit',
        hints: ['The loop should run only while count is below limit.', 'Use a strict less-than comparison.']
      },
      {
        prompt: 'Complete the expression that returns the text before a known delimiter index.',
        code: 'String label = /* missing expression */;',
        answer: 'record.substring(0, delimiter)',
        hints: ['substring starts at index zero.', 'The end index is exclusive, so delimiter is the correct end.']
      },
      {
        prompt: 'Complete the accumulator update so total includes the current value.',
        code: 'int total = 0;\\nfor (int value : values) {\\n    /* missing statement */\\n}',
        answer: 'total += value;',
        hints: ['total is the accumulator.', 'Add the current value on every iteration.']
      },
      {
        prompt: 'Complete the condition that recognizes a digit character.',
        code: 'if (/* missing condition */) {\\n    digits++;\\n}',
        answer: "ch >= '0' && ch <= '9'",
        hints: ['Check both ends of the character range.', 'Both comparisons must be true.']
      },
      {
        prompt: 'Complete the expression: entry is allowed for a ticket holder who is a student or staff member.',
        code: 'boolean allowed = /* missing expression */;',
        answer: 'hasTicket && (isStudent || isStaff)',
        hints: ['A ticket is required, and either role is acceptable.', 'Use parentheses to group the alternative roles.']
      },
      {
        prompt: 'Complete the loop condition so traversal continues until the sentinel value -1 is read.',
        code: 'while (/* missing condition */) {\\n    process(value);\\n    value = input.nextInt();\\n}',
        answer: 'value != -1',
        hints: ['The sentinel ends the loop.', 'Continue while the value is not the sentinel.']
      }
    ];
    algorithmQuestions.forEach((question, index) => {
      questions.push({
        id: `algorithm-${index + 1}`, kind: 'algorithm', topic: 'algorithm', mission: 'algorithm',
        ...question,
        explanation: `A correct completion is ${question.answer}. Check how it meets the stated requirement and trace a boundary case.`,
        hints: question.hints
      });
    });

    const requiredCounts = {
      multipleChoice: 40,
      output: 40,
      trace: 20,
      boolean: 20,
      loop: 15,
      string: 15
    };
    const missingCategories = Object.entries(requiredCounts).filter(([kind, minimum]) =>
      questions.filter(question => question.kind === kind).length < minimum
    );
    if (questions.length < 150 || missingCategories.length) {
      throw new Error(`Question bank does not meet the minimum size or category counts (${questions.length} questions).`);
    }
    return questions;
  }
  const QUESTION_BANK = getQuestionBank();

  function prepareQuestion(question) {
    const copy = { ...question, hints: question.hints.slice(), help: {}, selected: null, draft: '' };
    if (copy.kind === 'multipleChoice' || copy.kind === 'boolean') {
      let choices = copy.choices.slice();
      let answer = copy.kind === 'boolean' ? choices.indexOf(copy.correctValue) : copy.answer;
      const pairs = shuffle(choices.map((choice, index) => ({ choice, correct: index === answer })));
      copy.choices = pairs.map(pair => pair.choice);
      copy.answer = pairs.findIndex(pair => pair.correct);
    }
    if (copy.kind === 'matching') {
      copy.pairs = copy.pairs.map(pair => ({ ...pair }));
      copy.matches = shuffle(copy.matches);
      copy.matchesSelected = {};
    }
    return copy;
  }

  function getQuestionAnswer(question) {
    if (isChoiceQuestion(question)) return question.selected === question.answer;
    if (question.kind === 'matching') {
      return question.pairs.every((pair, index) => question.matchesSelected?.[index] === pair.answer);
    }
    const entered = String(question.draft || '').trim().replace(/\s+/g, '').replace(/;+$/, '');
    const expected = String(question.answer).trim().replace(/\s+/g, '').replace(/;+$/, '');
    return entered === expected;
  }

  function renderQuestionCard(question, result = null) {
    const choices = question.choices || [];
    const response = isChoiceQuestion(question)
      ? choicesMarkup(choices, question.selected, result)
      : question.kind === 'matching'
        ? `<div class="matching-list">${question.pairs.map((pair, index) => `<label class="matching-row"><span>${escapeHTML(pair.prompt)}</span><select class="matching-select" data-match-index="${index}" ${result ? 'disabled' : ''}><option value="">Choose a match…</option>${question.matches.map(match => `<option value="${escapeHTML(match)}" ${question.matchesSelected?.[index] === match ? 'selected' : ''}>${escapeHTML(match)}</option>`).join('')}</select></label>`).join('')}</div>`
        : `<label class="answer-label" for="answer-field">Your answer</label><input id="answer-field" class="answer-input" type="text" autocomplete="off" value="${escapeHTML(question.draft || '')}" placeholder="Type your answer…" ${result ? 'disabled' : ''}>`;
    const helpMarkup = [
      ['hint1', 'HINT 1', question.hints[0]],
      ['hint2', 'HINT 2', question.hints[1]],
      ['explanation', 'SHOW EXPLANATION', question.explanation]
    ].map(([id, label, content]) => `<div class="help-item"><button type="button" class="help-button ${question.help?.[id] ? 'help-open' : ''}" data-help="${id}">${label}</button>${question.help?.[id] ? `<p class="help-copy">${escapeHTML(content)}</p>` : ''}</div>`).join('');
    const feedback = result ? `<div class="answer-feedback ${result.correct ? 'correct' : 'incorrect'}" role="status"><strong>${result.correct ? 'Correct.' : 'Not quite.'}</strong> ${escapeHTML(question.explanation)}</div>` : '';
    return `<article class="question-card">
      <div class="question-kicker">${escapeHTML((question.topic || question.kind).replace(/-/g, ' '))} · ${escapeHTML(question.kind.replace(/([A-Z])/g, ' $1').toUpperCase())}</div>
      <h3>${escapeHTML(question.prompt)}</h3>
      ${question.code ? `<pre class="code-block"><code>${displayCode(question.code)}</code></pre>` : ''}
      ${isChoiceQuestion(question) || question.kind === 'matching' ? '' : '<p class="answer-note">Enter Java values or code. Whitespace and a trailing semicolon are ignored when checking.</p>'}
      ${response}
      <div class="help-row">${helpMarkup}</div>${feedback}
    </article>`;
  }

  function choicesMarkup(choices, selected, result) {
    return `<div class="choice-list">${choices.map((choice, index) => `<button type="button" class="choice-button question-choice ${selected === index ? 'selected' : ''}" data-choice-index="${index}" ${result ? 'disabled' : ''}><span class="choice-letter">${String.fromCharCode(65 + index)}</span><span>${escapeHTML(choice)}</span></button>`).join('')}</div>`;
  }

  function bindQuestionCard(root, question, rerender) {
    $$('.question-choice', root).forEach(button => button.addEventListener('click', () => {
      question.selected = Number(button.dataset.choiceIndex);
      persist();
      rerender();
    }));
    const input = $('.answer-input', root);
    if (input) input.addEventListener('input', () => {
      question.draft = input.value;
      persist();
      const submit = $('.submit-answer, #final-next', root);
      if (submit) submit.disabled = !isAnswered(question);
    });
    $$('.matching-select', root).forEach(select => select.addEventListener('change', () => {
      question.matchesSelected[Number(select.dataset.matchIndex)] = select.value;
      persist();
      const submit = $('.submit-answer, #final-next', root);
      if (submit) submit.disabled = !isAnswered(question);
    }));
    $$('.help-button', root).forEach(button => button.addEventListener('click', () => {
      question.help = question.help || {};
      question.help[button.dataset.help] = !question.help[button.dataset.help];
      persist();
      rerender();
    }));
  }

  function renderMissionCards() {
    const list = $('#mission-list');
    list.innerHTML = MISSIONS.map((mission, index) => {
      const completed = state.completedMissions.includes(mission.id);
      const active = state.currentMissionRun?.missionId === mission.id;
      return `<article class="mission-card ${completed ? 'mission-cleared' : ''} ${active ? 'mission-active' : ''}">
        <span class="mission-number">${mission.icon}</span>
        <div class="mission-info"><p class="mission-category">${escapeHTML(mission.category)} · MISSION ${String(index).padStart(2, '0')}</p><h3>${escapeHTML(mission.title)}</h3><p>${escapeHTML(mission.short)}</p></div>
        <div class="mission-card-meta"><span class="mission-reward">✦ ${mission.reward} XP</span><button type="button" class="button ${completed ? 'button-quiet' : 'button-secondary'} open-mission" data-mission="${mission.id}">${completed ? 'REPLAY' : active ? 'CONTINUE' : 'START'}</button></div>
      </article>`;
    }).join('');
    $$('.open-mission').forEach(button => button.addEventListener('click', () => openMission(button.dataset.mission)));
  }

  function openMission(id) {
    const mission = MISSIONS.find(item => item.id === id);
    if (!mission) return;
    if (!state.currentMissionRun || state.currentMissionRun.missionId !== id || state.currentMissionRun.finished) {
      const candidates = QUESTION_BANK.filter(question => question.mission === id);
      if (candidates.length < 3) throw new Error(`Mission ${id} needs at least 3 tagged questions; found ${candidates.length}.`);
      const questions = id === 'prerequisite'
        ? ['multipleChoice', 'output', 'matching'].map(kind => {
          const eligible = candidates.filter(question => question.kind === kind);
          if (!eligible.length) throw new Error(`Prerequisite mission is missing a ${kind} activity.`);
          return eligible[Math.floor(Math.random() * eligible.length)];
        })
        : shuffle(candidates).slice(0, 3);
      state.currentMissionRun = { missionId: id, questions: shuffle(questions).map(prepareQuestion), index: 0, score: 0, finished: false };
    }
    persist();
    renderMission();
    showScreen('mission-screen');
  }

  function renderMission() {
    const run = state.currentMissionRun;
    const mission = MISSIONS.find(item => item.id === run?.missionId);
    if (!mission) {
      $('#mission-content').innerHTML = '<div class="panel empty-panel"><h1>Mission unavailable</h1><p>Return to the mission map and choose a training mission.</p></div>';
      return;
    }
    $('#mission-breadcrumb').textContent = `${mission.icon} · ${mission.title.toUpperCase()}`;
    if (run.finished) {
      const cleared = state.completedMissions.includes(mission.id);
      $('#mission-content').innerHTML = `<section class="panel completion-panel"><div class="completion-mark">${cleared ? '✓' : '↻'}</div><p class="eyebrow">${cleared ? 'MISSION CLEARED' : 'KEEP TRAINING'}</p><h1>${cleared ? 'Excellent work.' : 'One more round.'}</h1><p>${cleared ? `You answered ${run.score} of ${run.questions.length} correctly and earned this mission’s XP reward.` : `You answered ${run.score} of ${run.questions.length} correctly. Review the lesson, then try a fresh randomized set.`}</p><div class="completion-actions"><button type="button" class="button button-primary" id="mission-replay">${cleared ? 'PRACTICE AGAIN' : 'RETRY MISSION'}</button><button type="button" class="button button-quiet" data-screen="home-screen" data-scroll-target="mission-map">RETURN TO QUEST MAP</button></div></section>`;
      $('#mission-replay').addEventListener('click', () => {
        state.currentMissionRun = null;
        openMission(mission.id);
      });
      return;
    }
    const question = run.questions[run.index];
    $('#mission-content').innerHTML = `<section class="mission-hero panel">
        <div><p class="eyebrow">${escapeHTML(mission.category)} · MISSION ${mission.icon}</p><h1>${escapeHTML(mission.title)}</h1><p>${mission.briefing}</p></div>
        <div class="mission-reward-large"><span>MISSION REWARD</span><strong>✦ ${mission.reward} XP</strong><small>Earned once when cleared</small></div>
      </section>
      <div class="mission-body">
        <section class="panel lesson-panel"><div class="section-heading"><div><p class="eyebrow">LEARN THE CONCEPT</p><h2>Field notes</h2></div><span class="heading-icon">⌘</span></div>
          <ul class="lesson-list">${mission.lessons.map(lesson => `<li>${lesson}</li>`).join('')}</ul>
          <pre class="code-block"><code>${displayCode(mission.code)}</code></pre>
          <p class="micro-copy">Study the example, then use Hint 1 or Hint 2 before submitting if you need a nudge.</p>
        </section>
        <section class="panel activity-panel"><div class="section-heading"><div><p class="eyebrow">RANDOMIZED SKILL CHECK</p><h2>Mission challenge</h2></div><span class="question-count">${run.index + 1} / ${run.questions.length}</span></div>
          <div class="challenge-progress"><span style="width:${((run.index + 1) / run.questions.length) * 100}%"></span></div>
          ${renderQuestionCard(question, question.result || null)}
          <div class="challenge-actions">${question.result
            ? `<button type="button" class="button button-primary" id="next-mission-question">${run.index === run.questions.length - 1 ? 'FINISH MISSION' : 'NEXT QUESTION →'}</button>`
            : `<button type="button" class="button button-primary submit-answer" id="submit-mission-answer" ${isAnswered(question) ? '' : 'disabled'}>CHECK ANSWER</button>`}
          </div>
        </section>
      </div>`;
    bindQuestionCard($('#mission-content'), question, renderMission);
    const submit = $('#submit-mission-answer');
    if (submit) submit.addEventListener('click', submitMissionAnswer);
    const next = $('#next-mission-question');
    if (next) next.addEventListener('click', nextMissionQuestion);
  }

  function submitMissionAnswer() {
    const run = state.currentMissionRun;
    const question = run?.questions[run.index];
    if (!question || question.result || !isAnswered(question)) return;
    const correct = getQuestionAnswer(question);
    question.result = { correct };
    recordAnswer(question, correct);
    if (correct) run.score += 1;
    persist();
    renderMission();
  }

  function nextMissionQuestion() {
    const run = state.currentMissionRun;
    if (!run) return;
    if (run.index < run.questions.length - 1) {
      run.index += 1;
      persist();
      renderMission();
      return;
    }
    run.finished = true;
    if (run.score >= MISSION_PASS_SCORE && !state.completedMissions.includes(run.missionId)) {
      const mission = MISSIONS.find(item => item.id === run.missionId);
      state.completedMissions.push(run.missionId);
      checkMissionBadges();
      persist();
      updateProgress();
      awardXP(mission.reward, mission.title);
    } else {
      persist();
    }
    renderMission();
  }

  function getArenaQuestions(mode) {
    if (mode === 'output') return QUESTION_BANK.filter(question => question.kind === 'output');
    if (mode === 'trace') return QUESTION_BANK.filter(question => question.kind === 'trace');
    if (mode === 'complete') return QUESTION_BANK.filter(question => question.kind === 'loop' && question.format === 'completion');
    if (mode === 'debug') return QUESTION_BANK.filter(question => question.topic === 'debugging');
    return QUESTION_BANK.filter(question => question.kind === 'algorithm');
  }

  function startArenaMode(modeId) {
    const mode = ARENA_MODES.find(item => item.id === modeId);
    if (!mode) return;
    const questions = getArenaQuestions(modeId);
    if (!questions.length) {
      showNotice(`No practice questions are available for ${mode.name}.`);
      return;
    }
    state.arenaRun = { modeId, question: prepareQuestion(questions[Math.floor(Math.random() * questions.length)]) };
    persist();
    renderArena();
  }

  function renderArena() {
    const target = $('#arena-content');
    const run = state.arenaRun;
    if (!run) {
      target.innerHTML = `<section class="panel arena-heading"><p class="eyebrow">RANDOMIZED PRACTICE · OPEN REPLAY</p><h1>Algorithm Training Arena</h1><p>Choose any mode. Get a fresh question each time. Earn a +12 XP bonus the first time you answer each mode correctly.</p></section>
        <div class="arena-mode-grid">${ARENA_MODES.map(mode => `<article class="arena-mode panel"><span class="mode-icon" aria-hidden="true">${mode.icon}</span><p class="eyebrow">${state.arenaBonuses.includes(mode.id) ? 'XP BONUS EARNED' : 'FIRST CORRECT ANSWER: +12 XP'}</p><h2>${escapeHTML(mode.name)}</h2><p>${escapeHTML(mode.description)}</p><button type="button" class="button button-secondary arena-start" data-mode="${mode.id}">PRACTICE MODE →</button></article>`).join('')}</div>
        <p class="arena-progress-note">Arena progress: ${state.arenaBonuses.length} / ${ARENA_MODES.length} first-try bonuses earned.</p>`;
      $$('.arena-start', target).forEach(button => button.addEventListener('click', () => startArenaMode(button.dataset.mode)));
      return;
    }
    const mode = ARENA_MODES.find(item => item.id === run.modeId);
    const question = run.question;
    const result = question.result;
    target.innerHTML = `<section class="panel activity-panel arena-activity"><div class="screen-toolbar"><button type="button" class="button button-quiet" id="arena-modes">← ALL PRACTICE MODES</button><span class="toolbar-label">${escapeHTML(mode.name.toUpperCase())}</span></div>
      <p class="eyebrow">ARENA ROUND · ${state.arenaBonuses.includes(mode.id) ? 'BONUS ALREADY EARNED' : '+12 XP FIRST-CORRECT BONUS'}</p><h1>${escapeHTML(mode.name)}</h1>
      ${renderQuestionCard(question, result || null)}
      <div class="challenge-actions">${result
        ? `<button type="button" class="button button-primary" id="arena-again">NEW RANDOM QUESTION</button><button type="button" class="button button-quiet" id="arena-back">CHOOSE ANOTHER MODE</button>`
        : `<button type="button" class="button button-primary submit-answer" id="submit-arena-answer" ${isAnswered(question) ? '' : 'disabled'}>CHECK ANSWER</button>`}
      </div></section>`;
    bindQuestionCard(target, question, renderArena);
    const submit = $('#submit-arena-answer');
    if (submit) submit.addEventListener('click', submitArenaAnswer);
    $('#arena-again')?.addEventListener('click', () => startArenaMode(run.modeId));
    $('#arena-back')?.addEventListener('click', () => { state.arenaRun = null; persist(); renderArena(); });
    $('#arena-modes')?.addEventListener('click', () => { state.arenaRun = null; persist(); renderArena(); });
  }

  function submitArenaAnswer() {
    const run = state.arenaRun;
    const question = run?.question;
    if (!question || question.result || !isAnswered(question)) return;
    const correct = getQuestionAnswer(question);
    question.result = { correct };
    recordAnswer(question, correct);
    persist();
    if (correct && !state.arenaBonuses.includes(run.modeId)) {
      state.arenaBonuses.push(run.modeId);
      persist();
      awardXP(12, `${ARENA_MODES.find(mode => mode.id === run.modeId).name} bonus`);
    } else {
      updateProgress();
    }
    renderArena();
  }

  function renderFRQHome() {
    const target = $('#frq-content');
    const completeCount = state.frqCompleted.length;
    target.innerHTML = `<section class="panel frq-intro"><p class="eyebrow">AP-STYLE FREE RESPONSE · GUIDED CODING</p><h1>FRQ Command Center</h1><p>Work through five Unit 2 challenges with a plan, then reveal hints, a starter, walkthrough, and complete solution as needed. Submit your work for AP-style rubric feedback. Rubrics are self-assessed practice, not official AP scoring or automatic Java compilation.</p>
      <div class="frq-test-tools"><button type="button" class="button button-quiet" id="frq-test-unlock">TESTING ONLY · ADD 300 XP &amp; UNLOCK ALL FRQs</button><span>Local browser progress only; this bypasses normal XP and level requirements.</span></div>
      <div class="frq-progress"><span>${completeCount} / ${FRQ_LEVELS.length} LEVELS COMPLETE · +12 XP PER LEVEL ON FIRST COMPLETION</span><div class="progress-track"><span style="width:${(completeCount / FRQ_LEVELS.length) * 100}%"></span></div></div></section>
      <div class="frq-level-list">${FRQ_LEVELS.map((level, index) => {
        const unlocked = state.unlockedFRQ.includes(level.id);
        const complete = state.frqCompleted.includes(level.id);
        const prereq = index === 0 ? '' : ` · Complete Level ${index} first`;
        return `<article class="frq-level panel ${unlocked ? 'frq-unlocked' : 'frq-locked'} ${complete ? 'frq-complete' : ''}">
          <span class="frq-level-icon" aria-hidden="true">${complete ? '✓' : unlocked ? '⌁' : '🔒'}</span>
          <div><p class="eyebrow">${complete ? 'LEVEL COMPLETE' : unlocked ? 'ACCESS GRANTED' : `LOCKED · ${level.threshold} XP${prereq}`}</p><h2>${escapeHTML(level.title)}</h2><p>${escapeHTML(frqDescription(level.id))}</p></div>
          <button type="button" class="button ${unlocked ? 'button-secondary' : 'button-quiet'} frq-start" data-level="${level.id}" ${unlocked ? '' : 'disabled'}>${complete ? 'REVIEW / RETRY' : unlocked ? 'START LEVEL' : 'LOCKED'}</button>
        </article>`;
      }).join('')}</div>`;
    $$('.frq-start', target).forEach(button => button.addEventListener('click', () => startFRQ(button.dataset.level)));
    $('#frq-test-unlock', target).addEventListener('click', enableFRQTesting);
  }

  function enableFRQTesting() {
    state.xp = Math.min(MAX_XP, state.xp + 300);
    state.unlockedFRQ = Array.from(new Set([...state.unlockedFRQ, ...FRQ_LEVELS.map(level => level.id)]));
    persist();
    updateProgress();
    renderFRQHome();
    showToast('Testing enabled: +300 XP and all five FRQ levels unlocked.');
  }

  function frqDescription(id) {
    const task = FRQ_TASKS[id]?.[0];
    return task ? task.overview : 'Guided AP CSA Unit 2 free-response practice.';
  }

  function startFRQ(levelId, retry = false) {
    if (!state.unlockedFRQ.includes(levelId)) {
      showToast('Earn the required XP and complete the previous FRQ level to unlock this challenge.');
      return;
    }
    const tasks = FRQ_TASKS[levelId];
    if (!tasks) return;
    if (!state.frqRuns[levelId] || retry) {
      state.frqRuns[levelId] = { taskIndex: 0, responses: [], help: {} };
    }
    persist();
    renderFRQRun(levelId);
  }

  function renderFRQRun(levelId) {
    const target = $('#frq-content');
    const level = FRQ_LEVELS.find(item => item.id === levelId);
    const tasks = FRQ_TASKS[levelId];
    const run = state.frqRuns[levelId];
    if (!level || !tasks || !run) return renderFRQHome();
    if (run.taskIndex >= tasks.length) {
      const allComplete = FRQ_LEVELS.every(item => state.frqCompleted.includes(item.id));
      target.innerHTML = `<section class="panel completion-panel"><div class="completion-mark">✎</div><p class="eyebrow">${allComplete ? 'FRQ TRAINING COMPLETE' : 'FRQ LEVEL COMPLETE'}</p><h1>${allComplete ? 'FRQ Finisher!' : escapeHTML(level.title)}</h1>
        <p>${allComplete ? 'Congratulations! You have completed AP CSA Unit 2 FRQ Training.' : `You completed ${escapeHTML(level.title)}. Continue to the next level when it unlocks, or revisit this challenge for more practice.`}</p>
        <p class="frq-completion-progress">${state.frqCompleted.length} / ${FRQ_LEVELS.length} levels complete · ${allComplete ? 'FRQ Finisher Badge earned.' : 'First completion awards +12 XP.'}</p>
        <div class="completion-actions"><button type="button" class="button button-primary" id="frq-home">RETURN TO FRQ COMMAND</button><button type="button" class="button button-secondary" id="frq-retry">PRACTICE AGAIN</button></div></section>`;
      $('#frq-home').addEventListener('click', renderFRQHome);
      $('#frq-retry').addEventListener('click', () => startFRQ(levelId, true));
      return;
    }
    const index = run.taskIndex;
    const task = tasks[index];
    const saved = run.responses[index] || { text: '', checks: [], planning: {} };
    const help = run.help[index] || {};
    target.innerHTML = `<section class="panel frq-task-panel">
      <div class="section-heading"><div><p class="eyebrow">${escapeHTML(level.title.toUpperCase())}</p><h1>${escapeHTML(task.title)}</h1></div><span class="question-count">${index + 1} / ${tasks.length}</span></div>
      <div class="challenge-progress"><span style="width:${((index + 1) / tasks.length) * 100}%"></span></div>
      <section class="frq-content-section"><p class="eyebrow">PROBLEM OVERVIEW</p><p class="frq-prompt">${escapeHTML(task.overview)}</p><p class="frq-prompt"><strong>Your task:</strong> ${escapeHTML(task.prompt)}</p></section>
      <section class="frq-content-section"><p class="eyebrow">LEARNING OBJECTIVES</p><ul class="frq-objectives">${task.objectives.map(objective => `<li>${escapeHTML(objective)}</li>`).join('')}</ul></section>
      <section class="frq-samples">
        <div class="frq-content-section"><p class="eyebrow">SAMPLE INPUT</p><pre class="code-block"><code>${displayCode(task.sampleInput)}</code></pre></div>
        <div class="frq-content-section"><p class="eyebrow">SAMPLE OUTPUT</p><pre class="code-block"><code>${displayCode(task.sampleOutput)}</code></pre></div>
      </section>
      <section class="frq-content-section"><p class="eyebrow">PLAN BEFORE YOU CODE</p><h2>Planning section</h2><p class="micro-copy">Record your approach. Your notes save automatically on this device.</p>
        <div class="frq-planning-grid">${FRQ_PLANNING_FIELDS.map(field => `<label class="frq-planning-field" for="frq-plan-${field.id}"><strong>${escapeHTML(field.label)}</strong><span>${escapeHTML(field.prompt)}</span><textarea id="frq-plan-${field.id}" data-frq-planning="${field.id}" rows="2">${escapeHTML(saved.planning?.[field.id] || '')}</textarea></label>`).join('')}</div>
      </section>
      <details class="frq-reveal"><summary>Reveal partial solution · starter code with missing logic</summary><pre class="code-block"><code>${displayCode(task.starter)}</code></pre><button type="button" class="button button-quiet" id="insert-frq-starter">INSERT STARTER INTO RESPONSE</button></details>
      <section class="frq-content-section"><p class="eyebrow">GUIDED HINTS</p><div class="frq-help-row">
        <div class="help-item"><button type="button" class="help-button ${help.hint1 ? 'help-open' : ''}" data-frq-help="hint1">HINT 1 · CONCEPT</button>${help.hint1 ? `<p class="help-copy">${escapeHTML(task.hint1)}</p>` : ''}</div>
        <div class="help-item"><button type="button" class="help-button ${help.hint2 ? 'help-open' : ''}" data-frq-help="hint2" ${help.hint1 ? '' : 'disabled'}>HINT 2 · NEXT STEP</button>${help.hint2 ? `<p class="help-copy">${escapeHTML(task.hint2)}</p>` : ''}</div>
      </div></section>
      <details class="frq-reveal"><summary>Reveal common mistakes</summary><ul class="frq-objectives">${task.commonMistakes.map(mistake => `<li>${escapeHTML(mistake)}</li>`).join('')}</ul></details>
      <details class="frq-reveal"><summary>Reveal solution walkthrough</summary><ol class="frq-objectives">${task.walkthrough.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol></details>
      <label class="answer-label" for="frq-response">Your Java response</label>
      <textarea id="frq-response" class="frq-response" rows="9" spellcheck="false" placeholder="Write your method or algorithm here. Reveal the starter code above if you need a scaffold.">${escapeHTML(saved.text || '')}</textarea>
      <details class="frq-reveal"><summary>Reveal complete Java solution</summary><pre class="code-block"><code>${displayCode(task.solution)}</code></pre></details>
      <div class="rubric-box"><div class="section-heading"><div><p class="eyebrow">SELF-ASSESSMENT</p><h2>Rubric checklist</h2></div><span class="micro-copy">1 point each</span></div>
        <p class="micro-copy">Evaluate your work in each AP-style category before submitting for feedback.</p>
        <div class="rubric-list">${task.rubric.map((criterion, criterionIndex) => `<label class="rubric-item"><input type="checkbox" class="rubric-check" data-criterion="${criterionIndex}" ${saved.checks.includes(criterionIndex) ? 'checked' : ''} ${saved.submitted ? 'disabled' : ''}><span><strong>${escapeHTML(criterion.category)}:</strong> ${escapeHTML(criterion.criterion)}</span></label>`).join('')}</div>
      </div>
      ${saved.submitted ? `<div class="answer-feedback ${saved.score === task.rubric.length ? 'correct' : 'review'}"><strong>Self-assessed rubric: ${saved.score} / ${task.rubric.length} points.</strong> ${escapeHTML(saved.feedback)}<ul class="frq-feedback-list">${task.rubric.map((criterion, criterionIndex) => `<li><strong>${escapeHTML(criterion.category)}:</strong> ${saved.checks.includes(criterionIndex) ? 'Criterion self-assessed as met.' : 'Review this criterion and revise your response.'}</li>`).join('')}</ul></div>` : ''}
      <div class="challenge-actions">${saved.submitted
        ? `<button type="button" class="button button-primary" id="frq-next">COMPLETE LEVEL</button>`
        : `<button type="button" class="button button-primary" id="submit-frq">SUBMIT FOR RUBRIC FEEDBACK</button>`}
        <button type="button" class="button button-quiet" id="exit-frq">SAVE &amp; RETURN</button>
      </div>
      <p class="micro-copy">This offline tool does not compile or automatically grade Java code. Rubric feedback is guided self-review, not an official AP score.</p>
    </section>`;
    const response = $('#frq-response', target);
    response.addEventListener('input', () => {
      const current = run.responses[index] || { checks: [], planning: {} };
      run.responses[index] = { ...current, text: response.value };
      persist();
    });
    $$('[data-frq-planning]', target).forEach(input => input.addEventListener('input', () => {
      const current = run.responses[index] || { text: response.value, checks: [], planning: {} };
      current.planning = current.planning || {};
      current.planning[input.dataset.frqPlanning] = input.value;
      run.responses[index] = current;
      persist();
    }));
    $$('.rubric-check', target).forEach(input => input.addEventListener('change', () => {
      const current = run.responses[index] || { text: response.value, checks: [], planning: {} };
      current.text = response.value;
      current.checks = $$('.rubric-check:checked', target).map(box => Number(box.dataset.criterion));
      run.responses[index] = current;
      persist();
    }));
    $$('[data-frq-help]', target).forEach(button => button.addEventListener('click', () => {
      if (button.dataset.frqHelp === 'hint2' && !run.help[index]?.hint1) return;
      run.help[index] = run.help[index] || {};
      run.help[index][button.dataset.frqHelp] = !run.help[index][button.dataset.frqHelp];
      persist();
      renderFRQRun(levelId);
    }));
    $('#insert-frq-starter').addEventListener('click', () => {
      response.value = task.starter;
      response.dispatchEvent(new Event('input', { bubbles: true }));
      response.focus();
    });
    $('#submit-frq')?.addEventListener('click', () => submitFRQTask(levelId, task));
    $('#frq-next')?.addEventListener('click', () => advanceFRQ(levelId, tasks.length));
    $('#exit-frq').addEventListener('click', () => {
      persist();
      renderFRQHome();
    });
  }

  function submitFRQTask(levelId, task) {
    const run = state.frqRuns[levelId];
    const index = run.taskIndex;
    const response = $('#frq-response').value.trim();
    if (!response) {
      showToast('Write a response before submitting it for rubric feedback.');
      $('#frq-response').focus();
      return;
    }
    const checks = $$('.rubric-check:checked').map(input => Number(input.dataset.criterion));
    const score = checks.length;
    const feedback = score === task.rubric.length
      ? 'Strong self-assessment: every rubric category is covered. Compare your result with the sample and test a boundary case.'
      : score >= Math.ceil(task.rubric.length / 2)
        ? 'Good progress. Revisit unchecked categories, then trace your algorithm with the sample and a boundary case.'
        : 'Revisit the planning notes and revealed guidance. Revise your algorithm against each unchecked rubric category.';
    const current = run.responses[index] || { planning: {} };
    run.responses[index] = { ...current, text: response, checks, score, submitted: true, feedback };
    persist();
    renderFRQRun(levelId);
  }

  function advanceFRQ(levelId, taskCount) {
    const run = state.frqRuns[levelId];
    if (run.taskIndex < taskCount - 1) {
      run.taskIndex += 1;
      persist();
      renderFRQRun(levelId);
      return;
    }
    const firstCompletion = !state.frqCompleted.includes(levelId);
    if (firstCompletion) state.frqCompleted.push(levelId);
    run.taskIndex = taskCount;
    persist();
    if (firstCompletion) awardXP(12, `${FRQ_LEVELS.find(item => item.id === levelId).title} completion`);
    else updateUnlocks(false);
    if (FRQ_LEVELS.every(item => state.frqCompleted.includes(item.id))) awardBadge('frq');
    renderFRQRun(levelId);
  }

  function requiredFinalTopics() {
    return ['boolean', 'selection', 'nested', 'compound', 'while', 'for', 'strings', 'debugging', 'runtime'];
  }

  function startFinalChallenge() {
    const required = requiredFinalTopics().map(topic => {
      const candidates = QUESTION_BANK.filter(question => question.topic === topic);
      if (!candidates.length) throw new Error(`Final challenge is missing questions for ${topic}.`);
      return candidates[Math.floor(Math.random() * candidates.length)];
    });
    const used = new Set(required.map(question => question.id));
    const extra = shuffle(QUESTION_BANK.filter(question => !used.has(question.id))).slice(0, 25 - required.length);
    state.finalRun = { questions: shuffle([...required, ...extra]).map(prepareQuestion), index: 0, answers: {}, result: null };
    persist();
    renderFinalChallenge();
    showScreen('final-screen');
  }

  function renderFinalChallenge() {
    const target = $('#final-content');
    const run = state.finalRun;
    if (!run) {
      target.innerHTML = `<section class="panel assessment-panel"><p class="eyebrow">FINAL CHECKPOINT</p><h1>Unit 2 Final Challenge</h1><p>Answer 25 randomized questions covering Boolean logic, selection, nested decisions, loops, Strings, debugging, and runtime analysis. Passing score: 80%.</p><button type="button" class="button button-primary" id="start-final-run">BEGIN 25-QUESTION CHALLENGE</button></section>`;
      $('#start-final-run').addEventListener('click', startFinalChallenge);
      return;
    }
    if (run.result) {
      renderFinalResult(run.result);
      return;
    }
    const index = run.index;
    const question = run.questions[index];
    const saved = run.answers[index];
    if (saved) {
      question.selected = saved.selected;
      question.draft = saved.draft;
      if (saved.matchesSelected) question.matchesSelected = saved.matchesSelected;
    }
    const answered = Object.keys(run.answers).length;
    target.innerHTML = `<section class="panel assessment-panel">
      <div class="assessment-head"><div><p class="eyebrow">FINAL CHECKPOINT · RANDOMIZED QUESTION SET</p><h1>Unit 2 Final Challenge</h1><p>Choose an answer, then continue. Your progress saves automatically.</p></div><div class="assessment-meter"><strong>${answered}/25</strong>ANSWERED</div></div>
      <div class="challenge-progress"><span style="width:${((index + 1) / run.questions.length) * 100}%"></span></div>
      <p class="final-question-number">QUESTION ${String(index + 1).padStart(2, '0')} OF 25</p>
      ${renderQuestionCard(question)}
      <div class="challenge-actions">
        <button type="button" class="button button-quiet" id="final-previous" ${index === 0 ? 'disabled' : ''}>← PREVIOUS</button>
        <button type="button" class="button button-primary" id="final-next" ${isAnswered(question) ? '' : 'disabled'}>${index === run.questions.length - 1 ? 'SUBMIT CHALLENGE' : 'SAVE &amp; NEXT →'}</button>
      </div>
      <p class="question-status">An answer is required before moving to the next question. Hints and explanations are available.</p>
    </section>`;
    bindQuestionCard(target, question, renderFinalChallenge);
    $('#final-previous').addEventListener('click', () => {
      if (index > 0) {
        run.answers[index] = { selected: question.selected, draft: question.draft, matchesSelected: question.matchesSelected };
        run.index -= 1;
        persist();
        renderFinalChallenge();
      }
    });
    $('#final-next').addEventListener('click', () => advanceFinalQuestion(index));
  }

  function advanceFinalQuestion(index) {
    const run = state.finalRun;
    const question = run.questions[index];
    if (!isAnswered(question)) return;
    run.answers[index] = { selected: question.selected, draft: question.draft, matchesSelected: question.matchesSelected };
    if (index < run.questions.length - 1) {
      run.index += 1;
      persist();
      renderFinalChallenge();
      return;
    }
    const correctByTopic = {};
    let correctCount = 0;
    run.questions.forEach((item, questionIndex) => {
      const answer = run.answers[questionIndex];
      item.selected = answer.selected;
      item.draft = answer.draft;
      if (answer.matchesSelected) item.matchesSelected = answer.matchesSelected;
      const correct = getQuestionAnswer(item);
      item.result = { correct };
      recordAnswer(item, correct);
      const topic = item.topic || item.kind;
      if (!correctByTopic[topic]) correctByTopic[topic] = { correct: 0, total: 0 };
      correctByTopic[topic].total += 1;
      if (correct) {
        correctCount += 1;
        correctByTopic[topic].correct += 1;
      }
    });
    const percent = Math.round((correctCount / run.questions.length) * 100);
    run.result = { correct: correctCount, total: run.questions.length, percent, passed: percent >= 80, byTopic: correctByTopic };
    state.finalScore = percent;
    if (run.result.passed) {
      awardBadge('champion');
      if (state.completedMissions.length === MISSIONS.length && state.xp < MAX_XP) awardXP(MAX_XP - state.xp, 'Unit 2 completion');
    }
    persist();
    renderFinalChallenge();
  }

  function renderFinalResult(result) {
    const weakTopics = Object.entries(result.byTopic).filter(([, values]) => values.total > 0 && values.correct / values.total < 0.8).map(([topic]) => topic);
    const topicRows = Object.entries(result.byTopic).map(([topic, values]) => `<div class="topic-result"><span>${escapeHTML(topic)}</span><strong>${values.correct} / ${values.total}</strong></div>`).join('');
    const review = state.finalRun.questions.map((question, index) => `<details class="review-question"><summary>Q${String(index + 1).padStart(2, '0')} · ${question.result.correct ? 'Correct' : 'Review'} · ${escapeHTML(question.topic)}</summary><p>${escapeHTML(question.prompt)}</p>${question.code ? `<pre class="code-block"><code>${displayCode(question.code)}</code></pre>` : ''}<p class="help-copy">${escapeHTML(question.explanation)}</p></details>`).join('');
    $('#final-content').innerHTML = `<section class="panel assessment-result">
      <p class="eyebrow">${result.passed ? 'CONGRATULATIONS' : 'QUEST CONTINUES'}</p><h1>${result.passed ? 'YOU HAVE MASTERED UNIT 2' : 'KEEP BUILDING YOUR SKILLS'}</h1>
      <div class="result-score">${result.percent}%</div><p class="result-rank">${result.correct} / ${result.total} correct · ${result.passed ? 'PASSED' : '80% needed to pass'}</p>
      ${result.passed ? '<p>You earned the AP CSA Champion badge. Your progress is saved on this device.</p>' : `<p>${escapeHTML(weakTopics.length ? `Review these topics: ${weakTopics.join(', ')}.` : 'Review the explanations below and try another randomized set.')}</p>`}
      <div class="topic-result-grid">${topicRows}</div>
      <div class="completion-actions"><button type="button" class="button button-primary" id="retake-final">NEW RANDOM CHALLENGE</button><button type="button" class="button button-quiet" data-screen="home-screen" data-scroll-target="mission-map">RETURN TO QUEST</button></div>
    </section><section class="panel review-panel"><div class="section-heading"><div><p class="eyebrow">LEARN FROM THE TRACE</p><h2>Answer review</h2></div></div>${review}</section>`;
    $('#retake-final').addEventListener('click', startFinalChallenge);
  }

  function renderTeacher() {
    const target = $('#teacher-content');
    const rank = getRank();
    const accuracy = state.stats.attempted ? Math.round((state.stats.correct / state.stats.attempted) * 100) : 0;
    const topics = Object.entries(state.stats.byTopic).sort((a, b) => a[0].localeCompare(b[0]));
    const badgeNames = state.badges.map(id => BADGES.find(badge => badge.id === id)?.name).filter(Boolean);
    target.innerHTML = `<section class="panel teacher-panel">
      <p class="eyebrow">LOCAL PROGRESS SUMMARY</p><h1>Teacher dashboard</h1>
      <p class="teacher-disclaimer">This dashboard reads only the progress saved in this browser. It has no login, server, or shared student records. PBIS and grade-recovery decisions remain with the teacher.</p>
      <div class="teacher-grid">
        ${teacherStat('STUDENT', state.studentName ? escapeHTML(state.studentName) : 'Not entered')}
        ${teacherStat('TOTAL XP', `${state.xp} / ${MAX_XP}`)}
        ${teacherStat('CURRENT RANK', escapeHTML(rank.name))}
        ${teacherStat('MISSION COMPLETION', `${state.completedMissions.length} / ${MISSIONS.length}`)}
        ${teacherStat('TIME SPENT', formatDuration(state.timeSpent))}
        ${teacherStat('FINAL CHALLENGE', state.finalScore === null ? 'Not attempted' : `${state.finalScore}%`)}
        ${teacherStat('FRQ LEVELS', `${state.frqCompleted.length} / ${FRQ_LEVELS.length}`)}
        ${teacherStat('QUESTION ACCURACY', `${accuracy}% (${state.stats.correct} / ${state.stats.attempted})`)}
      </div>
      <div class="teacher-section"><h2>Mission completion</h2><div class="teacher-missions">${MISSIONS.map(mission => `<div class="teacher-mission-row"><span>${escapeHTML(mission.title)}</span><strong>${state.completedMissions.includes(mission.id) ? 'COMPLETE' : 'IN PROGRESS'}</strong></div>`).join('')}</div></div>
      <div class="teacher-section"><h2>Badge unlocks</h2><div class="teacher-badges">${badgeNames.length ? badgeNames.map(name => `<span class="teacher-badge">${escapeHTML(name)}</span>`).join('') : '<span class="micro-copy">No badges earned yet.</span>'}</div></div>
      <div class="teacher-section"><h2>Question accuracy by topic</h2>${topics.length ? `<div class="topic-result-grid">${topics.map(([topic, values]) => `<div class="topic-result"><span>${escapeHTML(topic)}</span><strong>${values.correct} / ${values.attempted} · ${Math.round((values.correct / values.attempted) * 100)}%</strong></div>`).join('')}</div>` : '<p class="micro-copy">Question statistics will appear after the first submitted answer.</p>'}</div>
      <div class="student-entry"><label class="answer-label" for="student-name">Optional student name (saved on this device only)</label><div class="student-entry-row"><input id="student-name" type="text" maxlength="60" autocomplete="name" value="${escapeHTML(state.studentName)}" placeholder="Enter a name"><button type="button" class="button button-secondary" id="save-student-name">SAVE NAME</button></div></div>
    </section>`;
    $('#save-student-name').addEventListener('click', () => {
      state.studentName = $('#student-name').value.trim().slice(0, 60);
      persist();
      showToast(state.studentName ? 'Student name saved on this device.' : 'Student name cleared.');
      renderTeacher();
    });
  }

  function teacherStat(label, value) {
    return `<div class="teacher-stat"><span>${label}</span><strong>${value}</strong></div>`;
  }

  function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    if (hours) return `${hours}h ${minutes % 60}m`;
    if (minutes) return `${minutes}m`;
    return `${seconds}s`;
  }

  function persistTime() {
    const now = Date.now();
    const elapsed = Math.floor((now - lastTimeTick) / 1000);
    if (elapsed > 0) {
      state.timeSpent += elapsed;
      lastTimeTick += elapsed * 1000;
      timeSaveCounter += elapsed;
    }
    if (timeSaveCounter >= 15) {
      timeSaveCounter = 0;
      persist();
    }
  }

  function bindGlobalEvents() {
    document.addEventListener('click', event => {
      const button = event.target.closest('[data-screen]');
      if (!button) return;
      if (button.dataset.screen === 'mission-screen') return;
      showScreen(button.dataset.screen, button.dataset.scrollTarget);
    });
    $('#begin-quest').addEventListener('click', () => {
      const incomplete = MISSIONS.find(mission => !state.completedMissions.includes(mission.id));
      openMission(incomplete?.id || MISSIONS[0].id);
    });
    $('#open-final').addEventListener('click', () => {
      if (!state.finalRun || state.finalRun.result) startFinalChallenge();
      else {
        renderFinalChallenge();
        showScreen('final-screen');
      }
    });
    $('#open-teacher').addEventListener('click', () => showScreen('teacher-screen'));
    $('#close-unlock').addEventListener('click', closeUnlock);
    $('#unlock-overlay').addEventListener('click', event => {
      if (event.target === $('#unlock-overlay')) closeUnlock();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !$('#unlock-overlay').hidden) closeUnlock();
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        persistTime();
        persist();
      } else {
        lastTimeTick = Date.now();
      }
    });
    window.setInterval(persistTime, 1000);
    window.addEventListener('beforeunload', () => {
      persistTime();
      persist();
    });
  }

  function initialize() {
    state = loadState();
    bindGlobalEvents();
    $('#motivation').textContent = MOTIVATION[Math.floor(Math.random() * MOTIVATION.length)];
    updateProgress();
    updateUnlocks(false);
    renderFRQHome();
    showScreen('home-screen');
  }

  initialize();
})();
