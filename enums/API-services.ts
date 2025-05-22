import { APIRequestContext, expect } from '@playwright/test';
import {URLs} from "./URLs";

export async function findPackageBySlug(
    apiContext: APIRequestContext,
    expectedSlug: string
): Promise<any> {
    const response = await apiContext.get(URLs.packages, {
        headers: {
            Accept: 'application/json',
        },
    });

    console.log('📡 Fetching packages from:', response.url());
    expect(response.status()).toBe(200);

    const body = await response.json();

    if (!Array.isArray(body.data)) {
        throw new Error('Invalid response structure from packages endpoint.');
    }

    const matchingPackage = body.data.find((pkg: { slug: string; }) => pkg.slug === expectedSlug);

    if (!matchingPackage) {
        throw new Error(`❌ Package with slug "${expectedSlug}" not found in packages list.`);
    }

    console.log(`✅ Found matching package: ${matchingPackage.slug} (${matchingPackage.title})`);

    return matchingPackage;
}

export async function submitOrder(
    apiContext: APIRequestContext,
    packageId: string,
    quantity = '6'
): Promise<any> {


    console.log('Submitting Order Payload:', {
        quantity,
        package_id: packageId,
    });

    const response = await apiContext.post(URLs.orders, {
        multipart: {
            quantity,
            package_id: packageId,
        },
        headers: {
            Accept: 'application/json',
        },
    });
    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty('order_id');
    expect(Array.isArray(body.esims)).toBe(true);
    expect(body.esims.length).toBe(Number(quantity));

    body.esims.forEach((esim: any) => {
        expect(esim.package_id).toBe(packageId);
    });

    return body;
}

export async function getAndValidateEsims(
    apiContext: APIRequestContext,
    expectedSlug: string,
    expectedCount = 6
): Promise<any[]> {
    const response = await apiContext.get(URLs.esims);
    expect(response.status()).toBe(200);

    const esims = await response.json();

    expect(esims.length).toBe(expectedCount);

    esims.forEach((esim: any) => {
        expect(esim.package_slug).toBe(expectedSlug);
    });

    return esims;
}