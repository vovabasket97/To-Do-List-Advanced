import { useState, useCallback, useMemo, memo, useEffect } from 'react';

import { Drawer, Text, Grid, SimpleGrid, Select } from '@mantine/core';
import SidebarEditorItem from './SidebarEditorItem';

import { useActions } from 'hooks/useActions';
import { data } from 'configs/todo/getInitialData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { IToDo } from 'shared/types/todo.types';

const SidebarEditer = ({ opened }: { opened: boolean }) => {
  const actions = useActions();
  const columns = useTypedSelector(state => state.todo.columns);
  const itemId = useTypedSelector(state => state.todo.lastOpenedItemId);
  const newData = useMemo(() => data.map(el => ({ value: el.value, label: el.title })), []);

  const item = useMemo((): IToDo | undefined => {
    return Object.values(columns)
      .map(el => el.items)
      .flat()
      .find(el => el.value === itemId);
  }, [columns, itemId]);

  const [type, setType] = useState(item?.status ? newData.find(el => el?.value === item?.status)?.value : newData[0].value);
  const [name, setName] = useState(item?.name ?? '');
  const [description, setDescription] = useState(item?.description ?? '');

  useEffect(() => {
    if (!item) return;
    setType(item.status);
    setName(item.name);
    setDescription(item.description);
  }, [item]);

  const changeItemHandler = useCallback((obj: object) => actions.editToDoItems(obj), [actions]);

  const onChangeName = useCallback(
    (value: string) => {
      setName(value);
      changeItemHandler({ ...item, oldStatus: item?.status, name: value });
    },
    [changeItemHandler, item]
  );

  const onChangeDescription = useCallback(
    (value: string) => {
      setDescription(value);
      changeItemHandler({ ...item, oldStatus: item?.status, description: value });
    },
    [changeItemHandler, item]
  );

  const onChangeType = useCallback(
    (type: string) => {
      setType(type);
      changeItemHandler({
        ...item,
        status: type,
        oldStatus: item?.status,
        name,
        description
      });
    },
    [changeItemHandler, description, item, name]
  );

  const onCloseHandler = useCallback(() => actions.changeDrawerToDoItem(false), [actions]);

  return (
    <Drawer
      position='right'
      opened={opened}
      onClose={onCloseHandler}
      title={
        <SidebarEditorItem value={name} onChange={onChangeName}>
          <h2 className='text-xl font-bold'>{name}</h2>
        </SidebarEditorItem>
      }
      padding='xl'
      size='xl'
      transition='slide-left'
      transitionDuration={250}
      transitionTimingFunction='ease'
    >
      <Grid grow gutter={15}>
        <Grid.Col span={12}>
          <SimpleGrid spacing={10} cols={1}>
            <Text size='lg' weight={500}>
              Description
            </Text>
            <SidebarEditorItem inputType='textarea' value={description} onChange={onChangeDescription}>
              <Text size='sm' weight={400}>
                {description}
              </Text>
            </SidebarEditorItem>
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={12}>
          <SimpleGrid spacing={10} cols={1}>
            <Text size='lg' weight={500}>
              Category
            </Text>
            <Select
              allowDeselect
              className='mt-2'
              size='md'
              data={newData}
              onChange={onChangeType}
              value={type}
              transition='pop-top-left'
              transitionDuration={80}
              transitionTimingFunction='ease'
              required
            />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Drawer>
  );
};

export default memo(SidebarEditer);
