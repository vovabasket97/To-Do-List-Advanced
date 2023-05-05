import { Drawer, Grid, MultiSelect, Select, SimpleGrid, Text } from '@mantine/core';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';

import { IColumn } from 'shared/types/projects/column.types';
import { IProject, ITag } from 'shared/types/projects/projects.types';

import { data } from 'configs/projects/getInitialProjects';

import SidebarEditorItem from './SidebarEditorItem';

const SidebarEditer = () => {
  const actions = useActions();
  const opened = useTypedSelector(state => state.todo.drawer);
  const columns = useTypedSelector(state => state.todo.columns);
  const itemId = useTypedSelector(state => state.todo.lastOpenedItemId);
  const newData = useMemo(() => data.map(el => ({ value: el.value, label: el.title })), []);

  const item = useMemo((): IProject | undefined => {
    return Object.values(columns as IColumn)
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

  const changeItemHandler = useCallback((obj: object) => actions.editProjectsItems(obj), [actions]);

  const onChangeName = useCallback(
    (value: string) => {
      setName(value);
      changeItemHandler({ ...item, oldStatus: item?.status, name: value, tags: item?.tags });
    },
    [changeItemHandler, item]
  );

  const onChangeDescription = useCallback(
    (value: string) => {
      setDescription(value);
      changeItemHandler({ ...item, oldStatus: item?.status, description: value, tags: item?.tags });
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
        description,
        tags: item?.tags
      });
    },
    [changeItemHandler, description, item, name]
  );

  const onChangeTags = useCallback(
    (tag: ITag[], action?: string) => {
      const tags = item?.tags || [];
      const data = action && action === 'change' ? tag : [...tags, ...tag];
      changeItemHandler({
        ...item,
        status: item?.status,
        oldStatus: item?.status,
        name,
        description,
        tags: data
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
        <SimpleGrid spacing={10} cols={1}>
          <Text size='lg' weight={500}>
            Title
          </Text>
          <SidebarEditorItem value={name} onChange={onChangeName}>
            <Text size='sm' weight={400}>
              {name}
            </Text>
          </SidebarEditorItem>
        </SimpleGrid>
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
              size='sm'
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
        <Grid.Col span={12}>
          <SimpleGrid spacing={10} cols={1}>
            <Text size='lg' weight={500}>
              Tags
            </Text>
            <MultiSelect
              data={item?.tags?.map(el => ({ value: el.value, label: el.value })) || []}
              placeholder='Select tags'
              value={item?.tags?.map(el => el.value) || []}
              creatable
              searchable
              getCreateLabel={query => `+ Create ${query}`}
              onChange={(items: string[]) => {
                const data = items.map(el => ({ value: el }));
                onChangeTags(data, 'change');
              }}
              onCreate={query => {
                const item = { value: query };
                onChangeTags([item]);
                return item;
              }}
            />
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Drawer>
  );
};

export default memo(SidebarEditer);
