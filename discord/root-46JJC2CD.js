import {
    a,
    b as l,
    c as s,
    d,
    g as p,
    k as c,
    l as h
} from "/discord/_shared/chunk-PUDA5C3Q.js";
import {
    a as _,
    b as v,
    d as k,
    e,
    f as i
} from "/discord/_shared/chunk-STFD5DNB.js";
var f = _((I, V) => {
    V.exports = "/discord/_assets/favicon-GEZMFMTK.png"
});
i();
i();
var x = "/discord/_assets/global-OOJ23H7T.css";
var g = "/discord/_assets/header-GYZ4PMWN.css";
i();
var C = "/discord/_assets/logo-full-22EYDQ7G.svg";

function u() {
    return e.createElement("img", {
        style: {
            width: 128,
            height: 28
        },
        src: C,
        alt: ""
    })
}
var m = v(k()),
    H = () => [{
        rel: "stylesheet",
        href: x
    }, {
        rel: "stylesheet",
        href: g
    }];

function y() {
    return e.createElement(t, null, e.createElement(n, null, e.createElement(h.Outlet, null)))
}

function w({
    error: o
}) {
    return console.error(o), e.createElement(t, {
        title: "Error!"
    }, e.createElement(n, null, e.createElement("div", null, e.createElement("h1", null, "There was an error"), e.createElement("p", null, o.message))))
}

function F() {
    let o = a(),
        r;
    switch (o.status) {
        case 401:
            r = e.createElement("p", null, "Oops! Looks like you tried to visit a page that you do not have access to.");
            break;
        case 404:
            r = e.createElement("p", null, "Oops! Looks like you tried to visit a page that does not exist.");
            break;
        default:
            throw new Error(o.data || o.statusText)
    }
    return e.createElement(t, {
        title: `${o.status} ${o.statusText}`
    }, e.createElement(n, null, e.createElement("h1", null, o.status, ": ", o.statusText), r))
}

function t({
    children: o,
    title: r
}) {
    return e.createElement("html", {
        lang: "en"
    }, e.createElement("head", null, e.createElement("meta", {
        charSet: "utf-8"
    }), e.createElement("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0"
    }), r ? e.createElement("title", null, r) : null, e.createElement("link", {
        rel: "shortcut icon",
        href: f()
    }), e.createElement(s, null), e.createElement(l, null), e.createElement("link", {
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
        rel: "stylesheet"
    })), e.createElement("body", null, o, e.createElement(c, null), e.createElement(d, null), !1))
}

function X() {
    let {
        version: o
    } = p();
    (0, m.useEffect)(() => {
        console.log({
            version: o
        })
    }, [])
}

function n({
    children: o
}) {
    return X(), e.createElement("div", {
        className: "remix-app"
    }, e.createElement("header", {
        className: "header"
    }, e.createElement("div", {
        className: "header__content inside-wrapper"
    }, e.createElement("a", {
        className: "header__logo",
        href: "https://zerion.io",
        title: "Zerion homepage"
    }, e.createElement(u, null)), e.createElement("div", {
        className: "header__right"
    }))), e.createElement("div", {
        className: "remix-app__main"
    }, o))
}
export {
    F as CatchBoundary, w as ErrorBoundary, y as
    default, H as links
};