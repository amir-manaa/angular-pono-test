export function generateNewId(localStorgeItem: string): number {
    
    let localStorageVal = localStorage.getItem(localStorgeItem);
    if (localStorageVal === null) {
        return 0;
    }

    let items = JSON.parse(localStorageVal);
    let lastElement = items[items.length - 1];

    return lastElement['id']+1;
}