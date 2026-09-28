/* =====================================================
   ARCADE HUB — SHARED SOUND SYSTEM
   Web Audio API — no external files required
===================================================== */

const SFX = (() => {

    /* Lazy-create one shared AudioContext */

    let _ctx = null;

    function ctx() {
        if (!_ctx) {
            _ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        /* Resume if suspended (browser autoplay policy) */
        if (_ctx.state === "suspended") {
            _ctx.resume();
        }
        return _ctx;
    }


    /* -----------------------------------------------
       LOW-LEVEL HELPERS
    ----------------------------------------------- */

    function tone(freq, type, duration, volume = 0.18, delay = 0) {
        try {
            const c   = ctx();
            const osc = c.createOscillator();
            const gain = c.createGain();
            const start = c.currentTime + delay;

            osc.type = type;
            osc.frequency.setValueAtTime(freq, start);

            gain.gain.setValueAtTime(volume, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

            osc.connect(gain);
            gain.connect(c.destination);

            osc.start(start);
            osc.stop(start + duration);
        } catch (e) {}
    }

    function noise(duration, volume = 0.12, delay = 0) {
        try {
            const c       = ctx();
            const bufSize = c.sampleRate * duration;
            const buf     = c.createBuffer(1, bufSize, c.sampleRate);
            const data    = buf.getChannelData(0);
            for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

            const src  = c.createBufferSource();
            const gain = c.createGain();
            const start = c.currentTime + delay;

            src.buffer = buf;
            gain.gain.setValueAtTime(volume, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

            src.connect(gain);
            gain.connect(c.destination);

            src.start(start);
            src.stop(start + duration + 0.05);
        } catch (e) {}
    }


    /* -----------------------------------------------
       PUBLIC SOUND EFFECTS
    ----------------------------------------------- */

    return {

        /* ── COUNTDOWN BEEPS (3, 2, 1) ── */
        countdown() {
            tone(660, "square", 0.12, 0.2);
        },

        /* ── GO! ── */
        go() {
            tone(880, "square", 0.08, 0.25);
            tone(1100, "square", 0.12, 0.25, 0.09);
        },

        /* ── BALLOON POP (game 1) ── */
        pop() {
            noise(0.08, 0.3);
            tone(400, "sine", 0.06, 0.12);
        },

        /* ── CORRECT ANSWER / HIT (game 2, game 3) ── */
        correct() {
            tone(660, "sine",   0.08, 0.2);
            tone(880, "sine",   0.1,  0.2, 0.07);
            tone(1100, "sine",  0.12, 0.2, 0.14);
        },

        /* ── WRONG ANSWER / BAD HIT (game 2, game 3) ── */
        wrong() {
            tone(220, "sawtooth", 0.15, 0.22);
            tone(160, "sawtooth", 0.18, 0.22, 0.1);
        },

        /* ── TIMER TICK (last few seconds) ── */
        tick() {
            tone(880, "square", 0.04, 0.12);
        },

        /* ── TIMER WARNING pulse ── */
        urgentTick() {
            tone(1046, "square", 0.05, 0.18);
        },

        /* ── LEVEL UP / STAGE CLEAR ── */
        levelUp() {
            [523, 659, 784, 1047].forEach((f, i) => {
                tone(f, "sine", 0.15, 0.25, i * 0.1);
            });
        },

        /* ── WIN FANFARE ── */
        win() {
            [523, 659, 784, 1047, 1319].forEach((f, i) => {
                tone(f, "sine", 0.22, 0.28, i * 0.1);
            });
            tone(1047, "sine", 0.5, 0.2, 0.6);
        },

        /* ── GAME OVER / LOSE ── */
        lose() {
            tone(440, "sawtooth", 0.2, 0.22);
            tone(330, "sawtooth", 0.25, 0.22, 0.18);
            tone(220, "sawtooth", 0.35, 0.22, 0.38);
        },

        /* ── BUTTON CLICK / UI SELECT ── */
        click() {
            tone(520, "sine", 0.06, 0.1);
        },

        /* ── TRANSITION WHOOSH ── */
        whoosh() {
            /* Frequency sweep down */
            try {
                const c    = ctx();
                const osc  = c.createOscillator();
                const gain = c.createGain();
                const filter = c.createBiquadFilter();

                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(800, c.currentTime);
                osc.frequency.exponentialRampToValueAtTime(80, c.currentTime + 1.2);

                filter.type = "lowpass";
                filter.frequency.setValueAtTime(1200, c.currentTime);
                filter.frequency.exponentialRampToValueAtTime(200, c.currentTime + 1.2);

                gain.gain.setValueAtTime(0.0, c.currentTime);
                gain.gain.linearRampToValueAtTime(0.22, c.currentTime + 0.2);
                gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 1.2);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(c.destination);

                osc.start();
                osc.stop(c.currentTime + 1.3);
            } catch(e) {}
        },

        /* ── AMBIENT HUM (transition page) ── */
        ambientHum() {
            try {
                const c    = ctx();
                const osc  = c.createOscillator();
                const gain = c.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(60, c.currentTime);

                gain.gain.setValueAtTime(0.0, c.currentTime);
                gain.gain.linearRampToValueAtTime(0.08, c.currentTime + 0.5);
                gain.gain.setValueAtTime(0.08, c.currentTime + 2.5);
                gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 4.0);

                osc.connect(gain);
                gain.connect(c.destination);

                osc.start();
                osc.stop(c.currentTime + 4.1);
            } catch(e) {}
        }

    };

})();
