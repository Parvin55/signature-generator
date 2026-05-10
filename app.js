const styles = [

    {
        font: "'Great Vibes', cursive",
        size: "74px"
    },

    {
        font: "'Pacifico', cursive",
        size: "64px"
    },

    {
        font: "'Dancing Script', cursive",
        size: "72px"
    },

    {
        font: "'Allura', cursive",
        size: "78px"
    },

    {
        font: "'Satisfy', cursive",
        size: "68px"
    }

];

let currentSignature;

function generateSignature() {

    const name =
        document.getElementById("nameInput")
        .value
        .trim();

    if (!name) {

        alert("Enter your name");

        return;
    }

    showRandomSignature(name);
}

function regenerateSignature() {

    generateSignature();
}

function showRandomSignature(name) {

    const randomStyle =
        styles[Math.floor(Math.random() * styles.length)];

    const box =
        document.getElementById("signatureBox");

    box.innerHTML = "";

    // RANDOM EFFECTS

    const randomRotate =
        Math.floor(Math.random() * 6 - 3);

    const randomSpacing =
        Math.floor(Math.random() * 3 + 1);

    const randomScale =
        (Math.random() * 0.15 + 0.95).toFixed(2);

    // CREATE SIGNATURE

    const sig =
        document.createElement("div");

    sig.innerText = name;

    sig.style.fontFamily =
        randomStyle.font;

    sig.style.fontSize =
        randomStyle.size;

    sig.style.letterSpacing =
        `${randomSpacing}px`;

    sig.style.transform =
        `
        rotate(${randomRotate}deg)
        scale(${randomScale})
        `;

    sig.style.color = "#111";

    sig.style.display = "inline-block";

    sig.style.padding = "20px";

    sig.style.background = "transparent";

    sig.style.userSelect = "none";

    // APPEND

    box.appendChild(sig);

    // SAVE CURRENT SIGNATURE

    currentSignature = sig;
}

function downloadCurrentSignature() {

    if (!currentSignature) {

        alert("Generate a signature first");

        return;
    }

    html2canvas(currentSignature, {

        backgroundColor: null,

        scale: 6

    }).then(canvas => {

        const link =
            document.createElement("a");

        link.download = "signature.png";

        link.href =
            canvas.toDataURL("image/png");

        link.click();
    });
}

const canvas =
    document.getElementById("signatureCanvas");

const ctx =
    canvas.getContext("2d");

canvas.width = 600;
canvas.height = 220;

let drawing = false;

// PEN STYLE

ctx.lineWidth = 2.5;

ctx.lineCap = "round";

ctx.strokeStyle = "#111";

// START DRAW

function startPosition(e) {

    drawing = true;

    draw(e);
}

// END DRAW

function endPosition() {

    drawing = false;

    ctx.beginPath();
}

// DRAW FUNCTION

function draw(e) {

    if (!drawing) return;

    const rect =
        canvas.getBoundingClientRect();

    const x =
        e.clientX - rect.left;

    const y =
        e.clientY - rect.top;

    ctx.lineTo(x, y);

    ctx.stroke();

    ctx.beginPath();

    ctx.moveTo(x, y);
}

// MOUSE EVENTS

canvas.addEventListener(
    "mousedown",
    startPosition
);

canvas.addEventListener(
    "mouseup",
    endPosition
);

canvas.addEventListener(
    "mousemove",
    draw
);

// TOUCH EVENTS

canvas.addEventListener(
    "touchstart",
    (e) => {

        e.preventDefault();

        const touch = e.touches[0];

        startPosition(touch);
    }
);

canvas.addEventListener(
    "touchend",
    endPosition
);

canvas.addEventListener(
    "touchmove",
    (e) => {

        e.preventDefault();

        const touch = e.touches[0];

        draw(touch);
    }
);

// CLEAR

function clearCanvas() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
}

// DOWNLOAD

function downloadDrawnSignature() {

    const link =
        document.createElement("a");

    link.download =
        "drawn-signature.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();
}