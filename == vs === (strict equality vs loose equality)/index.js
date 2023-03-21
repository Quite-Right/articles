const isInBrowser = globalThis.window !== undefined;
const nValues = [1, 10, 100, 1000, 10000, 100000, 1000000];
const examples = [
    {
        a: '0',
        b: 0,
        str: 'Comparison beetween string \'0\' and number 0'
    },
    {
        a: new String('0'),
        b: '0',
        str: 'Comparison beetween string as object new String(\'0\') and string \'0\''
    },
    {
        a: new String(0),
        b: 0,
        str: 'Comparison beetween string as object new String(\'0\') and number 0'
    }
];

const compareStrict = (a, b, n) => {
    while (n--) {
        a === b;
    }
}

const compareLoose = (a, b, n) => {
    while (n--) {
        a == b;
    }
}

const createMetrics = ({n, delta, block}) => {
    const metricsText = `Times: ${n} |  Delta: ${delta}`
    if (isInBrowser) {
        const element = document.createElement('div');
        element.classList.add('metrics')
        element.innerHTML = metricsText;
        block.appendChild(element);
    } else {
        console.log(metricsText);
    }
}

const createBlock = (str) => {
    if (isInBrowser) {
        const block = document.createElement('div');
        block.classList.add('block')
        const description = document.createElement('h1');
        description.innerHTML = str;
        block.appendChild(description);
        root.appendChild(block);
        return block;
    } else {
        console.log('\x1b[32m%s\x1b[0m', str);
    }
}


for (let i = 0; i < examples.length; i++) {
    const {a, b, str} = examples[i];
    const block = createBlock(str);
    for (let j = 0; j < nValues.length; j++) {
        const n = nValues[j];
        
        let l_startTime, l_endTime;
        l_startTime = performance.now();
        compareLoose(a, b, n);
        l_endTime = performance.now();
        
        let s_startTime, s_endTime;
        s_startTime = performance.now();
        compareStrict(a, b, n);
        s_endTime = performance.now();
        
        createMetrics({
            block,
            n,
            delta: l_endTime - l_startTime - (s_endTime - s_startTime)
        });
    }
}