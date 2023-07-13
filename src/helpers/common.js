import _ from 'lodash';

export const searchFilter = (input, fullList) => {
    return Object.keys(fullList).filter(key => {
        const nameList = fullList[key].name.toLowerCase();
        return nameList.includes(input.toLowerCase())
    })
        .map(foundKey => ({ ...fullList[foundKey], key: foundKey }))
}

export const clearListByDeleted = (listDelated, currentList) => {
    return _.differenceBy(currentList, listDelated, 'id');
}