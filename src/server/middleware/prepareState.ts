import { Handler, Request, Response, NextFunction } from 'express';
import { getData } from 'server/dataSource';
import { rootReducer } from 'store';
import { matchUrl } from 'server/utils/matchUrl';

export function prepareState(): Handler {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            const router = matchUrl(req.url);

            if (!router) {
                return res.status(404).end();
            }

            const state = {
                ...rootReducer(undefined, { type: 'INIT' }),
                ...(await getData(router)),
            };

            req.state = {
                files: {},
                css: [],
                js: [],

                state,
            };

            next();
        } catch (err) {
            next(err);
        }
    };
}
