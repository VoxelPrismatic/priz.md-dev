var java_cls = [
    "boolean", "byte", "char", "double", "float", "int", "interface", "long",
    "short", "void", "volatile", "String", "Scanner", "System", "ArrayList",
    "Math", "Boolean", "Byte", "Character", "Double", "Float", "Integer",
    "Long", "Short", "HashMap", "Object"
];

var java_kw = [
    "abstract", "assert", "break", "case", "catch", "class", "const", "continue",
    "default", "do", "else", "enum", "extends", "final", "finally", "for", "goto",
    "if", "implements", "import", "instanceof", "native", "new", "package",
    "private", "protected", "public", "return", "static", "strictfp", "super",
    "switch", "synchronized", "this", "throw", "throws", "transient", "try",
    "while", "true", "false", "null"
];

function java_str_regex(m, b, c) {
    var st = "";
    st = c.split('').join("\u200b");
    return `<span class="str">${b}${st}${b}</span>`;
}

var java_regex = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        java_str_regex
    ], [
        /(')(\\?.?)'/gm,
        java_str_regex
    ],
    ...std_escape__,
    [
        /\\u\{([A-Fa-f0-9\u200b]+\})/gm,
        `<span class="op">\\u$1</span>`
    ], [
        /([\u200b ]*)(public|private|abstract)? (class|implements|extends) ([\w\d_]+)/gm,
        function(m, c, d, a, b) {
            js_cls.push(b);
            return `${a}<span class="kw">${c + d}</span> <span class="cls">${b}</span>`;
        }
    ], [
        /([\w\d_]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ],
    ...std_number__,
    [
        /\/\/(.*)\n/gm,
        function(m, a) {
            return `<span class="comm">//${a.split('').join('\u200b')}</span>\n`;
        }
    ], [
        /([^\u200b])\/\*((.|\n)*)\*\//gm,
        function(m, b, a) {
            return `${b}<span class="comm">/*${a.split('').join('\u200b')}*/</span>`;
        }
    ],
    ...std_err__,
    [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_java__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of java_regex) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax(st, java_kw, java_cls);
}
