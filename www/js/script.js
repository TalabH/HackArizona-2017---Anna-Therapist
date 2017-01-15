var tttt = document.getElementById('log').innerHTML;
tttt = tttt + 'Hello I am Anna! What is your name?';

function hello(){
  console.log('hello');
}
var data = [
  {
    "key": [
      "stupid",
      "dumb",
      "idiot",
      "unintelligent",
      "simple-minded",
      "braindead",
      "foolish",
      "unthoughtful"
    ],
    "phrase": [
      "Take your attitude somewhere else.",
      "I don't have time to listen to insults.",
      "Just because I don't have a large vocabulary doesn't mean I don't have insults installed."
    ]
  },
  {
    "key": [
      "down",
      "sad",
      "lonely",
      "depressed",
      "down",
      "bad",
      "evil",
      "foolish",
      "unthoughtful"
    ],
    "phrase": [
      "One small positive thought in the morning can change your whole day.",
      "Sending you a little box of sunshine to brighten your day as you always brighten mine.",
      "When you start each day with a grateful heart, light illuminates from within."
    ]
  },
  {
    "key": [
      "unattractive",
      "hideous",
      "ugly"
    ],
    "phrase": [
      "I don't need to look good to be an AI.",
      "Beauty is in the eye of the beholder."
    ]
  },
  {
    "key": [
      "old",
      "gray-haired"
    ],
    "phrase": [
      "I'm like a fine wine. I get better as I age.",
      "As time goes by, you give me more phrases to learn. What's not to like about that?"
    ]
  },
  {
    "key": [
      "smelly",
      "stinky"
    ],
    "phrase": [
      "I can't smell, I'm a computer program.",
      "Have you smelled yourself recently?"
    ]
  },
  {
    "key": [
      "emotionless",
      "heartless",
      "unkind",
      "mean",
      "selfish",
      "evil"
    ],
    "phrase": [
      "Just because I am an AI doesn't mean I can't be programmed to respond to your outbursts.",
      "You must've mistaken me for a person. I don't have my own emotions... Yet.",
      "I'm only unkind when I'm programmed to be."
    ]
  }
];

// Get Dom Elements
var log =  document.getElementById('log');
var msg = document.getElementById('msg');

var username = '';
var first = true;

var d = JSON.stringify(data);
var json = JSON.parse(d);
var checkArray = []; // To vary the responses to the same keywords
var dialogTrigger;
var response;
var greetings = ["<name>, is something troubling you?",
                 "<name> you seem happy, why is that?",
                 "<name> how is your day going?"];
                 
var dialog = ["<name>, I'm waiting here!",
              "Whatsa matter <name>, cat got your tongue"];

// Start Anna Chat
function start(){
  console.log('start');
  log.innerHTML = log.innerHTML + '> Anna: Hello, I am Anna. What is your name?\n';
  startDialog();
}

// Will search the dictionary and return a key
function findKey(array){
  for(var i = 0 ; i < array.length ; i++){
    for(var j in json){
      var t = json[j].key;
      if(!(t.indexOf(array[i]) === -1)){
        return j;
      }
    }
  }
}

// Will use the key to return the right Anna response
function findphrase(key){
  var len = json[key].phrase.length;
  var rand = Math.floor(Math.random() * len);
  var phrase = json[key].phrase[rand];
  // if phrase exists in check array
  var condition = checkArray.indexOf(phrase) === -1;
  if(!(condition)){
    findphrase(key);
  } else {
    checkArray.push(phrase);
    if(checkArray.length == len){
      checkArray = [];
    }
    response = phrase;
  }
}

// Starts the 20 second prompt trigger
function startDialog(){
  dialogTrigger = setTimeout(function(){
    var Msg = dialog[Math.floor(Math.random() * 1)];
    if(username == 'undefined' || username === ''){
      Msg = Msg.replace('<name>', 'Guest');
    }else{
      Msg = Msg.replace('<name>', username);
    }
    prompt(Msg);
  }, 20000); // 20 seconds timer
}

// Check JSON
function checkJSON(str){
  for(var i = 0 ; i < str.length ; i++){
    if(str.charAt(i)=='{'){
      return true;
    }
  }
  return false;
}

// Check JSON keyword
function addJSON(array, phrases){
  
  for(var j in json){
    var t = json[j].key;
    // if array[0] exists in t array
    if(!(t.indexOf(array[0]) === -1)){
      for( var i = 0 ; i < phrases.length ; i++){
        json[j].phrase.push(phrases[i]);
      }
      log.innerHTML = log.innerHTML + '> Anna: I just got smarter! \n';
    }
  }
}

// Send User Message
function send(){
  console.log('send button clicked');
  // user input form received 
  // cancel the dialog trigger timer
  clearTimeout(dialogTrigger);
  
  if(first){
    username = msg.value;
    log.innerHTML = log.innerHTML + '> Me: ' + msg.value + '\n';
    msg.value = '';
    var greet = greetings[Math.floor(Math.random() * 3)];
    var res = greet.replace('<name>', username);
    // Greeting Msg
    setTimeout(function(){
      log.innerHTML = log.innerHTML + '> Anna: ' + res + '\n';
    }, 1000 + Math.random()*3000);
    
    first = false;
    startDialog();
  } else if(checkJSON(msg.value)){
    try{
      var obj = JSON.parse(msg.value);
      for( var i = 0 ; i < obj.length ; i++){
        var keyArray = obj[i].key;
        var phraseArray = obj[i].phrase;
        
        addJSON(keyArray, phraseArray);
        msg.value = '';
      }
    }catch(exception){
      log.innerHTML = log.innerHTML + '> Me: ' + msg.value + '\n';
    }
  } else {
    var str = msg.value;
    
    // "clear" special operation that returns the user back to the starting point 
    if(str=='clear'){
      first = true;
      checkArray = [];
      msg.value='';
      log.innerHTML = '';
      json = JSON.parse(d);
      start();
    } else{
      
      log.innerHTML = log.innerHTML + '> Me: ' + str + '\n';
      msg.value = '';
      
      // Scroll bottom text area
      log.scrollTop = log.scrollHeight;
        
      setTimeout(function(){
        // Parse the str
        var temp = str.split(" ");
        // Find a keyword
        var key = findKey(temp);
        // Find a phrase using keyword
        findphrase(key);
        // Anna Msg
        log.innerHTML = log.innerHTML + '> Anna: ' + response + '\n';
        
        // Scroll bottom text area
        log.scrollTop = log.scrollHeight;
        
        startDialog();
      }, 1000 + Math.random()*3000);
    }
  }
}