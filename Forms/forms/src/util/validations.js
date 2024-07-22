export function isEmail(value){
    return value.includes('@');
}

export function isNotEmpty(value){
    return value.trim() !== '';
}

export function hasMinLength(value, min){
    return value.length >= min;
}

export function isEqualTo(value, secondValue){
    return value === secondValue;
}