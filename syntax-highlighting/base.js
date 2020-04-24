var std_escape__ = [
    [
        /\\u([A-Fa-f0-9\u200b]{4,8})/gm,
        `<span class="op">\\u$1</span>`
    ], [
        /\\x([A-Fa-f0-9\u200b]{2,4})/gm,
        `<span class="op">\\x$1</span>`
    ], [
        /\\(\u200b?.)/gm,
        `<span class="op">\\$1</span>`
    ]
];

var std_number__ = [
    [
        /([^\w\d])(-?0[xbo][A-Fa-f0-9]+)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ], [
        /([^\w\d])(-?\d+([eE._]d+)*j?)/gm,
        function(m, p1, p2) {
            return `${p1}<span class="var">${p2.split('').join('\u200b')}</span>`;
        }
    ]
];

var std_err__ = [
    [
        /([\w\d_]*)(Error|Exception|Failure|Exit|Warning)/gm,
        function(m, p1, p2) {
            return `<span class="err">${(p1 + p2).split('').join('\u200b')}</span>`;
        }
    ], [
        /Stop([\w\d_]+)/gm,
        function(m, p1, p2) {
            return `<span class="err">${("Stop" + p2).split('').join('\u200b')}</span>`;
        }
    ]
]

function mark_syntax(st, kw, cls, aio = true) {
    var sym = "[\\"+"\\.,:;()[]{}~|/-+=*^%&@ ".split('').join("\\")+"]";
    var gsym = "(" + sym + ")";

    for(var r of kw) {
        if(r == "class") {
            r += "[^=]";
        }
        st = st.replace(
            RegExp("^" + r + gsym, "gm"),
            `<span class="kw">${r.split('').join('\u200b')}</span>$1`
        );
        st = st.replace(
            RegExp("(" + sym + "|\n|[\u200b ]+)" + r + gsym, "gm"),
            `$1<span class="kw">${r.split('').join('\u200b')}</span>$2`
        );
        st = st.replace(
            RegExp("^" + r + "$"),
            `<span class="kw">${r.split('').join('\u200b')}</span>`
        );
    }

    for(var r of cls) {
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
    }

    if(aio) {
        for(var r of ["await", "async"]) {
            st = st.replace(
                RegExp("^" + r + gsym, "gm"),
                `<span class="aio">${r.split('').join('\u200b')}</span>$1`
            );
            st = st.replace(
                RegExp("(" + sym + "|\n|[\u200b ]+)" + r + gsym, "gm"),
                `$1<span class="aio">${r.split('').join('\u200b')}</span>$2`
            );
            st = st.replace(
                RegExp("^" + r + "$"),
                `<span class="aio">${r.split('').join('\u200b')}</span>`
            );
        }
    }
    st = st.replace(/\u200b/gm, "");
    return st.replace(/([^ ])\u200b/gm, "$1").replace(/ +\n/gm, "\n");
}
