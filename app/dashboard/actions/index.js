import * as types from './types';

export function reportOpenTopBarButtonsTray(filter) {
    return {
        type: types.OPEN_TOP_BAR_BUTTONS_TRAY,
        payload: filter
    };
}
