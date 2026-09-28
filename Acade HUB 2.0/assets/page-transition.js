/* =====================================================
   SHARED PAGE TRANSITION UTILITY
   Include this in every game/feedback page.
   Provides: smooth fade-in on load, smooth fade-out
   before navigation (navigateTo function).
===================================================== */

(function () {


    /* -------------------------------------------------
       INJECT FADE OVERLAY + STYLES
    ------------------------------------------------- */

    const style = document.createElement('style');
    style.textContent = `
        #__page-fade {
            position: fixed;
            inset: 0;
            background: #050507;
            z-index: 99999;
            pointer-events: none;
            animation: __fadeIn 0.5s ease forwards;
        }
        @keyframes __fadeIn {
            from { opacity: 1; }
            to   { opacity: 0; }
        }
        #__page-fade.fade-out {
            animation: __fadeOut 0.5s ease forwards !important;
            pointer-events: all !important;
        }
        @keyframes __fadeOut {
            from { opacity: 0; }
            to   { opacity: 1; }
        }

        /* Touch-friendly tap active states */
        button:active, .item-card:active, .target:active {
            opacity: 0.75;
        }
    `;
    document.head.appendChild(style);


    const overlay = document.createElement('div');
    overlay.id = '__page-fade';
    document.body.appendChild(overlay);


    /* -------------------------------------------------
       GLOBAL navigateTo — fade out then navigate
    ------------------------------------------------- */

    window.navigateTo = function (url, delay) {
        delay = delay || 0;
        setTimeout(function () {
            overlay.classList.add('fade-out');
            setTimeout(function () {
                window.location.href = url;
            }, 520);
        }, delay);
    };


    /* -------------------------------------------------
       INTERCEPT ALL window.location.href navigations
       that go through game popups (goHome / tryAgain)
       — they now use navigateTo automatically when
         defined on the popup buttons with onclick.
       Nothing extra needed here; calling navigateTo
       in those handlers is enough.
    ------------------------------------------------- */


})();
