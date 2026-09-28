/* =====================================================
           GET HTML ELEMENTS
        ===================================================== */

        const videoElement =
            document.getElementById(
                "video-preview"
            );



        const canvasElement =
            document.getElementById(
                "gameCanvas"
            );



        const ctx =
            canvasElement.getContext(
                "2d"
            );



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



        const msgOverlay =
            document.getElementById(
                "msg-overlay"
            );



        /* =====================================================
           GAME VARIABLES
        ===================================================== */

        let score = 0;

        let stage = 1;

        let balloons = [];



        /* CROSSHAIR */

        let cursor = {

            x:
                window.innerWidth / 2,

            y:
                window.innerHeight / 2

        };



        /* FAST AIM TARGET POSITION */

        let targetCursorX =
            window.innerWidth / 2;

        let targetCursorY =
            window.innerHeight / 2;



        /* GAME STATE */

        let gameActive = false;

        let gameStarted = false;



        /* TIME VARIABLES */

        let selectedTime = 60;

        let timeLeft = 60;

        let targetScore = 150;

        let timerInterval = null;



        /* =====================================================
           CANVAS SIZE
        ===================================================== */

        canvasElement.width =
            window.innerWidth;



        canvasElement.height =
            window.innerHeight;



        /* =====================================================
           BALLOON CLASS
        ===================================================== */

        class Balloon {



            constructor(speedMult) {



                this.x =

                    Math.random() *
                    (canvasElement.width - 80)

                    + 40;



                this.y =

                    canvasElement.height
                    + 60;



                this.radius =

                    25 +
                    Math.random() * 20;



                this.speed =

                    (
                        2 +
                        Math.random() * 4
                    )

                    * speedMult;



                const colors = [

                    "#ffffff",

                    "#d1d5db",

                    "#8a92a6",

                    "#5a6175"

                ];



                this.color =

                    colors[

                    Math.floor(

                        Math.random()
                        *
                        colors.length

                    )

                    ];

            }



            update() {



                this.y -=

                    this.speed;

            }



            draw() {



                ctx.save();



                ctx.shadowBlur = 15;



                ctx.shadowColor =

                    "rgba(255,255,255,0.4)";



                ctx.beginPath();



                ctx.arc(

                    this.x,

                    this.y,

                    this.radius,

                    0,

                    Math.PI * 2

                );



                ctx.fillStyle =

                    this.color;



                ctx.fill();



                ctx.strokeStyle =

                    "rgba(255,255,255,0.6)";



                ctx.lineWidth = 2;



                ctx.stroke();



                ctx.restore();

            }

        }



        /* =====================================================
           SHOW CENTER MESSAGE
        ===================================================== */

        function showMessage(text) {



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

                1500

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

            BALLOON POP

            <br>

            ABOUT GAME

        </div>



        <div class="popup-text">

            Move your hand in front of
            the camera to control the aim.

            <br><br>

            Touch the balloons using
            the crosshair to pop them.

            <br><br>

            Reach the target score
            before the timer reaches zero.

        </div>



        <button
        class="popup-btn"
        onclick="showTimeSelection()">

            CONTINUE

        </button>



    `;

        }



        /* =====================================================
           TIME SELECTION POPUP
        ===================================================== */

        function showTimeSelection() {



            popupBox.innerHTML = `



        <div class="popup-title">

            SELECT CHALLENGE

        </div>



        <div class="popup-text">

            Select your time and
            score target.

        </div>



        <div class="time-options">



            <button
            class="time-option"
            onclick="selectChallenge(60,150)">



                <strong>

                    1 MINUTE

                </strong>



                <span>

                    TARGET: 150 POINTS

                </span>



            </button>





            <button
            class="time-option"
            onclick="selectChallenge(120,200)">



                <strong>

                    2 MINUTES

                </strong>



                <span>

                    TARGET: 200 POINTS

                </span>



            </button>





            <button
            class="time-option"
            onclick="selectChallenge(180,300)">



                <strong>

                    3 MINUTES

                </strong>



                <span>

                    TARGET: 300 POINTS

                </span>



            </button>



        </div>



    `;

        }



        /* =====================================================
           SELECT CHALLENGE
        ===================================================== */

        function selectChallenge(

            time,

            target

        ) {



            selectedTime =

                time;



            timeLeft =

                time;



            targetScore =

                target;



            targetEl.innerText =

                targetScore;



            updateTimerDisplay();



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

                count

            );


            SFX.countdown();

            const countdown =

                setInterval(

                    function () {



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



            score = 0;



            balloons = [];



            timeLeft =

                selectedTime;



            scoreEl.innerText =

                score;



            targetEl.innerText =

                targetScore;



            updateTimerDisplay();



            gameActive = true;



            gameStarted = true;



            startTimer();

        }



        /* =====================================================
           START TIMER
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



                        timeLeft--;



                        updateTimerDisplay();



                        if (

                            timeLeft <= 0

                        ) {



                            timeLeft = 0;



                            updateTimerDisplay();



                            clearInterval(

                                timerInterval

                            );



                            if (

                                score < targetScore

                            ) {



                                endGame(

                                    false

                                );



                            }



                        }


                        /* TIMER TICKS IN LAST 5 SECONDS */

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

        function updateTimerDisplay() {



            const minutes =

                Math.floor(

                    timeLeft / 60

                );



            const seconds =

                timeLeft % 60;



            const formattedMinutes =

                minutes < 10

                    ?

                    "0" + minutes

                    :

                    minutes;



            const formattedSeconds =

                seconds < 10

                    ?

                    "0" + seconds

                    :

                    seconds;



            timerEl.innerText =

                formattedMinutes +

                ":" +

                formattedSeconds;

        }



        /* =====================================================
           END GAME
        ===================================================== */

        function endGame(

            won

        ) {



            gameActive =

                false;



            clearInterval(

                timerInterval

            );



            balloons = [];



            popupOverlay.style.display =

                "flex";



            if (

                won

            ) {



                showWinScreen();



            }

            else {



                showLoseScreen();



            }

        }



        /* =====================================================
           WIN SCREEN
        ===================================================== */

        function showWinScreen() {

            SFX.win();



            popupBox.innerHTML = `



        <div class="popup-title">

            GAME 1 COMPLETE!

        </div>



        <div class="popup-text">

            TARGET ACHIEVED ✓

            <br><br>

            SCORE:

            ${score}

            /

            ${targetScore}

            <br><br>

            LOADING NEXT GAME...

        </div>



    `;



            /*
            =====================================
            AUTOMATICALLY OPEN GAME 2
            AFTER 2 SECONDS
            =====================================
            */

            setTimeout(

                function () {

                    navigateTo(
                        "transition.html?next=game2.html&video=2"
                    );


                },

                2000

            );

        }



        /* =====================================================
           LOSE SCREEN
        ===================================================== */

        function showLoseScreen() {

            SFX.lose();



            popupBox.innerHTML = `



        <div class="popup-title">

            GAME OVER

        </div>



        <div class="popup-text">

            TIME'S UP!

            <br><br>

            TARGET NOT COMPLETED

            <br><br>

            SCORE:

            ${score}

            /

            ${targetScore}

            <br><br>

            TRY AGAIN OR
            RETURN HOME.

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
           TRY AGAIN
        ===================================================== */

        function tryAgain() {



            score = 0;



            balloons = [];



            scoreEl.innerText =

                "0";



            timeLeft =

                selectedTime;



            updateTimerDisplay();



            startCountdown();

        }



        /* =====================================================
           GO TO HOME
        ===================================================== */

        function goHome() {



            clearInterval(

                timerInterval

            );



            gameActive =

                false;



            navigateTo("index.html");

        }



        /* =====================================================
           DRAW CROSSHAIR
        ===================================================== */

        function drawCrosshair() {



            const crosshairColor =

                "#a3aed0";



            ctx.save();



            ctx.strokeStyle =

                crosshairColor;



            ctx.lineWidth = 3;



            const size = 20;



            /* HORIZONTAL + VERTICAL */

            ctx.beginPath();



            ctx.moveTo(

                cursor.x - size,

                cursor.y

            );



            ctx.lineTo(

                cursor.x + size,

                cursor.y

            );



            ctx.moveTo(

                cursor.x,

                cursor.y - size

            );



            ctx.lineTo(

                cursor.x,

                cursor.y + size

            );



            ctx.stroke();



            /* OUTER CIRCLE */

            ctx.beginPath();



            ctx.arc(

                cursor.x,

                cursor.y,

                size / 1.5,

                0,

                Math.PI * 2

            );



            ctx.stroke();



            /* CENTER DOT */

            ctx.fillStyle =

                "#ffffff";



            ctx.beginPath();



            ctx.arc(

                cursor.x,

                cursor.y,

                3,

                0,

                Math.PI * 2

            );



            ctx.fill();



            ctx.restore();

        }



        /* =====================================================
           MAIN GAME LOOP
        ===================================================== */

        function gameLoop() {



            ctx.clearRect(

                0,

                0,

                canvasElement.width,

                canvasElement.height

            );



            /*
            =============================================
            FAST + SMOOTH AIM MOVEMENT
            =============================================
            */

            cursor.x +=

                (

                    targetCursorX -
                    cursor.x

                )

                * 0.65;



            cursor.y +=

                (

                    targetCursorY -
                    cursor.y

                )

                * 0.65;



            /* DRAW AIM */

            drawCrosshair();



            /*
            ======================================
            GAME ONLY RUNS WHEN ACTIVE
            ======================================
            */

            if (

                gameActive

            ) {



                for (

                    let i =
                        balloons.length - 1;

                    i >= 0;

                    i--

                ) {



                    balloons[i].update();



                    balloons[i].draw();



                    /*
                    ==================================
                    POP DETECTION
                    ==================================
                    */

                    const distance =

                        Math.hypot(

                            cursor.x -
                            balloons[i].x,

                            cursor.y -
                            balloons[i].y

                        );



                    if (

                        distance <

                        balloons[i].radius

                    ) {



                        /*
                        POP BALLOON
                        */

                        balloons.splice(

                            i,

                            1

                        );


                        SFX.pop();



                        /*
                        ADD SCORE
                        */

                        score += 10;



                        scoreEl.innerText =

                            score;



                        /*
                        WIN CHECK
                        */

                        if (

                            score >=

                            targetScore

                        ) {



                            endGame(

                                true

                            );



                            break;

                        }



                    }



                    /*
                    REMOVE BALLOON
                    IF IT LEAVES SCREEN
                    */

                    else if (

                        balloons[i]

                        &&

                        balloons[i].y < -100

                    ) {



                        balloons.splice(

                            i,

                            1

                        );



                    }



                }



                /*
                ======================================
                SPAWN BALLOONS
                ======================================
                */

                if (

                    Math.random()

                    <

                    (

                        0.02

                        +

                        stage * 0.01

                    )

                ) {



                    balloons.push(

                        new Balloon(

                            1 +

                            stage * 0.3

                        )

                    );



                }



            }



            requestAnimationFrame(

                gameLoop

            );

        }



        /* =====================================================
           MEDIAPIPE HAND TRACKING
        ===================================================== */



        const hands =

            new Hands({

                locateFile:

                    function (file) {



                        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;



                    }

            });



        hands.setOptions({

            maxNumHands: 1,

            modelComplexity: 1,

            minDetectionConfidence: 0.7,

            minTrackingConfidence: 0.7

        });



        hands.onResults(

            function (results) {



                if (

                    results.multiHandLandmarks

                    &&

                    results.multiHandLandmarks.length > 0

                ) {



                    const landmarks =

                        results
                            .multiHandLandmarks[0];



                    /*
                    ==================================
                    INDEX FINGER TIP
                    LANDMARK 8
                    ==================================
                    */

                    /*
                    Use the canvas's actual rendered rect so coordinates
                    always match the displayed canvas — even if the window
                    size changed or the canvas CSS size differs from its
                    pixel buffer size at the moment of the hand result.
                    */

                    const rect = canvasElement.getBoundingClientRect();

                    targetCursorX =

                        (

                            1 -

                            landmarks[8].x

                        )

                        *

                        rect.width;



                    targetCursorY =

                        landmarks[8].y

                        *

                        rect.height;



                }



            }

        );



        /* =====================================================
           CAMERA
        ===================================================== */

        const camera =

            new Camera(

                videoElement,

                {



                    onFrame:

                        async function () {



                            await hands.send({

                                image:

                                    videoElement

                            });



                        },



                    width: 640,

                    height: 480

                }

            );



        camera.start();



        /* =====================================================
           WINDOW RESIZE
        ===================================================== */

        window.addEventListener(

            "resize",

            function () {



                canvasElement.width =

                    window.innerWidth;



                canvasElement.height =

                    window.innerHeight;

                /* Keep cursor within new bounds */

                targetCursorX = canvasElement.width / 2;

                targetCursorY = canvasElement.height / 2;



            }

        );



        /* =====================================================
           START APPLICATION
        ===================================================== */



        /*
        SHOW ABOUT SCREEN FIRST
        */

        showAboutGame();



        /*
        START GAME LOOP
        */

        gameLoop();