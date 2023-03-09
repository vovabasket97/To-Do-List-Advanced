import { useState, useCallback, FC, ReactNode } from 'react';

import { Grid, Input, Button, Group, Tooltip, Textarea, FocusTrap } from '@mantine/core';

import { useToggle } from '@mantine/hooks';

interface ISidebarEditorItem {
  value: string;
  onChange: (value: string) => void;
  inputType?: 'textarea' | 'input';
  children?: ReactNode;
}

const SidebarEditorItem: FC<ISidebarEditorItem> = ({ value, onChange, inputType, children }) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [toggleValue, toggle] = useToggle(['default', 'editor']);

  const onCancelHandler = useCallback(() => {
    toggle();
    setInputValue(value);
  }, [toggle, value]);

  const onSaveHandler = useCallback(() => {
    toggle();
    onChange(inputValue);
  }, [inputValue, onChange, toggle]);

  return (
    <Tooltip withArrow label='Click for edit' offset={10} transition='fade' transitionDuration={200}>
      {toggleValue === 'editor' ? (
        <Grid>
          <Grid.Col span={12}>
            <FocusTrap active={toggleValue === 'editor'}>
              {inputType === 'textarea' ? (
                <Textarea value={inputValue} onChange={e => setInputValue(e.target.value)} />
              ) : (
                <Input value={inputValue} onChange={e => setInputValue(e.target.value)} />
              )}
            </FocusTrap>
          </Grid.Col>
          <Grid.Col span={12}>
            <Group>
              <Button color='red' onClick={onCancelHandler}>
                Cancel
              </Button>
              <Button onClick={onSaveHandler}>Save</Button>
            </Group>
          </Grid.Col>
        </Grid>
      ) : (
        <div className='w-fit' onClick={() => toggle()}>
          {children}
        </div>
      )}
    </Tooltip>
  );
};

export default SidebarEditorItem;
