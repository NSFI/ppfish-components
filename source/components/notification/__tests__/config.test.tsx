import notification, { getInstance } from '../Notification';

import { act } from 'react-dom/test-utils';

const globalTimeout = global.setTimeout;

const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise(resolve => globalTimeout(resolve, timeout));
  });
};

describe('notification.config', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    notification.destroy();
  });

  it('should be able to config maxCount', async () => {
    notification.config({
      maxCount: 5,
      duration: 0.5,
    });

    for (let i = 0; i < 10; i += 1) {
      notification.open({
        message: 'Notification message',
        key: i+'',
      });
    }

    notification.open({
      message: 'Notification last',
      key: '11',
    });

    await Promise.resolve();

    expect(document.querySelectorAll('.fishd-notification-notice').length).toBe(5);
    expect(document.querySelectorAll('.fishd-notification-notice')[4].textContent).toBe(
      'Notification last',
    );

    jest.runAllTimers();
    await sleep(500);
    expect((await getInstance('fishd-notification-topRight')).component.state.notices).toHaveLength(
      0,
    );
  });
});
