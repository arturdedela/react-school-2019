import { RouterState, RouterParams } from 'store/router/types';
import { PAGES } from 'pages';
import { Routes } from 'routes';
import { matchPath } from 'react-router';

export function matchUrl(url: string): RouterState {
    for (const route of Object.keys(PAGES) as Routes[]) {
        const result = matchPath<RouterParams>(url, PAGES[route]);

        if (result) {
            return { route, ...result };
        }
    }
}
