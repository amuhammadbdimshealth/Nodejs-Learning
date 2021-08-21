# What are Streams?

[Tutorials_point](https://www.tutorialspoint.com/nodejs/nodejs_streams.htm)

## Streams are objects that let you read data from a source or write data to a destination in continuous fashion. In Node.js, there are four types of streams −

    1. Readable − Stream which is used for read operation.

    2. Writable − Stream which is used for write operation.

    3. Duplex − Stream which can be used for both read and write operation.

    4. Transform − A type of duplex stream where the output is computed based on input.

## Each type of Stream is an EventEmitter instance and throws several events at different instance of times. For example, some of the commonly used events are −

    1. data − This event is fired when there is data is available to read.

    2. end − This event is fired when there is no more data to read.

    3. error − This event is fired when there is any error receiving or writing data.

    4. finish − This event is fired when all the data has been flushed to underlying system

## Piping the Streams
Piping is a mechanism where we provide the output of one stream as the input to another stream. It is normally used to get data from one stream and to pass the output of that stream to another stream. There is no limit on piping operations. Now we'll show a piping example for reading from one file and writing it to another file.

## Chaining the Streams
Chaining is a mechanism to connect the output of one stream to another stream and create a chain of multiple stream operations. It is normally used with piping operations. Now we'll use piping and chaining to first compress a file and then decompress the same.