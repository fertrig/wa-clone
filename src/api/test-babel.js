import path from 'path';

const directories = ['/foo', 'bar', 'baz/abc', 'qwerty', '..'];

const result = path.join(...directories);

console.log(result);