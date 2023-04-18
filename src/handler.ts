import { SQSHandler } from 'aws-lambda';
import { main } from './batch/exec-proccess';

/**
 * Recieve a set of events and execute it them concurrently.
 * 
 * @param event trigger SQS event
 * @returns result of processing
 */
export const logEvent: SQSHandler = async (event) => {
    console.log(`Received event: ${JSON.stringify(event)}`);
    console.log(`Number of records received: ${event.Records?.length}`); // strongly typed access to event records collection
    main(event);    // Execute logic function
    return;
};



