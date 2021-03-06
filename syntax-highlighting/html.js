var html_regex__ = [
    [
        /([^\\])<((.|\n)+?)>/gm,
        function(m, p2, p1) {
            st = "";
            if(p1.toLowerCase().startsWith("!doctype")) {
                return `${p2}<span class="var">&lt;${p1.split(" ")[0]} <b>${p1.split(" ").slice(1).join(" ")}</b>&gt;</span>`;
            }
            if(p1.startsWith("!--") && p1.endsWith("--")) {
                return `${p2}<span class="comm">&lt;${p1}&gt;</span>`
            }
            st = `${p2}<span class="op">&lt;${p1.split(" ")[0]}</span>`;
            for(var attr of p1.split(" ").slice(1)) {
                st += " ";
                if(attr.includes("=")) {
                    st += `<span class="cls">${attr.split("=")[0] + "="}</span>`;
                    st += `<span class="str">${attr.split("=")[1]}</span>`;
                } else {
                    st += `<span class="cls">${attr.split("=")[0]}</span>`;
                }
            }
            st += `<span class="op">&gt;</span>`;
            return st;
        }
    ], [
        /\&lt;script(.*)&gt;<\/span>((.|\n)*)<span class="op">&lt;\/script/gm,
        function(m, p1, p2) {
            var st = `&lt;script${p1}&gt;</span>`;
            st += mark_syntax_js__(p2).slice(0, -1);
            st += `<span class="op">&lt;/script`;
            return st;
        }
    ], [
        /\&lt;style(.*)&gt;<\/span>((.|\n)*)<span class="op">&lt;\/style/gm,
        function(m, p1, p2) {
            var st = `&lt;style${p1}&gt;</span>`;
            st += mark_syntax_css__(p2).slice(0, -1);
            st += `<span class="op">&lt;/style`;
            return st;
        }
    ], [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_html__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of html_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, [], [], false, false);
}
