import {
    a as y,
    b as dr,
    f as c,
    h as fr
} from "/discord/_shared/chunk-STFD5DNB.js";
var be = y(ue => {
    c();
    "use strict";
    ue.parse = mr;
    ue.serialize = Sr;
    var hr = decodeURIComponent,
        pr = encodeURIComponent,
        yr = /; */,
        G = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

    function mr(e, r) {
        if (typeof e != "string") throw new TypeError("argument str must be a string");
        for (var t = {}, n = r || {}, a = e.split(yr), o = n.decode || hr, i = 0; i < a.length; i++) {
            var s = a[i],
                u = s.indexOf("=");
            if (!(u < 0)) {
                var l = s.substr(0, u).trim(),
                    d = s.substr(++u, s.length).trim();
                d[0] == '"' && (d = d.slice(1, -1)), t[l] == null && (t[l] = vr(d, o))
            }
        }
        return t
    }

    function Sr(e, r, t) {
        var n = t || {},
            a = n.encode || pr;
        if (typeof a != "function") throw new TypeError("option encode is invalid");
        if (!G.test(e)) throw new TypeError("argument name is invalid");
        var o = a(r);
        if (o && !G.test(o)) throw new TypeError("argument val is invalid");
        var i = e + "=" + o;
        if (n.maxAge != null) {
            var s = n.maxAge - 0;
            if (isNaN(s) || !isFinite(s)) throw new TypeError("option maxAge is invalid");
            i += "; Max-Age=" + Math.floor(s)
        }
        if (n.domain) {
            if (!G.test(n.domain)) throw new TypeError("option domain is invalid");
            i += "; Domain=" + n.domain
        }
        if (n.path) {
            if (!G.test(n.path)) throw new TypeError("option path is invalid");
            i += "; Path=" + n.path
        }
        if (n.expires) {
            if (typeof n.expires.toUTCString != "function") throw new TypeError("option expires is invalid");
            i += "; Expires=" + n.expires.toUTCString()
        }
        if (n.httpOnly && (i += "; HttpOnly"), n.secure && (i += "; Secure"), n.sameSite) {
            var u = typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite;
            switch (u) {
                case !0:
                    i += "; SameSite=Strict";
                    break;
                case "lax":
                    i += "; SameSite=Lax";
                    break;
                case "strict":
                    i += "; SameSite=Strict";
                    break;
                case "none":
                    i += "; SameSite=None";
                    break;
                default:
                    throw new TypeError("option sameSite is invalid")
            }
        }
        return i
    }

    function vr(e, r) {
        try {
            return r(e)
        } catch {
            return e
        }
    }
});
var Z = y(Q => {
    c();
    "use strict";
    Object.defineProperty(Q, "__esModule", {
        value: !0
    });
    var je = be();

    function wr(e, {
        secrets: r = [],
        ...t
    } = {}) {
        return {
            get name() {
                return e
            },
            get isSigned() {
                return r.length > 0
            },
            get expires() {
                return typeof t.maxAge != "undefined" ? new Date(Date.now() + t.maxAge * 1e3) : t.expires
            },
            async parse(n, a) {
                if (!n) return null;
                let o = je.parse(n, {
                    ...t,
                    ...a
                });
                return e in o ? o[e] === "" ? "" : await xr(o[e], r) : null
            },
            async serialize(n, a) {
                return je.serialize(e, n === "" ? "" : await Rr(n, r), {
                    ...t,
                    ...a
                })
            }
        }
    }

    function gr(e) {
        return e != null && typeof e.name == "string" && typeof e.isSigned == "boolean" && typeof e.parse == "function" && typeof e.serialize == "function"
    }
    async function Rr(e, r) {
        let t = _r(e);
        return r.length > 0 && (t = await sign(t, r[0])), t
    }
    async function xr(e, r) {
        if (r.length > 0) {
            for (let t of r) {
                let n = await unsign(e, t);
                if (n !== !1) return ke(n)
            }
            return null
        }
        return ke(e)
    }

    function _r(e) {
        return btoa(JSON.stringify(e))
    }

    function ke(e) {
        try {
            return JSON.parse(atob(e))
        } catch {
            return {}
        }
    }
    Q.createCookie = wr;
    Q.isCookie = gr
});
var ee = y(B => {
    c();
    "use strict";
    Object.defineProperty(B, "__esModule", {
        value: !0
    });

    function Cr(e, r = {}) {
        let t = r;
        typeof r == "number" && (t = {
            status: r
        });
        let n = new Headers(t.headers);
        return n.has("Content-Type") || n.set("Content-Type", "application/json; charset=utf-8"), new Response(JSON.stringify(e), {
            ...t,
            headers: n
        })
    }

    function br(e, r = 302) {
        let t = r;
        typeof t == "number" ? t = {
            status: t
        } : typeof t.status == "undefined" && (t.status = 302);
        let n = new Headers(t.headers);
        return n.set("Location", e), new Response(null, {
            ...t,
            headers: n
        })
    }

    function jr(e) {
        return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.headers == "object" && typeof e.body != "undefined"
    }
    var kr = new Set([301, 302, 303, 307, 308]);

    function Mr(e) {
        return kr.has(e.status)
    }

    function Er(e) {
        return e.headers.get("X-Remix-Catch") != null
    }
    B.isCatchResponse = Er;
    B.isRedirectResponse = Mr;
    B.isResponse = jr;
    B.json = Cr;
    B.redirect = br
});
var De = y(N => {
    c();
    "use strict";
    Object.defineProperty(N, "__esModule", {
        value: !0
    });
    var M = ee();
    async function Dr({
        loadContext: e,
        match: r,
        request: t
    }) {
        let n = r.route.module.action;
        if (!n) throw new Error(`You made a ${t.method} request to ${t.url} but did not provide an \`action\` for route "${r.route.id}", so there is no way to handle the request.`);
        let a;
        try {
            a = await n({
                request: Ee(Me(t.clone())),
                context: e,
                params: r.params
            })
        } catch (o) {
            if (!M.isResponse(o)) throw o;
            M.isRedirectResponse(o) || o.headers.set("X-Remix-Catch", "yes"), a = o
        }
        if (a === void 0) throw new Error(`You defined an action for route "${r.route.id}" but didn't return anything from your \`action\` function. Please return a value or \`null\`.`);
        return M.isResponse(a) ? a : M.json(a)
    }
    async function Or({
        loadContext: e,
        match: r,
        request: t
    }) {
        let n = r.route.module.loader;
        if (!n) throw new Error(`You made a ${t.method} request to ${t.url} but did not provide a \`loader\` for route "${r.route.id}", so there is no way to handle the request.`);
        let a;
        try {
            a = await n({
                request: Ee(Me(t.clone())),
                context: e,
                params: r.params
            })
        } catch (o) {
            if (!M.isResponse(o)) throw o;
            M.isRedirectResponse(o) || o.headers.set("X-Remix-Catch", "yes"), a = o
        }
        if (a === void 0) throw new Error(`You defined a loader for route "${r.route.id}" but didn't return anything from your \`loader\` function. Please return a value or \`null\`.`);
        return M.isResponse(a) ? a : M.json(a)
    }

    function Me(e) {
        let r = new URL(e.url),
            t = r.searchParams.getAll("index");
        r.searchParams.delete("index");
        let n = [];
        for (let a of t) a && n.push(a);
        for (let a of n) r.searchParams.append("index", a);
        return new Request(r.href, e)
    }

    function Ee(e) {
        let r = new URL(e.url);
        return r.searchParams.delete("_data"), new Request(r.href, e)
    }

    function Br(e) {
        let r = e.headers.get("Content-Type");
        return r && /\bapplication\/json\b/.test(r) ? e.json() : e.text()
    }
    N.callRouteAction = Dr;
    N.callRouteLoader = Or;
    N.extractData = Br
});
var Oe = y(re => {
    c();
    "use strict";
    Object.defineProperty(re, "__esModule", {
        value: !0
    });

    function Tr(e, r) {
        return e.map(t => ({
            params: t.params,
            pathname: t.pathname,
            route: r[t.route.id]
        }))
    }

    function Pr(e) {
        return Object.keys(e).reduce((r, t) => (r[t] = e[t].module, r), {})
    }
    re.createEntryMatches = Tr;
    re.createEntryRouteModules = Pr
});
var Be = y(ce => {
    c();
    "use strict";
    Object.defineProperty(ce, "__esModule", {
        value: !0
    });
    async function qr(e) {
        return {
            message: e.message,
            stack: e.stack
        }
    }
    ce.serializeError = qr
});
var Pe = y((It, U) => {
    c();
    "use strict";
    var I = {
        decodeValues: !0,
        map: !1,
        silent: !1
    };

    function le(e) {
        return typeof e == "string" && !!e.trim()
    }

    function de(e, r) {
        var t = e.split(";").filter(le),
            n = t.shift().split("="),
            a = n.shift(),
            o = n.join("=");
        r = r ? Object.assign({}, I, r) : I;
        try {
            o = r.decodeValues ? decodeURIComponent(o) : o
        } catch (s) {
            console.error("set-cookie-parser encountered an error while decoding a cookie with value '" + o + "'. Set options.decodeValues to false to disable this feature.", s)
        }
        var i = {
            name: a,
            value: o
        };
        return t.forEach(function (s) {
            var u = s.split("="),
                l = u.shift().trimLeft().toLowerCase(),
                d = u.join("=");
            l === "expires" ? i.expires = new Date(d) : l === "max-age" ? i.maxAge = parseInt(d, 10) : l === "secure" ? i.secure = !0 : l === "httponly" ? i.httpOnly = !0 : l === "samesite" ? i.sameSite = d : i[l] = d
        }), i
    }

    function Te(e, r) {
        if (r = r ? Object.assign({}, I, r) : I, !e) return r.map ? {} : [];
        if (e.headers && e.headers["set-cookie"]) e = e.headers["set-cookie"];
        else if (e.headers) {
            var t = e.headers[Object.keys(e.headers).find(function (a) {
                return a.toLowerCase() === "set-cookie"
            })];
            !t && e.headers.cookie && !r.silent && console.warn("Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."), e = t
        }
        if (Array.isArray(e) || (e = [e]), r = r ? Object.assign({}, I, r) : I, r.map) {
            var n = {};
            return e.filter(le).reduce(function (a, o) {
                var i = de(o, r);
                return a[i.name] = i, a
            }, n)
        } else return e.filter(le).map(function (a) {
            return de(a, r)
        })
    }

    function Ir(e) {
        if (Array.isArray(e)) return e;
        if (typeof e != "string") return [];
        var r = [],
            t = 0,
            n, a, o, i, s;

        function u() {
            for (; t < e.length && /\s/.test(e.charAt(t));) t += 1;
            return t < e.length
        }

        function l() {
            return a = e.charAt(t), a !== "=" && a !== ";" && a !== ","
        }
        for (; t < e.length;) {
            for (n = t, s = !1; u();)
                if (a = e.charAt(t), a === ",") {
                    for (o = t, t += 1, u(), i = t; t < e.length && l();) t += 1;
                    t < e.length && e.charAt(t) === "=" ? (s = !0, t = i, r.push(e.substring(n, o)), n = t) : t = o + 1
                } else t += 1;
            (!s || t >= e.length) && r.push(e.substring(n, e.length))
        }
        return r
    }
    U.exports = Te;
    U.exports.parse = Te;
    U.exports.parseString = de;
    U.exports.splitCookiesString = Ir
});
var qe = y(he => {
    c();
    "use strict";
    Object.defineProperty(he, "__esModule", {
        value: !0
    });
    var Lr = Pe();

    function Ar(e, r, t, n) {
        return r.reduce((a, o, i) => {
            let s = e.routes[o.route.id].module,
                u = t[i] ? t[i].headers : new Headers,
                l = n ? n.headers : new Headers,
                d = new Headers(s.headers ? typeof s.headers == "function" ? s.headers({
                    loaderHeaders: u,
                    parentHeaders: a,
                    actionHeaders: l
                }) : s.headers : void 0);
            return fe(l, d), fe(u, d), fe(a, d), d
        }, new Headers)
    }

    function fe(e, r) {
        let t = e.get("Set-Cookie");
        t && Lr.splitCookiesString(t).forEach(a => {
            r.append("Set-Cookie", a)
        })
    }
    he.getDocumentHeaders = Ar
});
var Ie = y(pe => {
    c();
    "use strict";
    Object.defineProperty(pe, "__esModule", {
        value: !0
    });
    var Hr = fr();

    function $r(e, r) {
        let t = Hr.matchRoutes(e, r);
        return t ? t.map(n => ({
            params: n.params,
            pathname: n.pathname,
            route: n.route
        })) : null
    }
    pe.matchServerRoutes = $r
});
var Le = y(C => {
    c();
    "use strict";
    Object.defineProperty(C, "__esModule", {
        value: !0
    });
    C.ServerMode = void 0;
    (function (e) {
        e.Development = "development", e.Production = "production", e.Test = "test"
    })(C.ServerMode || (C.ServerMode = {}));

    function Fr(e) {
        return e === C.ServerMode.Development || e === C.ServerMode.Production || e === C.ServerMode.Test
    }
    C.isServerMode = Fr
});
var He = y(ye => {
    c();
    "use strict";
    Object.defineProperty(ye, "__esModule", {
        value: !0
    });

    function Ae(e, r) {
        return Object.keys(e).filter(t => e[t].parentId === r).map(t => ({
            ...e[t],
            children: Ae(e, t)
        }))
    }
    ye.createRoutes = Ae
});
var Ue = y((Ft, Ne) => {
    c();
    "use strict";
    var $e = {},
        Nr = $e.hasOwnProperty,
        Fe = (e, r) => {
            for (let t in e) Nr.call(e, t) && r(t, e[t])
        },
        Ur = (e, r) => (r && Fe(r, (t, n) => {
            e[t] = n
        }), e),
        zr = (e, r) => {
            let t = e.length,
                n = -1;
            for (; ++n < t;) r(e[n])
        },
        te = e => "\\u" + ("0000" + e).slice(-4),
        z = (e, r) => {
            let t = e.toString(16);
            return r ? t : t.toUpperCase()
        },
        V = $e.toString,
        Vr = Array.isArray,
        Jr = e => typeof Buffer == "function" && Buffer.isBuffer(e),
        Wr = e => V.call(e) == "[object Object]",
        Xr = e => typeof e == "string" || V.call(e) == "[object String]",
        Yr = e => typeof e == "number" || V.call(e) == "[object Number]",
        Kr = e => typeof e == "function",
        Gr = e => V.call(e) == "[object Map]",
        Qr = e => V.call(e) == "[object Set]",
        Zr = {
            "\\": "\\\\",
            "\b": "\\b",
            "\f": "\\f",
            "\n": "\\n",
            "\r": "\\r",
            "	": "\\t"
        },
        et = /[\\\b\f\n\r\t]/,
        rt = /[0-9]/,
        tt = /[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
        nt = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^]/g,
        at = /([\uD800-\uDBFF][\uDC00-\uDFFF])|([\uD800-\uDFFF])|(['"`])|[^ !#-&\(-\[\]-_a-~]/g,
        E = (e, r) => {
            let t = () => {
                    l = u, ++r.indentLevel, u = r.indent.repeat(r.indentLevel)
                },
                n = {
                    escapeEverything: !1,
                    minimal: !1,
                    isScriptContext: !1,
                    quotes: "single",
                    wrap: !1,
                    es6: !1,
                    json: !1,
                    compact: !0,
                    lowercaseHex: !1,
                    numbers: "decimal",
                    indent: "	",
                    indentLevel: 0,
                    __inline1__: !1,
                    __inline2__: !1
                },
                a = r && r.json;
            a && (n.quotes = "double", n.wrap = !0), r = Ur(n, r), r.quotes != "single" && r.quotes != "double" && r.quotes != "backtick" && (r.quotes = "single");
            let o = r.quotes == "double" ? '"' : r.quotes == "backtick" ? "`" : "'",
                i = r.compact,
                s = r.lowercaseHex,
                u = r.indent.repeat(r.indentLevel),
                l = "",
                d = r.__inline1__,
                h = r.__inline2__,
                j = i ? "" : `
`,
                f, T = !0,
                J = r.numbers == "binary",
                W = r.numbers == "octal",
                oe = r.numbers == "decimal",
                ie = r.numbers == "hexadecimal";
            if (a && e && Kr(e.toJSON) && (e = e.toJSON()), !Xr(e)) {
                if (Gr(e)) return e.size == 0 ? "new Map()" : (i || (r.__inline1__ = !0, r.__inline2__ = !1), "new Map(" + E(Array.from(e), r) + ")");
                if (Qr(e)) return e.size == 0 ? "new Set()" : "new Set(" + E(Array.from(e), r) + ")";
                if (Jr(e)) return e.length == 0 ? "Buffer.from([])" : "Buffer.from(" + E(Array.from(e), r) + ")";
                if (Vr(e)) return f = [], r.wrap = !0, d && (r.__inline1__ = !1, r.__inline2__ = !0), h || t(), zr(e, S => {
                    T = !1, h && (r.__inline2__ = !1), f.push((i || h ? "" : u) + E(S, r))
                }), T ? "[]" : h ? "[" + f.join(", ") + "]" : "[" + j + f.join("," + j) + j + (i ? "" : l) + "]";
                if (Yr(e)) {
                    if (a) return JSON.stringify(e);
                    if (oe) return String(e);
                    if (ie) {
                        let S = e.toString(16);
                        return s || (S = S.toUpperCase()), "0x" + S
                    }
                    if (J) return "0b" + e.toString(2);
                    if (W) return "0o" + e.toString(8)
                } else return Wr(e) ? (f = [], r.wrap = !0, t(), Fe(e, (S, x) => {
                    T = !1, f.push((i ? "" : u) + E(S, r) + ":" + (i ? "" : " ") + E(x, r))
                }), T ? "{}" : "{" + j + f.join("," + j) + j + (i ? "" : l) + "}") : a ? JSON.stringify(e) || "null" : String(e)
            }
            let X = r.escapeEverything ? nt : at;
            return f = e.replace(X, (S, x, k, D, $, Y) => {
                if (x) {
                    if (r.minimal) return x;
                    let P = x.charCodeAt(0),
                        q = x.charCodeAt(1);
                    if (r.es6) {
                        let K = (P - 55296) * 1024 + q - 56320 + 65536,
                            p = z(K, s);
                        return "\\u{" + p + "}"
                    }
                    return te(z(P, s)) + te(z(q, s))
                }
                if (k) return te(z(k.charCodeAt(0), s));
                if (S == "\0" && !a && !rt.test(Y.charAt($ + 1))) return "\\0";
                if (D) return D == o || r.escapeEverything ? "\\" + D : D;
                if (et.test(S)) return Zr[S];
                if (r.minimal && !tt.test(S)) return S;
                let F = z(S.charCodeAt(0), s);
                return a || F.length > 2 ? te(F) : "\\x" + ("00" + F).slice(-2)
            }), o == "`" && (f = f.replace(/\$\{/g, "\\${")), r.isScriptContext && (f = f.replace(/<\/(script|style)/gi, "<\\/$1").replace(/<!--/g, a ? "\\u003C!--" : "\\x3C!--")), r.wrap && (f = o + f + o), f
        };
    E.version = "3.0.2";
    Ne.exports = E
});
var ze = y(me => {
    c();
    "use strict";
    Object.defineProperty(me, "__esModule", {
        value: !0
    });
    var st = Ue();

    function ot(e) {
        return e && typeof e == "object" && "default" in e ? e : {
            default: e
        }
    }
    var it = ot(st);

    function ut(e) {
        return it.default(e, {
            isScriptContext: !0
        })
    }
    me.createServerHandoffString = ut
});
var Ke = y(ve => {
    c();
    "use strict";
    Object.defineProperty(ve, "__esModule", {
        value: !0
    });
    var g = De(),
        Ve = Oe(),
        ne = Be(),
        ct = qe(),
        lt = Ie(),
        R = Le(),
        dt = He(),
        L = ee(),
        Je = ze();

    function ft(e, r, t) {
        let n = dt.createRoutes(e.routes),
            a = R.isServerMode(t) ? t : R.ServerMode.Production;
        return async function (i, s) {
            let u = new URL(i.url),
                l = lt.matchServerRoutes(n, u.pathname),
                d = mt(u, l),
                h;
            switch (d) {
                case "data":
                    h = await ht({
                        request: i,
                        loadContext: s,
                        matches: l,
                        handleDataRequest: e.entry.module.handleDataRequest,
                        serverMode: a
                    });
                    break;
                case "document":
                    h = await pt({
                        build: e,
                        loadContext: s,
                        matches: l,
                        request: i,
                        routes: n,
                        serverMode: a
                    });
                    break;
                case "resource":
                    h = await yt({
                        request: i,
                        loadContext: s,
                        matches: l,
                        serverMode: a
                    });
                    break
            }
            return i.method.toLowerCase() === "head" ? new Response(null, {
                headers: h.headers,
                status: h.status,
                statusText: h.statusText
            }) : h
        }
    }
    async function ht({
        handleDataRequest: e,
        loadContext: r,
        matches: t,
        request: n,
        serverMode: a
    }) {
        if (!We(n)) return A(new Error(`Invalid request method "${n.method}"`), 405);
        let o = new URL(n.url);
        if (!t) return A(new Error(`No route matches URL "${o.pathname}"`), 404);
        let i, s;
        try {
            if (ae(n)) s = Xe(o, t), i = await g.callRouteAction({
                loadContext: r,
                match: s,
                request: n
            });
            else {
                let u = o.searchParams.get("_data");
                if (!u) return A(new Error("Missing route id in ?_data"), 403);
                let l = t.find(d => d.route.id === u);
                if (!l) return A(new Error(`Route "${u}" does not match URL "${o.pathname}"`), 403);
                s = l, i = await g.callRouteLoader({
                    loadContext: r,
                    match: s,
                    request: n
                })
            }
            if (L.isRedirectResponse(i)) {
                let u = new Headers(i.headers);
                return u.set("X-Remix-Redirect", u.get("Location")), u.delete("Location"), new Response(null, {
                    status: 204,
                    headers: u
                })
            }
            return e && (i = await e(i.clone(), {
                context: r,
                params: s.params,
                request: n.clone()
            })), i
        } catch (u) {
            return a !== R.ServerMode.Test && console.error(u), a === R.ServerMode.Development ? A(u, 500) : A(new Error("Unexpected Server Error"), 500)
        }
    }
    async function pt({
        build: e,
        loadContext: r,
        matches: t,
        request: n,
        routes: a,
        serverMode: o
    }) {
        let i = new URL(n.url),
            s = {
                trackBoundaries: !0,
                trackCatchBoundaries: !0,
                catchBoundaryRouteId: null,
                renderBoundaryRouteId: null,
                loaderBoundaryRouteId: null,
                error: void 0,
                catch: void 0
            };
        We(n) ? t || (s.trackCatchBoundaries = !1, s.catch = {
            data: null,
            status: 404,
            statusText: "Not Found"
        }) : (t = null, s.trackCatchBoundaries = !1, s.catch = {
            data: null,
            status: 405,
            statusText: "Method Not Allowed"
        });
        let u, l, d, h;
        if (t && ae(n)) {
            d = Xe(i, t);
            try {
                if (h = await g.callRouteAction({
                        loadContext: r,
                        match: d,
                        request: n
                    }), L.isRedirectResponse(h)) return h;
                u = {
                    status: h.status,
                    statusText: h.statusText
                }, L.isCatchResponse(h) ? (s.catchBoundaryRouteId = Ye(t, "CatchBoundary"), s.trackCatchBoundaries = !1, s.catch = {
                    ...u,
                    data: await g.extractData(h)
                }) : l = {
                    [d.route.id]: await g.extractData(h)
                }
            } catch (p) {
                s.loaderBoundaryRouteId = Ye(t, "ErrorBoundary"), s.trackBoundaries = !1, s.error = await ne.serializeError(p), o !== R.ServerMode.Test && console.error(`There was an error running the action for route ${d.route.id}`)
            }
        }
        let j = Ve.createEntryRouteModules(e.routes),
            f = t || [];
        s.catch ? f = Se(f.slice(0, -1), "CatchBoundary") : s.error && (f = Se(f.slice(0, -1), "ErrorBoundary"));
        let T = await Promise.allSettled(f.map(p => p.route.module.loader ? g.callRouteLoader({
                loadContext: r,
                match: p,
                request: n
            }) : Promise.resolve(void 0))),
            J = s.catch,
            W = s.error,
            oe = s.catchBoundaryRouteId,
            ie = s.loaderBoundaryRouteId;
        s.catch = void 0, s.error = void 0;
        let X = [],
            S = [],
            x = {};
        for (let p = 0; p < f.length; p++) {
            let _ = f[p],
                O = T[p],
                Ce = O.status === "rejected" ? O.reason : void 0,
                v = O.status === "fulfilled" ? O.value : void 0,
                cr = v ? L.isRedirectResponse(v) : !1,
                lr = v ? L.isCatchResponse(v) : !1;
            if (s.catch || s.error) break;
            if (!J && !W && v && cr) return v;
            if (_.route.module.CatchBoundary && (s.catchBoundaryRouteId = _.route.id), _.route.module.ErrorBoundary && (s.loaderBoundaryRouteId = _.route.id), Ce) {
                S.push(500), s.trackBoundaries = !1, s.error = await ne.serializeError(Ce), o !== R.ServerMode.Test && console.error(`There was an error running the data loader for route ${_.route.id}`);
                break
            } else if (v)
                if (X.push(v), S.push(v.status), lr) {
                    s.trackCatchBoundaries = !1, s.catch = {
                        data: await g.extractData(v),
                        status: v.status,
                        statusText: v.statusText
                    };
                    break
                } else x[_.route.id] = await g.extractData(v)
        }
        s.catch || (s.catchBoundaryRouteId = oe), s.error || (s.loaderBoundaryRouteId = ie), s.catch = J || s.catch, s.error = W || s.error;
        let k = wt(t, s);
        if (!k) {
            k = [];
            let p = a[0];
            p != null && p.module.CatchBoundary && (s.catchBoundaryRouteId = "root", k.push({
                params: {},
                pathname: "",
                route: a[0]
            }))
        }
        let D = u && u.status !== 200 ? u.status : S.find(p => p !== 200),
            $ = s.error ? 500 : typeof D == "number" ? D : s.catch ? s.catch.status : 200,
            Y = ct.getDocumentHeaders(e, k, X, h),
            F = Ve.createEntryMatches(k, e.assets.routes),
            P = {
                actionData: l,
                appState: s,
                matches: F,
                routeData: x
            },
            q = {
                ...P,
                manifest: e.assets,
                routeModules: j,
                serverHandoffString: Je.createServerHandoffString(P)
            },
            K = e.entry.module.default;
        try {
            return await K(n.clone(), $, Y, q)
        } catch (p) {
            $ = 500, s.trackBoundaries = !1, s.error = await ne.serializeError(p), q.serverHandoffString = Je.createServerHandoffString(P);
            try {
                return await K(n.clone(), $, Y, q)
            } catch (_) {
                o !== R.ServerMode.Test && console.error(_);
                let O = "Unexpected Server Error";
                return o === R.ServerMode.Development && (O += `

${String(_)}`), new Response(O, {
                    status: 500,
                    headers: {
                        "Content-Type": "text/plain"
                    }
                })
            }
        }
    }
    async function yt({
        loadContext: e,
        matches: r,
        request: t,
        serverMode: n
    }) {
        let a = r.slice(-1)[0];
        try {
            return ae(t) ? await g.callRouteAction({
                match: a,
                loadContext: e,
                request: t
            }) : await g.callRouteLoader({
                match: a,
                loadContext: e,
                request: t
            })
        } catch (o) {
            n !== R.ServerMode.Test && console.error(o);
            let i = "Unexpected Server Error";
            return n === R.ServerMode.Development && (i += `

${String(o)}`), new Response(i, {
                status: 500,
                headers: {
                    "Content-Type": "text/plain"
                }
            })
        }
    }

    function mt(e, r) {
        return e.searchParams.has("_data") ? "data" : r ? r.slice(-1)[0].route.module.default ? "document" : "resource" : "document"
    }

    function ae(e) {
        let r = e.method.toLowerCase();
        return r === "post" || r === "put" || r === "patch" || r === "delete"
    }

    function St(e) {
        return e.method.toLowerCase() === "head"
    }

    function We(e) {
        return e.method.toLowerCase() === "get" || St(e) || ae(e)
    }
    async function A(e, r) {
        return L.json(await ne.serializeError(e), {
            status: r,
            headers: {
                "X-Remix-Error": "yes"
            }
        })
    }

    function vt(e) {
        let r = !1;
        for (let t of e.searchParams.getAll("index")) t || (r = !0);
        return r
    }

    function Xe(e, r) {
        let t = r.slice(-1)[0];
        return !vt(e) && t.route.id.endsWith("/index") ? r.slice(-2)[0] : t
    }

    function Ye(e, r) {
        let t = Se(e, r).slice(-1)[0];
        return t ? t.route.id : null
    }

    function Se(e, r) {
        let t = -1;
        return e.forEach((n, a) => {
            n.route.module[r] && (t = a)
        }), t === -1 ? [] : e.slice(0, t + 1)
    }

    function wt(e, r) {
        if (!e) return null;
        if (!r.catch && !r.error) return e;
        let t = -1;
        return e.forEach((n, a) => {
            let o = n.route.id;
            (r.renderBoundaryRouteId === o || r.loaderBoundaryRouteId === o || r.catchBoundaryRouteId === o) && (t = a)
        }), e.slice(0, t + 1)
    }
    ve.createRequestHandler = ft
});
var Qe = y(we => {
    c();
    "use strict";
    Object.defineProperty(we, "__esModule", {
        value: !0
    });
    var Ge = {};

    function gt(e, r) {
        !e && !Ge[r] && (Ge[r] = !0, console.warn(r))
    }
    we.warnOnce = gt
});
var se = y(H => {
    c();
    "use strict";
    Object.defineProperty(H, "__esModule", {
        value: !0
    });
    var Ze = Z(),
        Rt = Qe();

    function ge(e) {
        return `__flash_${e}__`
    }

    function er(e = {}, r = "") {
        let t = new Map(Object.entries(e));
        return {
            get id() {
                return r
            },
            get data() {
                return Object.fromEntries(t)
            },
            has(n) {
                return t.has(n) || t.has(ge(n))
            },
            get(n) {
                if (t.has(n)) return t.get(n);
                let a = ge(n);
                if (t.has(a)) {
                    let o = t.get(a);
                    return t.delete(a), o
                }
            },
            set(n, a) {
                t.set(n, a)
            },
            flash(n, a) {
                t.set(ge(n), a)
            },
            unset(n) {
                t.delete(n)
            }
        }
    }

    function xt(e) {
        return e != null && typeof e.id == "string" && typeof e.data != "undefined" && typeof e.has == "function" && typeof e.get == "function" && typeof e.set == "function" && typeof e.flash == "function" && typeof e.unset == "function"
    }

    function _t({
        cookie: e,
        createData: r,
        readData: t,
        updateData: n,
        deleteData: a
    }) {
        let o = Ze.isCookie(e) ? e : Ze.createCookie((e == null ? void 0 : e.name) || "__session", e);
        return rr(o), {
            async getSession(i, s) {
                let u = i && await o.parse(i, s),
                    l = u && await t(u);
                return er(l || {}, u || "")
            },
            async commitSession(i, s) {
                let {
                    id: u,
                    data: l
                } = i;
                return u ? await n(u, l, o.expires) : u = await r(l, o.expires), o.serialize(u, s)
            },
            async destroySession(i, s) {
                return await a(i.id), o.serialize("", {
                    ...s,
                    expires: new Date(0)
                })
            }
        }
    }

    function rr(e) {
        Rt.warnOnce(e.isSigned, `The "${e.name}" cookie is not signed, but session cookies should be signed to prevent tampering on the client before they are sent back to the server. See https://remix.run/docs/en/v1/api/remix#signing-cookies for more information.`)
    }
    H.createSession = er;
    H.createSessionStorage = _t;
    H.isSession = xt;
    H.warnOnceAboutSigningSessionCookie = rr
});
var ar = y(Re => {
    c();
    "use strict";
    Object.defineProperty(Re, "__esModule", {
        value: !0
    });
    var tr = Z(),
        nr = se();

    function Ct({
        cookie: e
    } = {}) {
        let r = tr.isCookie(e) ? e : tr.createCookie((e == null ? void 0 : e.name) || "__session", e);
        return nr.warnOnceAboutSigningSessionCookie(r), {
            async getSession(t, n) {
                return nr.createSession(t && await r.parse(t, n) || {})
            },
            async commitSession(t, n) {
                return r.serialize(t.data, n)
            },
            async destroySession(t, n) {
                return r.serialize("", {
                    ...n,
                    expires: new Date(0)
                })
            }
        }
    }
    Re.createCookieSessionStorage = Ct
});
var sr = y(xe => {
    c();
    "use strict";
    Object.defineProperty(xe, "__esModule", {
        value: !0
    });
    var bt = se();

    function jt({
        cookie: e
    } = {}) {
        let r = 0,
            t = new Map;
        return bt.createSessionStorage({
            cookie: e,
            async createData(n, a) {
                let o = (++r).toString();
                return t.set(o, {
                    data: n,
                    expires: a
                }), o
            },
            async readData(n) {
                if (t.has(n)) {
                    let {
                        data: a,
                        expires: o
                    } = t.get(n);
                    if (!o || o > new Date) return a;
                    o && t.delete(n)
                }
                return null
            },
            async updateData(n, a, o) {
                t.set(n, {
                    data: a,
                    expires: o
                })
            },
            async deleteData(n) {
                t.delete(n)
            }
        })
    }
    xe.createMemorySessionStorage = jt
});
var ur = y(w => {
    c();
    "use strict";
    Object.defineProperty(w, "__esModule", {
        value: !0
    });
    var or = Z(),
        ir = ee(),
        kt = Ke(),
        _e = se(),
        Mt = ar(),
        Et = sr();
    w.createCookie = or.createCookie;
    w.isCookie = or.isCookie;
    w.json = ir.json;
    w.redirect = ir.redirect;
    w.createRequestHandler = kt.createRequestHandler;
    w.createSession = _e.createSession;
    w.createSessionStorage = _e.createSessionStorage;
    w.isSession = _e.isSession;
    w.createCookieSessionStorage = Mt.createCookieSessionStorage;
    w.createMemorySessionStorage = Et.createMemorySessionStorage
});
c();
var b = dr(ur());
export {
    b as a
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
/**
 * @remix-run/server-runtime v1.1.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */