function fnProcessText() {

    console.log("Inside fnProcessText ...")

    kuromoji.builder({ dicPath: "bower_components/kuromoji/dict" }).build(function (err, tokenizer) {
        console.log("Initizled Dictrory");




        const originalValue = document.getElementById('text_reading_input').value
        const tokenVales = tokenizer.tokenize(originalValue);
        console.log(tokenVales)

        let inputTextChainKana = []
        let inputTextChainFurigana = []

        for (tCount = 0; tCount < tokenVales.length; tCount++) {

           

            let tempSting = wanakana.stripOkurigana(tokenVales[tCount].basic_form);

            console.log(tCount, " ", tempSting)

            if(wanakana.isKanji(tempSting))
            {
                inputTextChainKana[tCount]= wanakana.toHiragana(tokenVales[tCount].reading)
                inputTextChainFurigana[tCount]= "<fg t='" +  wanakana.toHiragana(tokenVales[tCount].reading)  + "'>" + tokenVales[tCount].basic_form + "</fg>"
            }
            else
            {
                inputTextChainKana[tCount]= tokenVales[tCount].surface_form
                inputTextChainFurigana[tCount]= tokenVales[tCount].surface_form
            }

            //<ruby>漢字<rt>かんじ</rt></ruby>
            //<fg t="わたし">私</fg>はケンです


        }

        let inputTextChainFuriganaString = inputTextChainFurigana.join('')
        let inputTextChainKanaString = inputTextChainKana.join('')
        document.getElementById('divKanaResult').innerHTML = "<pre>"  + inputTextChainFuriganaString + "</pre>" 
        document.getElementById('textKanaResult').value = inputTextChainKanaString

       

        let arrayOfInputKanjiList = []
        let j = 0
        let arrayOfInputText = wanakana.tokenize(originalValue)
        let arrayOfInputKana = []


        for (i = 0; i < arrayOfInputText.length; i++) {
            if (wanakana.isKanji(arrayOfInputText[i])) {
                arrayOfInputKanjiList[j++] = arrayOfInputText[i]
            }
        }

        console.log(arrayOfInputKanjiList)

        const countsKanji = {};
        arrayOfInputKanjiList.forEach(function (x) { countsKanji[x] = (countsKanji[x] || 0) + 1; });
        console.log(countsKanji)

        


    });

}

function createDynamicURL()
{
    //https://translate.google.com/?sl=auto&tl=en&text=%22%E5%8A%A9%E8%A9%9E%22&op=translate

    const originalValue = document.getElementById('text_reading_input').value || "No Text"

    let linkText = "https://translate.google.com/?sl=auto&tl=en&text=" + originalValue + "&op=translate"

    return linkText

}

function RedirectURL()
{
    window.open(createDynamicURL(),'_blank');
}


