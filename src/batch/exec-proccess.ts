export async function main(event: any) {
    if (event.Records?.length > 0) {
        //  console.log('This will be executed concurrently using Promise.allSettled(...)');
        const start: number = (new Date()).getTime();
        const messages = event.Records;
        const actions = messages.map(() => execProccess(2090));
        const results = await Promise.allSettled(actions);
        const groupByStatus = groupBy(['status']);
        const { rejected, fulfilled } = groupByStatus(results);
        // Manage previous result
        // console.log(`Output: `);
        console.log(`Function done - Total time: ${((new Date()).getTime() - start)}`);
    }
}


/**
 * REPLACE THIS CODE WITH BUSINESS LOGIS. THIS IS ONLY FOR TESTING PURPOSE.
 * 
 * @param ms miliseconsds to sleep the logic
 * @returns a resolution message
 */
function execProccess(ms = 0) {
    return new Promise(resolve => {
        setTimeout(() => {           // @ts-ignore
            resolve(ms);
        }, ms);
    });
}

/**
 * Group array of objects by given keys
 * @param keys keys to be grouped by
 * @param array objects to be grouped
 * @returns an object with objects in `array` grouped by `keys`
 * @see <https://gist.github.com/mikaello/06a76bca33e5d79cdd80c162d7774e9c>
 */
const groupBy = <T>(keys: (keyof T)[]) => (array: T[]): Record<string, T[]> =>
    array.reduce((objectsByKeyValue, obj) => {
        const value = keys.map((key) => obj[key]).join('-');
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {} as Record<string, T[]>);