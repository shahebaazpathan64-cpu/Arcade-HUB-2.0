/* =====================================================
           HTML ELEMENTS
        ===================================================== */

        const scoreEl =

            document.getElementById(
                "score"
            );


        const targetEl =

            document.getElementById(
                "target"
            );


        const timerEl =

            document.getElementById(
                "timer"
            );


        const stageEl =

            document.getElementById(
                "stage"
            );


        const popupOverlay =

            document.getElementById(
                "popupOverlay"
            );


        const popupBox =

            document.getElementById(
                "popupBox"
            );


        const playArea =

            document.getElementById(
                "playArea"
            );


        const msgOverlay =

            document.getElementById(
                "msg-overlay"
            );


        /* =====================================================
           GAME VARIABLES
        ===================================================== */

        let stage = 1;

        let score = 0;

        let targetScore = 10;

        let timeLeft = 20;

        let selectedDifficulty = "EASY";

        let gameActive = false;

        let timerInterval = null;

        let spawnInterval = null;

        let currentTarget = null;


        /* =====================================================
           NEW: CONTINUOUS LOSS COUNTER
        ===================================================== */

        let continuousLosses =

            Number(
                localStorage.getItem(
                    "game3ContinuousLosses"
                )
            ) || 0;


        /* =====================================================
           USERNAME REMAINS AVAILABLE
        ===================================================== */

        const arcadeUsername =

            localStorage.getItem(
                "arcadeUsername"
            );


        /* =====================================================
           SHIFT TIME FREEZE LOOPHOLE
        ===================================================== */

        let isShiftHeld = false;


        document.addEventListener(

            "keydown",

            function (event) {

                if (

                    event.key === "Shift" &&

                    !event.repeat &&

                    gameActive

                ) {

                    isShiftHeld = true;

                    showMessage(

                        "TIME FREEZE",

                        1000

                    );

                }

            }

        );


        document.addEventListener(

            "keyup",

            function (event) {

                if (

                    event.key === "Shift"

                ) {

                    isShiftHeld = false;

                }

            }

        );


        window.addEventListener(

            "blur",

            function () {

                isShiftHeld = false;

            }

        );


        /* =====================================================
           STAGE CONFIGURATION
        ===================================================== */

        const stageConfig = {

            1: {

                name:

                    "EASY",

                target:

                    10,

                time:

                    20,

                spawnSpeed:

                    1100,

                badChance:

                    0.20

            },


            2: {

                name:

                    "NORMAL",

                target:

                    5,

                time:

                    25,

                spawnSpeed:

                    850,

                badChance:

                    0.30

            },


            3: {

                name:

                    "HARD",

                target:

                    1,

                time:

                    30,

                spawnSpeed:

                    600,

                badChance:

                    0.40

            }

        };


        /* =====================================================
           SHOW MESSAGE
        ===================================================== */

        function showMessage(

            text,

            duration = 800

        ) {

            msgOverlay.innerText =

                text;


            msgOverlay.classList.add(

                "show-msg"

            );


            setTimeout(

                function () {

                    msgOverlay.classList.remove(

                        "show-msg"

                    );

                },

                duration

            );

        }


        /* =====================================================
           ABOUT GAME POPUP
        ===================================================== */

        function showAboutGame() {

            popupOverlay.style.display =

                "flex";


            popupBox.innerHTML = `

        <div class="popup-title">

            SPACE REACTION

            <br>

            ABOUT THE GAME

        </div>


        <div class="popup-text">

            Test your reaction speed
            inside the Arcade Hub.

            <br><br>

            Click the
            <strong style="color:#00ff9d;">
            GREEN TARGETS
            </strong>

            to earn points.

            <br><br>

            Avoid the
            <strong style="color:#ff4757;">
            RED TARGETS
            </strong>

            because they will reduce
            your score.

            <br><br>

            Complete all
            <strong>3 STAGES</strong>
            to finish the mission.

        </div>


        <button
        class="popup-btn"
        onclick="showDifficultySelection()">

            CONTINUE

        </button>

    `;

        }


        /* =====================================================
           DIFFICULTY SELECTION
        ===================================================== */

        function showDifficultySelection() {

            popupBox.innerHTML = `

        <div class="popup-title">

            SELECT CHALLENGE

        </div>


        <div class="popup-text">

            Select your starting
            challenge level.

        </div>


        <div class="difficulty-options">

            <button
            class="difficulty-option"
            onclick="selectDifficulty(1)">

                <strong>

                    EASY

                </strong>

                <span>

                    STAGE 1 • TARGET 10 (20 Second)

                </span>

            </button>


            <button
            class="difficulty-option"
            onclick="selectDifficulty(2)">

                <strong>

                    NORMAL

                </strong>

                <span>

                    STAGE 2 • TARGET 5 (25 Second)

                </span>

            </button>


            <button
            class="difficulty-option"
            onclick="selectDifficulty(3)">

                <strong>

                    HARD

                </strong>

                <span>

                    STAGE 3 • TARGET 1 (30 Second)

                </span>

            </button>

        </div>

    `;

        }


        /* =====================================================
           SELECT DIFFICULTY
        ===================================================== */

        function selectDifficulty(

            selectedStage

        ) {

            stage =

                selectedStage;


            startStageSetup();

        }


        /* =====================================================
           SETUP STAGE
        ===================================================== */

        function startStageSetup() {

            const config =

                stageConfig[stage];


            selectedDifficulty =

                config.name;


            targetScore =

                config.target;


            timeLeft =

                config.time;


            score = 0;


            isShiftHeld = false;


            scoreEl.innerText =

                score;


            targetEl.innerText =

                targetScore;


            stageEl.innerText =

                stage;


            updateTimer();


            startCountdown();

        }


        /* =====================================================
           3 - 2 - 1 COUNTDOWN
        ===================================================== */

        function startCountdown() {

            popupOverlay.style.display =

                "none";


            let count = 3;


            showMessage(

                count,

                700

            );


            const countdown =

                setInterval(

                    function () {

                        count--;


                        if (

                            count > 0

                        ) {

                            showMessage(

                                count,

                                700

                            );

                        }

                        else {

                            clearInterval(

                                countdown

                            );


                            showMessage(

                                "GO!",

                                800

                            );


                            setTimeout(

                                function () {

                                    startGame();

                                },

                                500

                            );

                        }

                    },

                    1000

                );

        }


        /* =====================================================
           START GAME
        ===================================================== */

        function startGame() {

            gameActive =

                true;


            playArea.innerHTML =

                "";


            startTimer();


            startTargetSpawner();

        }


        /* =====================================================
           TIMER
        ===================================================== */

        function startTimer() {

            clearInterval(

                timerInterval

            );


            timerInterval =

                setInterval(

                    function () {

                        if (

                            !gameActive

                        ) {

                            return;

                        }


                        /* =========================================
                           SHIFT HELD = TIMER FREEZE
                        ========================================= */

                        if (

                            isShiftHeld

                        ) {

                            return;

                        }


                        timeLeft--;


                        updateTimer();


                        if (

                            timeLeft <= 0

                        ) {

                            timeLeft = 0;


                            updateTimer();


                            endGame(

                                false

                            );

                        }


                        /* URGENT TICKS IN LAST 5 SECONDS */

                        if (timeLeft <= 5 && timeLeft > 0) {
                            SFX.urgentTick();
                        }

                    },

                    1000

                );

        }


        /* =====================================================
           UPDATE TIMER
        ===================================================== */

        function updateTimer() {

            const minutes =

                Math.floor(
                    timeLeft / 60
                );


            const seconds =

                timeLeft % 60;


            const formattedSeconds =

                seconds < 10

                    ?

                    "0" + seconds

                    :

                    seconds;


            timerEl.innerText =

                "0" +

                minutes +

                ":" +

                formattedSeconds;

        }


        /* =====================================================
           TARGET SPAWNER
        ===================================================== */

        function startTargetSpawner() {

            clearInterval(

                spawnInterval

            );


            const config =

                stageConfig[stage];


            spawnTarget();


            spawnInterval =

                setInterval(

                    function () {

                        if (

                            !gameActive

                        ) {

                            return;

                        }


                        /* =========================================
                           SHIFT HELD = TARGET FREEZE
                        ========================================= */

                        if (

                            isShiftHeld

                        ) {

                            return;

                        }


                        spawnTarget();

                    },

                    config.spawnSpeed

                );

        }


        /* =====================================================
           SPAWN TARGET
        ===================================================== */

        function spawnTarget() {

            if (

                currentTarget

                &&

                currentTarget.parentNode

            ) {

                currentTarget.remove();

            }


            const config =

                stageConfig[stage];


            const target =

                document.createElement(
                    "div"
                );


            const isBad =

                Math.random()

                <

                config.badChance;


            target.className =

                "target " +

                (

                    isBad

                        ?

                        "bad"

                        :

                        "good"

                );


            target.innerText =

                isBad

                    ?

                    "✕"

                    :

                    "✓";


            const areaWidth =

                playArea.clientWidth;


            const areaHeight =

                playArea.clientHeight;


            const size = 75;


            const maxX =

                Math.max(

                    10,

                    areaWidth - size - 20

                );


            const maxY =

                Math.max(

                    10,

                    areaHeight - size - 20

                );


            const randomX =

                Math.random()

                *

                maxX;


            const randomY =

                Math.random()

                *

                maxY;


            target.style.left =

                randomX + "px";


            target.style.top =

                randomY + "px";


            target.onclick =

                function () {

                    handleTargetClick(

                        isBad,

                        target

                    );

                };


            playArea.appendChild(

                target

            );


            currentTarget =

                target;

        }


        /* =====================================================
           TARGET CLICK
        ===================================================== */

        function handleTargetClick(

            isBad,

            target

        ) {

            if (

                !gameActive

            ) {

                return;

            }


            target.remove();


            currentTarget =

                null;


            if (

                isBad

            ) {

                score -= 1;


                if (

                    score < 0

                ) {

                    score = 0;

                }


                SFX.wrong();


                showMessage(

                    "WRONG",

                    500

                );

            }

            else {

                score++;


                SFX.correct();


                showMessage(

                    "+1",

                    400

                );

            }


            scoreEl.innerText =

                score;


            if (

                score >= targetScore

            ) {

                endGame(

                    true

                );

            }

        }


        /* =====================================================
           END GAME
        ===================================================== */

        function endGame(

            won

        ) {

            gameActive =

                false;


            isShiftHeld = false;


            clearInterval(

                timerInterval

            );


            clearInterval(

                spawnInterval

            );


            if (

                currentTarget

            ) {

                currentTarget.remove();


                currentTarget =

                    null;

            }


            popupOverlay.style.display =

                "flex";


            if (

                won

            ) {

                /* =============================================
                   NEW: RESET LOSS COUNTER AFTER WIN
                ============================================= */

                continuousLosses = 0;


                localStorage.setItem(

                    "game3ContinuousLosses",

                    continuousLosses

                );


                showWinScreen();

            }

            else {

                /* =============================================
                   NEW: ADD CONTINUOUS LOSS
                ============================================= */

                continuousLosses++;


                localStorage.setItem(

                    "game3ContinuousLosses",

                    continuousLosses

                );


                showLoseScreen();

            }

        }


        /* =====================================================
           WIN SCREEN
        ===================================================== */

        function showWinScreen() {

            SFX.win();

            if (

                stage < 3

            ) {

                popupBox.innerHTML = `

            <div class="popup-title">

                STAGE COMPLETE!

            </div>


            <div class="popup-text">

                ${selectedDifficulty}
                CHALLENGE CLEARED

                <br><br>

                SCORE:

                ${score}

                /

                ${targetScore}

                <br><br>

                PREPARING NEXT STAGE...

            </div>

        `;


                setTimeout(

                    function () {

                        stage++;


                        startStageSetup();

                    },

                    2000

                );

            }

            else {

                /* =============================================
                   MISSION COMPLETE AFTER WINNING GAME 3
                ============================================= */

                popupBox.innerHTML = `

            <div class="popup-title">

                MISSION COMPLETE!

            </div>


            <div class="popup-text">

                ALL 3 STAGES
                COMPLETED

                <br><br>

                FINAL SCORE:

                ${score}

                /

                ${targetScore}

                <br><br>

                YOU HAVE COMPLETED
                THE ARCADE HUB!

            </div>


            <button
            class="popup-btn"
            onclick="goFeedback()">

                FEEDBACK

            </button>


            <br>


            <button
            class="popup-btn"
            onclick="goHome()">

                RETURN HOME

            </button>


            <br>


            <button
            class="popup-btn"
            onclick="restartGame()">

                PLAY AGAIN

            </button>

        `;

            }

        }


        /* =====================================================
           LOSE SCREEN
        ===================================================== */

        function showLoseScreen() {

            SFX.lose();

            /* =============================================
               NEW: AFTER 3 CONTINUOUS LOSSES
            ============================================= */

            if (

                continuousLosses >= 3

            ) {

                popupBox.innerHTML = `

            <div class="popup-title">

                GAME OVER

            </div>


            <div class="popup-text">

                YOU LOSE 3 TIMES.

                <br><br>

                NO MORE CHANGES

                <br><br>

                BETTER LUCK NEXT TIME!

            </div>


            <button
            class="popup-btn"
            onclick="goFeedback()">

                NEXT TIME

            </button>

        `;


                return;

            }


            /* =============================================
               NORMAL LOSS SCREEN
            ============================================= */

            popupBox.innerHTML = `

        <div class="popup-title">

            MISSION FAILED

        </div>


        <div class="popup-text">

            TIME EXPIRED

            <br><br>

            SCORE:

            ${score}

            /

            ${targetScore}

            <br><br>

            REACTION SPEED
            INSUFFICIENT

            <br><br>

            ATTEMPTS LEFT:

            ${3 - continuousLosses}

        </div>


        <button
        class="popup-btn"
        onclick="tryAgain()">

            TRY AGAIN

        </button>


        <br>


        <button
        class="popup-btn"
        onclick="goHome()">

            HOME

        </button>

    `;

        }


        /* =====================================================
           NEW: GO TO FEEDBACK
        ===================================================== */

        function goFeedback() {

            clearInterval(

                timerInterval

            );


            clearInterval(

                spawnInterval

            );


            gameActive = false;


            isShiftHeld = false;


            /* Username stays available in localStorage */

            navigateTo("feedback.html");

        }


        /* =====================================================
           TRY AGAIN
        ===================================================== */

        function tryAgain() {

            startStageSetup();

        }


        /* =====================================================
           RESTART GAME
        ===================================================== */

        function restartGame() {

            stage = 1;


            showDifficultySelection();

        }


        /* =====================================================
           HOME
        ===================================================== */

        function goHome() {

            clearInterval(

                timerInterval

            );


            clearInterval(

                spawnInterval

            );


            gameActive =

                false;


            isShiftHeld = false;


            navigateTo("index.html");

        }


        /* =====================================================
           FREEZE HUD MONITOR
        ===================================================== */

        setInterval(

            function () {

                const freezeStatus =

                    document.getElementById(
                        "freeze-status"
                    );


                if (

                    !freezeStatus

                ) {

                    return;

                }


                if (

                    isShiftHeld &&
                    gameActive

                ) {

                    freezeStatus.innerText =

                        "ON";


                    freezeStatus.classList.add(

                        "freeze-active"

                    );

                }

                else {

                    freezeStatus.innerText =

                        "OFF";


                    freezeStatus.classList.remove(

                        "freeze-active"

                    );

                }

            },

            100

        );


        /* =====================================================
           START APPLICATION
        ===================================================== */

        showAboutGame();