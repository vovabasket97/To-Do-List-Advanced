import { useState, useRef, useCallback, FC, FunctionComponent } from 'react';
import { Autocomplete, Loader, AutocompleteItem } from '@mantine/core';
import { IconSearch } from '@tabler/icons';

interface IAsyncSearch {
  onChange: (value: string) => Promise<any[]>;
  onSubmit: (item: any) => void;
  itemComponent: FunctionComponent;
}

const AsyncSearch: FC<IAsyncSearch> = ({ onChange, onSubmit, itemComponent: Component }) => {
  const timeoutRef = useRef(-1);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Readonly<any[]>>([]);

  const handleChange = useCallback(
    (val: string) => {
      window.clearTimeout(timeoutRef.current);
      setValue(val);

      if (typeof val !== 'string') return;

      if (val.trim().length === 0) {
        setLoading(false);
        setData([]);
      } else {
        setLoading(true);
        timeoutRef.current = window.setTimeout(async () => {
          const newData = await onChange(val);
          setData(prev => [...newData]);
          setLoading(false);
        }, 1000);
      }
    },
    [onChange]
  );

  return (
    <Autocomplete
      itemComponent={Component}
      icon={<IconSearch size={18} stroke={1.5} />}
      radius='xl'
      size='md'
      value={value}
      data={data}
      onChange={handleChange}
      rightSection={<Loader size={16} color={loading ? '' : 'white'} />}
      rightSectionWidth={42}
      placeholder='Search questions'
      nothingFound='Nothing Found'
      onItemSubmit={(item: AutocompleteItem) => {
        setValue('');
        onSubmit(data.find((el: any) => el?.name === item?.name));
        setLoading(false);
      }}
      filter={(value, item) => item.name.toLowerCase().includes(value.toLowerCase().trim())}
      transition='pop-top-left'
      transitionDuration={80}
      transitionTimingFunction='ease'
    />
  );
};

export default AsyncSearch;
