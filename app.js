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