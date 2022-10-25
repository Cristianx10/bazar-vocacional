import { createLevel } from "./level";

interface ILevel {
  variables: {
    passed: boolean;
    pattern: any;
    colors: any;
    size: any;
    usedTime: number;
    error: number;
    repetition: number;
    outOfTime: boolean;
    wasStarted: boolean;
    gameResetTimes: number;
    verifyIndex: number;
  };
  setPassed: (value: boolean) => void;
  resetMatrix: () => void;
  simonSays: (freezeClick: boolean, noteTime: number) => void;
  startLevel: (pressStartMsg: HTMLElement, freezeClick: boolean) => void;
  startTimer: () => void;
}

const onPreloadMain = () => {

  //Screen stuff variables
  //Screen stuff variables
  const firstScreenBtn = document.querySelector('.screen__btn') as HTMLElement;
  const firstScreen = document.querySelector('.screen') as HTMLElement;
  const mainScreen = document.querySelector('.game') as HTMLElement;
  const winScreen = document.querySelector('.win') as HTMLElement;
  const restartPattern = document.querySelector('.restart-btn') as HTMLElement;
  const looseScreen = document.querySelector('.loose') as HTMLElement;
  const levelMsgs = document.querySelector('.level-msgs') as HTMLElement;
  const instructionsScreen = document.querySelector('.instructions') as HTMLElement;
  const vidInstructions = document.querySelector('.instructions__vid') as HTMLElement;
  const instructionsBtn = document.querySelector('.instructions__btn') as HTMLElement;
  const pressStartMsg = document.querySelector('.innit-message-start') as HTMLElement;
  const restartLevel = document.querySelector('.loose__restart') as HTMLElement;


  levelMsgs.innerText = 'level 1';
  //main variables
  const matrix = document.querySelector('.matrix') as HTMLElement;
  const cells = matrix.querySelectorAll('.cell') as NodeListOf<HTMLElement>;
  const button = document.querySelector('.game__start-btn') as HTMLElement;
  const noteTime = 2000 / 2.5;
  const timerText = document.querySelector('.time') as HTMLParagraphElement;
  let freezeClick = false;
  restartPattern.classList.add('hidden');
  let currentLevel = undefined as ILevel | undefined; //represents the game current displayed
  let levelTime = {
    value: 0
  }
  const result = {
    error: 0,
    repetition: 0,
    passed: [] as boolean[],
    usedTime: [] as string[],
    gameResetTimes: 0,
  };
  const settingCurrentLevel = (level: ILevel) => {
    currentLevel = level;
    currentLevel.startLevel(pressStartMsg, freezeClick);
  }
  //win and loose general functions
  const handleLoose = () => {
    if (currentLevel) {
      currentLevel.resetMatrix();
    }
    restartPattern.classList.add('hidden');
    mainScreen.classList.add('hidden');
    looseScreen.classList.remove('hidden');
    button.classList.remove('hidden');
  }
  const total = () => {
    const finalTotal = 200 - result.error - (result.repetition * 5) - (result.gameResetTimes * 10);
    return finalTotal >= 0 ? finalTotal : 0;
  }
  const handleWin = () => {

    console.log(total(), 'total>>>>>>');
    mainScreen.classList.add('hidden');
    winScreen.classList.remove('hidden');
  }
  //creating the levels
  //level 1 ---------------------------------------------------------
  const level1 = createLevel({
    matrix,
    pattern: [5, 2, 8, 3, 1], //5 / 4 
    colors: {
      first: [153, 179, 250],
      second: [11, 34, 98]
    },
    size: 3,
    time: 20,
    timerDisplay: timerText,
    finishLevelFunc: () => {
      button.classList.remove('hidden');
      //@ts-ignore
      result.usedTime.push(timerText.innerText);
      result.passed.push(true);
      //setting current level
      settingCurrentLevel(level2);
      levelMsgs.innerText = 'level 2';
      restartPattern.classList.add('hidden');
    },
    lostFunc: handleLoose
    ,
    levelTime,
    allowedErrors: 5,
  });
  // level 2 ---------------------------------------------------------
  const level2 = createLevel({
    matrix,
    pattern: [14, 8, 5, 10, 12, 2],
    colors: {
      first: [153, 179, 250],
      second: [11, 34, 98]
    },
    size: 4,
    time: 45,
    timerDisplay: timerText,
    finishLevelFunc: () => {
      button.classList.remove('hidden');
      restartPattern.classList.add('hidden');
      result.usedTime.push(timerText.innerText);
      result.passed.push(true);
      settingCurrentLevel(level3);
      levelMsgs.innerText = 'level 3';

    },
    lostFunc: handleLoose,
    levelTime,
    allowedErrors: 5,
  });
  //level 3 ---------------------------------------------------------
  const level3 = createLevel({
    matrix,
    pattern: [20, 10, 1, 12, 5, 22, 14, 18], // 8 / 9 / 10
    colors: {
      first: [153, 179, 250],
      second: [11, 34, 98]
    },
    size: 5,
    time: 50,
    timerDisplay: timerText,
    finishLevelFunc: () => {
      result.usedTime.push(timerText.innerText);
      result.error = level1.variables.error + level2.variables.error + level3.variables.error;
      result.repetition = level1.variables.repetition + level2.variables.repetition + level3.variables.repetition - 3;
      result.gameResetTimes = level1.variables.gameResetTimes + level2.variables.gameResetTimes + level3.variables.gameResetTimes;
      result.passed.push(true);
      handleWin();
    },
    lostFunc: handleLoose,
    levelTime,
    allowedErrors: 5,
  });
  //init level >>>>>>>>>>>>>>>>>>>>>>>>>>>>
  currentLevel = level1;
  //Event listeners >>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //document click behaviour
  document.addEventListener("click", e => {
    if (freezeClick) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);
  //start simon pattern performance 
  const deployPattern = () => {
    freezeClick = true;
    if (currentLevel) {
      currentLevel.simonSays(freezeClick, noteTime);
      currentLevel.variables.repetition++;
    }
    pressStartMsg.classList.add('hidden');
  };

  button.addEventListener('click', () => {
    restartPattern.classList.remove('hidden');
    deployPattern();
    button.classList.add('hidden');
  });

  restartPattern.addEventListener('click', () => { deployPattern() });

  firstScreenBtn.addEventListener('click', () => {
    firstScreen.classList.add('hidden');
    instructionsScreen.classList.remove('hidden');
    //@ts-ignore
    vidInstructions.play();
  });
  
  instructionsBtn.addEventListener('click', () => {
    instructionsScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    if (currentLevel) {
      currentLevel.startLevel(pressStartMsg, freezeClick);
    }
  });

  restartLevel.addEventListener('click', () => {

    console.log("REINICIANDO")
    mainScreen.classList.remove('hidden');
    looseScreen.classList.add('hidden');
    if (currentLevel) {
      currentLevel.startTimer();
      currentLevel.variables.pattern.forEach((sound: any, i: any) => {
        if (currentLevel) {
          currentLevel.variables.pattern[i] = parseInt((Math.random() * Math.pow(currentLevel.variables.size, 2)) + "");
        }
      });
      pressStartMsg.classList.remove('hidden');
      currentLevel.variables.wasStarted = false
    }
  });


}

export default onPreloadMain;
