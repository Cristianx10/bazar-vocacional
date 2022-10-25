import { RPath } from "..";

import ActividadTSLite from '../../../../components/Actividad/config/ActividadTSLite';
import CARRERAS from '../../../../constants/observer';


const onLoadMain = (actividad: ActividadTSLite) => {
    //Screen stuff variables
    const firstScreenBtn = document.querySelector('.screen__btn') as HTMLElement;
    const firstScreen = document.querySelector('.screen') as HTMLElement;
    const mainScreen = document.querySelector('.game') as HTMLElement;
    const winScreen = document.querySelector('.win') as HTMLElement;
    const restartPattern = document.querySelector('.restart-btn') as HTMLElement;
    const looseScreen = document.querySelector('.loose') as HTMLElement;
    const levelMsgs = document.querySelector('.level-msgs') as HTMLDivElement;
    const instructionsScreen = document.querySelector('.instructions') as HTMLElement;
    const vidInstructions = document.querySelector('.instructions__vid') as HTMLVideoElement;
    const instructionsBtn = document.querySelector('.instructions__btn') as HTMLElement;
    const pressStartMsg = document.querySelector('.innit-message-start') as HTMLElement;
    const restartLevel = document.querySelector('.loose__restart') as HTMLElement;
    levelMsgs.innerText = 'level 1';
    //main variables
    const matrix = document.querySelector('.matrix') as HTMLParagraphElement;
    const cells = matrix.querySelectorAll('.cell');
    const button = document.querySelector('.game__start-btn') as HTMLElement;
    const noteTime = 2000 / 2.5;
    const timerText = document.querySelector('.time') as HTMLElement;
    let freezeClick = false;
    restartPattern.classList.add('hidden');
    let currentLevel: any = undefined; //represents the game current displayed
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


    const createLevel = ({
        pattern,
        colors,
        size,
        matrix,
        time,
        timerDisplay,
        finishLevelFunc,
        lostFunc,
        levelTime,
        allowedErrors
    }: any) => {
        const variables = {
            passed: false,
            pattern,
            colors,
            size,
            usedTime: 0,
            error: 0,
            repetition: 0,
            outOfTime: false,
            wasStarted: false,
            gameResetTimes: 0,
            verifyIndex: 0
        }
        let alreadyLoose = false;
        const cells = matrix.querySelectorAll('.cell') as NodeListOf<HTMLDivElement>;
        //init size of the cells based on the size given
        const initCellsSize = () => {
            cells.forEach(cell => {
                cell.style.height = `${50 / size}vmin`;
                cell.style.width = `${50 / size}vmin`;
            });
        }
        const setPassed = (value: boolean) => {
            variables.passed = value;
        }
        //cells color based on given init colors -> transition method
        const gradientTransition = (r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, steps: number) => {
            const colors = [];
            for (let index = 1; index < steps + 1; index++) {
                const rm = (r2 - r1) / (steps - 1);
                const gm = (g2 - g1) / (steps - 1);
                const bm = (b2 - b1) / (steps - 1);
                colors.push({
                    R: parseInt(((rm * index) + rm + r1) + ""),
                    G: parseInt(((gm * index) + gm + g1) + ""),
                    B: parseInt(((bm * index) + bm + b1) + ""),
                });
            };
            return colors;
        };
        // note sound based on a given cell position 
        const beep = (index: number) => {
            var snd = new Audio(
                `${RPath}/notes/sound${index}.mp3`
            );
            snd.volume = 1;
            snd.play();
        };
        //reset matrix appearance 
        const resetMatrix = () => {
            variables.verifyIndex = 0;
            cells.forEach((obj, index) => {
                //@ts-ignore
                const cellsColor = gradientTransition(...variables.colors.first, ...variables.colors.second, cells.length);
                obj.style.backgroundColor = `rgb(
            ${cellsColor[index].R},${cellsColor[index].G},${cellsColor[index].B})`;
            });
        }
        //pattern performance 
        const simonSays = () => {
            variables.wasStarted = true;
            if (variables.passed) return
            let index = 0;
            let interval = setInterval(() => {
                resetMatrix();
                setTimeout(() => {
                    beep(variables.pattern[index]);
                    cells[variables.pattern[index]].style.backgroundColor = '#00FFFF';
                    index++;
                    //stop interval
                    if (index >= variables.pattern.length) {
                        clearInterval(interval);
                        setTimeout(() => {
                            //finish pattern
                            freezeClick = false;
                            resetMatrix();
                        }, noteTime);
                    };
                }, 500);
            }, noteTime);
        };
        //check if the current selected cell match pattern current position
        const verify = () => {
            const cellsObj = matrix.querySelectorAll('.cell');
            // let verifyIndex = 0;
            cellsObj.forEach((obj: any, i: number) => {
                obj.addEventListener('click', () => {
                    if (!variables.wasStarted) return;
                    if (variables.passed) return
                    beep(i); //note sounds
                    if (obj === cellsObj[variables.pattern[variables.verifyIndex]]) {
                        //well done
                        obj.style.backgroundColor = '#00FFFF';
                        if (variables.verifyIndex >= variables.pattern.length - 1) {
                            //level passed 
                            variables.passed = true;
                            finishLevelFunc();
                            variables.verifyIndex = 0;
                        } else {
                            variables.verifyIndex++;
                        }
                    } else {
                        //error
                        obj.style.backgroundColor = '#DF6A1E';
                        variables.error += 10;
                        if (variables.error >= allowedErrors * 10) {
                            variables.error = 0;
                            variables.gameResetTimes++;
                            alreadyLoose = true;
                            lostFunc();
                            console.log(variables);
                        }
                        freezeClick = true;
                        setTimeout(() => {
                            resetMatrix();
                            freezeClick = false;
                        }, 1500);
                        variables.verifyIndex = 0;
                    }
                });
            })
        }
        //set timer
        //timer 
        const startTimer = () => {
            let timer = time;
            let minutes;
            let seconds;
            let timerInterval = setInterval(() => {
                minutes = parseInt((timer / 60) + "");
                seconds = parseInt((timer % 60) + "");
                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                timerDisplay.innerText = minutes + ":" + seconds;
                levelTime.value = seconds;
                if (--timer < 0 || alreadyLoose) {
                    alreadyLoose = false;
                    //lost by time
                    timer = 0;
                    variables.outOfTime = true;
                    lostFunc();
                    clearInterval(timerInterval);
                }
                if (variables.passed) {
                    variables.usedTime = seconds as number;
                    console.log(variables.usedTime + 'suuuuuu');
                    clearInterval(timerInterval);
                }
            }, 1000);
        }
        //init state
        const startLevel = () => {
            pressStartMsg.classList.remove('hidden');
            initCellsSize();
            resetMatrix();
            verify();
            startTimer();
        };
        return {
            variables,
            setPassed,
            resetMatrix,
            simonSays,
            startLevel,
            startTimer,
        }
    }


    const settingCurrentLevel = (level: any) => {
        currentLevel = level;
        currentLevel.startLevel();
    }
    //win and loose general functions
    const handleLoose = () => {
        currentLevel.resetMatrix();
        restartPattern.classList.add('hidden');
        mainScreen.classList.add('hidden');
        looseScreen.classList.remove('hidden');
        button.classList.remove('hidden');



        const totalVar = total()
        actividad.addState("puntaje", totalVar);

    }
    const total = () => {
        const finalTotal = 200 - result.error - (result.repetition * 5) - (result.gameResetTimes * 10);
        return finalTotal >= 0 ? finalTotal : 0;
    }
    const handleWin = () => {

        const totalVar = total()
        actividad.addState("puntaje", totalVar);
        console.log(totalVar, 'total>>>>>>');
        mainScreen.classList.add('hidden');
        winScreen.classList.remove('hidden');

        actividad.addResult([
            {
                id: CARRERAS.MUSICA,
                value: totalVar
            }
        ])
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
        currentLevel.simonSays();
        currentLevel.variables.repetition++;
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
        vidInstructions.play();
    });
    instructionsBtn.addEventListener('click', () => {
        instructionsScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        currentLevel.startLevel();
    });
    restartLevel.addEventListener('click', () => {
        mainScreen.classList.remove('hidden');
        looseScreen.classList.add('hidden');
        currentLevel.startTimer();
        currentLevel.variables.pattern.forEach((sound: any, i: number) => {
            currentLevel.variables.pattern[i] = parseInt((Math.random() * Math.pow(currentLevel.variables.size, 2)) + "");
        });
        pressStartMsg.classList.remove('hidden');
        currentLevel.variables.wasStarted = false
    });

    var btnFinalizarS = document.querySelectorAll(".btnTerminar") as NodeListOf<HTMLElement>;
    btnFinalizarS.forEach(btnFinalizar => {
        btnFinalizar.addEventListener("click", () => {
            actividad.finish();
        })
    })

}

export default onLoadMain;