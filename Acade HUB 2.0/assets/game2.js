/* Old playTone removed — using shared SFX from sounds.js */


        /* =====================================================
           GAME DATA
        ===================================================== */

        const itemList = [

            {
                name: "Hourglass",
                emoji: "⏳",
                clue: "An isolated desert path leaking silently down a structural choke point."
            },

            {
                name: "Compass",
                emoji: "🧭",
                clue: "A loyal iron needle imprisoned in glass, forever pining for a frozen kingdom."
            },

            {
                name: "Mirror",
                emoji: "🪞",
                clue: "I mock your actions precisely, yet my orientation remains completely inverted."
            },

            {
                name: "Shadow",
                emoji: "👤",
                clue: "Born exclusively of your presence, I lengthen as your energy source dies."
            },

            {
                name: "Map",
                emoji: "🗺️",
                clue: "Houses wide open oceans perfectly dry and cities lacking life."
            },

            {
                name: "Echo",
                emoji: "🗣️",
                clue: "I refuse to speak unless spoken to first."
            },

            {
                name: "Key",
                emoji: "🔑",
                clue: "A metal object that unlocks a secured structure."
            },

            {
                name: "Anchor",
                emoji: "⚓",
                clue: "Thrown into darkness to stop a ship from moving."
            },

            {
                name: "Coin",
                emoji: "🪙",
                clue: "I have two sides but I am not alive."
            },

            {
                name: "Wind",
                emoji: "💨",
                clue: "You cannot see me but you can feel me move."
            },

            {
                name: "Book",
                emoji: "📖",
                clue: "I have many leaves but no roots."
            },

            {
                name: "Gloves",
                emoji: "🧤",
                clue: "I have fingers but no bones."
            },

            {
                name: "Microscope",
                emoji: "🔬",
                clue: "I help humans see extremely small objects."
            },

            {
                name: "Satellite",
                emoji: "🛰️",
                clue: "A metal object that travels around Earth in space."
            },

            {
                name: "Black Hole",
                emoji: "🕳️",
                clue: "A region in space where gravity is extremely powerful."
            },

            {
                name: "Volcano",
                emoji: "🌋",
                clue: "A mountain that can release lava and ash."
            },

            {
                name: "Telescope",
                emoji: "🔭",
                clue: "I help you observe distant objects in space."
            },

            {
                name: "Lightning",
                emoji: "⚡",
                clue: "A powerful flash of electricity in the sky."
            },

            {
                name: "Iceberg",
                emoji: "🏔️",
                clue: "Most of my frozen mass is hidden underwater."
            },

            {
                name: "Battery",
                emoji: "🔋",
                clue: "I store electrical energy."
            }

        ];


        /* =====================================================
           GAME VARIABLES
        ===================================================== */

        let selectedTime =
            60;


        let timeLeft =
            60;


        /* NUMBER OF OPTIONS BASED ON DIFFICULTY */

        let selectedOptionCount =
            5;


        /* FLAG: pauses timer between quizzes */

        let transitioning =
            false;


        let timer =
            null;


        let gameActive =
            false;


        let quizNumber =
            0;


        let winningItem =
            null;


        let currentItems =
            [];


        const TOTAL_QUIZZES =
            3;


        /* =====================================================
           GET ELEMENTS
        ===================================================== */

        const popupOverlay =
            document.getElementById(
                "popupOverlay"
            );


        const popupBox =
            document.getElementById(
                "popupBox"
            );


        const timerEl =
            document.getElementById(
                "timer-val"
            );


        const quizEl =
            document.getElementById(
                "quiz-val"
            );


        const clueText =
            document.getElementById(
                "clue-text"
            );


        const grid =
            document.getElementById(
                "items-grid"
            );


        const statusText =
            document.getElementById(
                "status-text"
            );


        const mainBox =
            document.getElementById(
                "main-box"
            );


        const revealedItem =
            document.getElementById(
                "revealed-item-display"
            );


        const msgOverlay =
            document.getElementById(
                "msg-overlay"
            );


        /* =====================================================
           SHOW CENTER MESSAGE
        ===================================================== */

        function showMessage(
            text
        ) {

            msgOverlay.innerText =
                text;


            msgOverlay.classList.add(
                "show-msg"
            );


            setTimeout(

                function() {

                    msgOverlay.classList.remove(
                        "show-msg"
                    );

                },

                700

            );

        }


        /* =====================================================
           ABOUT GAME
        ===================================================== */

        function showAboutGame() {

            popupOverlay.style.display =
                "flex";


            popupBox.innerHTML = `

                <div class="popup-title">

                    MYSTRY PARDA
                    <br>
                    ABOUT GAME

                </div>


                <div class="popup-text">

                    Read the clue carefully
                    and identify the hidden item.

                    <br><br>

                    Select the correct answer
                    from the available options.

                    <br><br>

                    You must complete
                    3 mystery quizzes
                    before the timer ends.

                    <br><br>

                    One wrong answer will
                    end the mission.

                </div>


                <button
                    class="popup-btn"
                    onclick="showDifficultySelection()"
                >

                    CONTINUE

                </button>

            `;

        }


        /* =====================================================
           DIFFICULTY SELECTION
        ===================================================== */

        function showDifficultySelection() {

            popupOverlay.style.display =
                "flex";


            popupBox.innerHTML = `

                <div class="popup-title">

                    SELECT DIFFICULTY

                </div>


                <div class="popup-text">

                    Select your mission difficulty.

                    <br><br>

                    Complete all 3 quizzes
                    before time runs out.

                </div>


                <button
                    class="difficulty-option"
                    onclick="selectDifficulty(60, 5)"
                >

                    <strong>
                        EASY
                    </strong>

                    <span>
                        60 SECONDS • 5 OPTIONS
                    </span>

                </button>


                <button
                    class="difficulty-option"
                    onclick="selectDifficulty(40, 10)"
                >

                    <strong>
                        NORMAL
                    </strong>

                    <span>
                        40 SECONDS • 10 OPTIONS
                    </span>

                </button>


                <button
                    class="difficulty-option"
                    onclick="selectDifficulty(20, 20)"
                >

                    <strong>
                        HARD
                    </strong>

                    <span>
                        20 SECONDS • ALL 20 OPTIONS
                    </span>

                </button>

            `;

        }


        /* =====================================================
           SELECT DIFFICULTY
        ===================================================== */

        function selectDifficulty(
            time,
            optionCount
        ) {

            selectedTime =
                time;


            /* NEW: SAVE OPTION COUNT */

            selectedOptionCount =
                optionCount;


            timeLeft =
                time;


            timerEl.innerText =
                timeLeft
                .toString()
                .padStart(
                    2,
                    "0"
                );


            startCountdown();

        }


        /* =====================================================
           3 2 1 COUNTDOWN
        ===================================================== */

        function startCountdown() {

            popupOverlay.style.display =
                "none";


            let count =
                3;


            showMessage(
                count
            );

            SFX.countdown();


            const countdown =

                setInterval(

                    function() {

                        count--;


                        if (

                            count > 0

                        ) {

                            showMessage(
                                count
                            );

                            SFX.countdown();

                        }

                        else {

                            clearInterval(
                                countdown
                            );


                            showMessage(
                                "GO!"
                            );

                            SFX.go();


                            setTimeout(

                                function() {

                                    startGame();

                                },

                                700

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

            clearInterval(
                timer
            );


            gameActive =
                true;


            quizNumber =
                0;


            timeLeft =
                selectedTime;


            quizEl.innerText =
                "0";


            timerEl.innerText =

                timeLeft
                .toString()
                .padStart(
                    2,
                    "0"
                );


            timerEl.classList.remove(
                "warning"
            );


            statusText.innerText =
                "MISSION ACTIVE";


            statusText.style.color =
                "var(--clue-blue)";


            startTimer();


            loadNextQuiz();

        }


        /* =====================================================
           START TIMER
        ===================================================== */

        function startTimer() {

            clearInterval(
                timer
            );


            timer =

                setInterval(

                    function() {

                        if (

                            !gameActive
                            ||
                            transitioning

                        ) {

                            return;

                        }


                        timeLeft--;


                        if (

                            timeLeft < 0

                        ) {

                            timeLeft =
                                0;

                        }


                        timerEl.innerText =

                            timeLeft
                            .toString()
                            .padStart(
                                2,
                                "0"
                            );


                        if (

                            timeLeft <= 4
                            &&
                            timeLeft > 0

                        ) {

                            timerEl.classList.add(
                                "warning"
                            );

                            SFX.urgentTick();

                        }


                        if (

                            timeLeft <= 0

                        ) {

                            clearInterval(
                                timer
                            );


                            gameActive =
                                false;


                            SFX.lose();


                            showLoseScreen(
                                "TIME OUT"
                            );

                        }

                    },

                    1000

                );

        }


        /* =====================================================
           LOAD NEXT QUIZ
        ===================================================== */

        function loadNextQuiz() {

            if (

                !gameActive

            ) {

                return;

            }


            quizNumber++;


            quizEl.innerText =
                quizNumber;


            mainBox.classList.remove(
                "open"
            );


            revealedItem.innerText =
                "?";


            statusText.innerText =

                "QUIZ " +
                quizNumber +
                " OF " +
                TOTAL_QUIZZES;


            statusText.style.color =
                "var(--clue-blue)";


            /* ================================================
               CREATE RANDOM OPTIONS
            ================================================= */

            const shuffled =

                [...itemList]
                .sort(

                    function() {

                        return (
                            0.5 -
                            Math.random()
                        );

                    }

                );


            /* ================================================
               CHANGED:
               EASY   = 5 OPTIONS
               NORMAL = 10 OPTIONS
               HARD   = 20 OPTIONS
            ================================================= */

            currentItems =

                shuffled.slice(
                    0,
                    selectedOptionCount
                );


            winningItem =

                currentItems[

                    Math.floor(

                        Math.random()
                        *
                        currentItems.length

                    )

                ];


            clueText.innerText =
                winningItem.clue;


            renderItems();

        }


        /* =====================================================
           RENDER ANSWERS
        ===================================================== */

        function renderItems() {

            grid.innerHTML =
                "";


            currentItems.forEach(

                function(
                    item,
                    index
                ) {

                    const card =

                        document.createElement(
                            "div"
                        );


                    card.className =
                        "item-card";


                    card.style.animationDelay =

                        (
                            index
                            *
                            0.04
                        )
                        +
                        "s";


                    card.innerHTML = `

                        <span
                            class="item-emoji"
                        >

                            ${item.emoji}

                        </span>


                        <span
                            class="item-name"
                        >

                            ${item.name}

                        </span>

                    `;


                    card.onclick =

                        function() {

                            handleGuess(
                                item
                            );

                        };


                    grid.appendChild(
                        card
                    );

                }

            );

        }


        /* =====================================================
           HANDLE ANSWER
        ===================================================== */

        function handleGuess(
            selectedItem
        ) {

            if (

                !gameActive

            ) {

                return;

            }


            /* ================================================
               CORRECT ANSWER
            ================================================= */

            if (

                selectedItem.name
                ===
                winningItem.name

            ) {



                /* PAUSE TIMER DURING TRANSITION */

                transitioning =
                    true;


                /* CHECK IF LAST QUIZ */

                if (

                    quizNumber
                    >=
                    TOTAL_QUIZZES

                ) {

                    SFX.win();

                } else {

                    SFX.correct();

                }


                disableCards();


                revealedItem.innerText =
                    winningItem.emoji;


                mainBox.classList.add(
                    "open"
                );


                statusText.innerText =
                    "TARGET SECURED";


                statusText.style.color =
                    "var(--success-green)";


                /* ============================================
                   IF ALL 3 QUIZZES COMPLETED
                ============================================ */

                if (

                    quizNumber
                    >=
                    TOTAL_QUIZZES

                ) {

                    setTimeout(

                        function() {

                            clearInterval(
                                timer
                            );


                            showWinScreen();

                        },

                        1000

                    );

                }


                /* ============================================
                   LOAD NEXT QUIZ — TIMER RESUMES AFTER LOAD
                ============================================ */

                else {

                    setTimeout(

                        function() {

                            transitioning =
                                false;


                            loadNextQuiz();

                        },

                        1200

                    );

                }

            }


            /* ================================================
               WRONG ANSWER
            ================================================= */

            else {



                SFX.wrong();


                gameActive =
                    false;


                clearInterval(
                    timer
                );


                revealedItem.innerText =
                    winningItem.emoji;


                mainBox.classList.add(
                    "open"
                );


                disableCards();


                setTimeout(

                    function() {

                        showLoseScreen(
                            "WRONG ANSWER"
                        );

                    },

                    800

                );

            }

        }


        /* =====================================================
           DISABLE CARDS
        ===================================================== */

        function disableCards() {

            document
            .querySelectorAll(
                ".item-card"
            )
            .forEach(

                function(
                    card
                ) {

                    card.classList.add(
                        "disabled"
                    );

                }

            );

        }


        /* =====================================================
           WIN SCREEN
        ===================================================== */

        function showWinScreen() {

            gameActive =
                false;


            clearInterval(
                timer
            );


            popupOverlay.style.display =
                "flex";


            popupBox.innerHTML = `

                <div class="popup-title">

                    LEVEL COMPLETE!

                </div>


                <div class="popup-text">

                    ALL 3 QUIZZES
                    COMPLETED SUCCESSFULLY

                    <br><br>

                    TARGET MATRIX
                    CLEARED ✓

                    <br><br>

                    LOADING NEXT GAME...

                </div>

            `;


            /* ================================================
               AUTOMATICALLY OPEN GAME 3
            ================================================= */

            setTimeout(

                function() {

                    navigateTo(
                        "transition.html?next=game3.html&video=3"
                    );

                },

                2000

            );

        }


        /* =====================================================
           LOSE SCREEN
        ===================================================== */

        function showLoseScreen(
            reason
        ) {

            gameActive =
                false;


            clearInterval(
                timer
            );


            popupOverlay.style.display =
                "flex";


            popupBox.innerHTML = `

                <div class="popup-title">

                    MISSION FAILED

                </div>


                <div class="popup-text">

                    ${reason}

                    <br><br>

                    QUIZZES COMPLETED:

                    ${quizNumber - 1}

                    /3

                    <br><br>

                    RETURN TO THE HUB
                    OR TRY AGAIN.

                </div>


                <button
                    class="popup-btn"
                    onclick="tryAgain()"
                >

                    TRY AGAIN

                </button>


                <br>


                <button
                    class="popup-btn"
                    onclick="goHome()"
                >

                    HOME

                </button>

            `;

        }


        /* =====================================================
           TRY AGAIN
        ===================================================== */

        function tryAgain() {

            clearInterval(
                timer
            );


            quizNumber =
                0;


            gameActive =
                false;


            mainBox.classList.remove(
                "open"
            );


            revealedItem.innerText =
                "?";


            grid.innerHTML =
                "";


            showDifficultySelection();

        }


        /* =====================================================
           GO HOME
        ===================================================== */

        function goHome() {

            clearInterval(
                timer
            );


            gameActive =
                false;


            navigateTo("index.html");

        }


        /* =====================================================
           START APPLICATION
        ===================================================== */

        showAboutGame();