import * as types from '../../actions/actionTypes';
import userState from '../../states/user';

export default function user(state = userState, action) {
    switch (action.type) {
        case types.SET_LOGIN_UUID:
            return {
                ...state,
                loginUuid: action.data
            };
        default:
            return state;
    }
}