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
                $("#textInput").html(codeHTML(contents,decode=false))
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
        function formatInput(input) {
            let formattedInput = []
            for (let i = 0; i<input.length ;i++) {formattedInput[i] = (input[i].trim().replaceAll("&nbsp;",""))}
            return formattedInput.join("<br>")
        }
        if (decode === true) {
            input = formatInput(input.split("<br>"))
            let doc = new DOMParser().parseFromString(input, "text/html")
            return doc.documentElement.textContent;
        } else { //changing string to entities 
            input = (input.replace(/[\u00A0-\u9999<>\&]/g, (t) => {return '&#'+t.charCodeAt(0)+';'})).trim()
            return formatInput(input.split(/\r?\n/))
        }
    }

    function translate(input, runOnly=false) {
        //let transMap = {"<t>":"<a>","</t>":"</a>","<artikel>":"<article>","</artikel>":"</article>","<suara>":"<audio>","</suara>":"</audio>","<tebal>":"<b>","</tebal>":"</b>","<badan>":"<body>","</badan>":"</body>","<jb>":"<br>","</jb>":"</br>","<tombol>":"<button>","</tombol>":"</button>","<miring>":"<em>","</miring>":"</em>","<j1>":"<h1>","</j1>":"</h1>","<j2>":"<h2>","</j2>":"</h2>","<j3>":"<h3>","</j3>":"</h3>","<j4>":"<h4>","</j4>":"</h4>","<j5>":"<h5>","</j5>":"</h5>","<j6>":"<h6>","</j6>":"</h6>","<kepala>":"<head>","</kepala>":"</head>","<garis>":"<hr>","</garis>":"</hr>","<gambar>":"<img>","</gambar>":"</img>","<masuk>":"<input>","</masuk>":"</input>","<hubung>":"<link>","</hubung>":"</link>","<pilih>":"<select>","</pilih>":"</select>","<gaya>":"<style>","</gaya>":"</style>","<areateks>":"<textarea>","</areateks>":"</textarea>","<namaSitus>":"<title>","</namaSitus>":"</title>","<ut>":"<ul>","</ut>":"</ul>","<un>":"<ol>","</un>":"</ol>"};   
        let transMap = {'&lt;artikel': '&lt;article', '&lt;/artikel&gt;': '&lt;/article&gt;', '&lt;suara': '&lt;audio', '&lt;/suara&gt;': '&lt;/audio&gt;', '&lt;badan': '&lt;body', '&lt;/badan&gt;': '&lt;/body&gt;', '&lt;tombol': '&lt;button', '&lt;/tombol&gt;': '&lt;/button&gt;', '&lt;miring': '&lt;em', '&lt;/miring&gt;': '&lt;/em&gt;', '&lt;j1': '&lt;h1', '&lt;/j1&gt;': '&lt;/h1&gt;', '&lt;j2': '&lt;h2', '&lt;/j2&gt;': '&lt;/h2&gt;', '&lt;j3': '&lt;h3', '&lt;/j3&gt;': '&lt;/h3&gt;', '&lt;j4': '&lt;h4', '&lt;/j4&gt;': '&lt;/h4&gt;', '&lt;j5': '&lt;h5', '&lt;/j5&gt;': '&lt;/h5&gt;', '&lt;j6': '&lt;h6', '&lt;/j6&gt;': '&lt;/h6&gt;', '&lt;kepala': '&lt;head', '&lt;/kepala&gt;': '&lt;/head&gt;', '&lt;garis': '&lt;hr', '&lt;/garis&gt;': '&lt;/hr&gt;', '&lt;gambar': '&lt;img', '&lt;/gambar&gt;': '&lt;/img&gt;', '&lt;masuk': '&lt;input', '&lt;/masuk&gt;': '&lt;/input&gt;', '&lt;hubung': '&lt;link', '&lt;/hubung&gt;': '&lt;/link&gt;', '&lt;pilih': '&lt;select', '&lt;/pilih&gt;': '&lt;/select&gt;', '&lt;gaya': '&lt;style', '&lt;/gaya&gt;': '&lt;/style&gt;', '&lt;areateks': '&lt;textarea', '&lt;/areateks&gt;': '&lt;/textarea&gt;', '&lt;namaSitus': '&lt;title', '&lt;/namaSitus&gt;': '&lt;/title&gt;', '&lt;ut': '&lt;ul', '&lt;/ut&gt;': '&lt;/ul&gt;', '&lt;un': '&lt;ol', '&lt;/un&gt;': '&lt;/ol&gt;'}
        let transMapEngKey = {'&lt;article': '&lt;artikel', '&lt;/article&gt;': '&lt;/artikel&gt;', '&lt;audio': '&lt;suara', '&lt;/audio&gt;': '&lt;/suara&gt;', '&lt;body': '&lt;badan', '&lt;/body&gt;': '&lt;/badan&gt;', '&lt;button': '&lt;tombol', '&lt;/button&gt;': '&lt;/tombol&gt;', '&lt;em': '&lt;miring', '&lt;/em&gt;': '&lt;/miring&gt;', '&lt;h1': '&lt;j1', '&lt;/h1&gt;': '&lt;/j1&gt;', '&lt;h2': '&lt;j2', '&lt;/h2&gt;': '&lt;/j2&gt;', '&lt;h3': '&lt;j3', '&lt;/h3&gt;': '&lt;/j3&gt;', '&lt;h4': '&lt;j4', '&lt;/h4&gt;': '&lt;/j4&gt;', '&lt;h5': '&lt;j5', '&lt;/h5&gt;': '&lt;/j5&gt;', '&lt;h6': '&lt;j6', '&lt;/h6&gt;': '&lt;/j6&gt;', '&lt;head': '&lt;kepala', '&lt;/head&gt;': '&lt;/kepala&gt;', '&lt;hr': '&lt;garis', '&lt;/hr&gt;': '&lt;/garis&gt;', '&lt;img': '&lt;gambar', '&lt;/img&gt;': '&lt;/gambar&gt;', '&lt;input': '&lt;masuk', '&lt;/input&gt;': '&lt;/masuk&gt;', '&lt;link': '&lt;hubung', '&lt;/link&gt;': '&lt;/hubung&gt;', '&lt;select': '&lt;pilih', '&lt;/select&gt;': '&lt;/pilih&gt;', '&lt;style': '&lt;gaya', '&lt;/style&gt;': '&lt;/gaya&gt;', '&lt;textarea': '&lt;areateks', '&lt;/textarea&gt;': '&lt;/areateks&gt;', '&lt;title': '&lt;namaSitus', '&lt;/title&gt;': '&lt;/namaSitus&gt;', '&lt;ul': '&lt;ut', '&lt;/ul&gt;': '&lt;/ut&gt;', '&lt;ol': '&lt;un', '&lt;/ol&gt;': '&lt;/un&gt;'}
        let transKey = Object.keys(transMap)
        let transMapCSS = {'warna-aksen': 'accent-color', 'sejajarkan-konten': 'align-content', 'sejajarkan-item': 'align-items', 'sejajarkan-diri': 'align-self', 'semua': 'all', 'animasi': 'animation', 'penundaan-animasi': 'animation-delay', 'arah-animasi': 'animation-direction', 'durasi-animasi': 'animation-duration', 'mode-pengisian-animasi': 'animation-fill-mode', 'jumlah-iterasi-animasi': 'animation-iteration-count', 'nama-animasi': 'animation-name', 'status-pemutaran-animasi': 'animation-play-state', 'fungsi-pengaturan-waktu-animasi': 'animation-timing-function', 'rasio-aspek': 'aspect-ratio', 'filter-latar-belakang': 'backdrop-filter', 'visibilitas-tampilan-belakang': 'backface-visibility', 'latar-belakang': 'background', 'lampiran-latar-belakang': 'background-attachment', 'campuran-latar-belakang-mode': 'background-blend-mode', 'klip-latar-belakang': 'background-clip', 'warna-latar-belakang': 'background-color', 'gambar-latar-belakang': 'background-image', 'asal-latar-belakang': 'background-origin', 'posisi-latar-belakang': 'background-position', 'posisi-latar-belakang-x': 'background-position-x', 'posisi-latar-belakang-y': 'background-position-y', 'pengulangan-latar-belakang': 'background-repeat', 'ukuran-latar-belakang': 'background-size', 'ukuran-blok': 'block-size', 'perbatasan': 'border', 'blok-perbatasan': 'border-block', 'warna-blok-perbatasan': 'border-block-color', 'warna-akhir-blok-perbatasan': 'border-block-end-color', 'gaya-akhir-blok-perbatasan': 'border-block-end-style', 'lebar-ujung-blok-perbatasan': 'border-block-end-width', 'warna-awal-blok-perbatasan': 'border-block-start-color', 'perbatasan-gaya-mulai-blok': 'border-block-start-style', 'lebar-blok-mulai-batas': 'border-block-start-width', 'gaya-blok-batas': 'border-block-style', 'lebar-blok-batas': 'border-block-width', 'batas-bawah': 'border-bottom', 'warna-batas-bawah': 'border-bottom-color', 'radius-kiri-bawah-batas': 'border-bottom-left-radius', 'radius-kanan-bawah-batas': 'border-bottom-right-radius', 'gaya-batas-bawah': 'border-bottom-style', 'lebar-batas-bawah': 'border-bottom-width', 'b-order-collapse': 'border-collapse', 'batasan-color': 'border-color', 'batasan-gambar': 'border-image', 'batasan-gambar-outset': 'border-image-outset', 'batasan-gambar-repeat': 'border-image-repeat', 'batasan-gambar-slice': 'border-image-slice', 'batasan-gambar-source': 'border-image-source', 'batasan-gambar-width': 'border-image-width', 'batasan-inline': 'border-inline', 'warna-sebaris-batas': 'border-inline-color', 'warna-akhir-sebaris-batas': 'border-inline-end-color', 'gaya-akhir-sebaris-batas': 'border-inline-end-style', 'lebar-ujung-sebaris-batas': 'border-inline-end-width', 'warna-awal-sebaris-batas': 'border-inline-start-color', 'gaya-awal-sebaris-batas': 'border-inline-start-style', 'lebar-awal-sebaris-batas': 'border-inline-start-width', 'sebaris-batas-gaya': 'border-inline-style', 'lebar-sebaris-batas': 'border-inline-width', 'kiri-batas': 'border-left', 'warna-batas-kiri': 'border-left-color', 'gaya-batas-kiri': 'border-left-style', 'lebar-batas-kiri': 'border-left-width', 'radius-batas': 'border-radius', 'batas-kanan': 'border-right', 'warna-batas-kanan': 'border-right-color', 'batas-gaya-kanan': 'border-right-style', 'lebar-batas-kanan': 'border-right-width', 'jarak-batas-batas': 'border-spacing', 'gaya-batas': 'border-style', 'batas-atas': 'border-top', 'warna-batas-atas': 'border-top-color', 'radius-kiri-atas-batas': 'border-top-left-radius', 'radius-batas-atas-kanan': 'border-top-right-radius', 'gaya-batas-atas': 'border-top-style', 'lebar-batas-atas': 'border-top-width', 'lebar-batas': 'border-width', 'bawah': 'bottom', 'pecahan-dekorasi-kotak': 'box-decoration-break', 'cerminan-kotak': 'box-reflect', 'bayangan-kotak': 'box-shadow', 'ukuran-kotak': 'box-sizing', 'pecah-setelah': 'break-after', 'pecah-sebelum': 'break-before', 'pecah-di-dalam': 'break-inside', 'sisi-keterangan': 'caption-side', 'warna-tanda-sisipan': 'caret-color', '@charset': '@charset', 'hapus': 'clear', 'klip': 'clip', 'warna': 'color', 'jumlah-kolom': 'column-count', 'isi-kolom': 'column-fill', 'kolom-n-celah': 'column-gap', 'aturan-kolom': 'column-rule', 'warna-aturan-kolom': 'column-rule-color', 'gaya-aturan-kolom': 'column-rule-style', 'lebar-aturan-kolom': 'column-rule-width', 'rentang-kolom': 'column-span', 'lebar-kolom': 'column-width', 'kolom': 'columns', 'konten': 'content', 'kontra-kenaikan': 'counter-increment', 'counter-reset': 'counter-reset', 'cursor': 'cursor', 'direction': 'direction', 'display': 'display', 'empty-cells': 'empty-cells', 'filter': 'filter', 'flex': 'flex', 'flex-basis': 'flex-basis', 'flex-direction': 'flex-direction', 'flex-flow': 'flex-flow', 'flex-grow': 'flex-grow', 'flex-shrink': 'flex-shrink', 'flex-wrap': 'flex-wrap', 'float': 'float', 'font': 'font', '@font-face': '@font-face', 'font-family': 'font-family', 'font-feature-settings': 'font-feature-settings', 'font-kerning': 'font-kerning', 'font-size': 'font-size', 'font-size-adjust': 'font-size-adjust', 'peregangan-font': 'font-stretch', 'gaya-font': 'font-style', 'varian-font': 'font-variant', 'batas-varian-font': 'font-variant-caps', 'berat-font': 'font-weight', 'celah': 'gap', 'kisi': 'grid', 'area-kisi': 'grid-area', 'kolom-kisi-otomatis': 'grid-auto-columns', 'alur-otomatis-kisi': 'grid-auto-flow', 'baris-kisi-otomatis': 'grid-auto-rows', 'kolom-kisi': 'grid-column', 'akhir-kolom-kisi': 'grid-column-end', 'celah-kolom-kisi': 'grid-column-gap', 'awal-kolom-kisi': 'grid-column-start', 'celah-kisi': 'grid-gap', 'baris-kisi': 'grid-row', 'akhir-baris-kisi': 'grid-row-end', 'baris-kisi-celah': 'grid-row-gap', 'mulai-baris-kisi': 'grid-row-start', 'templat-kisi': 'grid-template', 'area-templat-kisi': 'grid-template-areas', 'kolom-templat-kisi': 'grid-template-columns', 'baris-templat-kisi': 'grid-template-rows', 'tanda-baca-gantung': 'hanging-punctuation', 'tinggi': 'height', 'tanda-hubung': 'hyphens', 'rendering-gambar': 'image-rendering', '@import': '@import', 'dibarisan-size': 'inline-size', 'inset': 'inset', 'inset-block': 'inset-block', 'inset-block-akhir': 'inset-block-end', 'inset-block-sta-rt': 'inset-block-start', 'inset-dibarisan': 'inset-inline', 'inset-dibarisan-akhir': 'inset-inline-end', 'inset-dibarisan-awal': 'inset-inline-start', 'isolation': 'isolation', 'justify-content': 'justify-content', '@keyframes': '@keyframes', 'left': 'left', 'letter-spacing': 'letter-spacing', 'line-height': 'line-height', 'list-gaya': 'list-style', 'gambar-gaya-daftar': 'list-style-image', 'posisi-gaya-daftar': 'list-style-position', 'jenis-gaya-daftar': 'list-style-type', 'margin': 'margin', 'blok-margin': 'margin-block', 'ujung-blok-margin': 'margin-block-end', 'mulai-blok-margin': 'margin-block-start', 'margin-bawah': 'margin-bottom', 'margin-dibarisan': 'margin-inline', 'margin-dibarisan-akhir': 'margin-inline-end', 'margin-dibarisan-awal': 'margin-inline-start', 'margin-left': 'margin-left', 'margin-right': 'margin-right', 'margin-top': 'margin-top', 'mask-gambar': 'mask-image', 'mask-mode': 'mask-mode', 'mask-origin': 'mask-origin', 'mask-position': 'mask-position', 'mask-repeat': 'mask-repeat', 'mask-size': 'mask-size', 'max-height': 'max-height', 'max-width': 'max-width', '@media': '@media', 'max-block-size': 'max-block-size', 'max-dibarisan-size': 'max-inline-size', 'min-block-size': 'min-block-size', 'min-dibarisan-size': 'min-inline-size', 'min-height': 'min-height', 'min-width': 'min-width', 'mix-blend-mode': 'mix-blend-mode', 'object-fit': 'object-fit', 'object-position': 'object-position', 'opacity': 'opacity', 'order': 'order', 'orphans': 'orphans', 'outline': 'outline', 'outline-color': 'outline-color', 'outline-offset': 'outline-offset', 'gaya-garis-besar': 'outline-style', 'lebar-garis-besar': 'outline-width', 'meluap': 'overflow', 'jangkar-luapan': 'overflow-anchor', 'bungkus-luapan': 'overflow-wrap', 'meluap-x': 'overflow-x', 'meluap-y': 'overflow-y', 'lapisan': 'padding', 'lapisan-block': 'padding-block', 'lapisan-block-akhir': 'padding-block-end', 'lapisan-block-awal': 'padding-block-start', 'lapisan-bottom': 'padding-bottom', 'lapisan-dibarisan': 'padding-inline', 'lapisan-dibarisan-akhir': 'padding-inline-end', 'lapisan-dibarisan-awal': 'padding-inline-start', 'lapisan-left': 'padding-left', 'lapisan-right': 'padding-right', 'lapisan-top': 'padding-top', 'page-break-after': 'page-break-after', 'page-break-before': 'page-break-before', 'page-break-inside': 'page-break-inside', 'cat-order': 'paint-order', 'perspektif': 'perspective', 'perspektif-asal': 'perspective-origin', 'penunjuk-peristiwa': 'pointer-events', 'posisi': 'position', 'tanda-kutip': 'quotes', 'ubah-ukuran': 'resize', 'kanan': 'right', 'putar': 'rotate', 'kesenjangan-baris': 'row-gap', 'skala': 'scale', 'perilaku-gulir': 'scroll-behavior', 'margin-gulir': 'scroll-margin', 'scroll-margin-block': 'scroll-margin-block', 'scroll-margin-block-akhir': 'scroll-margin-block-end', 'scroll-margin-block-awal': 'scroll-margin-block-start', 'scroll-margin-bottom': 'scroll-margin-bottom', 'scroll-margin-dibarisan': 'scroll-margin-inline', 'scroll-margin-dibarisan-akhir': 'scroll-margin-inline-end', 'scroll-margin-dibarisan-awal': 'scroll-margin-inline-start', 'scroll-margin-kiri': 'scroll-margin-left', 'scroll-margin-kanan': 'scroll-margin-right', 'scroll-margin-top': 'scroll-margin-top', 'scroll-lapisan': 'scroll-padding', 'scroll-lapisan-block': 'scroll-padding-block', 'scroll-lapisan-block-akhir': 'scroll-padding-block-end', 'scroll-lapisan-block-awal': 'scroll-padding-block-start', 'scroll-lapisan-bottom': 'scroll-padding-bottom', 'scroll-lapisan-dibarisan': 'scroll-padding-inline', 'scroll-lapisan-dibarisan-akhir': 'scroll-padding-inline-end', 'scroll-lapisan-dibarisan-awal': 'scroll-padding-inline-start', 'scroll-lapisan-left': 'scroll-padding-left', 'scroll-lapisan-right': 'scroll-padding-right', 'scroll-lapisan-top': 'scroll-padding-top', 'scroll-snap-align': 'scroll-snap-align', 'scroll-snap-stop': 'scroll-snap-stop', 'scroll-snap-type': 'scroll-snap-type', 'ukuran-tab': 'tab-size', 'tata-letak-tabel': 'table-layout', 'perataan-teks': 'text-align', 'perataan-teks-terakhir': 'text-align-last', 'dekorasi-teks': 'text-decoration', 'teks-warna-dekorasi': 'text-decoration-color', 'garis-dekorasi-teks': 'text-decoration-line', 'gaya-dekorasi-teks': 'text-decoration-style', 'penekanan-teks': 'text-emphasis', 'indentasi-teks': 'text-indent', 'membenarkan-teks': 'text-justify', 'orientasi-teks': 'text-orientation', 'meluap-teks': 'text-overflow', 'bayangan-teks': 'text-shadow', 'transformasi-teks': 'text-transform', 'atas': 'top', 'ubah': 'transform', 'ubah-origin': 'transform-origin', 'ubah-gaya': 'transform-style', 'transisi': 'transition', 'transisi-delay': 'transition-delay', 'transisi-durasi': 'transition-duration', 'transisi-property': 'transition-property', 'transisi-waktu-funksi': 'transition-timing-function', 'ganti-posisi': 'translate', 'unicode-bidi': 'unicode-bidi', 'arah': 'direction', 'pilih-pengguna': 'user-select', 'perataan-vertikal': 'vertical-align', 'visibilitas': 'visibility', 'spasi-putih': 'white-space', 'janda': 'widows', 'lebar': 'width', 'istirahat-kata': 'word-break', 'spasi-kata': 'word-spacing', 'bungkus-kata': 'word-wrap', 'mode-penulisan': 'writing-mode', 'indeks-z': 'z-index'}
        let transKeyCSS = Object.keys(transMapCSS)
        
        function bhsToEng(input) {
            if (input.search("&lt;gaya&gt;") !== -1) {
                let styles = input.split(/&lt;gaya&gt;|&lt;\/gaya&gt;/)
                stylesIn = styles[1].replaceAll("<br>","").replaceAll(/\s/g,"").replaceAll("&nbsp;","").replaceAll(/<gaya>|&lt;\/gaya&gt;/g, "").replaceAll(/<div>|<\/div>/g,"").split(/{|}/)
                let newStylesIn = ""
                stylesIn.forEach((ele,index)=>{
                    if (index%2==0) {
                        if (transMap[`&lt;${ele}`] !== undefined) {
                            newStylesIn += transMap[`&lt;${ele}`].substring(4,)
                        } else {
                            newStylesIn += ele
                        }
                    } else if (index%2==1) {
                        transKeyCSS.forEach((key) => {
                            ele=ele.replaceAll(key,transMapCSS[key])
                        })
                        newStylesIn+=`{${ele}}\n`
                    }
                })
                styles[1] = newStylesIn
                input = styles[0] + "&lt;gaya&gt;<br>" + styles[1] + "<br>&lt;/gaya&gt;" + styles[2]
            }
            transKey.forEach((key)=>{input = input.replaceAll(key, transMap[key])})
            return input
        }
        let language = ""
        for (let i = 0; i < transKey.length; i++) { 
            if (input.search(transKey[i]) !== -1) {language = "bahasa";break} 
            else {language = "english"}
        }
        if (runOnly===true || language==="bahasa") {
            return bhsToEng(input)  
        } else {             
            if (input.search("&lt;style&gt;") !== -1) {
                let styles = input.split(/&lt;style&gt;|&lt;\/style&gt;/)
                stylesIn = styles[1].replaceAll("<br>","").replaceAll(/\s/g,"").replaceAll("&nbsp;","").replaceAll(/<style>|&lt;\/style&gt;/g, "").replaceAll(/<div>|<\/div>/g,"").split(/{|}/)
                let newStylesIn = ""
                stylesIn.forEach((ele,index)=>{
                    if (index%2==0) {
                        if (transMapEngKey[`&lt;${ele}`] !== undefined) {
                            newStylesIn += transMapEngKey[`&lt;${ele}`].substring(4,)
                        } else {
                            newStylesIn += ele
                        }
                    } else if (index%2==1) {
                        transKeyCSS.forEach((key) => {
                            ele=ele.replaceAll(transMapCSS[key],key)
                        })
                        newStylesIn+=`{${ele}}\n`
                    }
                })
                styles[1] = newStylesIn
                input = `${styles[0]}&lt;style&gt;<br>${styles[1]}<br>&lt;/style&gt;${styles[2]}`
            }
            transKey.forEach((key)=>{input = input.replaceAll(transMap[key], key)})
            return input
        } 
    } 

    $("#translateButton").click(()=>{
        $("#textInput").html(translate($("#textInput").html()))
    })

    //initializing textInput
    $("#textInput").html("&lt;!DOCTYPE html&gt;<br>&lt;html&gt;<br><br>&emsp;&emsp;&lt;kepala&gt;<br>&emsp;&emsp;&emsp;&emsp;&lt;namaSitus&gt; (Nama) &lt;/namaSitus&gt;<br>&emsp;&emsp;&emsp;&emsp;&lt;gaya&gt;<br><br>&emsp;&emsp;&emsp;&emsp;&lt;/gaya&gt;<br>&emsp;&emsp;&lt;/kepala&gt;<br><br>&emsp;&emsp;&lt;badan&gt;<br><br>&emsp;&emsp;&emsp;&emsp;&lt;j1&gt; Judul &lt;/j1&gt;<br>&emsp;&emsp;&emsp;&emsp;&lt;p&gt; Kata Kata &lt;/p&gt;<br><br>&emsp;&emsp;&lt;/badan&gt;<br><br>&lt;/html&gt;")
    
    $("#runInput").click(() => {$("#output").attr("srcdoc", codeHTML(translate($("#textInput").html(), runOnly=true)))})
    
    //tab function
    $("#textInput").keydown((e) => {
        if(e.keyCode === 9) {
            document.execCommand('insertText', false, "  ");
            return false;
        }
        return true;
    });
})