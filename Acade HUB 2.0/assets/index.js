

/* =====================================
   PASSWORD
===================================== */

const CORRECT_PASSWORD = "arcade2026";


/* =====================================
   CUSTOM CURSOR
===================================== */



/* =====================================
   CUSTOM CURSOR (desktop only)
===================================== */

const cursor =
    document.getElementById("cursor");


if (window.matchMedia('(hover: hover)').matches) {

    document.addEventListener(
        "mousemove",
        function (event) {

            cursor.style.left =
                event.clientX + "px";

            cursor.style.top =
                event.clientY + "px";

        }
    );


    document.addEventListener(
        "mousedown",
        function () {
            cursor.classList.add("cursor-pop");
        }
    );


    document.addEventListener(
        "mouseup",
        function () {
            cursor.classList.remove("cursor-pop");
        }
    );

}


/* =====================================
   SHOW / HIDE PASSWORD
===================================== */

function togglePassword() {

    const passwordInput =
        document.getElementById("password");

    const eyeIcon =
        document.getElementById("eyeIcon");


    /* SVG: EYE OPEN */

    const svgEyeOpen =
        `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
         <circle cx="12" cy="12" r="3"/>`;


    /* SVG: EYE OFF (line through it) */

    const svgEyeOff =
        `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
         <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
         <line x1="1" y1="1" x2="23" y2="23"/>`;


    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        eyeIcon.innerHTML = svgEyeOff;

    }

    else {

        passwordInput.type = "password";

        eyeIcon.innerHTML = svgEyeOpen;

    }

}


/* =====================================
   LOGIN FUNCTION
===================================== */

async function login() {


    const username =
        document
            .getElementById("username")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    const message =
        document
            .getElementById("message");


    /* =====================================
       CHECK USERNAME
    ===================================== */

    if (username === "") {

        message.innerHTML =
            "PLEASE ENTER YOUR USERNAME";

        message.style.color =
            "#ff5050";

        return;

    }

    /* =====================================
       CHECK PASSWORD
    ===================================== */

    if (password !== CORRECT_PASSWORD) {

        message.innerHTML =
            "INCORRECT PASSWORD";

        message.style.color =
            "#ff5050";

        return;

    }


    /* =====================================
       SAVE LOGIN DATA TO GOOGLE SHEET
    ===================================== */

    message.innerHTML =
        "SAVING LOGIN DATA...";

    message.style.color =
        "#00d9ff";


    try {

        await fetch(
            "https://script.google.com/macros/s/AKfycbzdLanZO6F_Sb5Ca8h264BoLw6b7-_frgy0kDMeq1kOY2qT-9BCmRbgnKs9kywo9JOQ/exec",
            {

                method: "POST",

                mode: "no-cors",

                headers: {

                    "Content-Type":
                        "text/plain"

                },

                body:
                    JSON.stringify({

                        action:
                            "login",

                        username:
                            username

                    })

            }
        );


    }

    catch (error) {

        console.error(
            "Google Sheet Error:",
            error
        );

    }


    /* =====================================
       SAVE USERNAME FOR OTHER PAGES
    ===================================== */

    localStorage.setItem(
        "arcadeUsername",
        username
    );


    /* =====================================
       LOGIN SUCCESS
    ===================================== */

    message.innerHTML =
        "ACCESS GRANTED... ENTERING GAME";

    message.style.color =
        "#50ffa0";


    /* =====================================
       SAVE PLAYER NAME
    ===================================== */

    document
        .getElementById("welcomeText")
        .innerHTML =

        "WELCOME " +
        username.toUpperCase();


    /* =====================================
       GET LOGIN SCREEN
    ===================================== */

    const loginScreen =
        document.getElementById(
            "loginScreen"
        );


    /* =====================================
       FADE LOGIN SCREEN
    ===================================== */

    loginScreen.style.opacity =
        "0";

    loginScreen.style.transform =
        "scale(1.05)";


    /* =====================================
       SHOW WELCOME SCREEN
    ===================================== */

    setTimeout(function () {


        loginScreen.style.display =
            "none";


        const gameScreen =
            document.getElementById(
                "gameScreen"
            );


        gameScreen.style.display =
            "flex";


        setTimeout(function () {

            gameScreen.style.opacity =
                "1";

        }, 50);


    /* =====================================
       SMOOTH PAGE EXIT → GAME 1
    ===================================== */

        setTimeout(function () {


            gameScreen.style.opacity =
                "0";


            /* Fade out the whole page, then navigate */

            setTimeout(function () {

                const fade = document.getElementById('page-fade');
                if (fade) {
                    fade.classList.add('page-fade-out');
                }

                setTimeout(function () {

                    window.location.href =
                        "transition.html?next=game1.html&video=1";

                }, 500);


            }, 600);


        }, 2000);


    }, 800);


}


/* =====================================
   ENTER KEY LOGIN
===================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            login();

        }

    }
);
