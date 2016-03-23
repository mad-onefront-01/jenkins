var given = {
    prelude: [
        '',
        'we know that '
    ],
    prefixApis: [
        'H',
        'geop',
        'S',
        'huser '
    ],
    apis: [
        'api',
        'API',
        'MS'
    ],
    type: [
        'search',
        'itinerary',
        'booking',
        'method'
    ],
    name: [
        'Collection',
        'Results',
        'Item'
    ]
}

var whenThen = {
    subjects: [
        'the user ',
        'I ',
        'One front ',
        'the page '
    ],
    auxiliarVerb: [
        'should',
        'should not',
        'shall',
        'shall not',
        'must',
        'must not',
        '',
    ],
    actions: [
        'click',
        'contain',
        'reaches',
    ],
    objects: [
        'the following text',
        'next values',
        'results page',
        'passenger page',
        'home page',
        'confirmation page'
    ]
}

var tableValues = [
    function () {
        return getRandomNum(getRandomKey([10, 30, 12])).toString()
    },
    function () {
        return getRandomKey(['lorem', 'ipsum', 'adults', 'one-trop', 'sigur-ros'])
    },
    function () {
        var str = ''
        for (var i = 0; i < getRandomKey([16, 8, 5]); ++i) {
            str += getRandomNum(10)
        }
        var letter = getRandomNum(3) < 1;
        return str + letter ? getRandomKey(['K', 'J', 'M']) : ''
    }
]

var tableKeys = [
    'key',
    'value',
    'depDate',
    'arrDate',
    'arriCity',
    'pax',
    'firstSecgems',
    'packagePrice',
    'creditcard'
]

var features = {
    prelude: [
        'In order to',
        'For',
    ],
    actions: [
        'obtain',
        'testing',
        'know',
        'check',
        'know',
        'obtaning'
    ],
    objectsFirst: [
        'behaviour of ',
        'the number of ',
        'that exists the ',
    ],
    objectsSecond: [
        'inputs of ',
        'emerging layer of ',
        'dynpack ',
        'flights '
    ],
    objectsThird: [
        'autocomplete ',
        'results page',
        'inspirational page',
        'payment page',
        'detail page',
        'header',
        'tab'
    ]

}

function getRandomKey(array) {
    return array[getRandomNum(array.length)]
}

function getRandomNum(n) {
    var num = Math.random() * n
    return Math.floor(num)
}

function buildGiven () {
    var givenSentence = [
        'Given '
            + getRandomKey(given.prelude)
            + getRandomKey(given.prefixApis)
            + getRandomKey(given.apis)
            + ' returns search response with '
            + getRandomKey(given.type)
            + getRandomKey(given.name)
            + ' with values:'
    ]
    givenSentence.push.apply(givenSentence, buildTable())
    return givenSentence
}

function buildWhenThen (option) {
    var whenThenSentence = [
        option + ' '
            + getRandomKey(whenThen.subjects)
            + getRandomKey(whenThen.auxiliarVerb) + ' '
            + getRandomKey(whenThen.actions) + ' '
            + getRandomKey(whenThen.objects)
    ]
    if (getRandomNum(3) === 0) {
        whenThenSentence.push.apply(whenThenSentence, buildTable())
    }
    return whenThenSentence
}

function buildTable () {
    var rows = 1 + getRandomNum(5)
    var columns = 1+ getRandomNum(6)
    var lengthColumns = createLengthsColumns(rows)
    var table = []
    var keys = []
    for (var i = 0; i < rows; ++i) {
        var key = getRandomKey(tableKeys)
        if (key.length > lengthColumns[i]) {
            lengthColumns[i] = key.length
        }
        keys.push(key)
    }
    table.push(keys)
    for (var i = 0; i < columns; ++i) {
        var valuesRow = []
        for (var j = 0; j < rows; ++j) {
            var value = getRandomKey(tableValues)()
            if (value.length > lengthColumns[j]) {
                lengthColumns[j] = value.length
            }
            valuesRow.push(value)
        }
        table.push(valuesRow)
    }
    var result = []
    for (var i = 0; i < table.length; ++i) {
        result.push(convertRowToString(table[i], lengthColumns))
    }
    return result
}

function buildFeatureDescription () {
    var featureDescription = ''
    if (getRandomNum(2)) {
        featureDescription += getRandomKey(features.prelude) + ' '
            + getRandomKey(features.actions) + ' '
            + getRandomKey(features.objectsFirst)
            + getRandomKey(features.objectsSecond)
            + getRandomKey(features.objectsThird)
            + ', '
    }
    featureDescription += 'we want to '
        + getRandomKey(features.actions) + ' '
        + getRandomKey(features.objectsFirst)
        + getRandomKey(features.objectsSecond)
        + getRandomKey(features.objectsThird)
    return featureDescription
}

function normalizeRow(row, lengthColumns) {
    var result = []
    for (var i = 0; i < row.length; ++i) {
        result.push(fillSpaces(row[i], lengthColumns[i]))
    }
    return result
}

function convertRowToString (row, lengthColumns) {
    return '| ' + normalizeRow(row, lengthColumns).join(' | ') + ' |'
}

function fillSpaces(str, length) {
    var result = str
    for (var i = str.length; i < length; ++i) {
        result += ' '
    }
    return result
}

function createLengthsColumns(length) {
    var lengthColumns = []
    for (var i = 0; i < length; ++i) {
        lengthColumns.push(0)
    }
    return lengthColumns
}

function buildScenario() {
    var options = {
        Given: buildGiven,
        When: buildWhenThen,
        Then: buildWhenThen
    }
    var numGivens = 1 + getRandomNum(3)
    var sentences = []
    for (var i = 0; i < numGivens; ++i) {
        sentences.push(buildGiven())
    }
    var numWhenThens = 1 + getRandomNum(3)
    for (var i = 0; i < numWhenThens; ++i) {
        var numWhens = 1 + getRandomNum(4)
        for (var j = 0; j < numWhens; ++j) {
            var word = j === 0 ? 'When' : 'And'
            sentences.push(buildWhenThen(word))
        }
        var numThens = 1 + getRandomNum(3)
        for (var j = 0; j < numThens; ++j) {
            var word = j === 0 ? 'Then' : 'And'
            sentences.push(buildWhenThen(word))
        }
    }
    return sentences
}

function buildFeature () {
    var n = 1 + getRandomNum(3)
    var annotations = []
    for (var i = 0; i < n; ++i) {
        annotations.push(getRandomKey([
            '@ignore',
            '@live',
            '@validated',
            '@notsolive',
            '@TC-' + (45 + getRandomNum(3000))
        ]))
    }
    var featureDescription = 'Feature: ' + buildFeatureDescription()
    n = 1 + getRandomNum(4)
    var scenarios = []
    for (var i = 0; i < n; ++i) {
        scenarios.push(buildScenario())
    }
    return {
        annotations: annotations,
        featureDescription: featureDescription,
        scenarios: scenarios
    }
}

//console.log(buildGiven())
//console.log(buildWhenThen('When'))
//console.log(buildScenario())
//console.log(buildFeatureDescription())
var featuraSample = buildFeature()
console.log(featuraSample.annotations)
console.log(featuraSample.featureDescription)
console.log(featuraSample.scenarios)

function printFeature($console, feature) {
    var $table = $('<table/>')


    $console.append($table)
}

function printScenario($scenario, scenario, index, cb) {
    var $sentence = $('<tbody/>')
    console.log(scenario[index])
    printSentence($sentence, scenario[index])
    $scenario.append($sentence)
    if (index < scenario.length) {
        setTimeout(function () {
            printScenario($scenario, scenario, index + 1, cb)
        }, 300 + getRandomNum(2000))
    } else {
    	cb()
    }

}

function printSentence($tbody, sentence) {
    $.each(sentence, function (index, row) {
        var $tr = $('<tr/>')
        var $td = $('<td><pre>' + row + '</pre></td>')
        $tr.append($td)
        $tbody.append($tr)
    })
}

$(document).ready(function () {
    var $table = $('<table/>')
    printScenario($table, buildScenario(), 0, function () {})
    $('.console').append($table)
})

