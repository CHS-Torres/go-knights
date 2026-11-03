'use strict';

(() => {
  const STORAGE_KEY = 'centennial-apcsa-unit2-xp-academy-v1';
  const MAX_XP = 300;
  const MISSION_VERSION = 4;
  const FINAL_VERSION = 2;
  const FRQ_VERSION = 3;
  const FRQ_LEVELS = [
    { id: 'bead', title: 'Level 1 · Bead Sequence Analyzer' },
    { id: 'formatting', title: 'Level 2 · String Formatting Challenge' },
    { id: 'prefix', title: 'Level 3 · Prefix Search Challenge' },
    { id: 'digits', title: 'Level 4 · Digit Analyzer' },
    { id: 'parser', title: 'Level 5 · Final FRQ Simulation: String Parser' }
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
    { id: 'boolean', name: 'Boolean Logic Badge', icon: '∧', detail: 'Master Boolean logic and compound expressions.' },
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
        'Use <code>number % 10</code> to inspect a last digit and integer <code>number / 10</code> to remove it; handle zero as a special boundary case.',
        'For prefix and delimiter problems, combine <code>indexOf()</code>, <code>substring()</code>, and a length check before taking a substring.',
        'Trace a small example and a boundary example before deciding an algorithm is correct.'
      ],
      code: 'int vowels = 0;\\nfor (int i = 0; i < word.length(); i++) {\\n    char letter = word.charAt(i);\\n    if ("aeiou".indexOf(letter) >= 0) {\\n        vowels++;\\n    }\\n}'
    }
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
      progression: ['Beginner: identify whether a sequence contains R.', 'Intermediate: require both R and G.', 'Advanced: require the sequence to start with R and end with B.', 'Expert extension: count RGB occurrences and compare an exactly-once rule with a contains rule.', 'Master: combine the quality rules into named Boolean helpers and one final decision.'],
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
      overview: 'A school display needs to center a short label inside a fixed-width field. Use dots for padding, keep the text unchanged, and place any extra dot on the right when the padding count is odd.',
      title: 'Center text in a fixed-width field',
      prompt: 'Write centerText so the characters between the bars have exactly width positions. If text is longer than width, keep the text and add no padding.',
      progression: ['Level 1: calculate and add left padding.', 'Level 2: add right padding to reach the requested width.', 'Level 3: center the text by splitting the total padding.', 'Level 4: calculate odd padding with the extra dot on the right.', 'Level 5: implement and trace the complete formatting algorithm.'],
      objectives: ['Calculate available padding from width and text.length()', 'Use integer division to determine left padding', 'Use a loop and StringBuilder to add dots', 'Assign leftover padding to the right'],
      sampleInput: 'width = 10, text = "abc"\\nwidth = 5, text = "ab"',
      sampleOutput: 'Width 10: |...abc....|\\nWidth 5:  |.ab..|',
      starter: `public static String centerText(String text, int width) {
    int padding = Math.max(0, width - text.length());
    int leftPadding = 0;
    int rightPadding = 0;
    StringBuilder result = new StringBuilder("|");
    // TODO: Add left dots, the text, right dots, and a closing bar.
    return result.toString();
}`,
      hint1: 'First find total padding: width - text.length(). Split it into left and right counts.',
      hint2: 'Use padding / 2 for the left side and padding - leftPadding for the right side. This puts an odd extra dot on the right.',
      commonMistakes: ['Putting the odd extra dot on the left instead of the right.', 'Using text.length() - width, which reverses the padding calculation.', 'Forgetting that integer division rounds down.', 'Using the same count for both sides when padding is odd.'],
      walkthrough: ['Compute total padding as the larger of zero and width minus the text length.', 'Set leftPadding to integer division padding / 2; this rounds down.', 'Set rightPadding to padding - leftPadding so both sides add to the total.', 'Use one loop to append left dots, append text, then use a second loop for right dots.', 'Add the closing bar and return the completed result.'],
      rubric: makeFRQRubric([
        'Keeps text intact and applies the stated behavior when text is longer than width.',
        'Uses loops with correct bounds to append the requested padding.',
        'Computes padding from width and text.length() and uses integer division correctly.',
        'Tracks total, left, and right padding so the odd extra dot goes on the right.',
        'Returns |...abc....| for width 10 and |.ab..| for width 5.'
      ]),
      solution: `public class StringFormattingChallenge {
    // Centers text without truncating it when it exceeds the requested width.
    public static String centerText(String text, int width) {
        int padding = Math.max(0, width - text.length());

        // Integer division gives the left side the smaller half.
        int leftPadding = padding / 2;
        // The subtraction keeps the total exact and puts any odd dot on the right.
        int rightPadding = padding - leftPadding;
        StringBuilder result = new StringBuilder("|");

        for (int i = 0; i < leftPadding; i++) {
            result.append('.');
        }

        result.append(text);

        for (int i = 0; i < rightPadding; i++) {
            result.append('.');
        }

        result.append('|');
        return result.toString();
    }

    public static void main(String[] args) {
        System.out.println(centerText("abc", 10));
        System.out.println(centerText("ab", 5));
    }
}`
    }],
    prefix: [{
      overview: 'A search system needs to count how many words in a list begin with a requested prefix. A word shorter than the prefix cannot match.',
      title: 'Count words with a prefix',
      prompt: 'Write countPrefixMatches to count the words that begin with prefix. Match case exactly and avoid taking a substring longer than its word.',
      progression: ['Level 1: identify the prefix String and its length.', 'Level 2: compare the first characters of one word.', 'Level 3: count matching words in a list.', 'Level 4: skip words shorter than the prefix before taking a substring.', 'Level 5: complete the full AP-style search and return the count.'],
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
      progression: ['Level 1: extract the last digit with number % 10.', 'Level 2: count digits while number > 0.', 'Level 3: add each extracted digit to a sum.', 'Level 4: track the largest digit seen so far.', 'Level 5: combine the analyses and handle the input 0 correctly.'],
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
      progression: ['Level 1: locate one delimiter with indexOf().', 'Level 2: extract a field with substring().', 'Level 3: find a second delimiter starting after the first.', 'Level 4: calculate the start and end indexes for every field.', 'Level 5: return all parsed fields in the required order.'],
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
    frqVersion: FRQ_VERSION,
    frqCompleted: [],
    frqRuns: {},
    currentMissionRun: null,
    finalRun: null,
    finalScore: null,
    missionVersion: MISSION_VERSION,
    finalVersion: FINAL_VERSION,
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
      if (saved.finalVersion !== FINAL_VERSION) {
        merged.finalRun = null;
        merged.finalScore = null;
        merged.finalVersion = FINAL_VERSION;
      }
      if (saved.missionVersion !== MISSION_VERSION) {
        merged.currentMissionRun = null;
        merged.missionVersion = MISSION_VERSION;
      }
      ['arenaBonuses', 'arenaRun', 'bossRun', 'bossRuns', 'bossScores', 'adaptiveBand'].forEach(key => delete merged[key]);
      delete merged.unlockedFRQ;
      merged.stats = { ...initial.stats, ...(saved.stats || {}) };
      merged.stats.byTopic = merged.stats.byTopic && typeof merged.stats.byTopic === 'object' ? merged.stats.byTopic : {};
      merged.completedMissions = Array.isArray(merged.completedMissions) ? merged.completedMissions : [];
      merged.badges = Array.isArray(merged.badges) ? merged.badges : [];
      if (saved.frqVersion !== FRQ_VERSION) {
        merged.frqVersion = FRQ_VERSION;
        merged.frqCompleted = [];
        merged.frqRuns = {};
        merged.badges = merged.badges.filter(badge => badge !== 'frq');
      } else {
        const frqIds = new Set(FRQ_LEVELS.map(level => level.id));
        merged.frqCompleted = Array.isArray(merged.frqCompleted) ? merged.frqCompleted.filter(id => frqIds.has(id)) : [];
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
    if (id === 'missions-screen') {
      $('#mission-map').hidden = false;
      $('#mission-detail').hidden = true;
      renderMissionCards();
    }
    if (id === 'frq-screen') renderFRQHome();
    if (id === 'final-screen') renderFinalChallenge();
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
    renderFRQHome();
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
      const choices = [correct, ...Array.from(distractors).slice(0, 3)].map(String);
      questions.push({
        id: `mc-${index + 1}`, kind: 'multipleChoice', topic: mission, mission,
        prompt: 'What is the value of result after this code runs?',
        code: `int score = ${a};\\nint result;\\nif (score ${operator} ${b}) {\\n    result = ${a + 4};\\n} else {\\n    result = ${b + 6};\\n}`,
        choices, answer: choices.indexOf(String(correct)),
        explanation: `Evaluate ${a} ${operator} ${b}: the condition is ${condition}. ${condition ? 'The if branch assigns' : 'The else branch assigns'} result = ${correct}.`,
        hints: ['Evaluate the condition before following either branch.', 'Only one branch assigns result.']
      });
    }

    const comparisonOperators = ['>', '<', '>=', '<=', '==', '!='];
    for (let index = 0; index < 15; index++) {
      const left = 4 + ((index * 7) % 19);
      const right = index % comparisonOperators.length === 4 ? left : 3 + ((index * 5 + 2) % 17);
      const operator = comparisonOperators[index % comparisonOperators.length];
      const correct = operator === '>' ? left > right
        : operator === '<' ? left < right
          : operator === '>=' ? left >= right
            : operator === '<=' ? left <= right
              : operator === '==' ? left === right
                : left !== right;
      questions.push({
        id: `compare-${index + 1}`, kind: 'boolean', topic: 'boolean', mission: 'boolean',
        prompt: `Compare ${left} ${operator} ${right}.`,
        code: `boolean result = ${left} ${operator} ${right};`,
        choices: ['true', 'false'], answer: null, correctValue: String(correct),
        explanation: `${left} ${operator} ${right} evaluates to ${correct}.`,
        hints: ['Read the comparison operator carefully.', 'Check whether the left value satisfies the comparison with the right value.']
      });
    }

    const schoolScenarios = [
      { name: 'PBIS reward', expression: 'points >= 20 && referrals == 0', points: 24, referrals: 0, result: true },
      { name: 'Honor Roll', expression: 'gpa >= 3.5 && missingAssignments == 0', gpa: 3.7, missingAssignments: 0, result: true },
      { name: 'Sports eligibility', expression: 'gpa >= 2.0 && attendance >= 90', gpa: 2.4, attendance: 92, result: true },
      { name: 'Parking permit', expression: 'hasLicense && grade >= 11', hasLicense: true, grade: 10, result: false },
      { name: 'School club', expression: 'hasApplication || isReturningMember', hasApplication: false, isReturningMember: true, result: true },
      { name: 'AP exam exemption', expression: 'score >= 90 && attendance >= 95', score: 93, attendance: 94, result: false },
      { name: 'Scholarship review', expression: 'gpa >= 3.8 || serviceHours >= 50', gpa: 3.6, serviceHours: 55, result: true },
      { name: 'Attendance alert', expression: 'absences > 5 && !hasExcuse', absences: 7, hasExcuse: false, result: true },
      { name: 'PBIS celebration', expression: 'points >= 30 && isOnTrack', points: 32, isOnTrack: true, result: true },
      { name: 'Club trip', expression: 'permissionSlip && feePaid', permissionSlip: true, feePaid: false, result: false }
    ];
    schoolScenarios.forEach((scenario, index) => {
      const values = Object.entries(scenario).filter(([key]) => !['name', 'expression', 'result'].includes(key))
        .map(([key, value]) => `${key} = ${value}`).join(', ');
      const mission = ['boolean', 'selection', 'decision', 'nested', 'compound'][index % 5];
      questions.push({
        id: `scenario-${index + 1}`, kind: 'boolean', topic: mission, mission,
        prompt: `For the ${scenario.name} rule, evaluate the condition when ${values}.`,
        code: `boolean qualifies = ${scenario.expression};`,
        choices: ['true', 'false'], answer: null, correctValue: String(scenario.result),
        explanation: `Substitute the listed values into each part of the ${scenario.name.toLowerCase()} rule. The result is ${scenario.result}.`,
        hints: ['Substitute each value before combining the conditions.', 'Evaluate parentheses and ! first, then &&, then ||.']
      });
    });

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
        choices: ['true', 'false'], answer: null,
        explanation: `Substitute the Boolean values and apply ! before && before ||. The expression evaluates to ${answer}.`,
        correctValue: String(answer),
        hints: ['Evaluate ! first, then &&, then ||.', 'Use parentheses to evaluate the grouped expression first.']
      });
    }

    const loopMissions = ['while', 'for', 'algorithm', 'debugging'];
    for (let index = 0; index < 20; index++) {
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

    const sampleStrings = [
      'KNIGHT', 'iteration', 'beadSequence', 'Centennial', 'algorithm', 'Boolean',
      'studentEmail', 'ParkingPass', 'honorRoll', 'PBISreward', 'scholarship',
      'APExamReady', 'clubMember', 'attendance', 'gradeSummary', 'studentID',
      'schoolDomain', 'phoneNumber', 'FirstLast', 'passwordCheck', 'hashTag',
      'vowelCount', 'initials', 'domainName', 'studentRecord', 'eligibility',
      'StringParser', 'prefixSearch', 'loopCounter', 'scoreAverage'
    ];
    for (let index = 0; index < 30; index++) {
      const value = sampleStrings[index];
      const mode = index % 4;
      if (mode === 2) {
        const count = Math.max(1, value.length - 1);
        questions.push({
          id: `str-${index + 1}`, kind: 'string', topic: 'debugging', mission: 'debugging', format: 'bug',
          prompt: `The goal is to return the first ${count} characters of "${value}". What corrected expression avoids including one extra character?`,
          code: `String text = "${value}";\\nString result = text.substring(0, ${count + 1});`,
          answer: `text.substring(0, ${count})`,
          explanation: `The end index of substring is exclusive. Using ${count} as the end returns exactly the first ${count} characters.`,
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
      },
      {
        prompt: 'Complete the condition so only students with at least 90% attendance qualify.',
        code: 'boolean eligible = attendance /* missing comparison */ 90;',
        answer: '>=',
        hints: ['Exactly 90% should qualify.', 'Use an inclusive comparison.']
      },
      {
        prompt: 'Complete the update so the loop checks every index in text.',
        code: 'for (int i = 0; i < text.length(); /* missing update */) {\\n    inspect(text.charAt(i));\\n}',
        answer: 'i++',
        hints: ['Move to the next character after each check.', 'Advance the index by one.']
      },
      {
        prompt: 'Complete the update so total contains the running average inputs sum.',
        code: 'for (int score : scores) {\\n    /* missing update */\\n}',
        answer: 'total += score;',
        hints: ['total is an accumulator.', 'Add the current score to total.']
      },
      {
        prompt: 'Complete the test so a String search counts a match only when indexOf finds it.',
        code: 'if (text.indexOf(target) /* missing comparison */) {\\n    matches++;\\n}',
        answer: '>= 0',
        hints: ['indexOf returns -1 when no match is found.', 'A found position is zero or greater.']
      },
      {
        prompt: 'Complete the boundary so the loop visits every character index exactly once.',
        code: 'for (int i = 0; i /* missing condition */ text.length(); i++) {\\n    inspect(text.charAt(i));\\n}',
        answer: '<',
        hints: ['The final valid index is one less than length().', 'Use a strict less-than comparison.']
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
      boolean: 45,
      loop: 20,
      string: 30,
      algorithm: 15
    };
    const missingCategories = Object.entries(requiredCounts).filter(([kind, minimum]) =>
      questions.filter(question => question.kind === kind).length < minimum
    );
    if (questions.length < 150 || missingCategories.length) {
      throw new Error(`Question bank does not meet the minimum size or category counts (${questions.length} questions).`);
    }
    return questions.map((question, index) => ({ ...question, difficulty: question.difficulty || (index % 5) + 1 }));
  }
  const QUESTION_BANK = getQuestionBank();

  function makeChoiceQuestion(id, topic, prompt, code, correct, distractors, explanation, difficulty) {
    const choices = [String(correct), ...distractors.map(String)].filter((value, index, values) => values.indexOf(value) === index);
    while (choices.length < 4) choices.push(`Review ${choices.length}`);
    return {
      id, kind: 'multipleChoice', topic, mission: topic, prompt, code,
      choices, answer: choices.indexOf(String(correct)), explanation,
      hints: ['Trace the code in order and write down the changing values.', 'Check the boundary condition before choosing an answer.'],
      difficulty
    };
  }

  const MISSION_PASS_SCORE = 1;

  function makeMissionChallengeQuestion(mission) {
    const challenge = {
      prerequisite: {
        prompt: 'A String report adds 2 points when the required substring is present. What is the final score?',
        code: 'String code = "knight";\\nint score = code.length();\\nif (code.substring(1, 3).equals("ni")) score += 2;',
        answer: '8', distractors: ['6', '7', '9'],
        explanation: 'The String has length 6 and substring(1, 3) is "ni", so the conditional adds 2.'
      },
      boolean: {
        prompt: 'PBIS eligibility requires at least 20 points, no referrals, and either student or staff status. Is this student eligible?',
        code: 'boolean eligible = 24 >= 20 && 0 == 0 && (true || false);',
        answer: 'true', distractors: ['false', '24', '0'],
        explanation: 'All three requirements are met, so the compound Boolean expression is true.'
      },
      selection: {
        prompt: 'Honor Roll requires a GPA of at least 3.5, attendance of at least 90%, and no missing assignments. What status is printed for this student?',
        code: 'double gpa = 3.7;\\nint attendance = 92;\\nint missingAssignments = 0;\\nif (gpa >= 3.5 && attendance >= 90 && missingAssignments == 0) System.out.println("HONOR ROLL");\\nelse System.out.println("REVIEW");',
        answer: 'HONOR ROLL', distractors: ['REVIEW', 'PERFECT ATTENDANCE', 'No output'],
        explanation: 'All three requirements are met: GPA is high enough, attendance reaches 90%, and no assignments are missing.'
      },
      decision: {
        prompt: 'The award system checks score first, then attendance. What reward is assigned?',
        code: 'int score = 88;\\nint attendance = 96;\\nString reward;\\nif (score >= 90) reward = "gold";\\nelse if (score >= 80 && attendance >= 95) reward = "silver";\\nelse reward = "practice";',
        answer: 'silver', distractors: ['gold', 'practice', 'none'],
        explanation: 'The first condition is false; the next condition has both score and attendance requirements true.'
      },
      nested: {
        prompt: 'A club member earns gold at 80 points and silver otherwise. What reward is assigned?',
        code: 'boolean member = true;\\nint points = 85;\\nString reward = "none";\\nif (member) {\\n    if (points >= 80) reward = "gold";\\n    else reward = "silver";\\n}',
        answer: 'gold', distractors: ['silver', 'none', 'bronze'],
        explanation: 'The outer membership condition is true, so the nested points condition runs and selects gold.'
      },
      compound: {
        prompt: 'A student needs a ticket, an approved school role, and no suspension. Is entry allowed?',
        code: 'boolean allowed = true && (true || false) && !false;',
        answer: 'true', distractors: ['false', 'true && false', 'false || false'],
        explanation: 'The ticket and role requirements are true, and negating false gives true.'
      },
      while: {
        prompt: 'A student attendance analyzer scans five school days. The student is absent on day 3. How many days are counted as present, and does the student meet the four-day attendance requirement?',
        code: 'int day = 1;\\nint presentDays = 0;\\nwhile (day <= 5) {\\n    if (day != 3) presentDays++;\\n    day++;\\n}\\nboolean meetsRequirement = presentDays >= 4;',
        answer: '4 days, true', distractors: ['5 days, true', '4 days, false', '3 days, false'],
        explanation: 'The loop processes days 1 through 5. Only day 3 is an absence, so four days are present and the requirement is met.'
      },
      for: {
        prompt: 'The report adds odd day numbers through 5. What total is reported?',
        code: 'int total = 0;\\nfor (int day = 1; day <= 5; day++) {\\n    if (day % 2 == 1) total += day;\\n}',
        answer: '9', distractors: ['15', '6', '5'],
        explanation: 'The selection condition adds 1, 3, and 5, for a total of 9.'
      },
      strings: {
        prompt: 'The school email generator keeps the first three characters of a student username, counts its vowels, and checks for a minimum of two. What email prefix is produced?',
        code: 'String username = "sophie";\\nString prefix = username.substring(0, 3);\\nint vowels = 0;\\nfor (int i = 0; i < username.length(); i++) {\\n    if ("aeiou".indexOf(username.charAt(i)) >= 0) vowels++;\\n}\\nif (vowels >= 2) System.out.println(prefix + "@");\\nelse System.out.println("REVIEW");',
        answer: 'sop@', distractors: ['REVIEW', 'sophie@', 'so@'],
        explanation: 'The first three characters are "sop". The username contains three vowels, so the generator prints "sop@".'
      },
      debugging: {
        prompt: 'A grade calculator totals every score, then uses the average to decide whether the student passes. Which loop condition fixes the off-by-one bug?',
        code: 'for (int i = 0; i <= scores.length; i++) {\\n    total += scores[i];\\n}\\nif (total / scores.length >= 70) status = "PASS";',
        answer: 'i < scores.length', distractors: ['i <= scores.length', 'i < scores.length - 1', 'i != 0'],
        explanation: 'The last valid array index is scores.length - 1, so a strict less-than condition processes each valid score once.'
      },
      algorithm: {
        prompt: 'The algorithm counts vowels, then checks the String prefix. What result is produced?',
        code: 'String text = "academy";\\nint vowels = 0;\\nfor (int i = 0; i < text.length(); i++) {\\n    if ("aeiou".indexOf(text.charAt(i)) >= 0) vowels++;\\n}\\nif (text.substring(0, 2).equals("ac") && vowels >= 3) System.out.println("READY");\\nelse System.out.println("PRACTICE");',
        answer: 'READY', distractors: ['PRACTICE', 'ERROR', 'No output'],
        explanation: '"academy" starts with "ac" and contains four vowels, so both algorithm requirements pass.'
      }
    }[mission.id];
    if (!challenge) throw new Error(`No fixed mission challenge is defined for mission ${mission.id}.`);
    return makeChoiceQuestion(`mission-challenge-${mission.id}`, mission.id, challenge.prompt, challenge.code,
      challenge.answer, challenge.distractors, challenge.explanation, 5);
  }

  function makeLegacyFinalQuestionBank() {
    const questions = [];
    const operators = ['>', '<', '>=', '<=', '=='];
    const scenarios = ['PBIS points', 'Honor Roll GPA', 'sports attendance', 'parking grade', 'club hours'];
    for (let index = 0; index < 5; index++) {
      const left = 5 + index * 7;
      const right = 10 + index * 3;
      const operator = operators[index];
      const answer = operator === '>' ? left > right : operator === '<' ? left < right
        : operator === '>=' ? left >= right : operator === '<=' ? left <= right : left === right;
      questions.push(makeChoiceQuestion(
        `final-foundation-${index + 1}`, 'boolean',
        `For the ${scenarios[index]} rule, what is the value of the comparison?`,
        `int value = ${left};\\nboolean qualifies = value ${operator} ${right};`,
        String(answer), [String(!answer), String(left === right), String(left > right)],
        `Compare ${left} and ${right} using ${operator}; the result is ${answer}.`, 1 + index % 2
      ));
    }

    for (let index = 0; index < 5; index++) {
      const score = 62 + index * 7;
      const cutoff = 70 + (index % 3) * 5;
      const approved = score >= cutoff;
      const answer = approved ? 'approved' : 'review';
      questions.push(makeChoiceQuestion(
        `final-foundation-${index + 6}`, 'selection',
        `A student earned ${score} points. Which selection result is printed?`,
        `if (${score} >= ${cutoff}) {\\n    System.out.println("approved");\\n} else {\\n    System.out.println("review");\\n}`,
        answer, [approved ? 'review' : 'approved', 'pending', 'denied'],
        `The condition ${score} >= ${cutoff} is ${approved}, so the program prints "${answer}".`, 2
      ));
    }

    for (let index = 0; index < 5; index++) {
      const limit = 3 + index * 2;
      const answer = limit * (limit + 1) / 2;
      questions.push(makeChoiceQuestion(
        `final-foundation-${index + 11}`, 'iteration',
        `What total does the ${scenarios[index]} report calculate?`,
        `int total = 0;\\nfor (int i = 1; i <= ${limit}; i++) {\\n    total += i;\\n}`,
        answer, [answer - limit, answer + limit, limit * 2],
        `The loop adds every integer from 1 through ${limit}; the sum is ${answer}.`, 2 + index % 2
      ));
    }

    const words = ['knight', 'beadwork', 'Centennial', 'iteration', 'scholarship'];
    for (let index = 0; index < 5; index++) {
      const word = words[index];
      const start = index % 3;
      const end = Math.min(word.length, start + 3);
      const expression = index % 3 === 0 ? `text.substring(${start}, ${end})`
        : index % 3 === 1 ? `text.charAt(${start})`
          : `text.indexOf("${word.charAt(start)}")`;
      const answer = index % 3 === 0 ? word.substring(start, end)
        : index % 3 === 1 ? word.charAt(start)
          : String(word.indexOf(word.charAt(start)));
      questions.push(makeChoiceQuestion(
        `final-foundation-${index + 16}`, 'strings',
        `Given text = "${word}", what does ${expression} return?`,
        `String text = "${word}";\\n${expression};`,
        answer, [word, String(word.length), '-1'],
        index % 3 === 0
          ? `substring includes ${start} and excludes ${end}, producing "${answer}".`
          : index % 3 === 1
            ? `charAt(${start}) reads the character at that zero-based index: "${answer}".`
            : `indexOf returns the first matching index, which is ${answer}.`, 2 + index % 2
      ));
    }

    const debugging = [
      ['i <= word.length()', 'i < word.length()', 'i != word.length()'],
      ['text.substring(0, count + 1)', 'text.substring(0, count)', 'text.substring(1, count)'],
      ['while (count > limit)', 'while (count < limit)', 'while (count <= limit)'],
      ['if (score = 70)', 'if (score == 70)', 'if (score != 70)'],
      ['i--', 'i++', 'i = 0']
    ];
    for (let index = 0; index < 5; index++) {
      const options = debugging[index];
      const correct = options[1];
      questions.push(makeChoiceQuestion(
        `final-foundation-${index + 21}`, 'debugging',
        `Which repair fixes this ${scenarios[index]} algorithm's boundary or update bug?`,
        index === 0 ? 'for (int i = 0; i <= word.length(); i++) {\\n    inspect(word.charAt(i));\\n}'
          : index === 1 ? 'String first = text.substring(0, count + 1);'
            : index === 2 ? 'while (count <= limit) {\\n    count++;\\n}'
              : index === 3 ? 'if (score = 70) {\\n    passed = true;\\n}'
                : 'for (int i = 0; i < 5; i--) {\\n    inspect(i);\\n}',
        correct, [options[0], options[2], 'No change is needed'],
        index === 0 ? 'The last valid String index is length() - 1, so use a strict less-than bound.'
          : index === 1 ? 'substring excludes its end index, so count returns exactly count characters.'
            : index === 2 ? 'The loop should stop when count reaches limit; use a strict less-than condition.'
              : index === 3 ? 'Java conditions compare values with ==; a single = is assignment.'
                : 'The loop index must increase toward the stopping bound.', 3
      ));
    }

    const advancedWords = [
      'academy', 'attendance', 'scholarship', 'beadsequence', 'studentrecord',
      'honorroll', 'parkingpermit', 'clubmember', 'iteration', 'stringparser',
      'algorithm', 'centennial', 'gradebook', 'prefixsearch', 'debugging',
      'schoolemail', 'studentid', 'vowelcount', 'scoreanalysis', 'pbisreward',
      'apexamready', 'loopcounter', 'domainname', 'eligibility', 'mastery'
    ];
    const advancedScenarios = [
      'PBIS reward report', 'school email validator', 'club roster', 'student ID checker', 'attendance monitor',
      'Honor Roll summary', 'parking permit audit', 'student club search', 'iteration review', 'record parser',
      'algorithm scorecard', 'school directory', 'gradebook report', 'prefix search tool', 'debugging log',
      'student email checker', 'student ID search', 'vowel analysis report', 'score analysis', 'PBIS eligibility',
      'AP exam readiness', 'loop counter report', 'domain parser', 'eligibility audit', 'mastery report'
    ];
    for (let index = 0; index < 25; index++) {
      const word = advancedWords[index];
      const target = 'aeiou'[index % 5];
      let count = 0;
      for (let position = 0; position < word.length; position++) {
        if (word.charAt(position) === target) count++;
      }
      const vowelTotal = Array.from(word).filter(character => 'aeiou'.includes(character)).length;
      const threshold = 1 + index % 3;
      const outcome = count >= threshold ? 'READY' : 'PRACTICE';
      const report = `${word.length}:${count}:${outcome}`;
      const distractors = [
        `${word.length - 1}:${count}:${outcome}`,
        `${word.length}:${count + 1}:${outcome}`,
        `${word.length}:${count}:${outcome === 'READY' ? 'PRACTICE' : 'READY'}`
      ];
      const pattern = index % 5;
      const code = pattern === 0
        ? `String text = "${word}";\\nchar target = '${target}';\\nint count = 0;\\nfor (int i = 0; i < text.length(); i++) {\\n    if (text.charAt(i) == target) count++;\\n}\\nString result = text.length() + ":" + count + ":" + (count >= ${threshold} ? "READY" : "PRACTICE");`
        : pattern === 1
          ? `String text = "${word}";\\nint total = 0;\\nfor (int i = 0; i < text.length(); i++) {\\n    if ("aeiou".indexOf(text.charAt(i)) >= 0) total++;\\n}\\nif (total >= ${threshold}) total += ${index % 4};`
          : pattern === 2
            ? `String text = "${word}";\\nint matches = 0;\\nfor (int i = 0; i <= text.length() - 2; i++) {\\n    if (text.substring(i, i + 2).equals("${word.substring(0, 2)}")) matches++;\\n}`
            : pattern === 3
              ? `String text = "${word}";\\nint i = 0;\\nint count = 0;\\nwhile (i < text.length()) {\\n    if (text.charAt(i) == '${target}') count++;\\n    i++;\\n}\\nif (count >= ${threshold}) System.out.println("READY");`
              : `String text = "${word}";\\nint count = 0;\\nfor (int i = 0; i < text.length(); i++) {\\n    char ch = text.charAt(i);\\n    if (ch == '${target}') count++;\\n}\\nboolean ready = count >= ${threshold};`;
      const answer = pattern === 0 ? report
        : pattern === 1 ? String(vowelTotal + (vowelTotal >= threshold ? index % 4 : 0))
          : pattern === 2 ? '1'
            : pattern === 3 ? (count >= threshold ? 'READY' : 'no output')
              : String(count >= threshold);
      const wrongAnswers = pattern === 0 ? distractors
        : pattern === 1 ? [String(vowelTotal - 1), String(vowelTotal + 1), String(word.length)]
          : pattern === 2 ? ['0', '2', '-1']
            : pattern === 3 ? [count >= threshold ? 'PRACTICE' : 'READY', String(count), 'no output']
              : [String(!(count >= threshold)), String(count), String(word.length)];
      const topic = ['strings', 'iteration', 'selection', 'debugging', 'advanced'][pattern];
      questions.push(makeChoiceQuestion(
        `final-advanced-${index + 1}`, topic,
        `${advancedScenarios[index]}: trace the ${word} ${pattern === 2 ? 'prefix scan' : 'character-analysis'} routine. What result is produced?`,
        code, answer, wrongAnswers,
        `The algorithm processes "${word}" character by character. It finds ${count} occurrence(s) of '${target}' (and ${vowelTotal} vowel(s) for the all-vowel scan), and the final reported value is ${answer}.`, 4 + (index % 2)
      ));
    }
    return questions;
  }
  function makeFinalQuestionBank() {
    const bank = [];
    const add = (topic, level, prompt, code, answer, distractors, explanation, relatedMission, frqSkill, reviewSteps) => {
      const question = makeChoiceQuestion(
        `final-${level.toLowerCase().replaceAll(' ', '-')}-${bank.length + 1}`,
        topic, prompt, code, answer, distractors, explanation,
        level === 'Easy' ? 1 : level === 'Moderate' ? 2 : level === 'Advanced' ? 4 : 5
      );
      question.difficultyBand = level;
      question.relatedMission = relatedMission;
      question.frqSkill = frqSkill;
      question.reviewSteps = reviewSteps;
      bank.push(question);
    };

    const comparisons = [
      [14, '>', 9, 'club points', true], [8, '<=', 8, 'attendance days', true],
      [72, '==', 70, 'course score', false], [11, '!=', 12, 'locker number', true],
      [6, '>=', 7, 'library books', false], [93, '>', 90, 'attendance percent', true],
      [4, '<', 3, 'late arrivals', false], [100, '>=', 100, 'service hours', true]
    ];
    comparisons.forEach(([left, operator, right, context, answer], index) => add(
      'boolean', 'Easy',
      `A ${context} rule evaluates ${left} ${operator} ${right}. What Boolean value is stored?`,
      `boolean meetsRule = ${left} ${operator} ${right};`,
      String(answer), [String(!answer), '0', '1'],
      `Apply ${operator} directly to ${left} and ${right}; the comparison evaluates to ${answer}.`,
      'boolean', 'Evaluate relational operators',
      [`Compare ${left} with ${right}.`, `Apply ${operator} without changing its boundary meaning.`, `Store ${answer} in meetsRule.`]
    ));

    const simpleIfs = [
      [64, 60, 3, 'course placement'], [88, 90, 2, 'art club award'],
      [5, 5, 4, 'lab station'], [17, 15, 2, 'reading goal'],
      [81, 75, 5, 'practice credit'], [2, 4, 1, 'volunteer shift'],
      [30, 30, 6, 'event entry']
    ];
    simpleIfs.forEach(([value, cutoff, bonus, context]) => {
      const qualifies = value >= cutoff;
      const answer = qualifies ? value + bonus : value;
      add('selection', 'Easy',
        `The ${context} program adds ${bonus} only when the value is at least ${cutoff}. What is the final value when it starts at ${value}?`,
        `int value = ${value};\\nif (value >= ${cutoff}) {\\n    value += ${bonus};\\n}`,
        answer, [value, value + bonus + 1, cutoff],
        qualifies ? `${value} >= ${cutoff} is true, so ${bonus} is added.` : `${value} >= ${cutoff} is false, so value stays ${value}.`,
        'selection', 'Trace a simple if statement',
        [`Evaluate ${value} >= ${cutoff}.`, qualifies ? `Run the body and add ${bonus}.` : 'Skip the body.', `The final value is ${answer}.`]
      );
    });

    const compound = [
      [true, false, true, '&&', false, 'field trip'], [false, true, false, '||', true, 'library pass'],
      [true, true, false, '&&', true, 'lab access'], [false, false, true, '||', false, 'club signup'],
      [true, false, false, '||', true, 'event check-in']
    ];
    compound.forEach(([a, b, c, operator, answer, context]) => add(
      'compound', 'Moderate',
      `A ${context} check uses a=${a}, b=${b}, and c=${c}. What does the expression evaluate to?`,
      `boolean allowed = (a ${operator} b) ${operator === '&&' ? '&&' : '||'} !c;`,
      String(answer), [String(!answer), 'true || false', 'false && true'],
      `Evaluate the grouped expression first, then apply !c. The final result is ${answer}.`,
      'compound', 'Evaluate compound Boolean conditions',
      [`Evaluate a ${operator} b.`, `Negate c to get ${!c}.`, `Combine the two Boolean results.`]
    ));

    const nested = [
      [10, 81, 'REVIEW'], [11, 92, 'APPROVED'], [12, 88, 'APPROVED'],
      [9, 97, 'REVIEW'], [11, 84, 'REVIEW']
    ];
    nested.forEach(([grade, attendance, answer]) => add(
      'nested', 'Moderate',
      `A student council event permit requires grade 10 or higher and attendance of at least 85%. What status is assigned for grade ${grade} and ${attendance}% attendance?`,
      `String status;\\nif (${grade} >= 10) {\\n    if (${attendance} >= 85) status = "APPROVED";\\n    else status = "REVIEW";\\n} else status = "REVIEW";`,
      answer, [answer === 'APPROVED' ? 'REVIEW' : 'APPROVED', 'PENDING', 'DENIED'],
      `The outer grade check is ${grade >= 10}; the inner attendance check is ${attendance >= 85}. The result is ${answer}.`,
      'nested', 'Trace nested selection',
      [`Check whether grade ${grade} reaches 10.`, `If reached, compare attendance ${attendance}% with 85%.`, `Follow the matching branch: ${answer}.`]
    ));

    const loopQuestions = [
      { kind: 'while', limit: 4, start: 1, answer: 10, context: 'morning reading minutes' },
      { kind: 'while', limit: 5, start: 2, answer: 14, context: 'equipment checkout IDs' },
      { kind: 'while', limit: 3, start: 0, answer: 6, context: 'science lab stations' },
      { kind: 'for', limit: 6, start: 1, answer: 21, context: 'weekly service hours' },
      { kind: 'for', limit: 5, start: 2, answer: 14, context: 'rehearsal points' }
    ];
    loopQuestions.forEach(({ kind, limit, start, answer, context }, index) => {
      const whileLoop = kind === 'while';
      const upper = whileLoop ? limit : limit;
      const lower = start;
      const sequence = Array.from({ length: upper - lower + 1 }, (_, step) => lower + step);
      const loopAnswer = sequence.reduce((sum, value) => sum + value, 0);
      const code = whileLoop
        ? `int value = ${lower};\\nint total = 0;\\nwhile (value <= ${upper}) {\\n    total += value;\\n    value++;\\n}`
        : `int total = 0;\\nfor (int value = ${lower}; value <= ${upper}; value++) {\\n    total += value;\\n}`;
      add(kind, 'Moderate',
        `A ${context} counter adds each value from ${lower} through ${upper}. What total does it report?`,
        code, loopAnswer, [loopAnswer - 1, loopAnswer + upper, upper * 2],
        `The loop visits ${sequence.join(', ')} inclusively. Adding those values gives ${loopAnswer}.`,
        whileLoop ? 'while' : 'for', whileLoop ? 'Trace a while loop' : 'Trace a for loop',
        [`List the first value: ${lower}.`, `The loop includes the limit ${upper}.`, `Add the visited values to get ${loopAnswer}.`]
      );
    });

    const stringCases = [
      ['artstudio', 'stu', 'st', 3], ['roboticsclub', 'bot', 'bot', 2], ['musicroom', 'usi', 'u', 1]
    ];
    stringCases.forEach(([text, part, prefix, start]) => {
      const found = text.indexOf(prefix);
      add('strings', 'Advanced',
        `A directory scans "${text}" for the prefix "${prefix}" and extracts three characters starting at index ${start}. What does the extraction return?`,
        `String name = "${text}";\\nint position = name.indexOf("${prefix}");\\nString label = name.substring(${start}, ${start + 3});`,
        part, [text.substring(start, start + 2), text.substring(start + 1, start + 4), String(found)],
        `substring(${start}, ${start + 3}) includes ${start} and excludes ${start + 3}, producing "${part}".`,
        'strings', 'Analyze String traversal and substring bounds',
        [`Find the stated start index ${start}.`, `The substring end index is exclusive.`, `Read characters ${start} through ${start + 2}: "${part}".`]
      );
    });
    const advancedTraversal = [
      ['bookkeeper', 'e', 3, 'reading log'], ['committee', 't', 2, 'club roster']
    ];
    advancedTraversal.forEach(([text, target, expected, context]) => {
      const count = Array.from(text).filter(character => character === target).length;
      add('iteration', 'Advanced',
        `A ${context} traversal counts the character '${target}' in "${text}". What is the final counter?`,
        `String text = "${text}";\\nint count = 0;\\nfor (int i = 0; i < text.length(); i++) {\\n    if (text.charAt(i) == '${target}') count++;\\n}`,
        expected, [count - 1, count + 1, text.length],
        `The traversal examines every index from 0 through length - 1 and finds ${expected} matches.`,
        'strings', 'Trace a String traversal and counter',
        [`Initialize count to 0.`, `Compare each character with '${target}'.`, `Increment once for each match; the total is ${expected}.`]
      );
    });
    const accumulators = [
      { values: [4, 7, 2, 9], minimum: 5, answer: 16, context: 'team practice scores' },
      { values: [3, 8, 6, 1], minimum: 4, answer: 14, context: 'library checkout counts' }
    ];
    accumulators.forEach(({ values, minimum, answer, context }) => {
      const included = values.filter(value => value >= minimum);
      add('accumulator', 'Advanced',
        `A ${context} report totals only values of at least ${minimum}. What total is stored?`,
        `int total = 0;\\nfor (int value : values) {\\n    if (value >= ${minimum}) total += value;\\n}`,
        answer, [values.reduce((sum, value) => sum + value, 0), answer - minimum, answer + minimum],
        `The qualifying values are ${included.join(' and ')}; their sum is ${answer}.`,
        'algorithm', 'Trace a conditional accumulator',
        [`Test each value against ${minimum}.`, `Keep ${included.join(' and ')}.`, `Add the qualifying values to get ${answer}.`]
      );
    });
    const bugs = [
      ['scores.length', 'i <= scores.length', 'i < scores.length', 'grade summary', 'The final valid index is length - 1.'],
      ['word.length()', 'i <= word.length()', 'i < word.length()', 'name scanner', 'The final valid character index is length - 1.'],
      ['target', 'count <= target', 'count < target', 'inventory counter', 'Stop before count reaches target so exactly target items are processed.']
    ];
    bugs.forEach(([bound, broken, answer, context, explanation], index) => add(
      'debugging', 'Advanced',
      `Repair the ${context} loop so it does not pass its valid stopping boundary. Which condition should replace ${broken}?`,
      index === 2 ? `while (count <= ${bound}) {\\n    count++;\\n}` : `for (int i = 0; i <= ${bound}; i++) {\\n    process(i);\\n}`,
      answer, [broken, `i < ${bound} - 1`, 'i != 0'],
      explanation, index === 2 ? 'while' : 'debugging', 'Diagnose loop boundaries',
      [`Identify the last permitted value.`, `Compare the inclusive and exclusive bounds.`, `Use ${answer} to prevent an off-by-one error.`]
    ));

    const apCases = [
      { topic: 'ap-reasoning', mission: 'algorithm', prompt: 'A service award requires at least 12 hours, no unexcused absences, and either a staff recommendation or 20 club points. What decision is printed for hours=14, absences=0, recommended=false, points=22?', code: 'boolean ready = 14 >= 12 && 0 == 0 && (false || 22 >= 20);\\nSystem.out.println(ready ? "AWARD" : "REVIEW");', answer: 'AWARD', distractors: ['REVIEW', 'true only if recommended', 'No output'], explanation: 'Hours and absences pass. The final grouped condition passes because 22 >= 20 is true.', steps: ['Check hours >= 12 and absences == 0.', 'Evaluate false || 22 >= 20.', 'All required groups are true, so print AWARD.'] },
      { topic: 'strings', mission: 'strings', prompt: 'A library tag counts each "a" in "catalog" and appends the number of matches to the first three characters. What tag is created?', code: `String text = "catalog";
int count = 0;
for (int i = 0; i < text.length(); i++) {
    if (text.charAt(i) == 'a') count++;
}
String tag = text.substring(0, 3) + count;`, answer: 'cat2', distractors: ['cat1', 'catalog2', 'ca2'], explanation: '"catalog" has two a characters; substring(0, 3) is "cat", so the tag is "cat2".', steps: ['Traverse every character and count two a characters.', 'Take the first three characters, "cat".', 'Append 2 to produce cat2.'] },
      { topic: 'iteration', mission: 'for', prompt: 'A sensor report adds odd readings from 1 through 7, then labels the sum as EVEN or ODD. What output does it produce?', code: 'int total = 0;\\nfor (int reading = 1; reading <= 7; reading++) {\\n    if (reading % 2 == 1) total += reading;\\n}\\nSystem.out.println(total + (total % 2 == 0 ? " EVEN" : " ODD"));', answer: '16 EVEN', distractors: ['28 EVEN', '16 ODD', '12 EVEN'], explanation: 'The odd readings are 1, 3, 5, and 7. Their sum is 16, which is even.', steps: ['Select readings with remainder 1 when divided by 2.', 'Add 1 + 3 + 5 + 7 to get 16.', '16 % 2 is 0, so append EVEN.'] },
      { topic: 'selection', mission: 'nested', prompt: 'A grant gives $20 for GPA >= 3.5 and attendance >= 90, $10 for GPA >= 3.5 alone, and $0 otherwise. What is awarded for GPA 3.7 and attendance 88?', code: 'if (3.7 >= 3.5) {\\n    if (88 >= 90) award = 20;\\n    else award = 10;\\n} else award = 0;', answer: '10', distractors: ['20', '0', '88'], explanation: 'The GPA condition passes, but the attendance condition fails, so the nested else assigns 10.', steps: ['Evaluate the GPA condition first: true.', 'Evaluate attendance >= 90: false.', 'Follow the inner else branch and award 10.'] },
      { topic: 'debugging', mission: 'debugging', prompt: 'A code review finds that a parser skips the last character and can also access past the end. Which loop header processes every valid character exactly once?', code: 'String code = "A7B2";\\nfor (int i = 1; i <= code.length(); i++) {\\n    inspect(code.charAt(i));\\n}', answer: 'for (int i = 0; i < code.length(); i++)', distractors: ['for (int i = 1; i < code.length(); i++)', 'for (int i = 0; i <= code.length(); i++)', 'for (int i = 1; i <= code.length() - 1; i++)'], explanation: 'Valid String indices begin at 0 and stop at length - 1. The exclusive bound length visits all characters safely.', steps: ['Start at the first valid index, 0.', 'Use a strict less-than length boundary.', 'This visits indices 0, 1, 2, and 3 exactly once.'] },
      { topic: 'ap-reasoning', mission: 'algorithm', prompt: 'A club roster counts names that start with "M" and have length greater than 4. Which output results for "Maya", "Mason", and "Liam"?', code: 'int matches = 0;\\nString[] names = {"Maya", "Mason", "Liam"};\\nfor (String name : names) {\\n    if (name.substring(0, 1).equals("M") && name.length() > 4) matches++;\\n}\\nSystem.out.println(matches);', answer: '1', distractors: ['0', '2', '3'], explanation: '"Maya" starts with M but is only length 4. "Mason" meets both conditions; "Liam" does not start with M.', steps: ['Check the prefix and length for each name.', 'Only Mason satisfies both conditions.', 'The counter ends at 1.'] },
      { topic: 'accumulator', mission: 'while', prompt: 'A tutoring log starts at week 1 and adds the week number while it is at most 4. After the loop it adds 2 bonus points for at least 8 total points. What is the final total?', code: 'int week = 1;\\nint total = 0;\\nwhile (week <= 4) { total += week; week++; }\\nif (total >= 8) total += 2;', answer: '12', distractors: ['10', '8', '14'], explanation: 'The loop totals 1 + 2 + 3 + 4 = 10. Since 10 >= 8, the program adds 2, giving 12.', steps: ['Trace the loop values 1 through 4.', 'The accumulator reaches 10.', 'Apply the final condition and add 2.'] },
      { topic: 'strings', mission: 'strings', prompt: 'A record formatter turns "Raven-204" into a two-part report: the prefix before the dash and the final three digits. What report is produced?', code: 'String record = "Raven-204";\\nint dash = record.indexOf("-");\\nString report = record.substring(0, dash) + ":" + record.substring(dash + 1);', answer: 'Raven:204', distractors: ['Raven-204', 'Raven:04', 'Raven:204-'], explanation: 'indexOf("-") locates the separator. The first substring excludes it; the second starts after it.', steps: ['Find the dash index.', 'Extract the text on each side using the exclusive end index.', 'Join both parts with a colon.'] },
      { topic: 'compound', mission: 'compound', prompt: 'An activity is approved when age is at least 14 and either the student has a pass or a guardian is present. For age=15, pass=false, guardian=true, what prints?', code: 'boolean approved = 15 >= 14 && (false || true);\\nSystem.out.println(approved ? "APPROVED" : "WAIT");', answer: 'APPROVED', distractors: ['WAIT', 'false', 'No output'], explanation: 'The age condition is true, and false || true is true, so the combined expression is true.', steps: ['Evaluate the age requirement.', 'Evaluate the parenthesized alternative.', 'Both required parts pass, so print APPROVED.'] },
      { topic: 'ap-reasoning', mission: 'algorithm', prompt: 'A trip planner counts positive daily distances, then checks whether the count is at least 3 and the total exceeds 20. What status is printed for [8, 0, 7, 9]?', code: 'int count = 0;\\nint total = 0;\\nint[] miles = {8, 0, 7, 9};\\nfor (int mile : miles) {\\n    if (mile > 0) { count++; total += mile; }\\n}\\nif (count >= 3 && total > 20) System.out.println("READY");\\nelse System.out.println("CHECK");', answer: 'READY', distractors: ['CHECK', '3', '24 CHECK'], explanation: 'There are three positive distances and their sum is 24. Both final requirements are true.', steps: ['Ignore the zero distance.', 'Count three positive values and total 24.', 'Both count >= 3 and total > 20 pass.'] }
    ];
    apCases.forEach(({ topic, mission, prompt, code, answer, distractors, explanation, steps }) => add(
      topic, 'AP Style', prompt, code, answer, distractors, explanation, mission,
      'Trace a multi-step algorithm and justify its result', steps
    ));

    const counts = { Easy: 15, Moderate: 15, Advanced: 10, 'AP Style': 10 };
    const actualCounts = Object.fromEntries(Object.keys(counts).map(level => [
      level, bank.filter(question => question.difficultyBand === level).length
    ]));
    if (bank.length !== 50 || Object.entries(counts).some(([level, count]) => actualCounts[level] !== count)) {
      throw new Error(`Final challenge bank has invalid difficulty counts: ${JSON.stringify(actualCounts)}.`);
    }
    return bank.map((question, index) => ({
      ...question,
      questionNumber: index + 1,
      hints: ['Trace the code in order and record important variable values.', 'Check each loop boundary and Boolean condition before deciding.']
    }));
  }
  const FINAL_QUESTION_BANK = makeFinalQuestionBank();

  function prepareQuestion(question, randomize = true) {
    const copy = { ...question, hints: question.hints.slice(), help: {}, selected: null, draft: '' };
    if (copy.kind === 'multipleChoice' || copy.kind === 'boolean') {
      let choices = copy.choices.slice();
      let answer = copy.kind === 'boolean' ? choices.indexOf(copy.correctValue) : copy.answer;
      const pairs = choices.map((choice, index) => ({ choice, correct: index === answer }));
      if (randomize) {
        for (let index = pairs.length - 1; index > 0; index--) {
          const swap = Math.floor(Math.random() * (index + 1));
          [pairs[index], pairs[swap]] = [pairs[swap], pairs[index]];
        }
      }
      copy.choices = pairs.map(pair => pair.choice);
      copy.answer = pairs.findIndex(pair => pair.correct);
    }
    if (copy.kind === 'matching') {
      copy.pairs = copy.pairs.map(pair => ({ ...pair }));
      copy.matches = randomize ? shuffle(copy.matches) : copy.matches.slice();
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
      const kindOrder = ['multipleChoice', 'matching', 'algorithm', 'loop', 'trace', 'output', 'boolean', 'string'];
      const ordered = candidates.slice().sort((left, right) => {
        const kindDifference = kindOrder.indexOf(left.kind) - kindOrder.indexOf(right.kind);
        return kindDifference || left.id.localeCompare(right.id, undefined, { numeric: true });
      });
      if (ordered.length < 2) throw new Error(`Mission ${id} needs guided and independent practice questions.`);
      const independentIndex = Math.floor((ordered.length - 1) / 2);
      const questions = [
        ordered[0],
        ordered[independentIndex === 0 ? 1 : independentIndex],
        makeMissionChallengeQuestion(mission)
      ];
      state.currentMissionRun = {
        missionId: id,
        questions: questions.map(question => prepareQuestion(question, false)),
        step: 0,
        score: 0,
        finished: false,
        reflection: {}
      };
    }
    persist();
    renderMission();
    showScreen('missions-screen');
    $('#mission-map').hidden = true;
    $('#mission-detail').hidden = false;
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
      $('#mission-content').innerHTML = `<section class="panel completion-panel"><div class="completion-mark">${cleared ? '✓' : '↻'}</div><p class="eyebrow">${cleared ? 'MISSION COMPLETE' : 'KEEP TRAINING'}</p><h1>${cleared ? 'Excellent work.' : 'The mission was not saved.'}</h1><p>${cleared ? `${run.rewardEarned ? `You earned ${mission.reward} XP. ` : 'This replay earns no additional XP. '}Your reflection is saved on this device.` : 'Complete the Mission Challenge successfully before submitting your reflection.'}</p>
        <div class="completion-actions"><button type="button" class="button button-primary" id="mission-replay">${cleared ? 'PRACTICE AGAIN' : 'RETRY MISSION'}</button><button type="button" class="button button-quiet" id="back-to-missions">RETURN TO MISSIONS</button></div></section>`;
      $('#mission-replay').addEventListener('click', () => {
        state.currentMissionRun = null;
        openMission(mission.id);
      });
      $('#back-to-missions').addEventListener('click', () => {
        $('#mission-detail').hidden = true;
        $('#mission-map').hidden = false;
        renderMissionCards();
      });
      return;
    }
    const step = run.step || 0;
    const stepLabels = ['Lesson Content', 'Guided Examples', 'Guided Practice', 'Independent Practice', 'Mission Challenge', 'Mission Reflection'];
    const top = `<section class="mission-hero panel">
      <div><p class="eyebrow">${escapeHTML(mission.category)} · MISSION ${mission.icon}</p><h1>${escapeHTML(mission.title)}</h1><p>${mission.briefing}</p></div>
      <div class="mission-reward-large"><span>MISSION REWARD</span><strong>✦ ${mission.reward} XP</strong><small>Earned once when cleared</small></div>
    </section>
    <section class="panel mission-sequence"><p class="eyebrow">YOUR PROGRESSION</p><ol>${stepLabels.map((label, index) => `<li class="${index === step ? 'current' : index < step ? 'complete' : ''}"><span>${index + 1}</span>${label}</li>`).join('')}</ol>
      <div class="challenge-progress"><span style="width:${((step + 1) / stepLabels.length) * 100}%"></span></div>
    </section>`;

    if (step === 0) {
      $('#mission-content').innerHTML = `${top}<section class="panel lesson-panel">
        <div class="section-heading"><div><p class="eyebrow">LESSON CONTENT</p><h2>Field notes</h2></div><span class="heading-icon">⌘</span></div>
        <ul class="lesson-list">${mission.lessons.map(lesson => `<li>${lesson}</li>`).join('')}</ul>
        <div class="challenge-actions"><button type="button" class="button button-primary" id="next-mission-question">START GUIDED EXAMPLES →</button></div>
      </section>`;
      $('#next-mission-question').addEventListener('click', nextMissionQuestion);
      return;
    }

    if (step === 1) {
      $('#mission-content').innerHTML = `${top}<section class="panel lesson-panel">
        <div class="section-heading"><div><p class="eyebrow">GUIDED EXAMPLES</p><h2>Trace the worked example</h2></div><span class="heading-icon">⌘</span></div>
        <p>Read the sample one statement at a time. Predict what changes before checking the example’s comments and output.</p>
        <pre class="code-block"><code>${displayCode(mission.code)}</code></pre>
        <div class="guided-demo"><p>Now apply the same reasoning in Guided Practice. Hints are available if you need them.</p></div>
        <div class="challenge-actions"><button type="button" class="button button-primary" id="next-mission-question">START GUIDED PRACTICE →</button></div>
      </section>`;
      $('#next-mission-question').addEventListener('click', nextMissionQuestion);
      return;
    }

    if (step === 5) {
      const reflection = run.reflection || {};
      $('#mission-content').innerHTML = `${top}<section class="panel mission-reflection">
        <p class="eyebrow">MISSION REFLECTION</p><h2>Make the learning stick</h2>
        <p>The Mission Challenge is your mastery activity. Reflect on the ideas and process you used.</p>
        <label for="mission-reflection-learned">What idea became clearer during this mission?</label>
        <textarea id="mission-reflection-learned" rows="3">${escapeHTML(reflection.learned || '')}</textarea>
        <label for="mission-reflection-next">Which step or mistake will you watch for next time?</label>
        <textarea id="mission-reflection-next" rows="3">${escapeHTML(reflection.next || '')}</textarea>
        <div class="challenge-actions"><button type="button" class="button button-primary" id="complete-mission" ${reflection.learned?.trim() || reflection.next?.trim() ? '' : 'disabled'}>SAVE REFLECTION &amp; COMPLETE MISSION</button></div>
      </section>`;
      $$('#mission-content .mission-reflection textarea').forEach(input => input.addEventListener('input', () => {
        run.reflection = run.reflection || {};
        run.reflection[input.id.endsWith('-learned') ? 'learned' : 'next'] = input.value;
        const complete = $('#complete-mission');
        complete.disabled = !run.reflection.learned?.trim() && !run.reflection.next?.trim();
        persist();
      }));
      $('#complete-mission').addEventListener('click', nextMissionQuestion);
      return;
    }

    const questionIndex = step - 2;
    const question = run.questions[questionIndex];
    const activityNames = ['GUIDED PRACTICE', 'INDEPENDENT PRACTICE', 'MISSION CHALLENGE'];
    const nextLabel = step === 4 && !question.result?.correct ? 'TRY MISSION CHALLENGE AGAIN' : step === 4 ? 'CONTINUE TO REFLECTION →' : 'CONTINUE →';
    $('#mission-content').innerHTML = `${top}<section class="panel activity-panel">
      <div class="section-heading"><div><p class="eyebrow">${activityNames[questionIndex]}</p><h2>${activityNames[questionIndex] === 'MISSION CHALLENGE' ? 'Mini AP-Style Problem' : activityNames[questionIndex]}</h2></div><span class="question-count">${questionIndex + 1} / ${run.questions.length}</span></div>
      ${questionIndex === 2 ? '<p class="mission-challenge-note">This fixed, mission-specific scenario combines the key ideas from the lesson.</p>' : ''}
      ${renderQuestionCard(question, question.result || null)}
      <div class="challenge-actions">${question.result
        ? `<button type="button" class="button button-primary" id="next-mission-question">${nextLabel}</button>`
        : `<button type="button" class="button button-primary submit-answer" id="submit-mission-answer" ${isAnswered(question) ? '' : 'disabled'}>CHECK ANSWER</button>`}
      </div>
    </section>`;
    bindQuestionCard($('#mission-content'), question, renderMission);
    $('#submit-mission-answer')?.addEventListener('click', submitMissionAnswer);
    $('#next-mission-question')?.addEventListener('click', nextMissionQuestion);
  }

  function submitMissionAnswer() {
    const run = state.currentMissionRun;
    const question = run?.questions[(run.step || 0) - 2];
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
    if (run.step === 0 || run.step === 1) {
      run.step += 1;
      persist();
      renderMission();
      return;
    }
    if (run.step >= 2 && run.step <= 4) {
      const question = run.questions[run.step - 2];
      if (!question.result) return;
      if (run.step === 4 && !question.result.correct) {
        question.result = null;
        question.selected = null;
        question.draft = '';
        persist();
        renderMission();
        return;
      }
      run.step += 1;
      persist();
      renderMission();
      return;
    }
    if (run.step !== 5) return;
    if (!run.reflection?.learned?.trim() && !run.reflection?.next?.trim()) {
      showToast('Add a short reflection before completing the mission.');
      return;
    }
    run.finished = true;
    if (run.score >= MISSION_PASS_SCORE && !state.completedMissions.includes(run.missionId)) {
      const mission = MISSIONS.find(item => item.id === run.missionId);
      state.completedMissions.push(run.missionId);
      run.rewardEarned = true;
      checkMissionBadges();
      persist();
      updateProgress();
      awardXP(mission.reward, mission.title);
    } else {
      persist();
    }
    renderMission();
  }

  function renderFRQHome() {
    const target = $('#frq-content');
    const completeCount = state.frqCompleted.length;
    target.innerHTML = `<section class="panel frq-intro"><p class="eyebrow">AP-STYLE FREE RESPONSE · GUIDED CODING</p><h1>FRQ Command Center</h1><p>Work through five Unit 2 challenges with a plan, then reveal hints, a starter, walkthrough, and complete solution as needed. Submit your work for AP-style rubric feedback. Rubrics are self-assessed practice, not official AP scoring or automatic Java compilation.</p>
      <div class="frq-progress"><span>${completeCount} / ${FRQ_LEVELS.length} LEVELS COMPLETE · LEVEL 1 → FINAL FRQ SIMULATION</span><div class="progress-track"><span style="width:${(completeCount / FRQ_LEVELS.length) * 100}%"></span></div></div></section>
      <div class="frq-level-list">${FRQ_LEVELS.map((level, index) => {
        const complete = state.frqCompleted.includes(level.id);
        return `<article class="frq-level panel ${complete ? 'frq-complete' : ''}">
          <span class="frq-level-icon" aria-hidden="true">${complete ? '✓' : index + 1}</span>
          <div><p class="eyebrow">${complete ? 'LEVEL COMPLETE' : `LEVEL ${index + 1} · ${index === 4 ? 'FINAL SIMULATION' : 'PRACTICE'}`}</p><h2>${escapeHTML(level.title)}</h2><p>${escapeHTML(frqDescription(level.id))}</p></div>
          <button type="button" class="button button-secondary frq-start" data-level="${level.id}">${complete ? 'REVIEW / RETRY' : 'START LEVEL'}</button>
        </article>`;
      }).join('')}</div>`;
    $$('.frq-start', target).forEach(button => button.addEventListener('click', () => startFRQ(button.dataset.level)));
  }

  function frqDescription(id) {
    const task = FRQ_TASKS[id]?.[0];
    return task ? task.overview : 'Guided AP CSA Unit 2 free-response practice.';
  }

  function startFRQ(levelId, retry = false) {
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
        <p>${allComplete ? 'Congratulations! You have completed AP CSA Unit 2 FRQ Training.' : 'Continue to the next level in the sequence, or revisit this challenge for more practice.'}</p>
        <p class="frq-completion-progress">${state.frqCompleted.length} / ${FRQ_LEVELS.length} levels complete · ${allComplete ? 'FRQ Finisher Badge earned.' : 'First completion awards +12 XP.'}</p>
        <div class="completion-actions"><button type="button" class="button button-primary" id="frq-home">RETURN TO FRQ COMMANDER CENTER</button><button type="button" class="button button-secondary" id="frq-retry">PRACTICE AGAIN</button></div></section>`;
      $('#frq-home').addEventListener('click', renderFRQHome);
      $('#frq-retry').addEventListener('click', () => startFRQ(levelId, true));
      return;
    }
    const index = run.taskIndex;
    const task = tasks[index];
    const saved = run.responses[index] || { text: '', checks: [], planning: {} };
    const rubricStatuses = task.rubric.map((_, criterionIndex) =>
      saved.statuses?.[criterionIndex] || (saved.checks.includes(criterionIndex) ? 'met' : 'review')
    );
    const help = run.help[index] || {};
    target.innerHTML = `<section class="panel frq-task-panel">
      <div class="section-heading"><div><p class="eyebrow">${escapeHTML(level.title.toUpperCase())}</p><h1>${escapeHTML(task.title)}</h1></div><span class="question-count">${index + 1} / ${tasks.length}</span></div>
      <div class="challenge-progress"><span style="width:${((index + 1) / tasks.length) * 100}%"></span></div>
      <section class="frq-content-section"><p class="eyebrow">PROBLEM OVERVIEW</p><p class="frq-prompt">${escapeHTML(task.overview)}</p><p class="frq-prompt"><strong>Your task:</strong> ${escapeHTML(task.prompt)}</p></section>
      <section class="frq-content-section"><p class="eyebrow">LEARNING OBJECTIVES</p><ul class="frq-objectives">${task.objectives.map(objective => `<li>${escapeHTML(objective)}</li>`).join('')}</ul></section>
      ${task.progression ? `<section class="frq-content-section frq-skill-ladder"><p class="eyebrow">GUIDED SKILL LADDER</p><ol class="frq-objectives">${task.progression.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol></section>` : ''}
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
      <div class="rubric-box"><div class="section-heading"><div><p class="eyebrow">SELF-ASSESSMENT</p><h2>Rubric checklist</h2></div><span class="micro-copy">1 point met · 0.5 partial</span></div>
        <p class="micro-copy">Choose met, partly met, missing, or needs review for each practice category before submitting.</p>
        <div class="rubric-list">${task.rubric.map((criterion, criterionIndex) => `<div class="rubric-item"><span><strong>${escapeHTML(criterion.category)}:</strong> ${escapeHTML(criterion.criterion)}</span><select class="rubric-status" data-criterion="${criterionIndex}" aria-label="Self-assessment for ${escapeHTML(criterion.category)}" ${saved.submitted ? 'disabled' : ''}>
          <option value="review" ${rubricStatuses[criterionIndex] === 'review' ? 'selected' : ''}>Needs review</option>
          <option value="met" ${rubricStatuses[criterionIndex] === 'met' ? 'selected' : ''}>Met · 1 point</option>
          <option value="partial" ${rubricStatuses[criterionIndex] === 'partial' ? 'selected' : ''}>Partly met</option>
          <option value="missing" ${rubricStatuses[criterionIndex] === 'missing' ? 'selected' : ''}>Missing</option>
        </select></div>`).join('')}</div>
      </div>
      ${saved.submitted ? `<div class="answer-feedback ${saved.score === task.rubric.length ? 'correct' : 'review'}"><strong>Self-assessed rubric: ${Number.isInteger(saved.score) ? saved.score : saved.score.toFixed(1)} / ${task.rubric.length} points.</strong> ${escapeHTML(saved.feedback)}<ul class="frq-feedback-list">${task.rubric.map((criterion, criterionIndex) => `<li class="frq-rubric-status frq-status-${rubricStatuses[criterionIndex]}"><strong>${escapeHTML(criterion.category)}:</strong> ${rubricStatuses[criterionIndex] === 'met' ? 'Self-assessed as met.' : rubricStatuses[criterionIndex] === 'partial' ? 'Partly met; compare this requirement with the model.' : rubricStatuses[criterionIndex] === 'missing' ? 'Marked as missing; review the model solution.' : 'Needs review; decide whether this requirement is met.'}</li>`).join('')}</ul></div>` : ''}
      ${saved.submitted ? `<section class="canonical-review panel">
        <p class="eyebrow">CANONICAL SOLUTION CENTER</p><h2>Review your work</h2>
        <p class="micro-copy">The score and color indicators are your rubric self-assessment. This offline page does not compare Java semantics automatically. Green means marked met, yellow means partly met or needs review, and red means marked missing.</p>
        <details class="frq-reveal" open><summary>Show Side-by-Side Comparison</summary>
          <div class="comparison-legend"><span class="frq-status-met">Green · met</span><span class="frq-status-partial">Yellow · partial / review</span><span class="frq-status-missing">Red · missing</span></div>
          <div class="frq-compare"><article><h3>Student Answer</h3><pre class="code-block"><code id="frq-student-comparison">${displayCode(saved.text || '')}</code></pre></article>
            <article><h3>Canonical Answer</h3><pre class="code-block"><code>${displayCode(task.solution)}</code></pre></article></div>
        </details>
        <details class="frq-reveal" open><summary>Show Canonical Solution</summary><pre class="code-block"><code>${displayCode(task.solution)}</code></pre></details>
        <details class="frq-reveal" open><summary>Show Walkthrough</summary><ol class="frq-objectives">${task.walkthrough.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>
          <p class="micro-copy">Variables hold state across steps; conditions encode the requirements; loops process repeated values. AP-style readers award credit for required behavior and correct algorithmic steps, not matching variable names.</p>
        </details>
        <details class="frq-reveal" open><summary>View AP Reader Notes</summary>
          <p><strong>What earns full credit:</strong> Address each required rubric category with a complete, logically correct step.</p>
          <ul class="frq-objectives">${task.rubric.map(criterion => `<li><strong>${escapeHTML(criterion.category)}:</strong> ${escapeHTML(criterion.criterion)}</li>`).join('')}</ul>
          <p><strong>Common point deductions:</strong> Missing a required condition, mishandling a boundary, or failing to update a variable or return the required result.</p>
          <p><strong>Common mistakes:</strong></p><ul class="frq-objectives">${task.commonMistakes.map(mistake => `<li>${escapeHTML(mistake)}</li>`).join('')}</ul>
          <p><strong>AP-style expectations:</strong> Show an algorithm that satisfies the stated requirements. Use valid String methods, safe loop bounds, and the correct selection logic; variable names do not need to match the model.</p>
          <p class="micro-copy">These student-friendly notes support practice and are not an official AP scoring rubric.</p>
        </details>
        <details class="frq-reveal" open><summary>Show Common Mistakes</summary><ul class="frq-objectives">${task.commonMistakes.map(mistake => `<li>${escapeHTML(mistake)}</li>`).join('')}</ul></details>
        <label class="frq-reflection" for="frq-reflection">Reflection: What change or edge case will you remember when solving a similar problem?
          <textarea id="frq-reflection" rows="3">${escapeHTML(saved.reflection || '')}</textarea>
        </label>
      </section>` : ''}
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
      const comparison = $('#frq-student-comparison', target);
      if (comparison) comparison.textContent = response.value;
      persist();
    });
    $('#frq-reflection', target)?.addEventListener('input', event => {
      const current = run.responses[index] || { text: response.value, checks: [], planning: {} };
      current.reflection = event.target.value;
      run.responses[index] = current;
      persist();
    });
    $$('[data-frq-planning]', target).forEach(input => input.addEventListener('input', () => {
      const current = run.responses[index] || { text: response.value, checks: [], planning: {} };
      current.planning = current.planning || {};
      current.planning[input.dataset.frqPlanning] = input.value;
      run.responses[index] = current;
      persist();
    }));
    $$('.rubric-status', target).forEach(input => input.addEventListener('change', () => {
      const current = run.responses[index] || { text: response.value, checks: [], planning: {} };
      current.text = response.value;
      current.statuses = $$('.rubric-status', target).map(select => select.value);
      current.checks = current.statuses.flatMap((status, criterionIndex) => status === 'met' ? [criterionIndex] : []);
      current.partial = current.statuses.flatMap((status, criterionIndex) => status === 'partial' ? [criterionIndex] : []);
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
    const statuses = $$('.rubric-status').map(input => input.value);
    const checks = statuses.flatMap((status, criterionIndex) => status === 'met' ? [criterionIndex] : []);
    const partial = statuses.flatMap((status, criterionIndex) => status === 'partial' ? [criterionIndex] : []);
    const score = checks.length + partial.length * 0.5;
    const feedback = score === task.rubric.length
      ? 'Strong self-assessment: every rubric category is covered. Compare your result with the sample and test a boundary case.'
      : score >= Math.ceil(task.rubric.length / 2)
        ? 'Good progress. Revisit partly met or missing categories, then trace your algorithm with the sample and a boundary case.'
        : 'Revisit the planning notes and revealed guidance. Revise your algorithm against each category marked partly met, missing, or needing review.';
    const current = run.responses[index] || { planning: {} };
    run.responses[index] = { ...current, text: response, checks, partial, statuses, score, submitted: true, feedback };
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
    if (FRQ_LEVELS.every(item => state.frqCompleted.includes(item.id))) awardBadge('frq');
    renderFRQRun(levelId);
  }

  function startFinalChallenge() {
    if (FINAL_QUESTION_BANK.length !== 50) throw new Error(`Final challenge requires exactly 50 questions; found ${FINAL_QUESTION_BANK.length}.`);
    const quotas = { Easy: 8, Moderate: 8, Advanced: 6, 'AP Style': 3 };
    const questions = Object.entries(quotas).flatMap(([level, count]) => {
      const pool = FINAL_QUESTION_BANK.filter(question => question.difficultyBand === level);
      if (pool.length < count) throw new Error(`Final question bank needs at least ${count} ${level} questions.`);
      return shuffle(pool).slice(0, count).map(question => prepareQuestion(question));
    });
    state.finalRun = { questions, index: 0, answers: {}, result: null };
    persist();
    renderFinalChallenge();
    showScreen('final-screen');
  }

  function renderFinalChallenge() {
    const target = $('#final-content');
    const run = state.finalRun;
    if (!run) {
      target.innerHTML = `<section class="panel assessment-panel"><p class="eyebrow">FINAL CHECKPOINT · 50-QUESTION BANK</p><h1>Unit 2 Final Challenge</h1><p>Each attempt draws 25 fresh questions from a bank of 50: 8 Easy, 8 Moderate, 6 Advanced, and 3 AP Style. Once you begin, your selected questions stay fixed for that attempt.</p><div class="difficulty-breakdown"><span>1–8 · EASY</span><span>9–16 · MODERATE</span><span>17–22 · ADVANCED</span><span>23–25 · AP STYLE</span></div><button type="button" class="button button-primary" id="start-final-run">BEGIN 25-QUESTION CHALLENGE</button></section>`;
      $('#start-final-run').addEventListener('click', startFinalChallenge);
      return;
    }
    if (run.result) {
      renderFinalResult(run.result);
      return;
    }
    const index = run.index;
    const question = run.questions[index];
    const answered = Object.keys(run.answers).length;
    const sectionLabel = question.difficultyBand.toUpperCase();
    target.innerHTML = `<section class="panel assessment-panel">
      <div class="assessment-head"><div><p class="eyebrow">FINAL CHECKPOINT · ${sectionLabel}</p><h1>Unit 2 Final Challenge</h1><p>Choose an answer, then continue. Your progress saves automatically.</p></div><div class="assessment-meter"><strong>${answered}/25</strong>ANSWERED</div></div>
      <div class="challenge-progress"><span style="width:${((index + 1) / run.questions.length) * 100}%"></span></div>
      <p class="final-question-number">QUESTION ${String(index + 1).padStart(2, '0')} OF 25 · ${escapeHTML(question.difficultyBand.toUpperCase())}</p>
      ${renderQuestionCard(question)}
      <div class="challenge-actions">
        <button type="button" class="button button-quiet" id="final-previous" ${index === 0 ? 'disabled' : ''}>← PREVIOUS</button>
        <button type="button" class="button button-primary" id="final-next" ${isAnswered(question) ? '' : 'disabled'}>${index === run.questions.length - 1 ? 'SUBMIT CHALLENGE' : 'SAVE &amp; NEXT →'}</button>
      </div>
      <p class="question-status">Difficulty progresses from Easy to AP Style. Your attempt is saved as you move between questions.</p>
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
    const correctByDifficulty = {};
    const correctByMission = {};
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
      if (!correctByDifficulty[item.difficultyBand]) correctByDifficulty[item.difficultyBand] = { correct: 0, total: 0 };
      correctByDifficulty[item.difficultyBand].total += 1;
      if (!correctByMission[item.relatedMission]) correctByMission[item.relatedMission] = { correct: 0, total: 0 };
      correctByMission[item.relatedMission].total += 1;
      if (correct) {
        correctCount += 1;
        correctByTopic[topic].correct += 1;
        correctByDifficulty[item.difficultyBand].correct += 1;
        correctByMission[item.relatedMission].correct += 1;
      }
    });
    const percent = Math.round((correctCount / run.questions.length) * 100);
    run.result = {
      correct: correctCount,
      total: run.questions.length,
      percent,
      passed: percent >= 80,
      byTopic: correctByTopic,
      byDifficulty: correctByDifficulty,
      byMission: correctByMission
    };
    state.finalScore = percent;
    if (run.result.passed) {
      awardBadge('champion');
      if (state.completedMissions.length === MISSIONS.length && state.xp < MAX_XP) awardXP(MAX_XP - state.xp, 'Unit 2 completion');
    }
    persist();
    renderFinalChallenge();
  }

  function renderFinalResult(result) {
    const orderedPerformance = entries => Object.entries(entries).sort((left, right) =>
      (left[1].correct / left[1].total) - (right[1].correct / right[1].total)
    );
    const topics = orderedPerformance(result.byTopic);
    const missions = orderedPerformance(result.byMission);
    const strongestTopic = topics[topics.length - 1]?.[0] || 'Not enough data';
    const weakestTopic = topics[0]?.[0] || 'Not enough data';
    const suggestedMission = missions[0]?.[0] || 'algorithm';
    const difficultyOrder = ['Easy', 'Moderate', 'Advanced', 'AP Style'];
    const difficultyRows = difficultyOrder.map(level => {
      const values = result.byDifficulty[level] || { correct: 0, total: 0 };
      return `<div class="topic-result"><span>${level}</span><strong>${values.correct} / ${values.total} correct</strong></div>`;
    }).join('');
    const topicRows = Object.entries(result.byTopic).map(([topic, values]) => `<div class="topic-result"><span>${escapeHTML(topic)}</span><strong>${values.correct} / ${values.total} · ${Math.round((values.correct / values.total) * 100)}%</strong></div>`).join('');
    const review = state.finalRun.questions.map((question, index) => {
      const rightAnswer = question.choices[question.answer];
      const studentAnswer = question.selected === null ? 'No answer' : question.choices[question.selected];
      const steps = question.reviewSteps.map((step, stepIndex) => `<li>${escapeHTML(step)}</li>`).join('');
      return `<details class="review-question"><summary>Q${String(index + 1).padStart(2, '0')} · ${question.result.correct ? 'Correct' : 'Review'} · ${escapeHTML(question.difficultyBand)} · ${escapeHTML(question.topic)}</summary>
        <p>${escapeHTML(question.prompt)}</p>${question.code ? `<pre class="code-block"><code>${displayCode(question.code)}</code></pre>` : ''}
        <p><strong>Your answer:</strong> ${escapeHTML(studentAnswer)} · <strong>Correct answer:</strong> ${escapeHTML(rightAnswer)}</p>
        <p class="help-copy"><strong>Explanation:</strong> ${escapeHTML(question.explanation)}</p>
        <p><strong>Related Mission:</strong> ${escapeHTML(MISSIONS.find(mission => mission.id === question.relatedMission)?.title || question.relatedMission)}</p>
        <p><strong>Related FRQ skill:</strong> ${escapeHTML(question.frqSkill)}</p>
        <ol class="review-steps">${steps}</ol></details>`;
    }).join('');
    const weakestMission = MISSIONS.find(mission => mission.id === suggestedMission);
    $('#final-content').innerHTML = `<section class="panel assessment-result">
      <p class="eyebrow">FINAL CHALLENGE RESULTS · PERCENT CORRECT</p><h1>${result.passed ? 'STRONG WORK' : 'KEEP BUILDING YOUR SKILLS'}</h1>
      <div class="result-score">${result.percent}%</div>
      <p class="result-rank">Final score: ${result.correct} / ${result.total} · ${result.passed ? 'PASSED' : '80% needed to pass'}</p>
      ${result.passed ? '<p>You earned the AP CSA Champion badge. Your progress is saved on this device.</p>' : `<p>Use the review below to strengthen ${escapeHTML(weakestTopic)} and retry with a fresh question draw.</p>`}
      <div class="final-result-summary">
        <div><p class="eyebrow">STRONGEST TOPIC</p><strong>${escapeHTML(strongestTopic)}</strong></div>
        <div><p class="eyebrow">WEAKEST TOPIC</p><strong>${escapeHTML(weakestTopic)}</strong></div>
        <div><p class="eyebrow">SUGGESTED MISSION REVIEW</p><strong>${escapeHTML(weakestMission?.title || 'Algorithm Design Center')}</strong></div>
      </div>
      <h2>Difficulty breakdown</h2><div class="topic-result-grid">${difficultyRows}</div>
      <h2>Topic breakdown</h2><div class="topic-result-grid">${topicRows}</div>
      <div class="completion-actions"><button type="button" class="button button-primary" id="review-mission" data-mission="${escapeHTML(suggestedMission)}">REVIEW SUGGESTED MISSION</button><button type="button" class="button button-secondary" id="retake-final">NEW FINAL CHALLENGE</button><button type="button" class="button button-quiet" data-screen="missions-screen">RETURN TO MISSIONS</button></div>
    </section><section class="panel review-panel"><div class="section-heading"><div><p class="eyebrow">LEARN FROM THE TRACE</p><h2>Answer review</h2></div></div>${review}</section>`;
    $('#retake-final').addEventListener('click', startFinalChallenge);
    $('#review-mission').addEventListener('click', event => openMission(event.currentTarget.dataset.mission));
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
      showScreen(button.dataset.screen, button.dataset.scrollTarget);
    });
    $('#begin-quest').addEventListener('click', () => showScreen('missions-screen'));
    $('#back-to-mission-list').addEventListener('click', () => {
      $('#mission-detail').hidden = true;
      $('#mission-map').hidden = false;
      renderMissionCards();
    });
    $('#open-final').addEventListener('click', () => {
      if (!state.finalRun || state.finalRun.result) startFinalChallenge();
      else {
        renderFinalChallenge();
        showScreen('final-screen');
      }
    });
    $('#open-teacher').addEventListener('click', () => showScreen('teacher-screen'));
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
    renderFRQHome();
    showScreen('home-screen');
  }

  initialize();
})();
