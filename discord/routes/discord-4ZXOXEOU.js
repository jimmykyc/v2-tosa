import {
    e as s,
    f as r,
    g as m,
    h as g,
    i as c
} from "/discord/_shared/chunk-PUDA5C3Q.js";
import "/discord/_shared/chunk-D6OJ345Y.js";
import {
    b as y,
    d as j,
    e as C,
    f as e
} from "/discord/_shared/chunk-STFD5DNB.js";
e();
e();
var t = y(j());
var d = "/discord/_assets/discord-3SVIO2CB.css";
var p = "/discord/_assets/comm_bg_right-FDARZZCN.svg";
var l = "/discord/_assets/comm_bg_left-GO4RLQCK.svg";
var x = "/discord/_assets/comm_img_arrow-72OXAOM5.svg";
var h = "/discord/_assets/comm_img_discord-32KQIXUS.svg";
var u = "/discord/_assets/comm_img_emoji-EYDSFJ27.png";
var Z = "/discord/_assets/comm_img_star-FKSAXBMU.svg";
var N = "/discord/_assets/comm_img_z-JRI5ZWFV.svg";
var F = () => ({
        title: "Zerion Discord server",
        description: "Join the Zerion Discord Server!"
    }),
    O = () => [{
        rel: "stylesheet",
        href: d
    }];

function _() {
    let {
        SITE_KEY: w
    } = m(), i = g(), o = r(), a = (0, t.useRef)(null), n = (0, t.useCallback)(() => o(a.current), []);
    (0, t.useEffect)(() => (window.onRecaptchaSubmit = function () {
        window.dispatchEvent(new Event("recaptcha/submit"))
    }, () => {
        window.onRecaptchaSubmit = void 0
    }), []), (0, t.useEffect)(() => {
        let L = document.createElement("script");
        L.async = !0, L.defer = !0, L.src = "https://www.google.com/recaptcha/api.js", document.head.appendChild(L)
    }, []), (0, t.useEffect)(() => (window.addEventListener("recaptcha/submit", n), () => window.removeEventListener("recaptcha/submit", n)), [o]), console.log({
        message: i
    });
    let f = c(),
        M = Boolean(f.submission);
    return C.createElement("section", {
        className: "commstage"
    }, C.createElement("div", {
        className: "commstage__inner inside-wrapper"
    }, C.createElement("div", {
        className: "commstage__guys commstage__guys_left"
    }, C.createElement("img", {
        src: l,
        alt: ""
    })), C.createElement("div", {
        className: "commstage__content"
    }, C.createElement("h1", {
        className: "h1 commstage__title"
    }, C.createElement("span", {
        className: "nowrap"
    }, C.createElement("span", {
        className: "commstage__text-bg"
    }, "Join"), C.createElement("img", {
        className: "commstage__img commstage__img_arrow",
        src: x,
        alt: ""
    })), C.createElement("br", {
        className: "l_ninja"
    }), C.createElement("span", {
        className: "nowrap"
    }, "the", C.createElement("img", {
        className: "commstage__img commstage__img_z",
        src: N,
        alt: ""
    }), C.createElement("span", {
        className: "commstage__text-blue"
    }, "Zerion")), C.createElement("br", null), C.createElement("span", {
        className: "nowrap"
    }, C.createElement("img", {
        className: "commstage__img commstage__img_star",
        src: Z,
        alt: ""
    }), "Community!", C.createElement("img", {
        className: "commstage__img commstage__img_emoji",
        src: u,
        alt: ""
    }))), C.createElement("p", {
        className: "commstage__text"
    }, "Level up\xA0your DeFi knowledge, get alpha on\xA0unreleased features & chat directly with the humans behind Zerion. Discover the world of\xA0web3 with our helpful community!"), C.createElement("div", {
        className: "commstage__btns"
    }, C.createElement(s, {
        method: "post",
        id: "form",
        action: "/discord",
        ref: a
    }, C.createElement("button", {
        "data-sitekey": w,
        className: "g-recaptcha commstage__btn commstage__btn_cta",
        "data-callback": "onRecaptchaSubmit",
        disabled: M
    }, C.createElement("img", {
        src: h,
        alt: ""
    }), M ? "Generating invite..." : "Get Invite")), i ? C.createElement("div", {
        className: "commstage__message"
    }, i) : null)), C.createElement("div", {
        className: "commstage__guys commstage__guys_right"
    }, C.createElement("img", {
        src: p,
        alt: ""
    }))))
}
export {
    _ as
    default, O as links, F as meta
};