let age: number;

age = 5;
let username: string;
username = 'fslfk';

let isTrue: boolean;
isTrue = false;

//complex

let hobbies: string[];

hobbies = ['sport', 'chess']

let person: {
    name: string;
    age: number;
};
person = {
    name: 'Max',
    age: 32,
    // k: 4;
}

function add(a: number, b: number) {
    return a;
}

function insertAtBegining<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBegining(demoArray, -1);





















