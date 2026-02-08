//version 1.0
//BY: Weichky

// 测试 窗口分辨率
console.log("Available resolution is " +
    screen.availWidth + "*" + screen.availHeight);

//常量初始化
const AVAILABLE_WIDTH = screen.availWidth;
const AVAILABLE_HEIGHT = screen.availHeight;
const MIN_LENGTH = AVAILABLE_WIDTH > AVAILABLE_HEIGHT ? AVAILABLE_HEIGHT : AVAILABLE_WIDTH;
const RANDOM_LINE_UPPER_BOUND = MIN_LENGTH < 775 ? 64 : 512;
console.log(MIN_LENGTH < 775);
const RANDOM_LINE_LOWER_BOUND = MIN_LENGTH < 775 ? 32 : 256;
const RANDOM_LINE_COUNT = getRandomInt(RANDOM_LINE_LOWER_BOUND,
    RANDOM_LINE_UPPER_BOUND);
const MIN_DISTANCE = MIN_LENGTH < 520 ? 10 : 30;
const COLUMN_PROBABILITY = 0.618;
const is_random_direction = false;


//通用函数初始化
//随机生成整数
function getRandomInt(MIN, MAX) {
    return Math.floor(Math.random() * (MAX - MIN)) + MIN;
}
//二位数组插入三维数组
function insert3DArray(originArr, instertArr, option_1, option_2) {
    let index = 0;
    // 找到要插入的位置
    while (index < originArr.length &&
        originArr[index][option_1][option_2] < instertArr[option_1][option_2]) {
        index++;
    }
    // 使用splice在找到的位置插入新元素
    originArr.splice(index, 0, instertArr);
}


//数组初始化
var randomLineInfo = [];
for (let i = 0; i < RANDOM_LINE_COUNT; i++) {
    randomLineInfo[i] = [];
    randomLineInfo[i][0] = [];
}
//随机纵向横向
if (is_random_direction) {
    for (let i = 0; i < RANDOM_LINE_COUNT; i++) {
        if (Math.random() < COLUMN_PROBABILITY)
            randomLineInfo[i][1] = 'Column';
        else
            randomLineInfo[i][1] = 'Row';
    }
} else {
    let is_column = true;
    if (Math.random() < COLUMN_PROBABILITY) {
        randomLineInfo[0][1] = 'Column';
        is_column = true;
    }
    else {
        randomLineInfo[0][1] = 'Row';
        is_column = false;
    }
    for (let i = 1; i < RANDOM_LINE_COUNT; i++) {
        if (is_column) {
            randomLineInfo[i][1] = 'Row';
            is_column = false;
        } else {
            randomLineInfo[i][1] = 'Column';
            is_column = true;
        }
    }
}
//随机坐标
if (MIN_LENGTH / RANDOM_LINE_COUNT > 1.5 * MIN_DISTANCE) {
    randomLineInfo[0][0] = [Math.floor(Math.random() * AVAILABLE_WIDTH),
    Math.floor(Math.random() * AVAILABLE_HEIGHT)];
    for (let i = 1; i < RANDOM_LINE_COUNT; i++) {
        let newCoord = [getRandomInt(0, AVAILABLE_WIDTH),
        getRandomInt(0, AVAILABLE_HEIGHT)];
        let is_too_close = false;
        for (let j = 0; j < i; j++) {
            if (Math.abs(newCoord[0] - randomLineInfo[j][0][0]) < MIN_DISTANCE ||
                Math.abs(newCoord[1] - randomLineInfo[j][0][1]) < MIN_DISTANCE) {
                is_too_close = true;
                break;
            }
        }
        if (!is_too_close)
            randomLineInfo[i][0] = newCoord;
        else
            i--;

    }
} else {
    for (let i = 0; i < RANDOM_LINE_COUNT; i++) {
        randomLineInfo[i][0] = [Math.floor(Math.random() * AVAILABLE_WIDTH),
        Math.floor(Math.random() * AVAILABLE_HEIGHT)];
    }
}
//初始化 待处理列 与 待处理行
let processingRow = [[[0, 0], [AVAILABLE_WIDTH, 0]],
[[0, AVAILABLE_HEIGHT], [AVAILABLE_WIDTH, AVAILABLE_HEIGHT]]];
let processingColumn = [[[0, 0], [0, AVAILABLE_HEIGHT]],
[[AVAILABLE_WIDTH, 0], [AVAILABLE_WIDTH, AVAILABLE_WIDTH]]];

//初始化 交点
let intersectionInfo = [[0, 0, 'UL'], [AVAILABLE_WIDTH, 0, 'UR'],
[0, AVAILABLE_HEIGHT, 'DL'], [AVAILABLE_WIDTH, AVAILABLE_HEIGHT, 'DR']];

//生成交点
for (let i = 0; i < RANDOM_LINE_COUNT; i++) {
    if (randomLineInfo[i][1] == 'Column') {
        let nearestGreaterJ = processingRow.length - 1;
        let nearestSmallerJ = 0;
        for (let j = processingRow.length - 1; j > 0; j--) {
            if (randomLineInfo[i][0][0] < processingRow[j][1][0] &&
                randomLineInfo[i][0][0] > processingRow[j][0][0]) {
                if (randomLineInfo[i][0][1] < processingRow[j][0][1] &&
                    processingRow[j][0][1] < processingRow[nearestGreaterJ][0][1])
                    nearestGreaterJ = j;
            }
        }
        let j = 0;
        while (j < processingRow.length) {
            if (randomLineInfo[i][0][0] < processingRow[j][1][0] &&
                randomLineInfo[i][0][0] > processingRow[j][0][0]) {
                if (randomLineInfo[i][0][1] > processingRow[j][0][1] &&
                    processingRow[j][0][1] > processingRow[nearestSmallerJ][0][1])
                    nearestSmallerJ = j;
            }
            j++;
        }
        intersectionInfo[intersectionInfo.length] =
            [randomLineInfo[i][0][0],
            processingRow[nearestGreaterJ][0][1],
                'D'];
        intersectionInfo[intersectionInfo.length] =
            [randomLineInfo[i][0][0],
            processingRow[nearestSmallerJ][0][1],
                'U'];
        let instertingArray =
            [[randomLineInfo[i][0][0],
            processingRow[nearestSmallerJ][0][1]],
            [randomLineInfo[i][0][0],
            processingRow[nearestGreaterJ][0][1]]];
        insert3DArray(processingColumn, instertingArray, 0, 0);
    } else {
        let nearestGreaterJ = processingColumn.length - 1;
        let nearestSmallerJ = 0;
        for (let j = processingColumn.length - 1; j > 0; j--) {
            if (randomLineInfo[i][0][1] < processingColumn[j][1][1] &&
                randomLineInfo[i][0][1] > processingColumn[j][0][1]) {
                if (randomLineInfo[i][0][0] < processingColumn[j][0][0] &&
                    processingColumn[j][0][0] < processingColumn[nearestGreaterJ][0][0])
                    nearestGreaterJ = j;
            }
        }
        let j = 0;
        while (j < processingColumn.length) {
            if (randomLineInfo[i][0][1] < processingColumn[j][1][1] &&
                randomLineInfo[i][0][1] > processingColumn[j][0][1]) {
                if (randomLineInfo[i][0][0] > processingColumn[j][0][0 &&
                    processingColumn[j][0][0] > processingColumn[nearestSmallerJ][0][0]])
                    nearestSmallerJ = j;
            }
            j++;
        }
        intersectionInfo[intersectionInfo.length] =
            [processingColumn[nearestGreaterJ][0][0],
            randomLineInfo[i][0][1],
                'R'];
        intersectionInfo[intersectionInfo.length] =
            [processingColumn[nearestSmallerJ][0][0],
            randomLineInfo[i][0][1],
                'L'];
        let instertingArray =
            [[processingColumn[nearestSmallerJ][0][0],
            randomLineInfo[i][0][1]],
            [processingColumn[nearestGreaterJ][0][0],
            randomLineInfo[i][0][1]]];
        insert3DArray(processingRow, instertingArray, 0, 1);
    }
}

//感谢https://www.cnblogs.com/matthew-2013/p/3524297.html 作者：matthew2015
function deepcopy(obj) {
    var out = [], i = 0, len = obj.length;
    for (; i < len; i++) {
        if (obj[i] instanceof Array) {
            out[i] = deepcopy(obj[i]);
        }
        else out[i] = obj[i];
    }
    return out;
}

function sortByColumn(arr) {
    arr.sort(function (a, b) {
        return a[0] - b[0];
    });
    return arr;
}

function sortByRow(arr) {
    arr.sort(function (a, b) {
        return a[1] - b[1];
    });
    return arr;
}

function findClosestColumn(arr, coord) {
    let closestColumn = Infinity;
    let closestPoint = null;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][1] == coord[1]) {
            let diffColumn = arr[i][0] - coord[0];
            if (diffColumn > 0 &&
                diffColumn < closestColumn) {
                if (arr[i][2] == 'U' ||
                    arr[i][2] == 'R' ||
                    arr[i][2] == 'UR') {
                    closestColumn = diffColumn;
                    closestPoint = arr[i];
                }
            }
        }
    }
    return closestPoint;
}

function findClosestRow(arr, coord) {
    let closestRow = Infinity;
    let closestPoint = null;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == coord[0]) {
            let diffRow = arr[i][1] - coord[1];
            if (diffRow > 0 &&
                diffRow < closestRow) {
                if (arr[i][2] == 'D' ||
                    arr[i][2] == 'L' ||
                    arr[i][2] == 'DL') {
                    closestRow = diffRow;
                    closestPoint = arr[i];
                }
            }
        }
    }
    return closestPoint;
}

let intersectionByColumn = deepcopy(intersectionInfo);
let intersectionByRow = deepcopy(intersectionInfo);

intersectionByColumn = sortByColumn(sortByRow(intersectionByColumn));
intersectionByRow = sortByRow(sortByColumn(intersectionByRow));

var blockInfo = [];
var blockNum = 0;

let tmpVariableA = [];
let tmpVariableB = [];

for (let i = 0; i < intersectionInfo.length; i++) {
    if (intersectionByRow[i][2] == 'U' ||
        intersectionByRow[i][2] == 'L' ||
        intersectionByRow[i][2] == 'UL') {
        tmpVariableA = findClosestColumn(intersectionByRow, intersectionByRow[i]);
        if ((tmpVariableA != null) &&
            (tmpVariableA[2] == 'U' ||
                tmpVariableA[2] == 'R' ||
                tmpVariableA[2] == 'UR')) {
            tmpVariableB = findClosestRow(intersectionByColumn, intersectionByRow[i]);
            if ((tmpVariableB != null) &&
                (tmpVariableB[2] == 'D' ||
                    tmpVariableB[2] == 'L' ||
                    tmpVariableB[2] == 'DL')) {
                blockInfo[blockNum] = [intersectionByRow[i], (tmpVariableA[0] - intersectionByRow[i][0]), (tmpVariableB[1] - intersectionByRow[i][1]), blockNum];
                blockNum++;
            }
        }
    }
}
console.log(blockInfo);
