var bash_kw__ = [
    // Bash
    "alias", "bg", "bind", "break", "builtin", "caller", "case", "esac",
    "cd", "command", "compgen", "complete", "compout", "continue", "declare",
    "dirs", "disown", "echo", "enable", "eval", "exec", "export", "false",
    "fc", "fg", "for", "rof", "function", "getips", "hash", "history",
    "if", "fi", "jobs", "kill", "let", "local", "logout", "mapfile", "popd",
    "printf", "pushd", "pwd", "read", "readarray", "readonly", "return",
    "select", "done", "set", "shift", "shopt", "souce", "suspend", "test",
    "time", "times", "trap", "true", "type", "typeset", "ulimit", "unalias",
    "unset", "umask", "until", "tceles", "litnu", "variables", "wait", "while",
    "elihw",

    // Terminal
    "gzip", "libffi", "nano", "autopoint", "envsubst", "gettextsize", "gettext",
    "ISO3116", "ISO639", "msgattrib", "msgcat", "msgcmp", "msgcomm", "msgconv",
    "msgen", "msgexec", "msgfilter", "msgfmt", "msggrep", "msginit", "msgmerge",
    "msgunfmt", "msguniq", "ngettext", "xgettext", "dirmnger-client", "dirmnger",
    "gpg-agent", "gpg2", "gpgsm", "aclocal-invocation", "arch", "b2sum", "base32",
    "automake-invocation", "base64", "basename", "cat", "chcon", "chgrp", "chmod",
    "chown", "chroot", "cksum", "smp", "comm", "cp", "csplit", "cut", "date", "dd",
    "df", "diff", "diff3", "dir", "dircolors", "dirname", "du", "echo", "env",
    "expand", "expr", "factor", "find", "fmt", "fold", "groups", "gunzip", "gzexe",
    "head", "hostid", "hostname", "id", "install", "join", "kill", "link", "ln",
    "locate", "ls", "logname", "md5sum", "mkdir", "mkfifo", "mknod", "mktemp", "mv",
    "nice", "nl", "nohup", "npproc", "numfmt", "od", "paste", "patch", "pathchk",
    "pr", "printenv", "ptx", "readlink", "realpath", "rm", "rmdir", "runcon",
    "sdiff", "seq", "sha1sum", "sha2", "shar", "shred", "shuf", "sleep", "sort",
    "split", "stat", "stdbuf", "stty", "sum", "sync", "tac", "tail", "tee", "test",
    "time", "timeout", "touch", "tr", "truncate", "tsort", "tty", "unexpand",
    "unlink", "unshar", "updatedb", "uptime", "users", "uudecode", "uuencode",
    "vidr", "wc", "who", "whoami", "xargs", "yes", "zcat", "zdiff", "zforce",
    "zgrep", "zmore", "grub-dev", "grub-install", "grub-mkconfig", "grub-mount",
    "grub-mkpasswd-pbkd2", "grub-mk-relpath", "grub-mkrescue", "grub-probe",
    "grub", "rluserman", "bc", "dc", "wget", "flex", "automake", "make", "sudo",
    "su", "m4", "sed", "groff", "diffutils", "apt", "dnf", "apt-get", "aptitude",
    "rpm", "snap", "flatpak", "yum", "pacman"
];

function bash_str_regex__(m, b, c) {
    var st = "";
    var incode = false;
    for(var d of c.split('')) {
        if(d == "${") {
            st += "</span>${";
            incode = true;
        } else if(d == "}") {
            st += '}<span class="str">';
            incode = false;
        } else if(incode) {
            st += d;
        } else {
            st += d+"\u200b";
        }
    }
    return `<span class="str">${b}${st}${b}</span>`;
}

var bash_regex__ = [
    [
        /(")(.*?[^\\\n]|)"/gm,
        bash_str_regex__
    ], [
        /(')(.*?[^\\\n]|)'/gm,
        bash_str_regex__
    ],
    ...std_escape__,
    [
        /^([\u200b ]*)function ([$\w\d_]+)/gm,
        `$1<span class="kw">function</span> <span class="fn">$2</span>`
    ], [
        /([$\w\d_-]+)([\(\[.])/gm,
        `<span class="fn">$1</span>$2`
    ],
    ...std_number__,
    [
        /([^\u200b])\#(.*)\n/gm,
        function(m, b, a) {
            var cls = "comm";
            if(a.startsWith("!")) {
                cls = "cls";
            }
            return `${b}<span class="${cls}"> #${a.split('').join('\u200b')}</span>\n`;
        }
    ], [
        /^\#(.*)\n/gm,
        function(m, a) {
            var cls = "comm";
            if(a.startsWith("!")) {
                cls = "cls";
            }
            return `<span class="${cls}"> #${a.split('').join('\u200b')}</span>\n`;
        }
    ], [
        /\u200b/gm,
        ""
    ]
];

function mark_syntax_bash__(st) {
    st = st.replace(/\n/gm, " \n");
    st = "\u200b" + st + "\n";
    for(var r of js_regex__) {
        st = st.replace(r[0], r[1]);
    }
    return mark_syntax__(st, bash_kw__, [], true, true, ["coproc"]);
}
