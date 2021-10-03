import $ from "../uiblox/jquery.module.js";
import ky from "./ky.min.js";

Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
};
let languages = [
    'en',
    'nl',
    'fr',
    'tr',
    'zu',
    'zh-CN',
    'ja',
    'cs',
    'hi'
];

const {...Tauri } = window.__TAURI__ || {};
let currentInput, currentOutput;
$(window).on("load", async() => {
    ky.get("https://goggletrans.blookers.repl.co/api");
    const embedButton = $("#embedButton");
    const transOutput = $(".trans-output");
    const transButton = $("#translateButton");
    const transInput = $("#translationInput");
    const transCount = $(".translateCount");
    const amountInd = $("#amountInd");
    transButton.on("click", async() => {
        embedButton.prop("disabled", true);
        transButton.prop("disabled", true);
        transInput.prop("disabled", true);
        transOutput.html("Translating...");

        try {
            let input = transInput.val();
            let { result } = await ky.post("https://goggletrans.blookers.repl.co/api/translate", {
                json: {
                    input,
                    language: 'en',
                    translateTimes: parseInt(transCount.val()),
                    outputLanguage: 'auto'
                },
                timeout: false
            }).json();
            currentInput = input;
            currentOutput = result;
            transOutput.html(result);
        } catch (err) {
            transOutput.html(`Translation Failed!<br>${err}`);
        }

        embedButton.prop("disabled", false);
        transButton.prop("disabled", false);
        transInput.prop("disabled", false);
    });
    embedButton.on('click', async() => {
        embedButton.prop("disabled", true);
        let { id } = await ky.post("https://goggletrans.blookers.repl.co/embed", {
            json: {
                input: currentInput,
                output: currentOutput
            },
            timeout: false
        }).json();

        let embedLink = `https://goggletrans.blookers.repl.co/embed/${id}`;
        if (Tauri)
            await Tauri.clipboard.writeText(embedLink);
        else
            navigator.clipboard.writeText(embedLink);

        embedButton.children(".btn-label").html("Copied Link!");
        setTimeout(() => {
            embedButton.children(".btn-label").html("Embed");
        }, 1500);
        embedButton.prop("disabled", false);
    });
    transInput.on('input change', async({ target }) => {
        transButton.prop("disabled", !$(target).val().length);
    });
    transCount.on('input change', async({ target }) => {
        amountInd.html(`Amount: ${$(target).val()}`);
    });

    if (Tauri) {
        $("#historyButton").on('click', async event => {
            let historyView = new Tauri.window.WebviewWindow("history", {
                url: "./history.html",
                title: "Translation History",
                center: true
            });
        });
        $(".download-btn").remove();
        $("#min-win").on('click', (event) => {
            Tauri.window.getCurrent().minimize();
        });
        $("#max-win").on('click', async(event) => {
            const window = Tauri.window.getCurrent();
            if (await window.isMaximized())
                window.unmaximize();
            else
                window.maximize();
        });
        $("#exit-win").on('click', (event) => {
            Tauri.window.getCurrent().close();
        });
    } else {
        $(".win-btn").remove();
        $("header").children("div:first-child").css(
            "position",
            "absolute"
        ).css(
            "left",
            "24px"
        );
        $(".download-btn").css(
            "position",
            "absolute"
        ).css(
            "right",
            "24px"
        );
    }
});
$(".download-btn").on('click', async() => {
    let nav = $("header");
    if (!Tauri) {
        window.location.href = "https://goggletrans.blookers.repl.co/";
        $(".download-btn").remove();
        nav.find("*").css(
            "transition",
            "all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        );
        nav.children("div:first-child").css(
            "transform",
            "translateX(-50%)"
        ).css(
            "position",
            "absolute"
        ).css(
            "left",
            "50%"
        ).css(
            "height",
            "100%"
        ).children("p").css(
            "position",
            "absolute"
        ).css(
            "width",
            "400px"
        ).css(
            "bottom",
            "11px"
        ).css(
            "font-size",
            "56px"
        ).css(
            "text-align",
            "center"
        ).css(
            "margin",
            "0"
        );
        nav.children("div:first-child").children("img").css(
            "position",
            "absolute"
        ).css(
            "top",
            "11px"
        );
        nav.find("img").css(
            "width",
            "128"
        ).css(
            "height",
            "128"
        );
        $("main").css(
            "transition",
            "all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        ).css(
            "opacity",
            "0"
        ).css(
            "margin-top",
            "210px"
        );
        nav.css(
            "transition",
            "height 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
        );
        nav.css(
            "height",
            "210px"
        );
    }
});