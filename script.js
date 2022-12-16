//translator
let hashMap = {"<t>":"<a>","</t>":"</a>","<artikel>":"<article>","</artikel>":"</article>","<suara>":"<audio>","</suara>":"</audio>","<tebal>":"<b>","</tebal>":"</b>","<badan>":"<body>","</badan>":"</body>","<jb>":"<br>","</jb>":"</br>","<tombol>":"<button>","</tombol>":"</button>","<miring>":"<em>","</miring>":"</em>","<j1>":"<h1>","</j1>":"</h1>","<j2>":"<h2>","</j2>":"</h2>","<j3>":"<h3>","</j3>":"</h3>","<j4>":"<h4>","</j4>":"</h4>","<j5>":"<h5>","</j5>":"</h5>","<j6>":"<h6>","</j6>":"</h6>","<kepala>":"<head>","</kepala>":"</head>","<garis>":"<hr>","</garis>":"</hr>","<gambar>":"<img>","</gambar>":"</img>","<masuk>":"<input>","</masuk>":"</input>","<hubung>":"<link>","</hubung>":"</link>","<pilih>":"<select>","</pilih>":"</select>","<gaya>":"<style>","</gaya>":"</style>","<areateks>":"<textarea>","</areateks>":"</textarea>","<namaSitus>":"<title>","</namaSitus>":"</title>","<ut>":"<ul>","</ut>":"</ul>","<un>":"<ol>","</un>":"</ol>"};
$("#needHelp").click(()=>{
    if ($('.helpAbs').css('display') == 'none') {
        $(".helpAbs").css("display","block")
    } else {
        $(".helpAbs").css("display","none")
    }
})
$("#saveFile").click(()=>{
    let filename = "index.html"
    let data = $("#textInput").val()
    let type = "text/plain"
    let file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        let a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout( () => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
})
$("#textInput").html("<!DOCTYPE html>&#10;<html>&#10;    <badan>&#10;&#10;    <j1> Judul </j1>&#10;&#10;    </badan>&#10;</html>")
$("#runInput").click(() => $("#output").attr("srcdoc", $("#textInput").val()));
//tab function
$(function(){$("#textInput").keydown(function(t){if(13===t.keyCode&&this.selectionStart==this.selectionEnd){let e=this.selectionStart,s=$(this).val();for(;e>0&&"\n"!=s[e-1];)e--;let i=e;for(;" "==s[e]||"	"==s[e];)e++;if(e>i)return document.execCommand("insertText",!1,"\n"+s.substr(i,e-i)),this.blur(),this.focus(),!1}if(9===t.keyCode){if(this.selectionStart==this.selectionEnd){if(t.shiftKey){let n=this.value;this.selectionStart>0&&"	"==n[this.selectionStart-1]&&document.execCommand("delete")}else document.execCommand("insertText",!1,"	")}else{let l=this.selectionStart,r=this.selectionEnd,o=$(this).val();for(;l>0&&"\n"!=o[l-1];)l--;for(;r>0&&"\n"!=o[r-1]&&r<o.length;)r++;let h=o.substr(l,r-l).split("\n");for(let a=0;a<h.length;a++)(a!=h.length-1||0!=h[a].length)&&(t.shiftKey?h[a].startsWith("	")?h[a]=h[a].substr(1):h[a].startsWith("    ")&&(h[a]=h[a].substr(4)):h[a]="	"+h[a]);h=h.join("\n"),this.value=o.substr(0,l)+h+o.substr(r),this.selectionStart=l,this.selectionEnd=l+h.length}return!1}return!0})});
/*
$(function() {
    $("textarea.tabSupport").keydown(function(e) {
        if (e.keyCode === 13) {
        if (this.selectionStart == this.selectionEnd) {
            let sel = this.selectionStart;
            let text = $(this).val();
            while (sel > 0 && text[sel - 1] != '\n')
            sel--;
            let lineStart = sel;
            while (text[sel] == ' ' || text[sel] == '\t')
            sel++;
            if (sel > lineStart) {
            document.execCommand('insertText', false, "\n" + text.substr(lineStart, sel - lineStart));
            this.blur();
            this.focus();
            return false;
            }
        }
        }
        if (e.keyCode === 9) {
        if (this.selectionStart == this.selectionEnd) {
            if (!e.shiftKey) {
            document.execCommand('insertText', false, "\t");
            } else {
            let text = this.value;
            if (this.selectionStart > 0 && text[this.selectionStart - 1] == '\t') {
                document.execCommand('delete');
            }
            }
        } else {
            let selStart = this.selectionStart;
            let selEnd = this.selectionEnd;
            let text = $(this).val();
            while (selStart > 0 && text[selStart - 1] != '\n')
            selStart--;
            while (selEnd > 0 && text[selEnd - 1] != '\n' && selEnd < text.length)
            selEnd++;
            let lines = text.substr(selStart, selEnd - selStart).split('\n');
            for (let i = 0; i < lines.length; i++) {
            if (i == lines.length - 1 && lines[i].length == 0)
                continue;
            if (e.shiftKey) {
                if (lines[i].startsWith('\t'))
                lines[i] = lines[i].substr(1);
                else if (lines[i].startsWith("    "))
                lines[i] = lines[i].substr(4);
            } else
                lines[i] = "\t" + lines[i];
            }
            lines = lines.join('\n');
            this.value = text.substr(0, selStart) + lines + text.substr(selEnd);
            this.selectionStart = selStart;
            this.selectionEnd = selStart + lines.length;
        }
        return false;
        }
        return true;
    });
    });
    */