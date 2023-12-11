import type {NotificationProps} from '@cares/common/types/announcement';
import {
  NEXT_PUBLIC_ONESIGNAL_APP_ID,
  NEXT_PUBLIC_ONESIGNAL_REST_API_KEY,
} from '@env';

interface NotificationResponseProps {
  external_id: string;
  id: 'string';
}

async function notifResponse(
  notifData: NotificationProps,
  restApiKey: string,
  onesignalId: string,
) {
  const notifPromise = await fetch(
    'https://onesignal.com/api/v1/notifications',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${restApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_id: `${onesignalId}`,
        ...notifData,
      }),
    },
  );
  const response = await notifPromise.json();
  return response;
}

async function notification(
  notifData: NotificationProps,
): Promise<NotificationResponseProps> {
  return await notifResponse(
    notifData,
    NEXT_PUBLIC_ONESIGNAL_REST_API_KEY,
    NEXT_PUBLIC_ONESIGNAL_APP_ID,
  );
}

export {notification};
