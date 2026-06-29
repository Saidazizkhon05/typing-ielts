export const TASK1_CHARTS = {
    1: {
        image: null,
        source: 'https://resources.cathoven.com/ielts-writing-task-1/tips',
        sourceLabel: 'Cathoven',
        credit: 'Practice sample - no official exam chart published for this prompt',
        fallback: {
            kind: 'line',
            title: 'Household internet access (%) - illustrative',
            xLabels: ['2000', '2005', '2010', '2015', '2020'],
            yMax: 100,
            series: [
                { name: 'Germany', values: [30, 55, 75, 88, 93] },
                { name: 'Japan', values: [25, 50, 70, 85, 91] },
                { name: 'Brazil', values: [5, 15, 35, 55, 70] },
                { name: 'Nigeria', values: [2, 3, 4, 15, 27] },
            ],
        },
    },
    2: {
        image: './images/task1/02-uk-visits.jpg',
        imageFallback: 'https://ieltsliz.com/wp-content/uploads/2015/07/ielts-Line-and-bar-graph-sample.jpg',
        source: 'https://ieltsliz.com/ielts-line-graph-and-bar-chart-model-answer-band-9/',
        sourceLabel: 'IELTS Liz - Cambridge 4 Test 4',
    },
    3: {
        image: './images/task1/03-france-energy.png',
        imageFallback: 'https://ieltsliz.com/wp-content/uploads/2014/11/ielts-pie-chart-comparison.png',
        source: 'https://ieltsliz.com/ielts-pie-chart-task-1-model-score-9/',
        sourceLabel: 'IELTS Liz',
    },
    4: {
        image: './images/task1/04-yemen-italy.png',
        imageFallback: 'https://ieltswriting.org/wp-content/uploads/2024/09/ielts-9a-3-1.png',
        source: 'https://www.ieltsadvantage.com/2015/04/09/writing-task-1-pie-chart-answer-italy-and-yemen-populations/',
        sourceLabel: 'IELTS Advantage - Cambridge 9 Test 3',
    },
    5: {
        image: './images/task1/05-urban-asia.png',
        imageFallback: 'https://ieltswriting.org/wp-content/uploads/2024/09/ielts-12a-6-1.png',
        source: 'https://ielts.idp.com/vietnam/about/news-and-articles/article-ielts-writing-task-1-sample-band-9/en-gb',
        sourceLabel: 'IDP IELTS - Cambridge 12 Test 6',
    },
    6: {
        image: './images/task1/06-consumer.png',
        imageFallback: 'https://ieltswriting.org/wp-content/uploads/2024/09/ielts-10a-2-1.png',
        source: 'https://ieltspracticeonline.com/writing-task-1-the-expenditure-of-two-countries-on-consumer-goods-in-2010/',
        sourceLabel: 'IELTS Practice Online - Cambridge 10 Test 2',
    },
    7: {
        image: './images/task1/07-fruit.png',
        imageFallback: 'https://ieltsliz.com/wp-content/uploads/2024/08/IELTS-Bar-Chart-Answer-Sample.png',
        source: 'https://ieltsliz.com/ielts-model-answer-bar-chart-october-2018/',
        sourceLabel: 'IELTS Liz',
    },
    8: {
        image: './images/task1/08-university.png',
        imageFallback: 'https://ieltswriting.org/wp-content/uploads/2024/09/ielts-7-test-3-task-1-chart-academic.png',
        source: 'https://ielts.idp.com/vietnam/about/news-and-articles/article-ielts-writing-task-1-sample-band-9/en-gb',
        sourceLabel: 'IDP IELTS - Cambridge 7 Test 3',
    },
    9: {
        image: './images/task1/09-paper.png',
        imageFallback: 'https://ieltswriting.org/wp-content/uploads/2024/09/ielts-11a-1-1.png',
        source: 'https://ieltswriting.org/ielts-11-test-1-writing-task-1-with-sample-answer-academic/',
        sourceLabel: 'IELTS Writing - Cambridge 11 Test 1',
    },
    10: {
        image: './images/task1/10-cement.jpg',
        imageFallback: 'https://ieltsliz.com/wp-content/uploads/2014/11/cement-and-concrete.jpg',
        source: 'https://ieltsliz.com/ielts-diagram-model-answer-score-9/',
        sourceLabel: 'IELTS Liz - Cambridge 8 Test 3',
    },
    11: {
        image: './images/task1/11-silkworm.png',
        imageFallback: 'https://ieltswriting.org/wp-content/uploads/2024/09/ielts-6a-3-1.png',
        source: 'https://www.ieltsadvantage.com/2015/03/11/writing-task-1-sample-answer-process-question/',
        sourceLabel: 'IELTS Advantage - Cambridge 6 Test 3',
    },
    12: {
        image: './images/task1/12-weather.png',
        imageFallback: 'https://www.ielts-mentor.com/images/writingsamples/graph-86-how-australia-collects-information-on-weather.png',
        source: 'https://www.ielts-mentor.com/writing-sample/academic-writing-task-1/1020-ielts-academic-writing-task-1-sample-20',
        sourceLabel: 'IELTS Mentor - Cambridge 8 Test 1',
    },
    13: {
        source: 'https://ieltsliz.com/ielts-table-model-answer/',
        sourceLabel: 'IELTS Liz - Cambridge 5 Test 1',
    },
    14: {
        source: 'https://ieltsliz.com/ielts-line-graph-model-answer-co2/',
        sourceLabel: 'IELTS Liz - Cambridge 13 Test 1',
        fallback: {
            kind: 'line',
            title: 'CO2 emissions per person (metric tonnes)',
            xLabels: ['1967', '1977', '1987', '1997', '2007'],
            yMax: 12,
            series: [
                { name: 'UK', values: [11, 11, 10, 9.5, 9] },
                { name: 'Sweden', values: [9, 10, 8, 7, 6] },
                { name: 'Italy', values: [4, 6, 7, 7.5, 8] },
                { name: 'Portugal', values: [1, 2, 3, 5, 6] },
            ],
        },
    },
    15: {
        source: 'https://ieltsliz.com/ielts-line-graph-water-consumption/',
        sourceLabel: 'IELTS Liz - Cambridge 9 Test 1',
        fallback: {
            kind: 'line',
            title: 'Global water use by sector (km³)',
            xLabels: ['1900', '1920', '1940', '1960', '1980', '2000'],
            yMax: 3200,
            series: [
                { name: 'Agriculture', values: [500, 700, 1000, 1500, 2200, 3000] },
                { name: 'Industrial', values: [30, 60, 120, 250, 550, 800] },
                { name: 'Domestic', values: [20, 40, 70, 120, 200, 300] },
            ],
        },
    },
    16: {
        source: 'https://ieltsliz.com/ielts-process-diagram-glass-recycling/',
        sourceLabel: 'IELTS Liz - Glass process',
    },
    17: {
        source: 'https://ieltsliz.com/ielts-bar-chart-housing-tenure/',
        sourceLabel: 'IELTS Liz - Housing tenure',
    },
    18: {
        source: 'https://ieltsliz.com/ielts-bar-chart-leisure-activities/',
        sourceLabel: 'IELTS Liz - Leisure activities',
    },
    19: {
        source: 'https://ieltsliz.com/ielts-line-graph-internet-usage/',
        sourceLabel: 'IELTS Liz - Internet usage by age',
        fallback: {
            kind: 'line',
            title: 'Internet use in UK by age group (%)',
            xLabels: ['1996', '2000', '2004', '2008', '2012', '2016'],
            yMax: 100,
            series: [
                { name: '16-24', values: [2, 20, 60, 80, 92, 96] },
                { name: '25-44', values: [1, 15, 50, 72, 85, 92] },
                { name: '45-54', values: [0, 8, 30, 55, 70, 80] },
                { name: '55-64', values: [0, 4, 16, 38, 54, 66] },
            ],
        },
    },
    20: {
        source: 'https://ieltsliz.com/ielts-line-graph-migration-uk/',
        sourceLabel: 'IELTS Liz - UK migration',
        fallback: {
            kind: 'line',
            title: 'Migration to/from UK (thousands)',
            xLabels: ['1999', '2001', '2003', '2005', '2007', '2008'],
            yMax: 650,
            series: [
                { name: 'Immigration', values: [450, 480, 510, 565, 575, 575] },
                { name: 'Emigration', values: [300, 310, 330, 360, 400, 420] },
            ],
        },
    },
    21: {
        source: 'https://ieltsliz.com/ielts-line-graph-unemployment/',
        sourceLabel: 'IELTS Liz - Unemployment Australia & NZ',
        fallback: {
            kind: 'line',
            title: 'Unemployment rate (%)',
            xLabels: ['1980', '1985', '1990', '1995', '2000', '2005', '2010'],
            yMax: 13,
            series: [
                { name: 'Australia', values: [6, 8.5, 7, 9, 6.5, 5, 5.2] },
                { name: 'New Zealand', values: [6, 5.5, 7.5, 8.5, 6, 3.8, 6.5] },
            ],
        },
    },
    22: {
        source: 'https://ieltsliz.com/ielts-line-graph-museum-visitors/',
        sourceLabel: 'IELTS Liz - London museum visitors',
        fallback: {
            kind: 'line',
            title: 'Museum visitors (millions)',
            xLabels: ['2010', '2012', '2014', '2016', '2018', '2019'],
            yMax: 7,
            series: [
                { name: 'British Museum', values: [5.8, 5.6, 6.0, 6.2, 6.3, 6.4] },
                { name: 'Natural History', values: [4.9, 4.7, 5.0, 5.2, 5.3, 5.4] },
                { name: 'V&A', values: [2.3, 2.2, 2.5, 2.7, 2.9, 3.0] },
            ],
        },
    },
    23: {
        source: 'https://ieltsliz.com/ielts-table-working-hours/',
        sourceLabel: 'IELTS Liz - Working hours and salary',
    },
    24: {
        source: 'https://ieltsliz.com/ielts-bar-chart-school-transport/',
        sourceLabel: 'IELTS Liz - School travel modes',
    },
    25: {
        source: 'https://ieltsliz.com/ielts-process-desalination/',
        sourceLabel: 'IELTS Liz - Desalination process',
    },
    26: {
        source: 'https://ieltsliz.com/ielts-process-geothermal/',
        sourceLabel: 'IELTS Liz - Geothermal energy',
    },
    27: {
        source: 'https://ieltsliz.com/ielts-process-orange-juice/',
        sourceLabel: 'IELTS Liz - Orange juice production',
    },
    28: {
        source: 'https://ieltsliz.com/ielts-process-hydroelectric/',
        sourceLabel: 'IELTS Liz - Hydroelectric dam',
    },
    29: {
        source: 'https://ieltsliz.com/ielts-map-village-changes/',
        sourceLabel: 'IELTS Liz - Village development map',
    },
    30: {
        source: 'https://ieltsliz.com/ielts-map-island-development/',
        sourceLabel: 'IELTS Liz - Island resort plan',
    },
    31: {
        source: 'https://ieltsliz.com/ielts-bar-chart-tourism/',
        sourceLabel: 'IELTS Liz - International tourist arrivals',
    },
    32: {
        source: 'https://ieltsliz.com/ielts-bar-chart-university-subjects/',
        sourceLabel: 'IELTS Liz - University subjects by gender',
    },
    33: {
        source: 'https://ieltsliz.com/ielts-bar-chart-water-consumption/',
        sourceLabel: 'IELTS Liz - Household water use',
    },
    34: {
        source: 'https://ieltsliz.com/ielts-pie-chart-electricity-sources/',
        sourceLabel: 'IELTS Liz - Electricity generation sources',
    },
    35: {
        source: 'https://ieltsliz.com/ielts-process-brick-making/',
        sourceLabel: 'IELTS Liz - Brick manufacturing',
    },
    36: {
        source: 'https://ieltsliz.com/ielts-pie-chart-household-spending/',
        sourceLabel: 'IELTS Liz - Household income spending',
    },
    37: {
        source: 'https://ieltsliz.com/ielts-line-graph-marriage-age/',
        sourceLabel: 'IELTS Liz - Age at first marriage',
        fallback: {
            kind: 'line',
            title: 'Average age at first marriage',
            xLabels: ['1970', '1980', '1990', '2000', '2010'],
            yMax: 38,
            series: [
                { name: 'UK men', values: [24, 25, 27, 30, 32] },
                { name: 'UK women', values: [22, 23, 25, 28, 30] },
                { name: 'Sweden men', values: [26, 28, 30, 33, 35] },
                { name: 'Sweden women', values: [23, 25, 28, 31, 33] },
            ],
        },
    },
};
