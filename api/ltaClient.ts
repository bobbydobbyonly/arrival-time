/**
 * LTA DataMall API Client
 *
 * GUARDRAILS FOR CREDENTIALS: Any API key, token, or credential is read ONLY
 * inside files in the repo-root api/ directory, via process.env.LTA_DATAMALL_ACCOUNT_KEY.
 * If a credential is missing at runtime, return HTTP 500 with {"error":"credential not configured"}
 * rather than calling the provider without it.
 */

const LTA_BASE_URL = 'https://datamall2.mytransport.sg/ltaodataservice';

export function getLtaAccountKey(): string | null {
  const key = process.env.LTA_DATAMALL_ACCOUNT_KEY;
  if (!key || key.trim() === '' || key === 'MY_LTA_DATAMALL_ACCOUNT_KEY') {
    return null;
  }
  return key.trim();
}

export async function fetchLtaData<T>(
  endpoint: string,
  params?: Record<string, string>
): Promise<{ data?: T; error?: string; status: number }> {
  const accountKey = getLtaAccountKey();

  // Guardrail: if credential is not configured, reject with 500 without making external calls
  if (!accountKey) {
    return {
      status: 500,
      error: 'credential not configured',
    };
  }

  let url = `${LTA_BASE_URL}/${endpoint}`;
  if (params && Object.keys(params).length > 0) {
    const query = new URLSearchParams(params).toString();
    url += (url.includes('?') ? '&' : '?') + query;
  }

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        AccountKey: accountKey,
        accept: 'application/json',
      },
    });

    if (!res.ok) {
      return {
        status: res.status,
        error: `LTA API error (${res.status} ${res.statusText})`,
      };
    }

    const json = (await res.json()) as T;
    return {
      status: 200,
      data: json,
    };
  } catch (err: any) {
    return {
      status: 500,
      error: err?.message || 'Failed to fetch from LTA DataMall',
    };
  }
}
