import React, { useCallback, useState } from 'react';

import { TextInput, Select, Button, Paper, Text, Textarea, Group, SimpleGrid, createStyles, MultiSelect } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useActions } from 'hooks/useActions';
import { IconCheck } from '@tabler/icons';

import { data } from 'configs/todo/getInitialData';

import styles from './addTask.module.scss';
import { ITag } from 'shared/types/todo.types';

const useStyles = createStyles(theme => {
  const BREAKPOINT = theme.fn.smallerThan('sm');

  return {
    wrapper: {
      display: 'flex',
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      borderRadius: theme.radius.lg,
      padding: 4,
      border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[2]}`,

      [BREAKPOINT]: {
        flexDirection: 'column'
      }
    },

    form: {
      boxSizing: 'border-box',
      flex: 1,
      padding: theme.spacing.xl,
      borderLeft: 0,

      [BREAKPOINT]: {
        padding: theme.spacing.md,
        paddingLeft: theme.spacing.md
      }
    },

    fields: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: -12,
      gap: '16px'
    },

    title: {
      marginBottom: theme.spacing.xl * 1.5,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,

      [BREAKPOINT]: {
        marginBottom: theme.spacing.xl
      }
    },

    control: {
      [BREAKPOINT]: {
        flex: 1
      }
    }
  };
});

const AddTask = () => {
  const actions = useActions();
  const { classes } = useStyles();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState<ITag[]>([]);

  const onChangeTitleHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), []);
  const onChangeAreaHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => setDesc(e.target.value), []);
  const onChangeTypeHandler = useCallback((value: string) => setType(value), []);

  const onClickSubmitHandler = useCallback(() => {
    actions.addNewTodoState({ title, description: desc, type, tags });
    showNotification({
      title: 'Great job',
      message: 'Your task was added successfully! 🤥',
      loading: false,
      icon: <IconCheck size={18} />,
      color: 'teal'
    });
    setTitle('');
    setType('');
    setDesc('');
    setTags([]);
  }, [actions, desc, title, type, tags]);

  return (
    <div className={styles.addTask}>
      <Paper shadow='md' radius='lg'>
        <div className={classes.wrapper}>
          <form className={classes.form} onSubmit={event => event.preventDefault()}>
            <Text size='xl' weight={700} className={classes.title}>
              Add a new task
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                <TextInput
                  size='md'
                  required
                  placeholder='Enter title'
                  label='Your title'
                  onInput={onChangeTitleHandler}
                  value={title}
                  withAsterisk
                />
                <Select
                  label='Select type your task'
                  placeholder='Pick one'
                  size='md'
                  data={data.map(el => ({ value: el.value, label: el.title }))}
                  onChange={onChangeTypeHandler}
                  value={type}
                  withAsterisk
                  transition='pop-top-left'
                  transitionDuration={80}
                  transitionTimingFunction='ease'
                  required
                />
              </SimpleGrid>

              <MultiSelect
                label='Tags'
                size='md'
                data={tags.map(el => ({ value: el.value, label: el.value }))}
                placeholder='Select tags'
                value={tags.map(el => el.value)}
                creatable
                searchable
                getCreateLabel={query => `+ Create ${query}`}
                onChange={(items: string[]) => {
                  const data = items.map(el => ({ value: el }));
                  setTags(data);
                }}
                onCreate={query => {
                  const item = { value: query };
                  setTags(prev => [...prev, item]);
                  return item;
                }}
              />

              <Textarea
                size='md'
                label='Your message'
                onChange={onChangeAreaHandler}
                value={desc}
                placeholder='Please include all relevant information'
                minRows={3}
              />

              <Group position='right'>
                <Button
                  type='submit'
                  className={classes.control}
                  size='md'
                  disabled={title === '' || type === ''}
                  onClick={onClickSubmitHandler}
                >
                  Add task
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default AddTask;
