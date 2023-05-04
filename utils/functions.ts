export const checkIsFalsy = (data: any) => {
  return [null, '', undefined].includes(data);
};

export const numberPrettier = (value?: number, prefix = 'Rp. ') => {
  return !checkIsFalsy(value)
    ? `${prefix} ${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`
    : `${prefix}0`;
};
