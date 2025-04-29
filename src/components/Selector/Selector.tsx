import { SortType, ISortProps } from '../../types/types';
import { Select } from '@mantine/core';

export const Selector: React.FC<ISortProps> = ({
  sortType,
  onChangeSort,
  sortList,
}) => {
  return (
    <>
      <Select
        label="Sort by:"
        placeholder="Default"
        data={sortList}
        value={sortType}
        checkIconPosition="right"
        onChange={(value) => onChangeSort(value as SortType)}
        allowDeselect={false}
      />
    </>
  );
};
