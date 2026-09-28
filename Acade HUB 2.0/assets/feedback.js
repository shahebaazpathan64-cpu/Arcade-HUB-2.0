/* =====================================================
           GOOGLE APPS SCRIPT URL
        ===================================================== */

        const GOOGLE_SCRIPT_URL =
            "https://script.google.com/macros/s/AKfycbzdLanZO6F_Sb5Ca8h264BoLw6b7-_frgy0kDMeq1kOY2qT-9BCmRbgnKs9kywo9JOQ/exec";


        /* =====================================================
           VARIABLES
        ===================================================== */

        let selectedRating =
            null;


        const playerNameEl =
            document.getElementById(
                "playerName"
            );


        const feedbackText =
            document.getElementById(
                "feedbackText"
            );


        const characterCount =
            document.getElementById(
                "characterCount"
            );


        const message =
            document.getElementById(
                "message"
            );


        const submitBtn =
            document.getElementById(
                "submitBtn"
            );


        /* =====================================================
           GET USERNAME
        ===================================================== */

        const username =
            localStorage.getItem(
                "arcadeUsername"
            );


        if (

            username

        ) {

            playerNameEl.innerText =
                username.toUpperCase();

        }

        else {

            playerNameEl.innerText =
                "UNKNOWN PLAYER";

        }


        /* =====================================================
           RATING BUTTONS
        ===================================================== */

        const ratingButtons =
            document.querySelectorAll(
                ".rating-btn"
            );


        ratingButtons.forEach(
            function (button) {


                button.addEventListener(
                    "click",
                    function () {


                        selectedRating =
                            parseInt(
                                button.dataset.rating
                            );


                        /* REMOVE ACTIVE */

                        ratingButtons.forEach(
                            function (btn) {

                                btn.classList.remove(
                                    "active"
                                );

                            }
                        );


                        /* ADD ACTIVE */

                        button.classList.add(
                            "active"
                        );


                        /* UPDATE TEXT */

                        document
                            .getElementById(
                                "ratingInfo"
                            )
                            .innerText =

                            "YOUR RATING: " +
                            selectedRating +
                            " / 10";


                    }
                );


            }
        );


        /* =====================================================
           CHARACTER COUNT
        ===================================================== */

        feedbackText.addEventListener(
            "input",
            function () {


                characterCount.innerText =
                    feedbackText.value.length;


            }
        );


        /* =====================================================
           SUBMIT FEEDBACK
        ===================================================== */

        async function submitFeedback() {


            /* CHECK USERNAME */

            if (

                !username

            ) {

                message.innerText =
                    "PLAYER INFORMATION NOT FOUND";

                message.style.color =
                    "#ff4757";

                return;

            }


            /* CHECK RATING */

            if (

                selectedRating === null

            ) {

                message.innerText =
                    "PLEASE SELECT A RATING";

                message.style.color =
                    "#ff4757";

                return;

            }


            /* GET FEEDBACK */

            const feedback =
                feedbackText.value.trim();


            /* FEEDBACK REQUIRED */

            if (

                feedback === ""

            ) {

                message.innerText =
                    "PLEASE WRITE YOUR FEEDBACK";

                message.style.color =
                    "#ff4757";

                feedbackText.focus();

                return;

            }


            /* =====================================================
               DISABLE BUTTON
            ===================================================== */

            submitBtn.disabled =
                true;


            submitBtn.innerText =
                "TRANSMITTING...";


            message.innerText =
                "SENDING FEEDBACK TO ARCADE HUB...";

            message.style.color =
                "#00d9ff";


            /* =====================================================
               SEND TO GOOGLE SHEET
            ===================================================== */

            try {


                await fetch(
                    GOOGLE_SCRIPT_URL,
                    {

                        method:
                            "POST",

                        mode:
                            "no-cors",

                        headers:
                        {

                            "Content-Type":
                                "text/plain"

                        },

                        body:
                            JSON.stringify(
                                {

                                    action:
                                        "feedback",

                                    username:
                                        username,

                                    rating:
                                        selectedRating,

                                    feedback:
                                        feedback

                                }
                            )

                    }
                );


                /* =====================================================
                   SUCCESS
                ===================================================== */

                message.innerText =
                    "FEEDBACK TRANSMITTED SUCCESSFULLY";

                message.style.color =
                    "#00ff9d";


                setTimeout(
                    function () {


                        document
                            .getElementById(
                                "thankYouScreen"
                            )
                            .style.display =
                            "flex";


                    },
                    800
                );


            }


            catch (error) {


                console.error(
                    "Feedback Error:",
                    error
                );


                message.innerText =
                    "CONNECTION ERROR. PLEASE TRY AGAIN.";

                message.style.color =
                    "#ff4757";


                submitBtn.disabled =
                    false;


                submitBtn.innerText =
                    "SUBMIT FEEDBACK";


            }


        }


        /* =====================================================
           RETURN HOME
        ===================================================== */

        function returnHome() {


            /* OPTIONAL:
               Remove old username when session ends
            */

            localStorage.removeItem(
                "arcadeUsername"
            );


            navigateTo("index.html");


        }