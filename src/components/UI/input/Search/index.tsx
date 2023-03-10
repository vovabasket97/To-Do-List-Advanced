import React, { useState } from 'react';

import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons';
import { useDebouncedValue } from '@mantine/hooks';

const Search = ({ className = '', ...rest }) => {
  const theme = useMantineTheme();
  const [value, setValue] = useState('');
  const [debounced] = useDebouncedValue(value, 200);

  console.log(debounced);

  return (
    <div className={className}>
      <TextInput
        icon={<IconSearch size={18} stroke={1.5} />}
        radius='xl'
        size='md'
        rightSection={
          <ActionIcon onClick={() => console.log('clicked')} size={32} radius='xl' color={theme.primaryColor} variant='filled'>
            <IconArrowRight size={18} stroke={1.5} />
          </ActionIcon>
        }
        placeholder='Search questions'
        rightSectionWidth={42}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        {...rest}
      />
    </div>
  );
};

export default Search;
