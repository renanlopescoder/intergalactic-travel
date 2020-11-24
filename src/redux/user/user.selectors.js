import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser,
);

export const selectUserHistory = createSelector([selectCurrentUser], (user) => {
  if (user) {
    return user.history;
  }

  return ["s"];
});
