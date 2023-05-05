import { ActionIcon, Button, FocusTrap, Grid, Group, Input, Textarea, Tooltip } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconEditCircle } from '@tabler/icons';
import { FC, ReactNode, useCallback, useState } from 'react';

import styles from './SidebarEditorItem.module.scss';

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
    <Tooltip withArrow label='Click on icon for edit' offset={10} transition='fade' transitionDuration={200}>
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
        <div className={styles.SidebarEditorItem}>
          <ActionIcon className={styles.SidebarEditorItem_icon} variant='outline' onClick={() => toggle()}>
            <IconEditCircle size='12px' radius='sm' />
          </ActionIcon>
          {children}
        </div>
      )}
    </Tooltip>
  );
};

export default SidebarEditorItem;
