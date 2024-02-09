import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const albumsUrl = '/albums';
const baseURL = 'https://jsonplaceholder.typicode.com';

const response = {
  data: [
    {
      userId: 1,
      id: 1,
      title: 'quidem molestiae enim',
    },
  ],
};

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(async () => {
    mockedAxios.create.mockReturnThis();
    mockedAxios.get.mockResolvedValue(response);

    await throttledGetDataFromApi(albumsUrl);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    expect(mockedAxios.get).not.toHaveBeenCalledWith(albumsUrl);

    jest.advanceTimersByTime(5000);
    expect(mockedAxios.get).toHaveBeenCalledWith(albumsUrl);
  });

  test('should return response data', async () => {
    await expect(mockedAxios.get(albumsUrl)).resolves.toBe(response);

    await expect(throttledGetDataFromApi(albumsUrl)).resolves.toBe(
      response.data,
    );
  });
});
