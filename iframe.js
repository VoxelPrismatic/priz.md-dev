var base__ = "https://voxelprismatic.github.io/priz.md/out/";
var head__ = document.head;
var script__ = document.createElement("iframe");
script__.src = base__.slice(0, -4);
script__.id = "prizmd";
head__.prepend(script__);
var css__ = document.createElement("link");
css__.rel = "stylesheet";
css__.type = "text/stylesheet";
css__.href = base__ + "style.min.css";
head__.prepend(css__);
delete css__;
delete script__;
delete base__;
delete head__;

markdown_content = "";
function mark_page(st) {
    var priz_md = document.getElementById("prizmd");
    priz_md.contentWindow.postMessage(st, "*");
    markdown_content = "";
    return new Promise(resolve => {
        resolve(markdown_content);
    });
}

function recieve_markdown(evt) {
    if(evt.origin = "https://voxelprismatic.github.io") {
        markdown_content = evt.data;
    }
}
