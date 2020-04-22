var base__ = "https://voxelprismatic.github.io/priz.md/out/";
var head__ = document.getElementById("priz_importer");
if(iframe_md__) {
    var script__ = document.createElement("iframe");
    script__.src = base__.slice(0, -4);
    script__.id = "prizmd";
    var markdown_content = "";
    function mark_page(st) {
        var priz_md = document.getElementById("prizmd");
        priz_md.contentWindow.postMessage(st, "*");
        markdown_content = "";
        return new Promise(resolve => {
            window.setTimeout(() => {resolve(markdown_content)}, 25);
        });
    }

    function recieve_markdown(evt) {
        if(evt.origin = "https://voxelprismatic.github.io") {
            markdown_content = evt.data;
        }
    }

    window.addEventListener("message", recieve_markdown, false);
} else {
    var script__ = document.createElement("script");
    script__.src = base__ + "md.min.js";
    script__.type = "text/javascript";
}
head__.after(script__);
var css__ = document.createElement("link");
css__.rel = "stylesheet";
css__.type = "text/css";
if(lite_css__)
    css__.href = base__ + "style.lite.min.css";
else
    css__.href = base__ + "style.min.css";
head__.after(css__);
delete css__;
delete script__;
delete base__;
delete head__;
delete iframe_md__;
delete lite_css__;
