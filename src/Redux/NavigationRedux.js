import { NavigationActions, StackActions } from "react-navigation";

import MainNav from "../Navigation/AppNavigation";
import { ScreenKey } from "../Constants";

import { AppStateTypes } from "../Redux/AppStateRedux";
import { AuthenticateTypes } from "../Redux/AuthenticateRedux";

import { CommonUtils } from "../Utils";

const { navigate } = NavigationActions;
const { reset } = StackActions;
const { getStateForAction } = MainNav.router;

const INITIAL_STATE = getStateForAction(
  navigate({ routeName: ScreenKey.SPLASH_SCREEN })
);
const NOT_AUTHENTICATE_STATE = getStateForAction(
  navigate({ routeName: ScreenKey.ONBOARDING_SCREEN })
);

const AUTHENTICATE_STATE = getStateForAction(
  navigate({ routeName: ScreenKey.DRAWER_NAV })
);
/**
 * Creates an navigation action for dispatching to Redux.
 *
 * @param {string} routeName The name of the route to go to.
 */
// const navigateTo = routeName => () => navigate({ routeName })

export function reducer(state = INITIAL_STATE, action) {
  // CommonUtils.log('NavigationRedux action:', action);
  // CommonUtils.log('NavigationRedux state:', state);

  // console.tron.display({
  //   name: "NavigationRedux action",
  //   value: action.type
  // });
  // console.tron.display({
  //   name: "NavigationRedux state",
  //   value: state
  // });

  switch (action.type) {
    case AppStateTypes.SET_REHYDRATION_COMPLETE:
      return NOT_AUTHENTICATE_STATE;
    case AuthenticateTypes.LOGOUT:
      return NOT_AUTHENTICATE_STATE;
    case AuthenticateTypes.AUTHENTICATE_SUCCESS:
      return AUTHENTICATE_STATE;
    case AuthenticateTypes.AUTO_AUTHENTICATE:
      return AUTHENTICATE_STATE;
  }
  let nextState = getStateForAction(action, state);

  // CommonUtils.log('NavigationRedux nextState:', nextState);
  // console.tron.display({
  //   name: "NavigationRedux nextState",
  //   value: nextState
  // });

  // CommonUtils.log('NavigationRedux nextState:', nextState);

  return nextState || state;
}

// const navReducer = (state, action) => {
//   const newState = AppNavigation.router.getStateForAction(action, state);
//   return newState || state;
// }
