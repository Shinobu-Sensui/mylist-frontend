import { userAccountStore } from '../../store/store';
import Card from './card/Card';
import LineChart from './chartTypes/Linechart/LineChart';
import { linechartmodel } from './chartTypes/Linechart/linechartmodel';
import VerticalBar from './verticalBar/VerticalBar';
import { verticalBarModel } from './verticalBar/verticalbarmodel';




import './graph.css'


const elegantComplementaryColors = ["#ADC5CF", "#1252ca"];



const Graph = () => {
    const { chooseCategory, barThickness } = userAccountStore()
    const currentCategory = chooseCategory[chooseCategory.category]
    if (!currentCategory) return
    const [dataFirstLetterSycountList, optionFirstLetterSycountList] = verticalBarModel(currentCategory.firstLetterSyCountList[0], "Mot/Alphabetique", currentCategory.firstLetterSyCountList[1], "", elegantComplementaryColors, barThickness )
    
    const [dataFirstLetterSyCountSyllables, optionFirstLetterSyCountSyllables] = verticalBarModel(currentCategory.firstLetterSyCountSyllables[0], "syllabe/Alphabetique", currentCategory.firstLetterSyCountSyllables[1], "", elegantComplementaryColors, barThickness )

    const [dataWordSize, optionWordSize] = linechartmodel(currentCategory.wordSize[0], "Mots/taille", currentCategory.wordSize[1], '', elegantComplementaryColors[1], elegantComplementaryColors)

    const [dataWord, optionWord] = linechartmodel(chooseCategory.dico.forDico.list, "Mots/list", chooseCategory.dico.forDico.size, '', elegantComplementaryColors[1], elegantComplementaryColors[2])

    return (
        <div>
            <div className="container-cards">
                <Card  classname='List'  name={chooseCategory.category} value={currentCategory.size}/>
                <Card  classname='Syllable'  name="Syllables" value={currentCategory.sizeSyllables}/>
            </div>
            <div className="container-chart">
                <LineChart data={dataWord} option={optionWord}/>
                <LineChart data={dataWordSize} option={optionWordSize}/>
                <VerticalBar data={dataFirstLetterSycountList} option={optionFirstLetterSycountList}/>
                <VerticalBar data={dataFirstLetterSyCountSyllables} option={optionFirstLetterSyCountSyllables}/>
              
            </div>
        </div>
    );
};

export default Graph;