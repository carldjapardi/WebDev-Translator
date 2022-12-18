//translator
document.addEventListener("DOMContentLoaded", () => {

    $("#needHelp").click(()=>{
        if ($('.helpAbs').css('display') == 'none') {
            $(".helpAbs").css("display","block")
        } else {
            $(".helpAbs").css("display","none")
        }
    })
    
    //upload files
    document.getElementById('fileinput').addEventListener('change', (file) => {
        let f = file.target.files[0];
        if (f) {
            let r = new FileReader();
            r.onload = (e) => {
                let contents = e.target.result
                contents = contents.split(/\r?\n/).join("<br>")
                $("#textInput").html(codeHTML(contents,decode=false))
                console.log($("#textInput").html())
            }
            r.readAsText(f);
        } else {
            alert("Tolong seleksi 1 file");
        }
    });

    $("#saveFile").click(()=>{
        let filename = "index.html"
        let data = codeHTML(translate($("#textInput").html(), runOnly=true))
        let type = "html"
        let file = new Blob([data], {type: type});
        // for internet explorer
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

    //used for turning html entities, inside div, to string; to run in iframe
    function codeHTML(input, decode=true) {
        if (decode === true) {
            let doc = new DOMParser().parseFromString(input, "text/html")
            return doc.documentElement.textContent;
        } else {
            //if <br> present in code, for uploading file function
            if (input.search("<br>") !== -1) {
                input = input.split("<br>")
                let formattedInput = []
                for (let i = 0; i<input.length ;i++) {
                    formattedInput[i] = input[i].replace(/[\u00A0-\u9999<>\&]/g, (t) => {return '&#'+t.charCodeAt(0)+';'})
                }
                console.log(formattedInput)
                return formattedInput.join("<br>")
            }
            input = input.replace(/[\u00A0-\u9999<>\&]/g, function(t) {return '&#'+t.charCodeAt(0)+';'})
            return input
        }
    }

    function translate(input, runOnly=false) {
        //let transMap = {"<t>":"<a>","</t>":"</a>","<artikel>":"<article>","</artikel>":"</article>","<suara>":"<audio>","</suara>":"</audio>","<tebal>":"<b>","</tebal>":"</b>","<badan>":"<body>","</badan>":"</body>","<jb>":"<br>","</jb>":"</br>","<tombol>":"<button>","</tombol>":"</button>","<miring>":"<em>","</miring>":"</em>","<j1>":"<h1>","</j1>":"</h1>","<j2>":"<h2>","</j2>":"</h2>","<j3>":"<h3>","</j3>":"</h3>","<j4>":"<h4>","</j4>":"</h4>","<j5>":"<h5>","</j5>":"</h5>","<j6>":"<h6>","</j6>":"</h6>","<kepala>":"<head>","</kepala>":"</head>","<garis>":"<hr>","</garis>":"</hr>","<gambar>":"<img>","</gambar>":"</img>","<masuk>":"<input>","</masuk>":"</input>","<hubung>":"<link>","</hubung>":"</link>","<pilih>":"<select>","</pilih>":"</select>","<gaya>":"<style>","</gaya>":"</style>","<areateks>":"<textarea>","</areateks>":"</textarea>","<namaSitus>":"<title>","</namaSitus>":"</title>","<ut>":"<ul>","</ut>":"</ul>","<un>":"<ol>","</un>":"</ol>"};   
        let transMap = {'&lt;artikel': '&lt;article', '&lt;/artikel&gt;': '&lt;/article&gt;', '&lt;suara': '&lt;audio', '&lt;/suara&gt;': '&lt;/audio&gt;', '&lt;badan': '&lt;body', '&lt;/badan&gt;': '&lt;/body&gt;', '&lt;jb': '&lt;br', '&lt;/jb&gt;': '&lt;/br&gt;', '&lt;tombol': '&lt;button', '&lt;/tombol&gt;': '&lt;/button&gt;', '&lt;miring': '&lt;em', '&lt;/miring&gt;': '&lt;/em&gt;', '&lt;j1': '&lt;h1', '&lt;/j1&gt;': '&lt;/h1&gt;', '&lt;j2': '&lt;h2', '&lt;/j2&gt;': '&lt;/h2&gt;', '&lt;j3': '&lt;h3', '&lt;/j3&gt;': '&lt;/h3&gt;', '&lt;j4': '&lt;h4', '&lt;/j4&gt;': '&lt;/h4&gt;', '&lt;j5': '&lt;h5', '&lt;/j5&gt;': '&lt;/h5&gt;', '&lt;j6': '&lt;h6', '&lt;/j6&gt;': '&lt;/h6&gt;', '&lt;kepala': '&lt;head', '&lt;/kepala&gt;': '&lt;/head&gt;', '&lt;garis': '&lt;hr', '&lt;/garis&gt;': '&lt;/hr&gt;', '&lt;gambar': '&lt;img', '&lt;/gambar&gt;': '&lt;/img&gt;', '&lt;masuk': '&lt;input', '&lt;/masuk&gt;': '&lt;/input&gt;', '&lt;hubung': '&lt;link', '&lt;/hubung&gt;': '&lt;/link&gt;', '&lt;pilih': '&lt;select', '&lt;/pilih&gt;': '&lt;/select&gt;', '&lt;gaya': '&lt;style', '&lt;/gaya&gt;': '&lt;/style&gt;', '&lt;areateks': '&lt;textarea', '&lt;/areateks&gt;': '&lt;/textarea&gt;', '&lt;namaSitus': '&lt;title', '&lt;/namaSitus&gt;': '&lt;/title&gt;', '&lt;ut': '&lt;ul', '&lt;/ut&gt;': '&lt;/ul&gt;', '&lt;un': '&lt;ol', '&lt;/un&gt;': '&lt;/ol&gt;'}
        let transKey = Object.keys(transMap)
        if (runOnly===true) {
            transKey.forEach((key)=>{input = input.replaceAll(key, transMap[key])})
            return input.replaceAll(/\s/g, '').replaceAll("&nbsp;","")
        }
        //if not run; determine language
        let language = ""
        for (let i = 0; i < transKey.length; i++) { 
            if (input.search(transKey[i]) !== -1) {
                language = "bahasa"
                break
            } else {
                language = "english"
            }
        }
        if (language==="bahasa") {
            transKey.forEach((key)=>{
                input = input.replaceAll(key, transMap[key])
            })
            return input
        } else {
            transKey.forEach((key)=>{input = input.replaceAll(transMap[key], key)})
            return input
        } 
    } 

    $("#translateButton").click(()=>{
        //console.log(document.getElementById("textInput").innerHTML)
        $("#textInput").html(translate($("#textInput").html()))
    })

    //initializing textInput
    $("#textInput").html("&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br><br>&emsp;&emsp;&lt;kepala&gt;<br>&emsp;&emsp;&emsp;&emsp;&lt;namaSitus&gt; (Nama) &lt;/namaSitus&gt;<br>&emsp;&emsp;&emsp;&emsp;&lt;gaya&gt;<br><br>&emsp;&emsp;&emsp;&emsp;&lt;/gaya&gt;<br>&emsp;&emsp;&lt;/kepala&gt;<br><br>&emsp;&emsp;&lt;badan&gt;<br><br>&emsp;&emsp;&emsp;&emsp;&lt;j1&gt; Judul &lt;/j1&gt;<br>&emsp;&emsp;&emsp;&emsp;&lt;p&gt; Kata Kata &lt;/p&gt;<br><br>&emsp;&emsp;&lt;/badan&gt;<br><br>&lt;/html&gt;")
    
    $("#runInput").click(() => 
        {
            $("#output").attr("srcdoc", codeHTML(translate($("#textInput").html(), runOnly=true)), decode=false)
            console.log(translate($("#textInput").html(), runOnly=true))
        }
    )
    
    //tab function
    $("#textInput").keydown((e) => {
        if(e.keyCode === 9) {
            document.execCommand('insertText', false, "  ");
            return false;
        }
        return true;
    });
})