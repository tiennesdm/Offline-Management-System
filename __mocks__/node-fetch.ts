import { Response } from 'node-fetch';

const fetch = jest.fn();

fetch.mockImplementation((url: string) => {
  return Promise.resolve(
    new Response(JSON.stringify({ data: 'mocked data' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  );
});

export default fetch;