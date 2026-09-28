/* =========================================
   GET URL INFORMATION
========================================= */

        const params =

            new URLSearchParams(
                window.location.search
            );


        const nextGame =

            params.get("next");


        const videoNumber =

            params.get("video");


        /* =========================================
           VIDEO ELEMENT
        ========================================= */

        const video =

            document.getElementById(
                "transitionVideo"
            );


        /* =========================================
           SELECT VIDEO
           video=1 → intro to game1  (video1.mp4)
           video=2 → game1 → game2   (video2.mp4)
           video=3 → game2 → game3   (video3.mp4)
        ========================================= */

        const videoMap = {
            "1": "videos/video1.mp4",
            "2": "videos/video2.mp4",
            "3": "videos/video3.mp4"
        };

        video.src = videoMap[videoNumber] || "videos/video1.mp4";


        /* =========================================
           NAVIGATE WITH SMOOTH FADE OUT
        ========================================= */

        function navigateToNext() {

            const fade =
                document.getElementById("page-fade");

            if (fade) {
                fade.classList.add("page-fade-out");
            }

            setTimeout(
                function () {
                    window.location.href =
                        nextGame || "index.html";
                },
                500
            );

        }


        /* =========================================
           PLAY VIDEO
        ========================================= */

        video.load();


        video.play()

            .then(function () {

                /* Play transition sounds once video starts */
                SFX.whoosh();

                setTimeout(function () {
                    SFX.ambientHum();
                }, 400);

            })

            .catch(

                function () {

                    console.log(
                        "Video autoplay waiting..."
                    );

                }

            );


        /* =========================================
           WHEN VIDEO ENDS → NAVIGATE
        ========================================= */

        video.addEventListener(

            "ended",

            function () {

                navigateToNext();

            }

        );


        /* =========================================
           VIDEO ERROR → FALLBACK AFTER 2s
        ========================================= */

        video.addEventListener(

            "error",

            function () {

                console.log(
                    "VIDEO NOT FOUND — fallback"
                );

                setTimeout(
                    function () {
                        navigateToNext();
                    },
                    2000
                );

            }

        );


        /* =========================================
           SAFETY NET: if video never fires ended
           (e.g., autoplay blocked on mobile),
           navigate after 6 seconds max.
        ========================================= */

        setTimeout(
            function () {
                if (document.visibilityState !== "hidden") {
                    navigateToNext();
                }
            },
            6000
        );