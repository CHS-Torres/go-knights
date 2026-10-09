'use strict';

(() => {
  const STORAGE_KEY = 'centennial-apcsa-unit1-survival-camp-v1';
  const MOTIVATION = [
    'Every expert programmer started as a beginner.',
    'Debugging is training. Keep asking why.',
    'One mission at a time.',
    'Constructors build opportunities.',
    'Methods create results.',
    'Objects create possibilities.',
    'Persistence beats frustration.',
    'You are becoming stronger with every challenge.'
  ];
  const RANKS = [
    { name: 'Recruit', min: 0 },
    { name: 'Cadet', min: 100 },
    { name: 'Operator', min: 250 },
    { name: 'Java Ranger', min: 500 },
    { name: 'Survivor', min: 750 },
    { name: 'Java Master', min: 1000 }
  ];
  const BADGES = [
    { id: 'object', name: 'Object Spotter', icon: '◉', detail: 'Clear Object Identification' },
    { id: 'constructor', name: 'Constructor Engineer', icon: '⚙', detail: 'Clear Constructor Boot Camp' },
    { id: 'method', name: 'Method Master', icon: '⌘', detail: 'Clear Method Survival' },
    { id: 'utility', name: 'Utility Expert', icon: '▦', detail: 'Clear Student Utility Center' },
    { id: 'string', name: 'String Survivor', icon: 'Aa', detail: 'Clear String Operations Arena' },
    { id: 'account', name: 'Account Manager', icon: '＄', detail: 'Clear Account Management Training' },
    { id: 'champion', name: 'Unit 1 Champion', icon: '★', detail: 'Clear every mission and score 90% or higher' }
  ];
  const MISSIONS = [
    {
      id: 'objects', title: 'Object Identification', short: 'Classes, objects, and references',
      briefing: 'Programmers cannot survive if they cannot identify objects. Learn the difference between a class blueprint and the objects created from it.',
      reward: 50, badge: 'object',
      points: [
        '<strong>Class:</strong> a blueprint that describes a type of object, such as <code>Dog</code>.',
        '<strong>Object:</strong> one specific instance built from a class, such as Buddy, a particular dog.',
        'A variable such as <code>Dog pet</code> can refer to an object. The class name is the type; the object is the instance.',
        'The <code>new</code> keyword constructs an object and returns a reference to it.'
      ],
      code: 'Dog buddy = new Dog();\\nCar mustang = new Car();\\nStudent maria = new Student();',
      callout: 'A class is the recipe. An object is one serving made from that recipe.',
      quiz: [
        q('Which choice is an object, not a class?', ['Car', 'Student', 'Buddy, a particular Dog', 'Account'], 2, 'Buddy is one specific instance. Dog is the class.'),
        q('What does <code>Car myCar = new Car();</code> do?', ['Defines the Car class', 'Creates a Car object and stores its reference in myCar', 'Calls a method named Car', 'Creates an integer'], 1, '<code>new Car()</code> constructs an object; <code>myCar</code> holds its reference.'),
        q('A class is best described as…', ['One object in memory', 'A blueprint for objects of that type', 'A method parameter', 'A printed value'], 1, 'The class describes the state and behavior its objects can have.')
      ]
    },
    {
      id: 'constructors', title: 'Constructor Boot Camp', short: 'new, constructors, and parameters',
      briefing: 'Construction crews are standing by. Learn how constructors initialize new objects and how arguments get passed into parameters.',
      reward: 75, badge: 'constructor',
      points: [
        'A constructor runs when an object is created with <code>new</code>.',
        'Its name matches the class name and it has no return type—not even <code>void</code>.',
        'Arguments are the values in a constructor call; parameters are the receiving variables in its declaration.',
        'Overloaded constructors share a name but have different parameter lists.'
      ],
      code: 'Account acc = new Account("Aldrin", 500.0);\\n\\npublic Account(String userName, double startingBalance) {\\n    name = userName;\\n    balance = startingBalance;\\n}',
      callout: 'The call supplies two arguments. The constructor receives them in userName and startingBalance.',
      quiz: [
        q('Which declaration is a valid constructor for class <code>Student</code>?', ['public void Student(String name)', 'public Student(String name)', 'public int Student()', 'public student(String name)'], 1, 'A constructor has the class name and no return type.'),
        q('In <code>new Account("Aldrin", 500.0)</code>, what is <code>500.0</code>?', ['A field declaration', 'A parameter', 'An argument', 'A return value'], 2, 'The value supplied at the call site is an argument.'),
        q('Why might a class have two overloaded constructors?', ['To give objects different initialization options', 'To make a method return twice', 'To rename the class', 'To avoid using new'], 0, 'Overloaded constructors allow different sets of initialization data.')
      ]
    },
    {
      id: 'methods', title: 'Method Survival', short: 'Calls, parameters, and return values',
      briefing: 'Methods make objects useful. Identify what a method needs, what it does, and what value—if any—it gives back.',
      reward: 100, badge: 'method',
      points: [
        'A method is a named block of code that performs an action or computes a value.',
        'Parameters receive information; arguments are the values supplied in a call.',
        'A <code>void</code> method performs an action without returning a value. Other methods return a value of their declared type.',
        'Methods are called with parentheses. A method call can be used as an expression when it returns a value.'
      ],
      code: 'String callSign = "knight";\\nString loud = callSign.toUpperCase(); // "KNIGHT"\\nint letters = callSign.length();  // 6\\nString part = callSign.substring(1, 4); // "nig"',
      callout: '<code>substring(start, end)</code> includes start and stops before end. <code>length()</code> returns an int.',
      quiz: [
        q('What does <code>"java".toUpperCase()</code> return?', ['java', 'JAVA', 'Java', 'An int'], 1, '<code>toUpperCase()</code> returns a new uppercase String.'),
        q('What is the value of <code>"KNIGHT".substring(1, 4)</code>?', ['KNI', 'NIG', 'IGH', 'NIGH'], 1, 'Indices 1, 2, and 3 are included; index 4 is excluded.'),
        q('A method declared <code>void report()</code>…', ['Must return a String', 'Does not return a value', 'Returns zero', 'Cannot have a body'], 1, '<code>void</code> means there is no return value.')
      ]
    },
    {
      id: 'utility', title: 'FRQ #1 · Student Utility Center', short: 'Percentage, email, and student ID utilities',
      briefing: 'Rescue the student data desk. Build small utility methods from inputs, use parameters carefully, and return the requested String or numeric result.',
      reward: 150, badge: 'utility',
      points: [
        '<code>calcPercentage(earned, possible)</code> divides earned points by possible points and multiplies by 100. Validate that possible is greater than zero.',
        '<code>genStudentEmail(first, last)</code> can combine names and a school domain into a String. Use lowercase consistently.',
        'For this training simulator, a student ID uses the first initial, first three letters of the last name, and the final two digits of graduation year.',
        'Utility methods are often <code>static</code>: call them with the class name when they do not need an individual object.'
      ],
      code: 'public static double calcPercentage(double earned, double possible) {\\n    return earned / possible * 100;\\n}\\n\\n// Training email format: first.last@centennialknights.org\\n// Training ID format: first initial + first 3 of last + grad year',
      callout: 'Try the calculator and both generators. The email/ID formats above are the rules used in this practice center.',
      quiz: [
        q('A student earns 42 points out of 50. What percentage does <code>earned / possible * 100</code> produce?', ['42%', '50%', '84%', '92%'], 2, '42 / 50 × 100 = 84.'),
        q('Why should <code>calcPercentage</code> check for <code>possible == 0</code>?', ['Division by zero is undefined', 'Zero is not a valid Java literal', 'It changes the return type', 'It prevents object creation'], 0, 'A zero denominator cannot produce a meaningful percentage.'),
        q('A method that builds an email and gives it back should return…', ['void', 'double', 'String', 'boolean only'], 2, 'The generated email is text, so its return type is String.')
      ]
    },
    {
      id: 'strings', title: 'String Operations Arena', short: 'Indexing and String methods',
      briefing: 'Strings are a sequence of characters. Use zero-based indexes and keep track of which methods return a value versus a position.',
      reward: 125, badge: 'string',
      points: [
        '<code>length()</code> returns the number of characters. Valid indexes run from 0 through <code>length() - 1</code>.',
        '<code>charAt(index)</code> returns the character at one index.',
        '<code>substring(start, end)</code> includes start and excludes end.',
        '<code>indexOf(text)</code> returns the first matching index, or -1 when there is no match.',
        '<code>toUpperCase()</code> and <code>toLowerCase()</code> return new Strings; Strings are immutable.'
      ],
      code: 'String code = "JavaCamp";\\ncode.length();       // 8\\ncode.charAt(0);      // \'J\'\\ncode.substring(4);   // "Camp"\\ncode.indexOf("Camp"); // 4',
      callout: 'Try your own String in the workbench. Watch the zero-based index and exclusive substring end.',
      quiz: [
        q('What does <code>"JavaCamp".charAt(4)</code> return?', ['a', 'C', 'J', 'm'], 1, 'J is index 0, a is 1, v is 2, a is 3, and C is 4.'),
        q('What does <code>"JavaCamp".indexOf("z")</code> return?', ['0', '-1', '8', 'It throws an error'], 1, '<code>indexOf</code> returns -1 when the target is not found.'),
        q('What is <code>"code".substring(1, 3)</code>?', ['co', 'od', 'ode', 'd'], 1, 'The method includes indexes 1 and 2, but not 3.')
      ]
    },
    {
      id: 'account', title: 'FRQ #2 · Account Management Training', short: 'Account objects, balances, and transactions',
      briefing: 'Your account simulator is live. Build an Account object, apply deposits and withdrawals, and trace how methods update instance state.',
      reward: 150, badge: 'account',
      points: [
        'An <code>Account</code> object stores instance fields such as <code>name</code> and <code>balance</code>.',
        '<code>Account(String userName)</code> can start a new account at $0. <code>Account(String userName, double balance)</code> uses the supplied starting balance.',
        '<code>deposit(amount)</code> adds to the balance. <code>withdraw(amount)</code> subtracts from it.',
        '<code>getBalance()</code> and <code>getName()</code> return information without changing the account. A <code>void</code> transaction method changes the object’s state.',
        'This simulator accepts only positive transactions and prevents withdrawing more than the balance.'
      ],
      code: 'public class Account {\\n    private String name;\\n    private double balance;\\n\\n    public Account(String userName) {\\n        this(userName, 0.0);\\n    }\\n\\n    public Account(String userName, double startingBalance) {\\n        name = userName;\\n        balance = startingBalance;\\n    }\\n\\n    public void deposit(double amount) { balance += amount; }\\n    public void withdraw(double amount) { balance -= amount; }\\n    public double getBalance() { return balance; }\\n    public String getName() { return name; }\\n}',
      callout: 'Use the simulator to create an account and test transactions. The quiz scenarios use dollars and cents.',
      quiz: [
        q('A $500 account receives a $200 deposit. What is the new balance?', ['$300', '$500', '$700', '$1,000'], 2, 'A deposit adds: 500 + 200 = 700.'),
        q('An account has $1,000 and withdraws $300. What remains?', ['$700', '$1,300', '$300', '$0'], 0, 'A withdrawal subtracts: 1,000 - 300 = 700.'),
        q('What should <code>getBalance()</code> do?', ['Subtract the balance', 'Return the current balance', 'Create a new Account', 'Print the account name only'], 1, 'A getter returns the field value without changing it.')
      ]
    },
    {
      id: 'gauntlet', title: 'The Java Survival Gauntlet', short: 'Randomized mixed Unit 1 review',
      briefing: 'Final field exercise. Your five-question route is randomized from a Unit 1 question bank. Read carefully, trace the code, and trust your training.',
      reward: 100, badge: null,
      points: [
        'Identify classes and objects before tracing their state.',
        'At every constructor or method call, match arguments to parameters in order.',
        'For String results, check indexes and remember the exclusive substring end.',
        'For Account scenarios, write down the starting balance and apply transactions one at a time.',
        'Check whether a method returns a value or only performs an action.'
      ],
      code: 'Mission plan:\\n1. Read the call.\\n2. Trace each argument and field update.\\n3. Predict the return value.\\n4. Check your reasoning.',
      callout: 'Answer all five randomized questions correctly to clear the gauntlet.',
      quiz: []
    }
  ];

  function q(prompt, choices, answer, explanation) {
    return { prompt, choices, answer, explanation };
  }

  const ASSESSMENT_BANK = [
    { id: 'a01', topic: 'Objects', prompt: 'Which statement best describes an object?', choices: ['A blueprint for a type', 'A specific instance of a class', 'A parameter list', 'A Java keyword for methods'], answer: 1, explanation: 'An object is an individual instance created from a class.' },
    { id: 'a02', topic: 'Classes', prompt: 'If <code>Dog</code> is a class and Buddy is one particular dog, which is the class?', choices: ['Buddy', 'Dog', 'new', 'pet'], answer: 1, explanation: 'Dog is the class; Buddy refers to one object.' },
    { id: 'a03', topic: 'Constructors', prompt: 'Which is a valid constructor declaration inside class <code>Book</code>?', choices: ['public void Book(String title)', 'public Book(String title)', 'public String book(String title)', 'public int Book()'], answer: 1, explanation: 'A constructor has the same name as its class and no return type.' },
    { id: 'a04', topic: 'Constructors', prompt: 'What does the <code>new</code> keyword do in <code>new Student()</code>?', choices: ['Declares a class', 'Creates an object', 'Returns a field name', 'Ends the program'], answer: 1, explanation: '<code>new</code> constructs an object and returns its reference.' },
    { id: 'a05', topic: 'Parameters', prompt: 'In <code>void setScore(int points)</code>, what is <code>points</code>?', choices: ['An argument', 'A parameter', 'A class', 'A return value'], answer: 1, explanation: 'The variable in the method declaration is a parameter.' },
    { id: 'a06', topic: 'Parameters', prompt: 'In <code>setScore(85)</code>, what is <code>85</code>?', choices: ['A parameter', 'An argument', 'A constructor', 'A field declaration'], answer: 1, explanation: 'The value passed into a call is an argument.' },
    { id: 'a07', topic: 'Return values', prompt: 'What does a <code>void</code> method indicate?', choices: ['It returns an int', 'It returns no value', 'It has no parameters', 'It must be static'], answer: 1, explanation: '<code>void</code> methods do not return a value.' },
    { id: 'a08', topic: 'Methods', prompt: 'Which call returns the number of characters in <code>name</code>?', choices: ['name.length', 'name.length()', 'length(name)', 'name.size()'], answer: 1, explanation: 'Java String length is called with parentheses: <code>name.length()</code>.' },
    { id: 'a09', topic: 'Strings', prompt: 'What does <code>"java".toUpperCase()</code> return?', choices: ['JAVA', 'java', 'Java', '4'], answer: 0, explanation: 'It returns the uppercase String <code>JAVA</code>.' },
    { id: 'a10', topic: 'Strings', prompt: 'What is <code>"Knight".substring(1, 4)</code>?', choices: ['Kni', 'nig', 'ight', 'nigh'], answer: 1, explanation: 'Indexes 1, 2, and 3 are included; the end index 4 is excluded.' },
    { id: 'a11', topic: 'Strings', prompt: 'What does <code>"Java".charAt(0)</code> return?', choices: ['J', 'a', '0', 'Java'], answer: 0, explanation: 'String indexes are zero-based; index 0 is J.' },
    { id: 'a12', topic: 'Strings', prompt: 'What does <code>"camp".indexOf("z")</code> return?', choices: ['0', '4', '-1', 'null'], answer: 2, explanation: '<code>indexOf</code> returns -1 when the target does not occur.' },
    { id: 'a13', topic: 'Strings', prompt: 'What is <code>"Bootcamp".length()</code>?', choices: ['7', '8', '9', '10'], answer: 1, explanation: 'Bootcamp contains eight characters.' },
    { id: 'a14', topic: 'Strings', prompt: 'What is <code>"JavaCamp".substring(4)</code>?', choices: ['Java', 'Camp', 'avaC', 'JavaCamp'], answer: 1, explanation: 'The one-argument substring runs from index 4 to the end.' },
    { id: 'a15', topic: 'Constructors', prompt: 'Why can a class define overloaded constructors?', choices: ['To initialize objects in more than one way', 'To create multiple class names', 'To make fields static', 'To return several values'], answer: 0, explanation: 'Different parameter lists provide different initialization options.' },
    { id: 'a16', topic: 'Code reading', prompt: '<code>int add(int a, int b) { return a + b; }</code><br>What does <code>add(3, 4)</code> return?', choices: ['1', '7', '12', 'Nothing'], answer: 1, explanation: 'The arguments 3 and 4 become a and b; their sum is 7.' },
    { id: 'a17', topic: 'Code reading', prompt: '<code>String s = "JAVA";</code><br>What does <code>s.toLowerCase()</code> return?', choices: ['JAVA', 'java', 'Java', 'An error'], answer: 1, explanation: '<code>toLowerCase()</code> returns a lowercase String.' },
    { id: 'a18', topic: 'Utility methods', prompt: 'What percentage is 18 points out of 24?', choices: ['60%', '70%', '75%', '80%'], answer: 2, explanation: '18 / 24 × 100 = 75%.' },
    { id: 'a19', topic: 'Utility methods', prompt: 'A percentage method receives earned and possible points. Which expression calculates the percentage?', choices: ['possible / earned * 100', 'earned / possible * 100', 'earned + possible', 'earned * possible'], answer: 1, explanation: 'Divide earned by possible, then multiply by 100.' },
    { id: 'a20', topic: 'Utility methods', prompt: 'A method generates an email address as text. What is a suitable return type?', choices: ['int', 'boolean', 'void', 'String'], answer: 3, explanation: 'Email addresses are String values.' },
    { id: 'a21', topic: 'Account FRQ', prompt: 'An account begins at $500. After <code>deposit(200)</code>, what is its balance?', choices: ['$300', '$500', '$700', '$1,200'], answer: 2, explanation: 'A deposit adds 200 to the balance: $700.' },
    { id: 'a22', topic: 'Account FRQ', prompt: 'An account begins at $1,000. After <code>withdraw(300)</code>, what is its balance?', choices: ['$700', '$1,300', '$300', '$0'], answer: 0, explanation: 'A withdrawal subtracts 300: $700.' },
    { id: 'a23', topic: 'Account FRQ', prompt: 'An account starts at $500, deposits $200, then withdraws $75. What is the final balance?', choices: ['$225', '$575', '$625', '$775'], answer: 2, explanation: '$500 + $200 - $75 = $625.' },
    { id: 'a24', topic: 'Account FRQ', prompt: 'Which method should return an account’s current balance without changing it?', choices: ['deposit', 'withdraw', 'getBalance', 'setBalance'], answer: 2, explanation: '<code>getBalance</code> is an accessor that returns the field.' },
    { id: 'a25', topic: 'Objects', prompt: 'What does <code>Account acc = new Account("Mia", 250.0);</code> do?', choices: ['Creates an Account and initializes it with two arguments', 'Defines the Account class', 'Returns a balance from a method', 'Creates a String only'], answer: 0, explanation: 'The constructor call creates an Account object using the supplied name and balance.' },
    { id: 'a26', topic: 'Code reading', prompt: '<code>String s = "Code";</code><br>What is <code>s.charAt(2)</code>?', choices: ['C', 'o', 'd', 'e'], answer: 2, explanation: 'C is index 0, o is 1, and d is 2.' },
    { id: 'a27', topic: 'Parameters', prompt: 'A method is declared <code>double calc(double earned, double total)</code>. How many parameters does it have?', choices: ['0', '1', '2', '3'], answer: 2, explanation: 'The declaration lists earned and total.' },
    { id: 'a28', topic: 'Strings', prompt: 'What is the result of <code>"KNIGHT".toLowerCase()</code>?', choices: ['knight', 'KNIGHT', 'Knight', '6'], answer: 0, explanation: 'The method returns all lowercase characters.' },
    { id: 'a29', topic: 'Methods', prompt: 'A method call used inside <code>int n = getCount();</code> must return a value compatible with…', choices: ['int', 'void', 'a class name only', 'the parameter list'], answer: 0, explanation: 'The call result is assigned to an int, so it must return a compatible value.' },
    { id: 'a30', topic: 'Account FRQ', prompt: 'Why should a deposit method use the account’s existing balance?', choices: ['So the new balance is old balance plus amount', 'To replace the object', 'To return the account name', 'So the constructor runs again'], answer: 0, explanation: 'Deposit updates the current instance state: balance += amount.' },
    { id: 'a31', topic: 'Utility methods', prompt: 'Which action is an appropriate guard in a percentage calculator?', choices: ['Allow possible points to be 0', 'Check possible points are greater than 0', 'Convert all inputs to uppercase', 'Call substring on the points'], answer: 1, explanation: 'A positive denominator avoids division by zero.' },
    { id: 'a32', topic: 'Strings', prompt: 'Which statement about Java Strings is true?', choices: ['String methods change the original String in place', 'Strings are immutable; methods return String values', 'Strings cannot be stored in variables', 'String indexes begin at 1'], answer: 1, explanation: 'Strings are immutable; transformations return new String values.' }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const randomize = items => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1));
      [result[index], result[target]] = [result[target], result[index]];
    }
    return result;
  };
  const money = value => `$${Number(value).toFixed(2)}`;
  const defaults = () => ({
    playerName: '',
    xp: 0,
    level: 1,
    missionsCompleted: [],
    currentRank: 'Recruit',
    badgesEarned: [],
    assessmentScore: null,
    assessmentRank: null,
    missionModules: {},
    missionAnswers: {},
    missionSelections: {},
    missionQuestionXp: [],
    gauntletQuestionIds: null,
    account: null,
    assessmentRun: null,
    assessmentBonusClaimed: false,
    assessmentQuestionXp: []
  });

  let storageWarningShown = false;
  let storageLoadError = false;
  let state = loadState();
  let activeMissionId = null;
  let toastTimer = 0;

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return defaults();
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return defaults();
      const result = { ...defaults(), ...parsed };
      result.xp = Number.isFinite(Number(result.xp)) ? Math.max(0, Number(result.xp)) : 0;
      result.level = Math.floor(result.xp / 100) + 1;
      result.missionsCompleted = Array.isArray(result.missionsCompleted) ? result.missionsCompleted.filter(id => MISSIONS.some(mission => mission.id === id)) : [];
      result.badgesEarned = Array.isArray(result.badgesEarned) ? result.badgesEarned.filter(id => BADGES.some(badge => badge.id === id)) : [];
      result.missionModules = result.missionModules && typeof result.missionModules === 'object' ? result.missionModules : {};
      result.missionAnswers = result.missionAnswers && typeof result.missionAnswers === 'object' ? result.missionAnswers : {};
      result.missionSelections = result.missionSelections && typeof result.missionSelections === 'object' ? result.missionSelections : {};
      result.missionQuestionXp = Array.isArray(result.missionQuestionXp) ? result.missionQuestionXp : [];
      result.assessmentQuestionXp = Array.isArray(result.assessmentQuestionXp) ? result.assessmentQuestionXp : [];
      if (!Array.isArray(result.gauntletQuestionIds) || result.gauntletQuestionIds.length !== 5
        || new Set(result.gauntletQuestionIds).size !== 5
        || result.gauntletQuestionIds.some(id => !ASSESSMENT_BANK.some(question => question.id === id))) {
        result.gauntletQuestionIds = null;
      }
      result.assessmentScore = Number.isFinite(Number(result.assessmentScore)) && result.assessmentScore !== null
        ? Math.min(100, Math.max(0, Number(result.assessmentScore)))
        : null;
      result.assessmentRank = result.assessmentScore === null ? null : assessmentRank(result.assessmentScore);
      result.currentRank = getRank(result.xp).name;
      result.assessmentRun = normalizeAssessmentRun(result.assessmentRun);
      result.assessmentBonusClaimed = Boolean(result.assessmentBonusClaimed);
      if (result.account && typeof result.account.name === 'string' && Number.isFinite(Number(result.account.balance)) && Number(result.account.balance) >= 0) {
        result.account = {
          name: result.account.name.slice(0, 50),
          balance: Math.round(Number(result.account.balance) * 100) / 100,
          history: Array.isArray(result.account.history) ? result.account.history.filter(entry => typeof entry === 'string').slice(0, 8).map(entry => entry.slice(0, 160)) : [],
          created: Boolean(result.account.created)
        };
      } else {
        result.account = null;
      }
      if (typeof result.playerName !== 'string') result.playerName = '';
      result.playerName = result.playerName.slice(0, 60);
      return result;
    } catch (error) {
      console.warn('Could not load saved training progress.', error);
      storageLoadError = true;
      return defaults();
    }
  }

  function persist() {
    state.currentRank = getRank(state.xp).name;
    state.level = Math.floor(state.xp / 100) + 1;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Could not save training progress.', error);
      if (!storageWarningShown) {
        storageWarningShown = true;
        $('#notice').hidden = false;
        $('#notice').textContent = 'Your browser could not save progress. Training will continue, but progress may not survive a reload.';
      }
    }
  }

  function getRank(xp) {
    return [...RANKS].reverse().find(rank => xp >= rank.min) || RANKS[0];
  }

  function normalizeAssessmentRun(savedRun) {
    if (!savedRun || typeof savedRun !== 'object' || !Array.isArray(savedRun.questions) || savedRun.questions.length !== 25) return null;
    const questions = [];
    for (const saved of savedRun.questions) {
      if (!saved || typeof saved !== 'object') return null;
      const original = ASSESSMENT_BANK.find(question => question.id === saved.id);
      if (!original || !Array.isArray(saved.choices) || saved.choices.length !== original.choices.length
        || new Set(saved.choices).size !== original.choices.length
        || !original.choices.every(choice => saved.choices.includes(choice))) return null;
      questions.push({
        id: original.id,
        topic: original.topic,
        prompt: original.prompt,
        choices: [...saved.choices],
        answer: saved.choices.indexOf(original.choices[original.answer]),
        explanation: original.explanation
      });
    }
    if (new Set(questions.map(question => question.id)).size !== questions.length) return null;
    const answers = {};
    if (savedRun.answers && typeof savedRun.answers === 'object') {
      Object.entries(savedRun.answers).forEach(([key, answer]) => {
        const index = Number(key);
        if (!Number.isInteger(index) || index < 0 || index >= questions.length || !answer
          || !Number.isInteger(answer.selected) || answer.selected < 0 || answer.selected >= questions[index].choices.length) return;
        answers[index] = { selected: answer.selected, correct: answer.selected === questions[index].answer };
      });
    }
    const run = { questions, answers };
    if (Object.keys(answers).length === questions.length) {
      const correct = Object.values(answers).filter(answer => answer.correct).length;
      const percentage = Math.round((correct / questions.length) * 100);
      run.result = { correct, incorrect: questions.length - correct, percentage, rank: assessmentRank(percentage) };
    }
    return run;
  }

  function stateClass(value) {
    return ['success', 'error', 'info'].includes(value) ? value : '';
  }

  function getProgress(xp) {
    const rank = getRank(xp);
    const index = RANKS.findIndex(item => item.name === rank.name);
    const next = RANKS[index + 1];
    if (!next) return { rank, start: rank.min, next: null, percent: 100 };
    const percent = Math.min(100, Math.max(0, ((xp - rank.min) / (next.min - rank.min)) * 100));
    return { rank, start: rank.min, next: next.min, percent };
  }

  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3000);
  }

  function refreshHome() {
    const rankProgress = getProgress(state.xp);
    $('#header-rank').textContent = rankProgress.rank.name.toUpperCase();
    $('#header-xp').textContent = String(state.xp);
    $('#current-rank').textContent = rankProgress.rank.name;
    $('#current-xp').textContent = String(state.xp);
    $('#level-value').textContent = String(state.level);
    $('#missions-value').textContent = `${state.missionsCompleted.length}/${MISSIONS.length}`;
    $('#assessment-value').textContent = state.assessmentScore === null ? '—' : `${state.assessmentScore}%`;
    $('#map-completed').textContent = String(state.missionsCompleted.length);
    const progressBar = $('#rank-progress');
    progressBar.setAttribute('aria-valuenow', String(Math.round(rankProgress.percent)));
    $('#rank-progress-fill').style.width = `${rankProgress.percent}%`;
    $('#rank-progress-label').textContent = rankProgress.next === null ? `${state.xp} XP · MAX RANK` : `${state.xp - rankProgress.start} / ${rankProgress.next - rankProgress.start} XP`;
    const badgeShelf = $('#badge-shelf');
    badgeShelf.innerHTML = BADGES.map(badge => {
      const earned = state.badgesEarned.includes(badge.id);
      return `<div class="badge ${earned ? '' : 'badge-locked'}" title="${escapeHTML(badge.detail)}" aria-label="${escapeHTML(badge.name)}${earned ? ', earned' : ', locked'}"><span class="badge-icon" aria-hidden="true">${badge.icon}</span><span class="badge-name">${escapeHTML(badge.name)}</span></div>`;
    }).join('');
    $('#badge-empty').hidden = state.badgesEarned.length > 0;
    $('#student-name').value = state.playerName;
    const returning = state.xp > 0 || state.missionsCompleted.length > 0 || Boolean(state.playerName);
    $('#welcome-back').hidden = !returning;
    $('#start-training').innerHTML = `${returning ? 'CONTINUE TRAINING' : 'START TRAINING'} <span aria-hidden="true">→</span>`;
    renderMissionMap();
  }

  function renderMissionMap() {
    $('#mission-list').innerHTML = MISSIONS.map((mission, index) => {
      const complete = state.missionsCompleted.includes(mission.id);
      return `<article class="mission-card ${complete ? 'is-complete' : ''}">
        <span class="mission-number">${complete ? '✓' : String(index + 1).padStart(2, '0')}</span>
        <div class="mission-info"><h3>${escapeHTML(mission.title)}</h3><p>${escapeHTML(mission.short)}</p></div>
        <div class="mission-reward">${complete ? 'CLEARED' : `+${mission.reward} XP`}<small>${complete ? 'MISSION COMPLETE' : 'REWARD'}</small></div>
        <button type="button" class="mission-open" data-open-mission="${mission.id}" aria-label="${complete ? 'Review' : 'Start'} mission ${index + 1}: ${escapeHTML(mission.title)}"></button>
      </article>`;
    }).join('');
    $$('[data-open-mission]', $('#mission-list')).forEach(button => {
      button.addEventListener('click', () => openMission(button.dataset.openMission));
    });
  }

  function saveStudentName() {
    const value = $('#student-name').value.trim();
    state.playerName = value.slice(0, 60);
    persist();
    showToast(value ? `Welcome to camp, ${value}!` : 'Student name cleared.');
    refreshHome();
  }

  function addXP(amount, reason) {
    const oldRank = getRank(state.xp).name;
    const oldLevel = state.level;
    state.xp += amount;
    state.currentRank = getRank(state.xp).name;
    state.level = Math.floor(state.xp / 100) + 1;
    persist();
    refreshHome();
    if (oldRank !== state.currentRank || oldLevel !== state.level) {
      const newRank = oldRank !== state.currentRank;
      $('#level-description').textContent = newRank ? 'New rank achieved' : 'New level achieved';
      $('#level-new-rank').textContent = `${state.currentRank} · LEVEL ${state.level}`;
      $('#level-up').hidden = false;
    } else if (reason) {
      showToast(`+${amount} XP · ${reason}`);
    }
  }

  function awardBadge(id) {
    if (!id || state.badgesEarned.includes(id)) return;
    const badge = BADGES.find(item => item.id === id);
    if (!badge) return;
    state.badgesEarned.push(id);
    persist();
    refreshHome();
    showToast(`Badge unlocked: ${badge.name}`);
  }

  function checkChampionBadge() {
    if (state.missionsCompleted.length === MISSIONS.length && Number(state.assessmentScore) >= 90) {
      awardBadge('champion');
    }
  }

  function openScreen(screenId) {
    $$('.screen').forEach(screen => { screen.hidden = screen.id !== screenId; });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openMission(id) {
    const mission = MISSIONS.find(item => item.id === id);
    if (!mission) return;
    activeMissionId = id;
    if (id === 'gauntlet' && !Array.isArray(state.gauntletQuestionIds)) {
      state.gauntletQuestionIds = randomize(ASSESSMENT_BANK).slice(0, 5).map(item => item.id);
      persist();
    }
    renderMission();
    openScreen('mission-screen');
  }

  function missionFor(id) {
    const mission = MISSIONS.find(item => item.id === id);
    if (!mission) throw new Error(`Unknown mission: ${id}`);
    return mission;
  }

  function getModule(id) {
    if (!state.missionModules[id] || typeof state.missionModules[id] !== 'object') state.missionModules[id] = {};
    return state.missionModules[id];
  }

  function renderMission() {
    const mission = missionFor(activeMissionId);
    const index = MISSIONS.indexOf(mission);
    const name = state.playerName ? `, ${escapeHTML(state.playerName)}` : '';
    $('#mission-breadcrumb').textContent = `MISSION ${String(index + 1).padStart(2, '0')} / 07`;
    const module = getModule(mission.id);
    const quiz = missionQuiz(mission);
    const answered = Object.keys(state.missionAnswers[mission.id] || {}).filter(key => state.missionAnswers[mission.id][key].correct).length;
    const moduleComplete = isModuleComplete(mission.id, module, quiz);
    const missionComplete = state.missionsCompleted.includes(mission.id);
    const content = $('#mission-content');
    content.innerHTML = `
      <section class="mission-hero panel">
        <div><p class="eyebrow">MISSION ${String(index + 1).padStart(2, '0')} · FIELD BRIEFING</p><h1>${escapeHTML(mission.title)}</h1><p class="briefing">${escapeHTML(mission.briefing)}${name ? `<span class="personal-greeting"> Good work${name}.</span>` : ''}</p></div>
        <div class="mission-reward-large">${missionComplete ? '✓ CLEARED' : `✦ +${mission.reward} XP`}</div>
      </section>
      <div class="mission-body">
        <article class="panel lesson-panel"><p class="eyebrow">FIELD MANUAL</p><h2>Learn the essentials</h2>
          <div class="lesson-points">${mission.points.map(point => `<div class="lesson-point"><span>${point}</span></div>`).join('')}</div>
          <pre class="code-block"><code>${escapeHTML(mission.code.replace(/\\n/g, '\n'))}</code></pre>
          <div class="callout">${mission.callout}</div>
        </article>
        <article class="panel activity-panel"><p class="eyebrow">HANDS-ON TRAINING</p><h2>Practice station</h2>${renderActivity(mission.id, module)}</article>
      </div>
      <section class="panel quiz-panel"><p class="eyebrow">KNOWLEDGE CHECK · ${answered}/${quiz.length} CORRECT</p><h2>Training challenge</h2><p class="quiz-intro">Choose an answer and submit it. A wrong answer is a chance to regroup—try again when you are ready.</p>
        <div class="question-list">${quiz.map((item, questionIndex) => renderMissionQuestion(mission.id, item, questionIndex)).join('')}</div>
      </section>
      <div class="mission-finish ${missionComplete ? 'complete' : ''}"><p>${missionComplete ? '<strong>MISSION CLEARED.</strong> Your progress is saved.' : `Complete the practice station and all ${quiz.length} questions to clear this mission.`}</p><span class="mission-complete-mark">${missionComplete ? '✓ COMPLETE' : `${answered}/${quiz.length} QUESTIONS`}</span>${missionComplete && mission.id === 'gauntlet' ? '<button type="button" class="button button-secondary" id="rerun-gauntlet">RUN A NEW GAUNTLET · +25 XP</button>' : ''}</div>
      <p class="motivation">“${MOTIVATION[Math.floor(Math.random() * MOTIVATION.length)]}”</p>`;
    bindMissionEvents(mission.id);
    if (mission.id === 'gauntlet' && state.missionsCompleted.includes('gauntlet')) {
      $('#rerun-gauntlet', content).addEventListener('click', () => {
        state.gauntletQuestionIds = randomize(ASSESSMENT_BANK).slice(0, 5).map(item => item.id);
        delete state.missionAnswers.gauntlet;
        delete state.missionSelections.gauntlet;
        persist();
        renderMission();
      });
    }
  }

  function missionQuiz(mission) {
    if (mission.id !== 'gauntlet') return mission.quiz;
    return (state.gauntletQuestionIds || []).map(id => {
      const question = ASSESSMENT_BANK.find(item => item.id === id);
      return question ? { prompt: question.prompt, choices: question.choices, answer: question.answer, explanation: question.explanation } : null;
    }).filter(Boolean);
  }

  function renderMissionQuestion(missionId, item, index) {
    const answers = state.missionAnswers[missionId] || {};
    const saved = answers[index];
    const selections = state.missionSelections[missionId] || {};
    const selected = saved && saved.correct ? saved.selected : selections[index];
    const buttons = item.choices.map((choice, choiceIndex) => {
      const correctClass = saved && saved.correct && choiceIndex === item.answer ? 'was-correct' : '';
      const wrongClass = saved && !saved.correct && selected === choiceIndex ? 'was-wrong' : '';
      return `<button type="button" class="choice-button ${selected === choiceIndex ? 'selected' : ''} ${correctClass} ${wrongClass}" data-select-question="${index}" data-choice-index="${choiceIndex}" ${saved && saved.correct ? 'disabled' : ''}><span class="choice-letter">${String.fromCharCode(65 + choiceIndex)}</span><span>${choice}</span></button>`;
    }).join('');
    let feedback = '';
    if (saved && saved.correct) feedback = `<p class="feedback correct">✓ Correct. ${item.explanation}</p>`;
    else if (saved && !saved.correct) feedback = `<p class="feedback incorrect">Not quite. Review the idea and try another answer.</p>`;
    return `<article class="question-card"><p class="question-title"><span class="question-number">Q${index + 1}</span>${item.prompt}</p><div class="choice-list">${buttons}</div>${feedback}<div class="question-actions"><button type="button" class="button button-quiet" data-submit-question="${index}" ${saved && saved.correct ? 'disabled' : ''}>SUBMIT ANSWER</button><span class="question-status">${saved && saved.correct ? 'ANSWER RECORDED' : selected === undefined ? 'Choose one answer' : 'Ready to submit'}</span></div></article>`;
  }

  function renderActivity(id, module) {
    if (id === 'objects') {
      const options = [['buddy', 'Buddy · one particular dog'], ['mustang', 'Mustang · one particular car'], ['maria', 'Maria · one particular student']];
      return `<div class="activity-block"><h3>Object ID checkpoint</h3><p>Drag each object onto its class, or use the matching menus as a keyboard-friendly alternative.</p><div class="object-drag-bank">${options.map(([value, label]) => `<button type="button" class="drag-token" draggable="true" data-drag-object="${value}">${label}</button>`).join('')}</div><div class="form-row">${['Dog', 'Car', 'Student'].map((className, index) => `<label class="form-field object-drop-zone" data-object-drop="${index}">${className} class · matching instance<select data-object-match="${index}"><option value="">Choose an object…</option>${options.map(([value, label]) => `<option value="${value}" ${module.matches && module.matches[index] === value ? 'selected' : ''}>${label}</option>`).join('')}</select></label>`).join('')}</div><div class="question-actions"><button type="button" class="button button-secondary" id="check-objects">CHECK MATCHES</button></div><p class="activity-result ${stateClass(module.matchMessageType)}" id="object-result">${escapeHTML(module.matchMessage || '')}</p></div>`;
    }
    if (id === 'constructors') {
      return `<div class="activity-block"><h3>Constructor builder</h3><p>Choose the signature that matches <code>new Account("Aldrin", 500.0)</code>.</p><label class="form-field">Constructor signature<select id="constructor-signature"><option value="">Select a signature…</option><option value="one">Account(String userName)</option><option value="two">Account(String userName, double balance)</option><option value="return">double Account(String userName, double balance)</option><option value="different">Account(double balance, String userName)</option></select></label><div class="question-actions"><button type="button" class="button button-secondary" id="check-constructor">BUILD OBJECT</button></div><p class="activity-result ${stateClass(module.constructorMessageType)}" id="constructor-result">${escapeHTML(module.constructorMessage || '')}</p></div>
      <div class="activity-block"><h3>Parameter check</h3><p>For <code>Account(String userName, double balance)</code>, map each supplied argument to the parameter in the same position. Use the mission quiz to confirm your answer.</p></div>`;
    }
    if (id === 'methods') {
      return `<div class="activity-block"><h3>Method battle</h3><p>Predict the result of <code>"Java".toUpperCase() + "Camp".substring(1, 3)</code>.</p><label class="form-field">Predicted output<select id="method-prediction"><option value="">Choose your prediction…</option><option value="JAVAam">JAVAam</option><option value="JAVAC">JAVAC</option><option value="JavaCa">JavaCa</option><option value="JAVACamp">JAVACamp</option></select></label><div class="question-actions"><button type="button" class="button button-secondary" id="check-method">RUN PREDICTION</button></div><p class="activity-result ${stateClass(module.methodMessageType)}" id="method-result">${escapeHTML(module.methodMessage || '')}</p><pre class="code-block"><code>String tag = "Java";<br>String result = tag.toUpperCase() + "Camp".substring(1, 3);</code></pre></div>`;
    }
    if (id === 'utility') {
      return `<div class="activity-block"><h3>Section 1 · Percentage calculator</h3><p>Enter points earned and points possible. The calculator uses earned ÷ possible × 100.</p><div class="form-row"><label class="form-field">Earned points<input id="percentage-earned" type="number" min="0" step="any" placeholder="42"></label><label class="form-field">Possible points<input id="percentage-possible" type="number" min="0" step="any" placeholder="50"></label></div><div class="question-actions"><button type="button" class="button button-secondary" id="calculate-percentage">CALCULATE</button></div><p class="activity-result ${stateClass(module.percentMessageType)}" id="percentage-result">${escapeHTML(module.percentMessage || '')}</p></div>
      <div class="activity-block"><h3>Section 2 · Student email generator</h3><p>Training format: <code>first.last@centennialknights.org</code>.</p><div class="form-row"><label class="form-field">First name<input id="email-first" type="text" maxlength="40" placeholder="Aldrin"></label><label class="form-field">Last name<input id="email-last" type="text" maxlength="40" placeholder="Torres"></label></div><div class="question-actions"><button type="button" class="button button-secondary" id="generate-email">GENERATE EMAIL</button></div><p class="activity-result ${stateClass(module.emailMessageType)}" id="email-result">${escapeHTML(module.emailMessage || '')}</p></div>
      <div class="activity-block"><h3>Section 3 · Student ID generator</h3><p>Training format: first initial + first three letters of last name + final two graduation-year digits.</p><div class="form-row"><label class="form-field">First name<input id="id-first" type="text" maxlength="40" placeholder="Aldrin"></label><label class="form-field">Last name<input id="id-last" type="text" maxlength="40" placeholder="Torres"></label><label class="form-field">Graduation year<input id="id-year" type="number" min="2000" max="2099" step="1" placeholder="2027"></label></div><div class="question-actions"><button type="button" class="button button-secondary" id="generate-id">GENERATE ID</button></div><p class="activity-result ${stateClass(module.idMessageType)}" id="id-result">${escapeHTML(module.idMessage || '')}</p></div>`;
    }
    if (id === 'strings') {
      return `<div class="activity-block"><h3>String workbench</h3><p>Enter text to inspect its length, first character, uppercase form, index of “a”, and a substring.</p><div class="form-row"><label class="form-field">Your String<input id="string-input" type="text" maxlength="80" value="${escapeHTML(module.stringInput || '')}" placeholder="JavaCamp"></label><label class="form-field">Substring start<input id="substring-start" type="number" min="0" step="1" value="0"></label><label class="form-field">Substring end<input id="substring-end" type="number" min="0" step="1" value="4"></label></div><div class="question-actions"><button type="button" class="button button-secondary" id="run-strings">RUN STRING METHODS</button></div><div id="string-result" class="activity-result ${stateClass(module.stringMessageType)}">${escapeHTML(module.stringOutput || '').replace(/\\n/g, '<br>')}</div></div>
      <div class="activity-block"><h3>Broken string repair</h3><p>This code throws an index error: <code>"JavaCamp".substring(4, 9)</code>. Fix the exclusive end index so it stops at the final character.</p><label class="form-field">Replacement end index<select id="string-fix-answer"><option value="">Choose the corrected end index…</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="1">1</option></select></label><div class="question-actions"><button type="button" class="button button-secondary" id="repair-string">REPAIR AND TEST</button></div><p class="activity-result ${stateClass(module.stringRepairMessageType)}" id="string-repair-result">${escapeHTML(module.stringRepairMessage || '')}</p></div>`;
    }
    if (id === 'account') {
      const account = state.account;
      return `<div class="activity-block"><h3>Account simulator</h3><p>Create an account, then use deposit and withdraw to update its balance. Positive amounts only; overdrafts are not allowed.</p>
        ${account ? `<div class="rank-row"><span class="rank-insignia" aria-hidden="true">＄</span><div><span class="field-label">CURRENT ACCOUNT</span><strong>${escapeHTML(account.name)}</strong></div><span class="rank-xp">${money(account.balance)}</span></div>
        <div class="form-row"><label class="form-field">Transaction amount<input id="transaction-amount" type="number" min="0.01" step="0.01" placeholder="100.00"></label><button type="button" class="button button-secondary" id="deposit-button">DEPOSIT</button><button type="button" class="button button-quiet" id="withdraw-button">WITHDRAW</button></div>
        <button type="button" class="button button-quiet" id="reset-account">RESET ACCOUNT</button><ol class="history">${(account.history || []).slice(0, 8).map(entry => `<li>${escapeHTML(entry)}</li>`).join('')}</ol>
        <p class="activity-result" id="account-result">${account.history && account.history.length ? escapeHTML(account.history[0]) : 'Account ready for transactions.'}</p>`
        : `<div class="form-row"><label class="form-field">Account name<input id="account-name" type="text" maxlength="50" placeholder="Aldrin"></label><label class="form-field">Starting balance<input id="account-start" type="number" min="0" step="0.01" placeholder="500.00"></label></div><div class="question-actions"><button type="button" class="button button-secondary" id="create-account">CREATE ACCOUNT</button></div><p class="activity-result" id="account-result"></p>`}</div>
        <div class="activity-block"><h3>Transaction trace</h3><p>Scenario: start with $500, deposit $200, withdraw $50. Record each balance in order, then check your answers in the knowledge challenge.</p><pre class="code-block"><code>Account account = new Account("Recruit", 500.0);\\naccount.deposit(200.0); // 700.0\\naccount.withdraw(50.0); // 650.0</code></pre></div>`;
    }
    return `<div class="activity-block"><h3>Gauntlet protocol</h3><p>Answer all five randomized field questions below. You can retry missed questions until you have a clear run.</p><p class="activity-result info">Your question set is saved so you can resume after leaving this mission.</p></div>`;
  }

  function bindMissionEvents(id) {
    const content = $('#mission-content');
    content.querySelectorAll('[data-select-question]').forEach(button => {
      button.addEventListener('click', () => {
        const questionIndex = Number(button.dataset.selectQuestion);
        const choiceIndex = Number(button.dataset.choiceIndex);
        if (!state.missionSelections[id]) state.missionSelections[id] = {};
        state.missionSelections[id][questionIndex] = choiceIndex;
        persist();
        renderMission();
      });
    });
    content.querySelectorAll('[data-submit-question]').forEach(button => {
      button.addEventListener('click', () => submitMissionAnswer(id, Number(button.dataset.submitQuestion)));
    });
    bindActivity(id, content);
  }

  function submitMissionAnswer(id, index) {
    const quiz = missionQuiz(missionFor(id));
    const item = quiz[index];
    if (!item) return;
    const selected = state.missionSelections[id] && state.missionSelections[id][index];
    if (selected === undefined) {
      showToast('Choose an answer before submitting.');
      return;
    }
    const answers = state.missionAnswers[id] || (state.missionAnswers[id] = {});
    const previous = answers[index];
    if (previous && previous.correct) return;
    const correct = selected === item.answer;
    answers[index] = { selected, correct, wrongAttempt: Boolean(previous && previous.wrongAttempt) || !correct };
    if (correct) {
      answers[index].firstTry = !(previous && previous.wrongAttempt);
      const awardKey = `${id}:${index}`;
      if (!state.missionQuestionXp.includes(awardKey)) {
        state.missionQuestionXp.push(awardKey);
        addXP(5, 'Correct answer');
      }
    }
    persist();
    renderMission();
    if (correct) showToast('Correct! +5 XP. Keep moving, recruit.');
    else showToast('Not quite. Read the explanation and try again—you have this.');
    maybeCompleteMission(id);
  }

  function isModuleComplete(id, module, quiz) {
    if (id === 'objects') return Boolean(module.matchDone);
    if (id === 'constructors') return Boolean(module.constructorDone);
    if (id === 'methods') return Boolean(module.methodDone);
    if (id === 'utility') return Boolean(module.percentDone && module.emailDone && module.idDone);
    if (id === 'strings') return Boolean(module.stringDone && module.stringRepairDone);
    if (id === 'account') return Boolean(state.account && state.account.created);
    return quiz.length > 0;
  }

  function allQuizAnswersCorrect(id, quiz) {
    const answers = state.missionAnswers[id] || {};
    return quiz.length > 0 && quiz.every((_, index) => answers[index] && answers[index].correct);
  }

  function maybeCompleteMission(id) {
    const alreadyCompleted = state.missionsCompleted.includes(id);
    if (alreadyCompleted && id !== 'gauntlet') return;
    const mission = missionFor(id);
    const module = getModule(id);
    const quiz = missionQuiz(mission);
    if (!isModuleComplete(id, module, quiz) || !allQuizAnswersCorrect(id, quiz)) return;
    if (alreadyCompleted) {
      addXP(25, 'Gauntlet replay bonus');
      persist();
      renderMission();
      showToast('Gauntlet cleared again! Replay bonus earned.');
      return;
    }
    state.missionsCompleted.push(id);
    addXP(mission.reward, `Mission ${MISSIONS.indexOf(mission) + 1} complete`);
    const firstTry = quiz.every((_, index) => state.missionAnswers[id][index].firstTry);
    if (firstTry) addXP(15, 'Perfect mission bonus');
    if (mission.badge) awardBadge(mission.badge);
    persist();
    refreshHome();
    renderMission();
    showToast(firstTry ? 'Mission cleared! Perfect run bonus earned.' : 'Mission cleared! Progress saved.');
    checkChampionBadge();
  }

  function setModuleMessage(module, field, message, type) {
    module[field] = message;
    module[`${field}Type`] = type;
  }

  function updateModule(id) {
    persist();
    renderMission();
    maybeCompleteMission(id);
  }

  function bindActivity(id, root) {
    const module = getModule(id);
    if (id === 'objects') {
      $$('[data-drag-object]', root).forEach(token => {
        token.addEventListener('dragstart', event => {
          event.dataTransfer.setData('text/plain', token.dataset.dragObject);
          event.dataTransfer.effectAllowed = 'move';
        });
      });
      $$('[data-object-drop]', root).forEach(zone => {
        zone.addEventListener('dragover', event => {
          event.preventDefault();
          zone.classList.add('drop-ready');
        });
        zone.addEventListener('dragleave', () => zone.classList.remove('drop-ready'));
        zone.addEventListener('drop', event => {
          event.preventDefault();
          zone.classList.remove('drop-ready');
          const value = event.dataTransfer.getData('text/plain');
          const select = $('[data-object-match]', zone);
          if (!select || !['buddy', 'mustang', 'maria'].includes(value)) return;
          select.value = value;
          module.matches = $$('[data-object-match]', root).map(item => item.value);
          persist();
          renderMission();
        });
      });
      $('#check-objects', root).addEventListener('click', () => {
        const matches = $$('[data-object-match]', root).map(select => select.value);
        module.matches = matches;
        module.matchDone = matches[0] === 'buddy' && matches[1] === 'mustang' && matches[2] === 'maria';
        setModuleMessage(module, 'matchMessage', module.matchDone ? 'All three are matched: each is an object instance.' : 'Check the class/object pairs and try again.', module.matchDone ? 'success' : 'error');
        updateModule(id);
      });
    }
    if (id === 'constructors') {
      $('#check-constructor', root).addEventListener('click', () => {
        module.constructorDone = $('#constructor-signature', root).value === 'two';
        setModuleMessage(module, 'constructorMessage', module.constructorDone ? 'Correct. The class name matches, the parameter order matches, and there is no return type.' : 'That signature does not match the constructor call. Check the name, parameter order, and return type.', module.constructorDone ? 'success' : 'error');
        updateModule(id);
      });
    }
    if (id === 'methods') {
      $('#check-method', root).addEventListener('click', () => {
        module.methodDone = $('#method-prediction', root).value === 'JAVAam';
        setModuleMessage(module, 'methodMessage', module.methodDone ? 'Correct: "Java" becomes "JAVA"; "Camp".substring(1, 3) is "am". The result is "JAVAam".' : 'Trace each call in order: uppercase the first String, then take indexes 1 and 2 of "Camp".', module.methodDone ? 'success' : 'error');
        updateModule(id);
      });
    }
    if (id === 'utility') {
      $('#calculate-percentage', root).addEventListener('click', () => {
        const earned = Number($('#percentage-earned', root).value);
        const possible = Number($('#percentage-possible', root).value);
        if (!Number.isFinite(earned) || !Number.isFinite(possible) || earned < 0 || possible <= 0) {
          setModuleMessage(module, 'percentMessage', 'Enter earned points ≥ 0 and possible points greater than 0.', 'error');
          persist(); renderMission(); return;
        }
        const percentage = (earned / possible) * 100;
        module.percentDone = true;
        setModuleMessage(module, 'percentMessage', `${earned} ÷ ${possible} × 100 = ${percentage.toFixed(1)}%`, 'success');
        updateModule(id);
      });
      $('#generate-email', root).addEventListener('click', () => {
        const first = $('#email-first', root).value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
        const last = $('#email-last', root).value.trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
        if (!first || !last) {
          setModuleMessage(module, 'emailMessage', 'Enter both a first and last name.', 'error');
          persist(); renderMission(); return;
        }
        module.emailDone = true;
        setModuleMessage(module, 'emailMessage', `${first}.${last}@centennialknights.org`, 'success');
        updateModule(id);
      });
      $('#generate-id', root).addEventListener('click', () => {
        const first = $('#id-first', root).value.trim().replace(/[^a-z]/gi, '');
        const last = $('#id-last', root).value.trim().replace(/[^a-z]/gi, '');
        const year = $('#id-year', root).value.trim();
        if (!first || !last || !/^20\d{2}$/.test(year)) {
          setModuleMessage(module, 'idMessage', 'Enter first and last names and a four-digit year from 2000–2099.', 'error');
          persist(); renderMission(); return;
        }
        const initial = first[0].toLowerCase();
        const surname = last.slice(0, 3).toLowerCase();
        const yearSuffix = year.slice(-2);
        module.idDone = true;
        setModuleMessage(module, 'idMessage', `${initial} + ${surname} + ${yearSuffix} = ${initial}${surname}${yearSuffix}`, 'success');
        updateModule(id);
      });
    }
    if (id === 'strings') {
      $('#run-strings', root).addEventListener('click', () => {
        const value = $('#string-input', root).value;
        const start = Number($('#substring-start', root).value);
        const end = Number($('#substring-end', root).value);
        if (!value || !Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < start || end > value.length) {
          module.stringDone = false;
          module.stringOutput = 'Enter text and valid substring indexes (0 ≤ start ≤ end ≤ length).';
          module.stringMessageType = 'error';
          module.stringInput = value;
          persist(); renderMission(); return;
        }
        module.stringInput = value;
        module.stringDone = true;
        module.stringMessageType = 'success';
        module.stringOutput = `length(): ${value.length}\ncharAt(0): ${value.charAt(0)}\ntoUpperCase(): ${value.toUpperCase()}\nindexOf("a"): ${value.indexOf('a')}\nsubstring(${start}, ${end}): ${value.substring(start, end)}`;
        updateModule(id);
      });
      $('#repair-string', root).addEventListener('click', () => {
        module.stringRepairDone = $('#string-fix-answer', root).value === '8';
        setModuleMessage(module, 'stringRepairMessage', module.stringRepairDone
          ? 'Repaired: substring(4, 8) returns "Camp" without going past the String length.'
          : 'The String length is 8, so the exclusive end index cannot be 9.', module.stringRepairDone ? 'success' : 'error');
        updateModule(id);
      });
    }
    if (id === 'account') bindAccountSimulator(root);
  }

  function bindAccountSimulator(root) {
    const account = state.account;
    if (!account) {
      $('#create-account', root).addEventListener('click', () => {
        const name = $('#account-name', root).value.trim();
        const startingInput = $('#account-start', root).value.trim();
        const starting = Number(startingInput);
        if (!name || !startingInput || !Number.isFinite(starting) || starting < 0) {
          $('#account-result', root).textContent = 'Enter an account name and a starting balance of $0 or more.';
          $('#account-result', root).classList.add('error');
          return;
        }
        state.account = { name: name.slice(0, 50), balance: Math.round(starting * 100) / 100, history: [`Account created with ${money(starting)}.`], created: true };
        persist();
        renderMission();
        maybeCompleteMission('account');
        showToast('Account created. Now try a deposit or withdrawal.');
      });
      return;
    }
    $('#deposit-button', root).addEventListener('click', () => transact('deposit', root));
    $('#withdraw-button', root).addEventListener('click', () => transact('withdraw', root));
    $('#reset-account', root).addEventListener('click', () => {
      state.account = null;
      persist();
      renderMission();
      showToast('Account reset. The training challenge remains saved.');
    });
  }

  function transact(type, root) {
    const account = state.account;
    const amount = Number($('#transaction-amount', root).value);
    const output = $('#account-result', root);
    output.classList.remove('error', 'success');
    if (!Number.isFinite(amount) || amount <= 0) {
      output.textContent = 'Enter a transaction amount greater than $0.';
      output.classList.add('error');
      return;
    }
    if (type === 'withdraw' && amount > account.balance) {
      output.textContent = 'Withdrawal declined: the account does not have enough funds.';
      output.classList.add('error');
      return;
    }
    const rounded = Math.round(amount * 100) / 100;
    account.balance = Math.round((account.balance + (type === 'deposit' ? rounded : -rounded)) * 100) / 100;
    const entry = `${type === 'deposit' ? 'Deposited' : 'Withdrew'} ${money(rounded)} · balance ${money(account.balance)}.`;
    account.history.unshift(entry);
    account.history = account.history.slice(0, 50);
    persist();
    renderMission();
    showToast(entry);
  }

  function startAssessment(newRun) {
    if (newRun || !state.assessmentRun || !Array.isArray(state.assessmentRun.questions)) {
      state.assessmentRun = {
        questions: randomize(ASSESSMENT_BANK).slice(0, 25).map(question => {
          const answerPairs = randomize(question.choices.map((choice, index) => ({ choice, correct: index === question.answer })));
          return {
            id: question.id,
            topic: question.topic,
            prompt: question.prompt,
            choices: answerPairs.map(pair => pair.choice),
            answer: answerPairs.findIndex(pair => pair.correct),
            explanation: question.explanation
          };
        }),
        answers: {}
      };
      persist();
    }
    renderAssessment();
    openScreen('assessment-screen');
  }

  function renderAssessment() {
    const target = $('#assessment-content');
    const run = state.assessmentRun;
    if (!run || !Array.isArray(run.questions)) {
      target.innerHTML = '<div class="panel assessment-panel"><h1>Assessment unavailable</h1><p>Start a new assessment from the camp home screen.</p></div>';
      return;
    }
    const answers = run.answers || {};
    const answeredCount = Object.keys(answers).length;
    if (run.result) {
      target.innerHTML = renderAssessmentResult(run.result);
      $('#retake-assessment').addEventListener('click', () => startAssessment(true));
      return;
    }
    target.innerHTML = `<div class="panel assessment-panel">
      <div class="assessment-head"><div><p class="eyebrow">FINAL CHECKPOINT · RANDOMIZED QUESTION SET</p><h1>Survival Assessment</h1><p>Answer all 25 questions. Your progress is saved as you go.</p></div><div class="assessment-meter"><strong>${answeredCount}/25</strong>ANSWERED</div></div>
      <div class="assessment-progress"><span style="width:${(answeredCount / 25) * 100}%"></span></div>
      <div class="question-list">${run.questions.map((item, index) => renderAssessmentQuestion(item, index, answers[index])).join('')}</div>
      <div class="assessment-actions"><button type="button" class="button button-primary" id="finish-assessment" ${answeredCount < 25 ? 'disabled' : ''}>SUBMIT FINAL ASSESSMENT</button><span class="question-status">${answeredCount < 25 ? `Answer ${25 - answeredCount} more question${25 - answeredCount === 1 ? '' : 's'} to finish.` : 'All questions answered. Ready to submit.'}</span></div>
    </div>`;
    $$('.assessment-answer', target).forEach(button => {
      button.addEventListener('click', () => submitAssessmentAnswer(Number(button.dataset.questionIndex), Number(button.dataset.choiceIndex)));
    });
    $('#finish-assessment').addEventListener('click', finishAssessment);
  }

  function renderAssessmentQuestion(item, index, saved) {
    return `<article class="assessment-question"><p class="question-title"><span class="question-number">Q${String(index + 1).padStart(2, '0')} · ${escapeHTML(item.topic)}</span><br>${item.prompt}</p>
      <div class="choice-list">${item.choices.map((choice, choiceIndex) => `<button type="button" class="choice-button assessment-answer ${saved && saved.selected === choiceIndex ? 'selected' : ''}" data-question-index="${index}" data-choice-index="${choiceIndex}" ${saved ? 'disabled' : ''}><span class="choice-letter">${String.fromCharCode(65 + choiceIndex)}</span><span>${choice}</span></button>`).join('')}</div>
      ${saved ? `<p class="feedback ${saved.correct ? 'correct' : 'incorrect'}">${saved.correct ? '✓ Correct.' : 'Answer recorded.'} ${item.explanation}</p>` : ''}</article>`;
  }

  function submitAssessmentAnswer(questionIndex, choiceIndex) {
    const run = state.assessmentRun;
    if (!run || run.answers[questionIndex]) return;
    const item = run.questions[questionIndex];
    if (!item) return;
    const correct = choiceIndex === item.answer;
    run.answers[questionIndex] = { selected: choiceIndex, correct };
    const awardKey = item.id;
    if (correct && !state.assessmentQuestionXp.includes(awardKey)) {
      state.assessmentQuestionXp.push(awardKey);
      addXP(1, 'Assessment answer');
    }
    persist();
    renderAssessment();
  }

  function finishAssessment() {
    const run = state.assessmentRun;
    if (!run || Object.keys(run.answers).length !== run.questions.length) {
      showToast('Answer every assessment question before submitting.');
      return;
    }
    const correct = Object.values(run.answers).filter(answer => answer.correct).length;
    const percentage = Math.round((correct / run.questions.length) * 100);
    const rank = assessmentRank(percentage);
    run.result = { correct, incorrect: run.questions.length - correct, percentage, rank };
    state.assessmentScore = percentage;
    state.assessmentRank = rank;
    if (!state.assessmentBonusClaimed) {
      state.assessmentBonusClaimed = true;
      const bonus = Math.round(percentage / 2) + (percentage === 100 ? 50 : 0);
      if (bonus > 0) addXP(bonus, 'Assessment bonus');
    } else {
      persist();
    }
    checkChampionBadge();
    renderAssessment();
  }

  function assessmentRank(score) {
    if (score >= 90) return 'Java Master';
    if (score >= 80) return 'Java Ranger';
    if (score >= 70) return 'Operator';
    if (score >= 60) return 'Cadet';
    return 'Recruit';
  }

  function renderAssessmentResult(result) {
    return `<div class="panel assessment-panel"><div class="assessment-result"><p class="eyebrow">ASSESSMENT REPORT</p><h1>FIELD RESULTS</h1><div class="result-score">${result.percentage}%</div><div class="result-rank">${escapeHTML(result.rank)}</div><p>${result.percentage >= 90 ? 'Outstanding work, recruit. You are ready for the next challenge.' : result.percentage >= 70 ? 'Strong progress. Review the missed concepts and keep training.' : 'Every expert starts somewhere. Review the field manual and try again.'}</p>
      <div class="result-breakdown"><span class="result-chip">${result.correct} CORRECT</span><span class="result-chip">${result.incorrect} INCORRECT</span><span class="result-chip">25 QUESTIONS</span><span class="result-chip">XP RANK: ${escapeHTML(state.currentRank)}</span></div>
      <p class="small-note">Assessment score rank is based on your percentage. Your camp rank is based on XP.</p>
      <div class="assessment-actions"><button type="button" class="button button-primary" id="retake-assessment">RETAKE WITH NEW QUESTIONS</button><button type="button" class="button button-quiet" id="result-home">RETURN TO CAMP</button></div>
    </div></div>`;
  }

  function renderTeacherDashboard() {
    const completed = state.missionsCompleted.length;
    const progress = Math.round((completed / MISSIONS.length) * 100);
    const target = $('#teacher-content');
    target.innerHTML = `<section class="panel teacher-panel"><p class="eyebrow">LOCAL PROGRESS REPORT</p><h1>Teacher Dashboard</h1><p class="teacher-name">${escapeHTML(state.playerName || 'Student name not entered')}</p>
      <div class="teacher-grid">
        <div class="teacher-stat"><span>CURRENT XP</span><strong>${state.xp}</strong></div>
        <div class="teacher-stat"><span>CURRENT CAMP RANK</span><strong>${escapeHTML(state.currentRank)}</strong></div>
        <div class="teacher-stat"><span>MISSIONS COMPLETED</span><strong>${completed} / ${MISSIONS.length}</strong></div>
        <div class="teacher-stat"><span>ASSESSMENT SCORE</span><strong>${state.assessmentScore === null ? 'Not taken' : `${state.assessmentScore}%`}</strong></div>
        <div class="teacher-stat"><span>ASSESSMENT RANK</span><strong>${escapeHTML(state.assessmentRank || '—')}</strong></div>
        <div class="teacher-stat"><span>BADGES EARNED</span><strong>${state.badgesEarned.length} / ${BADGES.length}</strong></div>
      </div>
      <div class="teacher-progress"><div class="progress-meta"><span>MISSION PROGRESS</span><span>${progress}%</span></div><div class="progress-track" role="progressbar" aria-label="Mission progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><span style="width:${progress}%"></span></div></div>
      <div class="teacher-missions">${MISSIONS.map((mission, index) => `<div class="teacher-mission-row"><span>${String(index + 1).padStart(2, '0')} · ${escapeHTML(mission.title)}</span><strong>${state.missionsCompleted.includes(mission.id) ? 'COMPLETE' : 'IN PROGRESS'}</strong></div>`).join('')}</div>
      <div class="teacher-badges">${BADGES.filter(badge => state.badgesEarned.includes(badge.id)).map(badge => `<div class="badge"><span class="badge-icon">${badge.icon}</span><span class="badge-name">${escapeHTML(badge.name)}</span></div>`).join('') || '<p class="empty-note">No badges earned yet.</p>'}</div>
      <p class="callout">This dashboard reads the progress saved in this browser’s local storage. It does not send student data to a server or combine data across devices.</p>
      <div class="assessment-actions"><button type="button" class="button button-secondary" id="print-report">PRINT REPORT</button><a class="button button-quiet" href="U1bootcamp.html">RETURN TO CAMP</a></div>
    </section>`;
    $('#print-report').addEventListener('click', () => window.print());
  }

  function bindPageEvents() {
    $('#save-name').addEventListener('click', saveStudentName);
    $('#student-name').addEventListener('keydown', event => {
      if (event.key === 'Enter') saveStudentName();
    });
    $('#student-name').addEventListener('change', saveStudentName);
    $('#start-training').addEventListener('click', () => {
      $('#mission-map').scrollIntoView({ behavior: 'smooth', block: 'start' });
      const next = MISSIONS.find(mission => !state.missionsCompleted.includes(mission.id));
      if (next) openMission(next.id);
      else showToast('All missions cleared! Finish the final assessment or train again.');
    });
    $('#back-home').addEventListener('click', () => openScreen('home-screen'));
    $('#assessment-home').addEventListener('click', () => openScreen('home-screen'));
    $('#open-assessment').addEventListener('click', () => startAssessment(false));
    $('#level-up').addEventListener('click', event => {
      if (event.target.id === 'level-up' || event.target.id === 'close-level') $('#level-up').hidden = true;
    });
    $('#assessment-content').addEventListener('click', event => {
      if (event.target.id === 'result-home') openScreen('home-screen');
    });
  }

  function init() {
    bindPageEvents();
    refreshHome();
    if (new URLSearchParams(window.location.search).get('teacher') === '1') {
      renderTeacherDashboard();
      openScreen('teacher-screen');
    }
    if (storageLoadError) {
      $('#notice').hidden = false;
      $('#notice').textContent = 'Saved progress could not be read. A fresh training record is open; browser storage may be unavailable or corrupted.';
    } else if (!state.playerName && state.xp === 0 && state.missionsCompleted.length === 0) {
      $('#notice').hidden = false;
      $('#notice').textContent = 'Training progress is saved on this device only. Enter your name to start your dossier.';
    }
  }

  init();
})();
