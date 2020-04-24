var js_cls = [
    "AggregateError", "Array", "ArrayBuffer", "AsyncFunction", "AsyncIterator",
    "Atomics", "BigInt", "BigInt64Array", "BigUint64Array", "Boolean", "DataView",
    "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function",
    "Generator", "GeneratorFunction", "Infinity", "Int16Array", "Int32Array",
    "Int8Array", "InternalError", "Intl", "Intl.Collator", "Intl.DateTimeFormat",
    "Intl.DisplayNames", "Intl.ListFormat", "Intl.Locale", "Intl.NumberFormat",
    "Intl.PluralRules", "Intl.RelativeTimeFormat", "Iterator", "JSON", "Map",
    "Math", "NaN", "Number", "Object", "Promise", "Proxy", "RangeError",
    "ReferenceError", "Reflect", "RegExp", "Set", "SharedArrayBuffer",
    "String", "Symbol", "SyntaxError", "TypeError", "TypedArray", "URIError",
    "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray", "WeakMap",
    "WeakSet", "WebAssembly", "null"
];

var js_kw = [
    "async", "function", "block", "break", "class", "const", "continue",
    "debugger", "default", "do", "while", "empty", "export", "for", "of",
    "function*", "if", "else", "import", "import.meta", "label", "let",
    "return", "throw", "try", "catch", "var", "with", "delete", "in", "new",
    "instanceof", "new", "this", "super", "typeof", "void", "yield", "yield*",

];

function js_str_regex(m, b, c) {
    var st = "";
    st = c.split('').join("\u200b");
    return `<span class="str">${b}${st}${b}</span>`;
}

var js_regex = [
    [
        /(\/)(.*)\//gm,
        js_str_regex
    ], [
        /(')(.*?)'/gm,
        js_str_regex
    ], [
        /(")(.*?)"/gm,
        js_str_regex
    ], [
        /(\`)((.|\n)*)\`/gm,
        js_str_regex
    ], [
        /\\u([A-Fa-f0-9\u200b]{8})/gm,
        `<span class="op">\\u$1</span>`
    ], [
        /\\u\{([A-Fa-f0-9\u200b]+\})/gm,
        `<span class="op">\\u$1</span>`
    ], [
        /\\(.)/gm,
        `<span class="op">\\$1</span>`
    ], [
        /^([\u200b ]*)function ([\w\d_]+)/gm,
        `$1<span class="kw">def</span> <span class="fn">$2</span>`
    ], [
        /^([\u200b ]*)class ([\w\d_]+)/gm,
        function(m, a, b) {
            cls.push(b);
            return `${a}<span class="kw">class</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([\w\d_]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ], [
        /([^\u200b])\/\/(.*)$/gm,
        function(m, b, a) {
            return `${b}<span class="comm">#${a.split('').join('\u200b')}</span>`;
        }
    ], [
        /^\/\/(.*)$/gm,
        function(m, a) {
            return `<span class="comm">#${a.split('').join('\u200b')}</span>`;
        }
    ], [
        /([^\w\d])(-?0x[A-Fa-f0-9]+)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ], [
        /([^\w\d])(-?\d+(\.\d+)?j?)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ], [
        /([\w\d_]*)(Error|Exception|Failure|Exit|Warning)/gm,
        function(m, p1, p2) {
            return `<span class="err">${(p1 + p2).split('').join('\u200b')}</span>`;
        }
    ], [
        /Stop([\w\d_]+)/gm,
        function(m, p1, p2) {
            return `<span class="err">${("Stop" + p2).split('').join('\u200b')}</span>`;
        }
    ], [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_js(st) {
    st = st.replace(/\n/gm, " \n");
    var sym = "[\\"+"\\.,:;()[]{}~|/-+=*^%&@ ".split('').join("\\")+"]";
    var gsym = "("+sym+")";
    for(var r of js_regex) {
        st = st.replace(r[0], r[1]);
    } for(var r of js_cls) {
        st = st.replace(
            RegExp("^" + r + gsym, "gm"),
            `<span class="cls">${r.split('').join('\u200b')}</span>$1`
        );
        st = st.replace(
            RegExp("(" + sym + "|\n|[\u200b ]+)" + r + gsym, "gm"),
            `$1<span class="cls">${r.split('').join('\u200b')}</span>$2`
        );
        st = st.replace(
            RegExp("^" + r + "$"),
            `<span class="cls">${r.split('').join('\u200b')}</span>`
        );
    } for(var r of js_kw) {
        st = st.replace(
            RegExp("^"+r+gsym, "gm"),
            `<span class="kw">${r.split('').join('\u200b')}</span>$1`
        );
        st = st.replace(
            RegExp("("+sym+"|\n|[\u200b ]+)"+r+gsym, "gm"),
            `$1<span class="kw">${r.split('').join('\u200b')}</span>$2`
        );
        st = st.replace(
            RegExp("^" + r + "$"),
            `<span class="kw">${r.split('').join('\u200b')}</span>`
        );
    } for(var r of ["await", "async"]) {
        st = st.replace(
            RegExp("^"+r+gsym, "gm"),
            `<span class="aio">${r.split('').join('\u200b')}</span>$1`
        );
        st = st.replace(
            RegExp("("+sym+"|\n|[\u200b ]+)"+r+gsym, "gm"),
            `$1<span class="aio">${r.split('').join('\u200b')}</span>$2`
        );
        st = st.replace(
            RegExp("^" + r + "$"),
            `<span class="aio">${r.split('').join('\u200b')}</span>`
        );
    }
    st = st.replace(/\u200b/gm, "");
    return st.replace(/([^ ])\u200b/gm, "$1").replace(/ +\n/gm, "\n");
}
