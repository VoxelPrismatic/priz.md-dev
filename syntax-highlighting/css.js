function css_str_regex(m, b, c) {
    st = c.split('').join("\u200b");
    return `<span class="str">${b}${st}${b}</span>`;
}

var css_regex = [
    [
        /(\~?")(.*?[^\\\n]|)"/gm,
        css_str_regex
    ], [
        /(\~?')(.*?[^\\\n]|)'/gm,
        css_str_regex
    ],
    ...std_escape__,
    [
        /^((\.[\w\d_-]+,?)+)/gm,
        `<span class="fn">$1</span>`
    ], [
        /^((\#[\w\d_-]+,?)+)/gm,
        `<span class="cls">$1</span>`
    ], [
        /^((\@[\w\d_-]+,?)+)/gm,
        `<span class="err">$1</span>`
    ], [
        /\!important/gm,
        `<span class="err">$1</span>`
    ], [
        /([\w- ]+\:?)(.+?);/gm,
        function(m, p1, p2) {
            return `<span class="var">${p1}</span><span class="op">${p2}</span>`;
        }
    ], [
        /([^\w\d])(-?\d+\w+?)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ], [
        /\/\/(.*)\n/gm,
        function(m, a) {
            return `<span class="comm">//${a.split('').join('\u200b')}</span><br>`;
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

function mark_syntax_css(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of js_regex) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax(st, [], [], false, false);
}
