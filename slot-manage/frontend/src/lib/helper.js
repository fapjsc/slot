export const _getFilterData = (
  DUMMY_DATA,
  selectPlayer,
  selectMachine,
  isFilterPlayer,
  isFilterMachine,
  cashInTimeFilter,
  cashOutTimeFilter,
  cashIn,
  cashOut
) => {
  let filterResultData = [];

  // Only Player
  if (isFilterPlayer && !isFilterMachine && !cashInTimeFilter && !cashOutTimeFilter) {
    filterResultData = DUMMY_DATA.filter(el => el.player === selectPlayer);
  }

  // Player & CashIn
  if (isFilterPlayer && !isFilterMachine && cashInTimeFilter && !cashOutTimeFilter) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.player === selectPlayer &&
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime
    );
  }

  // Player & CashOut
  if (isFilterPlayer && cashOutTimeFilter && !isFilterMachine && !cashInTimeFilter) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.player === selectPlayer &&
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  // Player & CashIn & CashOut
  if (isFilterPlayer && cashInTimeFilter && cashOutTimeFilter && !isFilterMachine) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.player === selectPlayer &&
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime &&
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  // Only Machine
  if (isFilterMachine && !isFilterPlayer && !cashInTimeFilter && !cashOutTimeFilter) {
    filterResultData = DUMMY_DATA.filter(el => el.machine === selectMachine);
  }

  // Machine & CashIn
  if (isFilterMachine && cashInTimeFilter && !isFilterPlayer && !cashOutTimeFilter) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.machine === selectMachine &&
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime
    );
  }

  // Machine & CashOut
  if (isFilterMachine && cashOutTimeFilter && !isFilterPlayer && !cashInTimeFilter) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.machine === selectMachine &&
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  // Machine & CashIn & CashOut
  if (isFilterMachine && cashInTimeFilter && cashOutTimeFilter && !isFilterPlayer) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.machine === selectMachine &&
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime &&
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  // Machine & Player
  if (isFilterPlayer && isFilterMachine && !cashInTimeFilter && !cashOutTimeFilter) {
    filterResultData = DUMMY_DATA.filter(
      el => el.player === selectPlayer && el.machine === selectMachine
    );
  }

  // Machine & Player & CashIn
  if (isFilterPlayer && isFilterMachine && cashInTimeFilter && !cashOutTimeFilter) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.player === selectPlayer &&
        el.machine === selectMachine &&
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime
    );
  }

  // Machine & Player & CashOut
  if (isFilterPlayer && isFilterMachine && cashOutTimeFilter && !cashInTimeFilter) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.player === selectPlayer &&
        el.machine === selectMachine &&
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  // Only CashIn Date
  if (cashInTimeFilter && !cashOutTimeFilter && !isFilterPlayer && !isFilterMachine) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime
    );
  }

  // Only CashOut Date
  if (cashOutTimeFilter && !cashInTimeFilter && !isFilterPlayer && !isFilterMachine) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  // CashIn & CashOut Date
  if (cashOutTimeFilter && cashInTimeFilter && !isFilterPlayer && !isFilterMachine) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime &&
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  // No Filter
  if (!isFilterPlayer && !isFilterMachine && !cashInTimeFilter && !cashOutTimeFilter) {
    filterResultData = DUMMY_DATA;
  }

  // All Filter
  if (cashOutTimeFilter && cashInTimeFilter && isFilterPlayer && isFilterMachine) {
    filterResultData = DUMMY_DATA.filter(
      el =>
        el.player === selectPlayer &&
        el.machine === selectMachine &&
        cashIn.startTime <= new Date(el.cashInTime).getTime() &&
        new Date(el.cashInTime).getTime() <= cashIn.endTime &&
        cashOut.startTime <= new Date(el.cashOutTime).getTime() &&
        new Date(el.cashOutTime).getTime() <= cashOut.endTime
    );
  }

  return filterResultData;
};
