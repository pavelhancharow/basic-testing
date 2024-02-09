import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';

const targetPath = 'file.txt';
const fileContent = 'Hello, World!!!';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeout = jest.spyOn(global, 'setTimeout');
    const callback = Function;
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(setTimeout).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setInterval = jest.spyOn(global, 'setInterval');
    const callback = Function;
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(setInterval).toHaveBeenCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(interval / 2);

    expect(callback).not.toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval / 2);

    expect(callback).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(interval);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join = jest.spyOn(path, 'join');

    await readFileAsynchronously(targetPath);

    expect(join).toHaveBeenCalledWith(__dirname, targetPath);
  });

  test('should return null if file does not exist', async () => {
    const existsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const readFile = jest.spyOn(fs.promises, 'readFile');

    const result = await readFileAsynchronously(targetPath);

    expect(existsSync).toHaveBeenCalledWith(
      expect.stringContaining(targetPath),
    );
    expect(readFile).not.toHaveBeenCalled();
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existsSync = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readFile = jest
      .spyOn(fs.promises, 'readFile')
      .mockImplementation(() => {
        return Promise.resolve(Buffer.from(fileContent));
      });

    const result = await readFileAsynchronously(targetPath);

    expect(existsSync).toHaveBeenCalledWith(
      expect.stringContaining(targetPath),
    );

    expect(readFile).toHaveBeenCalledWith(expect.stringContaining(targetPath));

    expect(result).toBe(fileContent);
  });
});
